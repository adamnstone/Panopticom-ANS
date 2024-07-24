import React from 'react';
import '/about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
      <a href="https://petergabriel.com/focus/the-panopticom/" target="_blank"><img src="/images/panopticom_logo_large.jpg" alt="Panopticom logo" className="about-image"/></a>
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
                <a href="">React</a>
                <br />
                <a href="">Vite</a>
                <br />
                <a href="">Bootstrap</a>
                <br />
                <a href="">GlobeGL</a>
              </td>
            </tr>
            <tr>
              <td className="l">Data type</td>
              <td className="r">
                Data name
                <br />
                <a href="source">Link text</a>
              </td>
            </tr>
          </tbody>
        </table>
      <h2>Inspiration and history</h2>
        <div className="blurb">
          <p className="center">
          
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
