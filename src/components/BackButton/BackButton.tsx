import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const BackButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      variant='outlined'
      startIcon={<ArrowBackIosNewIcon />}
      onClick={() => navigate('/')}
      sx={{
        mb: 3,
        color: '#abb2bf',
        borderColor: '#30363d',
        textTransform: 'none',
        borderRadius: '10px',
        '&:hover': {
          borderColor: '#ff9800', // Оранжевый акцент как в логотипе
          bgcolor: 'rgba(255, 152, 0, 0.05)',
          color: '#fff',
        },
      }}>
      Назад в HUB
    </Button>
  )
}
