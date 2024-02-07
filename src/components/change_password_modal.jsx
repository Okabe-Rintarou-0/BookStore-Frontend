import { Button, Form, Input, Modal } from "antd";
import React from "react";
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import { changePassword } from "../service/user";

const { Password } = Input;
export default function ChangePasswordModal({
    onOk,
    onCancel }) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = useMessage();

    const handleSubmit = async ({ password, confirm }) => {
        if (!password || !confirm) {
            messageApi.error("请填写完整信息！");
            return;
        }
        if (password !== confirm) {
            messageApi.error("新密码和确认新密码不一致！");
            return;
        }
        let request = {
            password
        }
        let res = await changePassword(request);
        handleBaseApiResponse(res, messageApi, onOk);
    };

    return (
        <Modal
            title={"修改密码"}
            open
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                preserve={false}
            >
                <Form.Item
                    name="password"
                    label="新密码"
                    required
                >
                    <Password placeholder="请输入新密码" />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="确认新密码"
                    required
                >
                    <Password placeholder="请再次输入新密码" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};