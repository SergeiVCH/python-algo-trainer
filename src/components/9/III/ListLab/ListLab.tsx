import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import FunctionsIcon from '@mui/icons-material/Functions'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PostAddIcon from '@mui/icons-material/PostAdd'
import ReplayIcon from '@mui/icons-material/Replay'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'
import StorageIcon from '@mui/icons-material/Storage'
import StraightenIcon from '@mui/icons-material/Straighten'
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import {useState} from 'react'

export const ListLab = () => {
  const [list, setList] = useState<number[]>([12, 5, 8, 21, 3])

  // --- ИНФОРМАЦИОННЫЕ МЕТОДЫ (Таблица 1 / Скрин 2) ---
  const showLen = () => alert(`len(list): ${list.length}`)
  const showMax = () =>
    list.length > 0 && alert(`max(list): ${Math.max(...list)}`)
  const showMin = () =>
    list.length > 0 && alert(`min(list): ${Math.min(...list)}`)
  const showIndex = () => {
    if (list.length === 0) return
    const val = list[0]
    alert(`index(${val}): ${list.indexOf(val)} (индекс первого вхождения)`)
  }

  // --- МЕТОДЫ ИЗМЕНЕНИЯ (Таблица 4.3) ---
  const handleAppend = () => {
    const nextVal = Math.floor(Math.random() * 50) + 1
    setList([...list, nextVal])
  }

  const handleExtend = () => setList([...list, 10, 20])

  const handleSum = () => {
    const total = list.reduce((a, b) => a + b, 0)
    alert(`sum(list): ${total}`)
  }

  const handleMultiply = () => {
    if (list.length > 10) return
    setList([...list, ...list])
  }

  const handlePop = () => {
    const newList = [...list]
    newList.pop()
    setList(newList)
  }

  const handleReverse = () => setList([...list].reverse())
  const handleSort = () => setList([...list].sort((a, b) => a - b))
  const handleClear = () => setList([])

  return (
    <Container maxWidth='lg' sx={{py: 6}}>
      {/* Шапка компоненты */}
      <Box sx={{textAlign: 'center', mb: 5}}>
        <Typography
          variant='h3'
          sx={{
            fontWeight: 900,
            color: '#fff',
            mb: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}>
          <StorageIcon sx={{fontSize: 45, color: '#2196f3'}} />
          Лаборатория списков
        </Typography>
        <Typography variant='h6' sx={{color: '#8b949e'}}>
          Интерактивная работа с одномерными массивами Python
        </Typography>
      </Box>

      {/* Визуализация ячеек памяти */}
      <Paper
        sx={{
          p: 4,
          bgcolor: '#0d1117',
          border: '1px solid #30363d',
          borderRadius: 4,
          mb: 4,
        }}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 3}}>
          <Typography
            variant='subtitle1'
            sx={{color: '#58a6ff', fontWeight: 'bold'}}>
            Memory View (Ячейки):
          </Typography>
          <Chip
            label={`len = ${list.length}`}
            variant='outlined'
            sx={{color: '#fff', borderColor: '#30363d'}}
          />
        </Box>
        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2, minHeight: 80}}>
          {list.map((val, idx) => (
            <Box key={idx} sx={{textAlign: 'center'}}>
              <Tooltip title={`Index: ${idx}`}>
                <Paper
                  sx={{
                    width: 55,
                    height: 55,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#161b22',
                    border: '2px solid #2196f3',
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: 2,
                  }}>
                  {val}
                </Paper>
              </Tooltip>
              <Typography
                variant='caption'
                sx={{color: '#8b949e', mt: 0.5, display: 'block'}}>
                [{idx}]
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Блок 1: Информационные методы */}
        <Grid size={{xs: 12, md: 5}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 3,
              height: '100%',
            }}>
            <Typography
              variant='subtitle1'
              sx={{color: '#00bcd4', mb: 2, fontWeight: 'bold'}}>
              Функции анализа
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{xs: 6}}>
                <Button
                  fullWidth
                  variant='outlined'
                  startIcon={<StraightenIcon />}
                  onClick={showLen}>
                  len()
                </Button>
              </Grid>
              <Grid size={{xs: 6}}>
                <Button
                  fullWidth
                  variant='outlined'
                  startIcon={<KeyboardArrowUpIcon />}
                  onClick={showMax}>
                  max()
                </Button>
              </Grid>
              <Grid size={{xs: 6}}>
                <Button
                  fullWidth
                  variant='outlined'
                  startIcon={<KeyboardArrowDownIcon />}
                  onClick={showMin}>
                  min()
                </Button>
              </Grid>
              <Grid size={{xs: 6}}>
                <Button
                  fullWidth
                  variant='outlined'
                  startIcon={<SearchIcon />}
                  onClick={showIndex}>
                  index()
                </Button>
              </Grid>
            </Grid>
            <Alert
              severity='info'
              sx={{
                mt: 3,
                bgcolor: 'transparent',
                color: '#8b949e',
                border: '1px solid #30363d',
              }}>
              Эти функции не изменяют массив, а вычисляют значения на основе его
              данных.
            </Alert>
          </Paper>
        </Grid>

        {/* Блок 2: Методы изменения */}
        <Grid size={{xs: 12, md: 7}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 3,
            }}>
            <Typography
              variant='subtitle1'
              sx={{color: '#4caf50', mb: 2, fontWeight: 'bold'}}>
              Методы модификации
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{xs: 12, sm: 6}}>
                <Button
                  fullWidth
                  variant='contained'
                  startIcon={<AddCircleIcon />}
                  onClick={handleAppend}
                  sx={{bgcolor: '#238636'}}>
                  append(x)
                </Button>
              </Grid>
              <Grid size={{xs: 12, sm: 6}}>
                <Button
                  fullWidth
                  variant='outlined'
                  startIcon={<PostAddIcon />}
                  onClick={handleExtend}>
                  extend([10,20])
                </Button>
              </Grid>
              <Grid size={{xs: 12, sm: 6}}>
                <Button
                  fullWidth
                  variant='outlined'
                  color='info'
                  startIcon={<FunctionsIcon />}
                  onClick={handleSum}>
                  sum(list)
                </Button>
              </Grid>
              <Grid size={{xs: 12, sm: 6}}>
                <Button
                  fullWidth
                  variant='outlined'
                  color='secondary'
                  onClick={handleMultiply}>
                  list * 2
                </Button>
              </Grid>

              <Grid size={{xs: 12}}>
                <Divider sx={{my: 1, borderColor: '#30363d'}} />
              </Grid>

              <Grid size={{xs: 4}}>
                <Button
                  fullWidth
                  size='small'
                  color='error'
                  startIcon={<DeleteSweepIcon />}
                  onClick={handlePop}>
                  pop()
                </Button>
              </Grid>
              <Grid size={{xs: 4}}>
                <Button
                  fullWidth
                  size='small'
                  startIcon={<ReplayIcon />}
                  onClick={handleReverse}>
                  reverse()
                </Button>
              </Grid>
              <Grid size={{xs: 4}}>
                <Button
                  fullWidth
                  size='small'
                  startIcon={<SortIcon />}
                  sx={{color: '#00bcd4'}}
                  onClick={handleSort}>
                  sort()
                </Button>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant='text'
              color='error'
              onClick={handleClear}
              sx={{mt: 2, fontSize: '0.7rem', opacity: 0.7}}>
              Очистить (s = [])
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
