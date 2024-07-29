import { Avatar, Card, Divider, Space } from "antd";
import { AVATAR_FILES_PREFIX, getOtherUser } from "../service/user";
import { useEffect, useState } from "react";

export default function OtherUserProfile({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getOtherUser(userId).then(setUser);
    }, [userId]);

    return <Card style={{ width: "50%", margin: "20px auto 0" }}>
        <Space direction="vertical" style={{ textAlign: "center", width: "100%" }} size={2}>
            <Avatar
                src={user?.avatar ? (AVATAR_FILES_PREFIX + user.avatar) : "/default_avatar.jpeg"}
                style={{ width: "100px", height: "100px" }}
            />
            <span style={{ fontSize: 20 }}>{user?.nickname}</span>
            <span style={{ fontSize: 14, color: "grey" }}>{user?.introduction ? user.introduction : "这个人很懒，什么也没留下"}</span>
        </Space>
        <Divider />
        <Space direction="vertical">
            <span style={{ fontSize: 16, color: "#222222" }}>用户名：{user?.username}</span>
        </Space>
    </Card >
}