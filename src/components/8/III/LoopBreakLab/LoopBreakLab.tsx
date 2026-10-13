import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import {useState} from 'react'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const LoopBreakLab = () => {
  const [tab, setTab] = useState(0) // 0 - for, 1 - while
  const [stop, setStop] = useState(10)
  const [breakVal, setBreakVal] = useState(5)
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
        await delay(700)

        setActiveLine(1) // if i == breakVal...
        await delay(700)

        if (i === breakVal) {
          setActiveLine(2) // break
          setHistory((prev) => [...prev, `i = ${i}: Сработал BREAK. Выход.`])
          await delay(1000)
          break // Прыгаем за пределы цикла
        }

        setActiveLine(3) // print
        setHistory((prev) => [...prev, `Вывод: ${i}`])
        await delay(700)
      }
    } else {
      // ЛОГИКА WHILE
      let i = 0
      setActiveLine(0) // i = 0
      setCurrentI(i)
      await delay(700)

      while (i < stop) {
        setActiveLine(1) // while...
        await delay(700)

        setActiveLine(2) // if i == breakVal...
        await delay(700)

        if (i === breakVal) {
          setActiveLine(3) // break
          setHistory((prev) => [...prev, `i = ${i}: Сработал BREAK. Выход.`])
          await delay(1000)
          break
        }

        setActiveLine(4) // print
        setHistory((prev) => [...prev, `Вывод: ${i}`])
        await delay(700)

        setActiveLine(5) // i += 1
        i++
        setCurrentI(i)
        await delay(700)
      }
    }

    setActiveLine(tab === 0 ? 4 : 6) // Конец
    setHistory((prev) => [...prev, '--- Программа завершена ---'])
    setIsRunning(false)
    await delay(1000)
    setActiveLine(-1)
  }

  const getLineStyle = (index: number) => ({
    bgcolor: activeLine === index ? 'rgba(244, 67, 54, 0.2)' : 'transparent',
    borderRadius: '4px',
    pl: index === 0 ? 1 : index === 1 || index === 4 || index === 5 ? 3 : 6,
    py: 0.2,
    fontFamily: 'monospace',
    transition: '0.3s',
    color: activeLine === index ? '#ff5252' : '#fff',
    fontSize: '0.95rem',
  })

  const getBlockProps = (lines: number[]) => ({
    fill: lines.includes(activeLine) ? '#f44336' : '#1e1e1e',
    stroke: lines.includes(activeLine) ? '#fff' : '#334155',
    strokeWidth: lines.includes(activeLine) ? 2 : 1,
    transition: '0.4s',
  })

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
          alignItems: 'center',
          gap: 2,
        }}>
        <ExitToAppIcon sx={{fontSize: 40, color: '#f44336'}} />
        Оператор{' '}
        <Box component='span' sx={{color: '#f44336'}}>
          break
        </Box>{' '}
        в Python
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
          '& .Mui-selected': {color: '#f44336 !important'},
          '& .MuiTabs-indicator': {bgcolor: '#f44336'},
        }}>
        <Tab label='For + Break' />
        <Tab label='While + Break' />
      </Tabs>

      <Grid container spacing={3}>
        {/* КОД */}
        <Grid size={{xs: 12, md: 5}}>
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
                borderLeft: '4px solid #f44336',
                mb: 3,
                minHeight: 180,
              }}>
              {tab === 0 ? (
                <>
                  <Typography sx={getLineStyle(0)}>
                    for i in range({stop}):
                  </Typography>
                  <Typography sx={getLineStyle(1)}>
                    &nbsp;&nbsp;if i == {breakVal}:
                  </Typography>
                  <Typography sx={getLineStyle(2)}>
                    &nbsp;&nbsp;&nbsp;&nbsp;break
                  </Typography>
                  <Typography sx={getLineStyle(3)}>
                    &nbsp;&nbsp;print(i)
                  </Typography>
                  <Typography
                    sx={{...getLineStyle(4), mt: 1, color: '#8b949e'}}>
                    # Код после цикла
                  </Typography>
                </>
              ) : (
                <>
                  <Typography sx={getLineStyle(0)}>i = 0</Typography>
                  <Typography sx={getLineStyle(1)}>
                    while i {'<'} {stop}:
                  </Typography>
                  <Typography sx={getLineStyle(2)}>
                    &nbsp;&nbsp;if i == {breakVal}:
                  </Typography>
                  <Typography sx={getLineStyle(3)}>
                    &nbsp;&nbsp;&nbsp;&nbsp;break
                  </Typography>
                  <Typography sx={getLineStyle(4)}>
                    &nbsp;&nbsp;print(i)
                  </Typography>
                  <Typography sx={getLineStyle(5)}>
                    &nbsp;&nbsp;i += 1
                  </Typography>
                  <Typography
                    sx={{...getLineStyle(6), mt: 1, color: '#8b949e'}}>
                    # Код после цикла
                  </Typography>
                </>
              )}
            </Box>

            <Stack direction='row' spacing={2} sx={{mb: 2}}>
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
                label='Break i=='
                type='number'
                value={breakVal}
                onChange={(e) => setBreakVal(Number(e.target.value))}
                disabled={isRunning}
                sx={{input: {color: '#f44336'}}}
              />
            </Stack>
            <Button
              fullWidth
              variant='contained'
              sx={{bgcolor: '#f44336', '&:hover': {bgcolor: '#d32f2f'}}}
              onClick={runSimulation}
              disabled={isRunning}
              startIcon={<PlayArrowIcon />}>
              Запустить отладку
            </Button>
            <Button
              fullWidth
              variant='outlined'
              sx={{mt: 1, color: '#fff'}}
              onClick={reset}
              disabled={isRunning}
              startIcon={<RestartAltIcon />}>
              Сброс
            </Button>
          </Paper>
        </Grid>

        {/* БЛОК-СХЕМА */}
        <Grid size={{xs: 12, md: 7}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#0d1117',
              border: '1px solid #333',
              borderRadius: 4,
              height: '100%',
            }}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography
                  variant='caption'
                  sx={{color: '#8b949e', mb: 2, display: 'block'}}>
                  Поток управления (Flowchart)
                </Typography>
                <svg width='240' height='360' viewBox='0 0 240 360'>
                  {/* Начало */}
                  <rect
                    x='70'
                    y='5'
                    width='100'
                    height='35'
                    rx='17'
                    {...getBlockProps([0])}
                  />
                  <text
                    x='120'
                    y='27'
                    textAnchor='middle'
                    fill='#8b949e'
                    fontSize='11'>
                    Старт
                  </text>

                  {/* Ромб цикла */}
                  <path
                    d='M 120 60 L 170 90 L 120 120 L 70 90 Z'
                    {...getBlockProps([tab === 0 ? 0 : 1])}
                  />
                  <text
                    x='120'
                    y='95'
                    textAnchor='middle'
                    fill='#fff'
                    fontSize='9'>
                    Условие цикла
                  </text>

                  {/* Ромб IF BREAK */}
                  <path
                    d='M 120 150 L 170 180 L 120 210 L 70 180 Z'
                    {...getBlockProps([tab === 0 ? 1 : 2, tab === 0 ? 2 : 3])}
                  />
                  <text
                    x='120'
                    y='185'
                    textAnchor='middle'
                    fill='#fff'
                    fontSize='9'>
                    i == {breakVal}?
                  </text>

                  {/* Ветка BREAK (на выход) */}
                  <path
                    d='M 170 185 L 210 185 L 210 310 L 170 310'
                    fill='none'
                    stroke={
                      activeLine === (tab === 0 ? 2 : 3) ? '#f44336' : '#334155'
                    }
                    strokeWidth='2'
                    markerEnd='url(#arrow)'
                  />
                  <text
                    x='215'
                    y='240'
                    fill='#f44336'
                    fontSize='10'
                    transform='rotate(90, 215, 240)'>
                    BREAK EXIT
                  </text>

                  {/* Действие */}
                  <rect
                    x='70'
                    y='240'
                    width='100'
                    height='40'
                    {...getBlockProps([tab === 0 ? 3 : 4])}
                  />
                  <text
                    x='120'
                    y='265'
                    textAnchor='middle'
                    fill='#fff'
                    fontSize='10'>
                    Действие
                  </text>

                  {/* Конец */}
                  <rect
                    x='70'
                    y='310'
                    width='100'
                    height='35'
                    rx='17'
                    {...getBlockProps([tab === 0 ? 4 : 6])}
                  />
                  <text
                    x='120'
                    y='332'
                    textAnchor='middle'
                    fill='#fff'
                    fontSize='11'>
                    Конец
                  </text>

                  <defs>
                    <marker
                      id='arrow'
                      markerWidth='10'
                      markerHeight='10'
                      refX='8'
                      refY='5'
                      orient='auto'>
                      <path d='M 0 0 L 10 5 L 0 10 z' fill='#f44336' />
                    </marker>
                  </defs>
                </svg>
              </Grid>
              <Grid size={6}>
                <Typography
                  variant='caption'
                  sx={{color: '#8b949e', mb: 2, display: 'block'}}>
                  Трассировка и Вывод
                </Typography>
                <Box sx={{mb: 2}}>
                  <Typography sx={{color: '#fff', fontSize: '0.9rem'}}>
                    i ={' '}
                    <span style={{color: '#f44336', fontWeight: 'bold'}}>
                      {currentI}
                    </span>
                  </Typography>
                  <LinearProgress
                    variant='determinate'
                    value={stop > 0 ? (Number(currentI) / stop) * 100 : 0}
                    color='error'
                    sx={{height: 6, borderRadius: 3, mt: 1}}
                  />
                </Box>
                <Box
                  sx={{
                    bgcolor: '#000',
                    p: 2,
                    borderRadius: 2,
                    height: 240,
                    overflowY: 'auto',
                    border: '1px solid #333',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                  }}>
                  {history.map((h, idx) => (
                    <div
                      key={idx}
                      style={{
                        color: h.includes('BREAK') ? '#f44336' : '#4af626',
                        marginBottom: 4,
                      }}>
                      {`>>> ${h}`}
                    </div>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
