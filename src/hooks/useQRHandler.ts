import { useContext } from "react";
import { CAMERA_MODE, QRAction, QRContext, QRDispatchContext, QRList, QRModalId, QRScanType } from "../context/QRContext";

const useQRHandler = () => {
    const dispatch = useContext(QRDispatchContext);
    const state = useContext(QRContext);
    const { result, qrActive, modal, scanList, cameraMode } = state;
    const noResult = result.id === -1;
    const showScanner = qrActive && noResult;
    const showModal = qrActive && !noResult && Boolean(modal);

    const setModal = (open: QRModalId | false) => {
        dispatch({ type: QRAction.SET_MODAL, payload: open });
    };
    const setErrorModal = (id: QRModalId) => {
        dispatch({ type: QRAction.SET_ERROR_MODAL, payload: id });
    };
    const setNotFound = () => setErrorModal(QRModalId.notFound);

    const setQRScanList = (listData: QRList) => {
        dispatch({ type: QRAction.SET_SCAN_LIST, payload: { ...listData } });
    };
    return {
        state: { ...state, showScanner, showModal, facingMode: cameraMode && cameraMode === CAMERA_MODE.USER ? 'user' : 'environment' },
        toggleScanner: (open: boolean) => {
            dispatch({ type: QRAction.TOGGLE_QR_SEARCH, payload: open });
        },
        setResult: (res: string) => {
            if (!noResult) return;
            const check = "/abcd/";
            const isValid = res.startsWith(check);
            const type = res.includes("/ticketId:")
                ? QRScanType.TICKET
                : QRScanType.UNDEFINED;
            if (!isValid) setErrorModal(QRModalId.invalidQR);
            else if (type === QRScanType.UNDEFINED) {
                setNotFound();
            } else {
                const resString = res.replace(check, "");
                const spl = resString.split("/");

                const typeSelect = `${type}Id`;
                const getValue = (str: string) => {
                    const key = `${str}:`;
                    const found = spl.find((i) => i.includes(key));
                    return found ? found.replace(key, "") : "-1";
                };
                const resultObj = {
                    id: Number(getValue(typeSelect)),

                };
                const found = scanList.find((item) => Number(item[`${type}Id`]) === resultObj.id);
                if (found)
                    dispatch({
                        type: QRAction.SET_RESULT,
                        payload: { result: resultObj, type, found },
                    });
                else
                    dispatch({
                        type: QRAction.SET_RESULT_REDIRECT,
                        payload: { result: resultObj, type },
                    });
            }
        },
        clearResult: () => {
            dispatch({ type: QRAction.CLEAR_RESULT });
        },
        setNotFound,
        loadQRList: setQRScanList,
        unloadQRList: () =>
            setQRScanList({ scanList: [], qrFilteredList: false, outsideDate: false }),
        closeModal: () => setModal(false),
        setCamera: (mode: CAMERA_MODE) => {
            dispatch({ type: QRAction.SET_CAMERA, payload: mode });
        },
        setCameraBlocked: () => setErrorModal(QRModalId.cameraBlocked),
    };
};

export default useQRHandler;
