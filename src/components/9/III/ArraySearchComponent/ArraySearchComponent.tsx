import CodeIcon from '@mui/icons-material/Code'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SearchIcon from '@mui/icons-material/Search'
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid, // В новых версиях MUI используется Grid2
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import {useEffect, useState} from 'react'

const initialArray = [12, 45, 7, 23, 56, 89, 34, 10]

export const ArraySearchComponent = () => {
  const [array, setArray] = useState(initialArray)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [target, _setTarget] = useState(23)
  const [isSearching, setIsSearching] = useState(false)
  const [foundIndex, setFoundIndex] = useState<number | null>(null)
  const [searchStep, setSearchStep] = useState(0)

  // НОВОЕ: Состояние для активной строки кода
  const [activeLine, setActiveLine] = useState<number | null>(null)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (isSearching && searchStep < array.length) {
      // 1. Подсвечиваем строку цикла
      setActiveLine(4) // Строка с "for"

      timer = setTimeout(() => {
        // 2. Подсвечиваем проверку условия
        setCurrentIndex(searchStep)
        setActiveLine(5) // Строка с "if"

        timer = setTimeout(() => {
          if (array[searchStep] === target) {
            // 3. Если нашли — подсвечиваем break
            setFoundIndex(searchStep)
            setActiveLine(6)
            setIsSearching(false)
          } else {
            // 4. Если не нашли — продолжаем цикл
            setSearchStep((prev) => prev + 1)
          }
        }, 800)
      }, 800)
    } else if (searchStep === array.length && isSearching) {
      setIsSearching(false)
      setActiveLine(8) // Строка с "else"
    }

    return () => clearTimeout(timer)
  }, [isSearching, searchStep, array, target])

  const startSearch = () => {
    setSearchStep(0)
    setFoundIndex(null)
    setCurrentIndex(-1)
    setActiveLine(null)
    setIsSearching(true)
  }

  const generateArray = () => {
    const newArr = Array.from({length: 8}, () =>
      Math.floor(Math.random() * 100),
    )
    setArray(newArr)
    setIsSearching(false)
    setSearchStep(0)
    setFoundIndex(null)
    setCurrentIndex(-1)
    setActiveLine(null)
  }

  // Данные кода для рендеринга
  const codeLines = [
    {id: 1, text: `A = [${array.join(', ')}]`, indent: 0},
    {id: 2, text: `target = ${target}`, indent: 0},
    {id: 3, text: `found_idx = -1`, indent: 0},
    {id: 0, text: ``, indent: 0}, // Пустая строка
    {id: 4, text: `for i in range(len(A)):`, indent: 0},
    {id: 5, text: `if A[i] == target:`, indent: 4},
    {id: 6, text: `found_idx = i; break`, indent: 8},
    {id: 0, text: ``, indent: 0},
    {id: 7, text: `if found_idx != -1:`, indent: 0},
    {id: 8, text: `print("Найдено")`, indent: 4},
  ]

  return (
    <Box sx={{p: 3, maxWidth: 1000, margin: '0 auto', color: '#e6edf3'}}>
      <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 4}}>
        <SearchIcon sx={{fontSize: 40, color: '#ff9800'}} />
        <Box>
          <Typography variant='h4' sx={{fontWeight: 800}}>
            Поиск в массиве
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={4}>
        <Grid size={{xs: 12, lg: 7}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 4,
            }}>
            <Typography variant='h6' sx={{mb: 3}}>
              Визуализация алгоритма
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'center',
                mb: 4,
                flexWrap: 'wrap',
              }}>
              {array.map((val, i) => (
                <Box key={i} sx={{textAlign: 'center'}}>
                  <Typography
                    variant='caption'
                    sx={{color: '#8b949e', mb: 0.5, display: 'block'}}>
                    [{i}]
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
                        i === currentIndex
                          ? '#ff9800'
                          : i === foundIndex
                            ? '#3fb950'
                            : '#0d1117',
                      color:
                        i === currentIndex || i === foundIndex
                          ? '#000'
                          : '#fff',
                      border: '2px solid',
                      borderColor:
                        i === currentIndex
                          ? '#ff9800'
                          : i === foundIndex
                            ? '#3fb950'
                            : '#30363d',
                      transition: 'all 0.3s ease',
                      transform: i === currentIndex ? 'scale(1.1)' : 'scale(1)',
                    }}>
                    {val}
                  </Paper>
                </Box>
              ))}
            </Box>
            <Stack direction='row' spacing={2} justifyContent='center'>
              <Button
                variant='contained'
                color='warning'
                onClick={startSearch}
                disabled={isSearching}
                startIcon={<PlayArrowIcon />}>
                Запустить поиск
              </Button>
              <Button
                variant='outlined'
                onClick={generateArray}
                startIcon={<RestartAltIcon />}>
                Новый массив
              </Button>
            </Stack>
            {foundIndex !== null && (
              <Alert
                severity='success'
                sx={{mt: 3, bgcolor: '#1f6feb22', color: '#fff'}}>
                Элемент найден в позиции <b>{foundIndex}</b>
              </Alert>
            )}
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
            <Stack direction='row' spacing={1} alignItems='center' sx={{mb: 2}}>
              <CodeIcon sx={{color: '#58a6ff'}} />
              <Typography variant='h6'>Реализация на Python</Typography>
            </Stack>

            {/* ИЗМЕНЕННЫЙ РАЗДЕЛ: Построчный вывод кода с подсветкой */}
            <Box
              sx={{
                p: 2,
                bgcolor: '#161b22',
                borderRadius: 2,
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                border: '1px solid #30363d',
                overflow: 'hidden',
              }}>
              {codeLines.map((line, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'block',
                    pl: line.indent,
                    bgcolor:
                      activeLine === line.id
                        ? 'rgba(255, 152, 0, 0.2)'
                        : 'transparent',
                    color: activeLine === line.id ? '#ff9800' : '#d1d5db',
                    borderLeft:
                      activeLine === line.id
                        ? '3px solid #ff9800'
                        : '3px solid transparent',
                    transition: 'background-color 0.2s',
                    whiteSpace: 'pre',
                    minHeight: '1.2rem',
                  }}>
                  {line.text}
                </Box>
              ))}
            </Box>

            <Divider sx={{my: 3, borderColor: '#30363d'}} />
            <Typography variant='subtitle2' sx={{color: '#58a6ff', mb: 1}}>
              Суть алгоритма:
            </Typography>
            <Typography
              variant='body2'
              sx={{color: '#8b949e', lineHeight: 1.6}}>
              Алгоритм последовательно проверяет каждый элемент. Если значение
              совпадает с целью, цикл прерывается.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
