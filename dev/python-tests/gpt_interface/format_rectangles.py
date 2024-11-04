import json, pickle
from optimize_rects import data_to_rects
from plot_rectangles import plot_geojson

def generate_global_rectangles():
    rectangles = []
    lat_steps, lon_steps = 80, 80
    lat_step = 180 / lat_steps  # Divide the globe into 4 latitudinal steps (90 to -90 degrees)
    lon_step = 360 / lon_steps  # Divide the globe into 5 longitudinal steps (180 to -180 degrees)

    for lat_index in range(lat_steps):
        for lon_index in range(lon_steps):
            lat_min = -90 + lat_index * lat_step
            lat_max = lat_min + lat_step
            lon_min = -180 + lon_index * lon_step
            lon_max = lon_min + lon_step

            rectangles.append({
                'lat_min': lat_min,
                'lat_max': lat_max,
                'lon_min': lon_min,
                'lon_max': lon_max
            })

    return rectangles

global_rectangles = generate_global_rectangles()

rect_ids = {}
for i in range(len(global_rectangles)):
    rect_ids[i] = global_rectangles[i]

dataset_path = "../../../public/datasets/formatted_datasets/"

for layer_id in ["labs", "individual_stories", "music_narrative", "radio_hex", "dance"]:
    with open(f"{dataset_path}{layer_id}.jsonl", "rb") as file:
        cont = json.load(file)

    cont_rects, cont_values = data_to_rects(cont[0]['data'], threshold=100)
    with open(f"rectized_datasets/{layer_id}.obj", "wb") as file:
        pickle.dump([cont_rects, cont_values], file)
    plot_geojson([cont_rects[_] for _ in cont_rects.keys()], layer_id)

# rect_counts = {}
# for i in range(len(global_rectangles)):
#     rect_counts[i] = 0

# for item in labs[0]['data']:
#     coords = item['pos']
#     lat = coords['lat']
#     lng = coords['lng']
#     for i in range(len(global_rectangles)):
#         rect = global_rectangles[i]
#         if rect['lat_min'] <= lat < rect['lat_max'] and rect['lon_min'] <= lng < rect['lon_max']:
#             rect_counts[i] += 1
#             break
#     else:
#         raise Exception("coordinate in no rectangles")
    
# print(rect_counts, max([rect_counts[_] for _ in list(rect_counts.keys())]))