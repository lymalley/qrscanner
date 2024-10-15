import Scanner from 'qr-scanner'
import { useRef, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import styles from './QRScanner.module.css'
import useQRHandler from '../../hooks/useQRHandler'
import Modal from '../Modal/Modal'

const Scan = () => {
  const scannerRef = useRef<Scanner>()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [qrOn, setQROn] = useState<boolean>(true)
  const { state, setResult, setCameraBlocked } = useQRHandler()
  const { showScanner, facingMode } = state

  // Success
  const handleScanSuccess = (result: Scanner.ScanResult) => {
    setResult(result?.data)
  }

  useEffect(() => {
    const videoEl = videoRef.current
    if (videoEl) {
      // initiate scanner
      scannerRef.current = new Scanner(videoEl, handleScanSuccess, {
        preferredCamera: facingMode,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      })

      // start qr scanner
      scannerRef?.current
        ?.start()
        .then(() => setQROn(true))
        .catch((err) => {
          if (err) setQROn(false)
        })
    }

    // clean up on unmount
    return () => {
      if (videoEl) scannerRef?.current?.stop()
    }
  }, [showScanner])

  // if camera is not allowed in browser, show error modal
  useEffect(() => {
    if (!qrOn) setCameraBlocked()
  }, [qrOn])

  return (
    <div className={styles.qrReader}>
      <video ref={videoRef} />
    </div>
  )
}

const QRScanner = () => {
  const { state, toggleScanner } = useQRHandler()
  const { showScanner } = state
  const handleClose = () => toggleScanner(false)
  return (
    <Modal
      modalId={showScanner}
      onClose={handleClose}
      title="QR Scanner"
      maxWidth="sm"
      actionButtons={
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      }
    >
      <Scan />
    </Modal>
  )
}

export default QRScanner
