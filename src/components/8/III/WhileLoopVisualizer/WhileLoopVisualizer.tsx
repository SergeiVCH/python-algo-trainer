import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import TerminalIcon from '@mui/icons-material/Terminal'
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {useState} from 'react'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const WhileLoopVisualizer = () => {
  const [startValue, setStartValue] = useState(0)
  const [limit, setLimit] = useState(5)
  const [i, setI] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [activeLine, setActiveLine] = useState(-1)

  const reset = () => {
    setIsRunning(false)
    setActiveLine(-1)
    setI(startValue)
    setHistory([])
  }

  const runSimulation = async () => {
    setIsRunning(true)
    setHistory([])
    let currentI = startValue
    setI(currentI)

    // 1. Инициализация (Начало)
    setActiveLine(0)
    await delay(800)

    // Основной цикл
    while (currentI < limit) {
      // 2. Условие (Ромб)
      setActiveLine(1)
      await delay(800)

      // 3. Тело цикла: print (Прямоугольник 1)
      setActiveLine(2)
      setHistory((prev) => [...prev, `Результат: ${currentI}`])
      await delay(800)

      // 4. Тело цикла: инкремент (Прямоугольник 2)
      setActiveLine(3)
      currentI++
      setI(currentI)
      await delay(800)
    }

    // 5. Финальная проверка (условие ложно)
    setActiveLine(1)
    await delay(800)

    // 6. Выход (Конец)
    setActiveLine(4)
    setHistory((prev) => [
      ...prev,
      `-- Условие ложно (${currentI} < ${limit}), цикл завершен --`,
    ])
    setIsRunning(false)
    await delay(800)
    setActiveLine(-1)
  }

  const getLineStyle = (index: number) => ({
    display: 'block',
    bgcolor: activeLine === index ? 'rgba(255, 235, 59, 0.2)' : 'transparent',
    borderRadius: '4px',
    pl: index > 1 && index < 4 ? 4 : 1,
    py: 0.5,
    transition: '0.3s',
    fontFamily: 'monospace',
    fontSize: '1rem',
  })

  const getBlockProps = (lines: number[]) => ({
    fill: lines.includes(activeLine) ? '#ffeb3b' : '#1e1e1e',
    stroke: lines.includes(activeLine) ? '#fff' : '#334155',
    strokeWidth: lines.includes(activeLine) ? 2 : 1,
    transition: '0.3s',
  })

  const getTextColor = (lines: number[]) =>
    lines.includes(activeLine) ? '#000' : '#8b949e'

  return (
    <Box sx={{py: 4, maxWidth: 1150, margin: '0 auto'}}>
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
        <TerminalIcon sx={{fontSize: 40, color: '#ffeb3b'}} />
        Цикл
        <Box component='span' sx={{color: '#ffeb3b'}}>
          while
        </Box>
        в Python
      </Typography>

      <Grid container spacing={3}>
        {/* КОД И НАСТРОЙКИ */}
        <Grid size={{xs: 12, md: 4}}>
          <Stack spacing={2}>
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
                  borderLeft: '4px solid #ffeb3b',
                  mb: 3,
                }}>
                <Typography component='div' sx={getLineStyle(0)}>
                  i = {startValue}
                </Typography>
                <Typography component='div' sx={getLineStyle(1)}>
                  while i {'<'} {limit}:
                </Typography>
                <Typography component='div' sx={getLineStyle(2)}>
                  print(i)
                </Typography>
                <Typography component='div' sx={getLineStyle(3)}>
                  i += 1
                </Typography>
              </Box>

              <Stack spacing={2}>
                <TextField
                  fullWidth
                  size='small'
                  label='Начальное i'
                  type='number'
                  value={startValue}
                  onChange={(e) => setStartValue(Number(e.target.value))}
                  disabled={isRunning}
                  sx={{input: {color: '#fff'}}}
                />
                <TextField
                  fullWidth
                  size='small'
                  label='Лимит (while <)'
                  type='number'
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  disabled={isRunning}
                  sx={{input: {color: '#fff'}}}
                />
                <Button
                  fullWidth
                  variant='contained'
                  color='warning'
                  startIcon={<PlayArrowIcon />}
                  onClick={runSimulation}
                  disabled={isRunning}>
                  Пуск
                </Button>
                <Button
                  fullWidth
                  variant='outlined'
                  color='inherit'
                  onClick={reset}
                  disabled={isRunning}
                  sx={{color: '#fff'}}>
                  Сброс
                </Button>
              </Stack>
            </Paper>

            {/* БЛОК-СХЕМА WHILE */}
            <Paper
              sx={{
                p: 2,
                bgcolor: '#0d1117',
                border: '1px solid #333',
                borderRadius: 4,
                textAlign: 'center',
              }}>
              <Typography
                variant='caption'
                sx={{color: '#8b949e', mb: 1, display: 'block'}}>
                Визуальный алгоритм
              </Typography>
              <svg width='200' height='340' viewBox='0 0 200 340'>
                {/* Линии */}
                <line x1='100' y1='40' x2='100' y2='70' stroke='#334155' />
                <line x1='100' y1='130' x2='100' y2='160' stroke='#334155' />
                <line x1='100' y1='200' x2='100' y2='230' stroke='#334155' />
                {/* Петля обратной связи */}
                <path
                  d='M 50 250 L 20 250 L 20 100 L 55 100'
                  fill='none'
                  stroke='#334155'
                />
                {/* Линия выхода */}
                <path
                  d='M 145 100 L 180 100 L 180 290 L 150 290'
                  fill='none'
                  stroke='#334155'
                />

                {/* Блоки */}
                <rect
                  x='50'
                  y='5'
                  width='100'
                  height='35'
                  rx='17'
                  {...getBlockProps([0])}
                />
                <text
                  x='100'
                  y='27'
                  textAnchor='middle'
                  fill={getTextColor([0])}
                  fontSize='12'>
                  i = {startValue}
                </text>

                <path
                  d='M 100 70 L 145 100 L 100 130 L 55 100 Z'
                  {...getBlockProps([1])}
                />
                <text
                  x='100'
                  y='105'
                  textAnchor='middle'
                  fill={getTextColor([1])}
                  fontSize='11'>
                  i {'<'} {limit}?
                </text>

                <rect
                  x='50'
                  y='160'
                  width='100'
                  height='40'
                  {...getBlockProps([2])}
                />
                <text
                  x='100'
                  y='185'
                  textAnchor='middle'
                  fill={getTextColor([2])}
                  fontSize='12'>
                  print(i)
                </text>

                <rect
                  x='50'
                  y='230'
                  width='100'
                  height='40'
                  {...getBlockProps([3])}
                />
                <text
                  x='100'
                  y='255'
                  textAnchor='middle'
                  fill={getTextColor([3])}
                  fontSize='12'>
                  i += 1
                </text>

                <rect
                  x='50'
                  y='275'
                  width='100'
                  height='35'
                  rx='17'
                  {...getBlockProps([4])}
                />
                <text
                  x='100'
                  y='297'
                  textAnchor='middle'
                  fill={getTextColor([4])}
                  fontSize='12'>
                  Конец
                </text>
              </svg>
            </Paper>
          </Stack>
        </Grid>

        {/* ТРАССИРОВКА И ВЫВОД */}
        <Grid size={{xs: 12, md: 8}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: 4,
              height: '100%',
            }}>
            <Box sx={{mb: 4}}>
              <Typography sx={{color: '#8b949e', mb: 1}}>
                Значение <b>i</b> в памяти:{' '}
                <span style={{color: '#ffeb3b', fontSize: '1.2rem'}}>{i}</span>
              </Typography>
              <LinearProgress
                variant='determinate'
                value={Math.min(100, (i / limit) * 100)}
                color='warning'
                sx={{height: 8, borderRadius: 4}}
              />
            </Box>

            <Typography variant='subtitle2' sx={{color: '#8b949e', mb: 1}}>
              Консоль Python:
            </Typography>
            <Box
              sx={{
                bgcolor: '#000',
                p: 3,
                borderRadius: 2,
                height: 400,
                overflowY: 'auto',
                border: '1px solid #333',
                fontFamily: 'monospace',
              }}>
              {history.map((line, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    color: line.includes('--') ? '#8b949e' : '#4af626',
                    mb: 1,
                  }}>
                  {`>>> ${line}`}
                </Typography>
              ))}
              {isRunning && (
                <Box
                  component='span'
                  sx={{color: '#fff', animation: 'blink 1s infinite'}}>
                  _
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
