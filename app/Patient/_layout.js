import { Stack } from "expo-router";

const PatientLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Signup" options={{ headerShown: false }} />
      <Stack.Screen name="menu" options={{ headerShown: false }} />
      <Stack.Screen name="Profile" />
      <Stack.Screen
        name="doctorDetails"
        options={{ headerTitle: "Doctor Preview" }}
      />
      <Stack.Screen
        name="DoctorSearch"
        options={{ headerTitle: "Search a Doctor" }}
      />
      <Stack.Screen
        name="bookAppointment"
        options={{ headerTitle: "Book Appointment" }}
      />
    </Stack>
  );
};

export default PatientLayout;
