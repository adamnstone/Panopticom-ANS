import json

capitals_coordinates = {
    'Argentina': (-34.6037, -58.3816),      # Buenos Aires
    'Brasil': (-15.7939, -47.8828),         # Brasília
    'Canada': (45.4215, -75.6972),          # Ottawa
    'Italy': (41.9028, 12.4964),            # Rome
    'Japan': (35.6895, 139.6917),           # Tokyo
    'Thailand': (13.7563, 100.5018),        # Bangkok
    'UK': (51.5074, -0.1278),               # London
    'Australia': (-35.2809, 149.1300),      # Canberra
    'Austria': (48.2082, 16.3738),          # Vienna
    'Belgium': (50.8503, 4.3517),           # Brussels
    'Bolivia': (-16.5000, -68.1500),        # Sucre
    'Chile': (-33.4489, -70.6693),          # Santiago
    'China': (39.9042, 116.4074),           # Beijing
    'Colombia': (4.7110, -74.0721),         # Bogotá
    'Croatia': (45.8150, 15.9819),          # Zagreb
    'Czech Republic': (50.0755, 14.4378),   # Prague
    'Denmark': (55.6761, 12.5683),          # Copenhagen
    'Ecuador': (-0.1807, -78.4678),         # Quito
    'Finland': (60.1695, 24.9354),          # Helsinki
    'France': (48.8566, 2.3522),            # Paris
    'Germany': (52.5200, 13.4050),          # Berlin
    'Greece': (37.9838, 23.7275),           # Athens
    'Hong Kong': (22.3193, 114.1694),       # Hong Kong
    'Hungary': (47.4979, 19.0402),          # Budapest
    'Iceland': (64.1355, -21.8954),         # Reykjavik
    'India': (28.6139, 77.2090),            # New Delhi
    'Indonesia': (-6.2088, 106.8456),       # Jakarta
    'Ireland': (53.3498, -6.2603),          # Dublin
    'Luxembourg': (49.6117, 6.1319),        # Luxembourg
    'Malaysia': (3.1390, 101.6869),         # Kuala Lumpur
    'Mexico': (19.4326, -99.1332),          # Mexico City
    'Netherlands': (52.3676, 4.9041),       # Amsterdam
    'New Zealand': (-41.2865, 174.7762),    # Wellington
    'Norway': (59.9139, 10.7522),           # Oslo
    'Peru': (-12.0464, -77.0428),           # Lima
    'Poland': (52.2297, 21.0122),           # Warsaw
    'Romania': (44.4268, 26.1025),          # Bucharest
    'Portugal': (38.7223, -9.1393),         # Lisbon
    'Singapore': (1.3521, 103.8198),        # Singapore
    'Slovakia': (48.1486, 17.1077),         # Bratislava
    'South Africa': (-25.7479, 28.2293),    # Pretoria
    'South Korea': (37.5665, 126.9780),     # Seoul
    'Spain': (40.4168, -3.7038),            # Madrid
    'Sweden': (59.3293, 18.0686),           # Stockholm
    'Switzerland': (46.9481, 7.4474),       # Bern
    'Taiwan': (25.0330, 121.5654),          # Taipei
    'Turkey': (39.9334, 32.8597),           # Ankara
    'Saudi Arabia': (24.7136, 46.6753),     # Riyadh
    'United States': (38.9072, -77.0369)    # Washington D.C.
}


final_data = [{
    "zoomLevel": 50,
    "dataType": "html",
    "data": []
}]

for i in range(49):
    with open(f"gpt_data/n{i}_json.json", "r") as file:
        j = json.load(file)
    j_dict = {
        "pos": {
            "lat": capitals_coordinates[j["country"]][0],
            "lng":capitals_coordinates[j["country"]][1]
        },
        "altitude": 0.1,
        "hoverLabel": f"{j['country']} Billboard Summary",
        "class": "story-billboard-summary",
        "imgPath": "./billboard-summary.png",
        "altText": "Billboard Summary",
        "modalOnClick": True,
        "modalTitle": f"## Top Billboard Songs in {j['country']}: Narrative Summary",
        "modalText": f"###### {j["summary"]}\n\n###### Positivity: {j['positivity']}",
        "imgTint": j["color"]
    }
    final_data[0]["data"].append(j_dict)

with open("panoptijson_music.jsonl", "w") as file:
    json.dump(final_data, file)