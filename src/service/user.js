import { DUMMY_RESPONSE, PREFIX, getJson, put } from "./common";

export const AVATAR_UPLOAD_URL = `${PREFIX}/user/me/avatar`;
export const AVATAR_FILES_PREFIX = `${PREFIX}/user/avatars/`;

export async function getMe() {
    const url = `${PREFIX}/user/me`;
    let me = null;
    try {
        me = await getJson(url);
    } catch (e) {
        console.log(e);
    }
    return me;
}

export async function changePassword(request) {
    const url = `${PREFIX}/user/me/password`;
    let res;
    try {
        res = await put(url, request);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function changeIntroduction(request) {
    const url = `${PREFIX}/user/me/introduction`;
    let res;
    try {
        res = await put(url, request);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}