import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {useState} from 'react'

export const PythonFilesLab = () => {
  const [content, setContent] = useState('')
  const [virtualFile, setVirtualFile] = useState<string[]>([])
  const [log, setLog] = useState('Файл готов к работе...')

  const handleSave = () => {
    if (!content) return
    // Имитация дозаписи в файл (mode='a')
    setVirtualFile([...virtualFile, content])
    setLog(`Выполнено: with open('data.txt', 'a') as f: f.write('${content}')`)
    setContent('')
  }

  const handleClear = () => {
    setVirtualFile([])
    setLog("Файл очищен: open('data.txt', 'w')")
  }

  return (
    <Box sx={{py: 4, maxWidth: 1000, margin: '0 auto'}}>
      <Typography variant='h4' sx={{fontWeight: 900, mb: 2}}>
        PYTHON <span style={{color: '#9c27b0'}}>FILES</span>
      </Typography>

      <Paper
        sx={{
          p: 4,
          bgcolor: '#0d1117',
          borderRadius: 4,
          border: '1px solid #30363d',
        }}>
        <Grid container spacing={4}>
          {/* Инструменты записи */}
          <Grid size={{xs: 12, md: 5}}>
            <Typography variant='h6' sx={{color: '#fff', mb: 2}}>
              Запись в файл
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                variant='filled'
                label='Введите строку для записи'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{bgcolor: '#161b22', input: {color: '#fff'}}}
              />
              <Button
                variant='contained'
                color='secondary'
                onClick={handleSave}>
                f.write() — Добавить
              </Button>
              <Button variant='outlined' color='error' onClick={handleClear}>
                Очистить файл
              </Button>
            </Stack>

            <Alert
              severity='info'
              sx={{mt: 3, bgcolor: '#161b22', color: '#8b949e'}}>
              <code>{log}</code>
            </Alert>
          </Grid>

          {/* Визуализация файла */}
          <Grid size={{xs: 12, md: 7}}>
            <Typography variant='h6' sx={{color: '#fff', mb: 2}}>
              Вид файла (data.txt)
            </Typography>
            <Paper
              sx={{
                p: 2,
                bgcolor: '#000',
                minHeight: 250,
                fontFamily: 'monospace',
                border: '1px solid #30363d',
                position: 'relative',
                overflow: 'hidden',
              }}>
              <Box sx={{color: '#4caf50'}}>
                {virtualFile.length === 0 ? (
                  <Typography sx={{color: '#484f58'}}>// Файл пуст</Typography>
                ) : (
                  virtualFile.map((line, i) => (
                    <Typography
                      key={i}
                      sx={{borderBottom: '1px solid #161b22'}}>
                      <span style={{color: '#8b949e', marginRight: '10px'}}>
                        {i + 1}
                      </span>
                      {line}
                    </Typography>
                  ))
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
