import React from 'react'
import parseSanitizeModifyLinks from './clean_markdown';

const MusicDetails = ({ musicDetails }) => {
    let title, description;
    if (musicDetails && musicDetails.title) {
        title = <div className="fs-4" dangerouslySetInnerHTML={{ __html: parseSanitizeModifyLinks(musicDetails.title)}}></div>;
    } else {
        title = <div className="fs-4">View music details...</div>;
    }

    if (musicDetails && musicDetails.description) {
        description = <div className="fs-6" dangerouslySetInnerHTML={{ __html:parseSanitizeModifyLinks(musicDetails.description) }}></div>;
    } else {
        description = <div className="fs-6">View description here...</div>
    }
    return (
        <>
            {title}
            <hr></hr>
            {description}
        </>
    )
}

export default MusicDetails