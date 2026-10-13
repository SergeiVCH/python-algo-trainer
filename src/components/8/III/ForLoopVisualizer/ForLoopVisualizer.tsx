import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import TerminalIcon from '@mui/icons-material/Terminal'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {useState} from 'react'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const ForLoopVisualizer = () => {
  const [start, setStart] = useState(0)
  const [stop, setStop] = useState(5)
  const [currentVal, setCurrentVal] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [activeLine, setActiveLine] = useState(-1)

  const rangeArray = Array.from(
    {length: Math.max(0, stop - start)},
    (_, i) => start + i,
  )

  const reset = () => {
    setIsRunning(false)
    setActiveLine(-1)
    setCurrentVal(null)
    setHistory([])
  }

  const runSimulation = async () => {
    setIsRunning(true)
    setHistory([])

    // Цикл по массиву имитирует range()
    for (const value of rangeArray) {
      // 1. Проверка условия / Итерация (Ромб на схеме)
      setActiveLine(0)
      setCurrentVal(value)
      await delay(1000)

      // 2. Выполнение тела (Прямоугольник на схеме)
      setActiveLine(1)
      setHistory((prev) => [...prev, `i = ${value}`])
      await delay(1000)
    }

    // 3. Завершение (Конец на схеме)
    setActiveLine(2)
    setIsRunning(false)
    setHistory((prev) => [...prev, '-- Цикл завершен --'])
    await delay(1000)
    setActiveLine(-1)
  }

  const getLineStyle = (index: number) => ({
    display: 'block',
    bgcolor: activeLine === index ? 'rgba(255, 235, 59, 0.2)' : 'transparent',
    borderRadius: '4px',
    pl: index === 1 ? 4 : 1,
    py: 0.5,
    transition: '0.3s',
    fontFamily: 'monospace',
    fontSize: '1.1rem',
  })

  // Вспомогательная функция для подсветки блоков схемы
  const getBlockProps = (index: number) => ({
    fill: activeLine === index ? '#4caf50' : '#1e1e1e',
    stroke: activeLine === index ? '#deff9a' : '#334155',
    strokeWidth: activeLine === index ? 3 : 1,
    transition: '0.3s',
  })

  return (
    <Box sx={{py: 4, maxWidth: 1100, margin: '0 auto'}}>
      <Typography
        variant='h4'
        sx={{
          mb: 4,
          fontWeight: 900,
          textAlign: 'center',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
        }}>
        <TerminalIcon sx={{fontSize: 40, color: '#4caf50'}} />
        Цикл{' '}
        <Box component='span' sx={{color: '#4caf50'}}>
          for
        </Box>{' '}
        в Python
      </Typography>

      <Grid container spacing={3}>
        {/* ЛЕВАЯ КОЛОНКА: КОД И УПРАВЛЕНИЕ */}
        <Grid size={{xs: 12, md: 5}}>
          <Stack spacing={3}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#1e1e1e',
                border: '1px solid #333',
                borderRadius: 4,
              }}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: '#2d2d2d',
                  borderRadius: 2,
                  borderLeft: '4px solid #4caf50',
                  mb: 3,
                }}>
                <Typography component='div' sx={getLineStyle(0)}>
                  <span style={{color: '#c586c0'}}>for</span>{' '}
                  <span style={{color: '#9cdcfe'}}>i</span>{' '}
                  <span style={{color: '#c586c0'}}>in</span>{' '}
                  <span style={{color: '#dcdcaa'}}>range</span>({start}, {stop}
                  ):
                </Typography>
                <Typography component='div' sx={getLineStyle(1)}>
                  <span style={{color: '#dcdcaa'}}>print</span>(
                  <span style={{color: '#9cdcfe'}}>i</span>)
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size='small'
                    label='Start'
                    type='number'
                    value={start}
                    onChange={(e) => setStart(Number(e.target.value))}
                    disabled={isRunning}
                    sx={{input: {color: '#fff'}, '& label': {color: '#8b949e'}}}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size='small'
                    label='Stop'
                    type='number'
                    value={stop}
                    onChange={(e) => setStop(Number(e.target.value))}
                    disabled={isRunning}
                    sx={{input: {color: '#fff'}, '& label': {color: '#8b949e'}}}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant='contained'
                color='success'
                startIcon={<PlayArrowIcon />}
                onClick={runSimulation}
                disabled={isRunning}
                sx={{mt: 2}}>
                Запустить
              </Button>
              <Button
                fullWidth
                variant='outlined'
                startIcon={<RestartAltIcon />}
                onClick={reset}
                disabled={isRunning}
                sx={{mt: 1, color: '#fff'}}>
                Сброс
              </Button>
            </Paper>

            {/* БЛОК-СХЕМА */}
            <Paper
              sx={{
                p: 2,
                bgcolor: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: 4,
                textAlign: 'center',
              }}>
              <Typography
                variant='caption'
                sx={{color: '#8b949e', mb: 2, display: 'block'}}>
                Алгоритм выполнения (Блок-схема)
              </Typography>
              <svg width='200' height='280' viewBox='0 0 200 280'>
                {/* Линии связи */}
                <line x1='100' y1='40' x2='100' y2='70' stroke='#334155' />
                <line x1='100' y1='130' x2='100' y2='170' stroke='#334155' />
                <path
                  d='M 50 190 L 20 190 L 20 100 L 55 100'
                  fill='none'
                  stroke='#334155'
                />
                <line x1='145' y1='100' x2='180' y2='100' stroke='#334155' />
                <line x1='180' y1='100' x2='180' y2='230' stroke='#334155' />
                <line x1='180' y1='230' x2='150' y2='230' stroke='#334155' />

                {/* Начало */}
                <rect
                  x='50'
                  y='5'
                  width='100'
                  height='35'
                  rx='17'
                  fill='#1e1e1e'
                  stroke='#334155'
                />
                <text
                  x='100'
                  y='27'
                  textAnchor='middle'
                  fill='#8b949e'
                  fontSize='12'>
                  Начало
                </text>

                {/* Ромб (Условие) */}
                <path
                  d='M 100 70 L 145 100 L 100 130 L 55 100 Z'
                  {...getBlockProps(0)}
                />
                <text
                  x='100'
                  y='105'
                  textAnchor='middle'
                  fill='#fff'
                  fontSize='10'>
                  i in range?
                </text>

                {/* Прямоугольник (Действие) */}
                <rect
                  x='50'
                  y='170'
                  width='100'
                  height='40'
                  {...getBlockProps(1)}
                />
                <text
                  x='100'
                  y='195'
                  textAnchor='middle'
                  fill='#fff'
                  fontSize='12'>
                  print(i)
                </text>

                {/* Конец */}
                <rect
                  x='50'
                  y='215'
                  width='100'
                  height='35'
                  rx='17'
                  {...getBlockProps(2)}
                />
                <text
                  x='100'
                  y='237'
                  textAnchor='middle'
                  fill='#fff'
                  fontSize='12'>
                  Конец
                </text>
              </svg>
            </Paper>
          </Stack>
        </Grid>

        {/* ПРАВАЯ КОЛОНКА: ТРАССИРОВКА И КОНСОЛЬ */}
        <Grid size={{xs: 12, md: 7}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: 4,
              height: '100%',
            }}>
            <Typography variant='subtitle1' sx={{color: '#8b949e', mb: 2}}>
              Объект итерации (range):
            </Typography>
            <Stack
              direction='row'
              spacing={1}
              sx={{mb: 4, flexWrap: 'wrap', gap: 1}}>
              {rangeArray.map((val) => (
                <Chip
                  key={val}
                  label={val}
                  variant={currentVal === val ? 'filled' : 'outlined'}
                  color={currentVal === val ? 'success' : 'default'}
                  sx={{
                    transition: '0.5s',
                    fontWeight: 'bold',
                    bgcolor: currentVal === val ? '#4caf50' : 'transparent',
                    color: currentVal === val ? '#000' : '#8b949e',
                  }}
                />
              ))}
            </Stack>

            <Typography variant='subtitle2' sx={{color: '#8b949e', mb: 1}}>
              Консоль:
            </Typography>
            <Box
              sx={{
                bgcolor: '#000',
                p: 2,
                borderRadius: 2,
                height: 250,
                overflowY: 'auto',
                border: '1px solid #333',
                fontFamily: 'monospace',
              }}>
              {history.map((line, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    color: line.includes('--') ? '#8b949e' : '#4af626',
                    fontSize: '1rem',
                    mb: 0.5,
                  }}>
                  {`>>> ${line}`}
                </Typography>
              ))}
              {isRunning && (
                <span className='cursor' style={{color: '#fff'}}>
                  _
                </span>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
