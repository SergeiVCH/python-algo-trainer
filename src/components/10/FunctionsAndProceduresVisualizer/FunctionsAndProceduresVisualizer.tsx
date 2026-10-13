import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import TerminalIcon from '@mui/icons-material/Terminal'
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Tabs,
  Tab,
  TextField,
  Typography,
} from '@mui/material'
import {useState} from 'react'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const FunctionsAndProceduresVisualizer = () => {
  const [tabIndex, setTabIndex] = useState(0) // 0 - Процедура, 1 - Функция
  const [paramValue, setParamValue] = useState(4)
  const [isRunning, setIsRunning] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [activeLine, setActiveLine] = useState(-1)
  const [lastResult, setLastResult] = useState<number | null>(null)

  const reset = () => {
    setIsRunning(false)
    setActiveLine(-1)
    setHistory([])
    setLastResult(null)
  }

  const runSimulation = async () => {
    setIsRunning(true)
    setHistory([])
    setLastResult(null)

    if (tabIndex === 0) {
      // --- СИМУЛЯЦИЯ ПРОЦЕДУРЫ ---
      // 1. Определение процедуры
      setActiveLine(0)
      await delay(800)

      // 2. Вызов процедуры
      setActiveLine(1)
      setHistory((prev) => [...prev, `Вызов procedure_print(${paramValue})`])
      await delay(800)

      // 3. Тело процедуры (печать)
      setActiveLine(2)
      setHistory((prev) => [
        ...prev,
        `Квадрат числа ${paramValue} равен ${paramValue * paramValue}`,
      ])
      await delay(800)

      // 4. Конец процедуры (возврат управления без значения)
      setActiveLine(3)
      setHistory((prev) => [
        ...prev,
        `Процедура завершена. Возвращаемого значения нет (None).`,
      ])
      setIsRunning(false)
      await delay(800)
      setActiveLine(-1)
    } else {
      // --- СИМУЛЯЦИЯ ФУНКЦИИ ---
      // 1. Определение функции
      setActiveLine(0)
      await delay(800)

      // 2. Вызов функции
      setActiveLine(1)
      setHistory((prev) => [
        ...prev,
        `Вызов result = function_cube(${paramValue})`,
      ])
      await delay(800)

      // 3. Тело функции (вычисление)
      setActiveLine(2)
      const res = paramValue * paramValue * paramValue
      setHistory((prev) => [
        ...prev,
        `Вычисление куба: ${paramValue} * ${paramValue} * ${paramValue} = ${res}`,
      ])
      await delay(800)

      // 4. Инструкция return
      setActiveLine(3)
      setLastResult(res)
      setHistory((prev) => [...prev, `Возврат результата через return: ${res}`])
      setIsRunning(false)
      await delay(800)
      setActiveLine(-1)
    }
  }

  const getLineStyle = (index: number) => ({
    display: 'block',
    bgcolor: activeLine === index ? 'rgba(255, 235, 59, 0.2)' : 'transparent',
    borderRadius: '4px',
    pl: index > 0 && index < 3 ? 4 : 1,
    py: 0.5,
    transition: '0.3s',
    fontFamily: 'monospace',
    fontSize: '1rem',
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
          gap: 2,
        }}>
        <TerminalIcon sx={{fontSize: 40, color: '#ffeb3b'}} />
        Функции и процедуры
        <Box component='span' sx={{color: '#ffeb3b'}}>
          в Python
        </Box>
      </Typography>

      <Grid container spacing={3}>
        {/* КОД И НАСТРОЙКИ */}
        <Grid size={{xs: 12, md: 5}}>
          <Stack spacing={2}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#1e1e1e',
                border: '1px solid #333',
                borderRadius: 4,
              }}>
              <Tabs
                value={tabIndex}
                onChange={(_, val) => {
                  setTabIndex(val)
                  reset()
                }}
                sx={{
                  mb: 3,
                  '& .MuiTab-root': {color: '#8b949e'},
                  '& .Mui-selected': {color: '#ffeb3b !important'},
                  '& .MuiTabs-indicator': {bgcolor: '#ffeb3b'},
                }}>
                <Tab label='Процедура' />
                <Tab label='Функция' />
              </Tabs>

              <Box
                sx={{
                  p: 2,
                  bgcolor: '#2d2d2d',
                  borderRadius: 2,
                  borderLeft: '4px solid #ffeb3b',
                  mb: 3,
                }}>
                {tabIndex === 0 ? (
                  <>
                    <Typography component='div' sx={getLineStyle(0)}>
                      def procedure_print(x):
                    </Typography>
                    <Typography component='div' sx={getLineStyle(1)}>
                      print(f"Квадрат: {'{x * x}'}")
                    </Typography>
                    <Typography component='div' sx={getLineStyle(2)}>
                      # Нет оператора return
                    </Typography>
                    <Typography component='div' sx={getLineStyle(3)}>
                      {`\n# Вызов:\nprocedure_print(${paramValue})`}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography component='div' sx={getLineStyle(0)}>
                      def function_cube(x):
                    </Typography>
                    <Typography component='div' sx={getLineStyle(1)}>
                      res = x * x * x
                    </Typography>
                    <Typography component='div' sx={getLineStyle(2)}>
                      return res
                    </Typography>
                    <Typography component='div' sx={getLineStyle(3)}>
                      {`\n# Вызов:\nresult = function_cube(${paramValue})`}
                    </Typography>
                  </>
                )}
              </Box>

              <Stack spacing={2}>
                <TextField
                  fullWidth
                  size='small'
                  label='Аргумент (x)'
                  type='number'
                  value={paramValue}
                  onChange={(e) => setParamValue(Number(e.target.value))}
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
                  {tabIndex === 0 ? 'Запустить процедуру' : 'Запустить функцию'}
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
          </Stack>
        </Grid>

        {/* КОНСОЛЬ И РЕЗУЛЬТАТ */}
        <Grid size={{xs: 12, md: 7}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: 4,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Box>
              <Typography variant='subtitle2' sx={{color: '#8b949e', mb: 1}}>
                Консоль Python:
              </Typography>
              <Box
                sx={{
                  bgcolor: '#000',
                  p: 3,
                  borderRadius: 2,
                  height: 320,
                  overflowY: 'auto',
                  border: '1px solid #333',
                  fontFamily: 'monospace',
                }}>
                {history.map((line, idx) => (
                  <Typography
                    key={idx}
                    sx={{
                      color:
                        line.includes('Завершена') || line.includes('Возврат')
                          ? '#4af626'
                          : '#8b949e',
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
            </Box>

            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: '#161b22',
                borderRadius: 2,
                border: '1px solid #30363d',
              }}>
              <Typography variant='body2' sx={{color: '#8b949e'}}>
                {tabIndex === 0 ? (
                  <>
                    Статус процедуры:{' '}
                    <span style={{color: '#ffeb3b'}}>
                      Выполняет действия, ничего не возвращает в переменную.
                    </span>
                  </>
                ) : (
                  <>
                    Результат в переменной <b>result</b>:{' '}
                    <span style={{color: '#4af626', fontSize: '1.1rem'}}>
                      {lastResult !== null ? lastResult : 'не определен'}
                    </span>
                  </>
                )}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
