import json, pickle

song_charts = {
    "Argentina": "https://www.billboard.com/charts/billboard-argentina-hot-100/",
    "Brasil": "https://www.billboard.com/charts/billboard-brasil-hot-100/",
    "Canada": "https://www.billboard.com/charts/canadian-hot-100/",
    "Italy": "https://www.billboard.com/charts/billboard-italy-hot-100/",
    "Japan": "https://www.billboard.com/charts/japan-hot-100/",
    "Thailand": "https://www.billboard.com/charts/billboard-thailand-top-thai-songs/",
    "UK": "https://www.billboard.com/charts/official-uk-songs/",
    "Australia": "https://www.billboard.com/charts/australia-songs-hotw/",
    "Austria": "https://www.billboard.com/charts/austria-songs-hotw/",
    "Belgium": "https://www.billboard.com/charts/belgium-songs-hotw/",
    "Bolivia": "https://www.billboard.com/charts/bolivia-songs-hotw/",
    "Chile": "https://www.billboard.com/charts/chile-songs-hotw/",
    "China": "https://www.billboard.com/charts/china-tme-uni-songs/",
    "Colombia": "https://www.billboard.com/charts/colombia-songs-hotw/",
    "Croatia": "https://www.billboard.com/charts/croatia-songs-hotw/",
    "Czech Republic": "https://www.billboard.com/charts/czech-republic-songs-hotw/",
    "Denmark": "https://www.billboard.com/charts/denmark-songs-hotw/",
    "Ecuador": "https://www.billboard.com/charts/ecuador-songs-hotw/",
    "Finland": "https://www.billboard.com/charts/finland-songs-hotw/",
    "France": "https://www.billboard.com/charts/france-songs-hotw/",
    "Germany": "https://www.billboard.com/charts/germany-songs-hotw/",
    "Greece": "https://www.billboard.com/charts/greece-songs-hotw/",
    "Hong Kong": "https://www.billboard.com/charts/hong-kong-songs-hotw/",
    "Hungary": "https://www.billboard.com/charts/hungary-songs-hotw/",
    "Iceland": "https://www.billboard.com/charts/iceland-songs-hotw/",
    "India": "https://www.billboard.com/charts/india-songs-hotw/",
    "Indonesia": "https://www.billboard.com/charts/indonesia-songs-hotw/",
    "Ireland": "https://www.billboard.com/charts/ireland-songs-hotw/",
    "Luxembourg": "https://www.billboard.com/charts/luxembourg-songs-hotw/",
    "Malaysia": "https://www.billboard.com/charts/malaysia-songs-hotw/",
    "Mexico": "https://www.billboard.com/charts/mexico-songs-hotw/",
    "Netherlands": "https://www.billboard.com/charts/netherlands-songs-hotw/",
    "New Zealand": "https://www.billboard.com/charts/new-zealand-songs-hotw/",
    "Norway": "https://www.billboard.com/charts/norway-songs-hotw/",
    "Peru": "https://www.billboard.com/charts/peru-songs-hotw/",
    "Poland": "https://www.billboard.com/charts/poland-songs-hotw/",
    "Romania": "https://www.billboard.com/charts/romania-songs-hotw/",
    "Portugal": "https://www.billboard.com/charts/portugal-songs-hotw/",
    "Singapore": "https://www.billboard.com/charts/singapore-songs-hotw/",
    "Slovakia": "https://www.billboard.com/charts/slovakia-songs-hotw/",
    "South Africa": "https://www.billboard.com/charts/south-africa-songs-hotw/",
    "South Korea": "https://www.billboard.com/charts/south-korea-songs-hotw/",
    "Spain": "https://www.billboard.com/charts/spain-songs-hotw/",
    "Sweden": "https://www.billboard.com/charts/sweden-songs-hotw/",
    "Switzerland": "https://www.billboard.com/charts/switzerland-songs-hotw/",
    "Taiwan": "https://www.billboard.com/charts/taiwan-songs-hotw/",
    "Turkey": "https://www.billboard.com/charts/turkey-songs-hotw/",
    "Saudi Arabia": "https://www.billboard.com/charts/the-arabic-hot-100/",
    "United States": "https://www.billboard.com/charts/hot-100/"
}

error_ex = """{
    "summary": "The top songs on the Billboard chart in Canada showcase a mix of emotions and themes. "Houdini" by NEW is a catchy tune with a sense of freedom and escape, exuding vibes of independence and fun. "I Had Some Help" by Post Malone Featuring Morgan Wallen delves into themes of support and camaraderie, highlighting the importance of having someone by your side. On the other hand, "A Bar Song (Tipsy)" by Shaboozey sets a more carefree tone, focusing on the carefree and playful moments that take place at a bar. Collectively, these songs evoke emotions of carefreeness, support, and lightheartedness.",
    "positivity": 7,
    "color": "rgb(102, 204, 255)"
}"""

for i in range(49):
    with open(f"gpt_data/n{i}.obj", "rb") as file:
        data = pickle.load(file)
        if data[0] != "{":
            data = data[7:-3]
    if data == error_ex:
        data = """{
    "summary": "The top songs on the Billboard chart in Canada showcase a mix of emotions and themes. \\"Houdini\\" by NEW is a catchy tune with a sense of freedom and escape, exuding vibes of independence and fun. \\"I Had Some Help\\" by Post Malone Featuring Morgan Wallen delves into themes of support and camaraderie, highlighting the importance of having someone by your side. On the other hand, \\"A Bar Song (Tipsy)\\" by Shaboozey sets a more carefree tone, focusing on the carefree and playful moments that take place at a bar. Collectively, these songs evoke emotions of carefreeness, support, and lightheartedness.",
    "positivity": 7,
    "color": "rgb(102, 204, 255)"
}"""
    with open(f"gpt_data/n{i}_json.json", "w") as file:
        dict_ = json.loads(data)
        dict_["country"] = list(song_charts.keys())[i]
        dict_["billboard_link"] = song_charts[list(song_charts.keys())[i]]
        json.dump(dict_, file)