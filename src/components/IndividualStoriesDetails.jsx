import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import parseSanitizeModifyLinks from './clean_markdown';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// returns a modal with the sanitized story details
const IndividualStoriesDetails = ({ open, handleOpen, handleClose, storyTitle, storyText }) => {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle} id="personal-story-modal">
            <Typography id="modal-modal-title" variant="h6" component="h2" dangerouslySetInnerHTML={{ __html: parseSanitizeModifyLinks(storyTitle)}}>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} dangerouslySetInnerHTML={{ __html: parseSanitizeModifyLinks(storyText)}}>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
}

export default IndividualStoriesDetails