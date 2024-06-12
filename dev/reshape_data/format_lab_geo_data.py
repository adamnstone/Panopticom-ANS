import json

with open("../datasets/unformatted_datasets/labs_clean.json", "r", encoding="utf-8") as file:
    labs_clean = json.load(file)

labs_important = [{'hoverLabel': l['name'], 'pos': {'lat': l['latitude'], 'lng': l['longitude']}} for l in labs_clean]

formatted_data = [{
    "zoomLevel": 150,
    "dataType": "cylinder",
    "data": []
}]

obj_to_append = formatted_data[0]['data']
for item in labs_important:
    obj_to_append.append({})
    current_dict = obj_to_append[-1]
    current_dict['hoverLabel'] = item['hoverLabel']
    current_dict['pos'] = item['pos']
    current_dict['height'] = 1
    current_dict['color'] = 'rgba(0,255,0,1)'
    
with open("../datasets/formatted_datasets/labs_geo_data.jsonl", "w") as file:
    json.dump(formatted_data, file)