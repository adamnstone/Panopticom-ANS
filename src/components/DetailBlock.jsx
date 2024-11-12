import React, { useState } from 'react'
import parseSanitizeModifyLinks from './clean_markdown';

// returns the sanitized markdown details for the title and description of objects on hover
const Details = ({ details, titleClassName, descriptionClassName, titleDefaultText, descriptionDefaultText }) => {
    // declare the variables for deconstructing the details object
    let title, description;

    // if the object is defined.. 
    if (details) {
        // if the object has the title property...
        if (details.title) {
            // set title to a cleaned html compilation of the markdown
            title = <div className={titleClassName} dangerouslySetInnerHTML={{ __html:parseSanitizeModifyLinks(details.title) }}></div>;
        } else {
            // otherwise, show the default title text
            title = <div className={titleClassName}>{titleDefaultText}</div>;
        }

        // if the object has the description property...
        if (details.description) {
            // set the description to a cleaned html compilation of the markdown
            description = <div className={descriptionClassName} dangerouslySetInnerHTML={{ __html:parseSanitizeModifyLinks(details.description) }}></div>;
        } else {
            // otherwise, show the default description text
            description = <div className={descriptionClassName}>{descriptionDefaultText}</div>
        }
    }
    return (
        <>
            {title}
            <hr></hr>
            {description}
        </>
    )
}

export default Details