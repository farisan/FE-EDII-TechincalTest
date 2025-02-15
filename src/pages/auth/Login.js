import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN, PROFILE } from "../../utils/axios";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setMessage(null);
      const response = await LOGIN(values);
      localStorage.setItem("token", response.data.data.data);
      localStorage.setItem("role", response.data.data.role);
      setMessage('Login Berhasil');
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response.data?.data?.[0]?.message || error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" }}>
      <Card style={{ width: 400, borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Login</h2>
        <Form name="login_form" onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Masukkan email Anda!" },
              { type: "email", message: "Email tidak valid!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Masukkan password Anda!" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          {message && (
            <Form.Item style={{ textAlign: "center", color: `${message === "Login Berhasil" ? "green" : "red"}` }}>
              <span>{message}</span>
            </Form.Item>
          )}
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <span>
              Belum terdaftar? <Link to="/register">Daftar di sini</Link>
            </span>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
