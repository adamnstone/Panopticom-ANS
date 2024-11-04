from openai import OpenAI
import os, pickle, copy
import json
from flask import Flask, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

req_ids = None

if os.getenv("OPENAI_API_KEY") is None:
    raise Exception("API Key is None")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_data_in_rect(rect, layer_id):
    datapts = []
    with open(f"../../../public/datasets/formatted_datasets/{layer_id}.jsonl", "rb") as file:
        cont = json.load(file)[0]['data']
        for item in cont:
            coords = item['pos']
            lat = coords['lat']
            lng = coords['lng']
            if rect['lat_min'] <= lat < rect['lat_max'] and rect['lon_min'] <= lng < rect['lon_max']:
                datapts.append(item)
    return datapts

def get_data_str_from_req_ids(req_ids):
    data_e = {}
    with open("rectized_datasets/rect_data.obj", "rb") as file:
        content = pickle.load(file)
    for item, rect_data in content:
        ctr = 0
        rect_d, val_d  = rect_data
        for rect, val in [(rect_d[_], val_d[_]) for _ in sorted(list(rect_d.keys()))]:
            id_ = f"{item}_{ctr}"
            ctr += 1
            data_e[id_] = (rect, val)

    data_pr = {}
    data_pts = []
    for i in req_ids:
        data_pr[i] = get_data_in_rect(data_e[i][0], "_".join(i.split("_")[:-1]))
        data_pts.append(data_pr[i])

    data_str = "Requested Datapoints: "

    data_pts_full = copy.deepcopy(data_pts)
    m = 0
    for ite, ite_ in zip(data_pts, data_pts_full):
        #print(ite, "HEREHERE")
        for j, j_ in zip(ite, ite_):
            try:
                del j['color']
                del j['height']
            except:
                pass
            print("TTT", j)
            j['id'] = m
            j_['id'] = m
            
            m += 1

    data_str += "; ".join([str(_) for _ in data_pts])

    with open("temp.txt","w", encoding="utf-8") as file: file.write(data_str)
    
    n = 0
    while len(data_str) > 30_000:
        print("string too long! CROPPING!")
        data_str = "Requested Datapoints: "
        n += 1
        data_str += "; ".join([str(_) for _ in (data_pts[:-n])])

    return data_str, data_pts_full


def set_layers_and_coordinates_for_strata_view(layer_ids, coordinates):
    print(f"Strata view with layers < {layer_ids} > and coordinates < {coordinates} >")

def set_datapoint_focus(datapoint_id):
    print(f"Focusing on datapoint with id: {datapoint_id}")

def set_narrative_summary(text):
    print(f"The narrative summary text is: {text}")

def configure_display(layer_ids, coordinates, datapoint_id, text):
    set_layers_and_coordinates_for_strata_view(layer_ids, coordinates)
    set_datapoint_focus(datapoint_id)
    set_narrative_summary(text)
    return {
        "layer_ids": layer_ids, 
        "coordinates": coordinates, 
        "datapoint_id": datapoint_id,
         "text": text}

def request_rect_datapoints(id_lst):
    print("REQUESTED RECT DATAPOINTS:", id_lst)
    global req_ids
    req_ids = id_lst

