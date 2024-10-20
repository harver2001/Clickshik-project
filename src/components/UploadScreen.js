import React, { useState } from 'react';
import { Button, LinearProgress, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const Input = styled('input')({
  display: 'none',
});

const UploadScreen = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter(file => file.type === 'image/jpeg' && file.size < 5 * 1024 * 1024);
    setFiles(validFiles);

    const newProgress = {};
    validFiles.forEach(file => {
      newProgress[file.name] = 0;
    });
    setUploadProgress(newProgress);
  };

  const handleUpload = async () => {
    const promises = files.map(file => {
      const formData = new FormData();
      formData.append('file', file);

      return axios.post('/upload', formData, {
        onUploadProgress: (progressEvent) => {
          setUploadProgress(prevProgress => ({
            ...prevProgress,
            [file.name]: Math.round((progressEvent.loaded * 100) / progressEvent.total)
          }));
        }
      }).then(response => {
        setUploadedFiles(prevFiles => [...prevFiles, file.name]);
      }).catch(error => {
        console.error('Upload failed:', error);
      });
    });

    await Promise.all(promises);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Upload Screen</Typography>
      <label htmlFor="upload-button">
        <Input id="upload-button" type="file" multiple onChange={handleFileChange} />
        <Button variant="contained" component="span" sx={{ backgroundColor: '#fbc02d', color: '#000', borderRadius: '16px', '&:hover': { backgroundColor: '#f9a825' } }}>Select Files</Button>
      </label>
      <List>
        {files.map(file => (
          <ListItem key={file.name} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '40%', mr: 1 }}>
              <LinearProgress variant="determinate" value={uploadProgress[file.name] || 0} />
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ minWidth: '50px' }}>{`${uploadProgress[file.name] || 0}%`}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UploadScreen;