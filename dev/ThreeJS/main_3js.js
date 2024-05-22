// Expert Network Map Data URL: https://gitlab.fabcloud.org/pub/project/expert-network-map/-/raw/main/public/final_data.json?ref_type=heads

// Expert Network Map data subject areas
const subjectAreas = [
  "Computer-Aided Design",
  "Computer-Controlled Cutting",
  "Embedded Programing",
  "3D Scanning and Printing",
  "Electronics Design",
  "Computer-Controlled Machining",
  "Electronics Production",
  "Mechanical Design, Machine Design",
  "Input Devices",
  "Moulding and Casting",
  "Output Devices",
  "Embedded Networking and Communications",
  "Interface and Application Programming",
  "Wildcard Week",
  "Applications and Implications",
  "Invention, Intellectual Property and Business Models",
  "Final Project",
]

// Expert Network Map data color scheme by subject area
const subjectAreasToColors = {
  "Computer-Aided Design": "magenta",
  "Computer-Controlled Cutting": "orange",
  "Embedded Programing": "salmon",
  "3D Scanning and Printing": "navy",
  "Electronics Design": "lime",
  "Computer-Controlled Machining": "brown",
  "Electronics Production": "indigo",
  "Mechanical Design, Machine Design": "black",
  "Input Devices": "yellow",
  "Moulding and Casting": "violet",
  "Output Devices": "green",
  "Embedded Networking and Communications": "blue",
  "Interface and Application Programming": "red",
  "Wildcard Week": "purple",
  "Applications and Implications": "grey",
  "Invention, Intellectual Property and Business Models": "pink",
  "Final Project": "white",
};

