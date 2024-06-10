import React, { useState } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify';

const HoverDetails = ({ hoverDetails }) => {
    let title, description;
    if (hoverDetails && hoverDetails.title) {
        title = <div className="fs-1" dangerouslySetInnerHTML={{ __html:DOMPurify.sanitize(marked.parse(hoverDetails.title)) }}></div>;
    } else {
        title = <div className="fs-1">View hover details...</div>;
    }

    if (hoverDetails && hoverDetails.description) {
        description = <div className="fs-3" dangerouslySetInnerHTML={{ __html:DOMPurify.sanitize(marked.parse(hoverDetails.description)) }}></div>;
    } else {
        description = <div className="fs-3">View description here...</div>
    }
    return (
        <>
            {title}
            <hr></hr>
            {description}
        </>
    )
}

export default HoverDetails