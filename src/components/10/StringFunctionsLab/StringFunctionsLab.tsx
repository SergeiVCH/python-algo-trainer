import FunctionsIcon from '@mui/icons-material/Functions'
import SearchIcon from '@mui/icons-material/Search'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import TransformIcon from '@mui/icons-material/Transform'
import ReplayIcon from '@mui/icons-material/Replay'
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import {useState} from 'react'

export const StringFunctionsLab = () => {
  const [strValue, setStrValue] = useState<string>('Informatics2026')
  const [subStr, setSubStr] = useState<string>('ics')
  const [log, setLog] = useState<string[]>([
    '💡 Тренажёр строковых функций и методов инициализирован.',
  ])

  // --- ФУНКЦИИ И МЕТОДЫ ОБРАБОТКИ СТРОК ---

  // 1. Поиск подстроки (find)
  const handleFind = () => {
    const idx = strValue.indexOf(subStr)
    if (idx !== -1) {
      setLog((prev) => [
        `s.find("${subStr}") -> ${idx} (подстрока найдена с индекса)`,
        ...prev,
      ])
    } else {
      setLog((prev) => [
        `s.find("${subStr}") -> -1 (подстрока не найдена)`,
        ...prev,
      ])
    }
  }

  // 2. Подсчет вхождений (count)
  const handleCount = () => {
    const matches = strValue.split(subStr).length - 1
    setLog((prev) => [
      `s.count("${subStr}") -> ${matches} (количество вхождений)`,
      ...prev,
    ])
  }

  // 3. Замена подстроки (replace)
  const handleReplace = () => {
    const res = strValue.replaceAll(subStr, '***')
    setStrValue(res)
    setLog((prev) => [`s.replace("${subStr}", "***") -> "${res}"`, ...prev])
  }

  // 4. Проверка на цифры/буквы (isalnum / isalpha)
  const handleCheckType = () => {
    const isAlphaNum = /^[a-zA-Z0-9]+$/.test(strValue)
    setLog((prev) => [
      `str.isalnum() -> ${isAlphaNum ? 'True' : 'False'} (состоит из букв и цифр)`,
      ...prev,
    ])
  }

  // 5. Разделение строки (split)
  const handleSplit = () => {
    const arr = strValue.split('')
    setLog((prev) => [
      `list(s) -> [${arr.map((c) => `'${c}'`).join(', ')}]`,
      ...prev,
    ])
  }

  const handleReset = () => {
    setStrValue('Informatics2026')
    setSubStr('ics')
    setLog(['🔄 Данные сброшены по умолчанию.'])
  }

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
          <FunctionsIcon sx={{fontSize: 45, color: '#2196f3'}} />
          Функции и процедуры обработки строк
        </Typography>
        <Typography variant='h6' sx={{color: '#8b949e'}}>
          Интерактивный практикум по методам анализа и преобразования строк в
          Python (10 класс)
        </Typography>
      </Box>

      {/* Визуализация текущей строки */}
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
            Текущая строка s = "{strValue}"
          </Typography>
          <Chip
            label={`длина len = ${strValue.length}`}
            variant='outlined'
            sx={{color: '#fff', borderColor: '#30363d'}}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            minHeight: 70,
            justifyContent: 'center',
          }}>
          {strValue.split('').map((char, idx) => (
            <Box key={idx} sx={{textAlign: 'center'}}>
              <Tooltip title={`Index: ${idx}`}>
                <Paper
                  sx={{
                    width: 50,
                    height: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#161b22',
                    border: '2px solid #2196f3',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    borderRadius: 2,
                  }}>
                  {char}
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
        {/* Блок 1: Управление и вызовы функций */}
        <Grid size={{xs: 12, md: 5}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Box>
              <Typography
                variant='subtitle1'
                sx={{color: '#00bcd4', mb: 2, fontWeight: 'bold'}}>
                Параметры и методы
              </Typography>

              <Box sx={{mb: 2.5}}>
                <TextField
                  label='Строка s'
                  size='small'
                  fullWidth
                  value={strValue}
                  onChange={(e) => setStrValue(e.target.value)}
                  sx={{
                    input: {color: '#fff'},
                    label: {color: '#8b949e'},
                    fieldset: {borderColor: '#30363d'},
                    mb: 1.5,
                  }}
                />
                <TextField
                  label='Подстрока для поиска/замены'
                  size='small'
                  fullWidth
                  value={subStr}
                  onChange={(e) => setSubStr(e.target.value)}
                  sx={{
                    input: {color: '#fff'},
                    label: {color: '#8b949e'},
                    fieldset: {borderColor: '#30363d'},
                  }}
                />
              </Box>

              <Grid container spacing={1.5} sx={{mb: 2}}>
                <Grid size={{xs: 6}}>
                  <Button
                    fullWidth
                    size='small'
                    variant='outlined'
                    startIcon={<SearchIcon />}
                    onClick={handleFind}
                    sx={{borderColor: '#30363d', color: '#58a6ff'}}>
                    find()
                  </Button>
                </Grid>
                <Grid size={{xs: 6}}>
                  <Button
                    fullWidth
                    size='small'
                    variant='outlined'
                    startIcon={<FunctionsIcon />}
                    onClick={handleCount}
                    sx={{borderColor: '#30363d', color: '#58a6ff'}}>
                    count()
                  </Button>
                </Grid>
                <Grid size={{xs: 6}}>
                  <Button
                    fullWidth
                    size='small'
                    variant='outlined'
                    startIcon={<TransformIcon />}
                    onClick={handleReplace}
                    sx={{borderColor: '#30363d', color: '#4caf50'}}>
                    replace()
                  </Button>
                </Grid>
                <Grid size={{xs: 6}}>
                  <Button
                    fullWidth
                    size='small'
                    variant='outlined'
                    startIcon={<ContentCutIcon />}
                    onClick={handleCheckType}
                    sx={{borderColor: '#30363d', color: '#ff9800'}}>
                    isalnum()
                  </Button>
                </Grid>
                <Grid size={{xs: 12}}>
                  <Button
                    fullWidth
                    size='small'
                    variant='outlined'
                    onClick={handleSplit}
                    sx={{borderColor: '#30363d', color: '#00bcd4'}}>
                    list(s) / split
                  </Button>
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant='text'
                color='inherit'
                startIcon={<ReplayIcon />}
                onClick={handleReset}
                sx={{color: '#8b949e', fontSize: '0.8rem'}}>
                Сбросить исходные данные
              </Button>
            </Box>

            <Alert
              severity='info'
              sx={{
                mt: 3,
                bgcolor: 'transparent',
                color: '#8b949e',
                border: '1px solid #30363d',
              }}>
              В Python встроенные методы строк позволяют эффективно осуществлять
              поиск, валидацию и трансформацию текстовых данных.
            </Alert>
          </Paper>
        </Grid>

        {/* Блок 2: Виртуальная консоль логов */}
        <Grid size={{xs: 12, md: 7}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
              <Typography
                variant='subtitle1'
                sx={{color: '#4caf50', fontWeight: 'bold'}}>
                Виртуальная консоль Python
              </Typography>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#238636',
                  alignSelf: 'center',
                }}
              />
            </Box>

            <Box
              sx={{
                flex: 1,
                bgcolor: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: 2,
                p: 2,
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                color: '#8b949e',
                maxHeight: 300,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}>
              {log.map((entry, index) => (
                <Box
                  key={index}
                  sx={{
                    borderBottom: '1px solid #161b22',
                    pb: 0.5,
                    color: index === 0 ? '#58a6ff' : '#8b949e',
                  }}>
                  {entry}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default StringFunctionsLab
