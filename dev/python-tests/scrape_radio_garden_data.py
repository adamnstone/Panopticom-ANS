# API: https://jonasrmichel.github.io/radio-garden-openapi/

PLACES_URL = "https://radio.garden/api/ara/content/places"

CACHED_DATA_DIRECTORY = "cached_data"
cached_data_path = lambda filename: f"{CACHED_DATA_DIRECTORY}/{filename}.obj"

import requests, os, pickle, time, json
from pprint import pprint

def get_web_data(filepath, url):
    if not os.path.exists(filepath):
        print(f"URL request to {url}...")
        to_return = requests.get(url).json()
        with open(filepath, "wb") as file:
            pickle.dump(to_return, file)
    else:
        with open(filepath, "rb") as file:
            to_return = pickle.load(file)
    return to_return

channels_url_from_id = lambda _id: f"https://radio.garden/api/ara/content/page/{_id}/channels"
mp3_url_from_channel_id = lambda _id: f"https://radio.garden/api/ara/content/listen/{_id}/channel.mp3"

scraped_data = get_web_data(cached_data_path("places_data"), PLACES_URL)["data"]["list"]

for i, station in enumerate(scraped_data[:110]):
    station_id = station["id"]
    station_channels_data = get_web_data(cached_data_path(f"station_data_{station_id}"), channels_url_from_id(station_id))['data']
    channels_data = {
        "utcOffset": station_channels_data['utcOffset'],
        "title": station_channels_data['title'],
        "channels": [item['page'] for item in station_channels_data['content'][0]['items']]
    }
    for channel in channels_data['channels']:
        channel_id = channel['url'].split("/")[-1]
        channel['id'] = channel_id
        channel['radio_garden_url'] = channel['url']
        channel['mp3_url'] = mp3_url_from_channel_id(channel_id)
    station["channels_data"] = channels_data
    #if i > 100: time.sleep(1)
    print(f"\n{(i / len(scraped_data))*100}% of stations scraped...\n")

with open("../datasets/radio_garden_data/radio_garden_data.jsonl", "w") as file:
    json.dump(scraped_data[:109], file)