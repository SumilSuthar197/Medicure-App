import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "./index";

export const getPatientDashboardData = async () => {
  const url = "/get_mobile_dashboard_data";
  const jwtToken = await AsyncStorage.getItem("userToken");

  return Promise.resolve({
    data: {
      patient: {
        address: "Cabin Cross Road",
        allowed_doctors: ["doctor_1", "doctor_2"],
        bloodGroup: "B+",
        city: "Mumbai",
        dob: "2003-07-18",
        ehr: [
          {
            date: "2023-12-20",
            name: "Dr. Sunil Yadev",
            url: "https://res.cloudinary.com/dp9kpxfpa/image/upload/v1703047890/tcdo82ua3vm5owjg6csc.png",
          },
          {
            date: "2023-12-11",
            name: "ABC Labs",
            url: "https://res.cloudinary.com/dp9kpxfpa/image/upload/v1703047890/tcdo82ua3vm5owjg6csc.png",
          },
        ],
        email: "sumil@gmail.com",
        emergencyContact: "9838905327",
        gender: "male",
        height: 172.0,
        imageUrl:
          "https://res.cloudinary.com/deohymauz/image/upload/v1721970714/tlxne5wfk75t0qpmnqlp.jpg",
        mobile: "1234567890",
        name: "Sumil Suthar",
        notifications: [
          {
            date: "17-12-2023 16:54",
            message: "You have an appointment scheduled for tomorrow at 10 AM.",
            title: "Appointment Reminder",
          },
          {
            date: "17-12-2023 16:54",
            message: "You have an appointment scheduled for tomorrow at 10 AM.",
            title: "Appointment Reminder",
          },
          {
            date: "18-12-2023 17:39",
            message: "You have an appointment scheduled for tomorrow at 10 AM.",
            title: "Appointment Reminder",
          },
        ],
        wallet: 100,
        weight: 72.0,
      },
      upcoming_appointments: [],
    },
  });
  return axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${JSON.parse(jwtToken)}`,
    },
  });
};

export const getTopDoctors = async () => {
  const url = "/gettopdoctors";
  const jwtToken = await AsyncStorage.getItem("userToken");
  return Promise.resolve({
    data: [
      {
        email: "aarav.sharma@gmail.com",
        experience: 12,
        field: "Cardiology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: "Dadar",
        name: "Dr. Aarav Sharma",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        email: "aditya.patel@gmail.com",
        experience: 12,
        field: "Pediatrics",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: "Borivali",
        name: "Dr. Aditya Patel",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        email: "divya.sharma@gmail.com",
        experience: 11,
        field: "Dermatology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: "Andheri",
        name: "Dr. Divya Sharma",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        email: "ananya.reddy@gmail.com",
        experience: 9,
        field: "Ophthalmology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: "Powai",
        name: "Dr. Ananya Reddy",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        email: "rohan.kapoor@gmail.com",
        experience: 9,
        field: "Neurology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: "Andheri",
        name: "Dr. Rohan Kapoor",
        rating_count: 2,
        rating_score: 4.5,
      },
    ],
  });
  return axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${JSON.parse(jwtToken)}`,
    },
  });
};

