import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import formatDateStr from "date-fns/format";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";

import NameStep from "./NameStep";
import WheelsStep from "./WheelsStep";
import TypeStep from "./TypeStep";
import ModelStep from "./ModelStep";
import DateStep from "./DateStep";
import apiClient from "../../api/axiosConfig";
import { toast } from "react-toastify";

// Helper component for summary items
const SummaryItem = ({ icon, label, value }) => (
  <Stack
    direction={{ xs: "column", sm: "row" }}
    spacing={{ xs: 0.5, sm: 2 }}
    alignItems={{ xs: "flex-start", sm: "center" }}
    sx={{
      py: 1.5,
      borderBottom: "1px solid",
      borderColor: "divider",
      "&:last-child": { borderBottom: "none" },
    }}
  >
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ color: "primary.main" }}
    >
      {icon}
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", minWidth: { xs: "auto", sm: 100 } }}
      >
        {label}:
      </Typography>
    </Stack>
    <Typography
      variant="body1"
      sx={{
        color: "text.secondary",
        flexGrow: 1,
        textAlign: { xs: "left", sm: "right" },
        pl: { xs: 4, sm: 0 },
      }}
    >
      {value || "N/A"}
    </Typography>
  </Stack>
);

const SubmitStep = ({
  formData,
  handleBack,
  handleSubmitBooking,
  handleStartNewBooking,
}) => {
  const { loading, error, success } = handleSubmitBooking;

  const formatDate = (dateValue) => {
    try {
      return dateValue
        ? formatDateStr(new Date(dateValue), "dd MMMM yyyy")
        : "N/A";
    } catch (e) {
      console.error("Error formatting date:", dateValue, e);
      return "Invalid Date";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ fontWeight: "600", color: "text.primary" }}
      >
        {loading
          ? "Processing..."
          : success || error
          ? "Booking Status"
          : "Confirm Booking"}
      </Typography>

      {!loading && !success && !error && (
        <>
          <Typography variant="body1" align="center">
            Please review your booking details:
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              p: { xs: 2, sm: 3 },
              mt: 1,
              width: "100%",
              bgcolor: "grey.50",
              borderRadius: 2,
            }}
          >
            <Stack spacing={0}>
              <SummaryItem
                icon={<AccountCircle />}
                label="Name"
                value={`${formData.firstName} ${formData.lastName}`}
              />
              <SummaryItem
                icon={<DirectionsCarIcon />}
                label="Vehicle"
                value={`${formData.vehicleModelName || "N/A"} (${
                  formData.vehicleTypeName || "N/A"
                })`}
              />
              <SummaryItem
                icon={<DonutSmallIcon />}
                label="Wheels"
                value={`${formData.wheels || "N/A"} Wheels`}
              />
              <SummaryItem
                icon={<CalendarTodayIcon />}
                label="Start Date"
                value={formatDate(formData.startDate)}
              />
              <SummaryItem
                icon={<EventRepeatIcon />}
                label="End Date"
                value={formatDate(formData.endDate)}
              />
            </Stack>
          </Paper>
        </>
      )}

      {loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            my: 4,
          }}
        >
          <CircularProgress size={40} />
          <Typography>Submitting your booking, please wait...</Typography>
        </Box>
      )}

      {error && (
        <Alert
          icon={<ErrorOutlineIcon />}
          severity="error"
          sx={{ width: "100%", mt: 2, display: "flex", alignItems: "center" }}
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          icon={<CheckCircleOutlineIcon />}
          severity="success"
          sx={{ width: "100%", mt: 2, display: "flex", alignItems: "center" }}
        >
          {success}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: success || error ? "center" : "space-between",
          mt: 2,
          width: "100%",
          gap: 2,
        }}
      >
        {!loading && !success && !error && (
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={loading}
            startIcon={<ArrowBackIcon />}
            sx={{
              transition: "transform 0.15s ease-in-out",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            Back
          </Button>
        )}

        {!loading && !error && !success && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitBooking.submit}
            disabled={loading}
            endIcon={<CheckCircleOutlineIcon />}
            sx={{
              transition: "transform 0.15s ease-in-out",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            Confirm & Book
          </Button>
        )}

        {(error || success) && (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<HomeIcon />}
            onClick={handleStartNewBooking}
            sx={{
              flexGrow: { xs: 1, sm: 0.5 },
              transition: "transform 0.15s ease-in-out",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            Start New Booking
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
        success: response.data.message || "Booking confirmed!",
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

  return <Box sx={{ width: "100%", p: { xs: 1, sm: 2 } }}>{renderStep()}</Box>;
};

export default BookingForm;
