import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import formatDateStr from "date-fns/format";
import HomeIcon from "@mui/icons-material/Home";

import NameStep from "./NameStep";
import WheelsStep from "./WheelsStep";
import TypeStep from "./TypeStep";
import ModelStep from "./ModelStep";
import DateStep from "./DateStep";
import apiClient from "../../api/axiosConfig";
import { toast } from "react-toastify";

const SubmitStep = ({
  formData,
  handleBack,
  handleSubmitBooking,
  handleStartNewBooking,
}) => {
  const { loading, error, success } = handleSubmitBooking;

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

      {!loading && !success && !error && (
        <>
          <Typography variant="body1">Please review your details:</Typography>
          <Box
            sx={{
              p: 2,
              border: "1px solid grey",
              borderRadius: 1,
              width: "100%",
              bgcolor: "#f9f9f9",
              overflowX: "auto",
            }}
          >
            <pre>
              {JSON.stringify(
                formData,
                (key, value) => {
                  if ((key === "startDate" || key === "endDate") && value) {
                    try {
                      return formatDateStr(new Date(value), "dd-MM-yyyy");
                    } catch (e) {
                      console.error("Error parsing date:", value, e);
                      return value;
                    }
                  }
                  return value;
                },
                2
              )}
            </pre>
          </Box>
        </>
      )}

      {error && (
        <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
          {success}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          width: "100%",
          gap: 2,
        }}
      >
        {!loading && !success && (
          <Button variant="outlined" onClick={handleBack} disabled={loading}>
            Back
          </Button>
        )}

        {!loading && !error && !success && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitBooking.submit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Confirm & Book"}
          </Button>
        )}

        {(error || success) && (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<HomeIcon />}
            onClick={handleStartNewBooking}
            sx={{ flexGrow: !error ? 1 : 0 }}
          >
            New Booking
          </Button>
        )}
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

  const handleStartNewBooking = () => {
    setCurrentStep(1);
    setFormData({});
    setSubmitState({ loading: false, error: null, success: null });
  };

  const handleNext = (dataFromStep) => {
    if (!dataFromStep || Object.keys(dataFromStep).length === 0) {
      toast.error("Please make a selection before proceeding.");
      return;
    }
    setFormData((prevData) => ({ ...prevData, ...dataFromStep }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    if (currentStep === 6) {
      setSubmitState({ loading: false, error: null, success: null });
    }
  };

  const handleSubmitBooking = async () => {
    setSubmitState({ loading: true, error: null, success: null });
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        vehicleId: parseInt(formData.vehicleId),
        startDate: formData.startDate
          ? formatDateStr(formData.startDate, "yyyy-MM-dd")
          : null,
        endDate: formData.endDate
          ? formatDateStr(formData.endDate, "yyyy-MM-dd")
          : null,
      };

      if (
        !payload.firstName ||
        !payload.lastName ||
        !payload.vehicleId ||
        !payload.startDate ||
        !payload.endDate
      ) {
        throw new Error(
          "Missing booking information. Please complete all steps."
        );
      }

      const response = await apiClient.post("/bookings", payload);
      setSubmitState({
        loading: false,
        success: response.data.message,
        error: null,
      });
      toast.success(response.data.message || "Booking created successfully!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "An unexpected error occurred during booking.";
      setSubmitState({ loading: false, error: errorMessage, success: null });
      toast.error(errorMessage);
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
      case 5:
        return (
          <DateStep
            formData={formData}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 6:
        return (
          <SubmitStep
            formData={formData}
            handleBack={handleBack}
            handleSubmitBooking={{
              submit: handleSubmitBooking,
              ...submitState,
            }}
            handleStartNewBooking={handleStartNewBooking}
          />
        );
      default:
        return (
          <Box sx={{ textAlign: "center" }}>
            <Typography>Something went wrong. Let's start over.</Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              startIcon={<HomeIcon />}
              onClick={handleStartNewBooking}
            >
              Start Over
            </Button>
          </Box>
        );
    }
  };

  return <Box sx={{ width: "100%", p: 2 }}>{renderStep()}</Box>;
};

export default BookingForm;
