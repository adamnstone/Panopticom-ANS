import pickle

layer_ids = ["labs", "individual_stories", "music_narrative", "radio_hex", "dance"]

rect_datas = []

for i in layer_ids:
    with open(f"rectized_datasets/{i}.obj", "rb") as file:
        rect_datas.append(pickle.load(file))

def format_data_str(data_tup, lay):
    s = []
    id_ctr = 0
    rect_d, val_d = data_tup
    items = [(rect_d[_], val_d[_]) for _ in sorted(list(rect_d.keys()))]
    for rect, val in items:
        id_it = f"(ID: {lay}_{id_ctr}, RECT: ({rect['lat_min']},{rect['lat_max']},{rect['lon_min']},{rect['lon_max']}), #_PTS: {val})"
        s.append(id_it)
        id_ctr += 1
    return ",".join(s)



r_str = "\n\n".join([f"'{item}' Rectangles (RECT format = (lat_min, lat_max, lon_min, lon_max)): {format_data_str(rect_data, item)}" for item, rect_data in zip(layer_ids, rect_datas)])

with open("rectized_datasets/rect_data.obj", "wb") as file:
    pickle.dump(zip(layer_ids, rect_datas), file)

with open("rectized_datasets/comp_str.obj", "wb") as file:
    pickle.dump(r_str, file)