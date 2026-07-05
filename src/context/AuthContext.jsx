import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Institute email domains — students from these are "institute" type
const INSTITUTE_DOMAINS = ["kgisliim.ac.in", "edu.in", "ac.in"];

// Mock user database
const MOCK_USERS = {
  "25mca27@kgisliim.ac.in": { password: "Student@123", name: "Arun Kumar", role: "institute", institution: "KGiSL Institute of Information Management", avatar: "AK" },
  "georgedavid07@gmail.com": { password: "Student@123", name: "George David", role: "direct", institution: null, avatar: "GD" },
};

function detectUserType(email) {
  const domain = email.split("@")[1] || "";
  return INSTITUTE_DOMAINS.some((d) => domain.endsWith(d)) ? "institute" : "direct";
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("lms_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const found = MOCK_USERS[email.toLowerCase()];
    if (!found) return { success: false, error: "No account found with this email." };
    if (found.password !== password) return { success: false, error: "Incorrect password. Please try again." };

    const userObj = {
      email: email.toLowerCase(),
      name: found.name,
      role: found.role, // "institute" | "direct"
      institution: found.institution,
      avatar: found.avatar,
    };
    setUser(userObj);
    sessionStorage.setItem("lms_user", JSON.stringify(userObj));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("lms_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
