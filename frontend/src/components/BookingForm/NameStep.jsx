import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NameStep = ({ formData, handleNext }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
    },
  });

  const onSubmit = (data) => {
    handleNext(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <Typography variant="h6" align="center">
        First, what's your name?
      </Typography>

      {/* First Name Input */}
      <Controller
        name="firstName"
        control={control}
        rules={{ required: "First name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            variant="outlined"
            fullWidth
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        )}
      />

      {/* Last Name Input */}
      <Controller
        name="lastName"
        control={control}
        rules={{ required: "Last name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Last Name"
            variant="outlined"
            fullWidth
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        )}
      />

      {/* Next Button */}
      <Button
        type="submit" // Will trigger handleSubmit
        variant="contained"
        color="primary"
        sx={{ mt: 2, alignSelf: "flex-end" }} // Align to the right
      >
        Next
      </Button>
    </Box>
  );
};

export default NameStep;
