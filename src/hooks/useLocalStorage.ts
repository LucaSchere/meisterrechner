import {useState, useEffect, SetStateAction, Dispatch} from 'react';

/**
 * A prefix to identify session and local storage keys saved using
 * the storage hooks in this application.
 */
const STORAGE_KEYS_PREFIX = 'meisterrechenr_';

const useStorage = (storage: Storage, keyPrefix: string) => <T>(storageKey: string, fallbackState: T):
    [T, Dispatch<SetStateAction<T>>] => {
    if (!storageKey) throw new Error(`"storageKey" must be a nonempty string, but "${storageKey}" was passed.`);

    const storedString = storage.getItem(keyPrefix + storageKey);
    let parsedObject = null;

    if (storedString !== null) parsedObject = JSON.parse(storedString);

    const [value, setValue] = useState<T>(parsedObject ?? fallbackState);

    useEffect(() => {
        storage.setItem(keyPrefix + storageKey, JSON.stringify(value));
    }, [value, storageKey]);

    return [value, setValue];
};

/**
 * Saves data in local storage.
 * @param storageKey A string to identify the value being cached.
 * @param fallbackState The default value when no value has been stored yet.
 * @returns A stateful value, and a function to update it.
 * @example
 * const [collapsed, setCollapsed] = useLocalStorage('isSidebarCollapsed', false);
 */
const useLocalStorage = useStorage(localStorage, STORAGE_KEYS_PREFIX);
export default useLocalStorage;
