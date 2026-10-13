import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import NumbersIcon from '@mui/icons-material/Numbers'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import TextFormatIcon from '@mui/icons-material/TextFormat'
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import {useEffect, useRef, useState} from 'react'

const initialArray = [10, 20, 30, 40, 50]
const initialWord = 'ПИТОН'.split('')

export const ArraySwapComponent = () => {
  const [mode, setMode] = useState(0)
  const [data, setData] = useState<any[]>([...initialArray])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [activeLine, setActiveLine] = useState<number | null>(null)
  const [tempValue, setTempValue] = useState<string | number | null>(null)
  const [pointers, setPointers] = useState<{i: number; j: number} | null>(null)
  const [explanation, setExplanation] = useState<string>('Нажмите «Старт»')

  // Используем Ref для мгновенного доступа к состоянию паузы в цикле
  const isPausedRef = useRef(false)

  useEffect(() => {
    reset()
  }, [mode])

  // Функция ожидания с проверкой паузы
  const wait = async (ms: number) => {
    return new Promise<void>(async (resolve) => {
      await new Promise((r) => setTimeout(r, ms))
      // Если нажата пауза, ждем в бесконечном цикле пока её не отожмут
      while (isPausedRef.current) {
        await new Promise((r) => setTimeout(r, 100))
      }
      resolve()
    })
  }

  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current
    setIsPaused(isPausedRef.current)
    if (isPausedRef.current) {
      setExplanation('Алгоритм приостановлен. Нажмите «Продолжить»')
    }
  }

  const startSwap = async () => {
    if (isProcessing) return
    setIsProcessing(true)
    setIsPaused(false)
    isPausedRef.current = false

    const currentData = [...data]
    let i = 0
    let j = currentData.length - 1

    setExplanation('Начинаем цикл: пока левый индекс i меньше правого j')
    setActiveLine(3)
    await wait(1000)

    while (i < j) {
      setPointers({i, j})

      // 1. temp = A[i]
      const line1 = mode === 0 ? 4 : 5
      setActiveLine(line1)
      setExplanation(
        `Шаг 1: Берем ${currentData[i]} (индекс ${i}) и кладем в temp`,
      )
      setTempValue(currentData[i])
      await wait(1200)

      // 2. A[i] = A[j]
      const line2 = mode === 0 ? 5 : 6
      setActiveLine(line2)
      setExplanation(
        `Шаг 2: В ячейку ${i} записываем значение ${currentData[j]} из ячейки ${j}`,
      )
      currentData[i] = currentData[j]
      setData([...currentData])
      await wait(1200)

      // 3. A[j] = temp
      const line3 = mode === 0 ? 6 : 7
      setActiveLine(line3)
      setExplanation(
        `Шаг 3: Теперь в ячейку ${j} возвращаем значение ${tempValue ?? currentData[i]} из temp`,
      )
      currentData[j] = (tempValue ?? currentData[i]) as any
      setData([...currentData])
      setTempValue(null)
      await wait(1200)

      // 4. Сдвиг
      const line4 = mode === 0 ? 7 : 8
      setActiveLine(line4)
      setExplanation('Сдвигаем границы: i идет вправо, j идет влево')
      i++
      j--
      await wait(800)
    }

    setActiveLine(mode === 0 ? 8 : 9)
    setExplanation('Готово! Массив полностью инвертирован.')
    setIsProcessing(false)
    setPointers(null)
  }

  const reset = () => {
    isPausedRef.current = false
    setIsPaused(false)
    setData(mode === 0 ? [...initialArray] : [...initialWord])
    setActiveLine(null)
    setTempValue(null)
    setPointers(null)
    setIsProcessing(false)
    setExplanation(mode === 0 ? 'Режим: Числа' : 'Режим: Строки')
  }

  const codeLines =
    mode === 0
      ? [
          {id: 1, text: `A = [10, 20, 30, 40, 50]`, indent: 0},
          {id: 2, text: `i, j = 0, len(A) - 1`, indent: 0},
          {id: 3, text: `while i < j:`, indent: 0},
          {id: 4, text: `    temp = A[i]`, indent: 4},
          {id: 5, text: `    A[i] = A[j]`, indent: 4},
          {id: 6, text: `    A[j] = temp`, indent: 4},
          {id: 7, text: `    i += 1; j -= 1`, indent: 4},
          {id: 8, text: `print(A)`, indent: 0},
        ]
      : [
          {id: 1, text: `S = "ПИТОН"`, indent: 0},
          {id: 2, text: `A = list(S)`, indent: 0},
          {id: 3, text: `i, j = 0, len(A) - 1`, indent: 0},
          {id: 4, text: `while i < j:`, indent: 0},
          {id: 5, text: `    temp = A[i]`, indent: 4},
          {id: 6, text: `    A[i] = A[j]`, indent: 4},
          {id: 7, text: `    A[j] = temp`, indent: 4},
          {id: 8, text: `    i += 1; j -= 1`, indent: 4},
          {id: 9, text: `print("".join(A))`, indent: 0},
        ]

  return (
    <Box sx={{p: 3, maxWidth: 1000, margin: '0 auto', color: '#e6edf3'}}>
      <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 2}}>
        <SwapHorizIcon sx={{fontSize: 40, color: '#4caf50'}} />
        <Box>
          <Typography variant='h4' sx={{fontWeight: 800}}>
            Перестановка элементов
          </Typography>
        </Box>
      </Stack>

      <Tabs value={mode} onChange={(_, v) => setMode(v)} centered sx={{mb: 4}}>
        <Tab icon={<NumbersIcon />} label='Числа' />
        <Tab icon={<TextFormatIcon />} label='Слово' />
      </Tabs>

      <Grid container spacing={4}>
        <Grid size={{xs: 12, lg: 7}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 4,
              minHeight: 380,
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 4,
                bgcolor: isPaused
                  ? 'rgba(210, 153, 34, 0.1)'
                  : 'rgba(56, 139, 253, 0.1)',
                border: '1px solid #30363d',
                borderRadius: 2,
                display: 'flex',
                gap: 2,
              }}>
              <InfoOutlinedIcon
                sx={{color: isPaused ? '#e3b341' : '#58a6ff'}}
              />
              <Typography variant='body1' sx={{color: '#adbac7'}}>
                {explanation}
              </Typography>
            </Paper>

            <Box
              sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'center',
                mb: 8,
                alignItems: 'flex-end',
                flexHeight: 100,
              }}>
              {data.map((val, idx) => (
                <Box key={idx} sx={{textAlign: 'center'}}>
                  <Typography
                    variant='caption'
                    sx={{
                      color:
                        pointers?.i === idx
                          ? '#4caf50'
                          : pointers?.j === idx
                            ? '#f44336'
                            : '#8b949e',
                    }}>
                    {pointers?.i === idx
                      ? 'i'
                      : pointers?.j === idx
                        ? 'j'
                        : idx}
                  </Typography>
                  <Paper
                    sx={{
                      width: 50,
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      bgcolor:
                        pointers?.i === idx || pointers?.j === idx
                          ? '#1f6feb'
                          : '#0d1117',
                      border: '2px solid',
                      borderColor:
                        pointers?.i === idx
                          ? '#4caf50'
                          : pointers?.j === idx
                            ? '#f44336'
                            : '#30363d',
                      borderRadius: mode === 1 ? '50%' : 2,
                      transition: '0.3s',
                    }}>
                    {val}
                  </Paper>
                </Box>
              ))}

              <Box sx={{ml: 4, textAlign: 'center'}}>
                <Typography variant='caption' sx={{color: '#ff9800'}}>
                  temp
                </Typography>
                <Paper
                  sx={{
                    width: 50,
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#21262d',
                    border: '2px dashed #ff9800',
                    color: '#ff9800',
                  }}>
                  {tempValue ?? ''}
                </Paper>
              </Box>
            </Box>

            <Stack
              direction='row'
              spacing={2}
              justifyContent='center'
              sx={{mt: 'auto'}}>
              {!isProcessing ? (
                <Button
                  variant='contained'
                  color='success'
                  onClick={startSwap}
                  startIcon={<PlayArrowIcon />}>
                  Старт
                </Button>
              ) : (
                <Button
                  variant='contained'
                  color='warning'
                  onClick={togglePause}
                  startIcon={isPaused ? <PlayArrowIcon /> : <PauseIcon />}>
                  {isPaused ? 'Продолжить' : 'Пауза'}
                </Button>
              )}
              <Button
                variant='outlined'
                onClick={reset}
                startIcon={<RestartAltIcon />}>
                Сброс
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{xs: 12, lg: 5}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: 4,
            }}>
            <Box
              sx={{
                p: 2,
                bgcolor: '#161b22',
                borderRadius: 2,
                fontFamily: 'monospace',
                minHeight: 260,
              }}>
              {codeLines.map((line) => (
                <Box
                  key={line.id}
                  sx={{
                    pl: line.indent / 4,
                    bgcolor:
                      activeLine === line.id
                        ? 'rgba(76, 175, 80, 0.2)'
                        : 'transparent',
                    color: activeLine === line.id ? '#4caf50' : '#d1d5db',
                    borderLeft:
                      activeLine === line.id
                        ? '3px solid #4caf50'
                        : '3px solid transparent',
                    whiteSpace: 'pre',
                    fontSize: '0.9rem',
                    lineHeight: 1.8,
                  }}>
                  {line.text}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
