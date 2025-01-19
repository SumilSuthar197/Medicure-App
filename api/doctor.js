import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from ".";
import { data } from "../constants/data";

export const getUpcomingAppointments = async (date) => {
  const url = `/doctorappointments/${date}`;
  const jwtToken = await AsyncStorage.getItem("userToken");

  return Promise.resolve({
    data: {
      appointments: [
        {
          _id: "661de20833bef8adec917a83",
          date: "2024-04-18",
          doctor_email: "sunil@gmail.com",
          doctor_name: "Sunil Yadav",
          image:
            "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
          pathology_id: "",
          patient_email: "sumil@gmail.com",
          patient_image:
            "https://res.cloudinary.com/deohymauz/image/upload/v1721970714/tlxne5wfk75t0qpmnqlp.jpg",
          patient_name: "Sumil Suthar",
          prescription_id: "",
          slot: "4:20 pm",
          status: "upcoming",
        },
      ],
    },
  });
  return axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${JSON.parse(jwtToken)}`,
    },
  });
};

export const submitAppointmentReview = async (
  patient_email,
  appointment_id,
  advisory_text,
  prescription_text
) => {
  const url = "/submit_review";
  const jwtToken = await AsyncStorage.getItem("userToken");

  return Promise.resolve({});

  return axiosInstance.post(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(jwtToken)}`,
      },
    }
  );
};

export const submitLeaveRequest = async (data) => {
  const url = "/applyleave";
  const jwtToken = await AsyncStorage.getItem("userToken");

  return Promise.resolve({
    data: {
      output: true,
    },
  });

  return axiosInstance.post(url, data, {
    headers: {
      Authorization: `Bearer ${JSON.parse(jwtToken)}`,
    },
  });
};

export const getDoctorProfile = async (doctor_email) => {
  const url = `/get_doctor_profile/${doctor_email}`;
  const jwtToken = await AsyncStorage.getItem("userToken");

  return Promise.resolve({
    data: {
      bio: "Experienced doctor with a passion for patient care.",
      education: {
        degree: "B.A.M.S",
        field: "General Physician",
        graduation_year: 2013,
      },
      email: "sunil@gmail.com",
      experience: 10,
      gender: "Male",
      hospital: [
        {
          location: "Dadar",
          name: "Shushrusha Hospital",
        },
        {
          location: "Lower Parel",
          name: "K.E.M Hospital",
        },
        {
          location: "Mumbai Central",
          name: "JJ Hospital",
        },
      ],
      image:
        "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
      location: {
        latitude: 12.9249868,
        longitude: 77.6671305,
      },
      mobile: 9867543201,
      name: "Dr. Sunil Yadav",
      patient_duration: 15,
      questions: [
        "What brings you to the general physician today?",
        "Can you describe any specific symptoms or discomfort you are currently experiencing?",
        "Do you have any chronic medical conditions or known health issues?",
        "Are you currently taking any medications, including over-the-counter and supplements?",
      ],
      rating_count: 1,
      rating_score: 4.0,
      ratings: [
        {
          appointment_id: "doc_2_rat_1",
          description: "good doc",
          image: "",
          patient: "Sarthak Tanpure",
          rating: 4,
        },
      ],
      rfid: "23 A2 1E A6",
      schedule: [
        "JJ Hospital",
        "Shushrusha Hospital",
        "K.E.M Hospital",
        "JJ Hospital",
        "Shushrusha Hospital",
        "K.E.M Hospital",
        "JJ Hospital",
      ],
    },
  });

  return axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${JSON.parse(jwtToken)}`,
    },
  });
};

export const submitEmergencyRequest = async (minutes) => {
  const url = "/doctor_emergency";
  const jwtToken = await AsyncStorage.getItem("userToken");
  const email = await AsyncStorage.getItem("doctorEmail");
  const data = {
    email: JSON.parse(email),
    minutes: minutes,
  };

  return Promise.resolve({
    data: {
      message: "Emergency request submitted successfully",
    },
  });

  return axiosInstance.post(url, data, {
    headers: {
      Authorization: `Bearer ${JSON.parse(jwtToken)}`,
    },
  });
};

export const updateDoctorProfile = async (doctorProfile) => {
  const url = "/updatedoctor";
  const jwtToken = await AsyncStorage.getItem("userToken");

  return Promise.resolve({
    data: {
      msg: "Profile updated successfully",
    },
  });

  return axiosInstance.put(url, doctorProfile, {
    headers: {
      Authorization: `Bearer ${JSON.parse(jwtToken)}`,
    },
  });
};
