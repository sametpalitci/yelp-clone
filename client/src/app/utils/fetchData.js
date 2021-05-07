import { BACK_END_URL } from "../../constants";

const fetchData = async(url, method, payload) => {
    const _fetchData = await fetch(BACK_END_URL + url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
    let _fetchDataToJson = _fetchData.json();
    return _fetchDataToJson;
};

export { fetchData };