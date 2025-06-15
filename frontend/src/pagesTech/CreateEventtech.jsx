import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  CircularProgress,
  styled,
  Snackbar, // Ensured import
  Alert,    // Ensured import
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { toast, Toaster } from "react-hot-toast"; // Remains removed
import { useAuth } from "../context/AuthContext";

// VisuallyHiddenInput definition (assuming it's correctly placed above the component)
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function CreateEventTech() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const departmentOptions =
    user?.role === "CSETechHod"
      ? ["CSE"]
      : user?.role === "CSECyberHod"
        ? ["CSE-Cyber Security"]
        : user?.role === "ITTechHod"
          ? ["IT"]
          : user?.role === "ADSTechHod"
            ? ["ADS"]
            : user?.role === "ECETechHod"
              ? ["ECE"]
              : user?.role === "EEETechHod"
                ? ["EEE"]
                : ["CSE", "CSE-Cyber Security", "IT", "ADS", "ECE", "EEE"];

  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    eventLink: "",
    department: "",
    eligibility: "",
    posterUrl: "",
  });

  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  // Snackbar state - ensuring it's identical to CreateEventEng.jsx
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPoster(file);
    setPreview(URL.createObjectURL(file));
  };

  // handleSnackbarClose - ensuring it's identical to CreateEventEng.jsx
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let uploadedPosterUrl = "";

      if (poster) {
        const formData = new FormData();
        formData.append("file", poster);

        const uploadResponse = await axios.post(
          "http://localhost:3000/api/upload/poster",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        uploadedPosterUrl = uploadResponse.data.secure_url;
      }

      const payload = {
        ...eventData,
        posterUrl: uploadedPosterUrl || eventData.posterUrl,
        eventType: "Tech",
      };

      const response = await axios.post(
        "http://localhost:3000/event/createEvent",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      // Snackbar logic - ensuring it's identical to CreateEventEng.jsx
      if (response.data.success) {
        setSnackbarMessage("🎉 Event Created Successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setTimeout(() => navigate("/technology/events"), 3000);
      } else {
        setSnackbarMessage("⚠️ Failed to create event. Please try again!");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error("Event creation failed:", err);
      setSnackbarMessage("⚠️ Error creating event.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 10 }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      // anchorOrigin and custom Alert sx removed for a more default appearance
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }} // Standard width, other custom styles removed
        // variant="filled" removed, defaults to standard
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          color="primary"
          mb={3}
        >
          📅 Create New Event
        </Typography>

        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            required
            value={eventData.title}
            onChange={handleChange}
          />

          <Box display="flex" gap={2}>
            <TextField
              label="Date"
              name="date"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={eventData.date}
              onChange={handleChange}
            />
            <TextField
              label="Time"
              name="time"
              type="time"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={eventData.time}
              onChange={handleChange}
            />
          </Box>

          <TextField
            label="Venue"
            name="venue"
            fullWidth
            required
            margin="normal"
            value={eventData.venue}
            onChange={handleChange}
          />

          <TextField
            label="Event Link"
            name="eventLink"
            fullWidth
            margin="normal"
            value={eventData.eventLink}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={eventData.department}
              onChange={handleChange}
              required
              label="Department"
            >
              {departmentOptions.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            value={eventData.description}
            onChange={handleChange}
          />

          <TextField
            label="Eligibility"
            name="eligibility"
            multiline
            rows={2}
            fullWidth
            margin="normal"
            value={eventData.eligibility}
            onChange={handleChange}
          />

          <Box mt={2}>
            <Button
              component="label"
              role={undefined}
              variant="contained" // Assuming this was the intended variant from previous user requests for upload button
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              fullWidth
              sx={{ mt: 1 }}
            >
              Upload Poster
              <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
            </Button>
          </Box>

          {preview && (
            <Box mt={2}>
              <Typography variant="subtitle2" mb={1}>
                Poster Preview:
              </Typography>
              <img
                src={preview}
                alt="Poster Preview"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ mt: 4 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Create Event"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
