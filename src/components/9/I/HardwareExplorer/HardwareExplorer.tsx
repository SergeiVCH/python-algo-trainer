import KeyboardIcon from '@mui/icons-material/Keyboard' // Клавиатура
import MemoryIcon from '@mui/icons-material/Memory' // Процессор
import MonitorIcon from '@mui/icons-material/Monitor' // Монитор
import PowerIcon from '@mui/icons-material/Power' // Блок питания
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent' // Материнка
import StorageIcon from '@mui/icons-material/Storage' // Диск
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt' // Видеокарта
import {
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  Zoom,
} from '@mui/material'
import {useState} from 'react'

// Данные о железе
const hardwareData = {
  internal: [
    {
      name: 'Материнская плата',
      desc: '«Скелет» компьютера, соединяющий все компоненты.',
      icon: <SettingsInputComponentIcon fontSize='large' />,
    },
    {
      name: 'Процессор (CPU)',
      desc: 'Мозг ПК, выполняет все вычисления и команды.',
      icon: <MemoryIcon fontSize='large' />,
    },
    {
      name: 'Видеокарта (GPU)',
      desc: 'Отвечает за вывод изображения и сложные графические вычисления.',
      icon: <ViewQuiltIcon fontSize='large' />,
    },
    {
      name: 'Оперативная память (RAM)',
      desc: 'Быстрая память для временного хранения данных запущенных программ.',
      icon: <MemoryIcon fontSize='large' sx={{transform: 'rotate(90deg)'}} />,
    },
    {
      name: 'Накопитель (SSD/HDD)',
      desc: 'Постоянное хранилище для твоих файлов и системы.',
      icon: <StorageIcon fontSize='large' />,
    },
    {
      name: 'Блок питания',
      desc: 'Преобразует ток из розетки в энергию для всех узлов ПК.',
      icon: <PowerIcon fontSize='large' />,
    },
  ],
  external: [
    {
      name: 'Монитор',
      desc: 'Основное устройство вывода визуальной информации.',
      icon: <MonitorIcon fontSize='large' />,
    },
    {
      name: 'Клавиатура и мышь',
      desc: 'Устройства ввода для управления интерфейсом.',
      icon: <KeyboardIcon fontSize='large' />,
    },
    {
      name: 'Системный блок',
      desc: 'Корпус, защищающий внутренние компоненты от пыли и повреждений.',
      icon: <StorageIcon fontSize='large' />,
    },
  ],
}

export const HardwareExplorer = () => {
  const [tab, setTab] = useState<'internal' | 'external'>('internal')

  return (
    <Box sx={{p: 4, bgcolor: '#010409', minHeight: '100vh', color: '#e6edf3'}}>
      {/* ЗАГОЛОВОК */}
      <Stack alignItems='center' sx={{mb: 6, textAlign: 'center'}}>
        <Typography
          variant='h4'
          sx={{
            fontWeight: 900,
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: 3,
            mb: 1,
          }}>
          Hardware Архитектура
        </Typography>
        <Typography variant='subtitle1' sx={{color: '#8b949e'}}>
          Изучи устройство персонального компьютера
        </Typography>
      </Stack>

      <Container maxWidth='lg'>
        {/* ПЕРЕКЛЮЧАТЕЛЬ КАТЕГОРИЙ */}
        <Stack direction='row' spacing={2} justifyContent='center' sx={{mb: 6}}>
          <Chip
            label='ВНУТРИ СИСТЕМНОГО БЛОКА'
            onClick={() => setTab('internal')}
            sx={{
              py: 2.5,
              px: 2,
              fontWeight: 'bold',
              bgcolor: tab === 'internal' ? '#2196f3' : '#161b22',
              color: '#ffffff',
              '&:hover': {bgcolor: '#1e88e5'},
            }}
          />
          <Chip
            label='ВНЕШНИЕ УСТРОЙСТВА'
            onClick={() => setTab('external')}
            sx={{
              py: 2.5,
              px: 2,
              fontWeight: 'bold',
              bgcolor: tab === 'external' ? '#00c853' : '#161b22',
              color: '#ffffff',
              '&:hover': {bgcolor: '#00b248'},
            }}
          />
        </Stack>

        {/* ГРИД С КАРТОЧКАМИ */}
        <Grid container spacing={3}>
          {hardwareData[tab].map((item, index) => (
            <Grid size={{xs: 12, sm: 6, md: 4}} key={item.name}>
              <Zoom in={true} style={{transitionDelay: `${index * 100}ms`}}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    bgcolor: '#0d1117',
                    border: '1px solid #30363d',
                    borderRadius: '20px',
                    transition: '0.3s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    '&:hover': {
                      borderColor: tab === 'internal' ? '#2196f3' : '#00c853',
                      transform: 'translateY(-5px)',
                      boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
                    },
                  }}>
                  <Box
                    sx={{
                      mb: 2,
                      color: tab === 'internal' ? '#2196f3' : '#00c853',
                      filter: 'drop-shadow(0 0 8px currentColor)',
                    }}>
                    {item.icon}
                  </Box>
                  <Typography
                    variant='h6'
                    sx={{color: '#ffffff', fontWeight: 700, mb: 1.5}}>
                    {item.name}
                  </Typography>
                  <Divider sx={{width: '40%', mb: 2, borderColor: '#30363d'}} />
                  <Typography
                    variant='body2'
                    sx={{color: '#8b949e', lineHeight: 1.6}}>
                    {item.desc}
                  </Typography>
                </Paper>
              </Zoom>
            </Grid>
          ))}
        </Grid>

        {/* ТЕХНИЧЕСКАЯ ИНФО-ПАНЕЛЬ ВНИЗУ */}
        <Paper
          sx={{
            mt: 8,
            p: 3,
            bgcolor: 'rgba(255, 255, 255, 0.02)',
            border: '1px dashed #30363d',
            borderRadius: '16px',
          }}>
          <Typography
            variant='body2'
            sx={{color: '#8b949e', textAlign: 'center', fontStyle: 'italic'}}>
            Подсказка: Все компоненты внутри системного блока подключаются к
            материнской плате, которая распределяет энергию и данные между ними.
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}
