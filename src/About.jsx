import React from 'react';
import '/about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
      <a href="https://petergabriel.com/focus/the-panopticom/" target="_blank"><img src="/about/images/panopticom_logo_large.jpg" alt="Panopticom logo" className="about-image"/></a>
        <h1>About</h1>
        <p>More and more data is being created and very little is visible. The Panopticom platform is a constantly changing satellite fed globe which will be the central tool that allows people to upload and monitor appropriate and meaningful, personal, social, economic and political data along with all manner of scientific and environmental information. It should allow the world to see much more of itself.</p>
      <br />
      <br />
        <h2>Data Sources and details</h2>
        <table>
          <tbody>
            <tr>
              <td className="l">Free Version of Source</td>
              <td className="r">
                <a href="">Gitlab link</a>
              </td>
            </tr>
            <tr>
              <td className="l">Modules</td>
              <td className="r">
                <a href="https://d3js.org">ThreeJS</a>
                <br />
                <a href="https://nodejs.org">node.js</a>
                <br />
                <a href="https://react.dev/">React</a>
                <br />
                <a href="https://vitejs.dev/">Vite</a>
                <br />
                <a href="https://getbootstrap.com/">Bootstrap</a>
                <br />
                <a href="https://globe.gl/">GlobeGL</a>
              </td>
            </tr>
            <tr>
              <td className="l">Data sources</td>
              <td className="r">
                Fab Lab locations
                <br />
                <a href="https://fablabs.io/">Fablabs.io</a>
                <br />
                Expert network map
                <br />
                <a href="https://pub.fabcloud.io/project/expert-network-map/">Expert Network Map</a>
                <br />
                Individual stories 
                <br />
                <a href=""></a>
                <br />
                Music Narrative Summaries
                <br />
                <a href=""></a>
                <br />
                Global Radio Stations <br /> 
                (live streams, geographical data and channel names)
                <br />
                <a href="https://radio.garden/">Radio Garden</a>
                <br />
                Traditional dances around the world
                <br />
                <a href=""></a>
                <br />
                Global gender inequality
                <br />
                <a href="https://datatopics.worldbank.org/sdgatlas">The World Bank Atlas of Sustainable Development Goals</a>
              </td>
            </tr>
          </tbody>
        </table>
      <h2>Inspiration and history</h2>
        <div className="blurb">
          <p className="center">
         This project is imagened and led by Peter Gabriel. We could not have build this without standing on the shoulders of giants though, and would like to thank the following sites and projets for inspiration and/or sources of input: 
          </p>
        <p className="center">
        <list>
        <ul><a href="https://pub.fabcloud.io/project/expert-network-map/" target="blank">The Expert Network Map</a></ul>
        <ul><a href="https://fmcu.fablabs.io/" target="blank">The FMCU (the Frankenstein MCU)</a></ul>
        <ul><a href="https://radio.garden/?r=1" target="blank">Radio Garden</a></ul>
        <ul><a href="https://datatopics.worldbank.org/sdgatlas/goal-5-gender-equality?lang=en" target="blank">The World Bank Atlas of Sustainable Development Goals</a></ul>
        <ul><a href="" target="blank">Earth :: a global map of wind, weather and ocean conditions</a></ul>
        </list>  
      </p>
        </div>
      </div>
    </div>
  );
};

export default About;
