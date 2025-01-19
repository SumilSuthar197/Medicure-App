import { Stack } from "expo-router";
import { blueColor, whiteText } from "../../constants/color";
import { DoctorProfileProvider } from "../../context/DoctorProfileProvider";

const PatientLayout = () => {
  return (
    <DoctorProfileProvider>
      <Stack initialRouteName="index">
        <Stack.Screen name="Home" options={{ headerShown: false }} />
        <Stack.Screen
          name="index"
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
          name="profile"
          options={{
            headerTitle: "Edit Profile",
          }}
        />
        <Stack.Screen
          name="emergency"
          options={{
            headerTitle: "Emergency",
          }}
        />
      </Stack>
    </DoctorProfileProvider>
  );
};

export default PatientLayout;
