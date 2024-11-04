# Panopticom

## Overview

[To see the live site, click here!](https://panopticom.fabcloud.io/)

[High level oveview here](https://petergabriel.com/focus/the-panopticom/)

**Demo Videos**

- [Glacier Use Case Demo 7/26](https://drive.google.com/file/d/1NAW16UddEX_Dj0WP-a5uR5KRswMTh6ge/view?usp=sharing)
- [Mockup Dashboard Interface Demo 7/19](https://drive.google.com/file/d/18YYwntT1GNpr8u8qol1IaIc5K7mkMG3n/view?usp=drive_link)
- [Prototype Demo 7/12](https://drive.google.com/file/d/1xNujsCFeTyHFPEHz83GBcIdpUmu3eIhG/view?usp=drive_link)

---

**How to format `JSONL` datasets:**

- [Click here for the human-readable `JSONL` schema!](./standardized_json.md)
- [Click here for the technical `JSONL` schema](./dev/jsonSchema.json), and use a tool such as [this validator](https://www.jsonschemavalidator.net/) to ensure your dataset complies

---

**How to run the visualization:**

1. Clone repo
2. Run `npm i` then `npm run dev` in the root directory of the cloned repo
3. Navigate to [`localhost:5173`](http://localhost:5173) in Google Chrome

## Repo Organization

The [`dev`](./dev/) directory contains the [`JSONL Schema`](./dev/jsonSchema.json), datasets formatted to the `JSONL Schema` specification in the [`dev/datasets`](./dev/datasets/) directory and the Python code used to transform the data in the [`dev/reshape_data`](./dev/reshape_data/) directory, example projects and brainstorming documents in the [`dev/brainstorm`](./dev/brainstorm/) directory.