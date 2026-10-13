import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import TerminalIcon from '@mui/icons-material/Terminal'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid, // Используем Grid2 для актуального синтаксиса size
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import {useState} from 'react'

export const PygameIntroComponent = () => {
  const [activeTab, setActiveTab] = useState(0)

  const installCommand = 'pip install pygame'

  const codeLines = [
    {
      line: 1,
      text: 'import pygame',
      desc: 'Подключаем библиотеку Pygame для работы с графикой',
      type: 'import',
    },
    {line: 2, text: '', desc: '', type: 'empty'},
    {
      line: 3,
      text: 'FPS = 60',
      desc: 'Задаем частоту обновления экрана (кадры в секунду)',
      type: 'const',
    },
    {line: 4, text: '', desc: '', type: 'empty'},
    {
      line: 5,
      text: 'pygame.init()',
      desc: 'Запуск модулей Pygame (звук, клавиатура, шрифты)',
      type: 'init',
    },
    {
      line: 6,
      text: 'pygame.display.set_mode((600, 400))',
      desc: 'Создаем игровое окно шириной 600 и высотой 400 пикселей',
      type: 'init',
    },
    {
      line: 7,
      text: "pygame.display.set_caption('Game')",
      desc: 'Устанавливаем текст в заголовке окна',
      type: 'init',
    },
    {
      line: 8,
      text: 'clock = pygame.time.Clock()',
      desc: 'Создаем таймер для контроля скорости игры',
      type: 'init',
    },
    {line: 9, text: '', desc: '', type: 'empty'},
    {
      line: 10,
      text: 'pygame.display.update()',
      desc: 'Первоначальная отрисовка содержимого окна',
      type: 'draw',
    },
    {line: 11, text: '', desc: '', type: 'empty'},
    {
      line: 12,
      text: 'while True:',
      desc: 'Бесконечный цикл: пока он работает, игра запущена',
      type: 'loop',
    },
    {
      line: 13,
      text: '    clock.tick(FPS)',
      desc: 'Заставляем программу "ждать", чтобы не превышать 60 FPS',
      type: 'loop',
    },
    {
      line: 14,
      text: '    for i in pygame.event.get():',
      desc: 'Получаем список всех действий пользователя (событий)',
      type: 'event',
    },
    {
      line: 15,
      text: '        if i.type == pygame.QUIT:',
      desc: 'Проверяем, нажал ли пользователь на кнопку закрытия окна',
      type: 'event',
    },
    {
      line: 16,
      text: '            quit()',
      desc: 'Завершаем работу программы',
      type: 'event',
    },
    {
      line: 17,
      text: '    pygame.display.update()',
      desc: 'Перерисовываем экран в конце каждой итерации цикла',
      type: 'draw',
    },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Box sx={{p: 3, maxWidth: 1100, margin: '0 auto', color: '#e6edf3'}}>
      <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 3}}>
        <Box sx={{bgcolor: '#4caf50', p: 1, borderRadius: 2}}>
          <VideogameAssetIcon sx={{fontSize: 30, color: '#fff'}} />
        </Box>
        <Box>
          <Typography variant='h4' sx={{fontWeight: 800}}>
            Библиотека Pygame
          </Typography>
          <Typography variant='body1' sx={{color: '#8b949e'}}>
            Основы создания графических приложений на Python
          </Typography>
        </Box>
      </Stack>

      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        sx={{mb: 4, borderBottom: '1px solid #30363d'}}>
        <Tab
          label='1. Установка'
          icon={<TerminalIcon />}
          iconPosition='start'
        />
        <Tab
          label='2. Разбор кода'
          icon={<PlayCircleOutlineIcon />}
          iconPosition='start'
        />
      </Tabs>

      {/* ШАГ 1: УСТАНОВКА */}
      {activeTab === 0 && (
        <Box>
          <Typography variant='h6' gutterBottom>
            Как установить Pygame в IDLE?
          </Typography>
          <Typography variant='body2' sx={{mb: 3, color: '#8b949e'}}>
            Библиотека Pygame не входит в стандартный набор Python, поэтому её
            нужно скачать отдельно.
          </Typography>

          <Paper
            sx={{
              p: 3,
              bgcolor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: 3,
              mb: 4,
            }}>
            <Typography variant='subtitle2' sx={{color: '#58a6ff', mb: 2}}>
              Инструкция для Windows:
            </Typography>
            <ol style={{color: '#adbac7', lineHeight: 1.8}}>
              <li>
                Нажмите комбинацию клавиш <b>Win + R</b>
              </li>
              <li>
                Введите <b>cmd</b> и нажмите Enter
              </li>
              <li>Скопируйте и вставьте команду:</li>
            </ol>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: '#161b22',
                p: 2,
                borderRadius: 2,
                border: '1px solid #444c56',
                mt: 2,
              }}>
              <code style={{color: '#7ee787', fontSize: '1.1rem'}}>
                {installCommand}
              </code>
              <Button
                size='small'
                onClick={() => copyToClipboard(installCommand)}
                startIcon={<ContentCopyIcon />}>
                Копировать
              </Button>
            </Box>
          </Paper>
          <Alert
            severity='info'
            sx={{
              bgcolor: '#161b22',
              color: '#adbac7',
              border: '1px solid #30363d',
            }}>
            После установки перезагрузите IDLE Python.
          </Alert>
        </Box>
      )}

      {/* ШАГ 2: РАЗБОР КОДА */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          {/* Левая колонка: Редактор кода */}
          <Grid size={{xs: 12, lg: 7}}>
            <Paper
              sx={{
                p: 0,
                bgcolor: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: 3,
                overflow: 'hidden',
              }}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: '#161b22',
                  borderBottom: '1px solid #30363d',
                }}>
                <Typography
                  variant='caption'
                  sx={{color: '#8b949e', fontFamily: 'monospace'}}>
                  main.py
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  overflowX: 'auto',
                }}>
                {codeLines.map((line) => (
                  <Box key={line.line} sx={{display: 'flex', py: 0.1}}>
                    <Typography
                      sx={{
                        width: 25,
                        color: '#484f58',
                        textAlign: 'right',
                        mr: 2,
                        userSelect: 'none',
                      }}>
                      {line.line}
                    </Typography>
                    <Typography
                      sx={{
                        color:
                          line.type === 'import'
                            ? '#ff7b72'
                            : line.type === 'loop'
                              ? '#d2a8ff'
                              : line.type === 'const'
                                ? '#79c0ff'
                                : '#e6edf3',
                        whiteSpace: 'pre',
                      }}>
                      {line.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Правая колонка: Комментарии + Визуал */}
          <Grid size={{xs: 12, lg: 5}}>
            <Stack spacing={2}>
              <Typography
                variant='subtitle2'
                sx={{
                  color: '#8b949e',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}>
                Пояснения к коду:
              </Typography>

              <Box
                sx={{
                  maxHeight: '400px',
                  overflowY: 'auto',
                  pr: 1,
                  '&::-webkit-scrollbar': {width: '4px'},
                  '&::-webkit-scrollbar-thumb': {
                    bgcolor: '#30363d',
                    borderRadius: 2,
                  },
                }}>
                <Stack spacing={1.5}>
                  {codeLines
                    .filter((l) => l.desc !== '')
                    .map((line) => (
                      <Paper
                        key={line.line}
                        sx={{
                          p: 1.5,
                          bgcolor: '#161b22',
                          border: '1px solid #30363d',
                          borderLeft: `3px solid ${line.type === 'event' ? '#f85149' : '#388bfd'}`,
                          borderRadius: 1,
                        }}>
                        <Typography
                          variant='caption'
                          sx={{color: '#58a6ff', fontWeight: 'bold'}}>
                          Строка {line.line}
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{color: '#adbac7', mt: 0.5}}>
                          {line.desc}
                        </Typography>
                      </Paper>
                    ))}
                </Stack>
              </Box>

              <Divider sx={{bgcolor: '#30363d'}} />

              {/* Мини-превью окна */}
              <Box
                sx={{
                  height: 160,
                  bgcolor: '#000',
                  borderRadius: 2,
                  border: '2px solid #30363d',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                <Typography
                  variant='caption'
                  sx={{
                    position: 'absolute',
                    top: 4,
                    left: 8,
                    color: '#fff',
                    fontSize: '0.7rem',
                  }}>
                  Game
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    height: 1,
                    bgcolor: '#333',
                    position: 'absolute',
                    top: 20,
                  }}
                />
                <VideogameAssetIcon sx={{fontSize: 40, color: '#222'}} />
                <Typography variant='caption' sx={{color: '#333'}}>
                  [Экран 600x400]
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
