import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import {
  Alert,
  Box,
  Button,
  Fade,
  FormControlLabel,
  Grid,
  Paper,
  Slider,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import {useState} from 'react'

import StorageIcon from '@mui/icons-material/Storage'

export const PythonIfVisualizer = () => {
  const [temp, setTemp] = useState(25)
  const [activeLine, setActiveLine] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isBroken, setIsBroken] = useState(false) // Для Indentation Error
  const [_comparisonResult, setComparisonResult] = useState<string | null>(null)

  // Логика пошагового запуска
  const runCode = async () => {
    if (isRunning) return
    setIsRunning(true)
    setComparisonResult(null)

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms))

    // Шаг 1: Инициализация переменной
    setActiveLine(1)
    await sleep(1000)

    // Шаг 2: Первая проверка (if)
    setActiveLine(3)
    setComparisonResult(`${temp} >= 30: ${temp >= 30}`)
    await sleep(1200)

    if (temp >= 30) {
      setActiveLine(4)
      setComparisonResult(null)
    } else {
      // Шаг 3: Вторая проверка (elif)
      setActiveLine(5)
      setComparisonResult(`${temp} >= 15: ${temp >= 15}`)
      await sleep(1200)

      if (temp >= 15) {
        setActiveLine(6)
        setComparisonResult(null)
      } else {
        // Шаг 4: Else
        setActiveLine(7)
        setComparisonResult(null)
        await sleep(800)
        setActiveLine(8)
      }
    }

    await sleep(1000)
    setIsRunning(false)
    setActiveLine(null)
    setComparisonResult(null)
  }

  const codeLines = [
    {text: `temp = ${temp}`, indent: 0, id: 1},
    {text: '', indent: 0, id: 2},
    {
      text: 'if temp >= 30:',
      indent: 0,
      id: 3,
      comparison: `${temp} >= 30 → ${temp >= 30}`,
    },
    {text: '    print("Жарко! ☀️")', indent: isBroken ? 0 : 1, id: 4},
    {
      text: 'elif temp >= 15:',
      indent: 0,
      id: 5,
      comparison: `${temp} >= 15 → ${temp >= 15}`,
    },
    {text: '    print("Приятно 🌤️")', indent: isBroken ? 0 : 1, id: 6},
    {text: 'else:', indent: 0, id: 7},
    {text: '    print("Холодно ❄️")', indent: isBroken ? 0 : 1, id: 8},
  ]

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: '#010409',
        minHeight: '550px',
        borderRadius: 4,
        color: '#e6edf3',
      }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{mb: 3}}>
        <Typography
          variant='h5'
          sx={{
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>
          🐍 Python Logic Debugger
        </Typography>
        <FormControlLabel
          control={
            <Switch
              color='error'
              checked={isBroken}
              onChange={(e) => setIsBroken(e.target.checked)}
            />
          }
          label='Сломать код (Отступы)'
          sx={{color: '#8b949e'}}
        />
      </Stack>

      <Grid container spacing={3}>
        {/* ЛЕВО: Управление */}
        <Grid size={{xs: 12, md: 4}}>
          <Stack spacing={2}>
            {/* Блок Визуализации Памяти */}
            <Paper
              sx={{
                p: 2,
                mb: 2,
                bgcolor: '#161b22',
                border: '1px solid #30363d',
                borderRadius: 2,
              }}>
              <Typography
                variant='caption'
                sx={{
                  color: '#8b949e',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1,
                }}>
                <StorageIcon sx={{fontSize: 16}} /> СОСТОЯНИЕ ПАМЯТИ (RAM)
              </Typography>
              <Stack direction='row' spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    border: '1px solid #238636',
                    borderRadius: 1,
                    bgcolor: '#0d1117',
                    minWidth: '100px',
                    textAlign: 'center',
                  }}>
                  <Typography
                    variant='caption'
                    sx={{color: '#8b949e', display: 'block'}}>
                    Имя: <b>temp</b>
                  </Typography>
                  <Typography
                    variant='h6'
                    sx={{color: '#7ee787', fontFamily: 'monospace'}}>
                    {temp}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#484f58',
                  }}>
                  <Typography variant='body2'>
                    ← Текущее значение в ячейке
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Paper
              sx={{
                p: 3,
                bgcolor: '#161b22',
                border: '1px solid #30363d',
                color: '#fff',
              }}>
              <Typography variant='body2' gutterBottom sx={{color: '#8b949e'}}>
                Входные данные (temp):
              </Typography>
              <Slider
                value={temp}
                min={0}
                max={40}
                disabled={isRunning}
                onChange={(_e, v) => setTemp(v as number)}
                sx={{color: '#238636', mb: 2}}
              />
              <Button
                fullWidth
                variant='contained'
                color='success'
                startIcon={<PlayArrowIcon />}
                onClick={runCode}
                disabled={isRunning || isBroken}>
                {isRunning ? 'Выполнение...' : 'Запустить код'}
              </Button>
            </Paper>

            {isBroken && (
              <Fade in={isBroken}>
                <Alert
                  variant='filled'
                  severity='error'
                  //   icon={<WarningAmbiguousIcon />}
                  sx={{borderRadius: 2}}>
                  <Typography variant='caption' fontWeight='bold'>
                    IndentationError:
                  </Typography>
                  <Typography variant='body2' sx={{fontSize: '0.75rem'}}>
                    Упс! В Python отступы обязательны. Без них компьютер не
                    понимает, к какому условию относится этот print.
                  </Typography>
                </Alert>
              </Fade>
            )}
          </Stack>
        </Grid>

        {/* ПРАВО: Визуализация кода */}
        <Grid size={{xs: 12, md: 8}}>
          <Paper
            sx={{
              p: 2,
              bgcolor: '#0d1117',
              border: isBroken ? '2px solid #f85149' : '1px solid #30363d',
              position: 'relative',
              overflow: 'hidden',
            }}>
            {codeLines.map((line) => {
              const isActive = activeLine === line.id
              // const isFalse = isActive && line.comparison?.includes('false')
              const isTrue = isActive && line.comparison?.includes('true')

              return (
                <Box
                  key={line.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 0.5,
                    px: 1,
                    bgcolor: isActive
                      ? 'rgba(56, 139, 253, 0.1)'
                      : 'transparent',
                    borderLeft: isActive
                      ? '4px solid #58a6ff'
                      : '4px solid transparent',
                    transition: '0.2s',
                    position: 'relative',
                  }}>
                  <Typography
                    sx={{
                      width: 30,
                      color: '#484f58',
                      fontFamily: 'monospace',
                      fontSize: '0.8rem',
                    }}>
                    {line.id}
                  </Typography>

                  <Typography
                    sx={{
                      ml: line.indent * 4,
                      fontFamily: '"Fira Code", monospace',
                      fontSize: '0.9rem',
                      color: isActive
                        ? '#fff'
                        : isBroken && line.indent === 0 && line.id % 2 === 0
                          ? '#f85149'
                          : '#8b949e',
                    }}>
                    {line.text}
                  </Typography>

                  {/* Математическая подсказка (Облачко) */}
                  {isActive && line.comparison && (
                    <Fade in={true}>
                      <Box
                        sx={{
                          ml: 2,
                          px: 1,
                          borderRadius: 1,
                          bgcolor: isTrue ? '#238636' : '#da3633',
                          color: '#fff',
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                        }}>
                        {line.comparison}
                      </Box>
                    </Fade>
                  )}
                </Box>
              )
            })}
          </Paper>

          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: '#161b22',
              borderRadius: 2,
              border: '1px solid #30363d',
            }}>
            <Typography
              variant='caption'
              sx={{color: '#8b949e', display: 'block', mb: 1}}>
              КОНСОЛЬ:
            </Typography>
            <Typography sx={{fontFamily: 'monospace', color: '#7ee787'}}>
              {activeLine === 4 || activeLine === 6 || activeLine === 8
                ? `> ${
                    temp >= 30
                      ? 'Жарко! ☀️'
                      : temp >= 15
                        ? 'Приятно 🌤️'
                        : 'Холодно ❄️'
                  }`
                : '> _'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
