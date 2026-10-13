import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import {
    Box,
    Button,
    Grid,
    Paper,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@mui/material'
import { useState } from 'react'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const LoopContinueLab = () => {
  const [tab, setTab] = useState(0) // 0 - for, 1 - while
  const [stop, setStop] = useState(5)
  const [skipVal, setSkipVal] = useState(2)
  const [currentI, setCurrentI] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [activeLine, setActiveLine] = useState(-1)

  const reset = () => {
    setIsRunning(false)
    setActiveLine(-1)
    setCurrentI(null)
    setHistory([])
  }

  const runSimulation = async () => {
    setIsRunning(true)
    setHistory([])

    if (tab === 0) {
      // ЛОГИКА FOR
      for (let i = 0; i < stop; i++) {
        setCurrentI(i)
        setActiveLine(0) // for...
        await delay(800)
        setActiveLine(1) // if i == skip...
        await delay(800)
        if (i === skipVal) {
          setActiveLine(2) // continue
          setHistory((prev) => [...prev, `Пропуск i = ${i}`])
          await delay(1000)
          continue
        }
        setActiveLine(3) // print
        setHistory((prev) => [...prev, `Вывод: ${i}`])
        await delay(800)
      }
    } else {
      // ЛОГИКА WHILE
      let i = 0
      setActiveLine(0) // i = 0
      setCurrentI(i)
      await delay(800)
      while (i < stop) {
        setActiveLine(1) // while...
        await delay(800)
        setActiveLine(2) // if i == skip...
        await delay(800)
        if (i === skipVal) {
          setActiveLine(3) // i += 1 (ВАЖНО в while!)
          setHistory((prev) => [...prev, `Пропуск i = ${i}`])
          i++
          setCurrentI(i)
          await delay(800)
          setActiveLine(4) // continue
          await delay(800)
          continue
        }
        setActiveLine(5) // print
        setHistory((prev) => [...prev, `Вывод: ${i}`])
        await delay(800)
        setActiveLine(6) // i += 1
        i++
        setCurrentI(i)
        await delay(800)
      }
    }

    setIsRunning(false)
    setActiveLine(-1)
    setHistory((prev) => [...prev, '-- Цикл завершен --'])
  }

  const getLineStyle = (index: number) => ({
    bgcolor: activeLine === index ? 'rgba(255, 152, 0, 0.2)' : 'transparent',
    borderRadius: '4px',
    pl: index > 1 && index < 5 ? 4 : index >= 5 ? 4 : 1,
    py: 0.2,
    fontFamily: 'monospace',
    transition: '0.3s',
    color: '#fff',
  })

  return (
    <Box sx={{py: 4, maxWidth: 1200, margin: '0 auto'}}>
      <Typography
        variant='h4'
        sx={{
          mb: 4,
          fontWeight: 900,
          textAlign: 'center',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}>
        <SwapHorizIcon sx={{fontSize: 40, color: '#ff9800'}} />
        Сравнение{' '}
        <Box component='span' sx={{color: '#ff9800'}}>
          continue
        </Box>{' '}
        в циклах
      </Typography>

      <Tabs
        value={tab}
        onChange={(_, v) => {
          setTab(v)
          reset()
        }}
        centered
        sx={{
          mb: 4,
          '& .MuiTab-root': {color: '#8b949e'},
          '& .Mui-selected': {color: '#ff9800 !important'},
          '& .MuiTabs-indicator': {bgcolor: '#ff9800'},
        }}>
        <Tab label='Цикл FOR' />
        <Tab label='Цикл WHILE' />
      </Tabs>

      <Grid container spacing={3}>
        {/* КОД */}
        <Grid size={{xs: 12, md: 4}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#1e1e1e',
              border: '1px solid #333',
              borderRadius: 4,
              height: '100%',
            }}>
            <Box
              sx={{
                p: 2,
                bgcolor: '#000',
                borderRadius: 2,
                borderLeft: '4px solid #ff9800',
                mb: 3,
                minHeight: 180,
              }}>
              {tab === 0 ? (
                <>
                  <Typography sx={getLineStyle(0)}>
                    for i in range({stop}):
                  </Typography>
                  <Typography sx={getLineStyle(1)}>
                    &nbsp;&nbsp;if i == {skipVal}:
                  </Typography>
                  <Typography sx={getLineStyle(2)}>
                    &nbsp;&nbsp;&nbsp;&nbsp;continue
                  </Typography>
                  <Typography sx={getLineStyle(3)}>
                    &nbsp;&nbsp;print(i)
                  </Typography>
                </>
              ) : (
                <>
                  <Typography sx={getLineStyle(0)}>i = 0</Typography>
                  <Typography sx={getLineStyle(1)}>
                    while i {'<'} {stop}:
                  </Typography>
                  <Typography sx={getLineStyle(2)}>
                    &nbsp;&nbsp;if i == {skipVal}:
                  </Typography>
                  <Typography sx={getLineStyle(3)}>
                    &nbsp;&nbsp;&nbsp;&nbsp;i += 1
                  </Typography>
                  <Typography sx={getLineStyle(4)}>
                    &nbsp;&nbsp;&nbsp;&nbsp;continue
                  </Typography>
                  <Typography sx={getLineStyle(5)}>
                    &nbsp;&nbsp;print(i)
                  </Typography>
                  <Typography sx={getLineStyle(6)}>
                    &nbsp;&nbsp;i += 1
                  </Typography>
                </>
              )}
            </Box>

            <Stack spacing={2}>
              <TextField
                fullWidth
                size='small'
                label='Limit'
                type='number'
                value={stop}
                onChange={(e) => setStop(Number(e.target.value))}
                disabled={isRunning}
                sx={{input: {color: '#fff'}}}
              />
              <TextField
                fullWidth
                size='small'
                label='Skip i='
                type='number'
                value={skipVal}
                onChange={(e) => setSkipVal(Number(e.target.value))}
                disabled={isRunning}
                sx={{input: {color: '#ff9800'}}}
              />
              <Button
                fullWidth
                variant='contained'
                sx={{bgcolor: '#ff9800', '&:hover': {bgcolor: '#e68900'}}}
                onClick={runSimulation}
                disabled={isRunning}
                startIcon={<PlayArrowIcon />}>
                Пуск
              </Button>
              <Button
                fullWidth
                variant='outlined'
                sx={{color: '#fff'}}
                onClick={reset}
                disabled={isRunning}
                startIcon={<RestartAltIcon />}>
                Сброс
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* БЛОК-СХЕМА */}
        <Grid size={{xs: 12, md: 4}}>
          <Paper
            sx={{
              p: 2,
              bgcolor: '#0d1117',
              border: '1px solid #333',
              borderRadius: 4,
              textAlign: 'center',
              height: '100%',
            }}>
            <Typography variant='caption' sx={{color: '#8b949e'}}>
              Блок-схема {tab === 0 ? 'FOR' : 'WHILE'}
            </Typography>
            <Box sx={{mt: 2}}>
              {/* Здесь SVG схема, которая меняется в зависимости от tab */}
              <svg width='200' height='350' viewBox='0 0 200 350'>
                <rect
                  x='60'
                  y='10'
                  width='80'
                  height='30'
                  rx='15'
                  fill='#1e1e1e'
                  stroke='#334155'
                />
                <text
                  x='100'
                  y='30'
                  textAnchor='middle'
                  fill='#8b949e'
                  fontSize='10'>
                  Старт
                </text>

                {/* Условие цикла */}
                <path
                  d='M 100 60 L 150 90 L 100 120 L 50 90 Z'
                  fill={
                    activeLine === (tab === 0 ? 0 : 1) ? '#ff9800' : '#1e1e1e'
                  }
                  stroke='#fff'
                />
                <text
                  x='100'
                  y='95'
                  textAnchor='middle'
                  fill='#fff'
                  fontSize='8'>
                  i {'<'} {stop}?
                </text>

                {/* IF условие (Ромб) */}
                <path
                  d='M 100 150 L 150 180 L 100 210 L 50 180 Z'
                  fill={
                    (tab === 0 ? activeLine === 1 : activeLine === 2)
                      ? '#ff9800'
                      : '#1e1e1e'
                  }
                  stroke='#fff'
                />
                <text
                  x='100'
                  y='185'
                  textAnchor='middle'
                  fill='#fff'
                  fontSize='8'>
                  i == {skipVal}?
                </text>

                {/* Continue Path */}
                <path
                  d='M 150 185 L 180 185 L 180 90 L 150 90'
                  fill='none'
                  stroke={
                    activeLine === (tab === 0 ? 2 : 4) ? '#ff9800' : '#334155'
                  }
                  strokeWidth='2'
                  markerEnd='url(#arrow)'
                />

                {/* Действие (Print) */}
                <rect
                  x='60'
                  y='240'
                  width='80'
                  height='30'
                  fill={
                    (tab === 0 ? activeLine === 3 : activeLine === 5)
                      ? '#4caf50'
                      : '#1e1e1e'
                  }
                  stroke='#fff'
                />
                <text
                  x='100'
                  y='260'
                  textAnchor='middle'
                  fill='#fff'
                  fontSize='10'>
                  print(i)
                </text>

                <defs>
                  <marker
                    id='arrow'
                    markerWidth='10'
                    markerHeight='10'
                    refX='8'
                    refY='5'
                    orient='auto'>
                    <path d='M 0 0 L 10 5 L 0 10 z' fill='#ff9800' />
                  </marker>
                </defs>
              </svg>
            </Box>
          </Paper>
        </Grid>

        {/* КОНСОЛЬ */}
        <Grid size={{xs: 12, md: 4}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#000',
              border: '1px solid #333',
              borderRadius: 4,
              height: '100%',
            }}>
            <Typography variant='overline' sx={{color: '#ff9800'}}>
              Результат в памяти (i): {currentI}
            </Typography>
            <Box
              sx={{
                mt: 2,
                height: 350,
                overflowY: 'auto',
                fontFamily: 'monospace',
              }}>
              {history.map((h, idx) => (
                <div
                  key={idx}
                  style={{
                    color: h.includes('Пропуск') ? '#ff9800' : '#4af626',
                    marginBottom: 4,
                  }}>{`>>> ${h}`}</div>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
