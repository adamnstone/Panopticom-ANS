import Details from './DetailBlock.jsx'

// returns the sanitized markdown details for the title and description of objects on hover
const HoverDetails = ({ hoverDetails }) => {
    return <Details 
        details={hoverDetails} 
        titleClassName='fs-1'
        descriptionClassName='fs-3'
        titleDefaultText="View hover details..."
        descriptionDefaultText="View description here..."
    />
}

export default HoverDetails