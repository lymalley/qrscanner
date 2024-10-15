import { useEffect } from "react";
import useQRHandler from "./useQRHandler";

const useQRList = (list: any[], checkDate?: string) => {
    const { state, loadQRList, unloadQRList, toggleScanner } = useQRHandler();
    const { qrFilteredList, result, scannerType, qrActive } = state;
    useEffect(() => {
        const getFilteredList = () => {
            const found = list.find((res: any) => Number(res[`${scannerType}Id`] === result.id));
            return found ? [found] : false;
        };

        const outsideDateCheck = () => {
            return Boolean(
                checkDate &&
                    new Date().toLocaleDateString() !== new Date(checkDate).toLocaleDateString(),
            );
        };

        loadQRList({
            scanList: list,
            qrFilteredList: getFilteredList(),
            outsideDate: outsideDateCheck(),
        });
    }, [list]);

    // cleanup on unmount
    useEffect(() => {
        return () => {
            unloadQRList();
        };
    }, []);
    return {
        qrFilteredList,
        scanningMode: qrActive,
        clearScanningMode: () => toggleScanner(false),
    };
};

export default useQRList;
