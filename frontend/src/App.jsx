import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BookingForm from "./components/BookingForm/BookingForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarRentalIcon from "@mui/icons-material/CarRental";

function App() {
  return (
    <Container maxWidth="md">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Box
        sx={{
          mt: { xs: 4, sm: 8 },
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          boxShadow:
            "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CarRentalIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />

        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "700",
            color: "text.primary",
            textAlign: "center",
            mb: 4,
          }}
        >
          Vehicle Rental Booking
        </Typography>
        <BookingForm />
      </Box>
    </Container>
  );
}

export default App;
