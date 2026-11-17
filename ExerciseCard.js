import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import { rapidApiKey } from '../utils/fetchData';

const placeholderImage = 'https://via.placeholder.com/400x326?text=Exercise+Image';

const ExerciseCard = ({ exercise }) => {
  const derivedGifUrl = exercise?.id
    ? `https://exercisedb.p.rapidapi.com/image?exerciseId=${exercise.id}&resolution=180&rapidapi-key=${rapidApiKey}`
    : '';
  const exerciseImage = exercise?.gifUrl
    || exercise?.gifURL
    || exercise?.image
    || derivedGifUrl
    || placeholderImage;

  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`} state={{ exercise }}>
      <img
        src={exerciseImage}
        alt={exercise.name}
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholderImage;
        }}
        style={{ width: '100%', borderRadius: '10px' }}
      />

      <Stack direction="row" mt="10px">
        <Button
          sx={{
            ml: '21px',
            color: '#fff',
            background: '#FFA9A9',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
          }}
        >
          {exercise.bodyPart}
        </Button>

        <Button
          sx={{
            ml: '21px',
            color: '#fff',
            background: '#FCC757',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
          }}
        >
          {exercise.target}
        </Button>
      </Stack>

      <Typography
        ml="21px"
        color="#000"
        fontWeight="bold"
        sx={{ fontSize: { lg: '24px', xs: '20px' } }}
        mt="11px"
        pb="10px"
        textTransform="capitalize"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
