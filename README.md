Panopticom

[High level oveview here](https://petergabriel.com/focus/the-panopticom/)

[3dGeo](https://d3js.org/d3-geo)
Also see documentation for the [GeoJSON format here](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6)

---

**How to format `JSONL` datasets:**

[Click here for the `JSONL` schema!](./standardized_json.md)

---

**How to run D3JS and ThreeJS examples:**

1. Clone repo
2. Run `python -m http.server` in the root directory of the cloned repo
3. Run chrome using `"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-site-isolation-trials --user-data-dir="C:\ChromeDev"` in the terminal. This is necessary to avoid `CORS checks` errors from API calls.
4. Navigate to [`http://127.0.0.1:8000/dev/ThreeJS/index_3js.html`](http://127.0.0.1:8000/dev/ThreeJS/index_3js.html) (for ThreeJS) or [`http://127.0.0.1:8000/dev/D3JS/index_d3js.html`](http://127.0.0.1:8000/dev/D3JS/index_d3js.html) (for D3JS) in chrome.