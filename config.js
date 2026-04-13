// Shared front-end configuration for the National ID booking system.
// Each province uses its own Google Apps Script Web App URL and Google Sheet backend.
(function () {
  const AGENCY_NAME = "Philippine Statistics Authority - Regional Statistical Services No. 8";
  const DEFAULT_PROVINCE = "SOUTHERN_LEYTE";

  const PROVINCES = [
    {
      key: "BILIRAN",
      label: "BILIRAN",
      execUrl: "https://script.google.com/macros/s/AKfycby_u5ny8P7l5quxJuVExcVwsGO3rw4ldjJRRgTBnRbvd1oAwqpiV30vpx-znPIf2ZrX/exec",
      addressLines: [
        "G/F DEMC Complex Commercial Building",
        "P. Inocentes Street, Brgy. Padre Inocentes Garcia",
        "Naval, Biliran 6560"
      ]
    },
    {
      key: "LEYTE",
      label: "LEYTE",
      execUrl: "https://script.google.com/macros/s/AKfycbwoRw6KMj8kWVhDVQ_VZjN7S659q8jVy24lJFRMsmI-liqNVdZdeXAFBAamZTEg002O/exec",
      addressLines: [
        "G/F Gaisano Real",
        "Brgy. 52 Real St., Tacloban City",
        "Leyte"
      ]
    },
    {
      key: "EASTERN_SAMAR",
      label: "EASTERN SAMAR",
      execUrl: "https://script.google.com/macros/s/AKfycbwyRFGAxN6HGQ-r1jCkCrKEel929MFbEHEycGw7fJEgZ32z3xJTS49rzjwa7v5KB-M3tg/exec",
      addressLines: [
        "G/F JB Japzon Bldg.",
        "Circumferential Road, Brgy. Balud",
        "Borongan City, Eastern Samar"
      ]
    },
    {
      key: "NORTHERN_SAMAR",
      label: "NORTHERN SAMAR",
      execUrl: "https://script.google.com/macros/s/AKfycbwAiGuFHXcMy2DcsVR3C1SosXNYVHZ3NJJdvsQblS8Kd1c5MvIgF4alBh1VIAB42uoiuQ/exec",
      addressLines: [
        "G/F, Benpres Business Center",
        "Brgy. Macagtas",
        "Catarman, Northern Samar"
      ]
    },
    {
      key: "WESTERN_SAMAR",
      label: "WESTERN SAMAR",
      execUrl: "https://script.google.com/macros/s/AKfycbxQ8hf2ocHorty06GOa0xFl3ni5abx8FiQK1Cz_hSu-y9I_QkXLvUGqn99dMbl42njb/exec",
      addressLines: [
        "G/F Freedom Estates Corp. Building",
        "Del Rosario St. Corner Rizal Avenue",
        "Brgy. 04, City of Catbalogan, Samar 6700"
      ]
    },
    {
      key: "SOUTHERN_LEYTE",
      label: "SOUTHERN LEYTE",
      execUrl: "https://script.google.com/macros/s/AKfycbwX5tgcvZtl3BPQ7RtCPn6EoLKx2GBxCG6zEbUlWIsabKeJfEwFH5XusI6Vu8B145Wf3g/exec",
      addressLines: [
        "2nd Floor SJC Building",
        "Tunga-Tunga, Maasin City",
        "Southern Leyte"
      ]
    }
  ];

  const provinceByKey = PROVINCES.reduce((map, province) => {
    map[province.key] = province;
    return map;
  }, {});

  function normalizeProvinceKey(value) {
    return String(value || "")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  function getProvinceConfig(value) {
    return provinceByKey[normalizeProvinceKey(value)] || provinceByKey[DEFAULT_PROVINCE];
  }

  function getExecUrl(value) {
    const province = getProvinceConfig(value);
    return province ? province.execUrl : "";
  }

  function getProvinceOptions() {
    return PROVINCES.map(province => ({
      key: province.key,
      label: province.label
    }));
  }

  window.NID_API_CONFIG = Object.freeze({
    AGENCY_NAME,
    DEFAULT_PROVINCE,
    PROVINCES: Object.freeze(PROVINCES),
    normalizeProvinceKey,
    getProvinceConfig,
    getExecUrl,
    getProvinceOptions
  });
})();
