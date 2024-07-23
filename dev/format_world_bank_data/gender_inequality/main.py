import pandas as pd
import json

def number_to_rgba(number):
    """
    Convert a number (0-100) to an RGBA color string from light red to dark red.

    :param number: An integer between 0 and 100 inclusive.
    :return: An RGBA color string in the format 'rgba(r,g,b,a)'.
    """
    if not 0 <= number <= 100:
        raise ValueError("Number must be in the range 0-100")
    
    # Define the start and end colors
    start_color = (255, 0, 0) 
    end_color = (0, 255, 255) 
    
    # Calculate the interpolated color
    red_value = int(start_color[0] + (end_color[0] - start_color[0]) * (number / 100))
    green_value = int(start_color[1] + (end_color[1] - start_color[1]) * (number / 100))
    blue_value = int(start_color[2] + (end_color[2] - start_color[2]) * (number / 100))
    
    # Fixed alpha value to 0.7
    alpha_value = 0.7

    # Create the RGBA string
    rgba_string = f'rgba({red_value},{green_value},{blue_value},{alpha_value})'
    
    return rgba_string


if __name__ == "__main__":
    with open("ne_110m_admin_0_countries.geojson", "rb") as file:
        geojson = json.load(file)
    df = pd.read_csv("./gender_inequality_raw_5_1_1_2022.csv")

    formatted_geometry_items = []
    for item_unit in geojson['features']:
        item = {}
        item['type'] = item_unit['type']
        item['geometry'] = item_unit['geometry']
        item['UN_A3'] = item_unit['properties']['UN_A3']
        item['NAME_EN'] = item_unit['properties']['ADMIN']#['NAME_EN']
        # if item['UN_A3'] in ['894',894]: # Zambia in this dataset but not gender inequality dataset
        #     print(item_unit)
        #     quit()
        formatted_geometry_items.append(item)
    
    code_to_value_l = [_ for _ in list(zip([str(int(__)).zfill(3) for __ in list(df['GeoAreaCode'])], list(df['Value']))) if _[0] != 1] # not != 1 since don't want world overall average

    code_to_value = {}

    for pair in code_to_value_l:
        if pair[0] in code_to_value and len(code_to_value[pair[0]]) == 3:
            code_to_value[pair[0]] = sum(code_to_value[pair[0]]+[pair[1]])/4
        elif pair[0] in code_to_value:
            code_to_value[pair[0]].append(pair[1])
        else:
            code_to_value[pair[0]] = [pair[1]]

    for k in code_to_value:
        if not (type(code_to_value[k]) in [float, int]):
            print("not number", code_to_value[k])
            break
    else:
        print("all good")

    formatted_geometry_items_filtered = []

    print(code_to_value)

    num_found = 0
    for item in formatted_geometry_items:
        padded_code = str(int(item['UN_A3'])).zfill(3)
        if padded_code in code_to_value.keys():
            item['gender_inequality_value'] = code_to_value[padded_code]
            num_found += 1
            formatted_geometry_items_filtered.append(item)
        else:
            print(f"Key not found: {padded_code}, {item['NAME_EN']}") # ends up only ~8 of countries not found
    
    formatted_geometry_items = formatted_geometry_items_filtered

    print(f"Num Found: {num_found}")
    
    formatted_dataset = {
        "zoomLevel": 50,
        "dataType": "poly",
        "data": []
    }

    for item in formatted_geometry_items:
        formatted_dataset['data'].append({
                "path": item['geometry']['coordinates'],
                "altitude": item['gender_inequality_value'] / 100, # range = [0, 1]
                "hoverLabel": f"{item['NAME_EN']}'s Gender Inequality Score: {round(item['gender_inequality_value'], 4)}",
                "mainColor": number_to_rgba(item['gender_inequality_value']),
                "sideColor": "rgba(0, 100, 0, 0.05)",
                "isMultiPolygon": item['geometry']['type'] == "MultiPolygon"
            })
    
    with open("../../../public/datasets/formatted_datasets/gender_inequality.jsonl", "w") as file:
        json.dump([formatted_dataset], file)