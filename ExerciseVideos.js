import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import Loader from './Loader';

const ExerciseVideos = ({ exerciseVideos, name }) => {
  if (!exerciseVideos?.length) return <Loader />;

  const videosToShow = exerciseVideos
    .slice(0, 3)
    .map((item) => ({
      videoId: item?.video?.videoId || '',
      title: item?.video?.title || 'Untitled video',
      channelName: item?.video?.channelName || 'Unknown channel',
      thumbnail: item?.video?.thumbnails?.[0]?.url || 'https://via.placeholder.com/350x200?text=No+Image',
    }))
    .filter((item) => Boolean(item.videoId));

  return (
    <Box sx={{ marginTop: { lg: '203px', xs: '20px' } }} p="20px">
      <Typography sx={{ fontSize: { lg: '44px', xs: '25px' } }} fontWeight={700} color="#000" mb="33px">
        Watch <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>{name}</span> exercise videos
      </Typography>
      <Stack sx={{ flexDirection: { lg: 'row' }, gap: { lg: '110px', xs: '0px' } }} justifyContent="flex-start" flexWrap="wrap" alignItems="center">
        {videosToShow.map((item, index) => (
          <a
            key={index}
            className="exercise-video"
            href={`https://www.youtube.com/watch?v=${item.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              style={{ borderTopLeftRadius: '20px' }}
              src={item.thumbnail}
              alt={item.title}
              width="350"
              height="200"
            />
            <Box>
              <Typography sx={{ fontSize: { lg: '28px', xs: '18px' } }} fontWeight={600} color="#000">
                {item.title}
              </Typography>
              <Typography fontSize="14px" color="#000">
                {item.channelName}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;
