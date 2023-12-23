import { Stack } from "expo-router";
import { blueColor, whiteText } from "../../constants/color";

const PatientLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Doctormenu" options={{ headerShown: false }} />
      <Stack.Screen
        name="DoctorLeave"
        options={{ headerTitle: "Apply for Leave" }}
      />
      <Stack.Screen
        name="showProfile"
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
        name="EditProfileDoc"
        options={{
          headerTitle: "Edit Profile",
        }}
      />
      <Stack.Screen
        name="Emergency"
        options={{
          headerTitle: "Emergency",
        }}
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
        }}
      />
    </Stack>
  );
};

export default PatientLayout;
