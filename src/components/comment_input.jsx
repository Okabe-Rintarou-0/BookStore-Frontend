import { Space, Input, Row, Col, Button } from "antd"
import { useState } from "react";
const { TextArea } = Input;

export default function CommentInput({ placeholder, onSubmit }) {
    const handleSubmit = () => {
        onSubmit?.(text);
        setText('');
    }

    const [text, setText] = useState('');

    return <Space direction="vertical" style={{ width: "100%" }}>
        <TextArea autoFocus placeholder={placeholder}
            value={text}
            onChange={e => setText(e.target.value)}
        />
        <Row justify="end">
            <Col><Button type="primary" onClick={handleSubmit}>发布</Button></Col>
        </Row>
    </Space>
}