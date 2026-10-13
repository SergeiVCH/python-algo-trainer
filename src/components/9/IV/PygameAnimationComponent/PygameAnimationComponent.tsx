import AnimationIcon from '@mui/icons-material/Animation'
import CodeIcon from '@mui/icons-material/Code'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ImageIcon from '@mui/icons-material/Image'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import {useEffect, useState} from 'react'

export const PygameAnimationComponent = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)

  // Состояние для имитации анимации в превью
  const [posX, setPosX] = useState(0)

  useEffect(() => {
    if (activeTab === 2) {
      const interval = setInterval(() => {
        setPosX((prev) => (prev > 100 ? -20 : prev + 2))
      }, 30)
      return () => clearInterval(interval)
    }
  }, [activeTab])

  const codes = [
    {
      title: 'основной_цикл.py',
      description: 'Базовая структура любого приложения на Pygame.',
      content: `import pygame

pygame.init()
WIDTH, HEIGHT = 400, 300
screen = pygame.display.set_mode((WIDTH, HEIGHT))
clock = pygame.time.Clock()

running = True 
while running:
    # Ограничение FPS
    clock.tick(60) 
    
    # Обработка событий
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
            
    screen.fill((255, 255, 255)) 
    pygame.draw.rect(screen, (0, 0, 255), (175, 125, 50, 50))
    pygame.display.flip()

pygame.quit()`,
    },
    {
      title: 'работа_с_картинкой.py',
      description: 'Загрузка внешних ассетов и позиционирование через Rect.',
      content: `import pygame

pygame.init()
sc = pygame.display.set_mode((400, 300))
sc.fill((100, 150, 200))

# Загрузка и получение прямоугольника (Rect)
img_surf = pygame.image.load('hero.png')
# Ставим персонажа в правый нижний угол
img_rect = img_surf.get_rect(bottomright=(400, 300))

sc.blit(img_surf, img_rect)
pygame.display.update()

# Цикл ожидания закрытия
while True:
    if pygame.event.get(pygame.QUIT):
        break
pygame.quit()`,
    },
    {
      title: 'управление_анимацией.py',
      description: 'Изменение координат в цикле для создания движения.',
      content: `import pygame

pygame.init()
screen = pygame.display.set_mode((400, 300))
clock = pygame.time.Clock()

x, y = 0, 125 # Начальная позиция
speed = 5     # Скорость движения

while True:
    clock.tick(60)
    if pygame.event.get(pygame.QUIT): break

    # ЛОГИКА АНИМАЦИИ: изменяем координату
    x += speed 
    if x > 400: x = -50 # Зацикливаем выход за экран

    screen.fill((255, 255, 255))
    # Рисуем объект в новых координатах (x, y)
    pygame.draw.rect(screen, (0, 0, 255), (x, y, 50, 50))
    pygame.display.flip()`,
    },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Box
      sx={{
        p: {xs: 2, md: 4},
        maxWidth: 1200,
        margin: '0 auto',
        color: '#e6edf3',
      }}>
      {/* Header */}
      <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 4}}>
        <Box
          sx={{
            bgcolor: '#9c27b0',
            p: 1.5,
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(156, 39, 176, 0.3)',
          }}>
          <AnimationIcon sx={{fontSize: 32, color: '#fff'}} />
        </Box>
        <Box>
          <Typography variant='h4' sx={{fontWeight: 800, color: '#fff'}}>
            Мир Pygame:{' '}
            <Box component='span' sx={{color: '#9c27b0'}}>
              Основы и Анимация
            </Box>
          </Typography>
          <Typography variant='body1' sx={{color: '#8b949e'}}>
            От создания окна до плавного движения персонажа
          </Typography>
        </Box>
      </Stack>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        sx={{
          mb: 3,
          '& .MuiTab-root': {
            color: '#8b949e',
            textTransform: 'none',
            fontSize: '1rem',
          },
          '& .Mui-selected': {color: '#bc6ff1 !important'},
          '& .MuiTabs-indicator': {bgcolor: '#bc6ff1'},
        }}>
        <Tab icon={<CodeIcon />} label='Основы цикла' iconPosition='start' />
        <Tab icon={<ImageIcon />} label='Работа с Image' iconPosition='start' />
        <Tab
          icon={<PlayArrowIcon />}
          label='Управление анимацией'
          iconPosition='start'
        />
      </Tabs>

      <Grid container spacing={3}>
        {/* Code Editor */}
        <Grid size={{xs: 12, lg: 7}}>
          <Paper
            sx={{
              bgcolor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: 4,
              overflow: 'hidden',
            }}>
            <Box
              sx={{
                p: 2,
                bgcolor: '#161b22',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Typography
                variant='caption'
                sx={{color: '#58a6ff', fontFamily: 'monospace'}}>
                {codes[activeTab].title}
              </Typography>
              <Button
                size='small'
                startIcon={<ContentCopyIcon />}
                onClick={() => copyToClipboard(codes[activeTab].content)}
                sx={{color: '#8b949e', textTransform: 'none'}}>
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </Box>
            <Box
              sx={{
                p: 2,
                maxHeight: '500px',
                overflowY: 'auto',
                bgcolor: '#0d1117',
              }}>
              <pre
                style={{
                  margin: 0,
                  fontFamily: 'Fira Code, monospace',
                  fontSize: '0.85rem',
                }}>
                {codes[activeTab].content.split('\n').map((line, i) => (
                  <div key={i} style={{display: 'flex'}}>
                    <span style={{width: '30px', color: '#484f58'}}>
                      {i + 1}
                    </span>
                    <span
                      style={{
                        color: line.includes('#') ? '#8b949e' : '#e6edf3',
                      }}>
                      {line}
                    </span>
                  </div>
                ))}
              </pre>
            </Box>
          </Paper>
        </Grid>

        {/* Visual Preview & Info */}
        <Grid size={{ xs: 12, lg: 5}}>
          <Stack spacing={3}>
            <Paper
              sx={{
                p: 1,
                bgcolor: '#21262d',
                border: '2px solid #30363d',
                borderRadius: 4,
              }}>
              <Typography
                variant='caption'
                display='block'
                textAlign='center'
                sx={{color: '#8b949e', mb: 1}}>
                LIVE PREVIEW: {codes[activeTab].title}
              </Typography>
              <Box
                sx={{
                  height: 250,
                  bgcolor: activeTab === 1 ? '#6496C8' : '#fff',
                  borderRadius: 2,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                {/* Рендер в зависимости от вкладки */}
                {activeTab === 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 50,
                      height: 50,
                      bgcolor: 'blue',
                    }}
                  />
                )}
                {activeTab === 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      p: 2,
                      bgcolor: '#fdbaf8',
                      border: '2px solid #fff',
                    }}>
                    <ImageIcon sx={{color: '#fff'}} />
                  </Box>
                )}
                {activeTab === 2 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: `${posX}%`,
                      transform: 'translateY(-50%)',
                      width: 40,
                      height: 40,
                      bgcolor: 'blue',
                      borderRadius: 1,
                    }}
                  />
                )}
              </Box>
            </Paper>

            <Alert
              severity='info'
              sx={{
                bgcolor: '#0d1117',
                color: '#adbac7',
                border: '1px solid #30363d',
              }}>
              {activeTab === 2
                ? 'Чтобы создать анимацию, нужно менять переменную (например x += 5) внутри бесконечного цикла while.'
                : codes[activeTab].description}
            </Alert>

            <Box
              sx={{
                p: 2,
                bgcolor: '#161b22',
                borderRadius: 3,
                border: '1px dotted #30363d',
              }}>
              <Typography
                variant='subtitle2'
                sx={{
                  color: '#bc6ff1',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}>
                <CodeIcon fontSize='small' /> Шпаргалка по анимации
              </Typography>
              <Typography
                variant='body2'
                sx={{color: '#8b949e', fontSize: '0.8rem', lineHeight: 1.8}}>
                • <b>FPS (Frames Per Second)</b> — количество обновлений экрана
                в секунду.
                <br />• <b>screen.fill()</b> — обязательно очищайте экран в
                начале цикла, иначе старые кадры останутся.
                <br />• <b>pygame.Rect</b> — объект, который хранит координаты и
                упрощает столкновения (collision).
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
