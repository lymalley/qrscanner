import QRSearchBtn from '../QRSearchButton/QRSearchBtn'
import QRModal from '../QRModal/QRModal'
import useDeviceCamera from '../../hooks/useDeviceCamera'
import QRScanner from '../QRScanner/QRScanner'

const QRHandler = () => {
  useDeviceCamera()

  return (
    <>
      <QRSearchBtn />
      <QRScanner />
      <QRModal />
    </>
  )
}

export default QRHandler
