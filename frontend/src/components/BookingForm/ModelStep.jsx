// frontend/src/components/BookingForm/ModelStep.jsx
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
import apiClient from "../../api/axiosConfig";

const ModelStep = ({ formData, handleNext, handleBack }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      vehicleId: formData.vehicleId || null,
    },
  });

  const [vehicleModels, setVehicleModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch vehicle models based on the selected type ID
  useEffect(() => {
    const fetchVehicleModels = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (!formData.vehicleTypeId) {
          throw new Error("Vehicle type not selected.");
        }
        const response = await apiClient.get(
          `/vehicles?typeId=${formData.vehicleTypeId}`
        );
        setVehicleModels(response.data);
        if (response.data.length === 0) {
          setError("No specific models found for this type.");
        }
      } catch (err) {
        console.error("Failed to fetch vehicle models:", err);
        setError(
          err.response?.data?.error ||
            err.message ||
            "Could not fetch vehicle models."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleModels();
  }, [formData.vehicleTypeId]);

  const onSubmit = (data) => {
    // Find the name of the selected model
    const selectedModel = vehicleModels.find(
      (model) => model.id === parseInt(data.vehicleId)
    );
    handleNext({ ...data, vehicleModelName: selectedModel?.name });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <Typography variant="h6" align="center">
        Specific Model?
      </Typography>

      <FormControl component="fieldset" error={!!errors.vehicleId}>
        <FormLabel component="legend">Select a specific model:</FormLabel>

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

        {!isLoading && vehicleModels.length > 0 && (
          <Controller
            name="vehicleId"
            control={control}
            rules={{ required: "Please select a specific model" }}
            render={({ field }) => (
              <RadioGroup
                {...field}
                aria-label="vehicle-model"
                name="vehicleId"
              >
                {vehicleModels.map((model) => (
                  <FormControlLabel
                    key={model.id}
                    value={model.id.toString()}
                    control={<Radio />}
                    label={model.name}
                  />
                ))}
              </RadioGroup>
            )}
          />
        )}

        {errors.vehicleId && (
          <FormHelperText>{errors.vehicleId.message}</FormHelperText>
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
          disabled={isLoading || !!error || vehicleModels.length === 0}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ModelStep;
