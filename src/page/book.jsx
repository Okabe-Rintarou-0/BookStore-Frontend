import { useParams } from "react-router-dom";
import BookInfoCard from "../components/book_info_card";
import { useEffect, useState } from "react";
import { getBookById } from "../service/book";
import { PrivateLayout } from "../components/layout";

export default function BookPage() {
    const [book, setBook] = useState(null);
    let { id } = useParams();

    const getBook = async () => {
        let book = await getBookById(id);
        setBook(book);
    }

    useEffect(() => {
        getBook();
    }, [id]);

    return <PrivateLayout>
        {book && <BookInfoCard book={book} />}
    </PrivateLayout>
}