export const getNearByDoctors = async (latitude, longitude) => {
  const url = "/nearbydoc";
  const jwtToken = await AsyncStorage.getItem("userToken");

  return Promise.resolve({
    data: [
      {
        _id: "661e9b090e260b66c8d9fd5c",
        city: "Dadar",
        distance: 5769.4567584761,
        email: "aarav.sharma@gmail.com",
        experience: 12,
        field: "Cardiology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: {
          latitude: 19.3046981,
          longitude: 72.8546931,
        },
        name: "Dr. Aarav Sharma",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        _id: "661e9df80e260b66c8d9fd6b",
        city: "Borivali",
        distance: 5777.580433459154,
        email: "aditya.patel@gmail.com",
        experience: 12,
        field: "Pediatrics",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: {
          latitude: 19.2308,
          longitude: 72.8567,
        },
        name: "Dr. Aditya Patel",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        _id: "661e9e120e260b66c8d9fd6c",
        city: "Andheri",
        distance: 5788.774877680502,
        email: "divya.sharma@gmail.com",
        experience: 11,
        field: "Dermatology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: {
          latitude: 19.1073,
          longitude: 72.8378,
        },
        name: "Dr. Divya Sharma",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        _id: "661e9c860e260b66c8d9fd63",
        city: "Andheri",
        distance: 5791.075797025555,
        email: "sneha.gupta@gmail.com",
        experience: 9,
        field: "Dermatology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: {
          latitude: 19.1124,
          longitude: 72.8644,
        },
        name: "Dr. Sneha Gupta",
        rating_count: 0,
        rating_score: 0,
      },
      {
        _id: "657b4992be1008d61a3149b2",
        city: "Dadar",
        distance: 5793.141411082057,
        email: "sunil@gmail.com",
        experience: 10,
        field: "General Physician",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: {
          latitude: 19.0643835,
          longitude: 72.8356849,
        },
        name: "Dr. Sunil Yadav",
        rating_count: 1,
        rating_score: 4.0,
      },
      {
        _id: "661e9da50e260b66c8d9fd6a",
        city: "Bandra",
        distance: 5794.211445432264,
        email: "maya.deshmukh@gmail.com",
        experience: 9,
        field: "Dentistry",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: {
          latitude: 19.0596,
          longitude: 72.8409,
        },
        name: "Dr. Maya Deshmukh",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        _id: "661e9c2c0e260b66c8d9fd61",
        city: "Andheri",
        distance: 5794.693027299131,
        email: "neha.patel@gmail.com",
        experience: 8,
        field: "Gynecology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: {
          latitude: 19.1197,
          longitude: 72.9055,
        },
        name: "Dr. Neha Patel",
        rating_count: 0,
        rating_score: 0,
      },
      {
        _id: "661e9ca20e260b66c8d9fd64",
        city: "Andheri",
        distance: 5794.693027299131,
        email: "vikram.singh@gmail.com",
        experience: 11,
        field: "Orthopedic Surgery",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: {
          latitude: 19.1197,
          longitude: 72.9055,
        },
        name: "Dr. Vikram Singh",
        rating_count: 0,
        rating_score: 0,
      },
      {
        _id: "661e9d910e260b66c8d9fd69",
        city: "Andheri",
        distance: 5794.693027299131,
        email: "rohan.kapoor@gmail.com",
        experience: 9,
        field: "Neurology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: {
          latitude: 19.1197,
          longitude: 72.9055,
        },
        name: "Dr. Rohan Kapoor",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        _id: "661e9c580e260b66c8d9fd62",
        city: "Powai",
        distance: 5795.024783330665,
        email: "rajesh.kumar@gmail.com",
        experience: 7,
        field: "Pediatrics",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: {
          latitude: 19.1185,
          longitude: 72.9074,
        },
        name: "Dr. Rajesh Kumar",
        rating_count: 0,
        rating_score: 0,
      },
      {
        _id: "661e9d3d0e260b66c8d9fd66",
        city: "Powai",
        distance: 5795.024783330665,
        email: "ananya.reddy@gmail.com",
        experience: 9,
        field: "Ophthalmology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: {
          latitude: 19.1185,
          longitude: 72.9074,
        },
        name: "Dr. Ananya Reddy",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        _id: "661e9d460e260b66c8d9fd67",
        city: "Dadar",
        distance: 5798.577764697043,
        email: "arjun.mehta@gmail.com",
        experience: 11,
        field: "Otorhinolaryngology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: {
          latitude: 19.0205,
          longitude: 72.8426,
        },
        name: "Dr. Arjun Mehta",
        rating_count: 2,
        rating_score: 2.2,
      },
      {
        _id: "661e9d7e0e260b66c8d9fd68",
        city: "Worli",
        distance: 5798.952323990131,
        email: "kavita.singhania@gmail.com",
        experience: 8,
        field: "Oncology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: {
          latitude: 19.0281,
          longitude: 72.8537,
        },
        name: "Dr. Kavita Singhania",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        _id: "661e9ce20e260b66c8d9fd65",
        city: "Worli",
        distance: 5799.412496314589,
        email: "nisha.sharma@gmail.com",
        experience: 8,
        field: "Psychiatry",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: {
          latitude: 19.0257,
          longitude: 72.8556,
        },
        name: "Dr. Nisha Sharma",
        rating_count: 0,
        rating_score: 0,
      },
      {
        _id: "661e9bb20e260b66c8d9fd60",
        city: "Dadar",
        distance: 5800.335193601414,
        email: "priya.desai@gmail.com",
        experience: 9,
        field: "Cardiology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: {
          latitude: 19.017656,
          longitude: 72.856178,
        },
        name: "Dr. Priya Desai",
        rating_count: 5,
        rating_score: 4.2,
      },
    ],
  });

  return axiosInstance.post(
    url,
    {
      latitude,
      longitude,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(jwtToken)}`,
      },
    }
  );
};

export const sendUserQuery = async (prompt) => {
  const url = "/getchat";
  const jwtToken = await AsyncStorage.getItem("userToken");

  return Promise.resolve({
    data: {
      doctor: true,
      output: [
        {
          name: "Dr. John Doe",
          image:
            "https://res.cloudinary.com/deohymauz/image/upload/v1704545467/demoDoctor_hkhmdp.jpg",
          education: {
            field: "Neurology",
          },
          email: "johndoe@example.com",
          date: "2025-01-15",
          symptoms: "headaches",
          location: "Downtown Clinic",
          contact: "123-456-7890",
        },
        {
          name: "Dr. John Doe",
          image:
            "https://res.cloudinary.com/deohymauz/image/upload/v1704545467/demoDoctor_hkhmdp.jpg",
          education: {
            field: "Neurology",
          },
          email: "johndoe@example.com",
          date: "2025-01-15",
          symptoms: "headaches",
          location: "Downtown Clinic",
          contact: "123-456-7890",
        },
      ],
    },
  });

  return axiosInstance.post(
    url,
    { prompt },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(jwtToken)}`,
      },
    }
  );
};

