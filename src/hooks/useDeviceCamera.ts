import { useEffect } from "react";
import useQRHandler from "./useQRHandler";
import { CAMERA_MODE } from "../context/QRContext";

const useDeviceCamera = () => {
  const { state, setCamera } = useQRHandler();
  const { cameraMode } = state;
  useEffect(() => {
      async function checkCamera() {
          try {
              await navigator.mediaDevices.getUserMedia({
                  video: { facingMode: { exact: 'environment' } },
              });
              setCamera(CAMERA_MODE.ENVIRONMENT);
          } catch (error) {
              setCamera(CAMERA_MODE.USER);
          }
      }

      if (!cameraMode) {
          checkCamera();
      }
  }, [cameraMode]);
};

export default useDeviceCamera;
