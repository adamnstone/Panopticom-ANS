import React from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify';

const parseSanitizeModifyLinks = str => {
    const innerHTML = new DOMParser().parseFromString(DOMPurify.sanitize(marked.parse(str)), 'text/html');
    innerHTML.querySelectorAll("a").forEach(a => a.target = "_blank");
    return innerHTML.body.innerHTML;
}

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