import React,{ Component } from 'react';
import './index.css';
import { Breadcrumb, Layout, Menu } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import Image from "./Image";
import HomePage  from './HomePage';
const { Header, Content, Footer, Sider } = Layout;


class RouterApp extends Component{

  render() {
  
    return (
      <Router>
        <Layout>
          <Header className='header' style={{ display: 'flex', alignItems: 'center' }}>
            <div className="app-logo" />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Components</Breadcrumb.Item>
            </Breadcrumb>
            <Layout style={{ padding: '24px 0'}}>
              <Sider  width={200} >
                <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }} inlineCollapsed="false">
                  <Menu.Item key="1" ><span> Home </span><Link to="/"></Link></Menu.Item>
                  <Menu.SubMenu key="submenu" title={<span>Image </span>}> 
                    <Menu.Item key="3"><span>dev</span><Link to="/image" /></Menu.Item>
                  </Menu.SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: "85vh",background: "#fff",}}>
              <Routes>
                <Route path ="/" element={<HomePage />}/>
                <Route path ="/image" element={<Image />}/>
              </Routes>
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Router>
    );
  };
}

export default RouterApp;