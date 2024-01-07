import { Col, Menu, Row, Dropdown, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LogoutOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { logout } from "../service/logout";
import useMessage from "antd/es/message/useMessage";
export default function NavBar({ user }) {
    const navigate = useNavigate();
    const location = useLocation();
    const parts = location.pathname.split('/');
    const selectedKey = '/' + parts[parts.length - 1];
    const navItems = [
        { label: "首页", value: "/" },
        { label: "购物车", value: "/cart" }
    ];
    const navMenuItems = navItems.map(item => ({
        key: item.value,
        label: <Link to={item.value}>{item.label}</Link>
    }));
    const [messageApi, contextHolder] = useMessage();

    const handleMenuClick = async (e) => {
        if (e.key === "/logout") {
            let succeed = await logout();
            if (succeed) {
                await messageApi.success("登出成功！", 0.4);
                navigate("/login");
            } else {
                await messageApi.error("登出失败！请稍后再试！", 0.4);
            }
            return;
        }
        navigate(e.key);
    };

    const dropMenuItems = [
        {
            key: "account",
            label: user?.nickname,
            icon: <UserOutlined />,
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
        </Row>
    );
}