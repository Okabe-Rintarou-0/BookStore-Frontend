export async function getJson(url) {
    let res = await fetch(url, {method: "GET", credentials: "include"});
    return res.json();
}

export async function get(url) {
    let res = await fetch(url, {method: "GET", credentials: "include"});
    return res;
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

export const PREFIX = "http://localhost:8080/api";
export const IMAGE_PREFIX = "http://localhost:8080/images";