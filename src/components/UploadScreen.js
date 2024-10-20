import React, { useState, useEffect, useRef } from 'react';
import { Button, LinearProgress, List, ListItem, Typography, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Input = styled('input')({
  display: 'none',
});

const UploadScreen = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isPaused, setIsPaused] = useState({});
  const uploadTimers = useRef({}); 

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter(file => file.type === 'image/jpeg' && file.size < 5 * 1024 * 1024);
    setFiles(validFiles);

    const newProgress = {};
    validFiles.forEach(file => {
      newProgress[file.name] = 0;
    });
    setUploadProgress(newProgress);

    const pausedState = {};
    validFiles.forEach(file => {
      pausedState[file.name] = false;
    });
    setIsPaused(pausedState);
  };

  useEffect(() => {
    if (files.length > 0) {
      startUploads();
    }
  }, [files]);

  const simulateUploadProgress = (file) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        if (isPaused[file.name]) return; 

        progress += 10;
        setUploadProgress(prevProgress => ({
          ...prevProgress,
          [file.name]: progress,
        }));

        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 300);

      uploadTimers.current[file.name] = interval; 
    });
  };

  const startUploads = async () => {
    for (const file of files) {
      await simulateUploadProgress(file);
    }
  };

  const handlePauseResume = (file) => {
    setIsPaused(prevPaused => ({
      ...prevPaused,
      [file.name]: !prevPaused[file.name],
    }));
  };

  return (
    <Box sx={{padding : '25px'}}>
      <Typography variant="h4" gutterBottom>Upload</Typography>
      <br />
      <label htmlFor="upload-button">
        <Input id="upload-button" type="file" multiple onChange={handleFileChange} />
        <Button 
          variant="contained" 
          component="span" 
          sx={{ backgroundColor: '#fbc02d', color: '#000', borderRadius: '16px', '&:hover': { backgroundColor: '#f9a825' } }}
        >
         UPLOAD PHOTOS
        </Button>
      </label>

      <List>
        {files.map(file => (
          <ListItem key={file.name} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ width: '80%', mr: 1 }}>
              <LinearProgress variant="determinate" value={uploadProgress[file.name] || 0} />
              <Typography variant="body2" sx={{ textAlign: 'center' }}>{`${uploadProgress[file.name] || 0}% uploaded`}</Typography>
            </Box>
            <IconButton 
              onClick={() => handlePauseResume(file)} 
              size="small" 
              sx={{ ml: 2, color: '#fbc02d', position: 'relative', bottom: '8px' }} 
            >
              {isPaused[file.name] ? <PlayArrowIcon /> : <PauseIcon />}
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UploadScreen;
