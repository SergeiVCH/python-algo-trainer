import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices'
import LanguageIcon from '@mui/icons-material/Language'
import RouterIcon from '@mui/icons-material/Router'
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet'
import WirelessIcon from '@mui/icons-material/SettingsInputAntenna'
import SpeedIcon from '@mui/icons-material/Speed'
import {
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import {useState} from 'react'

export const NetworkLab = () => {
  const [activeTab, setActiveTab] = useState(0)

  // Состояния для калькулятора
  const [fileSize, setFileSize] = useState(10) // МБ
  const [speed, setSpeed] = useState(15) // Мбит/с (средняя в РК по твоему тексту)

  // Расчет времени передачи: (Размер * 8) / Скорость
  const timeSeconds = (fileSize * 8) / speed

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
        <LanguageIcon sx={{fontSize: 40, color: '#2196f3'}} />
        <Box component='span' sx={{color: '#fff'}}>
          Компьютерные
        </Box>
        <Box component='span' sx={{color: '#2196f3'}}>
          Сети
        </Box>
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        centered
        sx={{
          mb: 4,
          '& .MuiTab-root': {color: '#8b949e'},
          '& .Mui-selected': {color: '#2196f3'},
        }}>
        <Tab label='Среда передачи' icon={<SettingsEthernetIcon />} />
        <Tab label='Пропускная способность' icon={<SpeedIcon />} />
      </Tabs>

      {/* ТАБ 1: КАБЕЛИ */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* 1. ВИТАЯ ПАРА (МЕДЬ) */}
          <Grid size={{xs: 12, md: 4}}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#161b22',
                border: '1px solid #30363d',
                height: '100%',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {borderColor: '#ff9800'},
              }}>
              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                sx={{mb: 2}}>
                <ElectricalServicesIcon sx={{color: '#ff9800'}} />
                <Typography variant='h6' sx={{color: '#fff'}}>
                  Витая пара
                </Typography>
              </Stack>
              <Typography
                variant='body2'
                sx={{color: '#8b949e', mb: 2, flexGrow: 1}}>
                Основана на медных проводах. Передает{' '}
                <b>электрические импульсы</b>, представляющие двоичные данные.
                Это тот самый кабель <b>CAT 5 (Ethernet)</b>, который мы видим в
                кабинетах информатики.
              </Typography>
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: '#0d1117',
                  borderRadius: 2,
                  textAlign: 'center',
                }}>
                <Typography
                  variant='caption'
                  sx={{color: '#ff9800', fontWeight: 'bold', display: 'block'}}>
                  ⚡ Электрический сигнал
                </Typography>
                <Typography
                  variant='caption'
                  sx={{color: '#58a6ff', fontSize: '10px'}}>
                  До 100 метров без потерь
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* 2. ОПТОВОЛОКНО (СВЕТ) */}
          <Grid size={{xs: 12, md: 4}}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#161b22',
                border: '1px solid #30363d',
                height: '100%',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {borderColor: '#00bcd4'},
              }}>
              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                sx={{mb: 2}}>
                <RouterIcon sx={{color: '#00bcd4'}} />
                <Typography variant='h6' sx={{color: '#fff'}}>
                  Оптоволокно
                </Typography>
              </Stack>
              <Typography
                variant='body2'
                sx={{color: '#8b949e', mb: 2, flexGrow: 1}}>
                Содержит оптическое волокно, передающее <b>световые импульсы</b>{' '}
                вместо электричества. Способно передавать в разы больше данных
                на огромные расстояния (через океаны).
              </Typography>
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: '#0d1117',
                  borderRadius: 2,
                  textAlign: 'center',
                }}>
                <Typography
                  variant='caption'
                  sx={{color: '#00bcd4', fontWeight: 'bold', display: 'block'}}>
                  ✨ Световой сигнал (Лазер)
                </Typography>
                <Typography
                  variant='caption'
                  sx={{color: '#2dd4bf', fontSize: '10px'}}>
                  Минимальные задержки
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* 3. БЕСПРОВОДНАЯ СЕТЬ (РАДИОВОЛНЫ) */}
          <Grid size={{xs: 12, md: 4}}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#161b22',
                border: '2px solid #a371f7',
                height: '100%',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                sx={{mb: 2}}>
                <WirelessIcon sx={{color: '#a371f7'}} />
                <Typography variant='h6' sx={{color: '#fff'}}>
                  Беспроводная сеть
                </Typography>
              </Stack>
              <Typography
                variant='body2'
                sx={{color: '#8b949e', mb: 2, flexGrow: 1}}>
                Сетевая карта превращает <b>0 и 1</b> в <b>радиоволны</b> и
                передает их по воздуху. Не требует физических проводов для
                конечного устройства.
              </Typography>

              {/* АНИМАЦИЯ РАДИОВОЛНЫ */}
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: '#0d1117',
                  borderRadius: 2,
                  textAlign: 'center',
                  border: '1px dashed #a371f7',
                  overflow: 'hidden',
                }}>
                <Stack
                  direction='row'
                  spacing={0.8}
                  justifyContent='center'
                  alignItems='center'
                  sx={{height: 24}}>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 4,
                        bgcolor: '#a371f7',
                        borderRadius: 1,
                        animation: `waveAnim 1.2s ease-in-out infinite ${i * 0.15}s`,
                        '@keyframes waveAnim': {
                          '0%, 100%': {height: 4, opacity: 0.3},
                          '50%': {height: 20, opacity: 1},
                        },
                      }}
                    />
                  ))}
                </Stack>
                <Typography
                  variant='caption'
                  sx={{
                    color: '#a371f7',
                    fontWeight: 'bold',
                    mt: 1,
                    display: 'block',
                    fontSize: '10px',
                  }}>
                  📡 0101 → РАДИОВОЛНА
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* ТАБ 2: КАЛЬКУЛЯТОР И ПРОПУСКНАЯ СПОСОБНОСТЬ */}
      {activeTab === 1 && (
        <Paper
          sx={{
            p: 4,
            bgcolor: '#161b22',
            border: '1px solid #30363d',
            borderRadius: 4,
          }}>
          <Typography variant='h6' sx={{color: '#fff', mb: 3}}>
            Лабораторная: Расчет времени передачи
          </Typography>

          <Grid container spacing={4}>
            <Grid size={{xs: 12, md: 5}}>
              <Stack spacing={3}>
                <TextField
                  label='Размер файла (Мбайт)'
                  type='number'
                  value={fileSize}
                  onChange={(e) => setFileSize(Number(e.target.value))}
                  fullWidth
                  sx={{
                    input: {color: '#fff'},
                    label: {color: '#8b949e'},
                    bgcolor: '#0d1117',
                  }}
                />
                <TextField
                  label='Пропускная способность (Мбит/с)'
                  type='number'
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  fullWidth
                  sx={{
                    input: {color: '#fff'},
                    label: {color: '#8b949e'},
                    bgcolor: '#0d1117',
                  }}
                />
                <Typography variant='caption' sx={{color: '#8b949e'}}>
                  * По данным учебника, средняя скорость в Казахстане: 12-17
                  Мбит/с.
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{xs: 12, md: 7}}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: '#0d1117',
                  borderRadius: 3,
                  border: '1px solid #2196f3',
                  textAlign: 'center',
                }}>
                <Typography variant='subtitle2' sx={{color: '#8b949e', mb: 1}}>
                  ФОРМУЛА: t = I / V
                </Typography>
                <Typography
                  variant='h4'
                  sx={{color: '#2196f3', mb: 2, fontWeight: 'bold'}}>
                  {timeSeconds.toFixed(2)} сек.
                </Typography>
                <Divider sx={{my: 2, bgcolor: '#30363d'}} />
                <Typography variant='body2' sx={{color: '#fff'}}>
                  Файл объемом <b>{fileSize} Мбайт</b> при скорости{' '}
                  <b>{speed} Мбит/с</b> будет передаваться примерно{' '}
                  <b>{timeSeconds.toFixed(1)}</b> секунд.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{mt: 4}}>
            <Typography variant='subtitle2' sx={{color: '#8b949e', mb: 2}}>
              Рекомендуемые сервисы для замера (из учебника):
            </Typography>
            <Stack direction='row' spacing={2} flexWrap='wrap'>
              {['Speedtest.net', '2ip.ru', 'Яндекс.Интернетометр'].map(
                (service) => (
                  <Chip
                    key={service}
                    label={service}
                    onClick={() => {}}
                    sx={{
                      color: '#fff',
                      bgcolor: '#30363d',
                      '&:hover': {bgcolor: '#2196f3'},
                    }}
                  />
                ),
              )}
            </Stack>
          </Box>
        </Paper>
      )}
    </Box>
  )
}
