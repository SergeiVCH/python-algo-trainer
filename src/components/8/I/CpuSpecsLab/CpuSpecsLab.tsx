import BusinessIcon from '@mui/icons-material/Business'
import HubIcon from '@mui/icons-material/Hub'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LayersIcon from '@mui/icons-material/Layers'
import MemoryIcon from '@mui/icons-material/Memory'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch' // Добавил иконку для задания
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent'
import SpeedIcon from '@mui/icons-material/Speed'
import {
  Alert,
  Box,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import {useState} from 'react'

export const CpuSpecsLab = () => {
  // Состояния характеристик
  const [vendor, setVendor] = useState('Intel')
  const [frequency, setFrequency] = useState(3.5) // Теперь это число для расчетов
  const [bitness, setBitness] = useState(64)
  const [cache, _setCache] = useState('16 Мб')
  const [bus, _setBus] = useState('100 МГц / 64 бит')
  const [cores, setCores] = useState(8)

  // Расчет производительности для задания (в пустом месте)
  const performanceScore = cores * frequency * (bitness / 64)
  const progressValue = Math.min((performanceScore / 40) * 100, 100)

  const SpecItem = ({icon, label, value, info}: any) => (
    <Paper
      sx={{
        p: 2,
        bgcolor: '#0d1117',
        border: '1px solid #30363d',
        borderRadius: 2,
      }}>
      <Stack direction='row' spacing={2} alignItems='center'>
        <Box sx={{color: '#ff5722', display: 'flex'}}>{icon}</Box>
        <Box sx={{flexGrow: 1}}>
          <Typography
            variant='caption'
            sx={{
              color: '#8b949e',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}>
            {label}
            <Tooltip title={info} arrow>
              <InfoOutlinedIcon sx={{fontSize: 14, cursor: 'help'}} />
            </Tooltip>
          </Typography>
          <Typography variant='h6' sx={{color: '#fff', fontWeight: 'bold'}}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  )

  return (
    <Box sx={{py: 4}}>
      <Typography
        variant='h4'
        sx={{
          mb: 5,
          fontWeight: 900,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          textTransform: 'uppercase',
        }}>
        <MemoryIcon sx={{fontSize: 40, color: '#ff5722'}} />
        <Box component='span' sx={{color: '#fff'}}>
          Характеристики
        </Box>
        <Box component='span' sx={{color: '#ff5722'}}>
          Процессора
        </Box>
      </Typography>

      <Grid container spacing={3}>
        {/* Панель настройки (Интерактив) */}
        <Grid size={{xs: 12, md: 4}}>
          {' '}
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 4,
            }}>
            <Typography variant='h6' sx={{color: '#fff', mb: 3}}>
              Конфигуратор CPU
            </Typography>
            <Stack spacing={2.5}>
              <FormControl fullWidth size='small'>
                <InputLabel sx={{color: '#8b949e'}}>Компания</InputLabel>
                <Select
                  value={vendor}
                  label='Компания'
                  onChange={(e) => setVendor(e.target.value)}
                  sx={{
                    color: '#fff',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#30363d',
                    },
                  }}>
                  <MenuItem value='Intel'>Intel</MenuItem>
                  <MenuItem value='AMD'>AMD</MenuItem>
                  <MenuItem value='Apple'>Apple (M-series)</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size='small'>
                <InputLabel sx={{color: '#8b949e'}}>Количество ядер</InputLabel>
                <Select
                  value={cores}
                  label='Количество ядер'
                  onChange={(e) => setCores(Number(e.target.value))}
                  sx={{color: '#fff'}}>
                  {[2, 4, 6, 8, 12, 16].map((c) => (
                    <MenuItem key={c} value={c}>
                      {c} ядер
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size='small'>
                <InputLabel sx={{color: '#8b949e'}}>
                  Тактовая частота
                </InputLabel>
                <Select
                  value={frequency}
                  label='Тактовая частота'
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  sx={{color: '#fff'}}>
                  {[1.2, 2.4, 3.5, 4.2, 5.0].map((f) => (
                    <MenuItem key={f} value={f}>
                      {f} ГГц
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size='small'>
                <InputLabel sx={{color: '#8b949e'}}>Разрядность</InputLabel>
                <Select
                  value={bitness}
                  label='Разрядность'
                  onChange={(e) => setBitness(Number(e.target.value))}
                  sx={{color: '#fff'}}>
                  <MenuItem value={32}>32 бит (x86)</MenuItem>
                  <MenuItem value={64}>64 бит (x64)</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Paper>
        </Grid>

        {/* Результат (Визуализация характеристик) */}
        <Grid size={{xs: 12, md: 8}}>
          {' '}
          <Grid container spacing={2}>
            <Grid size={{xs: 12, md: 6}}>
              {' '}
              <SpecItem
                icon={<BusinessIcon />}
                label='Разработчик'
                value={vendor}
                info='Основные игроки: Intel и AMD.'
              />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              {' '}
              <SpecItem
                icon={<SpeedIcon />}
                label='Тактовая частота'
                value={`${frequency} ГГц`}
                info='Количество тактов в секунду.'
              />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              {' '}
              <SpecItem
                icon={<SettingsInputComponentIcon />}
                label='Разрядность'
                value={`${bitness} бит`}
                info='Максимальное количество бит за один такт.'
              />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <SpecItem
                icon={<LayersIcon />}
                label='Объем Кэш-памяти'
                value={cache}
                info='Сверхбыстрая память внутри процессора.'
              />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <SpecItem
                icon={<HubIcon />}
                label='Системная шина (FSB)'
                value={bus}
                info='Магистраль передачи данных.'
              />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <SpecItem
                icon={<MemoryIcon />}
                label='Ядра'
                value={`${cores} Cores`}
                info='Количество независимых вычислительных блоков.'
              />
            </Grid>
          </Grid>
          <Box sx={{mt: 3}}>
            <Alert
              severity='success'
              sx={{
                bgcolor: '#0d1117',
                color: '#2dd4bf',
                border: '1px solid #238636',
              }}>
              Этот процессор может выполнять миллиарды операций в секунду
              благодаря <b>{frequency} ГГц</b> частоте и <b>{cores}</b> ядрам!
            </Alert>
          </Box>
          {/* НОВОЕ ЗАДАНИЕ (В ТОМ САМОМ ПУСТОМ МЕСТЕ) */}
          <Paper
            sx={{
              p: 3,
              mt: 2,
              bgcolor: '#161b22',
              border: '2px solid #30363d',
              borderRadius: 4,
              transition: '0.3s',
              '&:hover': {borderColor: '#ff5722'},
            }}>
            <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 2}}>
              <RocketLaunchIcon sx={{color: '#ff5722'}} />
              <Typography variant='h6' sx={{color: '#fff', fontWeight: 'bold'}}>
                Задание: Испытание мощностью
              </Typography>
            </Stack>

            <Typography variant='body2' sx={{color: '#8b949e', mb: 3}}>
              Проверь, хватит ли сил у твоего CPU для рендеринга сложной
              графики:
            </Typography>

            <Box sx={{position: 'relative', pt: 1}}>
              <Box
                sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                <Typography
                  variant='caption'
                  sx={{color: '#ff5722', fontWeight: 'bold'}}>
                  ПРОИЗВОДИТЕЛЬНОСТЬ
                </Typography>
                <Typography variant='caption' sx={{color: '#fff'}}>
                  {progressValue.toFixed(0)}%
                </Typography>
              </Box>

              <LinearProgress
                variant='determinate'
                value={progressValue}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  bgcolor: '#0d1117',
                  '& .MuiLinearProgress-bar': {
                    bgcolor:
                      progressValue > 80
                        ? '#238636'
                        : progressValue > 40
                          ? '#ff9800'
                          : '#f85149',
                    borderRadius: 6,
                  },
                }}
              />
            </Box>

            <Alert
              severity={progressValue > 70 ? 'success' : 'warning'}
              sx={{
                mt: 3,
                bgcolor: '#0d1117',
                color: '#fff',
                border: '1px solid #30363d',
              }}>
              {progressValue > 70
                ? 'Отлично! С такой конфигурацией можно смело заниматься видеомонтажом.'
                : 'Для тяжелых задач маловато мощности. Попробуй увеличить количество ядер или частоту.'}
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
