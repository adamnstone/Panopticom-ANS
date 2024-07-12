import React from 'react'
import Three from './components/Three.jsx'
import IcelandicTourism from './components/IcelandicTourism.jsx'

const Dashboard = ({ layerData, LayerType }) => {
  return (
    <>
    <style>{`
    body {
        font-family: 'Courier New', monospace;// Garamond, "Linux Libertine", Georgia, "Times New Roman", serif;
    }
    #three-container {
        width: 100%; 
        height: 100%;
        border-radius: 25px;
        overflow: hidden;
    }
    .grid-item {
        height: 48vh;
        margin: 5px;
        border-radius: 25px;
    }
    .include-bg {
        background-color: #eeeeee;
    }
    .item-container {
        padding: 10px;
    }
    #album-cover {
        height: 25vh;
    }
    .full-h {
        height: 90%;
    }

    /* Ensure the div is scrollable */
.scrollable-div {
  width: 300px; /* Adjust as needed */
  height: 200px; /* Adjust as needed */
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
  .more-height {height: 300px !important;}
  .half-height {height: 250px !important;}

/* Custom scrollbar for Webkit browsers */
.scrollable-div::-webkit-scrollbar {
  width: 12px;
}

.scrollable-div::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.scrollable-div::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.scrollable-div::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Style for other browsers */
.scrollable-div {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}




#dna-img {
background-image: url('../public/dna_realistic.png');
background-size: contain;
background-repeat: no-repeat;
width: 100%;
height: 100%;
border-radius: 1000px;
box-shadow: 0 0 8px 8px #eeeeee inset;
}

#stry-btn-1 {
width: 110px;
height: 10px;
transform: rotate(90deg);
position: absolute;
top: 160px;
right: 276px;
background: transparent;
border: none !important;
}

#stry-btn-2 {
width: 110px;
height: 10px;
transform: rotate(90deg);
position: absolute;
top: 160px;
right: 220px;
background: transparent;
border: none !important;
}

#stry-btn-3 {
width: 80px;
height: 10px;
transform: rotate(100deg);
position: absolute;
top: 160px;
right: 184px;
background: transparent;
border: none !important;
}

.tooltip-t {
  display: none;
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 15px;
  border-radius: 5px;
  max-width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.7rem;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #333 transparent;
}
    `}</style>
    <div className="container">
        <div className="row">
            <div className="col-4">
                <div className="item-container include-bg grid-item align-items-start justify-content-center d-flex">
                    <div className="container">
                        <div className="row">
                            <div className="col align-items-center justify-content-center d-flex">
                                <h3>Datapoint Spotlight: FabLab Ísafjörður</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col scrollable-div half-height">
                                <p style={{fontSize: '1rem'}}>Fab Lab Ísafjörður, located in the remote and scenic town of Ísafjörður in the Westfjords of Iceland, serves as a hub of innovation and creativity. This small lab is part of the global Fab Lab network, which aims to bridge the gap between education, industry, and the community. Surrounded by mountains and the sea, Fab Lab Ísafjörður offers a unique setting that inspires ingenuity and collaboration. The lab is equipped with various digital fabrication tools, including 3D printers, laser cutters, and CNC machines, enabling locals and visitors to bring their ideas to life.

The primary mission of Fab Lab Ísafjörður is to support the local community by providing access to cutting-edge technology and fostering an environment of learning and experimentation. It plays a crucial role in promoting STEM education, offering workshops and courses for students and enthusiasts of all ages. Additionally, the lab collaborates with local businesses and artists, helping to drive economic development and cultural projects in the region.

The lab's impact extends beyond technological innovation; it also serves as a social and cultural meeting point, encouraging the sharing of knowledge and skills among diverse groups of people. Whether it's developing a new product, creating art, or simply exploring the possibilities of digital fabrication, Fab Lab Ísafjörður is a vital resource for creativity and development in one of Iceland's most picturesque regions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="item-container grid-item align-items-center justify-content-center d-flex">
                    <div id="three-container">
                        <Three layerData={layerData} LayerType={LayerType} 
                        setHoverDetails={() => {}} 
                        setMusicDetails={() => {}} 
                        setFilterUpdateFunc={() => {}} 
                        openModal={() => {}} 
                        setStoryDetails={() => {}} />
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="item-container include-bg grid-item align-items-start justify-content-center d-flex">
                    <div className="container full-h">
                        <div className="row">
                            <div className="col align-items-center justify-content-center d-flex" style={{textAlign:'center'}}>
                                <h4>Icelandic Personal Stories</h4>
                            </div>
                        </div>
                        <div className="row full-h">
                            <div className="col full-h">
                                <div id="dna-img"/>
                                
                                <button id='stry-btn-1' onClick={(event) => {
                                    const tooltip = document.getElementById('tooltip-1');
                                    const buttonRect = event.target.getBoundingClientRect();
                                  // Show the tooltip
                                  tooltip.style.display = 'block';
                                    // Set the position of the tooltip
                                    tooltip.style.left = `${buttonRect.left -(tooltip.offsetWidth / 2)}px`;
                                    tooltip.style.top = `${buttonRect.bottom + window.scrollY + 10}px`;
                                  
                                    
                                    document.addEventListener('click', function(event) {
                                        const tooltip = document.getElementById('tooltip-1');
                                        const button = document.getElementById('stry-btn-1');
                                      
                                        // Hide the tooltip if the click is outside the button and the tooltip
                                        if (event.target !== button && !button.contains(event.target) && !tooltip.contains(event.target)) {
                                          tooltip.style.display = 'none';
                                        }
                                      });
                                }}></button>
                                <button id='stry-btn-2' onClick={(event) => {
                                    const tooltip = document.getElementById('tooltip-2');
                                    const buttonRect = event.target.getBoundingClientRect();
                                  // Show the tooltip
                                  tooltip.style.display = 'block';
                                    // Set the position of the tooltip
                                    tooltip.style.left = `${buttonRect.left -(tooltip.offsetWidth / 2)}px`;
                                    tooltip.style.top = `${buttonRect.bottom + window.scrollY + 10}px`;
                                  
                                    
                                    document.addEventListener('click', function(event) {
                                        const tooltip = document.getElementById('tooltip-2');
                                        const button = document.getElementById('stry-btn-2');
                                      
                                        // Hide the tooltip if the click is outside the button and the tooltip
                                        if (event.target !== button && !button.contains(event.target) && !tooltip.contains(event.target)) {
                                          tooltip.style.display = 'none';
                                        }
                                      });
                                }}></button>
                                <button id='stry-btn-3' onClick={(event) => {
                                    const tooltip = document.getElementById('tooltip-3');
                                    const buttonRect = event.target.getBoundingClientRect();
                                  // Show the tooltip
                                  tooltip.style.display = 'block';
                                    // Set the position of the tooltip
                                    tooltip.style.left = `${buttonRect.left -(tooltip.offsetWidth / 2)}px`;
                                    tooltip.style.top = `${buttonRect.bottom + window.scrollY + 10}px`;
                                  
                                    
                                    document.addEventListener('click', function(event) {
                                        const tooltip = document.getElementById('tooltip-3');
                                        const button = document.getElementById('stry-btn-3');
                                      
                                        // Hide the tooltip if the click is outside the button and the tooltip
                                        if (event.target !== button && !button.contains(event.target) && !tooltip.contains(event.target)) {
                                          tooltip.style.display = 'none';
                                        }
                                      });
                                }}></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-3">
                <div className="item-container include-bg grid-item align-items-center justify-content-center d-flex">
                    <div className="container">
                        <div className="row">
                            <div className="col align-items-center justify-content-center d-flex">
                                <h2>🎵Music🎵</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col align-items-center justify-content-center d-flex">
                                <span style={{fontSize: '0.8rem', textAlign: 'center'}}>Most Popular Song (<i>Billboard</i>): <b>'Please Please Please' by Sabrina Carpenter</b></span>    
                            </div>
                        </div>
                        <div className="row">
                            <div className="col align-items-center justify-content-center d-flex">
                                <img id="album-cover" src="https://charts-static.billboard.com/img/2024/06/sabrina-carpenter-0lv-pleasepleaseplease-mi6-344x344.jpg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div className="item-container include-bg grid-item align-items-center justify-content-center d-flex">
                    <div className="container">
                            <div className="row">
                                <div className="col align-items-center justify-content-center d-flex">
                    <h2>Narrative Summary</h2>
                    </div>
                        </div>
                        <div className="row">
                            <div className="col scrollable-div">
                    <p style={{fontSize: '1rem'}}>In the remote and picturesque town of Ísafjörður, the Fab Lab Ísafjörður plays a crucial role in bridging education, industry, and community through innovative digital fabrication tools. This lab, part of the global Fab Lab network, is surrounded by the inspiring natural beauty of mountains and the sea, fostering a unique environment for creativity and collaboration. The lab's impact is multifaceted: it promotes STEM education through workshops and courses, supports local businesses and artists, and drives economic development and cultural projects.
<br/><br/>
For instance, the reconstruction of houses destroyed by the 1973 volcanic eruption in Vestmannaeyjar showcases how local communities preserve and recreate significant historical and cultural artifacts. Additionally, the lab’s collaboration with local artists and businesses parallels the development seen in the Vestmannaeyjar archipelago, where technological advancements, like the new electric ferry, enhance connectivity and promote conservation efforts.
<br/><br/>
Traditional Icelandic dance, such as Vikivaki, underscores the cultural richness that complements the technological and economic progress facilitated by Fab Labs. These dances, deeply rooted in history, connect Icelanders to their heritage, just as Fab Labs connect them to the future. Furthermore, the story of the Aflakóngur, or "Fish King," reflects the importance of tradition in Iceland's fishing communities, demonstrating the blend of historical and modern practices that define Icelandic culture.
<br/><br/>
In essence, Fab Lab Ísafjörður is a microcosm of Iceland's broader trends: technological innovation harmoniously integrated with cultural preservation and community development.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-3">
                <div className="item-container include-bg grid-item align-items-start justify-content-center d-flex">
                    <div className="container" style={{overflow:'hidden'}}>
                        <div className="row">
                            <div className="col align-items-center justify-content-center d-flex" style={{textAlign:'center'}}>
                                <h5>Tourism to Iceland (June 2024)</h5>
                            </div>
                        </div>
                        <div className="row" style={{height:'25vh'}}>
                            <div className="col" style={{overflow:'visible'}}>
                                <IcelandicTourism/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="tooltip-1" className="tooltip-t"><b>Kids Recreate Model of the Houses Under the Lava: FabLab Vestmannaeyjar</b><br></br>Tunga's house stood at Heimagatu 4, was built in 1913, but was destroyed by lava in 1973. The building housed a bakery and later a hotel, so it was often called Hotel Berg or Magnúsar Bakery. Jóhann Sörensen built the house. Björn Kalman, a lawyer and chess player, rented a room there for a while between 1931-1940.</div>
    <div id="tooltip-2" className="tooltip-t">A new electric ferry has helped connect Iceland's mainland to this small archipelago — also called the Westman Islands — off the country's south coast, where the world's largest puffin colony has turned many residents into active conservationists. (The archipelago was unaffected by the mid-December volcanic eruptions elsewhere in Iceland.) From May to September, Heimaey, the main island, becomes a favorite weekend destination for Icelanders, who fill up sleek new villas during the frequent concerts and festivals, while cruise ship passengers can be seen racing around the outer islands on rib boats, visiting the Beluga whale sanctuary and riding A.T.V.s into the crater of the Eldfell volcano, which nearly wiped out the town during a 1973 eruption. Home to one of the country's most important fishing communities, with a new seafood festival and a wave of culinary offerings like an artisan bakery and a craft brewery, Vestmannaeyjar has been hailed by the local media as the “food capital of Iceland.”</div>
    <div id="tooltip-3" className="tooltip-t">Aflakóngur is the person who catches the most fish in his town. One well-known fishing king is Binni í Gröf. In 1965, this changed and two awards were given. Fish king was for the biggest catch (most tonnes caught per season) and fish king was the one with the most valuable catch. Ingolf's rod, which was given by the married couple Sigríði Sigurðardóttir and Ingólf Theódorsson, was a traveling trinket for the fishing king. With the introduction of the quota system, all the criteria for these awards changed significantly and they were discontinued in 1990.</div>
    </>
  )
}

export default Dashboard