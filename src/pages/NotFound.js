// pages/NotFound.tsx
import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    const token = localStorage.getItem("token");

    if(!token) return navigate("/");
    navigate("/dashboard"); // Arahkan ke halaman login atau halaman utama

  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={goHome}>
            Ingin Kembali ? klik disini
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
