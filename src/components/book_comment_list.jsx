import { List, Space } from "antd";
import BookComment from "./book_comment";
import { useState } from "react";

export default function BookCommentList({ comments, onMutate }) {
    const [replying, setReplying] = useState(-1);
    const handleMutate = () => {
        onMutate?.();
        setReplying(-1);
    };
    return <Space direction="vertical" style={{ width: '100%' }}>
        <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={comment => <BookComment comment={comment}
                isReplying={replying === comment.id}
                onMutate={handleMutate}
                onReply={() => setReplying(comment.id)} />}
        />
    </Space>
}