import { IconButton, Tooltip } from '@mui/material'
import useQRHandler from '../../hooks/useQRHandler'
import { CancelOutlined, QrCode } from '@mui/icons-material'

const QRSearchBtn = () => {
  const { state, clearResult, toggleScanner } = useQRHandler()
  const { result, showScanner } = state
  const hasResult = result.id !== -1
  const Icon = hasResult ? CancelOutlined : QrCode

  const handleClick = () => {
    if (hasResult) clearResult()
    else toggleScanner(true)
  }

  const title = hasResult ? 'Clear QR search' : 'QR Code Search'

  return (
    <Tooltip title={title}>
      <IconButton
        sx={{ paddingLeft: '5px' }}
        color="primary"
        disabled={showScanner}
        onClick={handleClick}
      >
        <Icon />
      </IconButton>
    </Tooltip>
  )
}

export default QRSearchBtn
