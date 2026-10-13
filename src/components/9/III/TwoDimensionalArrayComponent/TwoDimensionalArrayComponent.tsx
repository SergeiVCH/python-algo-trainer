import {useState, useRef} from 'react'
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Alert,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import CodeIcon from '@mui/icons-material/Code'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

export const TwoDimensionalArrayComponent = () => {
  const [matrix, setMatrix] = useState<(number | string)[][]>([
    ['?', '?', '?'],
    ['?', '?', '?'],
    ['?', '?', '?'],
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [activeLine, setActiveLine] = useState<number | null>(null)
  const [indices, setIndices] = useState<{r: number; c: number} | null>(null)
  const [explanation, setExplanation] = useState(
    'Нажмите «Старт», чтобы создать матрицу',
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

  const startGeneration = async () => {
    if (isProcessing) return
    setIsProcessing(true)
    setIsPaused(false)
    isPausedRef.current = false

    const newMatrix = [
      ['?', '?', '?'],
      ['?', '?', '?'],
      ['?', '?', '?'],
    ]
    setMatrix(newMatrix)

    setExplanation('Инициализируем пустую матрицу 3x3')
    setActiveLine(1)
    await wait(1000)

    for (let r = 0; r < 3; r++) {
      setExplanation(`Внешний цикл: заходим в строку i = ${r}`)
      setActiveLine(2)
      await wait(1000)

      for (let c = 0; c < 3; c++) {
        setIndices({r, c})
        setExplanation(`Внутренний цикл: работаем со столбцом j = ${c}`)
        setActiveLine(3)
        await wait(800)

        const value = r * 3 + c + 1
        setExplanation(`Вычисляем значение: i * 3 + j + 1 = ${value}`)
        setActiveLine(4)

        const currentMatrix = JSON.parse(JSON.stringify(newMatrix))
        currentMatrix[r][c] = value.toString()
        newMatrix[r][c] = value.toString()
        setMatrix(currentMatrix)
        await wait(1200)
      }
    }

    setIndices(null)
    setExplanation('Матрица успешно заполнена!')
    setActiveLine(5)
    setIsProcessing(false)
  }

  const togglePause = () => {
    isPausedRef.current = !isPausedRef.current
    setIsPaused(isPausedRef.current)
    if (isPausedRef.current) setExplanation('Пауза: изучение текущего шага')
  }

  const reset = () => {
    isPausedRef.current = false
    setIsPaused(false)
    setIsProcessing(false)
    setMatrix([
      ['?', '?', '?'],
      ['?', '?', '?'],
      ['?', '?', '?'],
    ])
    setIndices(null)
    setActiveLine(null)
    setExplanation('Нажмите «Старт»')
  }

  const codeLines = [
    {id: 1, text: 'A = [[0]*3 for _ in range(3)]', indent: 0},
    {id: 2, text: 'for i in range(3):  # Строки', indent: 0},
    {id: 3, text: '    for j in range(3):  # Столбцы', indent: 4},
    {id: 4, text: '        A[i][j] = i * 3 + j + 1', indent: 8},
    {id: 5, text: 'print(A)', indent: 0},
  ]

  return (
    <Box sx={{p: 3, maxWidth: 1100, margin: '0 auto', color: '#e6edf3'}}>
      <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 3}}>
        <Box sx={{bgcolor: '#1f6feb', p: 1, borderRadius: 2}}>
          <CodeIcon sx={{fontSize: 30, color: '#fff'}} />
        </Box>
        <Box>
          <Typography variant='h4' sx={{fontWeight: 800}}>
            Двумерные массивы
          </Typography>
          <Typography variant='body1' sx={{color: '#8b949e'}}>
            Вложенные циклы и работа с индексами $A[i][j]$
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={4}>
        <Grid size={{xs: 12, md: 6}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 4,
              minHeight: 450,
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
                minHeight: 60,
                display: 'flex',
                gap: 2,
              }}>
              <InfoOutlinedIcon
                sx={{color: isPaused ? '#e3b341' : '#58a6ff'}}
              />
              <Typography variant='body2' sx={{color: '#adbac7'}}>
                {explanation}
              </Typography>
            </Paper>

            <TableContainer
              component={Box}
              sx={{display: 'flex', justifyContent: 'center', mb: 4}}>
              <Table
                sx={{
                  width: 'auto',
                  borderCollapse: 'separate',
                  borderSpacing: '8px',
                }}>
                <TableBody>
                  {matrix.map((row, rIdx) => (
                    <TableRow key={rIdx}>
                      {row.map((cell, cIdx) => (
                        <TableCell
                          key={cIdx}
                          sx={{
                            width: 60,
                            height: 60,
                            p: 0,
                            textAlign: 'center',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            bgcolor:
                              indices?.r === rIdx && indices?.c === cIdx
                                ? '#238636'
                                : indices?.r === rIdx
                                  ? 'rgba(31, 111, 235, 0.2)'
                                  : '#0d1117',
                            color: cell === '?' ? '#484f58' : '#fff',
                            border: '2px solid',
                            borderColor:
                              indices?.r === rIdx && indices?.c === cIdx
                                ? '#4caf50'
                                : '#30363d',
                            transition: '0.3s',
                            borderRadius: 2,
                          }}>
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack direction='row' spacing={2} justifyContent='center'>
              {!isProcessing ? (
                <Button
                  variant='contained'
                  color='success'
                  onClick={startGeneration}
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

        <Grid size={{xs: 12, md: 6}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: 4,
            }}>
            <Typography variant='subtitle2' sx={{mb: 2, color: '#58a6ff'}}>
              Алгоритм на Python:
            </Typography>
            <Box
              sx={{
                p: 2,
                bgcolor: '#161b22',
                borderRadius: 2,
                fontFamily: 'monospace',
                fontSize: '0.95rem',
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
                    transition: '0.3s',
                    lineHeight: 2,
                    whiteSpace: 'pre',
                  }}>
                  {line.text}
                </Box>
              ))}
            </Box>
            <Alert
              severity='info'
              sx={{
                mt: 3,
                bgcolor: '#0d1117',
                border: '1px solid #30363d',
                color: '#8b949e',
              }}>
              Первый индекс <b>i</b> всегда отвечает за номер строки, а второй{' '}
              <b>j</b> — за номер столбца.
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
