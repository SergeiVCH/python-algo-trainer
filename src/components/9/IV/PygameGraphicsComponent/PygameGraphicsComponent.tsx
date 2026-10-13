import LayersIcon from '@mui/icons-material/Layers'
import {
  Alert,
  Box,
  Grid,
  Paper,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import {useState, useMemo} from 'react'

export const PygameGraphicsComponent = () => {
  const CANVAS_WIDTH = 350
  const CANVAS_HEIGHT = 250
  const RECT_SIZE = 50

  const [posX, setPosX] = useState(150)
  const [posY, setPosY] = useState(80)
  const [bgColor, setBgColor] = useState('#ffffff')
  const [heroColor, setHeroColor] = useState('#0000ff')

  const constrainedX = Math.max(0, Math.min(CANVAS_WIDTH - RECT_SIZE, posX))
  const constrainedY = Math.max(0, Math.min(CANVAS_HEIGHT - RECT_SIZE, posY))

  // Генерируем полный листинг кода на основе текущих состояний
  const baseCode = useMemo(
    () => [
      {line: 1, text: 'import pygame', type: 'import'},
      {line: 2, text: '', type: 'empty'},
      {line: 3, text: 'FPS = 60', type: 'const'},
      {line: 4, text: '', type: 'empty'},
      {line: 5, text: 'pygame.init()', type: 'init'},
      {
        line: 6,
        text: 'screen = pygame.display.set_mode((600, 400))',
        type: 'init',
      },
      {line: 7, text: 'pygame.display.set_caption("Game")', type: 'init'},
      {line: 8, text: 'clock = pygame.time.Clock()', type: 'init'},
      {line: 9, text: '', type: 'empty'},
      {line: 10, text: 'while True:', type: 'loop'},
      {line: 11, text: '    clock.tick(FPS)', type: 'loop'},
      {line: 12, text: '    ', type: 'empty'},
      {line: 13, text: '    for event in pygame.event.get():', type: 'event'},
      {line: 14, text: '        if event.type == pygame.QUIT:', type: 'event'},
      {line: 15, text: '            pygame.quit(); exit()', type: 'event'},
      {line: 16, text: '    ', type: 'empty'},
      {
        line: 17,
        text: `    screen.fill(${bgColor === '#ffffff' ? '(255, 255, 255)' : '(30, 30, 30)'})`,
        highlight: true,
      },
      {
        line: 18,
        text: `    pygame.draw.rect(screen, ${heroColor === '#0000ff' ? '(0, 0, 255)' : '(255, 165, 0)'}, (${constrainedX}, ${constrainedY}, 50, 50))`,
        highlight: true,
      },
      {line: 19, text: '    pygame.display.update()', type: 'draw'},
    ],
    [bgColor, heroColor, constrainedX, constrainedY],
  )

  return (
    <Box
      sx={{
        p: {xs: 1, md: 3},
        maxWidth: 1200,
        margin: '0 auto',
        color: '#e6edf3',
      }}>
      {/* Заголовок */}
      <Stack
        direction='row'
        spacing={2}
        alignItems='center'
        justifyContent='center' // Выравнивание Stack по центру
        sx={{mb: 3, width: '100%'}}>
        <Box sx={{bgcolor: '#2196f3', p: 1, borderRadius: 2}}>
          <LayersIcon sx={{fontSize: 30, color: '#fff'}} />
        </Box>
        <Box>
          <Typography
            variant='h4'
            sx={{
              fontWeight: 800,
              fontSize: {xs: '1.2rem', md: '1.8rem'},
              textAlign: 'center', // Текст по центру
              color: '#e6edf3', // Основной цвет текста
            }}>
            <span style={{color: '#2196f3'}}>Создание</span> окна для игры
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={2}>
        {/* 1. Панель управления */}
        <Grid size={{xs: 12, md: 3}}>
          <Stack spacing={2}>
            <Paper
              sx={{
                p: 2,
                bgcolor: '#161b22',
                border: '1px solid #30363d',
                borderRadius: 3,
              }}>
              <Typography
                variant='caption'
                sx={{
                  color: '#58a6ff',
                  fontWeight: 'bold',
                  display: 'block',
                  mb: 1,
                }}>
                КООРДИНАТЫ (X, Y)
              </Typography>
              <Box sx={{px: 1}}>
                <Slider
                  value={constrainedX}
                  min={0}
                  max={CANVAS_WIDTH - RECT_SIZE}
                  onChange={(_, v) => setPosX(v as number)}
                  size='small'
                />
                <Slider
                  value={constrainedY}
                  min={0}
                  max={CANVAS_HEIGHT - RECT_SIZE}
                  onChange={(_, v) => setPosY(v as number)}
                  size='small'
                  color='secondary'
                />
              </Box>
            </Paper>

            <Paper
              sx={{
                p: 2,
                bgcolor: '#161b22',
                border: '1px solid #30363d',
                borderRadius: 3,
              }}>
              <Typography
                variant='caption'
                sx={{
                  color: '#58a6ff',
                  fontWeight: 'bold',
                  display: 'block',
                  mb: 1,
                }}>
                СТИЛИЗАЦИЯ
              </Typography>
              <ToggleButtonGroup
                value={bgColor}
                exclusive
                onChange={(_, v) => v && setBgColor(v)}
                size='small'
                fullWidth
                sx={{mb: 1}}>
                <ToggleButton value='#ffffff' sx={{color: '#adbac7'}}>
                  Светлый
                </ToggleButton>
                <ToggleButton value='#1e1e1e' sx={{color: '#adbac7'}}>
                  Темный
                </ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                value={heroColor}
                exclusive
                onChange={(_, v) => v && setHeroColor(v)}
                size='small'
                fullWidth>
                <ToggleButton value='#0000ff' sx={{color: '#58a6ff'}}>
                  Синий
                </ToggleButton>
                <ToggleButton value='#ffa500' sx={{color: '#ffa657'}}>
                  Оранж
                </ToggleButton>
              </ToggleButtonGroup>
            </Paper>
          </Stack>
        </Grid>

        {/* 2. Отображение кода */}
        <Grid size={{xs: 12, md: 5}}>
          <Paper
            sx={{
              bgcolor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}>
            <Box
              sx={{
                p: 1.5,
                bgcolor: '#161b22',
                borderBottom: '1px solid #30363d',
              }}>
              <Typography
                variant='caption'
                sx={{color: '#8b949e', fontFamily: 'monospace'}}>
                main_game_loop.py
              </Typography>
            </Box>
            <Box
              sx={{
                p: 2,
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                overflow: 'auto',
                whiteSpace: 'nowrap',
                '&::-webkit-scrollbar': {height: '4px', width: '4px'},
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: '#30363d',
                  borderRadius: '2px',
                },
              }}>
              {baseCode.map((line, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    bgcolor: line.highlight
                      ? 'rgba(126, 231, 135, 0.1)'
                      : 'transparent',
                  }}>
                  <Typography
                    sx={{
                      color: '#484f58',
                      mr: 2,
                      width: '20px',
                      textAlign: 'right',
                      userSelect: 'none',
                    }}>
                    {line.line}
                  </Typography>
                  <Typography
                    sx={{color: line.highlight ? '#7ee787' : '#adbac7'}}>
                    {line.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* 3. Визуальное превью */}
        <Grid size={{xs: 12, md: 4}}>
          <Stack spacing={1} sx={{height: '100%'}}>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: bgColor,
                borderRadius: 3,
                border: '4px solid #30363d',
                position: 'relative',
                minHeight: 250,
                transition: 'background-color 0.3s',
                overflow: 'hidden',
              }}>
              <Box
                sx={{
                  position: 'absolute',
                  width: RECT_SIZE,
                  height: RECT_SIZE,
                  bgcolor: heroColor,
                  left: constrainedX,
                  top: constrainedY,
                  borderRadius: 1,
                  transition: 'all 0.1s ease-out',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
              />
              <Typography
                sx={{
                  position: 'absolute',
                  left: constrainedX,
                  top: constrainedY - 20,
                  fontSize: '0.6rem',
                  color: bgColor === '#ffffff' ? '#000' : '#fff',
                  fontWeight: 'bold',
                }}>
                X:{constrainedX} Y:{constrainedY}
              </Typography>
            </Box>
            <Alert
              severity='info'
              icon={false}
              sx={{
                bgcolor: '#161b22',
                color: '#8b949e',
                fontSize: '0.7rem',
                border: '1px solid #30363d',
              }}>
              В Pygame точка <b>(0,0)</b> находится в левом верхнем углу.
            </Alert>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
