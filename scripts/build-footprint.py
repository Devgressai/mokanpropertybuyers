#!/usr/bin/env python3
"""
Derive the MoKan service footprint from public Census data.

Nothing about the service area is asserted from memory: this script downloads the
Census Gazetteer and Population Estimates, filters by great-circle distance from a
center point, joins population, and writes data/footprint.json.

Usage:  python3 scripts/build-footprint.py [--radius 100] [--min-pop 1000]
"""
import argparse, csv, io, json, math, os, sys, urllib.request, zipfile

GAZ = "https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2023_Gazetteer/"
POP = "https://www2.census.gov/programs-surveys/popest/datasets/2020-2023/"
CENTER = (39.0997, -94.5786)   # downtown Kansas City
STATES = {"MO", "KS"}
R_MI = 3958.7613
CACHE = os.path.join(os.path.dirname(__file__), ".cache")


def fetch(url, name):
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, name)
    if not os.path.exists(path):
        sys.stderr.write(f"downloading {name}\n")
        urllib.request.urlretrieve(url, path)
    return path


def haversine(lat1, lon1, lat2, lon2):
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp, dl = math.radians(lat2 - lat1), math.radians(lon2 - lon1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * R_MI * math.asin(math.sqrt(a))


def gazetteer(kind):
    zpath = fetch(f"{GAZ}2023_Gaz_{kind}_national.zip", f"gaz_{kind}.zip")
    with zipfile.ZipFile(zpath) as z:
        raw = z.read(z.namelist()[0]).decode("latin-1")
    rows = csv.DictReader(io.StringIO(raw), delimiter="\t")
    return [{k.strip(): v.strip() for k, v in r.items() if k} for r in rows]


def in_radius(rows, radius):
    out = []
    for r in rows:
        if r["USPS"] not in STATES:
            continue
        try:
            lat, lon = float(r["INTPTLAT"]), float(r["INTPTLONG"])
        except (ValueError, KeyError):
            continue
        d = haversine(*CENTER, lat, lon)
        if d <= radius:
            out.append({"name": r["NAME"], "state": r["USPS"], "geoid": r["GEOID"],
                        "lat": lat, "lon": lon, "dist": round(d, 1)})
    return out


def populations():
    place, county = {}, {}
    with open(fetch(f"{POP}cities/totals/sub-est2023.csv", "sub-est.csv"), encoding="latin-1") as f:
        for r in csv.DictReader(f):
            if r["SUMLEV"] in ("162", "157", "170") and r["PLACE"] != "00000":
                try:
                    p = int(r["POPESTIMATE2023"])
                except ValueError:
                    continue
                g = r["STATE"] + r["PLACE"]
                place[g] = max(place.get(g, 0), p)
    with open(fetch(f"{POP}counties/totals/co-est2023-alldata.csv", "co-est.csv"), encoding="latin-1") as f:
        for r in csv.DictReader(f):
            if r["SUMLEV"] == "050":
                county[r["STATE"] + r["COUNTY"]] = int(r["POPESTIMATE2023"])
    return place, county


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--radius", type=float, default=100.0)
    ap.add_argument("--min-pop", type=int, default=1000,
                    help="places below this population get no city page")
    args = ap.parse_args()

    ppop, cpop = populations()
    counties = in_radius(gazetteer("counties"), args.radius)
    places = in_radius(gazetteer("place"), args.radius)
    for c in counties:
        c["pop"] = cpop.get(c["geoid"])
    for p in places:
        p["pop"] = ppop.get(p["geoid"])

    counties.sort(key=lambda x: -(x["pop"] or 0))
    places.sort(key=lambda x: -(x["pop"] or 0))
    kept = [p for p in places if (p["pop"] or 0) >= args.min_pop]

    out = {
        "meta": {
            "center": {"lat": CENTER[0], "lon": CENTER[1], "label": "Downtown Kansas City, MO"},
            "radius_miles": args.radius,
            "min_place_population": args.min_pop,
            "sources": ["Census Gazetteer 2023", "Census Population Estimates 2023"],
            "counties": len(counties),
            "places_in_radius": len(places),
            "places_with_page": len(kept),
            "population": sum(c["pop"] or 0 for c in counties),
        },
        "counties": counties,
        "places": kept,
        "places_excluded_below_min_pop": [p for p in places if (p["pop"] or 0) < args.min_pop],
    }
    dest = os.path.join(os.path.dirname(__file__), "..", "data", "footprint.json")
    with open(dest, "w") as f:
        json.dump(out, f, indent=1)
    m = out["meta"]
    print(f"{m['counties']} counties, {m['places_with_page']} city pages "
          f"({m['places_in_radius']} places in radius), population {m['population']:,}")


if __name__ == "__main__":
    main()
