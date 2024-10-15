import { Box, Container, Typography } from '@mui/material'
import QRHandler from '../components/QRHandler/QRHandler'

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <QRHandler />
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          QR Demo
        </Typography>
      </Box>
    </Container>
  )
}

export default Home
