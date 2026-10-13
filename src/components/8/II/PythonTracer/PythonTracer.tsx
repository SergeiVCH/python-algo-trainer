import {useState} from 'react'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import BugReportIcon from '@mui/icons-material/BugReport'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

interface TraceStep {
  step: number
  line: string
  i: number | string
  s: number | string
  condition: string
}

export const PythonTracer = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [trace, setTrace] = useState<TraceStep[]>([])
  const [activeLine, setActiveLine] = useState(-1)
  const [vars, setVars] = useState<{i: number | string; s: number | string}>({
    i: 0,
    s: 0,
  })

  const reset = () => {
    setIsRunning(false)
    setActiveLine(-1)
    setTrace([])
    setVars({i: 0, s: 0})
  }

  const runTracer = async () => {
    setIsRunning(true)
    setTrace([])
    let currentS = 0
    let currentI = 0

    // Шаг 1: Инициализация s = 0
    setActiveLine(0)
    currentS = 0
    setVars({i: '-', s: currentS})
    setTrace([{step: 1, line: 's = 0', i: '-', s: currentS, condition: '-'}])
    await delay(1000)

    for (let i = 1; i <= 4; i++) {
      currentI = i
      // Шаг: Цикл (Ромб)
      setActiveLine(1)
      setVars({i: currentI, s: currentS})
      setTrace((prev) => [
        ...prev,
        {
          step: prev.length + 1,
          line: `for i in range(1, 5) [i=${i}]`,
          i: currentI,
          s: currentS,
          condition: 'True (i <= 4)',
        },
      ])
      await delay(1000)

      // Шаг: Тело (Прямоугольник)
      setActiveLine(2)
      currentS += i
      setVars({i: currentI, s: currentS})
      setTrace((prev) => [
        ...prev,
        {
          step: prev.length + 1,
          line: 's = s + i',
          i: currentI,
          s: currentS,
          condition: '-',
        },
      ])
      await delay(1000)
    }

    // Финал
    setActiveLine(3)
    setTrace((prev) => [
      ...prev,
      {
        step: prev.length + 1,
        line: 'print(s)',
        i: currentI,
        s: currentS,
        condition: 'Цикл завершен',
      },
    ])
    setIsRunning(false)
    await delay(1000)
    setActiveLine(-1)
  }

  const getLineStyle = (index: number) => ({
    p: 1.5,
    fontFamily: 'monospace',
    bgcolor: activeLine === index ? 'rgba(3, 169, 244, 0.2)' : 'transparent',
    color: activeLine === index ? '#03a9f4' : '#fff',
    borderRadius: '4px',
    transition: '0.3s',
    borderLeft:
      activeLine === index ? '4px solid #03a9f4' : '4px solid transparent',
    fontSize: '1.1rem',
  })

  const getBlockProps = (lines: number[]) => ({
    fill: lines.includes(activeLine) ? '#03a9f4' : '#1e1e1e',
    stroke: lines.includes(activeLine) ? '#fff' : '#334155',
    strokeWidth: lines.includes(activeLine) ? 2 : 1,
    transition: '0.3s',
  })

  return (
    <Box sx={{py: 4, maxWidth: 1200, margin: '0 auto', px: 2}}>
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
        <BugReportIcon sx={{fontSize: 40, color: '#03a9f4'}} />
        <Box component='span'>Трассировка</Box>
        <Box component='span' sx={{color: '#03a9f4'}}>
          алгоритма
        </Box>
      </Typography>

      {/* ВЕРХНИЙ БЛОК: КОД И СХЕМА */}
      <Grid container spacing={3} sx={{mb: 3}}>
        <Grid size={{xs: 12, md: 5}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#1e1e1e',
              border: '1px solid #333',
              borderRadius: 4,
              height: '100%',
            }}>
            <Typography variant='subtitle2' sx={{color: '#8b949e', mb: 2}}>
              Код на Python:
            </Typography>
            <Box sx={{bgcolor: '#000', p: 2, borderRadius: 2, mb: 4}}>
              <Typography sx={getLineStyle(0)}>s = 0</Typography>
              <Typography sx={getLineStyle(1)}>
                for i in range(1, 5):
              </Typography>
              <Typography sx={getLineStyle(2)}>
                &nbsp;&nbsp;s = s + i
              </Typography>
              <Typography sx={getLineStyle(3)}>print(s)</Typography>
            </Box>

            <Stack direction='row' spacing={2} sx={{mb: 2}}>
              <Button
                fullWidth
                variant='contained'
                sx={{bgcolor: '#03a9f4'}}
                onClick={runTracer}
                disabled={isRunning}
                startIcon={<PlayArrowIcon />}>
                Пуск
              </Button>
              <Button
                fullWidth
                variant='outlined'
                sx={{color: '#fff', borderColor: '#333'}}
                onClick={reset}
                disabled={isRunning}
                startIcon={<RestartAltIcon />}>
                Сброс
              </Button>
            </Stack>

            <Stack direction='row' spacing={2}>
              <Box
                sx={{
                  flex: 1,
                  p: 2,
                  bgcolor: '#0d1117',
                  borderRadius: 2,
                  textAlign: 'center',
                  border: '1px solid #333',
                }}>
                <Typography variant='caption' sx={{color: '#8b949e'}}>
                  Память [i]
                </Typography>
                <Typography
                  variant='h5'
                  sx={{color: '#03a9f4', fontWeight: 800}}>
                  {vars.i}
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  p: 2,
                  bgcolor: '#0d1117',
                  borderRadius: 2,
                  textAlign: 'center',
                  border: '1px solid #333',
                }}>
                <Typography variant='caption' sx={{color: '#8b949e'}}>
                  Память [s]
                </Typography>
                <Typography
                  variant='h5'
                  sx={{color: '#4caf50', fontWeight: 800}}>
                  {vars.s}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{xs: 12, md: 7}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#0d1117',
              border: '1px solid #333',
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
            }}>
            <Typography variant='subtitle2' sx={{color: '#8b949e', mb: 2}}>
              Блок-схема алгоритма:
            </Typography>
            <svg width='240' height='300' viewBox='0 0 200 280'>
              <line x1='100' y1='40' x2='100' y2='70' stroke='#334155' />
              <line x1='100' y1='130' x2='100' y2='170' stroke='#334155' />
              <path
                d='M 50 190 L 20 190 L 20 100 L 55 100'
                fill='none'
                stroke={activeLine === 2 ? '#03a9f4' : '#334155'}
                strokeWidth='2'
                markerEnd='url(#arrowBlue)'
              />
              <line x1='145' y1='100' x2='180' y2='100' stroke='#334155' />
              <line x1='180' y1='100' x2='180' y2='240' stroke='#334155' />
              <line x1='180' y1='240' x2='140' y2='240' stroke='#334155' />

              <rect
                x='50'
                y='5'
                width='100'
                height='35'
                rx='5'
                {...getBlockProps([0])}
              />
              <text
                x='100'
                y='27'
                textAnchor='middle'
                fill={activeLine === 0 ? '#000' : '#8b949e'}
                fontSize='12'>
                s = 0
              </text>

              <path
                d='M 100 70 L 145 100 L 100 130 L 55 100 Z'
                {...getBlockProps([1])}
              />
              <text
                x='100'
                y='105'
                textAnchor='middle'
                fill={activeLine === 1 ? '#000' : '#fff'}
                fontSize='10'>
                i in range?
              </text>

              <rect
                x='50'
                y='170'
                width='100'
                height='40'
                {...getBlockProps([2])}
              />
              <text
                x='100'
                y='195'
                textAnchor='middle'
                fill={activeLine === 2 ? '#000' : '#fff'}
                fontSize='12'>
                s = s + i
              </text>

              <rect
                x='60'
                y='225'
                width='80'
                height='30'
                rx='15'
                {...getBlockProps([3])}
              />
              <text
                x='100'
                y='245'
                textAnchor='middle'
                fill={activeLine === 3 ? '#000' : '#8b949e'}
                fontSize='11'>
                print(s)
              </text>

              <defs>
                <marker
                  id='arrowBlue'
                  markerWidth='10'
                  markerHeight='10'
                  refX='8'
                  refY='5'
                  orient='auto'>
                  <path d='M 0 0 L 10 5 L 0 10 z' fill='#03a9f4' />
                </marker>
              </defs>
            </svg>
          </Paper>
        </Grid>
      </Grid>

      {/* НИЖНИЙ БЛОК: ТАБЛИЦА */}
      <TableContainer
        component={Paper}
        sx={{bgcolor: '#0d1117', border: '1px solid #30363d', borderRadius: 4}}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                '& th': {bgcolor: '#1c2128', color: '#8b949e', fontWeight: 700},
              }}>
              <TableCell>№ Шага</TableCell>
              <TableCell>Строка выполнения</TableCell>
              <TableCell align='center'>Переменная i</TableCell>
              <TableCell align='center'>Переменная s</TableCell>
              <TableCell>Результат проверки условия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trace.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{
                  bgcolor:
                    idx === trace.length - 1
                      ? 'rgba(3, 169, 244, 0.05)'
                      : 'transparent',
                  '& td': {color: '#fff', borderBottom: '1px solid #21262d'},
                }}>
                <TableCell>{row.step}</TableCell>
                <TableCell sx={{fontFamily: 'monospace', color: '#dcdcaa'}}>
                  {row.line}
                </TableCell>
                <TableCell
                  align='center'
                  sx={{color: '#03a9f4', fontWeight: 700}}>
                  {row.i}
                </TableCell>
                <TableCell
                  align='center'
                  sx={{color: '#4caf50', fontWeight: 700}}>
                  {row.s}
                </TableCell>
                <TableCell
                  sx={{
                    color: row.condition.includes('True')
                      ? '#4caf50'
                      : '#8b949e',
                  }}>
                  {row.condition}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
