import React, { createContext, useState, useContext } from "react";

export const PatientProfileContext = createContext();

export const PatientProfileProvider = ({ children }) => {
  const [patientProfile, setPatientProfile] = useState({});

  return (
    <PatientProfileContext.Provider
      value={{ patientProfile, setPatientProfile }}
    >
      {children}
    </PatientProfileContext.Provider>
  );
};

export const usePatientProfile = () => {
  const context = useContext(PatientProfileContext);
  if (context === undefined) {
    throw new Error(
      "usePatientProfile must be used within a PatientProfileProvider"
    );
  }
  return context;
};
