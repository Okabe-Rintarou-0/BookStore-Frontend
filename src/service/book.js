import { DUMMY_RESPONSE, PREFIX, getJson, post } from "./common";

export async function searchBooks(tag, keyword, pageIndex, pageSize) {
    tag = encodeURIComponent(tag);
    keyword = encodeURIComponent(keyword);
    const url = `${PREFIX}/books?tag=${tag}&keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
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

export async function getAllBookTags() {
    const url = `${PREFIX}/book/tags`;
    let tags;
    try {
        tags = await getJson(url);
    } catch (e) {
        console.log(e);
        tags = [];
    }
    return tags;
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