export const bookAppointment = async ({
  doctor_email,
  date,
  symptoms,
  answers,
  time,
}) => {
  const url = "/ai_schedule";
  const jwtToken = await AsyncStorage.getItem("userToken");

  return Promise.resolve({});

  return axiosInstance.post(
    url,
    {
      doctor_email,
      date,
      symptoms,
      answers,
      time,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(jwtToken)}`,
      },
    }
  );
};

export const getAppointmentList = async (status) => {
  const url = `/appointmentslist/${status}`;
  const jwtToken = await AsyncStorage.getItem("userToken");
  const cancelAppointment = {
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
        prescription_id: "",
        slot: "4:20 pm",
        status: "cancelled",
      },
    ],
  };

  const completedAppointment = {
    appointments: [
      {
        _id: "661de67833bef8adec917a84",
        date: "2024-04-16",
        doctor_email: "sunil@gmail.com",
        doctor_name: "Sunil Yadav",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        pathology_id: "",
        patient_email: "sumil@gmail.com",
        prescription_id: "",
        slot: "4:00 pm",
        status: "completed",
      },
    ],
  };

  return Promise.resolve({
    data:
      status === "CANCELLED"
        ? cancelAppointment
        : status === "COMPLETED"
        ? completedAppointment
        : { appointments: [] },
  });
  return axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${JSON.parse(jwtToken)}`,
    },
  });
};

