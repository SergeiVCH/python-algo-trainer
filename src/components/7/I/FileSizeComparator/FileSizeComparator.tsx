import {
    Box,
    Container,
    Grid,
    Paper,
    Slider,
    Stack,
    Typography
} from '@mui/material'
import { useState } from 'react'
// Иконки
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import DescriptionIcon from '@mui/icons-material/Description'
import FolderZipIcon from '@mui/icons-material/FolderZip'
import ImageIcon from '@mui/icons-material/Image'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import MovieIcon from '@mui/icons-material/Movie'
import StorageIcon from '@mui/icons-material/Storage'
import TerminalIcon from '@mui/icons-material/Terminal'

// Расширенный список форматов
const FILE_TYPES = [
  {
    id: 'bit',
    name: 'Один бит (0 или 1)',
    base: 0.125,
    icon: <TerminalIcon />,
    info: 'Минимальная единица (1/8 байта)',
  },
  {
    id: 'txt',
    name: 'Текстовый файл (.txt)',
    base: 1,
    icon: <DescriptionIcon />,
    info: '1 символ в кодировке ASCII = 1 байт',
  },
  {
    id: 'doc',
    name: 'Документ (.docx)',
    base: 100,
    icon: <InsertDriveFileIcon />,
    info: 'Текст + метаданные и стили',
  },
  {
    id: 'mp3',
    name: 'Аудио (1 сек .mp3)',
    base: 16000,
    icon: <AudiotrackIcon />,
    info: 'Сжатый звук среднего качества',
  },
  {
    id: 'img',
    name: 'Фото (12 Мп .jpg)',
    base: 3500000,
    icon: <ImageIcon />,
    info: 'Зависит от сложности сцены',
  },
  {
    id: 'zip',
    name: 'Архив (.zip)',
    base: 5000000,
    icon: <FolderZipIcon />,
    info: 'Сжатые данные для экономии места',
  },
  {
    id: 'db',
    name: 'База данных (SQL)',
    base: 50000000,
    icon: <StorageIcon />,
    info: 'Структурированные таблицы данных',
  },
  {
    id: 'vid',
    name: 'Видео (1 мин .mp4)',
    base: 200000000,
    icon: <MovieIcon />,
    info: 'FullHD видео со звуком',
  },
]

export const FileSizeComparator = () => {
  const [multiplier, setMultiplier] = useState(1)
  const themeColor = '#673ab7' // Фиолетовый цвет компоненты

  const formatSize = (bytes: number) => {
    const totalBytes = bytes * multiplier
    if (totalBytes < 1) return `${(totalBytes * 8).toFixed(0)} бит` // Для совсем маленьких
    if (totalBytes < 1024) return `${totalBytes.toFixed(0)} Б`
    if (totalBytes < 1024 * 1024) return `${(totalBytes / 1024).toFixed(1)} КБ`
    if (totalBytes < 1024 * 1024 * 1024)
      return `${(totalBytes / (1024 * 1024)).toFixed(1)} МБ`
    return `${(totalBytes / (1024 * 1024 * 1024)).toFixed(2)} ГБ`
  }

  return (
    <Box sx={{p: 4, bgcolor: '#010409', minHeight: '100vh', color: '#e6edf3'}}>
      <Container maxWidth='lg'>
        {/* ОКРАШЕННЫЙ ЗАГОЛОВОК */}
        <Box sx={{textAlign: 'center', mb: 6}}>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 900,
              color: themeColor,
              textTransform: 'uppercase',
              textShadow: `0 0 20px ${themeColor}40`,
              mb: 1,
            }}>
            БИТВА ФОРМАТОВ
          </Typography>
          <Typography variant='h6' sx={{color: '#8b949e', fontWeight: 400}}>
            Визуализация объемов цифровой информации
          </Typography>
        </Box>

        {/* ПАНЕЛЬ УПРАВЛЕНИЯ */}
        <Paper
          sx={{
            p: 4,
            bgcolor: '#0d1117',
            border: '1px solid #30363d',
            borderRadius: '24px',
            mb: 6,
          }}>
          <Stack spacing={2}>
            <Typography
              sx={{
                color: '#8b949e',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: 1,
              }}>
              Масштабировать количество объектов:
            </Typography>
            <Slider
              value={multiplier}
              min={1}
              max={5000}
              onChange={(_e, val) => setMultiplier(val as number)}
              sx={{color: themeColor}}
            />
            <Typography
              variant='h5'
              sx={{textAlign: 'center', fontWeight: 800, color: '#ffffff'}}>
              Экземпляров: {multiplier.toLocaleString()}
            </Typography>
          </Stack>
        </Paper>

        {/* СЕТКА ФОРМАТОВ */}
        <Grid container spacing={3}>
          {FILE_TYPES.map((file) => (
            <Grid size={{xs: 12, sm: 6, md: 3}} key={file.id}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  bgcolor: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    borderColor: themeColor,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 24px ${themeColor}15`,
                  },
                }}>
                <Stack
                  direction='row'
                  spacing={1.5}
                  alignItems='center'
                  sx={{mb: 2}}>
                  <Box sx={{color: themeColor}}>{file.icon}</Box>
                  <Typography
                    variant='subtitle2'
                    sx={{fontWeight: 700, lineHeight: 1.2}}>
                    {file.name}
                  </Typography>
                </Stack>

                <Box sx={{flexGrow: 1}}>
                  <Typography
                    variant='h5'
                    sx={{mb: 0.5, fontFamily: 'monospace', fontWeight: 700}}>
                    {formatSize(file.base)}
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{
                      color: '#8b949e',
                      display: 'block',
                      minHeight: '32px',
                    }}>
                    {file.info}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    height: 6,
                    width: '100%',
                    bgcolor: '#010409',
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}>
                  <Box
                    sx={{
                      height: '100%',
                      width: `${Math.min((file.base * multiplier) / 10000000, 100)}%`,
                      bgcolor: themeColor,
                      boxShadow: `0 0 10px ${themeColor}`,
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* ИНФО-ГРАФИК СНИЗУ */}
        <Box
          sx={{
            mt: 8,
            p: 4,
            borderRadius: '24px',
            border: `1px solid ${themeColor}40`,
            bgcolor: `${themeColor}05`,
          }}>
          <Typography
            variant='h6'
            sx={{color: themeColor, mb: 2, fontWeight: 800}}>
            📊 Аналитика данных:
          </Typography>
          <Typography variant='body1' sx={{color: '#8b949e', lineHeight: 1.7}}>
            При множителе <b>{multiplier}</b>, обычное видео занимает объем,
            равный примерно{' '}
            <b>
              {(
                (FILE_TYPES[7].base * multiplier) /
                (FILE_TYPES[1].base * multiplier)
              ).toLocaleString()}
            </b>{' '}
            текстовым файлам. Это наглядно объясняет, почему текстовые сообщения
            отправляются мгновенно даже при плохой связи, а видео требует
            высокой скорости интернета.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
