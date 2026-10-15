import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import NotesIcon from '@mui/icons-material/Notes'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import LockCloseIcon from '@mui/icons-material/Lock'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
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
  Typography,
} from '@mui/material'
import {useState} from 'react'

export const PythonFilesLab = () => {
  const [fileName, setFileName] = useState<string>('data.txt')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [fileContent, setFileContent] = useState<string>(
    'Строка 1: Основы программирования\nСтрока 2: Работа с текстовыми файлами\nСтрока 3: Методы open, read, write, close',
  )
  const [inputBuffer, setInputBuffer] = useState<string>('Новая строка данных')
  const [readlineIndex, setReadlineIndex] = useState<number>(0)
  const [log, setLog] = useState<string[]>([
    '💡 Лаборатория файлов инициализирована. Откройте файл через open().',
  ])

  // --- МЕТОДЫ ФАЙЛОВОГО ВВОДА-ВЫВОДА ---
  const handleOpen = () => {
    setIsOpen(true)
    setReadlineIndex(0)
    setLog((prev) => [
      `📘 [Описание open()]: Функция open(file, mode) создает файловый поток. Режим 'r' — чтение, 'w' — перезапись, 'a' — дозапись.`,
      `💻 [Код]: f = open("${fileName}", "r")`,
      `✔ Файл успешно открыт. Дескриптор активен.`,
      ...prev,
    ])
  }

  const handleRead = () => {
    if (!isOpen) {
      alert('Ошибка: Сначала откройте файл с помощью open()!')
      return
    }
    setLog((prev) => [
      `📘 [Описание read()]: Метод read() считывает всё содержимое файла целиком в виде единой строки.`,
      `💻 [Код]: data = f.read()`,
      `📄 [Результат]:\n${fileContent}`,
      ...prev,
    ])
  }

  const handleReadline = () => {
    if (!isOpen) {
      alert('Ошибка: Сначала откройте файл с помощью open()!')
      return
    }
    const lines = fileContent.split('\n')
    if (readlineIndex < lines.length) {
      const currentLine = lines[readlineIndex]
      setLog((prev) => [
        `📘 [Описание readline()]: Метод readline() считывает ровно одну строку за раз, смещая указатель.`,
        `💻 [Код]: line = f.readline()  # строка ${readlineIndex + 1}`,
        `📄 [Результат]: "${currentLine}"`,
        ...prev,
      ])
      setReadlineIndex((prevIdx) => prevIdx + 1)
    } else {
      setLog((prev) => [
        `📘 [Описание readline()]: Достигнут конец файла (возвращает "").`,
        `📄 [Результат]: Конец файла.`,
        ...prev,
      ])
    }
  }

  const handleWrite = () => {
    setFileContent(inputBuffer)
    setLog((prev) => [
      `📘 [Описание write()]: Записывает строку в файл. В режиме 'w' старые данные полностью стираются!`,
      `💻 [Код]: f = open("${fileName}", "w")\nf.write("${inputBuffer}")`,
      `✔ Данные успешно записаны.`,
      ...prev,
    ])
  }

  const handleAppend = () => {
    const updated = fileContent ? fileContent + '\n' + inputBuffer : inputBuffer
    setFileContent(updated)
    setLog((prev) => [
      `📘 [Описание append / 'a']: Режим дозаписи добавляет текст в конец файла без удаления старых данных.`,
      `💻 [Код]: f = open("${fileName}", "a")\nf.write("\\n${inputBuffer}")`,
      `✔ Данные успешно дозаписаны.`,
      ...prev,
    ])
  }

  const handleClose = () => {
    if (!isOpen) {
      alert('Файл уже закрыт!')
      return
    }
    setIsOpen(false)
    setReadlineIndex(0)
    setLog((prev) => [
      `📘 [Описание close()]: Закрывает поток обмена с диском, освобождая память.`,
      `💻 [Код]: f.close()`,
      `🔒 Файл успешно закрыт.`,
      ...prev,
    ])
  }

  const handleClear = () => {
    setFileContent('')
    setLog((prev) => [
      `📘 [Описание]: Очистка содержимого файла.`,
      `💻 [Код]: open("${fileName}", "w").close()`,
      `🗑 Файл очищен.`,
      ...prev,
    ])
  }

  const handleReset = () => {
    setFileName('data.txt')
    setIsOpen(false)
    setReadlineIndex(0)
    setFileContent(
      'Строка 1: Основы программирования\nСтрока 2: Работа с текстовыми файлами\nСтрока 3: Методы open, read, write, close',
    )
    setInputBuffer('Новая строка данных')
    setLog(['🔄 Состояние лаборатории сброшено.'])
  }

  return (
    <Container maxWidth='lg' sx={{py: 6}}>
      {/* Шапка */}
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
          <InsertDriveFileIcon sx={{fontSize: 45, color: '#9c27b0'}} />
          PYTHON FILES: Полная лаборатория
        </Typography>
        <Typography variant='h6' sx={{color: '#8b949e'}}>
          Интерактивный тренажёр файлового ввода-вывода (10 класс)
        </Typography>
      </Box>

      {/* Вид файла */}
      <Paper
        sx={{
          p: 4,
          bgcolor: '#0d1117',
          border: '1px solid #30363d',
          borderRadius: 4,
          mb: 4,
        }}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 3}}>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5}}>
            <FolderOpenIcon sx={{color: '#58a6ff'}} />
            <Typography
              variant='subtitle1'
              sx={{color: '#58a6ff', fontWeight: 'bold'}}>
              Вид файла ({fileName})
            </Typography>
          </Box>
          <Chip
            label={isOpen ? 'ФАЙЛ ОТКРЫТ' : 'ФАЙЛ ЗАКРЫТ'}
            variant='outlined'
            sx={{
              color: isOpen ? '#4caf50' : '#f44336',
              borderColor: isOpen ? '#4caf50' : '#f44336',
            }}
          />
        </Box>

        <Paper
          sx={{
            p: 3,
            bgcolor: '#161b22',
            border: '1px solid #30363d',
            borderRadius: 2,
            fontFamily: 'monospace',
            color: '#c9d1d9',
            whiteSpace: 'pre-wrap',
            minHeight: 100,
            maxHeight: 180,
            overflowY: 'auto',
          }}>
          {fileContent || '// Файл пуст'}
        </Paper>
      </Paper>

      <Grid container spacing={3}>
        {/* Панель управления методами */}
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
                Методы и режимы работы
              </Typography>

              <Box sx={{mb: 2}}>
                <TextField
                  label='Имя файла'
                  size='small'
                  fullWidth
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  sx={{
                    input: {color: '#fff'},
                    label: {color: '#8b949e'},
                    fieldset: {borderColor: '#30363d'},
                    mb: 1.5,
                  }}
                />
                <TextField
                  label='Строка для write() / append()'
                  size='small'
                  fullWidth
                  value={inputBuffer}
                  onChange={(e) => setInputBuffer(e.target.value)}
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
                    variant={isOpen ? 'contained' : 'outlined'}
                    startIcon={<FolderOpenIcon />}
                    onClick={handleOpen}
                    sx={{
                      borderColor: '#30363d',
                      bgcolor: isOpen ? '#238636' : 'transparent',
                      color: isOpen ? '#fff' : '#58a6ff',
                    }}>
                    open()
                  </Button>
                </Grid>
                <Grid size={{xs: 6}}>
                  <Button
                    fullWidth
                    size='small'
                    variant='outlined'
                    startIcon={<LockCloseIcon />}
                    onClick={handleClose}
                    sx={{borderColor: '#30363d', color: '#f44336'}}>
                    close()
                  </Button>
                </Grid>
                <Grid size={{xs: 6}}>
                  <Button
                    fullWidth
                    size='small'
                    variant='outlined'
                    startIcon={<MenuBookIcon />}
                    onClick={handleRead}
                    sx={{borderColor: '#30363d', color: '#ff9800'}}>
                    read()
                  </Button>
                </Grid>
                <Grid size={{xs: 6}}>
                  <Button
                    fullWidth
                    size='small'
                    variant='outlined'
                    startIcon={<NotesIcon />}
                    onClick={handleReadline}
                    sx={{borderColor: '#30363d', color: '#4caf50'}}>
                    readline()
                  </Button>
                </Grid>
                <Grid size={{xs: 6}}>
                  <Button
                    fullWidth
                    size='small'
                    variant='outlined'
                    startIcon={<EditIcon />}
                    onClick={handleWrite}
                    sx={{borderColor: '#30363d', color: '#00bcd4'}}>
                    write() ['w']
                  </Button>
                </Grid>
                <Grid size={{xs: 6}}>
                  <Button
                    fullWidth
                    size='small'
                    variant='outlined'
                    startIcon={<SaveIcon />}
                    onClick={handleAppend}
                    sx={{borderColor: '#30363d', color: '#2dd4bf'}}>
                    append() ['a']
                  </Button>
                </Grid>
              </Grid>

              <Button
                fullWidth
                size='small'
                variant='outlined'
                color='error'
                startIcon={<DeleteSweepIcon />}
                onClick={handleClear}
                sx={{mb: 1, borderColor: '#30363d'}}>
                Очистить файл
              </Button>

              <Button
                fullWidth
                variant='text'
                color='inherit'
                startIcon={<ReplayIcon />}
                onClick={handleReset}
                sx={{color: '#8b949e', fontSize: '0.8rem'}}>
                Сбросить лабораторию
              </Button>
            </Box>

            <Alert
              severity='info'
              sx={{
                mt: 2,
                bgcolor: 'transparent',
                color: '#8b949e',
                border: '1px solid #30363d',
              }}>
              Изучайте описание каждого метода в консоли справа.
            </Alert>
          </Paper>
        </Grid>

        {/* Виртуальная консоль логов и теории */}
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
                Виртуальная консоль Python (Логи и теория)
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
                maxHeight: 340,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}>
              {log.map((entry, index) => (
                <Box
                  key={index}
                  sx={{
                    borderBottom: '1px solid #161b22',
                    pb: 1,
                    color: entry.includes('📘') ? '#58a6ff' : '#c9d1d9',
                    whiteSpace: 'pre-wrap',
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

export default PythonFilesLab
