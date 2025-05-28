import React from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

import { TextField } from "@mui/material"; // Needed for DateRangePicker rendering
import { isAfter, startOfDay } from "date-fns"; // For date validation

const DateStep = ({ formData, handleNext, handleBack }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      dateRange: [
        formData.startDate ? new Date(formData.startDate) : null,
        formData.endDate ? new Date(formData.endDate) : null,
      ],
    },
  });

  const dateRangeValue = watch("dateRange");

  const onSubmit = (data) => {
    handleNext({
      startDate: data.dateRange[0],
      endDate: data.dateRange[1],
    });
  };

  const validateDateRange = (value) => {
    const [start, end] = value;
    if (!start || !end) {
      return "Both start and end dates are required.";
    }
    if (!isAfter(end, start)) {
      return "End date must be after the start date.";
    }
    if (isAfter(startOfDay(new Date()), start)) {
      return "Start date cannot be in the past.";
    }
    return true; // Validation passed
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }} // Increased gap
    >
      <Typography variant="h6" align="center">
        Select Booking Dates
      </Typography>

      <Controller
        name="dateRange"
        control={control}
        rules={{ validate: validateDateRange }} // Custom validation rule
        render={({ field: { onChange, value, ...restField } }) => (
          <DateRangePicker
            {...restField} // Pass other field props like name, onBlur
            value={value}
            onChange={onChange} // This handles setting the [start, end] value
            disablePast // Disallow past dates
            startText="Booking Start"
            endText="Booking End"
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} fullWidth />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} fullWidth />
              </React.Fragment>
            )}
          />
        )}
      />
      {/* Display validation error message */}
      {errors.dateRange && (
        <Typography color="error" variant="caption">
          {errors.dateRange.message}
        </Typography>
      )}

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
