import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
      const cachedExercises = JSON.parse(localStorage.getItem('cachedExercises') || '[]');
      const routeExercise = location?.state?.exercise;
      const fallbackExercise = routeExercise?.id === id
        ? routeExercise
        : cachedExercises.find((item) => item?.id === id) || {};

      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions, {});
      const resolvedExerciseDetail = exerciseDetailData?.name ? exerciseDetailData : fallbackExercise;
      setExerciseDetail(resolvedExerciseDetail || {});

      if (!resolvedExerciseDetail?.name) {
        setExerciseVideos([]);
        setTargetMuscleExercises([]);
        setEquipmentExercises([]);
        return;
      }

      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${resolvedExerciseDetail.name} exercise`, youtubeOptions, { contents: [] });
      setExerciseVideos(Array.isArray(exerciseVideosData?.contents) ? exerciseVideosData.contents : []);

      const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${resolvedExerciseDetail.target}`, exerciseOptions, []);
      const resolvedTargetMuscleExercises = Array.isArray(targetMuscleExercisesData) && targetMuscleExercisesData.length
        ? targetMuscleExercisesData
        : cachedExercises.filter((item) => item?.target === resolvedExerciseDetail?.target && item?.id !== id);
      setTargetMuscleExercises(resolvedTargetMuscleExercises);

      const equimentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${resolvedExerciseDetail.equipment}`, exerciseOptions, []);
      const resolvedEquipmentExercises = Array.isArray(equimentExercisesData) && equimentExercisesData.length
        ? equimentExercisesData
        : cachedExercises.filter((item) => item?.equipment === resolvedExerciseDetail?.equipment && item?.id !== id);
      setEquipmentExercises(resolvedEquipmentExercises);
    };

    fetchExercisesData();
  }, [id, location.state]);

  if (!exerciseDetail) return <div>No Data</div>;

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
};

export default ExerciseDetail;
