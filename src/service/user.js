import { PREFIX, getJson } from "./common";

export async function getMe() {
    const url = `${PREFIX}/user/me`;
    let me = null;
    try {
        me = await getJson(url);
    } catch(e) {
        console.log(e);
    }
    return me;
}