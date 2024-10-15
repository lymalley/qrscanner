import { Button, CircularProgress } from '@mui/material'

interface LoadingButtonProps {
  loading: boolean
  onClick: () => void
  label: string
}

const LoadingButton = (props: LoadingButtonProps) => {
  const { onClick, loading, label } = props
  return (
    <div style={{ position: 'relative' }}>
      <Button variant="contained" onClick={onClick} disabled={loading}>
        {label}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </div>
  )
}

export default LoadingButton
