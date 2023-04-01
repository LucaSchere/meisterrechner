/**
 * wrapper function for type-safe fetch
 * @param path
 */
const typeSafeFetch = async <T>(path: string): Promise<T> => {
    const response = await fetch(path);

    const json: T = await response.json();
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

export default typeSafeFetch;
