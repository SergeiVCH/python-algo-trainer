import TextFieldsIcon from '@mui/icons-material/TextFields'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import SearchIcon from '@mui/icons-material/Search'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import ReplayIcon from '@mui/icons-material/Replay'
import TransformIcon from '@mui/icons-material/Transform'
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

export const StringLab = () => {
  const [strValue, setStrValue] = useState<string>('Python10')
  const [inputVal, setInputVal] = useState<string>('Python10')
  const [log, setLog] = useState<string[]>([
    '💡 Тренажёр строк инициализирован. Введите текст или примените методы.',
  ])

  // Обновление строки из текстового поля
  const handleApplyText = () => {
    setStrValue(inputVal)
    setLog((prev) => [`s = "${inputVal}" (Строка обновлена)`, ...prev])
  }

  // --- МЕТОДЫ РАБОТЫ СО СТРОКАМИ ---
  const handleUpper = () => {
    const res = strValue.toUpperCase()
    setStrValue(res)
    setInputVal(res)
    setLog((prev) => [`s.upper() -> "${res}"`, ...prev])
  }

  const handleLower = () => {
    const res = strValue.toLowerCase()
    setStrValue(res)
    setInputVal(res)
    setLog((prev) => [`s.lower() -> "${res}"`, ...prev])
  }

  const handleReverse = () => {
    const res = strValue.split('').reverse().join('')
    setStrValue(res)
    setInputVal(res)
    setLog((prev) => [`s[::-1] -> "${res}" (Реверс строки)`, ...prev])
  }

  const handleSlice = () => {
    // Пример среза первых 3 символов: s[0:3]
    const res = strValue.slice(0, 3)
    setLog((prev) => [`s[0:3] -> "${res}" (Срез подстроки)`, ...prev])
  }

  const handleLen = () => {
    setLog((prev) => [`len(s) -> ${strValue.length} (Длина строки)`, ...prev])
  }

  const handleReset = () => {
    setStrValue('Python10')
    setInputVal('Python10')
    setLog(['🔄 Строка сброшена к исходному значению.'])
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
          <TextFieldsIcon sx={{ fontSize: 45, color: '#2196f3' }} />
          Лаборатория строк (Strings)
        </Typography>
        <Typography variant='h6' sx={{ color: '#8b949e' }}>
          Интерактивный практикум по обработке символьных данных в Python (10 класс)
        </Typography>
      </Box>

      {/* Визуализация ячеек памяти строки (посимвольно) */}
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
            Memory View (Символы строки s):
          </Typography>
          <Chip
            label={`len = ${strValue.length}`}
            variant='outlined'
            sx={{ color: '#fff', borderColor: '#30363d' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            minHeight: 80,
            justifyContent: 'center',
          }}>
          {strValue.split('').map((char, idx) => (
            <Box key={idx} sx={{ textAlign: 'center' }}>
              <Tooltip title={`Index: ${idx}`}>
                <Paper
                  sx={{
                    width: 55,
                    height: 55,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#161b22',
                    border: '2px solid #2196f3',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    borderRadius: 2,
                  }}>
                  {char}
                </Paper>
              </Tooltip>
              <Typography
                variant='caption'
                sx={{ color: '#8b949e', mt: 0.5, display: 'block' }}>
                [{idx}]
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Блок 1: Ввод строки и методы */}
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
                Управление строкой
              </Typography>

              <Box sx={{ mb: 3 }}>
                <TextField
                  label='Значение строки s'
                  size='small'
                  fullWidth
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  sx={{
                    input: { color: '#fff' },
                    label: { color: '#8b949e' },
                    fieldset: { borderColor: '#30363d' },
                    mb: 1.5,
                  }}
                />
                <Button
                  fullWidth
                  variant='contained'
                  onClick={handleApplyText}
                  sx={{
                    bgcolor: '#238636',
                    '&:hover': { bgcolor: '#2ea043' },
                  }}>
                  Применить строку
                </Button>
              </Box>

              <Grid container spacing={1.5}>
                <Grid size={{ xs: 6 }}>
                  <Button
                    fullWidth
                    size='small'
                    variant='outlined'
                    startIcon={<TransformIcon />}
                    onClick={handleUpper}
                    sx={{ borderColor: '#30363d', color: '#58a6ff' }}>
                    upper()
                  </Button>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Button
                    fullWidth
                    size='small'
                    variant='outlined'
                    startIcon={<TransformIcon />}
                    onClick={handleLower}
                    sx={{ borderColor: '#30363d', color: '#58a6ff' }}>
                    lower()
                  </Button>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Button
                    fullWidth
                    size='small'
                    variant='outlined'
                    startIcon={<SwapHorizIcon />}
                    onClick={handleReverse}
                    sx={{ borderColor: '#30363d', color: '#4caf50' }}>
                    s[::-1]
                  </Button>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Button
                    fullWidth
                    size='small'
                    variant='outlined'
                    startIcon={<ContentCutIcon />}
                    onClick={handleSlice}
                    sx={{ borderColor: '#30363d', color: '#ff9800' }}>
                    s[0:3]
                  </Button>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    fullWidth
                    size='small'
                    variant='outlined'
                    startIcon={<SearchIcon />}
                    onClick={handleLen}
                    sx={{ borderColor: '#30363d', color: '#00bcd4' }}>
                    len(s)
                  </Button>
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant='text'
                color='inherit'
                startIcon={<ReplayIcon />}
                onClick={handleReset}
                sx={{ mt: 2, color: '#8b949e', fontSize: '0.8rem' }}>
                Сбросить по умолчанию
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
              Строка в Python — это неизменяемый упорядоченный набор символов с нумерацией индексов от <code>0</code>.
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
                maxHeight: 280,
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

export default StringLab