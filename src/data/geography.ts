// GENERATED FILE — DO NOT EDIT.
// Source: data/footprint.json (US Census Gazetteer 2023 + Population Estimates 2023)
// Regenerate: npm run codegen:geography
// CI fails if this file differs from a fresh run.

export type StateCode = "MO" | "KS";

export interface StateDef { code: StateCode; name: string; slug: string; }
export interface CountyDef {
  slug: string; name: string; state: StateCode; geoid: string;
  population: number; distanceMi: number; lat: number; lon: number;
  citySlugs: string[];
}
export interface CityDef {
  slug: string; name: string; state: StateCode; geoid: string;
  population: number; distanceMi: number; lat: number; lon: number;
  countySlug: string; countiesAll: string[]; tier: 1 | 2 | 3 | 4 | 5;
}

export const states: StateDef[] = [
  {
    "code": "MO",
    "name": "Missouri",
    "slug": "sell-my-house-fast-missouri"
  },
  {
    "code": "KS",
    "name": "Kansas",
    "slug": "sell-my-house-fast-kansas"
  }
];

export const counties: CountyDef[] = [
  {
    "slug": "sell-my-house-fast-jackson-county-mo",
    "name": "Jackson County",
    "state": "MO",
    "geoid": "29095",
    "population": 718560,
    "distanceMi": 14.2,
    "lat": 39.005364,
    "lon": -94.343211,
    "citySlugs": [
      "sell-my-house-fast-blue-springs-mo",
      "sell-my-house-fast-buckner-mo",
      "sell-my-house-fast-grain-valley-mo",
      "sell-my-house-fast-grandview-mo",
      "sell-my-house-fast-greenwood-mo",
      "sell-my-house-fast-independence-mo",
      "sell-my-house-fast-kansas-city-mo",
      "sell-my-house-fast-lake-lotawana-mo",
      "sell-my-house-fast-lees-summit-mo",
      "sell-my-house-fast-lone-jack-mo",
      "sell-my-house-fast-oak-grove-mo",
      "sell-my-house-fast-raytown-mo",
      "sell-my-house-fast-sugar-creek-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-johnson-county-ks",
    "name": "Johnson County",
    "state": "KS",
    "geoid": "20091",
    "population": 622237,
    "distanceMi": 19.8,
    "lat": 38.883907,
    "lon": -94.82233,
    "citySlugs": [
      "sell-my-house-fast-de-soto-ks",
      "sell-my-house-fast-edgerton-ks",
      "sell-my-house-fast-fairway-ks",
      "sell-my-house-fast-gardner-ks",
      "sell-my-house-fast-leawood-ks",
      "sell-my-house-fast-lenexa-ks",
      "sell-my-house-fast-merriam-ks",
      "sell-my-house-fast-mission-hills-ks",
      "sell-my-house-fast-mission-ks",
      "sell-my-house-fast-olathe-ks",
      "sell-my-house-fast-overland-park-ks",
      "sell-my-house-fast-prairie-village-ks",
      "sell-my-house-fast-roeland-park-ks",
      "sell-my-house-fast-shawnee-ks",
      "sell-my-house-fast-spring-hill-ks",
      "sell-my-house-fast-westwood-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-clay-county-mo",
    "name": "Clay County",
    "state": "MO",
    "geoid": "29047",
    "population": 259772,
    "distanceMi": 17.1,
    "lat": 39.315551,
    "lon": -94.421502,
    "citySlugs": [
      "sell-my-house-fast-claycomo-mo",
      "sell-my-house-fast-excelsior-springs-mo",
      "sell-my-house-fast-gladstone-mo",
      "sell-my-house-fast-kearney-mo",
      "sell-my-house-fast-lawson-mo",
      "sell-my-house-fast-liberty-mo",
      "sell-my-house-fast-north-kansas-city-mo",
      "sell-my-house-fast-pleasant-valley-mo",
      "sell-my-house-fast-smithville-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-shawnee-county-ks",
    "name": "Shawnee County",
    "state": "KS",
    "geoid": "20177",
    "population": 177746,
    "distanceMi": 63.3,
    "lat": 39.041805,
    "lon": -95.755664,
    "citySlugs": [
      "sell-my-house-fast-auburn-ks",
      "sell-my-house-fast-rossville-ks",
      "sell-my-house-fast-silver-lake-ks",
      "sell-my-house-fast-topeka-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-wyandotte-county-ks",
    "name": "Wyandotte County",
    "state": "KS",
    "geoid": "20209",
    "population": 165281,
    "distanceMi": 10,
    "lat": 39.115384,
    "lon": -94.763087,
    "citySlugs": [
      "sell-my-house-fast-bonner-springs-ks",
      "sell-my-house-fast-edwardsville-ks",
      "sell-my-house-fast-kansas-city-ks",
      "sell-my-house-fast-lake-quivira-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-douglas-county-ks",
    "name": "Douglas County",
    "state": "KS",
    "geoid": "20045",
    "population": 120553,
    "distanceMi": 40.7,
    "lat": 38.896417,
    "lon": -95.290947,
    "citySlugs": [
      "sell-my-house-fast-baldwin-city-ks",
      "sell-my-house-fast-eudora-ks",
      "sell-my-house-fast-lawrence-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-platte-county-mo",
    "name": "Platte County",
    "state": "MO",
    "geoid": "29165",
    "population": 111940,
    "distanceMi": 21.6,
    "lat": 39.37869,
    "lon": -94.761477,
    "citySlugs": [
      "sell-my-house-fast-parkville-mo",
      "sell-my-house-fast-platte-city-mo",
      "sell-my-house-fast-riverside-mo",
      "sell-my-house-fast-weatherby-lake-mo",
      "sell-my-house-fast-weston-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-cass-county-mo",
    "name": "Cass County",
    "state": "MO",
    "geoid": "29037",
    "population": 111732,
    "distanceMi": 33.6,
    "lat": 38.646474,
    "lon": -94.354547,
    "citySlugs": [
      "sell-my-house-fast-archie-mo",
      "sell-my-house-fast-belton-mo",
      "sell-my-house-fast-garden-city-mo",
      "sell-my-house-fast-harrisonville-mo",
      "sell-my-house-fast-lake-winnebago-mo",
      "sell-my-house-fast-peculiar-mo",
      "sell-my-house-fast-pleasant-hill-mo",
      "sell-my-house-fast-raymore-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-leavenworth-county-ks",
    "name": "Leavenworth County",
    "state": "KS",
    "geoid": "20103",
    "population": 83518,
    "distanceMi": 25.4,
    "lat": 39.189511,
    "lon": -95.038977,
    "citySlugs": [
      "sell-my-house-fast-basehor-ks",
      "sell-my-house-fast-lansing-ks",
      "sell-my-house-fast-leavenworth-ks",
      "sell-my-house-fast-tonganoxie-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-buchanan-county-mo",
    "name": "Buchanan County",
    "state": "MO",
    "geoid": "29021",
    "population": 82956,
    "distanceMi": 40.6,
    "lat": 39.660369,
    "lon": -94.808173,
    "citySlugs": [
      "sell-my-house-fast-st-joseph-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-johnson-county-mo",
    "name": "Johnson County",
    "state": "MO",
    "geoid": "29101",
    "population": 54962,
    "distanceMi": 48.1,
    "lat": 38.741528,
    "lon": -93.811863,
    "citySlugs": [
      "sell-my-house-fast-holden-mo",
      "sell-my-house-fast-knob-noster-mo",
      "sell-my-house-fast-warrensburg-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-pettis-county-mo",
    "name": "Pettis County",
    "state": "MO",
    "geoid": "29159",
    "population": 43530,
    "distanceMi": 74.1,
    "lat": 38.727367,
    "lon": -93.285207,
    "citySlugs": [
      "sell-my-house-fast-la-monte-mo",
      "sell-my-house-fast-sedalia-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-miami-county-ks",
    "name": "Miami County",
    "state": "KS",
    "geoid": "20121",
    "population": 35320,
    "distanceMi": 39.3,
    "lat": 38.566772,
    "lon": -94.832963,
    "citySlugs": [
      "sell-my-house-fast-louisburg-ks",
      "sell-my-house-fast-osawatomie-ks",
      "sell-my-house-fast-paola-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-lafayette-county-mo",
    "name": "Lafayette County",
    "state": "MO",
    "geoid": "29107",
    "population": 33196,
    "distanceMi": 41.7,
    "lat": 39.068705,
    "lon": -93.802639,
    "citySlugs": [
      "sell-my-house-fast-concordia-mo",
      "sell-my-house-fast-higginsville-mo",
      "sell-my-house-fast-lexington-mo",
      "sell-my-house-fast-odessa-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-lyon-county-ks",
    "name": "Lyon County",
    "state": "KS",
    "geoid": "20111",
    "population": 32172,
    "distanceMi": 96.2,
    "lat": 38.455403,
    "lon": -96.161641,
    "citySlugs": [
      "sell-my-house-fast-emporia-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-pottawatomie-county-ks",
    "name": "Pottawatomie County",
    "state": "KS",
    "geoid": "20149",
    "population": 26382,
    "distanceMi": 96.1,
    "lat": 39.382187,
    "lon": -96.337113,
    "citySlugs": [
      "sell-my-house-fast-st-george-ks",
      "sell-my-house-fast-wamego-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-franklin-county-ks",
    "name": "Franklin County",
    "state": "KS",
    "geoid": "20059",
    "population": 26125,
    "distanceMi": 53.1,
    "lat": 38.558019,
    "lon": -95.278962,
    "citySlugs": [
      "sell-my-house-fast-ottawa-ks",
      "sell-my-house-fast-wellsville-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-ray-county-mo",
    "name": "Ray County",
    "state": "MO",
    "geoid": "29177",
    "population": 23182,
    "distanceMi": 34.4,
    "lat": 39.308401,
    "lon": -93.995746,
    "citySlugs": [
      "sell-my-house-fast-richmond-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-saline-county-mo",
    "name": "Saline County",
    "state": "MO",
    "geoid": "29195",
    "population": 23049,
    "distanceMi": 73.7,
    "lat": 39.13584,
    "lon": -93.204164,
    "citySlugs": [
      "sell-my-house-fast-marshall-mo",
      "sell-my-house-fast-slater-mo",
      "sell-my-house-fast-sweet-springs-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-henry-county-mo",
    "name": "Henry County",
    "state": "MO",
    "geoid": "29083",
    "population": 22485,
    "distanceMi": 65,
    "lat": 38.386491,
    "lon": -93.792628,
    "citySlugs": [
      "sell-my-house-fast-clinton-mo",
      "sell-my-house-fast-windsor-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-clinton-county-mo",
    "name": "Clinton County",
    "state": "MO",
    "geoid": "29049",
    "population": 21548,
    "distanceMi": 36.5,
    "lat": 39.608723,
    "lon": -94.395803,
    "citySlugs": [
      "sell-my-house-fast-cameron-mo",
      "sell-my-house-fast-gower-mo",
      "sell-my-house-fast-lathrop-mo",
      "sell-my-house-fast-plattsburg-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-nodaway-county-mo",
    "name": "Nodaway County",
    "state": "MO",
    "geoid": "29147",
    "population": 20695,
    "distanceMi": 88.6,
    "lat": 40.361136,
    "lon": -94.883146,
    "citySlugs": [
      "sell-my-house-fast-maryville-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-benton-county-mo",
    "name": "Benton County",
    "state": "MO",
    "geoid": "29015",
    "population": 20552,
    "distanceMi": 88.8,
    "lat": 38.301036,
    "lon": -93.287942,
    "citySlugs": [
      "sell-my-house-fast-cole-camp-mo",
      "sell-my-house-fast-lincoln-mo",
      "sell-my-house-fast-warsaw-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-vernon-county-mo",
    "name": "Vernon County",
    "state": "MO",
    "geoid": "29217",
    "population": 19710,
    "distanceMi": 87.3,
    "lat": 37.850196,
    "lon": -94.341597,
    "citySlugs": [
      "sell-my-house-fast-nevada-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-jefferson-county-ks",
    "name": "Jefferson County",
    "state": "KS",
    "geoid": "20087",
    "population": 18327,
    "distanceMi": 43.8,
    "lat": 39.239644,
    "lon": -95.375314,
    "citySlugs": [
      "sell-my-house-fast-oskaloosa-ks",
      "sell-my-house-fast-valley-falls-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-andrew-county-mo",
    "name": "Andrew County",
    "state": "MO",
    "geoid": "29003",
    "population": 18127,
    "distanceMi": 62.6,
    "lat": 39.988863,
    "lon": -94.803551,
    "citySlugs": [
      "sell-my-house-fast-country-club-mo",
      "sell-my-house-fast-savannah-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-cooper-county-mo",
    "name": "Cooper County",
    "state": "MO",
    "geoid": "29053",
    "population": 16947,
    "distanceMi": 96.6,
    "lat": 38.847093,
    "lon": -92.810069,
    "citySlugs": [
      "sell-my-house-fast-boonville-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-bates-county-mo",
    "name": "Bates County",
    "state": "MO",
    "geoid": "29013",
    "population": 16242,
    "distanceMi": 59.6,
    "lat": 38.257217,
    "lon": -94.339246,
    "citySlugs": [
      "sell-my-house-fast-adrian-mo",
      "sell-my-house-fast-butler-mo",
      "sell-my-house-fast-rich-hill-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-atchison-county-ks",
    "name": "Atchison County",
    "state": "KS",
    "geoid": "20005",
    "population": 16016,
    "distanceMi": 49.4,
    "lat": 39.532544,
    "lon": -95.313397,
    "citySlugs": [
      "sell-my-house-fast-atchison-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-osage-county-ks",
    "name": "Osage County",
    "state": "KS",
    "geoid": "20139",
    "population": 15824,
    "distanceMi": 68.2,
    "lat": 38.650215,
    "lon": -95.708255,
    "citySlugs": [
      "sell-my-house-fast-carbondale-ks",
      "sell-my-house-fast-lyndon-ks",
      "sell-my-house-fast-osage-city-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-livingston-county-mo",
    "name": "Livingston County",
    "state": "MO",
    "geoid": "29117",
    "population": 14557,
    "distanceMi": 72.3,
    "lat": 39.778587,
    "lon": -93.548201,
    "citySlugs": [
      "sell-my-house-fast-chillicothe-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-bourbon-county-ks",
    "name": "Bourbon County",
    "state": "KS",
    "geoid": "20011",
    "population": 14408,
    "distanceMi": 87.2,
    "lat": 37.8561,
    "lon": -94.850928,
    "citySlugs": [
      "sell-my-house-fast-fort-scott-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-jackson-county-ks",
    "name": "Jackson County",
    "state": "KS",
    "geoid": "20085",
    "population": 13368,
    "distanceMi": 68.5,
    "lat": 39.411145,
    "lon": -95.794485,
    "citySlugs": [
      "sell-my-house-fast-holton-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-allen-county-ks",
    "name": "Allen County",
    "state": "KS",
    "geoid": "20001",
    "population": 12412,
    "distanceMi": 92.6,
    "lat": 37.884228,
    "lon": -95.300945,
    "citySlugs": [
      "sell-my-house-fast-iola-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-linn-county-mo",
    "name": "Linn County",
    "state": "MO",
    "geoid": "29115",
    "population": 11791,
    "distanceMi": 94.6,
    "lat": 39.86444,
    "lon": -93.108019,
    "citySlugs": [
      "sell-my-house-fast-brookfield-mo",
      "sell-my-house-fast-marceline-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-nemaha-county-ks",
    "name": "Nemaha County",
    "state": "KS",
    "geoid": "20131",
    "population": 10114,
    "distanceMi": 89.9,
    "lat": 39.791043,
    "lon": -96.005381,
    "citySlugs": [
      "sell-my-house-fast-seneca-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-dekalb-county-mo",
    "name": "DeKalb County",
    "state": "MO",
    "geoid": "29063",
    "population": 9899,
    "distanceMi": 55.7,
    "lat": 39.894665,
    "lon": -94.40719,
    "citySlugs": [
      "sell-my-house-fast-maysville-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-linn-county-ks",
    "name": "Linn County",
    "state": "KS",
    "geoid": "20107",
    "population": 9860,
    "distanceMi": 62.7,
    "lat": 38.216549,
    "lon": -94.844932,
    "citySlugs": [
      "sell-my-house-fast-la-cygne-ks",
      "sell-my-house-fast-linn-valley-ks",
      "sell-my-house-fast-pleasanton-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-grundy-county-mo",
    "name": "Grundy County",
    "state": "MO",
    "geoid": "29079",
    "population": 9815,
    "distanceMi": 88.4,
    "lat": 40.112541,
    "lon": -93.565054,
    "citySlugs": [
      "sell-my-house-fast-trenton-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-st-clair-county-mo",
    "name": "St. Clair County",
    "state": "MO",
    "geoid": "29185",
    "population": 9752,
    "distanceMi": 84.9,
    "lat": 38.04223,
    "lon": -93.77656,
    "citySlugs": [
      "sell-my-house-fast-appleton-city-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-brown-county-ks",
    "name": "Brown County",
    "state": "KS",
    "geoid": "20013",
    "population": 9250,
    "distanceMi": 72.9,
    "lat": 39.825931,
    "lon": -95.569905,
    "citySlugs": [
      "sell-my-house-fast-hiawatha-ks",
      "sell-my-house-fast-horton-ks",
      "sell-my-house-fast-sabetha-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-caldwell-county-mo",
    "name": "Caldwell County",
    "state": "MO",
    "geoid": "29025",
    "population": 8955,
    "distanceMi": 50.2,
    "lat": 39.658998,
    "lon": -93.979179,
    "citySlugs": [
      "sell-my-house-fast-hamilton-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-daviess-county-mo",
    "name": "Daviess County",
    "state": "MO",
    "geoid": "29061",
    "population": 8551,
    "distanceMi": 67.9,
    "lat": 39.962839,
    "lon": -93.970053,
    "citySlugs": [
      "sell-my-house-fast-gallatin-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-carroll-county-mo",
    "name": "Carroll County",
    "state": "MO",
    "geoid": "29033",
    "population": 8391,
    "distanceMi": 62,
    "lat": 39.427375,
    "lon": -93.500227,
    "citySlugs": [
      "sell-my-house-fast-carrollton-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-coffey-county-ks",
    "name": "Coffey County",
    "state": "KS",
    "geoid": "20031",
    "population": 8251,
    "distanceMi": 86.1,
    "lat": 38.23645,
    "lon": -95.729137,
    "citySlugs": [
      "sell-my-house-fast-burlington-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-harrison-county-mo",
    "name": "Harrison County",
    "state": "MO",
    "geoid": "29081",
    "population": 8220,
    "distanceMi": 91.5,
    "lat": 40.34562,
    "lon": -93.992582,
    "citySlugs": [
      "sell-my-house-fast-bethany-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-anderson-county-ks",
    "name": "Anderson County",
    "state": "KS",
    "geoid": "20003",
    "population": 7838,
    "distanceMi": 72.2,
    "lat": 38.215114,
    "lon": -95.292046,
    "citySlugs": [
      "sell-my-house-fast-garnett-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-doniphan-county-ks",
    "name": "Doniphan County",
    "state": "KS",
    "geoid": "20043",
    "population": 7493,
    "distanceMi": 56.4,
    "lat": 39.788502,
    "lon": -95.147225,
    "citySlugs": [
      "sell-my-house-fast-elwood-ks",
      "sell-my-house-fast-wathena-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-chariton-county-mo",
    "name": "Chariton County",
    "state": "MO",
    "geoid": "29041",
    "population": 7399,
    "distanceMi": 91.1,
    "lat": 39.517968,
    "lon": -92.96162,
    "citySlugs": [
      "sell-my-house-fast-glasgow-mo",
      "sell-my-house-fast-salisbury-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-wabaunsee-county-ks",
    "name": "Wabaunsee County",
    "state": "KS",
    "geoid": "20197",
    "population": 7057,
    "distanceMi": 87.7,
    "lat": 38.955154,
    "lon": -96.201262,
    "citySlugs": [
      "sell-my-house-fast-st-marys-ks"
    ]
  },
  {
    "slug": "sell-my-house-fast-gentry-county-mo",
    "name": "Gentry County",
    "state": "MO",
    "geoid": "29075",
    "population": 6287,
    "distanceMi": 77.1,
    "lat": 40.208127,
    "lon": -94.405321,
    "citySlugs": [
      "sell-my-house-fast-albany-mo",
      "sell-my-house-fast-stanberry-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-holt-county-mo",
    "name": "Holt County",
    "state": "MO",
    "geoid": "29087",
    "population": 4248,
    "distanceMi": 76.8,
    "lat": 40.095724,
    "lon": -95.219072,
    "citySlugs": [
      "sell-my-house-fast-mound-city-mo"
    ]
  },
  {
    "slug": "sell-my-house-fast-worth-county-mo",
    "name": "Worth County",
    "state": "MO",
    "geoid": "29227",
    "population": 1907,
    "distanceMi": 95.8,
    "lat": 40.480499,
    "lon": -94.419198,
    "citySlugs": []
  }
];

export const cities: CityDef[] = [
  {
    "slug": "sell-my-house-fast-kansas-city-mo",
    "name": "Kansas City",
    "state": "MO",
    "geoid": "2938000",
    "population": 510704,
    "distanceMi": 2,
    "lat": 39.122361,
    "lon": -94.555117,
    "countySlug": "sell-my-house-fast-jackson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-cass-county-mo",
      "sell-my-house-fast-clay-county-mo",
      "sell-my-house-fast-jackson-county-mo",
      "sell-my-house-fast-platte-county-mo"
    ],
    "tier": 1
  },
  {
    "slug": "sell-my-house-fast-overland-park-ks",
    "name": "Overland Park",
    "state": "KS",
    "geoid": "2053775",
    "population": 197089,
    "distanceMi": 15.7,
    "lat": 38.889042,
    "lon": -94.690584,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks"
    ],
    "tier": 1
  },
  {
    "slug": "sell-my-house-fast-kansas-city-ks",
    "name": "Kansas City",
    "state": "KS",
    "geoid": "2036000",
    "population": 152933,
    "distanceMi": 8.9,
    "lat": 39.122539,
    "lon": -94.741781,
    "countySlug": "sell-my-house-fast-wyandotte-county-ks",
    "countiesAll": [
      "sell-my-house-fast-wyandotte-county-ks"
    ],
    "tier": 1
  },
  {
    "slug": "sell-my-house-fast-olathe-ks",
    "name": "Olathe",
    "state": "KS",
    "geoid": "2052575",
    "population": 147461,
    "distanceMi": 19.9,
    "lat": 38.882031,
    "lon": -94.820054,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks"
    ],
    "tier": 1
  },
  {
    "slug": "sell-my-house-fast-topeka-ks",
    "name": "Topeka",
    "state": "KS",
    "geoid": "2071000",
    "population": 125475,
    "distanceMi": 60,
    "lat": 39.03468,
    "lon": -95.694825,
    "countySlug": "sell-my-house-fast-shawnee-county-ks",
    "countiesAll": [
      "sell-my-house-fast-shawnee-county-ks"
    ],
    "tier": 1
  },
  {
    "slug": "sell-my-house-fast-independence-mo",
    "name": "Independence",
    "state": "MO",
    "geoid": "2935000",
    "population": 120922,
    "distanceMi": 12.2,
    "lat": 39.085469,
    "lon": -94.352082,
    "countySlug": "sell-my-house-fast-jackson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-clay-county-mo",
      "sell-my-house-fast-jackson-county-mo"
    ],
    "tier": 1
  },
  {
    "slug": "sell-my-house-fast-lees-summit-mo",
    "name": "Lee's Summit",
    "state": "MO",
    "geoid": "2941348",
    "population": 104184,
    "distanceMi": 16.1,
    "lat": 38.921601,
    "lon": -94.384763,
    "countySlug": "sell-my-house-fast-jackson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-cass-county-mo",
      "sell-my-house-fast-jackson-county-mo"
    ],
    "tier": 1
  },
  {
    "slug": "sell-my-house-fast-lawrence-ks",
    "name": "Lawrence",
    "state": "KS",
    "geoid": "2038900",
    "population": 96207,
    "distanceMi": 38,
    "lat": 38.960029,
    "lon": -95.26293,
    "countySlug": "sell-my-house-fast-douglas-county-ks",
    "countiesAll": [
      "sell-my-house-fast-douglas-county-ks"
    ],
    "tier": 1
  },
  {
    "slug": "sell-my-house-fast-st-joseph-mo",
    "name": "St. Joseph",
    "state": "MO",
    "geoid": "2964550",
    "population": 70634,
    "distanceMi": 47.4,
    "lat": 39.75946,
    "lon": -94.821143,
    "countySlug": "sell-my-house-fast-buchanan-county-mo",
    "countiesAll": [
      "sell-my-house-fast-buchanan-county-mo"
    ],
    "tier": 1
  },
  {
    "slug": "sell-my-house-fast-shawnee-ks",
    "name": "Shawnee",
    "state": "KS",
    "geoid": "2064500",
    "population": 69417,
    "distanceMi": 13.4,
    "lat": 39.017488,
    "lon": -94.805801,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks"
    ],
    "tier": 1
  },
  {
    "slug": "sell-my-house-fast-blue-springs-mo",
    "name": "Blue Springs",
    "state": "MO",
    "geoid": "2906652",
    "population": 60539,
    "distanceMi": 17.8,
    "lat": 39.012001,
    "lon": -94.267612,
    "countySlug": "sell-my-house-fast-jackson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-jackson-county-mo"
    ],
    "tier": 1
  },
  {
    "slug": "sell-my-house-fast-lenexa-ks",
    "name": "Lenexa",
    "state": "KS",
    "geoid": "2039350",
    "population": 58536,
    "distanceMi": 15.2,
    "lat": 38.965268,
    "lon": -94.803937,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks"
    ],
    "tier": 1
  },
  {
    "slug": "sell-my-house-fast-leavenworth-ks",
    "name": "Leavenworth",
    "state": "KS",
    "geoid": "2039000",
    "population": 37034,
    "distanceMi": 24.1,
    "lat": 39.322717,
    "lon": -94.925013,
    "countySlug": "sell-my-house-fast-leavenworth-county-ks",
    "countiesAll": [
      "sell-my-house-fast-leavenworth-county-ks"
    ],
    "tier": 2
  },
  {
    "slug": "sell-my-house-fast-leawood-ks",
    "name": "Leawood",
    "state": "KS",
    "geoid": "2039075",
    "population": 33980,
    "distanceMi": 13.5,
    "lat": 38.907263,
    "lon": -94.62524,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks"
    ],
    "tier": 2
  },
  {
    "slug": "sell-my-house-fast-liberty-mo",
    "name": "Liberty",
    "state": "MO",
    "geoid": "2942032",
    "population": 30794,
    "distanceMi": 13,
    "lat": 39.24127,
    "lon": -94.419445,
    "countySlug": "sell-my-house-fast-clay-county-mo",
    "countiesAll": [
      "sell-my-house-fast-clay-county-mo"
    ],
    "tier": 2
  },
  {
    "slug": "sell-my-house-fast-raytown-mo",
    "name": "Raytown",
    "state": "MO",
    "geoid": "2960788",
    "population": 29097,
    "distanceMi": 9.6,
    "lat": 38.994274,
    "lon": -94.461511,
    "countySlug": "sell-my-house-fast-jackson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-jackson-county-mo"
    ],
    "tier": 2
  },
  {
    "slug": "sell-my-house-fast-gladstone-mo",
    "name": "Gladstone",
    "state": "MO",
    "geoid": "2927190",
    "population": 27329,
    "distanceMi": 7.9,
    "lat": 39.21298,
    "lon": -94.558956,
    "countySlug": "sell-my-house-fast-clay-county-mo",
    "countiesAll": [
      "sell-my-house-fast-clay-county-mo"
    ],
    "tier": 2
  },
  {
    "slug": "sell-my-house-fast-belton-mo",
    "name": "Belton",
    "state": "MO",
    "geoid": "2904384",
    "population": 25534,
    "distanceMi": 19.6,
    "lat": 38.81873,
    "lon": -94.529639,
    "countySlug": "sell-my-house-fast-cass-county-mo",
    "countiesAll": [
      "sell-my-house-fast-cass-county-mo"
    ],
    "tier": 2
  },
  {
    "slug": "sell-my-house-fast-grandview-mo",
    "name": "Grandview",
    "state": "MO",
    "geoid": "2928324",
    "population": 25436,
    "distanceMi": 15.4,
    "lat": 38.881359,
    "lon": -94.522744,
    "countySlug": "sell-my-house-fast-jackson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-jackson-county-mo"
    ],
    "tier": 2
  },
  {
    "slug": "sell-my-house-fast-gardner-ks",
    "name": "Gardner",
    "state": "KS",
    "geoid": "2025425",
    "population": 25378,
    "distanceMi": 27.4,
    "lat": 38.811467,
    "lon": -94.929226,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks"
    ],
    "tier": 2
  },
  {
    "slug": "sell-my-house-fast-raymore-mo",
    "name": "Raymore",
    "state": "MO",
    "geoid": "2960752",
    "population": 25306,
    "distanceMi": 21.5,
    "lat": 38.803303,
    "lon": -94.45832,
    "countySlug": "sell-my-house-fast-cass-county-mo",
    "countiesAll": [
      "sell-my-house-fast-cass-county-mo"
    ],
    "tier": 2
  },
  {
    "slug": "sell-my-house-fast-emporia-ks",
    "name": "Emporia",
    "state": "KS",
    "geoid": "2021275",
    "population": 24105,
    "distanceMi": 99.4,
    "lat": 38.402869,
    "lon": -96.192906,
    "countySlug": "sell-my-house-fast-lyon-county-ks",
    "countiesAll": [
      "sell-my-house-fast-lyon-county-ks"
    ],
    "tier": 2
  },
  {
    "slug": "sell-my-house-fast-prairie-village-ks",
    "name": "Prairie Village",
    "state": "KS",
    "geoid": "2057575",
    "population": 22900,
    "distanceMi": 8.4,
    "lat": 38.986835,
    "lon": -94.636195,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks"
    ],
    "tier": 2
  },
  {
    "slug": "sell-my-house-fast-sedalia-mo",
    "name": "Sedalia",
    "state": "MO",
    "geoid": "2966440",
    "population": 22086,
    "distanceMi": 77.2,
    "lat": 38.706048,
    "lon": -93.234498,
    "countySlug": "sell-my-house-fast-pettis-county-mo",
    "countiesAll": [
      "sell-my-house-fast-pettis-county-mo"
    ],
    "tier": 2
  },
  {
    "slug": "sell-my-house-fast-warrensburg-mo",
    "name": "Warrensburg",
    "state": "MO",
    "geoid": "2977092",
    "population": 19673,
    "distanceMi": 51.4,
    "lat": 38.762381,
    "lon": -93.725337,
    "countySlug": "sell-my-house-fast-johnson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-mo"
    ],
    "tier": 2
  },
  {
    "slug": "sell-my-house-fast-grain-valley-mo",
    "name": "Grain Valley",
    "state": "MO",
    "geoid": "2928090",
    "population": 16609,
    "distanceMi": 20.3,
    "lat": 39.014988,
    "lon": -94.216371,
    "countySlug": "sell-my-house-fast-jackson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-jackson-county-mo"
    ],
    "tier": 2
  },
  {
    "slug": "sell-my-house-fast-marshall-mo",
    "name": "Marshall",
    "state": "MO",
    "geoid": "2946316",
    "population": 13642,
    "distanceMi": 73.8,
    "lat": 39.115093,
    "lon": -93.202469,
    "countySlug": "sell-my-house-fast-saline-county-mo",
    "countiesAll": [
      "sell-my-house-fast-saline-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-ottawa-ks",
    "name": "Ottawa",
    "state": "KS",
    "geoid": "2053550",
    "population": 12686,
    "distanceMi": 50.5,
    "lat": 38.60008,
    "lon": -95.262777,
    "countySlug": "sell-my-house-fast-franklin-county-ks",
    "countiesAll": [
      "sell-my-house-fast-franklin-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-lansing-ks",
    "name": "Lansing",
    "state": "KS",
    "geoid": "2038650",
    "population": 11221,
    "distanceMi": 19.7,
    "lat": 39.242592,
    "lon": -94.89632,
    "countySlug": "sell-my-house-fast-leavenworth-county-ks",
    "countiesAll": [
      "sell-my-house-fast-leavenworth-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-kearney-mo",
    "name": "Kearney",
    "state": "MO",
    "geoid": "2938072",
    "population": 11060,
    "distanceMi": 21.2,
    "lat": 39.355111,
    "lon": -94.35858,
    "countySlug": "sell-my-house-fast-clay-county-mo",
    "countiesAll": [
      "sell-my-house-fast-clay-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-merriam-ks",
    "name": "Merriam",
    "state": "KS",
    "geoid": "2046000",
    "population": 10875,
    "distanceMi": 8.4,
    "lat": 39.017607,
    "lon": -94.693955,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-smithville-mo",
    "name": "Smithville",
    "state": "MO",
    "geoid": "2968420",
    "population": 10785,
    "distanceMi": 20.5,
    "lat": 39.396869,
    "lon": -94.570987,
    "countySlug": "sell-my-house-fast-clay-county-mo",
    "countiesAll": [
      "sell-my-house-fast-clay-county-mo",
      "sell-my-house-fast-platte-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-atchison-ks",
    "name": "Atchison",
    "state": "KS",
    "geoid": "2002900",
    "population": 10670,
    "distanceMi": 43.7,
    "lat": 39.562552,
    "lon": -95.136611,
    "countySlug": "sell-my-house-fast-atchison-county-ks",
    "countiesAll": [
      "sell-my-house-fast-atchison-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-excelsior-springs-mo",
    "name": "Excelsior Springs",
    "state": "MO",
    "geoid": "2923086",
    "population": 10612,
    "distanceMi": 24.5,
    "lat": 39.339929,
    "lon": -94.240992,
    "countySlug": "sell-my-house-fast-clay-county-mo",
    "countiesAll": [
      "sell-my-house-fast-clay-county-mo",
      "sell-my-house-fast-ray-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-maryville-mo",
    "name": "Maryville",
    "state": "MO",
    "geoid": "2946640",
    "population": 10309,
    "distanceMi": 87.3,
    "lat": 40.342515,
    "lon": -94.870048,
    "countySlug": "sell-my-house-fast-nodaway-county-mo",
    "countiesAll": [
      "sell-my-house-fast-nodaway-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-mission-ks",
    "name": "Mission",
    "state": "KS",
    "geoid": "2047225",
    "population": 10014,
    "distanceMi": 6.6,
    "lat": 39.026774,
    "lon": -94.656962,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-harrisonville-mo",
    "name": "Harrisonville",
    "state": "MO",
    "geoid": "2930610",
    "population": 9852,
    "distanceMi": 33.3,
    "lat": 38.652493,
    "lon": -94.346999,
    "countySlug": "sell-my-house-fast-cass-county-mo",
    "countiesAll": [
      "sell-my-house-fast-cass-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-spring-hill-ks",
    "name": "Spring Hill",
    "state": "KS",
    "geoid": "2067625",
    "population": 9689,
    "distanceMi": 27,
    "lat": 38.756685,
    "lon": -94.820976,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks",
      "sell-my-house-fast-miami-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-clinton-mo",
    "name": "Clinton",
    "state": "MO",
    "geoid": "2914986",
    "population": 9416,
    "distanceMi": 66.6,
    "lat": 38.371172,
    "lon": -93.768142,
    "countySlug": "sell-my-house-fast-henry-county-mo",
    "countiesAll": [
      "sell-my-house-fast-henry-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-chillicothe-mo",
    "name": "Chillicothe",
    "state": "MO",
    "geoid": "2913690",
    "population": 9044,
    "distanceMi": 73,
    "lat": 39.796079,
    "lon": -93.549957,
    "countySlug": "sell-my-house-fast-livingston-county-mo",
    "countiesAll": [
      "sell-my-house-fast-livingston-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-oak-grove-mo",
    "name": "Oak Grove",
    "state": "MO",
    "geoid": "2953624",
    "population": 8907,
    "distanceMi": 25,
    "lat": 39.007033,
    "lon": -94.128441,
    "countySlug": "sell-my-house-fast-jackson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-jackson-county-mo",
      "sell-my-house-fast-lafayette-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-parkville-mo",
    "name": "Parkville",
    "state": "MO",
    "geoid": "2956288",
    "population": 8859,
    "distanceMi": 10.4,
    "lat": 39.214445,
    "lon": -94.70434,
    "countySlug": "sell-my-house-fast-platte-county-mo",
    "countiesAll": [
      "sell-my-house-fast-platte-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-pleasant-hill-mo",
    "name": "Pleasant Hill",
    "state": "MO",
    "geoid": "2958394",
    "population": 8679,
    "distanceMi": 26.1,
    "lat": 38.805966,
    "lon": -94.272283,
    "countySlug": "sell-my-house-fast-cass-county-mo",
    "countiesAll": [
      "sell-my-house-fast-cass-county-mo",
      "sell-my-house-fast-jackson-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-nevada-mo",
    "name": "Nevada",
    "state": "MO",
    "geoid": "2951644",
    "population": 8262,
    "distanceMi": 87.6,
    "lat": 37.844908,
    "lon": -94.350321,
    "countySlug": "sell-my-house-fast-vernon-county-mo",
    "countiesAll": [
      "sell-my-house-fast-vernon-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-boonville-mo",
    "name": "Boonville",
    "state": "MO",
    "geoid": "2907318",
    "population": 7782,
    "distanceMi": 98.8,
    "lat": 38.961439,
    "lon": -92.746203,
    "countySlug": "sell-my-house-fast-cooper-county-mo",
    "countiesAll": [
      "sell-my-house-fast-cooper-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-basehor-ks",
    "name": "Basehor",
    "state": "KS",
    "geoid": "2004400",
    "population": 7719,
    "distanceMi": 18.9,
    "lat": 39.135325,
    "lon": -94.929047,
    "countySlug": "sell-my-house-fast-leavenworth-county-ks",
    "countiesAll": [
      "sell-my-house-fast-leavenworth-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-bonner-springs-ks",
    "name": "Bonner Springs",
    "state": "KS",
    "geoid": "2007975",
    "population": 7621,
    "distanceMi": 15.8,
    "lat": 39.075368,
    "lon": -94.871739,
    "countySlug": "sell-my-house-fast-wyandotte-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks",
      "sell-my-house-fast-leavenworth-county-ks",
      "sell-my-house-fast-wyandotte-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-fort-scott-ks",
    "name": "Fort Scott",
    "state": "KS",
    "geoid": "2024000",
    "population": 7565,
    "distanceMi": 88.1,
    "lat": 37.828,
    "lon": -94.704141,
    "countySlug": "sell-my-house-fast-bourbon-county-ks",
    "countiesAll": [
      "sell-my-house-fast-bourbon-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-cameron-mo",
    "name": "Cameron",
    "state": "MO",
    "geoid": "2910828",
    "population": 7324,
    "distanceMi": 48.2,
    "lat": 39.744499,
    "lon": -94.232324,
    "countySlug": "sell-my-house-fast-clinton-county-mo",
    "countiesAll": [
      "sell-my-house-fast-clinton-county-mo",
      "sell-my-house-fast-dekalb-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-roeland-park-ks",
    "name": "Roeland Park",
    "state": "KS",
    "geoid": "2060825",
    "population": 6712,
    "distanceMi": 5.4,
    "lat": 39.035854,
    "lon": -94.637409,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-de-soto-ks",
    "name": "De Soto",
    "state": "KS",
    "geoid": "2017850",
    "population": 6539,
    "distanceMi": 21.8,
    "lat": 38.972306,
    "lon": -94.951141,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-eudora-ks",
    "name": "Eudora",
    "state": "KS",
    "geoid": "2021675",
    "population": 6466,
    "distanceMi": 29.9,
    "lat": 38.934664,
    "lon": -95.094123,
    "countySlug": "sell-my-house-fast-douglas-county-ks",
    "countiesAll": [
      "sell-my-house-fast-douglas-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-greenwood-mo",
    "name": "Greenwood",
    "state": "MO",
    "geoid": "2929494",
    "population": 6123,
    "distanceMi": 22.1,
    "lat": 38.84206,
    "lon": -94.333545,
    "countySlug": "sell-my-house-fast-jackson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-jackson-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-tonganoxie-ks",
    "name": "Tonganoxie",
    "state": "KS",
    "geoid": "2070800",
    "population": 6102,
    "distanceMi": 26.8,
    "lat": 39.10789,
    "lon": -95.07909,
    "countySlug": "sell-my-house-fast-leavenworth-county-ks",
    "countiesAll": [
      "sell-my-house-fast-leavenworth-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-peculiar-mo",
    "name": "Peculiar",
    "state": "MO",
    "geoid": "2956756",
    "population": 6101,
    "distanceMi": 26.2,
    "lat": 38.730826,
    "lon": -94.468597,
    "countySlug": "sell-my-house-fast-cass-county-mo",
    "countiesAll": [
      "sell-my-house-fast-cass-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-richmond-mo",
    "name": "Richmond",
    "state": "MO",
    "geoid": "2961670",
    "population": 5958,
    "distanceMi": 34.7,
    "lat": 39.27545,
    "lon": -93.972584,
    "countySlug": "sell-my-house-fast-ray-county-mo",
    "countiesAll": [
      "sell-my-house-fast-ray-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-paola-ks",
    "name": "Paola",
    "state": "KS",
    "geoid": "2054250",
    "population": 5780,
    "distanceMi": 39,
    "lat": 38.57893,
    "lon": -94.860401,
    "countySlug": "sell-my-house-fast-miami-county-ks",
    "countiesAll": [
      "sell-my-house-fast-miami-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-odessa-mo",
    "name": "Odessa",
    "state": "MO",
    "geoid": "2954038",
    "population": 5638,
    "distanceMi": 33.6,
    "lat": 38.999397,
    "lon": -93.966404,
    "countySlug": "sell-my-house-fast-lafayette-county-mo",
    "countiesAll": [
      "sell-my-house-fast-lafayette-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-trenton-mo",
    "name": "Trenton",
    "state": "MO",
    "geoid": "2973816",
    "population": 5622,
    "distanceMi": 85.4,
    "lat": 40.081255,
    "lon": -93.602387,
    "countySlug": "sell-my-house-fast-grundy-county-mo",
    "countiesAll": [
      "sell-my-house-fast-grundy-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-north-kansas-city-mo",
    "name": "North Kansas City",
    "state": "MO",
    "geoid": "2953102",
    "population": 5534,
    "distanceMi": 2.9,
    "lat": 39.139558,
    "lon": -94.56475,
    "countySlug": "sell-my-house-fast-clay-county-mo",
    "countiesAll": [
      "sell-my-house-fast-clay-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-iola-ks",
    "name": "Iola",
    "state": "KS",
    "geoid": "2034300",
    "population": 5318,
    "distanceMi": 92.4,
    "lat": 37.927427,
    "lon": -95.400669,
    "countySlug": "sell-my-house-fast-allen-county-ks",
    "countiesAll": [
      "sell-my-house-fast-allen-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-louisburg-ks",
    "name": "Louisburg",
    "state": "KS",
    "geoid": "2042875",
    "population": 5170,
    "distanceMi": 33.5,
    "lat": 38.620506,
    "lon": -94.677082,
    "countySlug": "sell-my-house-fast-miami-county-ks",
    "countiesAll": [
      "sell-my-house-fast-miami-county-ks"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-savannah-mo",
    "name": "Savannah",
    "state": "MO",
    "geoid": "2966044",
    "population": 5072,
    "distanceMi": 59.5,
    "lat": 39.938789,
    "lon": -94.828049,
    "countySlug": "sell-my-house-fast-andrew-county-mo",
    "countiesAll": [
      "sell-my-house-fast-andrew-county-mo"
    ],
    "tier": 3
  },
  {
    "slug": "sell-my-house-fast-baldwin-city-ks",
    "name": "Baldwin City",
    "state": "KS",
    "geoid": "2003900",
    "population": 4929,
    "distanceMi": 39.6,
    "lat": 38.777506,
    "lon": -95.18748,
    "countySlug": "sell-my-house-fast-douglas-county-ks",
    "countiesAll": [
      "sell-my-house-fast-douglas-county-ks"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-wamego-ks",
    "name": "Wamego",
    "state": "KS",
    "geoid": "2075325",
    "population": 4846,
    "distanceMi": 93.1,
    "lat": 39.205263,
    "lon": -96.310126,
    "countySlug": "sell-my-house-fast-pottawatomie-county-ks",
    "countiesAll": [
      "sell-my-house-fast-pottawatomie-county-ks",
      "sell-my-house-fast-wabaunsee-county-ks"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-platte-city-mo",
    "name": "Platte City",
    "state": "MO",
    "geoid": "2958178",
    "population": 4828,
    "distanceMi": 20.3,
    "lat": 39.359733,
    "lon": -94.756317,
    "countySlug": "sell-my-house-fast-platte-county-mo",
    "countiesAll": [
      "sell-my-house-fast-platte-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-higginsville-mo",
    "name": "Higginsville",
    "state": "MO",
    "geoid": "2931960",
    "population": 4757,
    "distanceMi": 45.7,
    "lat": 39.065719,
    "lon": -93.726814,
    "countySlug": "sell-my-house-fast-lafayette-county-mo",
    "countiesAll": [
      "sell-my-house-fast-lafayette-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-edwardsville-ks",
    "name": "Edwardsville",
    "state": "KS",
    "geoid": "2020000",
    "population": 4641,
    "distanceMi": 13,
    "lat": 39.078168,
    "lon": -94.818818,
    "countySlug": "sell-my-house-fast-wyandotte-county-ks",
    "countiesAll": [
      "sell-my-house-fast-wyandotte-county-ks"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-lexington-mo",
    "name": "Lexington",
    "state": "MO",
    "geoid": "2941870",
    "population": 4585,
    "distanceMi": 38.4,
    "lat": 39.180313,
    "lon": -93.869051,
    "countySlug": "sell-my-house-fast-lafayette-county-mo",
    "countiesAll": [
      "sell-my-house-fast-lafayette-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-riverside-mo",
    "name": "Riverside",
    "state": "MO",
    "geoid": "2962156",
    "population": 4417,
    "distanceMi": 5.8,
    "lat": 39.172175,
    "lon": -94.632499,
    "countySlug": "sell-my-house-fast-platte-county-mo",
    "countiesAll": [
      "sell-my-house-fast-platte-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-butler-mo",
    "name": "Butler",
    "state": "MO",
    "geoid": "2910054",
    "population": 4257,
    "distanceMi": 59.5,
    "lat": 38.259362,
    "lon": -94.339531,
    "countySlug": "sell-my-house-fast-bates-county-mo",
    "countiesAll": [
      "sell-my-house-fast-bates-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-osawatomie-ks",
    "name": "Osawatomie",
    "state": "KS",
    "geoid": "2053225",
    "population": 4241,
    "distanceMi": 45.9,
    "lat": 38.49993,
    "lon": -94.945895,
    "countySlug": "sell-my-house-fast-miami-county-ks",
    "countiesAll": [
      "sell-my-house-fast-miami-county-ks"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-fairway-ks",
    "name": "Fairway",
    "state": "KS",
    "geoid": "2022700",
    "population": 4158,
    "distanceMi": 5.8,
    "lat": 39.024525,
    "lon": -94.628718,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-brookfield-mo",
    "name": "Brookfield",
    "state": "MO",
    "geoid": "2908650",
    "population": 4072,
    "distanceMi": 93,
    "lat": 39.785329,
    "lon": -93.077967,
    "countySlug": "sell-my-house-fast-linn-county-mo",
    "countiesAll": [
      "sell-my-house-fast-linn-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-mission-hills-ks",
    "name": "Mission Hills",
    "state": "KS",
    "geoid": "2047350",
    "population": 3525,
    "distanceMi": 6.3,
    "lat": 39.014035,
    "lon": -94.617552,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-carrollton-mo",
    "name": "Carrollton",
    "state": "MO",
    "geoid": "2911566",
    "population": 3478,
    "distanceMi": 60.8,
    "lat": 39.363642,
    "lon": -93.49506,
    "countySlug": "sell-my-house-fast-carroll-county-mo",
    "countiesAll": [
      "sell-my-house-fast-carroll-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-holton-ks",
    "name": "Holton",
    "state": "KS",
    "geoid": "2032825",
    "population": 3382,
    "distanceMi": 66.8,
    "lat": 39.469861,
    "lon": -95.732555,
    "countySlug": "sell-my-house-fast-jackson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-jackson-county-ks"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-sugar-creek-mo",
    "name": "Sugar Creek",
    "state": "MO",
    "geoid": "2971368",
    "population": 3204,
    "distanceMi": 9.5,
    "lat": 39.139505,
    "lon": -94.408507,
    "countySlug": "sell-my-house-fast-jackson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-clay-county-mo",
      "sell-my-house-fast-jackson-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-garnett-ks",
    "name": "Garnett",
    "state": "KS",
    "geoid": "2025925",
    "population": 3197,
    "distanceMi": 66.6,
    "lat": 38.285873,
    "lon": -95.241231,
    "countySlug": "sell-my-house-fast-anderson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-anderson-county-ks"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-hiawatha-ks",
    "name": "Hiawatha",
    "state": "KS",
    "geoid": "2031675",
    "population": 3190,
    "distanceMi": 72.9,
    "lat": 39.851686,
    "lon": -95.537965,
    "countySlug": "sell-my-house-fast-brown-county-ks",
    "countiesAll": [
      "sell-my-house-fast-brown-county-ks"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-bethany-mo",
    "name": "Bethany",
    "state": "MO",
    "geoid": "2905068",
    "population": 2923,
    "distanceMi": 85.8,
    "lat": 40.268164,
    "lon": -94.029822,
    "countySlug": "sell-my-house-fast-harrison-county-mo",
    "countiesAll": [
      "sell-my-house-fast-harrison-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-knob-noster-mo",
    "name": "Knob Noster",
    "state": "MO",
    "geoid": "2939188",
    "population": 2891,
    "distanceMi": 59.2,
    "lat": 38.767334,
    "lon": -93.563643,
    "countySlug": "sell-my-house-fast-johnson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-buckner-mo",
    "name": "Buckner",
    "state": "MO",
    "geoid": "2909424",
    "population": 2877,
    "distanceMi": 20.6,
    "lat": 39.132481,
    "lon": -94.196811,
    "countySlug": "sell-my-house-fast-jackson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-jackson-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-windsor-mo",
    "name": "Windsor",
    "state": "MO",
    "geoid": "2980350",
    "population": 2844,
    "distanceMi": 69,
    "lat": 38.532265,
    "lon": -93.522945,
    "countySlug": "sell-my-house-fast-henry-county-mo",
    "countiesAll": [
      "sell-my-house-fast-henry-county-mo",
      "sell-my-house-fast-pettis-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-osage-city-ks",
    "name": "Osage City",
    "state": "KS",
    "geoid": "2053200",
    "population": 2814,
    "distanceMi": 74.2,
    "lat": 38.634098,
    "lon": -95.821002,
    "countySlug": "sell-my-house-fast-osage-county-ks",
    "countiesAll": [
      "sell-my-house-fast-osage-county-ks"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-st-marys-ks",
    "name": "St. Marys",
    "state": "KS",
    "geoid": "2062400",
    "population": 2748,
    "distanceMi": 79.9,
    "lat": 39.194168,
    "lon": -96.064174,
    "countySlug": "sell-my-house-fast-wabaunsee-county-ks",
    "countiesAll": [
      "sell-my-house-fast-pottawatomie-county-ks",
      "sell-my-house-fast-wabaunsee-county-ks"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-pleasant-valley-mo",
    "name": "Pleasant Valley",
    "state": "MO",
    "geoid": "2958520",
    "population": 2726,
    "distanceMi": 9.7,
    "lat": 39.217175,
    "lon": -94.48094,
    "countySlug": "sell-my-house-fast-clay-county-mo",
    "countiesAll": [
      "sell-my-house-fast-clay-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-burlington-ks",
    "name": "Burlington",
    "state": "KS",
    "geoid": "2009400",
    "population": 2593,
    "distanceMi": 88.8,
    "lat": 38.193289,
    "lon": -95.745428,
    "countySlug": "sell-my-house-fast-coffey-county-ks",
    "countiesAll": [
      "sell-my-house-fast-coffey-county-ks"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-lawson-mo",
    "name": "Lawson",
    "state": "MO",
    "geoid": "2940988",
    "population": 2526,
    "distanceMi": 30,
    "lat": 39.432965,
    "lon": -94.220311,
    "countySlug": "sell-my-house-fast-clay-county-mo",
    "countiesAll": [
      "sell-my-house-fast-clay-county-mo",
      "sell-my-house-fast-ray-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-lake-lotawana-mo",
    "name": "Lake Lotawana",
    "state": "MO",
    "geoid": "2939980",
    "population": 2515,
    "distanceMi": 21.9,
    "lat": 38.90377,
    "lon": -94.258369,
    "countySlug": "sell-my-house-fast-jackson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-jackson-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-country-club-mo",
    "name": "Country Club",
    "state": "MO",
    "geoid": "2916802",
    "population": 2497,
    "distanceMi": 53.2,
    "lat": 39.846744,
    "lon": -94.823879,
    "countySlug": "sell-my-house-fast-andrew-county-mo",
    "countiesAll": [
      "sell-my-house-fast-andrew-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-sabetha-ks",
    "name": "Sabetha",
    "state": "KS",
    "geoid": "2062025",
    "population": 2493,
    "distanceMi": 85.6,
    "lat": 39.910228,
    "lon": -95.792832,
    "countySlug": "sell-my-house-fast-brown-county-ks",
    "countiesAll": [
      "sell-my-house-fast-brown-county-ks",
      "sell-my-house-fast-nemaha-county-ks"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-concordia-mo",
    "name": "Concordia",
    "state": "MO",
    "geoid": "2916102",
    "population": 2346,
    "distanceMi": 54.7,
    "lat": 38.987513,
    "lon": -93.569227,
    "countySlug": "sell-my-house-fast-lafayette-county-mo",
    "countiesAll": [
      "sell-my-house-fast-lafayette-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-warsaw-mo",
    "name": "Warsaw",
    "state": "MO",
    "geoid": "2977146",
    "population": 2328,
    "distanceMi": 87.9,
    "lat": 38.249274,
    "lon": -93.367038,
    "countySlug": "sell-my-house-fast-benton-county-mo",
    "countiesAll": [
      "sell-my-house-fast-benton-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-holden-mo",
    "name": "Holden",
    "state": "MO",
    "geoid": "2932572",
    "population": 2273,
    "distanceMi": 41.4,
    "lat": 38.713456,
    "lon": -93.989412,
    "countySlug": "sell-my-house-fast-johnson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-lathrop-mo",
    "name": "Lathrop",
    "state": "MO",
    "geoid": "2940826",
    "population": 2267,
    "distanceMi": 34.8,
    "lat": 39.561848,
    "lon": -94.319853,
    "countySlug": "sell-my-house-fast-clinton-county-mo",
    "countiesAll": [
      "sell-my-house-fast-clinton-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-plattsburg-mo",
    "name": "Plattsburg",
    "state": "MO",
    "geoid": "2958250",
    "population": 2240,
    "distanceMi": 32,
    "lat": 39.554166,
    "lon": -94.463355,
    "countySlug": "sell-my-house-fast-clinton-county-mo",
    "countiesAll": [
      "sell-my-house-fast-clinton-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-seneca-ks",
    "name": "Seneca",
    "state": "KS",
    "geoid": "2063950",
    "population": 2142,
    "distanceMi": 94.5,
    "lat": 39.837998,
    "lon": -96.069608,
    "countySlug": "sell-my-house-fast-nemaha-county-ks",
    "countiesAll": [
      "sell-my-house-fast-nemaha-county-ks"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-weatherby-lake-mo",
    "name": "Weatherby Lake",
    "state": "MO",
    "geoid": "2978046",
    "population": 2111,
    "distanceMi": 11.2,
    "lat": 39.234359,
    "lon": -94.696135,
    "countySlug": "sell-my-house-fast-platte-county-mo",
    "countiesAll": [
      "sell-my-house-fast-platte-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-marceline-mo",
    "name": "Marceline",
    "state": "MO",
    "geoid": "2945866",
    "population": 2110,
    "distanceMi": 97,
    "lat": 39.717518,
    "lon": -92.947351,
    "countySlug": "sell-my-house-fast-linn-county-mo",
    "countiesAll": [
      "sell-my-house-fast-chariton-county-mo",
      "sell-my-house-fast-linn-county-mo"
    ],
    "tier": 4
  },
  {
    "slug": "sell-my-house-fast-wellsville-ks",
    "name": "Wellsville",
    "state": "KS",
    "geoid": "2076625",
    "population": 1930,
    "distanceMi": 37.6,
    "lat": 38.717662,
    "lon": -95.077862,
    "countySlug": "sell-my-house-fast-franklin-county-ks",
    "countiesAll": [
      "sell-my-house-fast-franklin-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-gallatin-mo",
    "name": "Gallatin",
    "state": "MO",
    "geoid": "2926308",
    "population": 1854,
    "distanceMi": 64.9,
    "lat": 39.910352,
    "lon": -93.964011,
    "countySlug": "sell-my-house-fast-daviess-county-mo",
    "countiesAll": [
      "sell-my-house-fast-daviess-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-weston-mo",
    "name": "Weston",
    "state": "MO",
    "geoid": "2978856",
    "population": 1811,
    "distanceMi": 26.9,
    "lat": 39.404135,
    "lon": -94.891259,
    "countySlug": "sell-my-house-fast-platte-county-mo",
    "countiesAll": [
      "sell-my-house-fast-platte-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-slater-mo",
    "name": "Slater",
    "state": "MO",
    "geoid": "2968204",
    "population": 1802,
    "distanceMi": 81.5,
    "lat": 39.223279,
    "lon": -93.065347,
    "countySlug": "sell-my-house-fast-saline-county-mo",
    "countiesAll": [
      "sell-my-house-fast-saline-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-adrian-mo",
    "name": "Adrian",
    "state": "MO",
    "geoid": "2900244",
    "population": 1756,
    "distanceMi": 50.2,
    "lat": 38.39633,
    "lon": -94.342954,
    "countySlug": "sell-my-house-fast-bates-county-mo",
    "countiesAll": [
      "sell-my-house-fast-bates-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-lone-jack-mo",
    "name": "Lone Jack",
    "state": "MO",
    "geoid": "2943760",
    "population": 1744,
    "distanceMi": 26.4,
    "lat": 38.870904,
    "lon": -94.185586,
    "countySlug": "sell-my-house-fast-jackson-county-mo",
    "countiesAll": [
      "sell-my-house-fast-jackson-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-westwood-ks",
    "name": "Westwood",
    "state": "KS",
    "geoid": "2077500",
    "population": 1721,
    "distanceMi": 4.6,
    "lat": 39.039379,
    "lon": -94.61558,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-edgerton-ks",
    "name": "Edgerton",
    "state": "KS",
    "geoid": "2019825",
    "population": 1718,
    "distanceMi": 29,
    "lat": 38.790773,
    "lon": -94.943611,
    "countySlug": "sell-my-house-fast-johnson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-lake-winnebago-mo",
    "name": "Lake Winnebago",
    "state": "MO",
    "geoid": "2940340",
    "population": 1715,
    "distanceMi": 22.5,
    "lat": 38.821281,
    "lon": -94.361447,
    "countySlug": "sell-my-house-fast-cass-county-mo",
    "countiesAll": [
      "sell-my-house-fast-cass-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-albany-mo",
    "name": "Albany",
    "state": "MO",
    "geoid": "2900514",
    "population": 1705,
    "distanceMi": 80.4,
    "lat": 40.247893,
    "lon": -94.333455,
    "countySlug": "sell-my-house-fast-gentry-county-mo",
    "countiesAll": [
      "sell-my-house-fast-gentry-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-hamilton-mo",
    "name": "Hamilton",
    "state": "MO",
    "geoid": "2930034",
    "population": 1694,
    "distanceMi": 54.1,
    "lat": 39.743535,
    "lon": -94.0024,
    "countySlug": "sell-my-house-fast-caldwell-county-mo",
    "countiesAll": [
      "sell-my-house-fast-caldwell-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-garden-city-mo",
    "name": "Garden City",
    "state": "MO",
    "geoid": "2926434",
    "population": 1579,
    "distanceMi": 42.5,
    "lat": 38.562133,
    "lon": -94.195167,
    "countySlug": "sell-my-house-fast-cass-county-mo",
    "countiesAll": [
      "sell-my-house-fast-cass-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-salisbury-mo",
    "name": "Salisbury",
    "state": "MO",
    "geoid": "2965450",
    "population": 1567,
    "distanceMi": 97.6,
    "lat": 39.423327,
    "lon": -92.802424,
    "countySlug": "sell-my-house-fast-chariton-county-mo",
    "countiesAll": [
      "sell-my-house-fast-chariton-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-gower-mo",
    "name": "Gower",
    "state": "MO",
    "geoid": "2928036",
    "population": 1527,
    "distanceMi": 35.5,
    "lat": 39.613166,
    "lon": -94.59478,
    "countySlug": "sell-my-house-fast-clinton-county-mo",
    "countiesAll": [
      "sell-my-house-fast-buchanan-county-mo",
      "sell-my-house-fast-clinton-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-horton-ks",
    "name": "Horton",
    "state": "KS",
    "geoid": "2033200",
    "population": 1480,
    "distanceMi": 64.1,
    "lat": 39.663791,
    "lon": -95.532532,
    "countySlug": "sell-my-house-fast-brown-county-ks",
    "countiesAll": [
      "sell-my-house-fast-brown-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-claycomo-mo",
    "name": "Claycomo",
    "state": "MO",
    "geoid": "2914554",
    "population": 1353,
    "distanceMi": 8.7,
    "lat": 39.198621,
    "lon": -94.478833,
    "countySlug": "sell-my-house-fast-clay-county-mo",
    "countiesAll": [
      "sell-my-house-fast-clay-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-carbondale-ks",
    "name": "Carbondale",
    "state": "KS",
    "geoid": "2010600",
    "population": 1318,
    "distanceMi": 62.9,
    "lat": 38.821793,
    "lon": -95.693154,
    "countySlug": "sell-my-house-fast-osage-county-ks",
    "countiesAll": [
      "sell-my-house-fast-osage-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-silver-lake-ks",
    "name": "Silver Lake",
    "state": "KS",
    "geoid": "2065600",
    "population": 1315,
    "distanceMi": 68.5,
    "lat": 39.099849,
    "lon": -95.856655,
    "countySlug": "sell-my-house-fast-shawnee-county-ks",
    "countiesAll": [
      "sell-my-house-fast-shawnee-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-sweet-springs-mo",
    "name": "Sweet Springs",
    "state": "MO",
    "geoid": "2971890",
    "population": 1309,
    "distanceMi": 63.1,
    "lat": 38.964279,
    "lon": -93.416504,
    "countySlug": "sell-my-house-fast-saline-county-mo",
    "countiesAll": [
      "sell-my-house-fast-saline-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-archie-mo",
    "name": "Archie",
    "state": "MO",
    "geoid": "2901702",
    "population": 1262,
    "distanceMi": 44.5,
    "lat": 38.481116,
    "lon": -94.350614,
    "countySlug": "sell-my-house-fast-cass-county-mo",
    "countiesAll": [
      "sell-my-house-fast-cass-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-auburn-ks",
    "name": "Auburn",
    "state": "KS",
    "geoid": "2003250",
    "population": 1261,
    "distanceMi": 67.7,
    "lat": 38.907756,
    "lon": -95.815555,
    "countySlug": "sell-my-house-fast-shawnee-county-ks",
    "countiesAll": [
      "sell-my-house-fast-shawnee-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-wathena-ks",
    "name": "Wathena",
    "state": "KS",
    "geoid": "2076000",
    "population": 1249,
    "distanceMi": 49.3,
    "lat": 39.761058,
    "lon": -94.927518,
    "countySlug": "sell-my-house-fast-doniphan-county-ks",
    "countiesAll": [
      "sell-my-house-fast-doniphan-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-rich-hill-mo",
    "name": "Rich Hill",
    "state": "MO",
    "geoid": "2961418",
    "population": 1247,
    "distanceMi": 70.3,
    "lat": 38.095871,
    "lon": -94.363462,
    "countySlug": "sell-my-house-fast-bates-county-mo",
    "countiesAll": [
      "sell-my-house-fast-bates-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-lincoln-mo",
    "name": "Lincoln",
    "state": "MO",
    "geoid": "2942608",
    "population": 1200,
    "distanceMi": 83.1,
    "lat": 38.394141,
    "lon": -93.33073,
    "countySlug": "sell-my-house-fast-benton-county-mo",
    "countiesAll": [
      "sell-my-house-fast-benton-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-pleasanton-ks",
    "name": "Pleasanton",
    "state": "KS",
    "geoid": "2056450",
    "population": 1199,
    "distanceMi": 64.1,
    "lat": 38.177877,
    "lon": -94.705328,
    "countySlug": "sell-my-house-fast-linn-county-ks",
    "countiesAll": [
      "sell-my-house-fast-linn-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-cole-camp-mo",
    "name": "Cole Camp",
    "state": "MO",
    "geoid": "2915436",
    "population": 1167,
    "distanceMi": 86.3,
    "lat": 38.459643,
    "lon": -93.202099,
    "countySlug": "sell-my-house-fast-benton-county-mo",
    "countiesAll": [
      "sell-my-house-fast-benton-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-stanberry-mo",
    "name": "Stanberry",
    "state": "MO",
    "geoid": "2970270",
    "population": 1148,
    "distanceMi": 77.2,
    "lat": 40.216583,
    "lon": -94.538093,
    "countySlug": "sell-my-house-fast-gentry-county-mo",
    "countiesAll": [
      "sell-my-house-fast-gentry-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-elwood-ks",
    "name": "Elwood",
    "state": "KS",
    "geoid": "2020950",
    "population": 1122,
    "distanceMi": 48.1,
    "lat": 39.751505,
    "lon": -94.893411,
    "countySlug": "sell-my-house-fast-doniphan-county-ks",
    "countiesAll": [
      "sell-my-house-fast-doniphan-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-st-george-ks",
    "name": "St. George",
    "state": "KS",
    "geoid": "2062200",
    "population": 1122,
    "distanceMi": 98.8,
    "lat": 39.192606,
    "lon": -96.418284,
    "countySlug": "sell-my-house-fast-pottawatomie-county-ks",
    "countiesAll": [
      "sell-my-house-fast-pottawatomie-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-linn-valley-ks",
    "name": "Linn Valley",
    "state": "KS",
    "geoid": "2041465",
    "population": 1098,
    "distanceMi": 50.6,
    "lat": 38.375386,
    "lon": -94.710899,
    "countySlug": "sell-my-house-fast-linn-county-ks",
    "countiesAll": [
      "sell-my-house-fast-linn-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-maysville-mo",
    "name": "Maysville",
    "state": "MO",
    "geoid": "2946946",
    "population": 1093,
    "distanceMi": 55.4,
    "lat": 39.885628,
    "lon": -94.368991,
    "countySlug": "sell-my-house-fast-dekalb-county-mo",
    "countiesAll": [
      "sell-my-house-fast-dekalb-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-rossville-ks",
    "name": "Rossville",
    "state": "KS",
    "geoid": "2061400",
    "population": 1090,
    "distanceMi": 73.5,
    "lat": 39.135799,
    "lon": -95.949624,
    "countySlug": "sell-my-house-fast-shawnee-county-ks",
    "countiesAll": [
      "sell-my-house-fast-shawnee-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-oskaloosa-ks",
    "name": "Oskaloosa",
    "state": "KS",
    "geoid": "2053375",
    "population": 1080,
    "distanceMi": 40.2,
    "lat": 39.215988,
    "lon": -95.314713,
    "countySlug": "sell-my-house-fast-jefferson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-jefferson-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-glasgow-mo",
    "name": "Glasgow",
    "state": "MO",
    "geoid": "2927208",
    "population": 1079,
    "distanceMi": 93.7,
    "lat": 39.228504,
    "lon": -92.837742,
    "countySlug": "sell-my-house-fast-chariton-county-mo",
    "countiesAll": [
      "sell-my-house-fast-chariton-county-mo",
      "sell-my-house-fast-howard-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-appleton-city-mo",
    "name": "Appleton City",
    "state": "MO",
    "geoid": "2901522",
    "population": 1077,
    "distanceMi": 69.4,
    "lat": 38.191141,
    "lon": -94.031668,
    "countySlug": "sell-my-house-fast-st-clair-county-mo",
    "countiesAll": [
      "sell-my-house-fast-st-clair-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-valley-falls-ks",
    "name": "Valley Falls",
    "state": "KS",
    "geoid": "2073300",
    "population": 1075,
    "distanceMi": 50.1,
    "lat": 39.339329,
    "lon": -95.461198,
    "countySlug": "sell-my-house-fast-jefferson-county-ks",
    "countiesAll": [
      "sell-my-house-fast-jefferson-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-lyndon-ks",
    "name": "Lyndon",
    "state": "KS",
    "geoid": "2043350",
    "population": 1039,
    "distanceMi": 68.4,
    "lat": 38.611908,
    "lon": -95.684424,
    "countySlug": "sell-my-house-fast-osage-county-ks",
    "countiesAll": [
      "sell-my-house-fast-osage-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-la-cygne-ks",
    "name": "La Cygne",
    "state": "KS",
    "geoid": "2037575",
    "population": 1035,
    "distanceMi": 52.9,
    "lat": 38.347833,
    "lon": -94.761793,
    "countySlug": "sell-my-house-fast-linn-county-ks",
    "countiesAll": [
      "sell-my-house-fast-linn-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-lake-quivira-ks",
    "name": "Lake Quivira",
    "state": "KS",
    "geoid": "2037975",
    "population": 1014,
    "distanceMi": 11,
    "lat": 39.04019,
    "lon": -94.768526,
    "countySlug": "sell-my-house-fast-wyandotte-county-ks",
    "countiesAll": [
      "sell-my-house-fast-johnson-county-ks",
      "sell-my-house-fast-wyandotte-county-ks"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-mound-city-mo",
    "name": "Mound City",
    "state": "MO",
    "geoid": "2950312",
    "population": 1012,
    "distanceMi": 79.7,
    "lat": 40.136503,
    "lon": -95.233739,
    "countySlug": "sell-my-house-fast-holt-county-mo",
    "countiesAll": [
      "sell-my-house-fast-holt-county-mo"
    ],
    "tier": 5
  },
  {
    "slug": "sell-my-house-fast-la-monte-mo",
    "name": "La Monte",
    "state": "MO",
    "geoid": "2940520",
    "population": 1008,
    "distanceMi": 66.1,
    "lat": 38.771682,
    "lon": -93.423907,
    "countySlug": "sell-my-house-fast-pettis-county-mo",
    "countiesAll": [
      "sell-my-house-fast-pettis-county-mo"
    ],
    "tier": 5
  }
];

const CLEAN = /\s+(city|town|village|CDP|borough)$/i;

export function slugifyPlace(
  rawName: string,
  state: StateCode,
  _kind: "city" | "county"
): string {
  const base = rawName
    .replace(CLEAN, "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['\u2019.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `sell-my-house-fast-${base}-${state.toLowerCase()}`;
}