export const cancelAppointment = async (id) => {
  const url = `/cancelappointment/${id}`;
  const jwtToken = await AsyncStorage.getItem("userToken");

  return Promise.resolve({
    data: {
      output: true,
    },
  });

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

export const editProfile = async (data) => {
  const url = "/updatepatient";
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

export const getDoctorsList = async (category = "") => {
  const url = category === "" ? "/getdoctors" : `/get_doctors/${category}`;

  return Promise.resolve({
    data: [
      {
        email: "aarav.sharma@gmail.com",
        experience: 12,
        field: "Cardiology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: "Dadar",
        name: "Dr. Aarav Sharma",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        email: "aditya.patel@gmail.com",
        experience: 12,
        field: "Pediatrics",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: "Borivali",
        name: "Dr. Aditya Patel",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        email: "vikram.singh@gmail.com",
        experience: 11,
        field: "Orthopedic Surgery",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: "Andheri",
        name: "Dr. Vikram Singh",
        rating_count: 0,
        rating_score: 0,
      },
      {
        email: "arjun.mehta@gmail.com",
        experience: 11,
        field: "Otorhinolaryngology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: "Dadar",
        name: "Dr. Arjun Mehta",
        rating_count: 2,
        rating_score: 2.2,
      },
      {
        email: "divya.sharma@gmail.com",
        experience: 11,
        field: "Dermatology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: "Andheri",
        name: "Dr. Divya Sharma",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        email: "sunil@gmail.com",
        experience: 10,
        field: "General Physician",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: "Dadar",
        name: "Dr. Sunil Yadav",
        rating_count: 1,
        rating_score: 4.0,
      },
      {
        email: "priya.desai@gmail.com",
        experience: 9,
        field: "Cardiology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: "Dadar",
        name: "Dr. Priya Desai",
        rating_count: 5,
        rating_score: 4.2,
      },
      {
        email: "sneha.gupta@gmail.com",
        experience: 9,
        field: "Dermatology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: "Andheri",
        name: "Dr. Sneha Gupta",
        rating_count: 0,
        rating_score: 0,
      },
      {
        email: "ananya.reddy@gmail.com",
        experience: 9,
        field: "Ophthalmology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: "Powai",
        name: "Dr. Ananya Reddy",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        email: "rohan.kapoor@gmail.com",
        experience: 9,
        field: "Neurology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: "Andheri",
        name: "Dr. Rohan Kapoor",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        email: "maya.deshmukh@gmail.com",
        experience: 9,
        field: "Dentistry",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: "Bandra",
        name: "Dr. Maya Deshmukh",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        email: "neha.patel@gmail.com",
        experience: 8,
        field: "Gynecology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: "Andheri",
        name: "Dr. Neha Patel",
        rating_count: 0,
        rating_score: 0,
      },
      {
        email: "nisha.sharma@gmail.com",
        experience: 8,
        field: "Psychiatry",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: "Worli",
        name: "Dr. Nisha Sharma",
        rating_count: 0,
        rating_score: 0,
      },
      {
        email: "kavita.singhania@gmail.com",
        experience: 8,
        field: "Oncology",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1713279901/doctor3female_iwqbit.jpg",
        location: "Worli",
        name: "Dr. Kavita Singhania",
        rating_count: 2,
        rating_score: 4.5,
      },
      {
        email: "rajesh.kumar@gmail.com",
        experience: 7,
        field: "Pediatrics",
        image:
          "https://res.cloudinary.com/deohymauz/image/upload/v1702990518/download_1_c8z7gh.jpg",
        location: "Powai",
        name: "Dr. Rajesh Kumar",
        rating_count: 0,
        rating_score: 0,
      },
    ],
  });

  return axiosInstance.get(url);
};

export const getHospitalList = async () => {
  const url = "/allhospitals";

  return Promise.resolve({
    data: [
      {
        id: 1,
        name: "City Care Hospital",
        image: null,
        city: "Bangalore",
        mobile: "1234567890",
        email: "hello@citycare.com",
      },
      {
        id: 2,
        name: "Wellness Center",
        image: null,
        city: "Mysore",
        mobile: "9876543210",
        email: "hello@wellnesscenter.in",
      },
      {
        id: 3,
        name: "LifeLine Hospital",
        image: null,
        city: "Hubli",
        mobile: "1122334455",
        email: "lifeline@hospital.com",
      },
    ],
  });

  return axiosInstance.get(url);
};

export const submitSymptoms = async (hospital, symptoms) => {
  const url = "/getspeciality";
  const jwtToken = await AsyncStorage.getItem("userToken");
  return Promise.resolve({});
  return axiosInstance.post(
    url,
    {
      hospital,
      symptoms,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(jwtToken)}`,
      },
    }
  );
};

export const fetchPatientProfile = async (email) => {
  const url = `/patientprofiledoctor/${email}`;

  return Promise.resolve({
    data: {
      address: "Cabin Cross Road",
      allowed_doctors: ["doctor_1", "doctor_2"],
      bloodGroup: "B+",
      city: "Mumbai",
      dob: "2003-07-18",
      ehr: [
        {
          date: "2023-12-20",
          name: "Dr. Sunil Yadev",
          url: "https://res.cloudinary.com/dp9kpxfpa/image/upload/v1703047890/tcdo82ua3vm5owjg6csc.png",
        },
        {
          date: "2023-12-11",
          name: "ABC Labs",
          url: "https://res.cloudinary.com/dp9kpxfpa/image/upload/v1703047890/tcdo82ua3vm5owjg6csc.png",
        },
      ],
      email: "sumil@gmail.com",
      emergencyContact: "9838905327",
      gender: "male",
      height: 172.0,
      imageUrl:
        "https://res.cloudinary.com/deohymauz/image/upload/v1721970714/tlxne5wfk75t0qpmnqlp.jpg",
      mobile: "1234567890",
      name: "Sumil Suthar",
      notifications: [
        {
          date: "17-12-2023 16:54",
          message: "You have an appointment scheduled for tomorrow at 10 AM.",
          title: "Appointment Reminder",
        },
        {
          date: "17-12-2023 16:54",
          message: "You have an appointment scheduled for tomorrow at 10 AM.",
          title: "Appointment Reminder",
        },
        {
          date: "18-12-2023 17:39",
          message: "You have an appointment scheduled for tomorrow at 10 AM.",
          title: "Appointment Reminder",
        },
      ],
      wallet: 100,
      weight: 72.0,
    },
  });

  return axiosInstance.get(url);
};
