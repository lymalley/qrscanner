import { CancelOutlined } from '@mui/icons-material'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'

interface ModalProps {
  modalId: any
  onClose: () => void
  title: string
  actionButtons: React.ReactNode
  children: any
  maxWidth?: 'sm' | 'md' | 'lg'
}
const Modal = (props: ModalProps) => {
  const { maxWidth, title, onClose, modalId, actionButtons, children } = props
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth || false}
      onClose={onClose}
      open={Boolean(modalId)}
    >
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CancelOutlined />
      </IconButton>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{actionButtons}</DialogActions>
    </Dialog>
  )
}

export default Modal
