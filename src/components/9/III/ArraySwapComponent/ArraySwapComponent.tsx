import ReplayIcon from '@mui/icons-material/Replay'
import StorageIcon from '@mui/icons-material/Storage'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { useState } from 'react'

export const ArraySwapComponent = () => {
  const [array, setArray] = useState<number[]>([15, 8, 23, 4, 42, 16])
  const [index1, setIndex1] = useState<number>(0)
  const [index2, setIndex2] = useState<number>(1)
  const [log, setLog] = useState<string[]>([
    '💡 Тренажёр инициализирован. Выберите индексы и выполните swap.',
  ])

  // --- МЕТОД ПЕРЕСТАНОВКИ (SWAP) ---
  const handleSwap = () => {
    if (
      index1 < 0 ||
      index1 >= array.length ||
      index2 < 0 ||
      index2 >= array.length
    ) {
      alert(`Ошибка: индексы должны быть в диапазоне от 0 до ${array.length - 1}`)
      return
    }

    const newArr = [...array]
    const temp = newArr[index1]
    newArr[index1] = newArr[index2]
    newArr[index2] = temp

    setArray(newArr)
    setLog((prev) => [
      `arr[${index1}], arr[${index2}] = arr[${index2}], arr[${index1}] (Успешно)`,
      ...prev,
    ])
  }

  const handleReset = () => {
    setArray([15, 8, 23, 4, 42, 16])
    setIndex1(0)
    setIndex2(1)
    setLog(['🔄 Массив сброшен к исходным значениям.'])
  }

  return (
    <Container maxWidth='lg' sx={{ py: 6 }}>
      {/* Шапка компоненты */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography
          variant='h3'
          sx={{
            fontWeight: 900,
            color: '#fff',
            mb: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}>
          <StorageIcon sx={{ fontSize: 45, color: '#2196f3' }} />
          Перестановка элементов (Swap)
        </Typography>
        <Typography variant='h6' sx={{ color: '#8b949e' }}>
          Интерактивный метод обмена элементов в списках Python
        </Typography>
      </Box>

      {/* Визуализация ячеек памяти */}
      <Paper
        sx={{
          p: 4,
          bgcolor: '#0d1117',
          border: '1px solid #30363d',
          borderRadius: 4,
          mb: 4,
        }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography
            variant='subtitle1'
            sx={{ color: '#58a6ff', fontWeight: 'bold' }}>
            Memory View (Массив arr):
          </Typography>
          <Chip
            label={`len = ${array.length}`}
            variant='outlined'
            sx={{ color: '#fff', borderColor: '#30363d' }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, minHeight: 80, justifyContent: 'center' }}>
          {array.map((val, idx) => {
            const isSelected = idx === index1 || idx === index2
            return (
              <Box key={idx} sx={{ textAlign: 'center' }}>
                <Tooltip title={`Index: ${idx}`}>
                  <Paper
                    sx={{
                      width: 60,
                      height: 60,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      bgcolor: isSelected ? '#1f6feb' : '#161b22',
                      border: `2px solid ${isSelected ? '#58a6ff' : '#2196f3'}`,
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    }}>
                    {val}
                  </Paper>
                </Tooltip>
                <Typography
                  variant='caption'
                  sx={{ color: '#8b949e', mt: 0.5, display: 'block' }}>
                  [{idx}]
                </Typography>
              </Box>
            )
          })}
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Блок 1: Настройка индексов и теория */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Box>
              <Typography
                variant='subtitle1'
                sx={{ color: '#00bcd4', mb: 2, fontWeight: 'bold' }}>
                Параметры Swap
              </Typography>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label='Индекс i'
                    type='number'
                    size='small'
                    fullWidth
                    value={index1}
                    onChange={(e) => setIndex1(Number(e.target.value))}
                    inputProps={{ min: 0, max: array.length - 1 }}
                    sx={{
                      input: { color: '#fff' },
                      label: { color: '#8b949e' },
                      fieldset: { borderColor: '#30363d' },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label='Индекс j'
                    type='number'
                    size='small'
                    fullWidth
                    value={index2}
                    onChange={(e) => setIndex2(Number(e.target.value))}
                    inputProps={{ min: 0, max: array.length - 1 }}
                    sx={{
                      input: { color: '#fff' },
                      label: { color: '#8b949e' },
                      fieldset: { borderColor: '#30363d' },
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant='contained'
                startIcon={<SwapHorizIcon />}
                onClick={handleSwap}
                sx={{ bgcolor: '#238636', mb: 2, '&:hover': { bgcolor: '#2ea043' } }}>
                Поменять местами
              </Button>

              <Button
                fullWidth
                variant='outlined'
                color='inherit'
                startIcon={<ReplayIcon />}
                onClick={handleReset}
                sx={{ borderColor: '#30363d', color: '#8b949e' }}>
                Сбросить массив
              </Button>
            </Box>

            <Alert
              severity='info'
              sx={{
                mt: 3,
                bgcolor: 'transparent',
                color: '#8b949e',
                border: '1px solid #30363d',
              }}>
              В Python обмен реализуется через множественное присваивание: <br />
              <code>arr[i], arr[j] = arr[j], arr[i]</code>
            </Alert>
          </Paper>
        </Grid>

        {/* Блок 2: Виртуальная консоль логов */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography
                variant='subtitle1'
                sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                Виртуальная консоль Python
              </Typography>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#238636',
                  alignSelf: 'center',
                }}
              />
            </Box>

            <Box
              sx={{
                flex: 1,
                bgcolor: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: 2,
                p: 2,
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                color: '#8b949e',
                maxHeight: 220,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}>
              {log.map((entry, index) => (
                <Box
                  key={index}
                  sx={{
                    borderBottom: '1px solid #161b22',
                    pb: 0.5,
                    color: index === 0 ? '#58a6ff' : '#8b949e',
                  }}>
                  {entry}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ArraySwapComponent