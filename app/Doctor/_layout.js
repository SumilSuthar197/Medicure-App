import { Stack } from "expo-router";
import { blueColor, whiteText } from "../../constants/color";

const PatientLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="D" options={{ headerShown: false }} /> */}
      <Stack.Screen name="Doctormenu" options={{ headerShown: false }} />
      {/* <Stack.Screen name="Profile" /> */}
      <Stack.Screen
        name="DoctorLeave"
        options={{ headerTitle: "Apply for Leave" }}
      />
      <Stack.Screen
        name="patientProfile"
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
      {/*<Stack.Screen
        name="DoctorSearch"
        options={{ headerTitle: "Search a Doctor" }}
      />
      <Stack.Screen
        name="bookAppointment"
        options={{ headerTitle: "Book Appointment" }}
      /> */}
    </Stack>
  );
};

export default PatientLayout;
