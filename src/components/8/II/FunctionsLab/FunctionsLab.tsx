import AbcIcon from '@mui/icons-material/Abc'
import CalculateIcon from '@mui/icons-material/Calculate'
import FunctionsIcon from '@mui/icons-material/Functions'
import {
    Alert,
    Box,
    Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography
} from '@mui/material'
import { useState } from 'react'

export const FunctionsLab = () => {
  const [numbers, setNumbers] = useState('10, -20.5, 30, 40, 50')
  const [textInput, setTextInput] = useState('Информатика')
  const [mathVal, setMathVal] = useState('5') // Для КОРЕНЬ, ФАКТР, ABS

  // Вспомогательная функция для факториала
  const getFactorial = (n: number): number => (n <= 1 ? 1 : n * getFactorial(n - 1))

  // Обработка основного списка чисел
  const numRay = numbers
    .split(',')
    .map((n) => parseFloat(n.trim()))
    .filter((n) => !isNaN(n))

  const stats = {
    sum: numRay.reduce((a, b) => a + b, 0),
    avg: numRay.length ? (numRay.reduce((a, b) => a + b, 0) / numRay.length).toFixed(2) : 0,
    min: numRay.length ? Math.min(...numRay) : 0,
    max: numRay.length ? Math.max(...numRay) : 0,
    prod: numRay.length ? numRay.reduce((a, b) => a * b, 1).toFixed(0) : 0, // ПРОИЗВЕД()
    sumIf: numRay.filter(n => n > 0).reduce((a, b) => a + b, 0), // СУММЕСЛИ (при условии > 0)
  }

  const singleNum = parseFloat(mathVal) || 0

  return (
    <Box sx={{ py: 4, maxWidth: 1100, margin: '0 auto' }}>
      <Typography variant='h4' sx={{ mb: 4, fontWeight: 900, textAlign: 'center', color: '#fff', display: 'flex', justifyContent: 'center', gap: 2 }}>
        <FunctionsIcon sx={{ fontSize: 40, color: '#ed6c02' }} />
        Встроенные функции <Box component='span' sx={{ color: '#ed6c02' }}>Excel</Box>
      </Typography>

      <Grid container spacing={3}>
        {/* БЛОК 1: СТАТИСТИКА, СУММЫ И АНАЛИЗ */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b22', border: '1px solid #30363d', borderRadius: 4, height: '100%' }}>
            <Typography variant='h6' sx={{ color: '#ed6c02', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalculateIcon /> Статистика и Анализ
            </Typography>
            <TextField
              fullWidth
              label='Массив чисел (СУММ, СРЗНАЧ, ПРОИЗВЕД)'
              variant='filled'
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              sx={{ bgcolor: '#0d1117', input: { color: '#fff' }, mb: 3, borderRadius: 1 }}
            />
            <TableContainer>
              <Table size='small'>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#8b949e', border: 0 }}>СУММ()</TableCell>
                    <TableCell sx={{ color: '#fff', border: 0, fontWeight: 'bold' }}>{stats.sum}</TableCell>
                    <TableCell sx={{ color: '#4caf50', border: 0 }}>Сумма всех</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#8b949e', border: 0 }}>СУММЕСЛИ()</TableCell>
                    <TableCell sx={{ color: '#fff', border: 0, fontWeight: 'bold' }}>{stats.sumIf}</TableCell>
                    <TableCell sx={{ color: '#4caf50', border: 0 }}>Сумма если {'>'} 0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#8b949e', border: 0 }}>ПРОИЗВЕД()</TableCell>
                    <TableCell sx={{ color: '#fff', border: 0, fontWeight: 'bold' }}>{stats.prod}</TableCell>
                    <TableCell sx={{ color: '#4caf50', border: 0 }}>Перемножение</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#8b949e', border: 0 }}>СРЗНАЧ()</TableCell>
                    <TableCell sx={{ color: '#fff', border: 0, fontWeight: 'bold' }}>{stats.avg}</TableCell>
                    <TableCell sx={{ color: '#4caf50', border: 0 }}>Среднее</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* БЛОК 2: МАТЕМАТИЧЕСКИЕ ОПЕРАЦИИ (ABS, КОРЕНЬ, ФАКТР) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b22', border: '1px solid #30363d', borderRadius: 4, height: '100%' }}>
            <Typography variant='h6' sx={{ color: '#ed6c02', mb: 2 }}>Математика (ABS, ФАКТР, КОРЕНЬ)</Typography>
            <TextField
              fullWidth
              label='Число для вычислений'
              type='number'
              variant='filled'
              value={mathVal}
              onChange={(e) => setMathVal(e.target.value)}
              sx={{ bgcolor: '#0d1117', input: { color: '#fff' }, mb: 3, borderRadius: 1 }}
            />
            <TableContainer>
              <Table size='small'>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#8b949e', border: 0 }}>ABS()</TableCell>
                    <TableCell sx={{ color: '#fff', border: 0, fontWeight: 'bold' }}>{Math.abs(singleNum)}</TableCell>
                    <TableCell sx={{ color: '#4caf50', border: 0 }}>Модуль числа</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#8b949e', border: 0 }}>ФАКТР()</TableCell>
                    <TableCell sx={{ color: '#fff', border: 0, fontWeight: 'bold' }}>
                        {singleNum >= 0 && singleNum <= 12 ? getFactorial(Math.floor(singleNum)) : 'n/a'}
                    </TableCell>
                    <TableCell sx={{ color: '#4caf50', border: 0 }}>Факториал (n!)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#8b949e', border: 0 }}>ЧИСЛОКОМБ()</TableCell>
                    <TableCell sx={{ color: '#fff', border: 0, fontWeight: 'bold' }}>10</TableCell>
                    <TableCell sx={{ color: '#4caf50', border: 0 }}>Комбинации (5 из 2)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#8b949e', border: 0 }}>СЛЧИС()</TableCell>
                    <TableCell sx={{ color: '#fff', border: 0, fontWeight: 'bold' }}>{Math.random().toFixed(3)}</TableCell>
                    <TableCell sx={{ color: '#4caf50', border: 0 }}>Случ. от 0 до 1</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* БЛОК 3: ОКРУГЛЕНИЕ (ОКРУГЛ, ОТБР, ЦЕЛОЕ) */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, bgcolor: '#0d1117', border: '2px solid #30363d', borderRadius: 4 }}>
            <Typography variant='h6' sx={{ color: '#fff', mb: 3, textAlign: 'center' }}>
              Работа с разрядами (ОКРУГЛ, ОТБР, ЦЕЛОЕ)
            </Typography>
            <Grid container spacing={2} justifyContent='center'>
               {[
                 { label: 'ОКРУГЛ(x; 0)', val: Math.round(singleNum), color: '#4caf50' },
                 { label: 'ОТБР(x)', val: Math.trunc(singleNum), color: '#29b6f6' },
                 { label: 'ЦЕЛОЕ(x)', val: Math.floor(singleNum), color: '#f44336' }
               ].map((item, idx) => (
                 <Grid size={{ xs: 12, sm: 4 }} key={idx}>
                    <Box sx={{ p: 2, bgcolor: '#161b22', borderRadius: 2, textAlign: 'center' }}>
                      <Typography variant='h5' sx={{ color: item.color, fontWeight: 'bold' }}>{item.val}</Typography>
                      <Typography variant='caption' sx={{ color: '#8b949e' }}>{item.label}</Typography>
                    </Box>
                 </Grid>
               ))}
            </Grid>
          </Paper>
        </Grid>

        {/* БЛОК 4: ТЕКСТ И ЛОГИКА */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b22', border: '1px solid #30363d', borderRadius: 4 }}>
            <Typography variant='h6' sx={{ color: '#29b6f6', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <AbcIcon /> Текст и Логика
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label='Текст для обработки'
                  variant='filled'
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  sx={{ bgcolor: '#0d1117', input: { color: '#fff' }, mb: 2 }}
                />
                <Typography variant='body2' sx={{ color: '#8b949e' }}>
                  <b>ДЛСТР:</b> {textInput.length} | <b>СТРОЧН:</b> {textInput.toLowerCase()}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Alert severity='info' sx={{ bgcolor: '#0d1117', color: '#8b949e', border: '1px solid #30363d' }}>
                  <b>ЕСЛИ:</b> <code>=ЕСЛИ(ДЛСТР(A1)&gt;10; "Длинное"; "Короткое")</code>
                  <br />
                  Результат: <b>{textInput.length > 10 ? 'Длинное' : 'Короткое'}</b>
                </Alert>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}