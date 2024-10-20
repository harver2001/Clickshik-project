import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import UploadPage from './components/UploadScreen';
import CarouselPage from './components/CarouselScreen';
import Sidebar from './Sidebar';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('upload'); // Manage current view

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <Box flexGrow={1}>
          {currentPage === 'upload' && <UploadPage />}
          {currentPage === 'carousel' && <CarouselPage />}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
