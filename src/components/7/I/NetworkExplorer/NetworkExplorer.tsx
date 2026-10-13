import BusinessIcon from '@mui/icons-material/Business'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PublicIcon from '@mui/icons-material/Public'
import RouterIcon from '@mui/icons-material/Router'
import {
    Box,
    Button,
    Container,
    Fade,
    Grid,
    Paper,
    Slider,
    Stack,
    Typography
} from '@mui/material'
import { useState } from 'react'

const NETWORK_DATA = [
  {
    id: 0,
    type: 'LAN',
    name: 'Локальная сеть',
    full: 'Local Area Network',
    desc: 'Объединяет компьютеры в одном помещении или здании. Идеально для дома или школы.',
    example: 'Школьный компьютерный класс',
    icon: <RouterIcon sx={{fontSize: 40}} />,
    color: '#4caf50',
    scale: '10 - 100 метров',
  },
  {
    id: 1,
    type: 'WAN',
    name: 'Региональная сеть',
    full: 'Wide Area Network',
    desc: 'Охватывает город или область. Связывает филиалы организаций в одном регионе.',
    example: 'Сеть банкоматов одного города',
    icon: <BusinessIcon sx={{fontSize: 40}} />,
    color: '#2196f3',
    scale: '10 - 100 километров',
  },
  {
    id: 2,
    type: 'GAN',
    name: 'Глобальная сеть',
    full: 'Global Area Network',
    desc: 'Охватывает всю планету. Стирает границы между странами и континентами.',
    example: 'Всемирная паутина Internet',
    icon: <PublicIcon sx={{fontSize: 40}} />,
    color: '#9c27b0',
    scale: 'Весь мир',
  },
]

export const NetworkExplorer = () => {
  const [activeLevel, setActiveLevel] = useState(0)
  const current = NETWORK_DATA[activeLevel]

  return (
    <Box sx={{p: 4, bgcolor: '#010409', minHeight: '100vh', color: '#e6edf3'}}>
      <Container maxWidth='md'>
        {/* Header */}
        <Box sx={{textAlign: 'center', mb: 8}}>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 900,
              color: '#ff9800',
              mb: 1,
              textShadow: '0 0 20px rgba(255,152,0,0.3)',
            }}>
            Масштабы сетей
          </Typography>
          <Typography variant='body1' sx={{color: '#8b949e'}}>
            Как классифицируют сети по их территориальному охвату
          </Typography>
        </Box>

        {/* Интерактивный слайдер масштаба */}
        <Paper
          sx={{
            p: 4,
            bgcolor: '#0d1117',
            borderRadius: '24px',
            border: '1px solid #30363d',
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
          }}>
          <Typography
            variant='subtitle2'
            sx={{mb: 4, color: '#8b949e', textAlign: 'center'}}>
            Используй слайдер, чтобы изменить масштаб обзора:
          </Typography>

          <Box sx={{px: 4, mb: 6}}>
            <Slider
              value={activeLevel}
              min={0}
              max={2}
              step={1}
              onChange={(_, v) => setActiveLevel(v as number)}
              sx={{
                color: current.color,
                '& .MuiSlider-thumb': {height: 24, width: 24},
              }}
            />
            <Stack direction='row' justifyContent='space-between' sx={{mt: 1}}>
              <Typography variant='caption'>Комната</Typography>
              <Typography variant='caption'>Город</Typography>
              <Typography variant='caption'>Планета</Typography>
            </Stack>
          </Box>

          <Fade in={true} key={activeLevel}>
            <Box>
              <Stack
                direction='row'
                spacing={3}
                alignItems='center'
                sx={{mb: 3}}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: '16px',
                    bgcolor: `${current.color}15`,
                    color: current.color,
                    border: `1px solid ${current.color}40`,
                  }}>
                  {current.icon}
                </Box>
                <Box>
                  <Typography
                    variant='h4'
                    sx={{fontWeight: 800, color: current.color}}>
                    {current.type}
                  </Typography>
                  <Typography variant='h6' sx={{color: '#fff'}}>
                    {current.name}
                  </Typography>
                </Box>
              </Stack>

              <Typography
                variant='body1'
                sx={{
                  color: '#8b949e',
                  mb: 4,
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                }}>
                {current.desc}
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{xs: 12, sm: 6}}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: '#161b22',
                      borderRadius: '12px',
                      border: '1px solid #30363d',
                    }}>
                    <Stack
                      direction='row'
                      spacing={1}
                      alignItems='center'
                      sx={{mb: 1}}>
                      <LocationOnIcon sx={{color: '#ff9800', fontSize: 18}} />
                      <Typography variant='subtitle2' sx={{color: '#ff9800'}}>
                        Радиус действия
                      </Typography>
                    </Stack>
                    <Typography variant='body2'>{current.scale}</Typography>
                  </Box>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: '#161b22',
                      borderRadius: '12px',
                      border: '1px solid #30363d',
                    }}>
                    <Stack
                      direction='row'
                      spacing={1}
                      alignItems='center'
                      sx={{mb: 1}}>
                      <CheckCircleOutlineIcon
                        sx={{color: '#4caf50', fontSize: 18}}
                      />
                      <Typography variant='subtitle2' sx={{color: '#4caf50'}}>
                        Пример
                      </Typography>
                    </Stack>
                    <Typography variant='body2'>{current.example}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Paper>

        {/* Мини-задание на закрепление */}
        <Paper
          sx={{
            p: 4,
            bgcolor: '#161b22',
            borderRadius: '24px',
            textAlign: 'center',
          }}>
          <Typography variant='h6' sx={{mb: 2}}>
            ⚡ Быстрый вопрос
          </Typography>
          <Typography variant='body2' sx={{color: '#8b949e', mb: 3}}>
            К какому типу относится сеть, объединяющая офисы банка по всему
            Казахстану?
          </Typography>
          <Stack direction='row' spacing={2} justifyContent='center'>
            {['LAN', 'WAN', 'GAN'].map((opt) => (
              <Button
                key={opt}
                variant='outlined'
                onClick={() =>
                  alert(
                    opt === 'WAN'
                      ? 'Верно! Это региональный масштаб.'
                      : 'Не совсем. Попробуй еще раз!',
                  )
                }
                sx={{
                  borderRadius: '10px',
                  borderColor: '#30363d',
                  color: '#8b949e',
                }}>
                {opt}
              </Button>
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