// dictionary with keys of lab names and values of a list of the corresponding URL codes -- from Expert Network Map
const codesFromNames = {"Vujade": ["vujade"], "Unitec": ["unitec"], "Skylabworkshop": ["skylab"], "Sanjivani": ["sanjivani"], "Querétaro": ["queretaro"], "Litchee": ["litchee"], "Lake Mac": ["lakemac"], "Hope Lab": ["hopelab"], "DGI": ["dgi"], "Creative Spark": ["creativespark"], "XLAB Bangor": ["bangor"], "Al Jazri": ["aljazri"], "Talents": ["talents"], "AgriLab": ["agrilab"], "Amsterdam": ["fablabamsterdam"], "IED Madrid": ["ied"], "Bhutan": ["bhutan"], "Sorbonne University": ["fablabsorbonne", "sorbonne"], "ULB Charleroi": ["fablabulb", "ulb", "fabc"], "Leon": ["fablableon", "leon"], "Dilijan": ["dilijan"], "Universitario CIDi": ["cidi"], "Vestmannaeyjar": ["falabvestmannaeyjar", "vestmannaeyjar"], "Vancouver": ["vancouver"], "Waag": ["waag"], "EnergyLab-Lomé": ["energylab"], "Spinderihallerne": ["fablabspinderihallerne"], "New Cairo": ["newcairo"], "EchoFab": ["echofab", "fablabechofab"], "CEPT": ["cept", "fablabcept"], "Khairpur": ["fablabkhairpur", "khairpur"], "Reykjavik": ["fablabreykjavik", "reykjavik"], "Egypt": ["egypt", "fablabegypt"], "Oulu": ["fablaboulu", "oulu"], "Berytech": ["berytech", "fablabberytech"], "Bahrain": ["bahrain", "fablabbahrain"], "Charlotte Latin": ["charlotte", "fablabcharlottelatin"], "Santa Chiara": ["fablabsiena", "santachiara"], "Digiscope": ["digiscope", "fablabdigiscope"], "BoldLab": ["seoul", "fablabseoul", "fablabseoulinnovation", "boldseoul", "seoulinnovation"], "Beijing": ["fablabbeijing"], "O Shanghai": ["fablaboshanghai", "oshanghai"], "Aalto": ["aalto", "fablabaalto"], "La Machinerie": ["lamachinerie"], "Dassault Systemes": ["dassault", "fablabdassault"], "Kannai": ["kannai"], "ZOI": ["fablabzoi", "zoi"], "Irbid": ["fablabirbid", "irbid"], "Kamakura": ["fablabkamakura", "kamakura"], "Brighton": ["brighton", "fablabbrighton"], "AKGEC": ["akgec", "fablabakgec"], "Opendot": ["fablabopendot", "opendot"], "EcoStudio": ["ecostudio", "fablabecostudio"], "FCT": ["fct", "fablabfct"], "Bottrop": ["bottrop", "fablabbottrop"], "Aachen": ["aachen", "fablabaachen"], "Trivandrum": ["fablabtrivandrum", "trivandrum"], "UAE": ["fablabuae", "uae"], "Kochi": ["fablabkochi", "kochi"], "TechWorks Amman": ["fablabtechworks", "techworks"], "Singapore": ["singapore"], "LazLab": ["lakazlab"], "Vigyan Asharm": ["fablabvigyanasharm", "vigyanashram"], "Puebla": ["fablabpuebla", "puebla"], "Wheaton": ["wheaton"], "Ciudad Mexico": ["ciudadmexico"], "Barcelona": ["barcelona"], "Incite Focus": ["incitefocus", "fablabincitefocus"], "Santiago": ["fablabsantiago"], "Winam": ["winam"], "Kamp-Lintfort": ["fablabkamplintfort", "kamplintfort"], "TECSUP": ["fablabtecsup", "tecsup", "tecsupaqp"], "QBIC": ["qbic"], "ESAN": ["esan", "fablabesan"], "Rwanda": ["fablabrwanda", "rwanda"], "Lorain College": ["fablablccc", "lccc"], "Bhubaneswar": ["bhubaneswar"], "SZOIL": ["fablabszoil", "szoil"], "UTEC": ["fablabutec", "utec"], "Lima": ["lima"], "Taipei": ["taipei"], "Ucontinental": ["ucontinental"], "Akureyri": ["akureyri"], "Algarve": ["algarve", "farmlabalgarve"], "Bangalore": ["bangalore"], "Benfica": ["benfica"], "Chaihuo": ["chaihuo"], "Chandigarh": ["chandigarh"], "CIT": ["cit"], "CPCC": ["cpcc"], "Crunchlab": ["crunchlab", "fablabcrunchlab"], "Deusto": ["deusto", "falabdeusto"], "Dhahran": ["dhahran"], "ECAE": ["ecae"], "ESNE": ["esne"], "At3flo": ["fablabat3flo"], "Erfindergarden": ["fablaberfindergarden"], "Facens": ["fablabfacens"], "Gearbox": ["fablabgearbox"], "Isafjorour": ["fablabisafjorour", "isafjorour"], "KromLaboro": ["fablabkromlaboro"], "Madrid CEU": ["fablabmadridceu"], "Odessa": ["fablabodessa"], "Tembisa": ["fablabtembisa"], "Wgtn": ["fablabwgtn"], "Yachay": ["fablabyachay"], "Yucatán": ["fablabyucatan", "yucatan"], "Formshop Shanghai": ["formshop"], "Hong Kong iSPACE": ["hkispace"], "Ingegno": ["ingegno"], "INP-HB": ["inphb"], "Insper": ["insper"], "Ioannina": ["ioannina"], "Jubail": ["jubail"], "KAUST": ["kaust"], "KeoLAB": ["keolab"], "Kitakagaya": ["kitakagaya"], "Libya": ["libya"], "Napoli": ["napoli"], "Ningbo-NexMaker": ["ningbo"], "PlusX": ["plusx"], "Polytech": ["polytech"], "RIIDL": ["riidl"], "SEDI-Cup-ct": ["sedi"], "St. Jude": ["stjude"], "Tianhe Lab": ["tianhelab"], "Tinkerers": ["tinkerers"], "Twarda": ["twarda"], "UCAL": ["ucal"], "Universidad Europea": ["uemadrid"], "Ulima": ["ulima"], "SOCOM": ["fablabsocom"], "Isafjordur": ["isafjordur"]};

