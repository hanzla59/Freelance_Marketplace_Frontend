import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  InputAdornment,
  Chip,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { Close as CloseIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const ProfileUpdate = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [bio, setBio] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [hourlyRate, setHourlyRate] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills((prev) => [...prev, newSkill]);
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToDelete));
  };

  const handleSubmit = async () => {
    // Create an object with only the fields that have values
    const formData = {};
    if (username) formData.username = username;
    if (email) formData.email = email;
    if (location) formData.location = location;
    if (password) formData.password = password;
    if (name) formData.name = name;
    if (bio) formData.bio = bio;
    if (skills.length) formData.skills = skills;
    if (hourlyRate) formData.hourlyRate = parseFloat(hourlyRate);

    // Check if at least one field is provided
    if (Object.keys(formData).length === 0) {
      setSnackbarMessage("At least one field is required for update.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const { data } = await axios.put("http://localhost:5000/fyp/updateUser", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSnackbarMessage(data.message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      // Reset the state after successful update
      setUsername("");
      setEmail("");
      setLocation("");
      setPassword("");
      setBio("");
      setSkills([]);
      setHourlyRate("");
      setName("");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        const errorMessage = error.response.data.message;
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity("error");
      } else {
        setSnackbarMessage("Profile update failed: An unexpected error occurred");
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontSize: "2rem", color: "green", mt: 2 }}>
        Update Your Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              mb: 0,
              marginTop: "13px",
              "& .MuiInputLabel-root": { color: "black" },
              "& .MuiInputLabel-root.Mui-focused": { color: "green" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "green" },
              },
            }}
          />
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              mb: 0,
              marginTop: "13px",
              "& .MuiInputLabel-root": { color: "black" },
              "& .MuiInputLabel-root.Mui-focused": { color: "green" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "green" },
              },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 0,
              marginTop: "13px",
              "& .MuiInputLabel-root": { color: "black" },
              "& .MuiInputLabel-root.Mui-focused": { color: "green" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "green" },
              },
            }}
          />
          <TextField
            fullWidth
            label="Location"
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{
              mb: 0,
              marginTop: "13px",
              "& .MuiInputLabel-root": { color: "black" },
              "& .MuiInputLabel-root.Mui-focused": { color: "green" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "green" },
              },
            }}
          />
          <TextField
            fullWidth
            label="Bio"
            multiline
            rows={4}
            margin="normal"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            sx={{
              mb: 0,
              marginTop: "13px",
              "& .MuiInputLabel-root": { color: "black" },
              "& .MuiInputLabel-root.Mui-focused": { color: "green" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "green" },
              },
            }}
          />
          <TextField
            fullWidth
            label="Skills"
            margin="normal"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            sx={{
              mb: 0,
              marginTop: "13px",
              "& .MuiInputLabel-root": { color: "black" },
              "& .MuiInputLabel-root.Mui-focused": { color: "green" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "green" },
              },
            }}
          />
          <Box display="flex" flexWrap="wrap" mt={1}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={() => handleDeleteSkill(skill)}
                style={{ margin: "4px" }}
              />
            ))}
          </Box>
          <TextField
            fullWidth
            label="Hourly Rate"
            type="number"
            margin="normal"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            sx={{
              mb: 0,
              marginTop: "13px",
              "& .MuiInputLabel-root": { color: "black" },
              "& .MuiInputLabel-root.Mui-focused": { color: "green" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "green" },
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 0,
              marginTop: "13px",
              "& .MuiInputLabel-root": { color: "black" },
              "& .MuiInputLabel-root.Mui-focused": { color: "green" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "green" },
              },
            }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: "20px", width: "100%" }}
      >
        Update Profile
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProfileUpdate;
