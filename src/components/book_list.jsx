import { List } from "antd"
import BookCard from "./book_card"

export default function BookList({ books, pageSize, total }) {
    return <List
        grid={{
            gutter: 16, column: 5
        }}
        pagination={{ position: "bottom", align: "center", pageSize, total }}
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
}