// dictionary with keys of URL codes and values of a list of the corresponding lab names -- from Expert Network Map
const namesFromCodes = {"vujade": "Vujade", "unitec": "Unitec", "skylab": "Skylabworkshop", "sanjivani": "Sanjivani", "queretaro": "Querétaro", "litchee": "Litchee", "lakemac": "Lake Mac", "hopelab": "Hope Lab", "dgi": "DGI", "creativespark": "Creative Spark", "bangor": "XLAB Bangor", "aljazri": "Al Jazri", "talents": "Talents", "agrilab": "AgriLab", "fablabamsterdam": "Amsterdam", "ied": "IED Madrid", "bhutan": "Bhutan", "fablabsorbonne": "Sorbonne University", "sorbonne": "Sorbonne University", "fablabulb": "ULB Charleroi", "ulb": "ULB Charleroi", "fabc": "ULB Charleroi", "fablableon": "Leon", "leon": "Leon", "dilijan": "Dilijan", "cidi": "Universitario CIDi", "falabvestmannaeyjar": "Vestmannaeyjar", "vestmannaeyjar": "Vestmannaeyjar", "vancouver": "Vancouver", "waag": "Waag", "energylab": "EnergyLab-Lomé", "fablabspinderihallerne": "Spinderihallerne", "newcairo": "New Cairo", "echofab": "EchoFab", "fablabechofab": "EchoFab", "cept": "CEPT", "fablabcept": "CEPT", "fablabkhairpur": "Khairpur", "khairpur": "Khairpur", "fablabreykjavik": "Reykjavik", "reykjavik": "Reykjavik", "egypt": "Egypt", "fablabegypt": "Egypt", "fablaboulu": "Oulu", "oulu": "Oulu", "berytech": "Berytech", "fablabberytech": "Berytech", "bahrain": "Bahrain", "fablabbahrain": "Bahrain", "charlotte": "Charlotte Latin", "fablabcharlottelatin": "Charlotte Latin", "fablabsiena": "Santa Chiara", "santachiara": "Santa Chiara", "digiscope": "Digiscope", "fablabdigiscope": "Digiscope", "seoul": "BoldLab", "fablabseoul": "BoldLab", "fablabseoulinnovation": "BoldLab", "boldseoul": "BoldLab", "seoulinnovation": "BoldLab", "fablabbeijing": "Beijing", "fablaboshanghai": "O Shanghai", "oshanghai": "O Shanghai", "aalto": "Aalto", "fablabaalto": "Aalto", "lamachinerie": "La Machinerie", "dassault": "Dassault Systemes", "fablabdassault": "Dassault Systemes", "kannai": "Kannai", "fablabzoi": "ZOI", "zoi": "ZOI", "fablabirbid": "Irbid", "irbid": "Irbid", "fablabkamakura": "Kamakura", "kamakura": "Kamakura", "brighton": "Brighton", "fablabbrighton": "Brighton", "akgec": "AKGEC", "fablabakgec": "AKGEC", "fablabopendot": "Opendot", "opendot": "Opendot", "ecostudio": "EcoStudio", "fablabecostudio": "EcoStudio", "fct": "FCT", "fablabfct": "FCT", "bottrop": "Bottrop", "fablabbottrop": "Bottrop", "aachen": "Aachen", "fablabaachen": "Aachen", "fablabtrivandrum": "Trivandrum", "trivandrum": "Trivandrum", "fablabuae": "UAE", "uae": "UAE", "fablabkochi": "Kochi", "kochi": "Kochi", "fablabtechworks": "TechWorks Amman", "techworks": "TechWorks Amman", "singapore": "Singapore", "lakazlab": "LazLab", "fablabvigyanasharm": "Vigyan Asharm", "vigyanashram": "Vigyan Asharm", "fablabpuebla": "Puebla", "puebla": "Puebla", "wheaton": "Wheaton", "ciudadmexico": "Ciudad Mexico", "fablabmexico": "Ciudad Mexico", "barcelona": "Barcelona", "incitefocus": "Incite Focus", "fablabincitefocus": "Incite Focus", "winam": "Winam", "fablabkamplintfort": "Kamp-Lintfort", "kamplintfort": "Kamp-Lintfort", "fablabtecsup": "TECSUP", "tecsup": "TECSUP", "tecsupaqp": "TECSUP", "qbic": "QBIC", "esan": "ESAN", "fablabesan": "ESAN", "fablabrwanda": "Rwanda", "rwanda": "Rwanda", "fablablccc": "Lorain College", "lccc": "Lorain College", "bhubaneswar": "Bhubaneswar", "fablabszoil": "SZOIL", "szoil": "SZOIL", "fablabutec": "UTEC", "utec": "UTEC", "lima": "Lima", "taipei": "Taipei", "ucontinental": "Ucontinental", "akureyri": "Akureyri", "algarve": "Algarve", "farmlabalgarve": "Algarve", "bangalore": "Bangalore", "benfica": "Benfica", "chaihuo": "Chaihuo", "chandigarh": "Chandigarh", "cit": "CIT", "cpcc": "CPCC", "crunchlab": "Crunchlab", "fablabcrunchlab": "Crunchlab", "deusto": "Deusto", "falabdeusto": "Deusto", "dhahran": "Dhahran", "ecae": "ECAE", "esne": "ESNE", "fablabat3flo": "At3flo", "fablaberfindergarden": "Erfindergarden", "fablabfacens": "Facens", "fablabgearbox": "Gearbox", "fablabisafjorour": "Isafjorour", "isafjorour": "Isafjorour", "fablabkromlaboro": "KromLaboro", "fablabmadridceu": "Madrid CEU", "fablabodessa": "Odessa", "fablabtembisa": "Tembisa", "fablabwgtn": "Wgtn", "fablabyachay": "Yachay", "fablabyucatan": "Yucatán", "yucatan": "Yucatán", "formshop": "Formshop Shanghai", "hkispace": "Hong Kong iSPACE", "ingegno": "Ingegno", "inphb": "INP-HB", "insper": "Insper", "ioannina": "Ioannina", "jubail": "Jubail", "kaust": "KAUST", "keolab": "KeoLAB", "kitakagaya": "Kitakagaya", "libya": "Libya", "napoli": "Napoli", "ningbo": "Ningbo-NexMaker", "plusx": "PlusX", "polytech": "Polytech", "riidl": "RIIDL", "sedi": "SEDI-Cup-ct", "stjude": "St. Jude", "tianhelab": "Tianhe Lab", "tinkerers": "Tinkerers", "twarda": "Twarda", "ucal": "UCAL", "uemadrid": "Universidad Europea", "ulima": "Ulima", "fablabsantiago": "Santiago", "fablabsocom": "SOCOM", "isafjordur": "Isafjordur"};

