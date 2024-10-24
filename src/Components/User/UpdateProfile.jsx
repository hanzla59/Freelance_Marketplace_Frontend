import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Button,
  Typography,
  Grid,
  InputAdornment,
  Chip,
  Box,
} from "@mui/material";
import { Close as CloseIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";



const ProfileUpdateDialog = ({ open, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState(""); // New state for Name
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [bio, setBio] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [hourlyRate, setHourlyRate] = useState("");

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

    try {
      const { data } = await axios.put("http://localhost:5000/fyp/updateUser", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert(data.message);
      // Reset the state after successful update
      setUsername(""); setEmail(""); setLocation(""); setPassword(""); setBio("");
      setSkills([]); setHourlyRate(""); setName("");    
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        // Extract the error message from the server response
        const errorMessage = error.response.data.message;
        alert(`${errorMessage}`);
    } else {
        // Generic error message for network or unknown errors
        alert("Profile update failed: An unexpected error occurred");
    }
    console.error("Error updating profile:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontSize: "2rem", color: "green", mt: 2 }}>
          Edit Your Profile
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
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
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
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onClose}
                sx={{ width: "48%", fontSize: "1.1rem", borderColor: "black", color: "black", ":hover": { borderColor: "red", color: "red", backgroundColor: "white" } }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ width: "48%", fontSize: "1.1rem", backgroundColor: "green", color: "white", ":hover": { backgroundColor: "black", color: "yellow" } }}
              >
                Update Profile
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default function UpdateProfile() {
  const [openDialog, setOpenDialog] = useState(false);
    

    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);
  return (
    <div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                Update Profile
            </Button>
            <ProfileUpdateDialog open={openDialog} onClose={handleClose}  />
        </div>
  )
}
