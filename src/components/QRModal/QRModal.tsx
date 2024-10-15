import { Button } from '@mui/material'
import { useMemo, useState } from 'react'
// import { useNavigate } from "react-router-dom";
import useQRHandler from '../../hooks/useQRHandler'
import { QRModalId } from '../../context/QRContext'
import LoadingButton from '../LoadingButton/LoadingButton'
import Modal from '../Modal/Modal'

interface QRModalProps {
  title: string
  contentText: string
  onContinue?: () => void
  continueText?: string
  hideClose?: boolean
}

const QRModal = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { state, clearResult, setNotFound, closeModal, toggleScanner } =
    useQRHandler()
  //  const navigate = useNavigate();
  const { modal, scannerType, result } = state

  const handleRedirect = async () => {
    setLoading(true)
    if (scannerType !== '') {
      // different redirect here
      console.log('TODO: ', scannerType)
    } else setNotFound()
    setLoading(false)
  }
  const modalProps = useMemo((): QRModalProps => {
    switch (modal) {
      case QRModalId.redirect:
        return {
          title: 'Navigation required',
          contentText: `Navigate to ${scannerType}?`,
          onContinue: handleRedirect,
          continueText: 'Continue',
        }

      case QRModalId.invalidQR:
        return {
          title: 'Invalid QR',
          contentText: 'QR provided is not valid for this scanner',
        }

      case QRModalId.notFound:
        return {
          title: 'Not found',
          contentText: 'Unable to find any results with the provided QR Code',
        }

      case QRModalId.cameraBlocked:
        return {
          title: 'Camera Access Required',
          contentText:
            'Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.',
          onContinue: () => toggleScanner(false),
          continueText: 'OK',
          hideClose: true,
        }
      default:
        return {
          contentText: '',
          title: '',
        }
    }
  }, [modal])
  return (
    <Modal
      modalId={modal}
      onClose={clearResult}
      title={modalProps.title}
      maxWidth="md"
      actionButtons={
        <>
          {' '}
          {!modalProps.hideClose && (
            <Button onClick={clearResult} disabled={loading}>
              Cancel
            </Button>
          )}
          {modalProps.onContinue && (
            <LoadingButton
              label={modalProps.contentText}
              loading={loading}
              onClick={modalProps.onContinue}
            />
          )}
        </>
      }
    >
      {modalProps.contentText}
    </Modal>
  )
}

export default QRModal
