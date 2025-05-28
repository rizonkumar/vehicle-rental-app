import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { isAfter, startOfDay, isBefore, isSameDay } from "date-fns";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const DateStep = ({ formData, handleNext, handleBack }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      startDate: formData.startDate ? new Date(formData.startDate) : null,
      endDate: formData.endDate ? new Date(formData.endDate) : null,
    },
    mode: "onChange",
  });

  const startDateValue = watch("startDate");
  const endDateValue = watch("endDate");

  const onSubmit = (data) => {
    handleNext({
      startDate: data.startDate,
      endDate: data.endDate,
    });
  };

  const onError = (formErrors) => {
    const messageToShow =
      formErrors.startDate?.message ||
      formErrors.endDate?.message ||
      "Please fix the date errors before proceeding.";
    toast.error(messageToShow);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit, onError)}
      sx={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ fontWeight: "600", color: "text.primary" }}
      >
        Select Booking Dates
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <Controller
          name="startDate"
          control={control}
          rules={{
            required: "Start date is required.",
            validate: (value) => {
              if (!value) return true;
              const today = startOfDay(new Date());
              const dateValue = startOfDay(value);
              if (isBefore(dateValue, today)) {
                return "Start date cannot be in the past.";
              }
              if (
                endDateValue &&
                isAfter(dateValue, startOfDay(endDateValue))
              ) {
                return "Start date cannot be after end date.";
              }
              if (
                endDateValue &&
                isSameDay(dateValue, startOfDay(endDateValue))
              ) {
                return "Start Date and End Date cannot be same.";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Booking Start"
              disablePast
              format="dd-MM-yyyy"
              onChange={(date) => {
                field.onChange(date);
                trigger("endDate");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                  sx={{ width: "100%", minWidth: { sm: 220 } }}
                />
              )}
            />
          )}
        />
        <Typography
          sx={{
            fontWeight: "bold",
            color: "text.secondary",
            py: { xs: 1, sm: 0 },
          }}
        >
          TO
        </Typography>
        <Controller
          name="endDate"
          control={control}
          rules={{
            required: "End date is required.",
            validate: (value) => {
              if (!value) return true;
              const dateValue = startOfDay(value);
              if (
                startDateValue &&
                isBefore(dateValue, startOfDay(startDateValue))
              ) {
                return "End date cannot be before start date.";
              }
              if (
                startDateValue &&
                isSameDay(dateValue, startOfDay(startDateValue))
              ) {
                return "Start Date and End Date cannot be same.";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Booking End"
              disablePast
              format="dd-MM-yyyy"
              minDate={
                startDateValue
                  ? new Date(startDateValue.getTime() + 86400000)
                  : undefined
              } // Set minDate to day after start
              onChange={(date) => {
                field.onChange(date);
                trigger("startDate");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!errors.endDate}
                  helperText={errors.endDate?.message}
                  sx={{ width: "100%", minWidth: { sm: 220 } }}
                />
              )}
            />
          )}
        />
      </Stack>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
          sx={{
            transition: "transform 0.15s ease-in-out",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          sx={{
            transition: "transform 0.15s ease-in-out",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default DateStep;
