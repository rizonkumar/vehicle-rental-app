import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
      sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}
    >
      <Typography
        variant="h6"
        className="text-center font-semibold text-gray-800 dark:text-gray-200"
      >
        First, what's your name?
      </Typography>

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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle
                    color={errors.firstName ? "error" : "primary"}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 100px #ffffff inset",
                  WebkitTextFillColor: "inherit",
                },
                "& input:-webkit-autofill:focus": {
                  WebkitBoxShadow: "0 0 0 100px #ffffff inset",
                  WebkitTextFillColor: "inherit",
                },
              },
            }}
          />
        )}
      />

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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle
                    color={errors.lastName ? "error" : "primary"}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 100px #ffffff inset",
                  WebkitTextFillColor: "inherit",
                },
                "& input:-webkit-autofill:focus": {
                  WebkitBoxShadow: "0 0 0 100px #ffffff inset",
                  WebkitTextFillColor: "inherit",
                },
              },
            }}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        endIcon={<ArrowForwardIcon />}
        className="mt-4 self-end transition ease-in-out duration-150 hover:scale-105"
      >
        Next
      </Button>
    </Box>
  );
};

export default NameStep;
