import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Paper, Stack, TextField, Typography,
} from '@mui/material';

const equipmentChips = ['Dumbbell', 'Barbell', 'Kettlebell', 'Treadmill'];
const equipmentImages = [
  {
    name: 'Dumbbells',
    src: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Barbell Plates',
    src: 'https://images.pexels.com/photos/949130/pexels-photo-949130.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Kettlebell',
    src: 'https://images.pexels.com/photos/28080/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
  },
];

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('fitnessAuth', 'true');
    localStorage.setItem('fitnessUser', JSON.stringify(formData));
    navigate('/', { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: '85vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        backgroundImage: 'linear-gradient(rgba(18, 8, 8, 0.6), rgba(18, 8, 8, 0.6)), url("https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1600")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '20px',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: '540px',
          borderRadius: '24px',
          p: { xs: 3, sm: 5 },
          background: 'linear-gradient(180deg, #fff6f6 0%, #ffffff 100%)',
          border: '1px solid #ffe3e3',
        }}
      >
        <Typography
          fontSize={{ xs: '28px', sm: '36px' }}
          fontWeight={700}
          color="#3A1212"
          textAlign="center"
          mb={1}
        >
          Gym Gear Login
        </Typography>
        <Typography textAlign="center" color="#5c3f3f" mb={3}>
          Sign in and continue your workout journey.
        </Typography>

        <Stack direction="row" spacing={1.5} justifyContent="center" mb={3} flexWrap="wrap">
          {equipmentImages.map((item) => (
            <Box
              key={item.name}
              component="img"
              src={item.src}
              alt={item.name}
              sx={{
                width: { xs: '92px', sm: '110px' },
                height: { xs: '92px', sm: '110px' },
                objectFit: 'cover',
                borderRadius: '16px',
                border: '2px solid #ffd4d4',
              }}
            />
          ))}
        </Stack>

        <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="center" mb={3}>
          {equipmentChips.map((item) => (
            <Box
              key={item}
              sx={{
                px: 2,
                py: 0.7,
                borderRadius: '999px',
                backgroundColor: '#ff2625',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              {item}
            </Box>
          ))}
        </Stack>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              inputProps={{ maxLength: 15 }}
              required
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                py: 1.3,
                borderRadius: '10px',
                fontWeight: 700,
                backgroundColor: '#ff2625',
                '&:hover': { backgroundColor: '#e71c1b' },
              }}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
