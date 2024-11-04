import geojson, folium

def convert_to_geojson(rectangles):
    features = []
    for rect in rectangles:
        polygon = geojson.Polygon([[
            (rect['lon_min'], rect['lat_min']),
            (rect['lon_min'], rect['lat_max']),
            (rect['lon_max'], rect['lat_max']),
            (rect['lon_max'], rect['lat_min']),
            (rect['lon_min'], rect['lat_min'])
        ]])
        features.append(geojson.Feature(geometry=polygon))
    return geojson.FeatureCollection(features)

def plot_geojson(rects, layer_id):
    geojson_data = convert_to_geojson(rects)
    # Create a folium map centered at (0, 0)
    m = folium.Map(location=[0, 0], zoom_start=2)

    # Add the GeoJSON layer to the map
    folium.GeoJson(geojson_data).add_to(m)

    # Save the map to an HTML file
    m.save(f"{layer_id}_rectangles_map.html")