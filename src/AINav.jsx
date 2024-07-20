import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

const AINav = () => {
  return (
    <>
    <style>{`body { background-color: black; display: absolute; } .white-text { color: white; }
input {
  background: 0;
  color: white;
  border: 0;
  outline: none;
  width: 100%;
  font-size: 1.5em;
  transition: padding 0.3s 0.2s ease;

  &:focus {
    padding-bottom: 5px;
  }

  // sibling magic ;o
  &:focus + .line {
    &:after {
      transform: scaleX(1);
    }
  }
}

.field {
  position: relative;
  width: 50vw;

  .line {
    width: 100%;
    height: 3px;
    position: absolute;
    bottom: -8px;
    background: #bdc3c7;

    &:after {
      content: " ";
      position: absolute;
      float: right;
      width: 100%;
      height: 3px;
      
      transform: scalex(0);
      transition: transform 0.3s ease;
      
      background: #1abc9c;
    }
  }
}

.input-container {
position: absolute;
        right: 10%;
        padding-left: 0;
        bottom: 30%;
}

.next-button {
        position: absolute;
        right: 4%;
        width: 25%;
        bottom: 4%;
}

`}</style>
    <i><h1 className="font-weight-bold white-text" style={{fontSize: '8rem'}}>Panopticom</h1></i>
    <br/><br/>
    <h1 className="font-weight-bold white-text" style={{fontSize: '5rem'}}>What are you looking for?</h1>
    <br/><br/>
    <div className="input-container">
        <div className="field">
            <input id="input-req"></input>
            <div className="line"></div>
        </div>
    </div>
    <br/><br/>
    <button className="btn btn-primary next-button" onClick={() => {
        let inputUrl = new URL(`${window.location.origin}/ai-dashboard`);
        let inputParams = new URLSearchParams(inputUrl.search);
        const inputReq = document.getElementById('input-req');
        const req = inputReq.value;
        
        //var data = new FormData();
        //data.append( "json", JSON.stringify( { "msg": req } ) );
        
        fetch("http://127.0.0.1:5000",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({"msg":req}) //data
        })
        .then(res => res.json())
        .then(function(res){
            console.log(res, res.status, res.status == "success")
            if (res.status == "success") {
                const {selected_layer_ids, coordinates, focus_datapoint, narrative_summary} = res.data;

                inputParams.append('selected_layer_ids', selected_layer_ids.join(';'));
                inputParams.append('coordinates', coordinates.join(';'));
                inputParams.append('focus_datapoint', focus_datapoint);
                inputParams.append('narrative_summary', narrative_summary);
                inputUrl.search = inputParams.toString();
                console.log(inputUrl.toString())
                window.location.href = inputUrl.toString();
            }
            else {
                alert(`Error: ${JSON.stringify(res)}`)
            }
         })
        .catch(function(err){ alert( err ) })
        }}>Next</button>
    </>
  )
}

export default AINav