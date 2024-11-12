import Details from './DetailBlock.jsx'

// returns the sanitized markdown details for the title and description of objects on hover
const MusicDetails = ({ musicDetails }) => {
    return <Details 
        details={musicDetails} 
        titleClassName='fs-4'
        descriptionClassName='fs-6'
        titleDefaultText="View music details..."
        descriptionDefaultText="View description here..."
    />
}

export default MusicDetails