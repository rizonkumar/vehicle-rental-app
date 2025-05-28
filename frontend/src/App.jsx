import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BookingForm from "./components/BookingForm/BookingForm";

function App() {
  return (
    <Container maxWidth="sm">
      {" "}
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Vehicle Rental Booking
        </Typography>
        <BookingForm />
      </Box>
    </Container>
  );
}

export default App;
