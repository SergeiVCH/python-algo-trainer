import CalculateIcon from '@mui/icons-material/Calculate'
import StorageIcon from '@mui/icons-material/Storage'
import {
    Alert,
    Box,
    Chip,
    Divider,
    Grid,
    Paper,
    Slider,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { useState } from 'react'

export const InfoMeasurementLab = () => {
  // Базовая единица — биты. Для больших чисел используем BigInt или обычный number (JS потянет до 2^53 без потерь)
  const [bits, setBits] = useState<number>(8589934592) // По умолчанию 1 Гбайт в битах

  // Константа множителя (1024)
  const K = 1024

  // Функции обновления
  const update = (val: number, factor: number) => setBits(val * factor)

  // Данные для полей (Коэффициенты пересчета относительно БИТА)
  const unitConfig = [
    {label: 'Бит', color: '#79c0ff', factor: 1},
    {label: 'Байт', color: '#2dd4bf', factor: 8},
    {label: 'Кбайт', color: '#d29922', factor: 8 * K},
    {label: 'Мбайт', color: '#ff7b72', factor: 8 * K ** 2},
    {label: 'Гбайт', color: '#a371f7', factor: 8 * K ** 3},
    {label: 'Тбайт', color: '#4caf50', factor: 8 * K ** 4},
    {label: 'Пбайт', color: '#f06292', factor: 8 * K ** 5},
    {label: 'Эбайт', color: '#81d4fa', factor: 8 * K ** 6},
    {label: 'Збайт', color: '#fff176', factor: 8 * K ** 7},
  ]

  // Форматирование: если число очень маленькое или большое, используем экспоненту для красоты
  const formatValue = (val: number) => {
    if (val === 0) return '0'
    if (val < 0.000001 || val > 1e15) return val.toExponential(2)
    return Number(val.toFixed(6)).toString()
  }

  // --- Состояния для Хартли ---
  const [powerN, setPowerN] = useState<number>(32)
  const [symbolsCount, setSymbolsCount] = useState<number>(100)
  const weight_i = Math.log2(powerN)
  const totalInfo = weight_i * symbolsCount

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
        <CalculateIcon sx={{fontSize: 40, color: '#00bcd4'}} />
        <Box component='span' sx={{color: '#fff'}}>
          Измерение
        </Box>
        <Box component='span' sx={{color: '#00bcd4'}}>
          информации
        </Box>
      </Typography>

      <Grid container spacing={3}>
        {/* РАСШИРЕННАЯ ЛЕСТНИЦА */}
        <Grid size={{xs: 12}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 4,
            }}>
            <Stack direction='row' alignItems='center' spacing={1} sx={{mb: 3}}>
              <StorageIcon sx={{color: '#00bcd4'}} />
              <Typography variant='h6' sx={{color: '#fff'}}>
                Глобальный конвертер единиц
              </Typography>
            </Stack>

            <Grid container spacing={2}>
              {unitConfig.map((unit) => (
                <Grid size={{xs: 12, sm: 6, md: 4, lg: 2.4}} key={unit.label}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: '#0d1117',
                      borderRadius: 2,
                      border: '1px solid #30363d',
                      transition: '0.2s',
                      '&:focus-within': {borderColor: unit.color},
                    }}>
                    <Typography
                      variant='caption'
                      sx={{color: unit.color, fontWeight: 'bold'}}>
                      {unit.label}
                    </Typography>
                    <TextField
                      fullWidth
                      variant='standard'
                      type='text'
                      value={formatValue(bits / unit.factor)}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value.replace(',', '.'))
                        if (!isNaN(val)) update(val, unit.factor)
                      }}
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          color: '#fff',
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          fontFamily: 'monospace',
                        },
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* МОЩНОСТЬ АЛФАВИТА */}
        <Grid size={{xs: 12, md: 6}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              height: '100%',
              borderRadius: 4,
            }}>
            <Typography
              variant='subtitle1'
              sx={{color: '#2dd4bf', mb: 2, fontWeight: 'bold'}}>
              Мощность алфавита (N)
            </Typography>
            <Slider
              value={powerN}
              min={2}
              max={256}
              step={null}
              marks={[
                {value: 2, label: '2'},
                {value: 8, label: '8'},
                {value: 16, label: '16'},
                {value: 32, label: '32'},
                {value: 64, label: '64'},
                {value: 128, label: '128'},
                {value: 256, label: '256'},
              ]}
              onChange={(_, v) => setPowerN(v as number)}
              sx={{color: '#00bcd4', mb: 4}}
            />
            <Box
              sx={{
                p: 2,
                bgcolor: '#0d1117',
                borderRadius: 2,
                border: '1px solid #30363d',
                textAlign: 'center',
              }}>
              <Typography variant='h4' sx={{color: '#ff7b72'}}>
                N = 2<sup>i</sup>
              </Typography>
              <Divider sx={{my: 2, bgcolor: '#30363d'}} />
              <Typography sx={{color: '#fff'}}>
                При N = {powerN}, i = <b>{weight_i} бит</b>
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* ОБЪЕМ ТЕКСТА */}
        <Grid size={{xs: 12, md: 6}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              height: '100%',
              borderRadius: 4,
            }}>
            <Typography
              variant='subtitle1'
              sx={{color: '#2dd4bf', mb: 2, fontWeight: 'bold'}}>
              Объем текста (I)
            </Typography>
            <Stack spacing={2}>
              <TextField
                label='Количество символов (K)'
                fullWidth
                type='number'
                value={symbolsCount}
                onChange={(e) => setSymbolsCount(Number(e.target.value))}
                sx={{
                  bgcolor: '#0d1117',
                  input: {color: '#79c0ff'},
                  label: {color: '#8b949e'},
                }}
              />
              <Box
                sx={{
                  p: 2,
                  bgcolor: '#0d1117',
                  borderRadius: 2,
                  border: '1px solid #238636',
                  textAlign: 'center',
                }}>
                <Typography
                  variant='h5'
                  sx={{color: '#2dd4bf', fontWeight: 'bold'}}>
                  I = K × i
                </Typography>
                <Typography sx={{color: '#fff'}}>
                  {symbolsCount} × {weight_i} = <b>{totalInfo} бит</b>
                </Typography>
                <Stack
                  direction='row'
                  spacing={1}
                  justifyContent='center'
                  sx={{mt: 1}}>
                  <Chip
                    label={`${(totalInfo / 8).toFixed(2)} Байт`}
                    size='small'
                    sx={{bgcolor: '#238636', color: '#fff'}}
                  />
                  <Chip
                    label={`${(totalInfo / (8 * 1024)).toFixed(4)} Кб`}
                    size='small'
                    sx={{bgcolor: '#1f6feb', color: '#fff'}}
                  />
                </Stack>
              </Box>
              <Alert
                severity='info'
                sx={{
                  bgcolor: '#0d1117',
                  color: '#79c0ff',
                  border: '1px solid #30363d',
                }}>
                Попробуй ввести 1 Гбайт в конвертер выше, чтобы увидеть сколько
                это в битах!
              </Alert>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
