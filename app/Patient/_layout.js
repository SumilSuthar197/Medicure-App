import { Stack } from "expo-router";
import { backgroundColor, blueColor, whiteText } from "../../constants/color";

const PatientLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Signup" options={{ headerShown: false }} />
      <Stack.Screen name="menu" options={{ headerShown: false }} />
      <Stack.Screen name="Profile" />
      <Stack.Screen
        name="doctorDetails"
        options={{
          headerTitle: "Doctor's Profile",
          headerStyle: {
            backgroundColor: blueColor,
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: whiteText,
            fontWeight: "600",
            fontSize: 18,
          },
          headerTintColor: whiteText,
          headerTitleAlign: "center",
          // statusBarStyle: "light-content",
        }}
      />
      <Stack.Screen
        name="patientPublicProfile"
        options={{
          headerTitle: "Patient's Profile",
          headerStyle: {
            backgroundColor: blueColor,
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: whiteText,
            fontWeight: "600",
            fontSize: 18,
          },
          headerTintColor: whiteText,
          headerTitleAlign: "center",
          // statusBarStyle: "light-content",
        }}
      />
      <Stack.Screen
        name="DoctorSearch"
        options={{
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerShadowVisible: false,
          headerTitle: "Search a Doctor",
        }}
      />
      <Stack.Screen
        name="HospitalSearch"
        options={{
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerShadowVisible: false,
          headerTitle: "Search a Hospital",
        }}
      />
      <Stack.Screen
        name="bookAppointment"
        options={{ headerTitle: "Book Appointment" }}
      />
    </Stack>
  );
};

export default PatientLayout;
