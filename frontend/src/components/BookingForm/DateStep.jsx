import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // Changed import
import { TextField } from "@mui/material";
import { isAfter, startOfDay } from "date-fns";

const DateStep = ({ formData, handleNext, handleBack }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch, // We need watch to compare dates
  } = useForm({
    defaultValues: {
      // Use separate fields now
      startDate: formData.startDate ? new Date(formData.startDate) : null,
      endDate: formData.endDate ? new Date(formData.endDate) : null,
    },
  });

  // Watch the values to use them in validation
  const startDateValue = watch("startDate");
  const endDateValue = watch("endDate");

  const onSubmit = (data) => {
    handleNext({
      startDate: data.startDate,
      endDate: data.endDate,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}
    >
      <Typography variant="h6" align="center">
        Select Booking Dates
      </Typography>

      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
        {" "}
        {/* Container for pickers */}
        {/* Start Date Picker */}
        <Controller
          name="startDate"
          control={control}
          rules={{
            required: "Start date is required.",
            validate: (value) => {
              if (!value) return true; // Let required handle null
              if (isAfter(startOfDay(new Date()), value)) {
                return "Start date cannot be in the past.";
              }
              // Check if endDate exists and if startDate is before endDate
              if (endDateValue && !isAfter(endDateValue, value)) {
                return "Start date must be before end date.";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Booking Start"
              disablePast
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                />
              )}
            />
          )}
        />
        <Typography sx={{ pt: 2 }}>to</Typography> {/* Separator */}
        {/* End Date Picker */}
        <Controller
          name="endDate"
          control={control}
          rules={{
            required: "End date is required.",
            validate: (value) => {
              if (!value) return true; // Let required handle null
              // Check if startDate exists and if endDate is after startDate
              if (startDateValue && !isAfter(value, startDateValue)) {
                return "End date must be after start date.";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Booking End"
              disablePast
              minDate={startDateValue || undefined} // Set minDate based on start
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!errors.endDate}
                  helperText={errors.endDate?.message}
                />
              )}
            />
          )}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default DateStep;
