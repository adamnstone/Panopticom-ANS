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
                            <div className="col align-items-center justify-content-center d-flex">
                                <h4>Icelandic Tourism by Country</h4>
                            </div>
                        </div>
                        <div className="row full-h">
                            <div className="col full-h">
                                <IcelandicTourism />
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
                    <h2>Narrative Summary & Personal Stories</h2>
                    </div>
                        </div>
                        <div className="row">
                            <div className="col scrollable-div">
                    <p style={{fontSize: '1rem'}}>Iceland's tourism industry reveals fascinating insights into the global interest in this unique island nation. In 2022, a significant 27% of tourists to Iceland came from the USA, highlighting strong transatlantic ties and possibly reflecting a cultural curiosity and adventurous spirit among Americans. The UK followed with 13.5% of the visitors, showcasing enduring connections perhaps rooted in historical and cultural links. Germany, France, and Poland also contributed notable numbers, with 7.8%, 5.6%, and 4.8% of tourists respectively, underscoring Europe's substantial role in Icelandic tourism.
<br></br>
Interestingly, these tourism trends can be linked to Iceland's rich cultural heritage and traditions. For instance, the traditional dance "Vikivaki," performed during communal gatherings, might attract tourists interested in authentic cultural experiences. The simplicity of the costumes and the historical significance of these dances, which are deeply rooted in medieval traditions, offer visitors a unique glimpse into Icelandic history and identity.
<br></br>
Moreover, the popularity of certain top Billboard songs in Iceland, such as "Houdini" by NEW and "Million Dollar Baby" by Tommy Richman, which explore themes of freedom and ambition, may resonate with the adventurous spirit of the tourists. These themes align with the experiences that visitors seek when exploring Iceland's dramatic landscapes and engaging in local traditions.
<br></br>
Additionally, innovative spaces like Fab Lab Ísafjörður in remote regions highlight Iceland's commitment to bridging gaps between education, industry, and community. This blend of traditional and modern attractions likely contributes to the diverse range of interests that draw visitors from around the world. Thus, Iceland not only offers breathtaking natural wonders but also a rich cultural tapestry that continues to captivate a global audience.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-3">
                <div className="item-container include-bg grid-item align-items-start justify-content-center d-flex">
                    <div className="container">
                        <div className="row">
                            <div className="col align-items-center justify-content-center d-flex">
                                <h6>🕺Traditional Dance💃</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col scrollable-div more-height">
                                <p style={{fontSize: '0.9rem'}}>Traditional dance in Iceland, known as "Vikivaki," is a significant part of the nation's cultural heritage. These dances are typically performed during communal gatherings and festive occasions, featuring circle dances with linked arms and rhythmic stepping. The music accompanying Vikivaki includes traditional Icelandic folk songs, often passed down through generations. Costumes worn during these performances are usually simple, reflecting Iceland's historical attire. The dances, rooted in medieval traditions, are a vital way for Icelanders to connect with their history and maintain their cultural identity.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Dashboard