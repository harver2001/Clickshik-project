// components/CarouselScreen.js
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typography, CircularProgress, Box, Grid } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';

const CarouselContainer = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  width: '80%', // Adjust width
  textAlign: 'center',
}));

const Thumbnail = styled('img')(({ theme }) => ({
  maxHeight: '80px', // Smaller thumbnail size
  objectFit: 'cover',
  margin: theme.spacing(1),
}));

const LargeImage = styled('img')(({ theme }) => ({
  maxHeight: '400px',
  objectFit: 'cover',
  width: '100%',
}));

const CarouselScreen = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Use dummy random animal images
        const dummyImages = [
          { url: 'https://place-puppy.com/400x400' },
          { url: 'https://place-puppy.com/300x300' },
          { url: 'https://place-puppy.com/350x350' },
          { url: 'https://place-puppy.com/450x450' },
          { url: 'https://place-puppy.com/320x320' },
        ];
        setImages(dummyImages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <CarouselContainer>
      <Typography variant="h6" gutterBottom>
        Animal Carousel
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Carousel
            showThumbs={false} // Hiding default thumbnails
            showStatus={false}
            showIndicators={false}
            infiniteLoop={true}
            centerMode={true} // Center large image
            centerSlidePercentage={60} // Large central image
            dynamicHeight={true}
          >
            {images.map((image, index) => (
              <Box key={index}>
                <LargeImage src={image.url} alt={`animal-${index}`} />
              </Box>
            ))}
          </Carousel>

          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            {images.map((image, index) => (
              <Grid item key={index}>
                <Thumbnail src={image.url} alt={`thumb-${index}`} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </CarouselContainer>
  );
};

export default CarouselScreen;