def run_conversation(msg):
    # Step 1: send the conversation and available functions to the model
    with open("rectized_datasets/comp_str.obj", "rb") as file:
        rect_str = pickle.load(file)
    messages = [{"role": "user", "content": f"You are curating a dashboard for a globe visualization that overlays many diverse datasets. I have a lot of data organized into different layers. For example, one layer is the global coordinates and name of every FabLab. I will provide you with a user's prompt and it is your job to design a dashboard for the user based on their prompt, but first you will need to query the data layers to understand the data so that you can design your dashboard. So, I will provide you with the ID of each data layer and how many datapoints of each layer are contained in different rectangles of coordinates. Then, you will provide me with the IDs of the rectangles of coordinates for which you would like to see the full dataset. You should only request a small subset of the dataset, and if you request too much, I'll let you know. Use the function tool I have provided to request the data.\n\nHere are the layer IDs's: ['labs' (the global coordinates and name of every FabLab), 'individual_stories' (personal stories of individuals and communities around the world), 'music_narrative' (a summary of how the most popular Billboard music in different territories reflects emotional sentiment), 'radio_hex' (global coordinates of different radio stations around the world), 'dance' (summaries of traditional dance in different regions around the world)]\n\nHere are the amount of datapoints by rectangles of global coordinates:\n{rect_str}\n\n\n\nHere is the user's prompt: {msg}\n\n\nREQUEST AT MOST 5 RECTANGLES"}]
    tools_p = [
        {
            "type": "function",
            "function": {
                "name": "request_rect_datapoints",
                "description": "Request all the datapoints in the given rectangles. Pass an array of the IDs of the desired rectangles.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "id_lst": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "The list of the IDs of all the requested rectangles."
                        }
                    }
                },
                "required": ["id_lst"]
            }
        }
    ]
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        tools=tools_p,
        tool_choice={"type": "function", "function": {"name": "request_rect_datapoints"}},  # auto is default, but we'll be explicit
    )
    response_message_p = response.choices[0].message
    tool_calls_p = response_message_p.tool_calls
    # Step 2: check if the model wanted to call a function
    if tool_calls_p:
        # Step 3: call the function
        # Note: the JSON response may not always be valid; be sure to handle errors
        available_functions = {
            "request_rect_datapoints": request_rect_datapoints
        }  # only one function in this example, but you can have multiple
        messages.append(response_message_p)  # extend conversation with assistant's reply
        # Step 4: send the info for each function call and function response to the model
        for tool_call in tool_calls_p:
            function_name = tool_call.function.name
            function_to_call = available_functions[function_name]
            print("YEEET", tool_call.function.arguments)
            function_args = json.loads(tool_call.function.arguments)
            function_response = function_to_call(**function_args)
            data_str, data_pts_full = get_data_str_from_req_ids(req_ids)
            print(data_str)
            messages.append(
                {
                    "tool_call_id": tool_call.id,
                    "role": "tool",
                    "name": function_name,
                    "content": data_str,
                }
            )
    tools = [ # YOU MUST call three functions since each function call adds one more element to the dashboard.
        {
            "type": "function",
            "function": {
                "name": "configure_display",
                "description": "Configure the display of the dashboard including a 'strata' view, a datapoint to focus on, and a narrative summary that should synthesize information across layers and be at least 8 sentences long - please elaborate.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "layer_ids": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "The list of the Layer ID's of the layers you would like to include in the 'strata' view.",
                        },
                        "coordinates": {
                            "type": "array",
                            "items": {
                                "type": "number",
                                "minItems": 2,
                                "maxItems": 2
                            },
                            "description": "The coordiantes of where on the globe the 'strata' view should be taken from.",
                        },
                        "datapoint_id": {
                            "type": "integer",
                            "description": "ID of the datapoint to be focused on.",
                        },
                        "text": {
                            "type": "string",
                            "description": "Narrative summary text to be displayed.",
                        }
                    },
                    "required": ["layer_ids", "coordinates", "datapoint_id", "text"],
                },
            },
        }
    ]
    """,
            {
                "type": "function",
                "function": {
                    "name": "set_layers_and_coordinates_for_strata_view",
                    "description": "Add a 'strata' view to the dashboard which is a cross-section of the multi-layered global visualization.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "layer_ids": {
                                "type": "array",
                                "items": {
                                    "type": "integer"
                                },
                                "description": "The list of the Layer ID's of the layers you would like to include in the 'strata' view.",
                            },
                            "coordinates": {
                                "type": "array",
                                "items": {
                                    "type": "number",
                                    "minItems": 2,
                                    "maxItems": 2
                                },
                                "description": "The coordiantes of where on the globe the 'strata' view should be taken from.",
                            },
                        },
                        "required": ["layer_ids", "coordinates"],
                    },
                },
            },
            {
                "type": "function",
                "function": {
                    "name": "set_datapoint_focus",
                    "description": "Add a 'datapoint focus' view to the dashboard that just focuses on one datapoint/element and displays all details.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "datapoint_id": {
                                "type": "integer",
                                "description": "ID of the datapoint to be focused on.",
                            }
                        },
                        "required": ["datapoint_id"],
                    },
                },
            },
            {
                "type": "function",
                "function": {
                    "name": "set_narrative_summary",
                    "description": "Set the narrative summary text of the visualization that synthesizes the data layers.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "text": {
                                "type": "string",
                                "description": "Narrative summary text to be displayed.",
                            },
                        },
                        "required": ["text"],
                    },
                },
    }"""
    
    
    messages.append({"role": "user", "content": f"You are curating a dashboard for a globe visualization that overlays many diverse datasets. I have a lot of data organized into different layers. For example, one layer is the global coordinates and name of every FabLab. I will provide you with a user's prompt and it is your job to design a dashboard for the user based on their prompt. Here is the user's prompt: {msg}. Here are specific datapoints: {data_str}. \n\nNow you must use 3 of the provided functions to curate a dashbaord. For coordinates, use the specific coordinates of a datapoint I provided. Each function adds one element to the dashboard. Choose the coordinates to focus on, choose the specific element ID to focus on, and write a narrative summary text. Then, call the function with these parameters. Here are the layer IDs's: ['labs' (the global coordinates and name of every FabLab), 'individual_stories' (personal stories of individuals and communities around the world), 'music_narrative' (a summary of how the most popular Billboard music in different territories reflects emotional sentiment), 'radio_hex' (global coordinates of different radio stations around the world), 'dance' (summaries of traditional dance in different regions around the world)]"})
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages[-1:],
        tools=tools,
        tool_choice={"type": "function", "function": {"name": "configure_display"}},  # auto is default, but we'll be explicit
    )
    response_message = response.choices[0].message
    tool_calls = response_message.tool_calls
    # Step 2: check if the model wanted to call a function
    if tool_calls:
        # Step 3: call the function
        # Note: the JSON response may not always be valid; be sure to handle errors
        available_functions = {
            # """"set_layers_and_coordinates_for_strata_view": set_layers_and_coordinates_for_strata_view,
            # "set_datapoint_focus": set_datapoint_focus,
            # "set_narrative_summary": set_narrative_summary"""
            "configure_display": configure_display
        }  # only one function in this example, but you can have multiple
        messages.append(response_message)  # extend conversation with assistant's reply
        # Step 4: send the info for each function call and function response to the model
        if len(tool_calls) != 1 :
            raise Exception("Tool Calls Length != 1", tool_calls)
        for tool_call in tool_calls:
            function_name = tool_call.function.name
            function_to_call = available_functions[function_name]
            function_args = json.loads(tool_call.function.arguments)
            function_response = function_to_call(**function_args)
            return function_response, data_pts_full
        #     messages.append(
        #         {
        #             "tool_call_id": tool_call.id,
        #             "role": "tool",
        #             "name": function_name,
        #             "content": function_response,
        #         }
        #     )  # extend conversation with function response
        # second_response = client.chat.completions.create(
        #     model="gpt-3.5-turbo",
        #     messages=messages,
        # )  # get a new response from the model where it can see the function response
        # return second_response
# print(run_conversation())

@app.route('/', methods=['POST'])
def list_programming_languages():
    if request.is_json:
        data = request.json
        resp, data_pts_full = run_conversation(data['msg'])
        id_ = resp['datapoint_id']
        dp = None
        for item in data_pts_full:
            break_out = False
            for ite in item:
                if ite['id'] == id_:
                    dp = ite
                    break_out = True
                    break
            if break_out:
                break
        else:
            return {
                "status": "error",
                "message": f"datapoint_id incorrect: {id_}, datapoints: {data_pts_full}"
            }
        return {
            "status": "success",
            "data": {
                "selected_layer_ids": resp['layer_ids'],
                'coordinates': resp['coordinates'],
                'focus_datapoint': json.dumps(dp),
                'narrative_summary': resp['text']
            }
            }
    else:
        return {"status": "error", "message": "Request payload type is not json"}


if __name__ == "__main__":
    app.run(host="0.0.0.0")