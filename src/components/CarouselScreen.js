// components/CarouselScreen.js
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typography, CircularProgress, Box, Grid } from '@mui/material';
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
        const fetchedImages = [
          { url: 'https://picsum.photos/400/400', alt_description: 'Random Image 1' },
          { url: 'https://picsum.photos/300/300', alt_description: 'Random Image 2' },
          { url: 'https://picsum.photos/350/350', alt_description: 'Random Image 3' },
          { url: 'https://picsum.photos/450/450', alt_description: 'Random Image 4' },
          { url: 'https://picsum.photos/320/320', alt_description: 'Random Image 5' },
        ];
        setImages(fetchedImages);
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
        Image Carousel
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
            autoPlay={true} // Automatically move the carousel
            interval={3000} // 3 seconds per slide
            centerMode={true} // Center large image
            centerSlidePercentage={60} // Large central image
            dynamicHeight={true}
          >
            {images.map((image, index) => (
              <Box key={index}>
                <LargeImage src={image.url} alt={image.alt_description} />
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
