import { Layout, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import NavBar from "./navbar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../service/user";
import { UserContext } from "../lib/context";
import useMessage from "antd/es/message/useMessage";

export function BasicLayout({ children }) {
    return (
        <Layout className="basic-layout">
            <Header className="header"><NavBar user={null} /></Header>
            <Content>
                {children}
            </Content>
            <Footer className="footer">
                <Space direction="vertical">
                    <Link target="_blank" to="https://github.com/Okabe-Rintarou-0">关于作者</Link>
                    <div>电子书城 REINS 2024</div>
                </Space>
            </Footer>
        </Layout>
    )
}

export function PrivateLayout({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = useMessage();

    useEffect(() => {
        const checkLogin = async () => {
            let me = await getMe();
            if (!me) {
                messageApi.error("无权访问当前页面，请先登录！", 0.6)
                    .then(() => navigate("/login"));
            } else {
                setUser(me);
            }
        }
        checkLogin();
    }, [navigate]);

    return (
        <Layout className="basic-layout">
            {contextHolder}
            <Header className="header"><NavBar user={user} /></Header>
            <Content>
                <UserContext.Provider value={{ user, setUser }}>{user && children}</UserContext.Provider>
            </Content>
            <Footer className="footer">
                <Space direction="vertical">
                    <Link target="_blank" to="https://github.com/Okabe-Rintarou-0">关于作者</Link>
                    <div>电子书城 REINS 2024</div>
                </Space>
            </Footer>
        </Layout>
    )
}