import { useParams, useSearchParams } from "react-router-dom";
import BookInfoCard from "../components/book_info_card";
import { useEffect, useState } from "react";
import { getBookById, getBookComments } from "../service/book";
import { PrivateLayout } from "../components/layout";

export default function BookPage() {
    const [book, setBook] = useState(null);
    const [comments, setComments] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = Number.parseInt(searchParams.get("pageIndex") ?? '0');
    const pageSize = Number.parseInt(searchParams.get("pageSize") ?? '5');
    const sort = searchParams.get("sort") ?? "createdTime";

    let { id } = useParams();

    const getBook = async () => {
        let book = await getBookById(id);
        setBook(book);
    }

    const getComments = async () => {
        let comments = await getBookComments(id, pageIndex, pageSize, sort);
        setComments(comments);
    }

    useEffect(() => {
        getBook();
        getComments();
    }, [id]);

    useEffect(() => {
        handleMutate();
    }, [pageIndex, pageSize, sort])

    const handleMutate = () => {
        getComments();
    };

    const handlePageChange = (page) => {
        console.log(page);
        setSearchParams({
            pageIndex: page - 1,
            pageSize,
            sort
        });
    };

    const handleSortChange = (sort) => {
        setSearchParams({
            pageIndex: 0,
            pageSize,
            sort
        });
    };

    return <PrivateLayout>
        {book && comments && <BookInfoCard
            pageIndex={pageIndex}
            sort={sort}
            book={book}
            comments={comments}
            onMutate={handleMutate}
            onPageChange={handlePageChange}
            onSortChange={handleSortChange}
        />}
    </PrivateLayout>
}