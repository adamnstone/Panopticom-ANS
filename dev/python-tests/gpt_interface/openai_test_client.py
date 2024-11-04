import requests

data = {
    "msg": "I want to understand FabLabs and dance in the eastern United States."
    # "layer_ids": ["exnm", "labs", "individual_stories", "music_narrative", "radio_hex", "dance", "radio_garden"],
    # "datapoints": {
       
    # }
}

response = requests.post("http://127.0.0.1:5000", json=data)

print(response.json())