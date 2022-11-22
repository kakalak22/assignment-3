import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  SnippetsFilled,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import HangBanTraLai from "../hang-ban-tra-lai/HangBanTraLai";
import "./AdminLayout.css";
const { Header, Content, Footer, Sider } = Layout;
const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        theme="dark"
        collapsed={true}
        style={{
          backgroundColor: "#871400",
        }}
        className="collapsed-sider"
      >
        <div className="logo" />
        <Menu
          style={{ backgroundColor: "#871400", padding: "15px" }}
          defaultSelectedKeys={["1"]}
          mode="inline"
        >
          <Menu.Item
            key="1"
            onClick={() => setIsOpen((state) => !state)}
            icon={<SnippetsFilled style={{ fontSize: "20px" }} />}
          ></Menu.Item>
        </Menu>
      </Sider>
      <Sider
        className="sider"
        width={isOpen ? 160 : 0}
        style={{
          backgroundColor: "#d4380d",
        }}
      >
        <Menu
          style={{ backgroundColor: "#d4380d", padding: "15px" }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
        >
          <Menu.Item key="1">Bán hàng</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <Menu mode="horizontal">
            <Menu.Item>Hàng bán trả lại</Menu.Item>
            <Menu.Item>Hàng bán trả lại</Menu.Item>
            <Menu.Item>Hàng bán trả lại</Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Phát sinh</Breadcrumb.Item>
            <Breadcrumb.Item>Bán Hàng</Breadcrumb.Item>
            <Breadcrumb.Item>Hàng bán trả lại</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <HangBanTraLai />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
