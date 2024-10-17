// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const ProtectedRoute = () => {
//     const navigate = useNavigate();
//     const isAuthenticated : any = localStorage?.getItem("is_login") ?? false;
    
//     useEffect(() => {
//         if (!isAuthenticated) {
//             navigate("/");
//         }
//     }, [])

//     return (
//         <h1>Admin</h1>
//     );
// };

import React from 'react';
import { Navigate } from 'react-router-dom';

// Fungsi untuk memeriksa apakah token akses ada di localStorage
const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  return !!token; // Mengembalikan true jika ada token, false jika tidak ada
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Komponen ProtectedRoute untuk melindungi rute yang memerlukan autentikasi
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    // Jika pengguna belum terautentikasi, arahkan ke halaman login
    return <Navigate to="/login" />;
  }

  // Jika pengguna sudah terautentikasi, render konten yang dibungkus oleh ProtectedRoute
  return <>{children}</>;
};
