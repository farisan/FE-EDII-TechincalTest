// import { useEffect, useState } from "react";
// import { Outlet, Navigate } from "react-router-dom";

// export function PrivateRoute() {
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setToken(localStorage.getItem("token"));
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return token ? <Outlet /> : <Navigate to="/" replace />;
// }

import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export function PrivateRoute() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Fungsi untuk memeriksa apakah token sudah expired
  const isTokenExpired = (token) => {
    if (!token) return true; // Jika token tidak ada, anggap expired

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      const exp = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= exp; // Bandingkan dengan waktu sekarang
    } catch (error) {
      return true; // Jika terjadi error, anggap token tidak valid (expired)
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");

      if (!newToken || isTokenExpired(newToken)) {
        localStorage.removeItem("token"); // Hapus token jika expired
        setToken(null);
      } else {
        setToken(newToken);
      }
    };

    handleStorageChange(); // Periksa token saat pertama kali komponen dimuat
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return token ? <Outlet /> : <Navigate to="/" replace />;
}
