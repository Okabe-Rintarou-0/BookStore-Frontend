import { List, Pagination, Space } from "antd"
import BookCard from "./book_card"
import { useEffect, useState } from "react";

export default function BookList({ books, pageSize, current, total, onPageChange }) {
    return <Space direction="vertical" align="center">
        <List
            grid={{
                gutter: 16, column: 5
            }}
            dataSource={books.map(b => ({
                ...b,
                key: b.id
            }))}
            renderItem={(book, _) => (
                <List.Item>
                    <BookCard book={book} />
                </List.Item>
            )}
        />
        <Pagination current={current} pageSize={pageSize}
            onChange={onPageChange} total={total} />
    </Space>
}