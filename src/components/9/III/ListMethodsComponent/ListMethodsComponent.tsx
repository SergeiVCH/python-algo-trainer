import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CalculateIcon from '@mui/icons-material/Calculate'
import CodeIcon from '@mui/icons-material/Code'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ReplayIcon from '@mui/icons-material/Replay'
import {
    Box,
    Button,
    Chip,
    Divider,
     Grid,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { useState } from 'react'

const initialList = [10, 20, 30, 20, 40]

export const ListMethodsComponent = () => {
  const [list, setList] = useState<number[]>([...initialList])
  const [inputValue, setInputValue] = useState<string>('50')
  const [indexValue, setIndexValue] = useState<string>('2')
  const [explanation, setExplanation] = useState(
    'Выберите метод для изменения списка',
  )
  const [activeLine, setActiveLine] = useState<number | null>(null)
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null)

  const handleInsert = () => {
    const val = parseInt(inputValue)
    const idx = parseInt(indexValue)
    if (isNaN(val) || isNaN(idx)) return

    setActiveLine(1)
    setExplanation(
      `Метод insert(${idx}, ${val}): вставляем значение ${val} на позицию ${idx}. Все элементы справа сдвигаются.`,
    )

    const newList = [...list]
    newList.splice(idx, 0, val)
    setList(newList)
    setHighlightIdx(idx)
    setTimeout(() => setHighlightIdx(null), 1500)
  }

  const handleRemove = () => {
    const val = parseInt(inputValue)
    if (isNaN(val)) return

    setActiveLine(2)
    const firstIdx = list.indexOf(val)

    if (firstIdx !== -1) {
      setExplanation(
        `Метод remove(${val}): удаляем ПЕРВОЕ вхождение числа ${val} (индекс ${firstIdx}). Список сокращается.`,
      )
      setHighlightIdx(firstIdx)
      setTimeout(() => {
        const newList = list.filter((_, i) => i !== firstIdx)
        setList(newList)
        setHighlightIdx(null)
      }, 800)
    } else {
      setExplanation(`Ошибка! Значение ${val} не найдено в списке.`)
    }
  }

  const handleCount = () => {
    const val = parseInt(inputValue)
    if (isNaN(val)) return

    setActiveLine(3)
    const count = list.filter((x) => x === val).length
    setExplanation(
      `Метод count(${val}): считаем, сколько раз встречается число ${val}. Ответ: ${count}`,
    )
  }

  const handleClear = () => {
    setActiveLine(4)
    setExplanation(
      'Метод clear(): полностью очищаем список. len(A) станет равным 0.',
    )
    setList([])
  }

  const reset = () => {
    setList([...initialList])
    setExplanation('Список восстановлен')
    setActiveLine(null)
  }

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
        <AddCircleOutlineIcon color='primary' /> Методы списков
      </Typography>

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
            {/* Визуализация списка */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                mb: 6,
                justifyContent: 'center',
                minHeight: 80,
              }}>
              {list.length > 0 ? (
                list.map((val, idx) => (
                  <Box key={idx} sx={{textAlign: 'center'}}>
                    <Typography variant='caption' sx={{color: '#8b949e'}}>
                      {idx}
                    </Typography>
                    <Paper
                      sx={{
                        width: 55,
                        height: 55,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        bgcolor: highlightIdx === idx ? '#238636' : '#0d1117',
                        border: '2px solid',
                        borderColor:
                          highlightIdx === idx ? '#4caf50' : '#30363d',
                        transition: '0.4s',
                        transform: highlightIdx === idx ? 'scale(1.1)' : 'none',
                      }}>
                      {val}
                    </Paper>
                  </Box>
                ))
              ) : (
                <Typography sx={{color: '#8b949e', fontStyle: 'italic', mt: 4}}>
                  Список пуст []
                </Typography>
              )}
            </Box>

            <Divider sx={{mb: 4, bgcolor: '#30363d'}} />

            {/* Панель управления */}
            <Stack spacing={3}>
              <Stack direction='row' spacing={2} alignItems='center'>
                <TextField
                  label='Значение'
                  size='small'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  sx={{width: 100, '& .MuiInputBase-root': {color: '#fff'}}}
                />
                <TextField
                  label='Индекс'
                  size='small'
                  value={indexValue}
                  onChange={(e) => setIndexValue(e.target.value)}
                  sx={{width: 100, '& .MuiInputBase-root': {color: '#fff'}}}
                />
              </Stack>

              <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2}}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleInsert}
                  startIcon={<AddCircleOutlineIcon />}>
                  insert
                </Button>
                <Button
                  variant='contained'
                  color='error'
                  onClick={handleRemove}
                  startIcon={<DeleteOutlineIcon />}>
                  remove
                </Button>
                <Button
                  variant='contained'
                  color='info'
                  onClick={handleCount}
                  startIcon={<CalculateIcon />}>
                  count
                </Button>
                <Button
                  variant='outlined'
                  color='warning'
                  onClick={handleClear}>
                  clear
                </Button>
                <Button
                  variant='outlined'
                  onClick={reset}
                  startIcon={<ReplayIcon />}>
                  Сброс
                </Button>
              </Box>
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
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                bgcolor: 'rgba(56, 139, 253, 0.1)',
                border: '1px inset rgba(56, 139, 253, 0.3)',
                display: 'flex',
                gap: 1.5,
              }}>
              <InfoOutlinedIcon sx={{color: '#58a6ff', fontSize: 20}} />
              <Typography variant='body2' sx={{color: '#adbac7'}}>
                {explanation}
              </Typography>
            </Paper>

            <Typography
              variant='subtitle2'
              sx={{
                mb: 1.5,
                color: '#58a6ff',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}>
              <CodeIcon fontSize='small' /> Python Code:
            </Typography>
            <Box
              sx={{
                p: 2,
                bgcolor: '#161b22',
                borderRadius: 2,
                fontFamily: 'monospace',
                fontSize: '0.9rem',
              }}>
              <Box
                sx={{color: activeLine === 1 ? '#4caf50' : '#d1d5db', mb: 1}}>
                A.insert({indexValue || 'i'}, {inputValue || 'x'})
              </Box>
              <Box
                sx={{color: activeLine === 2 ? '#4caf50' : '#d1d5db', mb: 1}}>
                A.remove({inputValue || 'x'})
              </Box>
              <Box
                sx={{color: activeLine === 3 ? '#4caf50' : '#d1d5db', mb: 1}}>
                A.count({inputValue || 'x'})
              </Box>
              <Box sx={{color: activeLine === 4 ? '#4caf50' : '#d1d5db'}}>
                A.clear()
              </Box>
            </Box>

            <Stack spacing={1} sx={{mt: 3}}>
              <Chip
                label='insert: (индекс, значение)'
                size='small'
                variant='outlined'
                sx={{color: '#8b949e'}}
              />
              <Chip
                label='remove: удаляет ПЕРВОЕ совпадение'
                size='small'
                variant='outlined'
                sx={{color: '#8b949e'}}
              />
              <Chip
                label='count: не меняет список'
                size='small'
                variant='outlined'
                sx={{color: '#8b949e'}}
              />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
