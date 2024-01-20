import { DUMMY_RESPONSE, PREFIX, post, put } from "./common";

export async function replyComment(commentId, content) {
    const url = `${PREFIX}/comment/${commentId}`;
    let res;
    try {
        res = await post(url, { 'content': content });
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function likeComment(commentId, content) {
    const url = `${PREFIX}/comment/${commentId}/like`;
    let res;
    try {
        res = await put(url);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function unlikeComment(commentId, content) {
    const url = `${PREFIX}/comment/${commentId}/unlike`;
    let res;
    try {
        res = await put(url);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}