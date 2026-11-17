const sharedRapidApiKey = process.env.REACT_APP_RAPID_API_KEY
  || process.env.REACT_APP_RAPIDAPI_KEY
  || '';

const exerciseFallbackKey = '09601b8d89mshd5a5075798120b6p10033ejsn4cc62d6b3724';

export const exerciseRapidApiKey = process.env.REACT_APP_EXERCISE_RAPID_API_KEY
  || exerciseFallbackKey;
export const youtubeRapidApiKey = process.env.REACT_APP_YOUTUBE_RAPID_API_KEY
  || sharedRapidApiKey
  || exerciseFallbackKey;

// Keep backward compatibility for components importing rapidApiKey.
export const rapidApiKey = exerciseRapidApiKey;

export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': exerciseRapidApiKey,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': youtubeRapidApiKey,
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
  },
};

export const fetchData = async (url, options, fallback = null) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      return fallback;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return fallback;
  }
};
