import { DUMMY_RESPONSE, PREFIX, getJson, post } from "./common";

export async function searchBooks(keyword, pageIndex, pageSize) {
    const url = `${PREFIX}/books?keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    let books;
    try {
        books = await getJson(url);
    } catch (e) {
        console.log(e);
        books = {
            total: 0,
            items: []
        };
    }
    return books;
}

export async function getBookById(id) {
    const url = `${PREFIX}/book/${id}`;
    let book;
    try {
        book = await getJson(url);
    } catch (e) {
        console.log(e);
        book = null;
    }
    return book;
}

export async function getTop10BestSellingBooks() {
    const url = `${PREFIX}/books/rank`;
    let books;
    try {
        books = await getJson(url);
    } catch (e) {
        console.log(e);
        books = null;
    }
    return books;
}

export async function getBookComments(bookId, pageIndex, pageSize, sort) {
    const url = `${PREFIX}/book/${bookId}/comments?pageIndex=${pageIndex}&pageSize=${pageSize}&sort=${sort}`;
    let comments;
    try {
        comments = await getJson(url);
    } catch (e) {
        console.log(e);
        comments = {
            total: 0,
            items: []
        };
    }
    return comments;
}

export async function addBookComment(bookId, content) {
    const url = `${PREFIX}/book/${bookId}/comments`;
    let res;
    try {
        res = await post(url, { 'content': content });
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}