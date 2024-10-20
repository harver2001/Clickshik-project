import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { CloudUpload, ViewCarousel, WbSunny } from '@mui/icons-material';
import UploadScreen from './components/UploadScreen';
import CarouselScreen from './components/CarouselScreen';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPage, setSelectedPage] = useState('upload');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#fbc02d' : '#1976d2',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" sx={{ backgroundColor: darkMode ? '#424242' : '#f5f5f5', minHeight: '100vh' }}>
        {/* Sidebar */}
        <Drawer variant="permanent" sx={{ width: '180px', flexShrink: 0, overflow: 'hidden' }}>
          <Box sx={{ width: '180px', display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
            <List sx={{ width: '100%' }}>
              <ListItem 
                button 
                onClick={() => setSelectedPage('upload')}
                sx={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: selectedPage === 'upload' ? (darkMode ? '#fff' : '#000') : 'transparent',
                  color: selectedPage === 'upload' ? (darkMode ? '#000' : '#fff') : (darkMode ? '#fff' : '#000'),
                  borderRadius: '16px',
                  margin: '5px auto',
                  padding: '10px',
                  width: '60%', 
                  '&:hover': {
                    backgroundColor: darkMode ? '#fff' : '#000',
                    color: darkMode ? '#000' : '#fff',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                  <CloudUpload />
                </ListItemIcon>
                <ListItemText primary="Upload" sx={{ textAlign: 'center' }} />
              </ListItem>

              <ListItem 
                button 
                onClick={() => setSelectedPage('carousel')}
                sx={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: selectedPage === 'carousel' ? (darkMode ? '#fff' : '#000') : 'transparent',
                  color: selectedPage === 'carousel' ? (darkMode ? '#000' : '#fff') : (darkMode ? '#fff' : '#000'),
                  borderRadius: '16px',
                  margin: '5px auto',
                  padding: '10px',
                  width: '60%', 
                  '&:hover': {
                    backgroundColor: darkMode ? '#fff' : '#000',
                    color: darkMode ? '#000' : '#fff',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                  <ViewCarousel />
                </ListItemIcon>
                <ListItemText primary="Carousel" sx={{ textAlign: 'center' }} />
              </ListItem>
            </List>

            {/* Sun Icon for Toggle */}
            <Box display="flex" justifyContent="center" mt="auto" mb="20px">
              <IconButton onClick={() => setDarkMode(!darkMode)}>
                <WbSunny />
              </IconButton>
            </Box>
          </Box>
        </Drawer>

        <Box sx={{ flexGrow: 1, marginLeft: '0px', padding: '20px' }}>
          <Box sx={{ backgroundColor: darkMode ? '#121212' : '#fff', padding: '20px', borderRadius: '16px', boxShadow: 3, minHeight: '90vh', width: '97%', margin: '0 auto' }}>
            {selectedPage === 'upload' && <UploadScreen />}
            {selectedPage === 'carousel' && <CarouselScreen />}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;