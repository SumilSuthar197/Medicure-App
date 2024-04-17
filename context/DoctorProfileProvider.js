import React, { createContext, useState, useContext } from "react";

export const DoctorProfileContext = createContext();

export const DoctorProfileProvider = ({ children }) => {
  const [doctorProfile, setDoctorProfile] = useState({});

  return (
    <DoctorProfileContext.Provider value={{ doctorProfile, setDoctorProfile }}>
      {children}
    </DoctorProfileContext.Provider>
  );
};

export const useDoctorProfile = () => {
  const context = useContext(DoctorProfileContext);
  if (context === undefined) {
    throw new Error(
      "useDoctorProfile must be used within a DoctorProfileProvider"
    );
  }
  return context;
};
