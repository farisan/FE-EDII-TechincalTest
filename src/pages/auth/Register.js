import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER } from "../../utils/axios";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null)
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setMessage(null)
      const response = await REGISTER(values);
      setMessage(response.data.message);
      navigate("/");
    } catch (error) {
      setMessage(error.response.data?.data?.[0]?.message || error.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" }}>
      <Card style={{ width: 400, borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Register</h2>
        <Form name="register_form" onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Masukkan email Anda!" },
              { type: "email", message: "Email tidak valid!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Masukkan password Anda!" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          {message && <Form.Item style={{ textAlign: "center", color: 'red' }}>
            <span>
              {message}
            </span>
          </Form.Item>}
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" style={{ width: "100%" }}>
              Register
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <span>
              Sudah memiliki akun? <Link to="/">Login</Link>
            </span>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
