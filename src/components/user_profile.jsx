import { Avatar, Badge, Button, Card, Divider, Empty, Input, List, Space, Upload } from "antd";
import { UserContext } from "../lib/context";
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from "react";
import { AVATAR_UPLOAD_URL, AVATAR_FILES_PREFIX, changeIntroduction, getMe, getMyAddresses, deleteMyAddress } from "../service/user";
import { handleBaseApiResponse } from "../utils/message";
import UsernameAvatar from "../components/username_avatar"
import useMessage from "antd/es/message/useMessage";
import ImgCrop from 'antd-img-crop'
import SaveAddressModal from "./save_address_modal";

export default function UserProfile() {
    const { user, setUser } = useContext(UserContext);
    const [imageUrl, _] = useState();
    const [editAvatar, setEditAvatar] = useState(false);
    const [introduction, setIntroduction] = useState("");
    const [editIntroduction, setEditIntroduction] = useState(false);
    const [messageApi, contextHolder] = useMessage();
    const [addresses, setAddresses] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getMyAddresses().then(setAddresses);
    }, []);

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            messageApi.error('系统只支持 jpeg 或 png 格式的图片！');
            return false;
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            messageApi.error('图片大小不能超过 10M');
            return false;
        }
        return true;
    };

    const handleEditIntroduction = (initialValue) => {
        if (editIntroduction) {
            return;
        }
        setIntroduction(initialValue ?? "");
        setEditIntroduction(true);
    }

    const handleSaveIntroduction = async () => {
        setEditIntroduction(false);
        let response = await changeIntroduction({ introduction });
        handleBaseApiResponse(response, messageApi, () => {
            setUser({ ...user, introduction });
        });
    }

    const handleDeleteAddress = async (addressId) => {
        let response = await deleteMyAddress(addressId);
        handleBaseApiResponse(response, messageApi, () => {
            getMyAddresses().then(setAddresses);
        });
    }

    const handleChange = (info) => {
        if (info.file.status === 'done') {
            setEditAvatar(false);
            getMe().then(setUser);
        }
    };

    const handleEditAvatar = () => {
        setEditAvatar(true);
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div>上传</div>
        </button>
    );

    return <Card style={{ width: "50%", margin: "20px auto 0" }}>
        {contextHolder}
        {showModal && <SaveAddressModal onOk={() => {
            setShowModal(false);
            getMyAddresses().then(setAddresses);
        }} onCancel={() => setShowModal(false)} />}
        <Space direction="vertical" style={{ textAlign: "center", width: "100%" }} size={2}>
            {!editAvatar && <div style={{ textAlign: 'center' }}>
                <Badge
                    count={
                        <Button
                            shape="circle"
                            icon={<EditOutlined />}
                            size="small"
                            onClick={handleEditAvatar}
                            style={{
                                border: 'none',
                                boxShadow: 'none',
                                backgroundColor: 'transparent'
                            }}
                        />
                    }
                    offset={[-5, 85]} // Adjust the position of the button
                >
                    <Avatar
                        src={user?.avatar ? AVATAR_FILES_PREFIX + user.avatar : "/default_avatar.jpeg"}
                        style={{ width: "100px", height: "100px" }}
                    />
                </Badge>
            </div>}
            {editAvatar && <ImgCrop showGrid showReset rotationSlider modalOk="确定" modalCancel="取消" >
                <Upload
                    name="file"
                    accept="image/*"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    withCredentials={true}
                    action={AVATAR_UPLOAD_URL}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100px", height: "100px" }} /> : uploadButton}
                </Upload>
            </ImgCrop>}
            <span style={{ fontSize: 20 }}>{user?.nickname}</span>
            <Space style={{ color: "grey" }}>
                {!editIntroduction && <>
                    <span style={{ fontSize: 14 }}>{user?.introduction ? user.introduction : "这个人很懒，什么也没留下"}</span>
                    <a onClick={() => handleEditIntroduction(user?.introduction)}><EditOutlined /></a>
                </>}
                {editIntroduction && <Input value={introduction} style={{ height: "25px", width: "600px" }}
                    onPressEnter={handleSaveIntroduction}
                    onChange={e => setIntroduction(e.target.value)} />}
            </Space>
        </Space>
        <Divider />
        <Space direction="vertical" style={{ width: "100%" }}>
            <Card title="基础信息">
                <Space direction="vertical" style={{ width: "100%" }}>
                    <span style={{ fontSize: 16, color: "#222222" }}>用户名：{user?.username}</span>
                    <span style={{ fontSize: 16, color: "#222222" }}>余额：{user?.balance / 100} 元</span>
                </Space>
            </Card>
            <Card title="常用地址" extra={<Button type="primary" onClick={() => setShowModal(true)}>添加</Button>}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    {addresses.length === 0 && <Empty description="无" />}
                    {addresses.length > 0 && <List
                        dataSource={addresses}
                        renderItem={address => (
                            <List.Item
                                actions={[
                                    <a onClick={() => handleDeleteAddress(address.id)}>删除</a>,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<UsernameAvatar username={address.receiver} />}
                                    title={`${address.receiver} ${address.tel}`}
                                    description={address.address}
                                />
                            </List.Item>
                        )}
                    />}
                </Space>
            </Card>
        </Space>
    </Card >
}
