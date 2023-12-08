// import { StyleSheet, Text, View } from "react-native";

// export default function Page() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.main}>
//         <Text style={styles.title}>Hello World</Text>
//         <Text style={styles.subtitle}>This is the first page of your app.</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 24,
//   },
//   main: {
//     flex: 1,
//     justifyContent: "center",
//     maxWidth: 960,
//     marginHorizontal: "auto",
//   },
//   title: {
//     fontSize: 64,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 36,
//     color: "#38434D",
//   },
// });
import React, { useEffect } from "react";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

const HomePage = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the next page after 2 seconds
      // router.push("/onboarding");
      router.push("/Patient");
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={styles.logoimage}
          source={require("../assets/images/logo-light.png")}
        />
        <Text style={styles.logotext}>MediCure</Text>
      </View>
      <Text style={{}}>Logo Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#246BFD",
    alignItems: "center",
    justifyContent: "space-evenly",
    fontSize: "20px",
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  logoimage: {
    width: 50,
    objectFit: "contain",
  },
  logotext: {
    color: "#FFF",
    fontFamily: "Poppins-Regular",
    fontSize: 34,
    paddingLeft: 10,
  },
});

export default HomePage;
