/**
 * wrapper function for fetch
 * maybe adding type safety later
 * @param path
 */
const _fetch = async (path: string): Promise<any> => {
    const response = await fetch(path);

    const json = await response.json();

    console.log(json);

    if (response.ok) {
        if (json) {
            return json;
        } else {
            return Promise.reject(new Error(`No data returned from ${path}`));
        }
    } else {
        const error = new Error(`Error while fetching data from ${path}`);
        return Promise.reject(error);
    }
}

export default _fetch;
