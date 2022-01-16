import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function Message(props) {
  const [open, setOpen] = React.useState(true);
  const response = props.response

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          variant="outlined"
          severity= {response.isError ? "error" : "success"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {response.isError ? response.error : response.message}
        </Alert>
      </Collapse>
    </Box>
  );
}
