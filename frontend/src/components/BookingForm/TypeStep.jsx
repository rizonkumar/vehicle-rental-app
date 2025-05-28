import { useState, useEffect } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import apiClient from "../../api/axiosConfig"; // Import our Axios instance

const TypeStep = ({ formData, handleNext, handleBack }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      vehicleTypeId: formData.vehicleTypeId || null,
    },
  });

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (!formData.wheels) {
          throw new Error("Number of wheels not selected.");
        }
        const response = await apiClient.get(
          `/vehicles/types?wheels=${formData.wheels}`
        );
        setVehicleTypes(response.data);
      } catch (err) {
        console.error("Failed to fetch vehicle types:", err);
        setError(
          err.response?.data?.error ||
            err.message ||
            "Could not fetch vehicle types."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleTypes();
  }, [formData.wheels]);

  const onSubmit = (data) => {
    const selectedType = vehicleTypes.find(
      (type) => type.id === parseInt(data.vehicleTypeId)
    );
    handleNext({ ...data, vehicleTypeName: selectedType?.name });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <Typography variant="h6" align="center">
        Type of vehicle?
      </Typography>

      <FormControl component="fieldset" error={!!errors.vehicleTypeId}>
        <FormLabel component="legend">Select a vehicle type:</FormLabel>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        {!isLoading && !error && (
          <Controller
            name="vehicleTypeId"
            control={control}
            rules={{ required: "Please select a vehicle type" }}
            render={({ field }) => (
              <RadioGroup
                {...field}
                aria-label="vehicle-type"
                name="vehicleTypeId"
              >
                {vehicleTypes.map((type) => (
                  <FormControlLabel
                    key={type.id}
                    value={type.id.toString()}
                    control={<Radio />}
                    label={type.name}
                  />
                ))}
              </RadioGroup>
            )}
          />
        )}

        {errors.vehicleTypeId && (
          <FormHelperText>{errors.vehicleTypeId.message}</FormHelperText>
        )}
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading || !!error} // Disable if loading or error
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default TypeStep;
