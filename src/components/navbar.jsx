import { Col, Menu, Row, Dropdown, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LogoutOutlined,
    UserOutlined,
    AccountBookOutlined,
    FormOutlined
} from '@ant-design/icons';
import { logout } from "../service/logout";
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import { useState } from "react";
import ChangePasswordModal from "./change_password_modal";
export default function NavBar({ user }) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const parts = location.pathname.split('/');
    const selectedKey = '/' + parts[parts.length - 1];
    const navItems = [
        { label: "首页", value: "/" },
        { label: "个人主页", value: "/profile" },
        { label: "购物车", value: "/cart" },
        { label: "订单", value: "/order" },
        { label: "排行", value: "/rank" },
        { label: "后端 API 文档", value: "/api-docs" }
    ];
    const navMenuItems = navItems.map(item => ({
        key: item.value,
        label: <Link to={item.value}>{item.label}</Link>
    }));
    const [messageApi, contextHolder] = useMessage();

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleMenuClick = async (e) => {
        if (e.key === "/logout") {
            let res = await logout();
            handleBaseApiResponse(res, messageApi, () => navigate("/login"));
            return;
        }
        if (e.key === "password") {
            handleOpenModal();
            return;
        }
        if (e.key.startsWith("/")) {
            navigate(e.key);
        }
    };

    const dropMenuItems = [
        {
            key: "nickname",
            label: user?.nickname,
            icon: <UserOutlined />,
        },
        {
            key: "password",
            label: "修改密码",
            icon: <FormOutlined />,
        },
        {
            key: "balance",
            label: `余额：${user?.balance / 100}元`,
            icon: <AccountBookOutlined />,
        },
        { key: "/logout", label: "登出", icon: <LogoutOutlined />, danger: true },
    ];

    return (
        <Row className="navbar" justify="start">
            {contextHolder}
            <Col>
                <Link to="/">Book Store</Link>
            </Col>
            <Col flex="auto">
                <Menu mode="horizontal"
                    defaultSelectedKeys={[selectedKey]}
                    items={navMenuItems}
                    selectedKeys={[selectedKey]}
                />
            </Col>
            {user && <Col>
                <Dropdown menu={{ onClick: handleMenuClick, items: dropMenuItems }}>
                    <Button shape="circle" icon={<UserOutlined />} />
                </Dropdown>
            </Col>}
            {user && showModal && <ChangePasswordModal onOk={handleCloseModal} onCancel={handleCloseModal} />}
        </Row>
    );
}