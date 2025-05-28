import { useForm, Controller } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTheme } from "@mui/material/styles";

const CardLabel = ({ value, icon: Icon, text, selectedValue }) => {
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
          : "background.paper", // Primary with ~10% alpha or paper
        borderRadius: 3,
        p: 3,
        width: { xs: "100%", sm: 192 },
        height: 144,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        transform: isSelected ? "scale(1.05)" : "scale(1)",
        boxShadow: isSelected ? theme.shadows[6] : theme.shadows[1],
        "&:hover": {
          borderColor: isSelected
            ? theme.palette.primary.main
            : theme.palette.primary.light,
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <Icon
        sx={{
          mb: 1,
          fontSize: 40,
          color: isSelected
            ? theme.palette.primary.main
            : theme.palette.grey[600],
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: isSelected ? theme.palette.primary.dark : "text.primary",
          fontWeight: isSelected ? "bold" : "normal",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

const WheelsStep = ({ formData, handleNext, handleBack }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      wheels: formData.wheels || null,
    },
  });

  const onSubmit = (data) => {
    handleNext(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ fontWeight: "600", color: "text.primary" }}
      >
        Number of wheels?
      </Typography>

      <FormControl
        component="fieldset"
        error={!!errors.wheels}
        sx={{ width: "100%" }}
      >
        <Controller
          name="wheels"
          control={control}
          rules={{ required: "Please select the number of wheels" }}
          render={({ field }) => (
            <RadioGroup
              {...field}
              aria-label="wheels"
              name="wheels"
              sx={{ width: "100%" }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%", mt: 2 }}
              >
                <FormControlLabel
                  value="2"
                  control={<Radio sx={{ display: "none" }} />}
                  label={
                    <CardLabel
                      value="2"
                      icon={TwoWheelerIcon}
                      text="Two"
                      selectedValue={field.value}
                    />
                  }
                  sx={{ m: 0, width: { xs: "100%", sm: "auto" } }}
                />
                <FormControlLabel
                  value="4"
                  control={<Radio sx={{ display: "none" }} />}
                  label={
                    <CardLabel
                      value="4"
                      icon={DirectionsCarIcon}
                      text="Four"
                      selectedValue={field.value}
                    />
                  }
                  sx={{ m: 0, width: { xs: "100%", sm: "auto" } }}
                />
              </Stack>
            </RadioGroup>
          )}
        />
        {errors.wheels && (
          <FormHelperText
            sx={{ textAlign: "center", mt: 1, color: "error.main" }}
          >
            {errors.wheels.message}
          </FormHelperText>
        )}
      </FormControl>

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

export default WheelsStep;
