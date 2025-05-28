import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import apiClient from "../../api/axiosConfig";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CardLabel = ({ value, text, selectedValue }) => {
  const theme = useTheme();
  const isSelected = selectedValue === value;

  return (
    <Box
      sx={{
        border: "2px solid",
        borderColor: isSelected
          ? theme.palette.primary.main
          : theme.palette.grey[300],
        bgcolor: isSelected
          ? `${theme.palette.primary.main}1A`
          : "background.paper",
        borderRadius: 2,
        p: 2,
        width: "100%",
        minHeight: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        transform: isSelected ? "scale(1.05)" : "scale(1)",
        boxShadow: isSelected ? theme.shadows[4] : theme.shadows[1],
        textAlign: "center",
        "&:hover": {
          borderColor: isSelected
            ? theme.palette.primary.main
            : theme.palette.primary.light,
          boxShadow: theme.shadows[3],
        },
      }}
    >
      <Typography
        variant="button"
        sx={{
          color: isSelected ? theme.palette.primary.dark : "text.primary",
          fontWeight: isSelected ? "bold" : "normal",
          lineHeight: 1.2, // Adjust line height for better wrapping if needed
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

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
      setVehicleTypes([]);

      try {
        if (!formData.wheels) {
          setError("Number of wheels not selected. Please go back.");
          toast.warn("Number of wheels not selected. Please go back.");
          return;
        }
        const response = await apiClient.get(
          `/vehicles/types?wheels=${formData.wheels}`
        );
        if (response.data.length === 0) {
          setError(`No vehicle types found for ${formData.wheels} wheels.`);
        } else {
          setVehicleTypes(response.data);
        }
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Could not fetch vehicle types.";
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleTypes();
  }, [formData.wheels]);

  const onSubmit = (data) => {
    if (!data.vehicleTypeId) {
      toast.error("Please select a vehicle type.");
      return;
    }
    const selectedType = vehicleTypes.find(
      (type) => type.id === parseInt(data.vehicleTypeId)
    );
    handleNext({ ...data, vehicleTypeName: selectedType?.name });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ fontWeight: "600", color: "text.primary" }}
      >
        Type of vehicle?
      </Typography>

      <FormControl
        component="fieldset"
        error={!!errors.vehicleTypeId}
        sx={{
          width: "100%",
          minHeight: 150,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              my: 3,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {error && !isLoading && (
          <Alert severity="error" sx={{ my: 3, width: "100%" }}>
            {error}
          </Alert>
        )}

        {!isLoading && !error && vehicleTypes.length > 0 && (
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
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  sx={{ mt: 1 }}
                >
                  {vehicleTypes.map((type) => (
                    <Grid item key={type.id} xs={6} sm={4}>
                      <FormControlLabel
                        value={type.id.toString()}
                        control={<Radio sx={{ display: "none" }} />}
                        label={
                          <CardLabel
                            value={type.id.toString()}
                            text={type.name}
                            selectedValue={field.value}
                          />
                        }
                        sx={{ m: 0, width: "100%" }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            )}
          />
        )}

        {errors.vehicleTypeId && !isLoading && (
          <FormHelperText
            sx={{ textAlign: "center", mt: 1, color: "error.main" }}
          >
            {errors.vehicleTypeId.message}
          </FormHelperText>
        )}
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
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
          disabled={isLoading || !vehicleTypes.length}
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

export default TypeStep;
