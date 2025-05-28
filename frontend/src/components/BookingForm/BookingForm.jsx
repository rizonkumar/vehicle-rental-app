// frontend/src/components/BookingForm/BookingForm.jsx
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import NameStep from "./NameStep";
import WheelsStep from "./WheelsStep";
import TypeStep from "./TypeStep";
import ModelStep from "./ModelStep";
import DateStep from "./DateStep"; // <-- Import DateStep
import apiClient from "../../api/axiosConfig"; // Need this for submission

// A simple component for the final step
const SubmitStep = ({ formData, handleBack, handleSubmitBooking }) => {
  const { loading, error, success } = handleSubmitBooking; // Get state

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" align="center">
        Confirm Booking
      </Typography>
      <Typography variant="body1">Please review your details:</Typography>
      <Box
        sx={{
          p: 2,
          border: "1px solid grey",
          borderRadius: 1,
          width: "100%",
          bgcolor: "#f9f9f9",
        }}
      >
        <pre>
          {JSON.stringify(
            formData,
            (key, value) => {
              // Format dates nicely for display
              if ((key === "startDate" || key === "endDate") && value) {
                try {
                  return new Date(value).toLocaleDateString();
                } catch (e) {
                  return value;
                }
              }
              return value;
            },
            2
          )}
        </pre>
      </Box>

      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          width: "100%",
        }}
      >
        <Button variant="outlined" onClick={handleBack} disabled={loading}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitBooking.submit} // Call submit function
          disabled={loading || !!success} // Disable if loading or successful
        >
          {loading ? <CircularProgress size={24} /> : "Confirm & Book"}
        </Button>
      </Box>
    </Box>
  );
};

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [submitState, setSubmitState] = useState({
    loading: false,
    error: null,
    success: null,
  });

  const handleNext = (dataFromStep) => {
    console.log("Data from step", currentStep, ":", dataFromStep);
    setFormData((prevData) => ({ ...prevData, ...dataFromStep }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setSubmitState({ loading: false, error: null, success: null }); // Reset submit state on back
  };

  // --- Booking Submission Logic ---
  const handleSubmitBooking = async () => {
    setSubmitState({ loading: true, error: null, success: null });
    try {
      // Prepare data for backend (ensure IDs are numbers, etc.)
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        vehicleId: parseInt(formData.vehicleId),
        startDate: formData.startDate.toISOString().split("T")[0], // YYYY-MM-DD
        endDate: formData.endDate.toISOString().split("T")[0], // YYYY-MM-DD
      };

      const response = await apiClient.post("/bookings", payload);
      setSubmitState({
        loading: false,
        success: response.data.message,
        error: null,
      });
    } catch (err) {
      console.error("Booking failed:", err);
      const errorMessage =
        err.response?.data?.error ||
        "An unexpected error occurred during booking.";
      setSubmitState({ loading: false, error: errorMessage, success: null });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <NameStep formData={formData} handleNext={handleNext} />;
      case 2:
        return (
          <WheelsStep
            formData={formData}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 3:
        return (
          <TypeStep
            formData={formData}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 4:
        return (
          <ModelStep
            formData={formData}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 5: // <-- Add Case 5 for DateStep
        return (
          <DateStep
            formData={formData}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 6: // <-- Add Case 6 for SubmitStep
        return (
          <SubmitStep
            formData={formData}
            handleBack={handleBack}
            handleSubmitBooking={{
              submit: handleSubmitBooking, // Pass the function
              ...submitState, // Pass loading/error/success state
            }}
          />
        );
      default:
        return (
          <Box>
            <Typography>Something went wrong, please start over.</Typography>
            <Button variant="outlined" onClick={() => setCurrentStep(1)}>
              Start Over
            </Button>
          </Box>
        );
    }
  };

  return <Box sx={{ width: "100%", p: 2 }}>{renderStep()}</Box>;
};

export default BookingForm;
