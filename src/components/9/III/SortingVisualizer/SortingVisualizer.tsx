import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SortIcon from '@mui/icons-material/Sort'
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import {useRef, useState} from 'react'

const initialArray = [45, 12, 89, 33, 7]

export const SortingVisualizer = () => {
  const [data, setData] = useState<number[]>([...initialArray])
  const [mode, setMode] = useState(0) // 0: Пузырек (возр), 1: Пузырек (убыв), 2: sort/sorted
  const [isProcessing, setIsProcessing] = useState(false)
  const [_isPaused, setIsPaused] = useState(false)
  const [activeLine, setActiveLine] = useState<number | null>(null)
  const [pointers, setPointers] = useState<{j: number; next: number} | null>(
    null,
  )
  const [explanation, setExplanation] = useState(
    'Выберите метод сортировки и нажмите Старт',
  )

  const isPausedRef = useRef(false)

  const wait = async (ms: number) => {
    return new Promise<void>(async (resolve) => {
      await new Promise((r) => setTimeout(r, ms))
      while (isPausedRef.current) {
        await new Promise((r) => setTimeout(r, 100))
      }
      resolve()
    })
  }

  const bubbleSort = async (descending = false) => {
    setIsProcessing(true)
    let arr = [...data]
    const n = arr.length

    setExplanation('Начинаем сортировку пузырьком...')
    setActiveLine(1)
    await wait(1000)

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setPointers({j, next: j + 1})
        setActiveLine(3)
        setExplanation(`Сравниваем ${arr[j]} и ${arr[j + 1]}`)
        await wait(800)

        const shouldSwap = descending
          ? arr[j] < arr[j + 1]
          : arr[j] > arr[j + 1]

        if (shouldSwap) {
          setExplanation(
            `Условие верно! Меняем местами ${arr[j]} и ${arr[j + 1]}`,
          )
          setActiveLine(4)
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setData([...arr])
          await wait(1000)
        } else {
          setExplanation(`Порядок верный, оставляем как есть`)
          await wait(600)
        }
      }
    }

    setPointers(null)
    setActiveLine(null)
    setExplanation(
      `Готово! Массив отсортирован по ${descending ? 'убыванию' : 'возрастанию'}`,
    )
    setIsProcessing(false)
  }

  const pythonBuiltInMethods = async () => {
    setIsProcessing(true)
    setExplanation('В Python есть готовые методы для быстрой сортировки.')
    setActiveLine(1)
    await wait(1500)

    setExplanation('Метод .sort() меняет сам список (A.sort())')
    setActiveLine(2)
    let arr = [...data].sort((a, b) => a - b)
    setData(arr)
    await wait(2000)

    setExplanation('Функция sorted(A) создает НОВЫЙ список, не меняя старый.')
    setActiveLine(3)
    await wait(2000)

    setIsProcessing(false)
    setExplanation('Методы Python работают гораздо быстрее ручных циклов!')
  }

  const reset = () => {
    setData([...initialArray])
    setIsProcessing(false)
    setIsPaused(false)
    isPausedRef.current = false
    setActiveLine(null)
    setPointers(null)
    setExplanation('Данные сброшены')
  }

  const codeSnippets = [
    // Пузырек Возрастание
    [
      {id: 1, text: 'for i in range(n-1):', indent: 0},
      {id: 2, text: '    for j in range(n-i-1):', indent: 4},
      {id: 3, text: '        if A[j] > A[j+1]:', indent: 8},
      {id: 4, text: '            A[j], A[j+1] = A[j+1], A[j]', indent: 12},
    ],
    // Пузырек Убывание
    [
      {id: 1, text: 'for i in range(n-1):', indent: 0},
      {id: 2, text: '    for j in range(n-i-1):', indent: 4},
      {id: 3, text: '        if A[j] < A[j+1]: # Знак меньше', indent: 8},
      {id: 4, text: '            A[j], A[j+1] = A[j+1], A[j]', indent: 12},
    ],
    // Built-in
    [
      {id: 1, text: 'A = [45, 12, 89, 33, 7]', indent: 0},
      {id: 2, text: 'A.sort() # Меняет оригинал', indent: 0},
      {id: 3, text: 'B = sorted(A) # Создает копию', indent: 0},
      {id: 4, text: 'A.sort(reverse=True) # Убывание', indent: 0},
    ],
  ]

  return (
    <Box sx={{p: 3, maxWidth: 1000, margin: '0 auto', color: '#e6edf3'}}>
      <Typography
        variant='h4'
        sx={{
          fontWeight: 800,
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}>
        <SortIcon color='primary' /> Сортировка массивов
      </Typography>

      <Tabs
        value={mode}
        onChange={(_, v) => {
          setMode(v)
          reset()
        }}
        centered
        sx={{mb: 3}}>
        <Tab label='Пузырек (↑)' />
        <Tab label='Пузырек (↓)' />
        <Tab label='sort / sorted' />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{xs: 12, md: 7}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 4,
              minHeight: 400,
            }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 4,
                bgcolor: 'rgba(56, 139, 253, 0.1)',
                border: '1px solid #30363d',
                display: 'flex',
                gap: 2,
              }}>
              <InfoOutlinedIcon sx={{color: '#58a6ff'}} />
              <Typography variant='body2'>{explanation}</Typography>
            </Paper>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: 1,
                height: 150,
                mb: 4,
              }}>
              {data.map((val, idx) => (
                <Box key={idx} sx={{textAlign: 'center'}}>
                  <Paper
                    sx={{
                      width: 50,
                      height: val * 1.5, // Визуализация высоты
                      bgcolor:
                        pointers?.j === idx || pointers?.next === idx
                          ? '#238636'
                          : '#1f6feb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      transition: '0.3s',
                      borderRadius: '4px 4px 0 0',
                    }}>
                    {val}
                  </Paper>
                  <Typography variant='caption' sx={{color: '#8b949e'}}>
                    {idx}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Stack direction='row' spacing={2} justifyContent='center'>
              <Button
                variant='contained'
                color='success'
                disabled={isProcessing}
                onClick={() =>
                  mode === 2 ? pythonBuiltInMethods() : bubbleSort(mode === 1)
                }
                startIcon={<PlayArrowIcon />}>
                Старт
              </Button>
              <Button
                variant='outlined'
                onClick={reset}
                startIcon={<RestartAltIcon />}>
                Сброс
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{xs: 12, md: 5}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: 4,
            }}>
            <Typography variant='subtitle2' sx={{mb: 2, color: '#58a6ff'}}>
              Python код:
            </Typography>
            <Box
              sx={{
                p: 2,
                bgcolor: '#161b22',
                borderRadius: 2,
                fontFamily: 'monospace',
              }}>
              {codeSnippets[mode].map((line) => (
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
                    lineHeight: 1.8,
                    fontSize: '0.85rem',
                  }}>
                  {line.text}
                </Box>
              ))}
            </Box>
            <Divider sx={{my: 2, bgcolor: '#30363d'}} />
            <Alert
              severity='warning'
              sx={{
                bgcolor: '#0d1117',
                color: '#d1d5db',
                border: '1px solid #30363d',
                fontSize: '0.8rem',
              }}>
              {mode === 2
                ? 'A.sort() — метод списка. sorted(A) — глобальная функция.'
                : 'Сортировка пузырьком — самая простая, но медленная (O(n²)).'}
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
