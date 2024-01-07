import { PREFIX, get } from "./common";

export async function logout() {
    const url = `${PREFIX}/logout`;
    try {
        await get(url);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}