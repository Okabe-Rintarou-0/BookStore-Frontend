export async function getJson(url) {
    let res = await fetch(url, { method: "GET", credentials: "include" });
    return res.json();
}

export async function get(url) {
    let res = await fetch(url, { method: "GET", credentials: "include" });
    return res;
}

export async function put(url, data) {
    let res = await fetch(url, { method: "PUT", credentials: "include", body: JSON.stringify(data) });
    return res.json();
}

export async function del(url, data) {
    let res = await fetch(url, { method: "DELETE", credentials: "include", body: JSON.stringify(data) });
    return res.json();
}


export async function postJson(url, data) {
    let opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    return res.json();
}

export const BASEURL = process.env.REACT_APP_BASE_URL;
export const PREFIX = `${BASEURL}/api`;
export const API_DOCS_URL = `${BASEURL}/api-docs`;
export const IMAGE_PREFIX = `${BASEURL}/images`;
export const DUMMY_RESPONSE = {
    ok: false,
    message: "网络错误！"
}