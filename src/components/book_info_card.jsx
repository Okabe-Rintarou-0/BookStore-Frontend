
import { Card, Divider, Pagination, Space, Tabs } from "antd";
import { addCartItem } from "../service/cart";
import { handleBaseApiResponse } from "../utils/message";
import useMessage from "antd/es/message/useMessage";
import BookDetails from "./book_details";
import BookCommentList from "./book_comment_list";
import CommentInput from "./comment_input";
import { addBookComment } from "../service/book";

export default function BookInfoCard({
    pageIndex, sort, book, comments, onMutate, onPageChange, onSortChange
}) {
    const [messageApi, contextHolder] = useMessage();
    const handleAddCartItem = async () => {
        let res = await addCartItem(book.id);
        handleBaseApiResponse(res, messageApi);
    };

    const handleAddComment = async (comment) => {
        if (comment === "") {
            messageApi.error("评论不得为空！");
            return;
        }
        let res = await addBookComment(book.id, comment);
        handleBaseApiResponse(res, messageApi, onMutate);
    };

    const tabItems = [{
        'key': 'createdTime',
        'label': '最新评论'
    }, {
        'key': 'like',
        'label': '最热评论'
    }];

    return <Card className="card-container">
        {contextHolder}
        <Space direction="vertical" style={{ width: "100%" }}>
            <BookDetails book={book} onAddCartItem={handleAddCartItem} />
            <div style={{ margin: 20 }}>
                <Divider>书籍评论</Divider>
                <Tabs items={tabItems}
                    defaultActiveKey={sort}
                    onChange={sort => { onSortChange(sort) }}
                />
                <CommentInput placeholder="发布一条友善的评论" onSubmit={handleAddComment} />
                <BookCommentList comments={comments.items} onMutate={onMutate} />
            </div>
            <Pagination
                current={pageIndex + 1}
                pageSize={5}
                total={5 * comments.total}
                onChange={onPageChange} />
        </Space>
    </Card>
}