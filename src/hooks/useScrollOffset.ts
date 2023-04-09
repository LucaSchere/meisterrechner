import {useEffect, useState} from "react";

const useScrollOffset = (offset: number): [boolean, () => boolean, () => void, boolean] => {

    const [componentMounted, setComponentMounted] = useState<boolean>(false);
    const [offsetReached, setOffsetReached] = useState<boolean>(false);
    const [listening, setListening] = useState<boolean>(false);

    useEffect(() => {
        setComponentMounted(true);
    }, []);

    if (!componentMounted) { // document is not available before mount
        return [
            false,
            () => false,
            () => console.info("could not stop listening to scroll yet."),
            false
        ];
    }

    const listenToScroll = (): boolean => {
        setListening(true);
        window.onscroll = () => {
            setOffsetReached(window.scrollY > offset);
        };
        return window.scrollY > offset;
    };

    const stopListeningToScroll = () => {
        setListening(false);
        window.onscroll = null;
    };

    return [offsetReached, listenToScroll, stopListeningToScroll, listening];
}
export default useScrollOffset;
