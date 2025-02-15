import { Layout, Menu, theme, Breadcrumb, Button } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function MainLayout() {
  const { Header, Content, Footer } = Layout;
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil role user dari localStorage (atau dari Context API jika ada)
  const userRole = localStorage.getItem("role") || "karyawan"; // Default ke "karyawan"

  // Daftar menu dengan role
  const items = [
    { key: "Dashboard", label: "Dashboard", path: "/dashboard", roles: ["admin", "karyawan"] },
    { key: "Biodata", label: "Biodata", path: "/biodata", roles: ["karyawan"] },
    { key: "Data-User", label: "Management User", path: "/management-user", roles: ["admin"] },
  ];

  // Filter menu berdasarkan role
  const filteredItems = items.filter((item) => item.roles.includes(userRole));

  // State untuk menyimpan selectedKey
  
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  useEffect(() => {
    const matchingItem = filteredItems.find((item) => location.pathname.startsWith(item.path));
    setSelectedKey(matchingItem ? matchingItem.key : "");
  }, [location.pathname, filteredItems]);

  const handleMenuClick = (e) => {
    const selectedItem = filteredItems.find((item) => item.key === e.key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbItems = [
    { path: "/", breadcrumbName: "Home" },
    ...pathSnippets.map((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      return { path: url, breadcrumbName: snippet.replace("-", " ") };
    }),
  ];

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate("/")
  }

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="" style={{ minHeight: "100%" }}>
      <div style={{ height: "20%" }}>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={filteredItems}
            onClick={handleMenuClick}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
          <Button type="primary" danger={true} onClick={handleLogout}>
            Keluar
          </Button>
        </Header>
      </div>
      <div style={{ height: "70%" }}>
        <Content style={{ padding: "0 48px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {breadcrumbItems.map((item, index) => (
              <Breadcrumb.Item key={index}>{item.breadcrumbName}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: '70vh', background: "#eaeaea", borderRadius: borderRadiusLG }}>
            <Outlet />
          </div>
        </Content>
      </div>
      <div style={{ height: "10%" }}>
        <Footer style={{ textAlign: "center" }}>Test EDII ©{new Date().getFullYear()} Created by Muhammad Farisan H</Footer>
      </div>
    </Layout>
  );
}

export default MainLayout;
