import { Card } from "antd";
import { PrivateLayout } from "../components/layout";
import BookRankChart from "../components/book_rank_chart";
import { useEffect, useState } from "react";
import { getTop10BestSellingBooks } from "../service/book";

export default function RankPage() {
    const [books, setBooks] = useState([]);

    const getTop10Books = async () => {
        let books = await getTop10BestSellingBooks();
        setBooks(books);
    }

    useEffect(() => {
        getTop10Books();
    }, []);

    return <PrivateLayout>
        <Card className="card-container">
            <BookRankChart books={books} />
        </Card>
    </PrivateLayout>
}