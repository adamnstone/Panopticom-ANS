import json

subjectAreas = [
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

subjectAreasToColors = {
  "Computer-Aided Design": "rgba(255,51,255,1)",
  "Computer-Controlled Cutting": "rgba(255,128,0,1)",
  "Embedded Programing": "rgba(255,153,204,1)",
  "3D Scanning and Printing": "rgba(0,0,255,1)",
  "Electronics Design": "rgba(51,251,153,1)",
  "Computer-Controlled Machining": "rgba(102,51,0,1)",
  "Electronics Production": "rgba(102,0,204,1)",
  "Mechanical Design, Machine Design": "rgba(0,0,0,1)",
  "Input Devices": "rgba(255,255,0,1)",
  "Moulding and Casting": "rgba(204,153,255,1)",
  "Output Devices": "rgba(0,255,0,1)",
  "Embedded Networking and Communications": "rgba(0,0,255,1)",
  "Interface and Application Programming": "rgba(255,0,0,1)",
  "Wildcard Week": "rgba(102,0,102,1)",
  "Applications and Implications": "rgba(160,160,160,1)",
  "Invention, Intellectual Property and Business Models": "rgba(255,51,153,1)",
  "Final Project": "rgba(255,255,255,1)",
}

codes_from_names = {"Vujade": ["vujade"], "Unitec": ["unitec"], "Skylabworkshop": ["skylab"], "Sanjivani": ["sanjivani"], "Querétaro": ["queretaro"], "Litchee": ["litchee"], "Lake Mac": ["lakemac"], "Hope Lab": ["hopelab"], "DGI": ["dgi"], "Creative Spark": ["creativespark"], "XLAB Bangor": ["bangor"], "Al Jazri": ["aljazri"], "Talents": ["talents"], "AgriLab": ["agrilab"], "Amsterdam": ["fablabamsterdam"], "IED Madrid": ["ied"], "Bhutan": ["bhutan"], "Sorbonne University": ["fablabsorbonne", "sorbonne"], "ULB Charleroi": ["fablabulb", "ulb", "fabc"], "Leon": ["fablableon", "leon"], "Dilijan": ["dilijan"], "Universitario CIDi": ["cidi"], "Vestmannaeyjar": ["falabvestmannaeyjar", "vestmannaeyjar"], "Vancouver": ["vancouver"], "Waag": ["waag"], "EnergyLab-Lomé": ["energylab"], "Spinderihallerne": ["fablabspinderihallerne"], "New Cairo": ["newcairo"], "EchoFab": ["echofab", "fablabechofab"], "CEPT": ["cept", "fablabcept"], "Khairpur": ["fablabkhairpur", "khairpur"], "Reykjavik": ["fablabreykjavik", "reykjavik"], "Egypt": ["egypt", "fablabegypt"], "Oulu": ["fablaboulu", "oulu"], "Berytech": ["berytech", "fablabberytech"], "Bahrain": ["bahrain", "fablabbahrain"], "Charlotte Latin": ["charlotte", "fablabcharlottelatin"], "Santa Chiara": ["fablabsiena", "santachiara"], "Digiscope": ["digiscope", "fablabdigiscope"], "BoldLab": ["seoul", "fablabseoul", "fablabseoulinnovation", "boldseoul", "seoulinnovation"], "Beijing": ["fablabbeijing"], "O Shanghai": ["fablaboshanghai", "oshanghai"], "Aalto": ["aalto", "fablabaalto"], "La Machinerie": ["lamachinerie"], "Dassault Systemes": ["dassault", "fablabdassault"], "Kannai": ["kannai"], "ZOI": ["fablabzoi", "zoi"], "Irbid": ["fablabirbid", "irbid"], "Kamakura": ["fablabkamakura", "kamakura"], "Brighton": ["brighton", "fablabbrighton"], "AKGEC": ["akgec", "fablabakgec"], "Opendot": ["fablabopendot", "opendot"], "EcoStudio": ["ecostudio", "fablabecostudio"], "FCT": ["fct", "fablabfct"], "Bottrop": ["bottrop", "fablabbottrop"], "Aachen": ["aachen", "fablabaachen"], "Trivandrum": ["fablabtrivandrum", "trivandrum"], "UAE": ["fablabuae", "uae"], "Kochi": ["fablabkochi", "kochi"], "TechWorks Amman": ["fablabtechworks", "techworks"], "Singapore": ["singapore"], "LazLab": ["lakazlab"], "Vigyan Asharm": ["fablabvigyanasharm", "vigyanashram"], "Puebla": ["fablabpuebla", "puebla"], "Wheaton": ["wheaton"], "Ciudad Mexico": ["ciudadmexico"], "Barcelona": ["barcelona"], "Incite Focus": ["incitefocus", "fablabincitefocus"], "Santiago": ["fablabsantiago"], "Winam": ["winam"], "Kamp-Lintfort": ["fablabkamplintfort", "kamplintfort"], "TECSUP": ["fablabtecsup", "tecsup", "tecsupaqp"], "QBIC": ["qbic"], "ESAN": ["esan", "fablabesan"], "Rwanda": ["fablabrwanda", "rwanda"], "Lorain College": ["fablablccc", "lccc"], "Bhubaneswar": ["bhubaneswar"], "SZOIL": ["fablabszoil", "szoil"], "UTEC": ["fablabutec", "utec"], "Lima": ["lima"], "Taipei": ["taipei"], "Ucontinental": ["ucontinental"], "Akureyri": ["akureyri"], "Algarve": ["algarve", "farmlabalgarve"], "Bangalore": ["bangalore"], "Benfica": ["benfica"], "Chaihuo": ["chaihuo"], "Chandigarh": ["chandigarh"], "CIT": ["cit"], "CPCC": ["cpcc"], "Crunchlab": ["crunchlab", "fablabcrunchlab"], "Deusto": ["deusto", "falabdeusto"], "Dhahran": ["dhahran"], "ECAE": ["ecae"], "ESNE": ["esne"], "At3flo": ["fablabat3flo"], "Erfindergarden": ["fablaberfindergarden"], "Facens": ["fablabfacens"], "Gearbox": ["fablabgearbox"], "Isafjorour": ["fablabisafjorour", "isafjorour"], "KromLaboro": ["fablabkromlaboro"], "Madrid CEU": ["fablabmadridceu"], "Odessa": ["fablabodessa"], "Tembisa": ["fablabtembisa"], "Wgtn": ["fablabwgtn"], "Yachay": ["fablabyachay"], "Yucatán": ["fablabyucatan", "yucatan"], "Formshop Shanghai": ["formshop"], "Hong Kong iSPACE": ["hkispace"], "Ingegno": ["ingegno"], "INP-HB": ["inphb"], "Insper": ["insper"], "Ioannina": ["ioannina"], "Jubail": ["jubail"], "KAUST": ["kaust"], "KeoLAB": ["keolab"], "Kitakagaya": ["kitakagaya"], "Libya": ["libya"], "Napoli": ["napoli"], "Ningbo-NexMaker": ["ningbo"], "PlusX": ["plusx"], "Polytech": ["polytech"], "RIIDL": ["riidl"], "SEDI-Cup-ct": ["sedi"], "St. Jude": ["stjude"], "Tianhe Lab": ["tianhelab"], "Tinkerers": ["tinkerers"], "Twarda": ["twarda"], "UCAL": ["ucal"], "Universidad Europea": ["uemadrid"], "Ulima": ["ulima"], "SOCOM": ["fablabsocom"], "Isafjordur": ["isafjordur"]}

names_from_codes = {"vujade": "Vujade", "unitec": "Unitec", "skylab": "Skylabworkshop", "sanjivani": "Sanjivani", "queretaro": "Querétaro", "litchee": "Litchee", "lakemac": "Lake Mac", "hopelab": "Hope Lab", "dgi": "DGI", "creativespark": "Creative Spark", "bangor": "XLAB Bangor", "aljazri": "Al Jazri", "talents": "Talents", "agrilab": "AgriLab", "fablabamsterdam": "Amsterdam", "ied": "IED Madrid", "bhutan": "Bhutan", "fablabsorbonne": "Sorbonne University", "sorbonne": "Sorbonne University", "fablabulb": "ULB Charleroi", "ulb": "ULB Charleroi", "fabc": "ULB Charleroi", "fablableon": "Leon", "leon": "Leon", "dilijan": "Dilijan", "cidi": "Universitario CIDi", "falabvestmannaeyjar": "Vestmannaeyjar", "vestmannaeyjar": "Vestmannaeyjar", "vancouver": "Vancouver", "waag": "Waag", "energylab": "EnergyLab-Lomé", "fablabspinderihallerne": "Spinderihallerne", "newcairo": "New Cairo", "echofab": "EchoFab", "fablabechofab": "EchoFab", "cept": "CEPT", "fablabcept": "CEPT", "fablabkhairpur": "Khairpur", "khairpur": "Khairpur", "fablabreykjavik": "Reykjavik", "reykjavik": "Reykjavik", "egypt": "Egypt", "fablabegypt": "Egypt", "fablaboulu": "Oulu", "oulu": "Oulu", "berytech": "Berytech", "fablabberytech": "Berytech", "bahrain": "Bahrain", "fablabbahrain": "Bahrain", "charlotte": "Charlotte Latin", "fablabcharlottelatin": "Charlotte Latin", "fablabsiena": "Santa Chiara", "santachiara": "Santa Chiara", "digiscope": "Digiscope", "fablabdigiscope": "Digiscope", "seoul": "BoldLab", "fablabseoul": "BoldLab", "fablabseoulinnovation": "BoldLab", "boldseoul": "BoldLab", "seoulinnovation": "BoldLab", "fablabbeijing": "Beijing", "fablaboshanghai": "O Shanghai", "oshanghai": "O Shanghai", "aalto": "Aalto", "fablabaalto": "Aalto", "lamachinerie": "La Machinerie", "dassault": "Dassault Systemes", "fablabdassault": "Dassault Systemes", "kannai": "Kannai", "fablabzoi": "ZOI", "zoi": "ZOI", "fablabirbid": "Irbid", "irbid": "Irbid", "fablabkamakura": "Kamakura", "kamakura": "Kamakura", "brighton": "Brighton", "fablabbrighton": "Brighton", "akgec": "AKGEC", "fablabakgec": "AKGEC", "fablabopendot": "Opendot", "opendot": "Opendot", "ecostudio": "EcoStudio", "fablabecostudio": "EcoStudio", "fct": "FCT", "fablabfct": "FCT", "bottrop": "Bottrop", "fablabbottrop": "Bottrop", "aachen": "Aachen", "fablabaachen": "Aachen", "fablabtrivandrum": "Trivandrum", "trivandrum": "Trivandrum", "fablabuae": "UAE", "uae": "UAE", "fablabkochi": "Kochi", "kochi": "Kochi", "fablabtechworks": "TechWorks Amman", "techworks": "TechWorks Amman", "singapore": "Singapore", "lakazlab": "LazLab", "fablabvigyanasharm": "Vigyan Asharm", "vigyanashram": "Vigyan Asharm", "fablabpuebla": "Puebla", "puebla": "Puebla", "wheaton": "Wheaton", "ciudadmexico": "Ciudad Mexico", "fablabmexico": "Ciudad Mexico", "barcelona": "Barcelona", "incitefocus": "Incite Focus", "fablabincitefocus": "Incite Focus", "winam": "Winam", "fablabkamplintfort": "Kamp-Lintfort", "kamplintfort": "Kamp-Lintfort", "fablabtecsup": "TECSUP", "tecsup": "TECSUP", "tecsupaqp": "TECSUP", "qbic": "QBIC", "esan": "ESAN", "fablabesan": "ESAN", "fablabrwanda": "Rwanda", "rwanda": "Rwanda", "fablablccc": "Lorain College", "lccc": "Lorain College", "bhubaneswar": "Bhubaneswar", "fablabszoil": "SZOIL", "szoil": "SZOIL", "fablabutec": "UTEC", "utec": "UTEC", "lima": "Lima", "taipei": "Taipei", "ucontinental": "Ucontinental", "akureyri": "Akureyri", "algarve": "Algarve", "farmlabalgarve": "Algarve", "bangalore": "Bangalore", "benfica": "Benfica", "chaihuo": "Chaihuo", "chandigarh": "Chandigarh", "cit": "CIT", "cpcc": "CPCC", "crunchlab": "Crunchlab", "fablabcrunchlab": "Crunchlab", "deusto": "Deusto", "falabdeusto": "Deusto", "dhahran": "Dhahran", "ecae": "ECAE", "esne": "ESNE", "fablabat3flo": "At3flo", "fablaberfindergarden": "Erfindergarden", "fablabfacens": "Facens", "fablabgearbox": "Gearbox", "fablabisafjorour": "Isafjorour", "isafjorour": "Isafjorour", "fablabkromlaboro": "KromLaboro", "fablabmadridceu": "Madrid CEU", "fablabodessa": "Odessa", "fablabtembisa": "Tembisa", "fablabwgtn": "Wgtn", "fablabyachay": "Yachay", "fablabyucatan": "Yucatán", "yucatan": "Yucatán", "formshop": "Formshop Shanghai", "hkispace": "Hong Kong iSPACE", "ingegno": "Ingegno", "inphb": "INP-HB", "insper": "Insper", "ioannina": "Ioannina", "jubail": "Jubail", "kaust": "KAUST", "keolab": "KeoLAB", "kitakagaya": "Kitakagaya", "libya": "Libya", "napoli": "Napoli", "ningbo": "Ningbo-NexMaker", "plusx": "PlusX", "polytech": "Polytech", "riidl": "RIIDL", "sedi": "SEDI-Cup-ct", "stjude": "St. Jude", "tianhelab": "Tianhe Lab", "tinkerers": "Tinkerers", "twarda": "Twarda", "ucal": "UCAL", "uemadrid": "Universidad Europea", "ulima": "Ulima", "fablabsantiago": "Santiago", "fablabsocom": "SOCOM", "isafjordur": "Isafjordur"}

with open("../datasets/unformatted_datasets/exnmData.json", "r", encoding="utf-8") as file:
    exnm_data = json.load(file)

with open("../datasets/unformatted_datasets/labs_clean.json", "r", encoding="utf-8") as file:
    labs_clean = json.load(file)

# Dictionary to store latitude and longitude for each code
code_to_lat_lng = {lc['slug']: [lc['latitude'], lc['longitude']] for lc in labs_clean}

# Recognized codes are the keys for which we have global coordinates
originally_recognized_codes = list(code_to_lat_lng.keys())

# Dictionary for unrecognized codes that maps to recognized codes
unrecognized_code_to_recognized_code = {}
originally_unrecognized_codes = []

all_codes = names_from_codes.keys()

for c in all_codes:
    if c in originally_recognized_codes:
        unrecognized_code_to_recognized_code[c] = c
    else:
        originally_unrecognized_codes.append(c)

for c in originally_unrecognized_codes:
    equivalent_codes = codes_from_names[names_from_codes[c]]
    for other_c in equivalent_codes:
        if other_c in originally_recognized_codes:
            unrecognized_code_to_recognized_code[c] = other_c
            break

# Function to get coordinates from any lab code, recognized or unrecognized
def lab_code_to_coordinates(slug):
    recognized_code = unrecognized_code_to_recognized_code.get(slug)
    return code_to_lat_lng.get(recognized_code)

# Example usage:
# print(lab_code_to_coordinates('some_slug'))

def are_labs_same(lab1, lab2):
    return unrecognized_code_to_recognized_code.get(lab1) == unrecognized_code_to_recognized_code.get(lab2)

output_data = {}

i = 0
for l in exnm_data['links']:
    source_lab = l['source'].split(";")[1].split("/")[5]
    target_lab = l['target'].split(";")[1].split("/")[5]
    if (lab_code_to_coordinates(source_lab) is None) or (lab_code_to_coordinates(target_lab) is None):
        print("Lab not included in geographical data... skipping...", source_lab, '-->', target_lab)
        continue
    i += 1
    rec_source_lab = unrecognized_code_to_recognized_code.get(source_lab)
    rec_target_lab = unrecognized_code_to_recognized_code.get(target_lab)
    if rec_source_lab == rec_target_lab: continue
    subj = l['topic']
    if not (rec_source_lab in output_data):
        output_data[rec_source_lab] = {rec_target_lab: {subj: 1}}
    else:
        lab_dict = output_data[rec_source_lab]
        if not (rec_target_lab in lab_dict):
            lab_dict[rec_target_lab] = {subj: 1}
        else:
            sub_lab_dict = lab_dict[rec_target_lab]
            if not (subj in sub_lab_dict):
                sub_lab_dict[subj] = 1
            else:
                sub_lab_dict[subj] += 1

print(output_data)

print(str(100 * i / len(exnm_data['links'])) + "% of links usable because lab was recognized")

# convert the output_data to the JSONL format for the panopticom

formatted_data = [{
    "zoomLevel": 300,
    "dataType": "arc",
    "data": []
}]

obj_to_append = formatted_data[0]['data']
for source_lab in output_data.keys():
    for target_lab in output_data[source_lab]:
        obj_to_append.append({})
        current_dict = obj_to_append[-1]

        current_dict['hoverLabel'] = f"{names_from_codes[source_lab]} --> {names_from_codes[target_lab]}; {sum([output_data[source_lab][target_lab][subj] for subj in output_data[source_lab][target_lab]])}"
        current_dict['start'] = {
            "lat": lab_code_to_coordinates(source_lab)[0],
            "lng": lab_code_to_coordinates(source_lab)[1]
        }
        current_dict['end'] = {
            "lat": lab_code_to_coordinates(target_lab)[0],
            "lng": lab_code_to_coordinates(target_lab)[1]
        }
        current_dict['height'] = 10
        current_dict['dashLength'] = []
        current_dict['gapLength'] = 0.35
        current_dict['color'] = []
        for subj in output_data[source_lab][target_lab]:
            current_dict['dashLength'].append(output_data[source_lab][target_lab][subj]/4)
            current_dict['color'].append(subjectAreasToColors[subj])
        current_dict['thickness'] = 0
        current_dict['animationTime'] = 2000


with open("../datasets/formatted_datasets/exnm_data.jsonl", "w") as file:
    json.dump(formatted_data, file)

# TODO encode `animationTime` as a property value - even randomness makes it look very aesthetically pleasing with the variation