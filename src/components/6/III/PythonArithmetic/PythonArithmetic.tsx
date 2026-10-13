import CalculateIcon from '@mui/icons-material/Calculate'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material'
import {Grid} from '@mui/material' // Ваш стандарт
import {useState} from 'react'
import ClearIcon from '@mui/icons-material/Clear'

// Операции из таблицы 2 параграфа 19
const operations = [
  {op: '+', name: 'Сложение', desc: 'Складывает два числа'},
  {op: '-', name: 'Вычитание', desc: 'Вычитает второе из первого'},
  {op: '*', name: 'Произведение', desc: 'Умножает числа'},
  {op: '/', name: 'Деление', desc: 'Результат всегда float'},
  {op: '%', name: 'Остаток от деления', desc: 'Возвращает остаток'},
  {op: '//', name: 'Целая часть', desc: 'Деление нацело'},
  {op: '**', name: 'Возведение в степень', desc: 'Число x в степени y'},
]

export const PythonArithmetic = () => {
  // Используем строку для стейта ввода, чтобы было удобно стирать цифры
  const [valA, setValA] = useState<string>('10')
  const [valB, setValB] = useState<string>('3')

  const numA = parseFloat(valA) || 0
  const numB = parseFloat(valB) || 0

  const calculate = (op: string) => {
    try {
      switch (op) {
        case '+':
          return numA + numB
        case '-':
          return numA - numB
        case '*':
          return numA * numB
        case '/':
          return numB !== 0 ? (numA / numB).toFixed(2) : '∞'
        case '%':
          return numB !== 0 ? numA % numB : 'Error'
        case '//':
          return numB !== 0 ? Math.floor(numA / numB) : 'Error'
        case '**':
          return Math.pow(numA, numB).toLocaleString()
        default:
          return 0
      }
    } catch (e) {
      return 'Error'
    }
  }

  return (
    <Container maxWidth='lg' sx={{py: 6}}>
      <Typography
        variant='h4'
        sx={{fontWeight: 900, mb: 4, textAlign: 'center', color: '#4caf50'}}>
        Арифметические <span style={{color: '#fff'}}>операции Python</span>
      </Typography>

      <Grid container spacing={4}>
        {/* Ввод данных — реализовано как в image_e6cfc7.png */}
        <Grid size={{xs: 12, md: 4}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: 3,
            }}>
            <Typography
              variant='h6'
              sx={{
                color: '#fff',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}>
              <CalculateIcon color='success' /> Входные данные
            </Typography>

            <Stack spacing={3}>
              <TextField
                fullWidth
                label='Переменная A'
                variant='outlined'
                value={valA}
                onChange={(e) => setValA(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: valA && (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => setValA('')}
                          edge='end'
                          sx={{color: '#8b949e'}}>
                          <ClearIcon fontSize='small' />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {borderColor: '#30363d'},
                    '&:hover fieldset': {borderColor: '#4caf50'},
                    '&.Mui-focused fieldset': {borderColor: '#4caf50'},
                  },
                  '& .MuiInputLabel-root': {color: '#8b949e'},
                }}
              />

              <TextField
                fullWidth
                label='Переменная B'
                variant='outlined'
                value={valB}
                onChange={(e) => setValB(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: valB && (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => setValB('')}
                          edge='end'
                          sx={{color: '#8b949e'}}>
                          <ClearIcon fontSize='small' />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {borderColor: '#30363d'},
                    '&:hover fieldset': {borderColor: '#4caf50'},
                    '&.Mui-focused fieldset': {borderColor: '#4caf50'},
                  },
                  '& .MuiInputLabel-root': {color: '#8b949e'},
                }}
              />
            </Stack>
          </Paper>
        </Grid>

        {/* Таблица результатов */}
        <Grid size={{xs: 12, md: 8}}>
          <Paper
            sx={{
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 3,
              overflow: 'hidden',
            }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1.5fr 1.5fr',
                p: 2,
                bgcolor: '#0d1117',
                color: '#8b949e',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}>
              <Box>Знак</Box>
              <Box>Действие</Box>
              <Box>Выражение</Box>
              <Box sx={{textAlign: 'right'}}>Результат</Box>
            </Box>
            <Divider sx={{borderColor: '#30363d'}} />

            {operations.map((item) => (
              <Box
                key={item.op}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr 1.5fr 1.5fr',
                  p: 2,
                  alignItems: 'center',
                  borderBottom: '1px solid #30363d',
                  '&:last-child': {border: 'none'},
                  '&:hover': {bgcolor: '#1e2633'},
                }}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: '#4caf50',
                    fontSize: '1.2rem',
                  }}>
                  {item.op}
                </Typography>
                <Typography variant='body2' sx={{color: '#abb2bf'}}>
                  {item.name}
                </Typography>
                <Typography
                  variant='caption'
                  sx={{color: '#8b949e', fontFamily: 'monospace'}}>
                  {numA} {item.op} {numB}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: '#ffcc00',
                    textAlign: 'right',
                  }}>
                  {calculate(item.op)}
                </Typography>
              </Box>
            ))}
          </Paper>

          <Box
            sx={{
              mt: 3,
              p: 2,
              bgcolor: 'rgba(76, 175, 80, 0.05)',
              borderRadius: 2,
              border: '1px dashed #4caf50',
            }}>
            <Typography
              variant='caption'
              sx={{
                color: '#81c784',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}>
              <HelpOutlineIcon fontSize='small' />
              <b>Справка:</b> В Python результат деления `/` всегда является
              типом `float`.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
