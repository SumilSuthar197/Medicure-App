import { Stack } from "expo-router";
import { backgroundColor, blueColor, whiteText } from "../../constants/color";
import { PatientProfileProvider } from "../../context/PatientProfileProvider";

const PatientLayout = () => {
  return (
    <PatientProfileProvider>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Home" options={{ headerShown: false }} />
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
    </PatientProfileProvider>
  );
};

export default PatientLayout;
