// frontend/src/components/BookingForm/WheelsStep.jsx
import { useForm, Controller } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";

const WheelsStep = ({ formData, handleNext, handleBack }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      wheels: formData.wheels || null, // Default to null or existing value
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
        Number of wheels?
      </Typography>

      <FormControl component="fieldset" error={!!errors.wheels}>
        <FormLabel component="legend">Select an option:</FormLabel>
        <Controller
          name="wheels"
          control={control}
          rules={{ required: "Please select the number of wheels" }} // Validation
          render={({ field }) => (
            <RadioGroup {...field} row aria-label="wheels" name="wheels">
              <FormControlLabel value="2" control={<Radio />} label="Two" />
              <FormControlLabel value="4" control={<Radio />} label="Four" />
            </RadioGroup>
          )}
        />
        {/* Show error message if selection is not made */}
        {errors.wheels && (
          <FormHelperText>{errors.wheels.message}</FormHelperText>
        )}
      </FormControl>

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="outlined"
          onClick={handleBack} // Go back to the previous step
        >
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default WheelsStep;
