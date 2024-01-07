import { Card, Space } from "antd";
import { PrivateLayout } from "../components/layout";
import BookList from "../components/book_list";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchBooks } from "../service/book";

import { Input } from 'antd';
import BookInfoCard from "../components/book_info_card";
const { Search } = Input;

export default function HomePage() {
    const [books, setBooks] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 0;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 20;

    const getBooks = async () => {
        let pagedBooks = await searchBooks(keyword, pageIndex, pageSize);
        let books = pagedBooks.items;
        let totalPage = pagedBooks.total;
        setBooks(books);
        setTotalPage(totalPage);
    };

    useEffect(() => {
        getBooks();
    }, [keyword])

    const handleSearch = (keyword) => {
        setSearchParams({
            "keyword": keyword,
            "pageIndex": 0,
            "pageSize": 20
        });
    };

    return <PrivateLayout>
        <Card style={{ margin: "20px" }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Search placeholder="输入关键字" onSearch={handleSearch} enterButton size="large" />
                <BookList books={books} pageSize={pageSize} total={totalPage} />
            </Space>
        </Card>
    </PrivateLayout>
}