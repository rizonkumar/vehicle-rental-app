import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { isAfter, startOfDay, isBefore, isSameDay } from "date-fns";
import { toast } from "react-toastify"; // Import toast

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
    let messageToShow = "Please fix the date errors before proceeding.";

    if (formErrors.startDate?.message) {
      messageToShow = formErrors.startDate.message;
    } else if (formErrors.endDate?.message) {
      messageToShow = formErrors.endDate.message;
    }
    toast.error(messageToShow);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit, onError)}
      sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}
    >
      <Typography variant="h6" align="center">
        Select Booking Dates
      </Typography>

      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
        <Controller
          name="startDate"
          control={control}
          rules={{
            required: "Start date is required.",
            validate: (value) => {
              if (!value) return true;
              if (isAfter(startOfDay(new Date()), value)) {
                return "Start date cannot be in the past.";
              }
              if (endDateValue && isAfter(value, endDateValue)) {
                return "Start date cannot be after end date.";
              }
              if (endDateValue && isSameDay(value, endDateValue)) {
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
                />
              )}
            />
          )}
        />
        <Typography sx={{ pt: 2 }}>to</Typography>
        <Controller
          name="endDate"
          control={control}
          rules={{
            required: "End date is required.",
            validate: (value) => {
              if (!value) return true;
              if (startDateValue && isBefore(value, startDateValue)) {
                return "End date cannot be before start date.";
              }
              if (startDateValue && isSameDay(value, startDateValue)) {
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
              minDate={startDateValue || undefined}
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
