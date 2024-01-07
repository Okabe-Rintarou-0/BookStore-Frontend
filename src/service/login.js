import { PREFIX, postJson } from "./common";

export async function login(username, password) {
    const url = `${PREFIX}/login`;
    let result;

    try {
        result = await postJson(url, { username, password });
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "网络错误！",
        }
    }
    return result;
}