// every lab code (slug) in the Expert Network Map data
const allCodes = Object.keys(namesFromCodes);

window.onload = () => {

const loadLabsData = async () => fetch('../datasets/labs_clean.json').then(data => data.json());
const loadExpertNetworkMapData = async () => fetch('../datasets/exnmData.json').then(data => data.json());
const loadVolcanoesData = async () => fetch('../datasets/world_volcanoes.json').then(data => data.json());
const loadSubmarineCableData = async () => fetch('../datasets/submarine_cable_data.json').then(data => data.json());

const mainRender = async () => {

  const labs_clean = await loadLabsData();
  const exnm_data = await loadExpertNetworkMapData();
  const volcanoes = await loadVolcanoesData();
  const cablesGeo = await loadSubmarineCableData();

  // reshape submarine cable data for plotting
  let cablePaths = [];
  cablesGeo.features.forEach(({ geometry, properties }) => {
    geometry.coordinates.forEach(coords => cablePaths.push({ coords, properties }));
  });

  // dictionary where keys are lab slugs and values are the global coordinates
  const codeToLatLng = {};
  labs_clean.forEach(lc => { codeToLatLng[lc.slug] = [lc.latitude, lc.longitude] });

  // 'recognized codes' means codes (slugs) for which we have the global coordinates
  const originallyRecognizedCodes = Object.keys(codeToLatLng);

  // dictionary where keys are a code (slug) for which there aren't global coordinates and the values are a different code of the same lab for which we do have data
  // this is because some labs have changed their codes over years. For example fablabcharlottelatin --> charlotte. If we don't have the 'fablabcharlottelatin' coordinates,
  // we should just use the 'charlotte' coordinates again
  const unrecognizedCodeToRecognizedCode = {};
  const originallyUnrecognizedCodes = [];
  allCodes.forEach(c => { 
      if (originallyRecognizedCodes.includes(c)) {
          unrecognizedCodeToRecognizedCode[c] = c;
      }
      else {
          originallyUnrecognizedCodes.push(c);
      }
  });
  originallyUnrecognizedCodes.forEach(c => { 
      const equivalentCodes = codesFromNames[namesFromCodes[c]];
      for (let i = 0; i < equivalentCodes.length; i++) {
          const otherC = equivalentCodes[i];
          if (originallyRecognizedCodes.includes(otherC)) {
              unrecognizedCodeToRecognizedCode[c] = otherC;
              break;
          }
      };
  });

  // get coordinates from any lab code, recognized or unrecognized, because it is translated into the recognized lab code
  const labCodeToCoordinates = slug => {
    return codeToLatLng[unrecognizedCodeToRecognizedCode[slug]];
  }

  // TODO some expert network map labs, for example 'uae', have slugs that are not recognized in the `labs_clean.json` file

  const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
    .domain([0, 1e7]);

  const world = Globe()
    (document.getElementById('globeViz'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
    .hexBinPointWeight('pop')
    .hexAltitude(d => d.sumWeight * 6e-8)
    .hexBinResolution(4)
    .hexTopColor(d => weightColor(d.sumWeight))
    .hexSideColor(d => weightColor(d.sumWeight))
    .hexBinMerge(true)
    .enablePointerInteraction(false); // ENABLE THIS TO ALWAYS BE ABLE TO HOVER AND SEE THE EXPERT NETWORK MAP CONNECTION LABELS

  const camera = world.camera();

  // get how much the user is zoomed in
  const getZoomLevel = () => {
      // Distance from camera to globe center
      const distance = camera.position.length();

      // Camera FOV
      const fov = camera.fov;

      return {
      distance: distance,
      fov: fov,
      };
  };
  
  // to plot fab lab density in different locations. `pop` is arbitrary and adjusts the height of the yellow cylinders
  const labsData = [];
  labs_clean.forEach(l => {
      labsData.push({lng: l.longitude, lat: l.latitude, pop: 100000});
  })
  world.hexBinPointsData(labsData);
    

  // Add auto-rotation
  world.controls().autoRotate = true;
  world.controls().autoRotateSpeed = 0.6;

  // stores arcs that represents references between students on the Expert Network Map
  const arcsData = [];
  const links = exnm_data.links;
  links.forEach(l => {
      const sourceStudentLabCode = l.source.split(";")[1].split("/")[5];
      const targetStudentLabCode = l.target.split(";")[1].split("/")[5];

      const sourceStudentName = l.source.split(";")[0];
      const targetStudentName = l.target.split(";")[0];

      const startCoors = labCodeToCoordinates(sourceStudentLabCode);
      const endCoors = labCodeToCoordinates(targetStudentLabCode);

      if (!startCoors || !endCoors) {
          console.log("Lab coordinate data unavailable, skipping");
          return;
      }
      if (startCoors == endCoors) {
          console.log("Lab reference within itself, skipping");
          return;
      }

      const linkSubjectArea = l.topic;
      
      arcsData.push({
          startLat: startCoors[0],
          startLng: startCoors[1],
          endLat: endCoors[0],
          endLng: endCoors[1],
          subjectArea: linkSubjectArea, // unused currently
          color: [subjectAreasToColors[linkSubjectArea], subjectAreasToColors[linkSubjectArea]],
          strength: 0.4/l.value,
          arcLabel: `${sourceStudentName} --> ${targetStudentName}`
      });
  });

  // add arcsData to the world object
  world
    .arcsData(arcsData)
    .arcLabel(d => d.arcLabel)
    .arcColor('color')
    .arcDashLength(() => Math.random())
    .arcDashGap('strength')
    .arcDashAnimateTime(() => Math.random() * 4000 + 500);

  // update the data shown when zooming in or out
  let arcsDataShowing = true;
  window.addEventListener('wheel', () => {
      const zoomLevel = getZoomLevel().distance;
      if (zoomLevel < 250 && arcsDataShowing) {
          world.arcsData([]);
          world.heatmapsData([])
          world.pathsData(cablePaths)
          arcsDataShowing = false;
      }
      else if (zoomLevel > 300 && !arcsDataShowing) {
          world.arcsData(arcsData)
          world.heatmapsData([volcanoes])
          world.pathsData([])
          arcsDataShowing = true;
      }
  });

  const controls = world.controls();

  world
    .heatmapPointLat('lat')
    .heatmapPointLng('lon')
    .heatmapPointWeight(d => d.elevation * 5e-5)
    .heatmapTopAltitude(0.2)
    .heatmapBandwidth(1.35)
    .heatmapColorSaturation(3.2)
    
  world.heatmapsData([volcanoes])

  world
    .pathsData(cablePaths)
    .pathPoints('coords')
    .pathPointLat(p => p[1])
    .pathPointLng(p => p[0])
    .pathColor(path => path.properties.color)
    .pathLabel(path => path.properties.name)
    .pathDashLength(0.1)
    .pathDashGap(0.008)
    .pathDashAnimateTime(12000);

  // settings for toggle of whether the Expert Network Map animation should be moving or static
  let animateExNM = true;
  const updateExNMAnimation = () => {
    if (animateExNM) {
        world
        .arcsData(arcsData)
        .arcLabel(d => d.arcLabel)
        .arcColor('color')
        .arcDashLength(() => Math.random())
        .arcDashGap('strength')
        .arcDashAnimateTime(() => Math.random() * 4000 + 500); // randomness to minimize the chances of arcs overlapping creating a flickering effect; TODO instead combine arcs with multi-color arcs based on an aggregation of student data for a location
        world.enablePointerInteraction(false); 
        controls.autoRotate = true;
      }        
      else {
        controls.autoRotate = false;
        
        world
        .arcsData(arcsData)
        .arcLabel(d => d.arcLabel)
        .arcColor('color')
        .arcDashLength(0)
        .arcDashGap(0)
        .arcStroke(null)
        .arcAltitude(d => (d.strength*2) + (Math.random()/10));
        world.enablePointerInteraction(true); // turning on hover to see data when the globe is not spinning so that the performance drop is less noticable
      }
    };
    document.getElementById("exnm-checkbox").onclick = () => {
      animateExNM = !animateExNM;
      updateExNMAnimation();
    };
  };

  mainRender();
};