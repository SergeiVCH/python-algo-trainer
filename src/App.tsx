import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  alpha,
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Menu,
  Stack,
  ThemeProvider,
  Typography,
} from '@mui/material'
import {useState} from 'react'
import {BrowserRouter, Link} from 'react-router-dom'
import {AnimatedRoutes} from './components/AnimatedRoutes/AnimatedRoutes'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {main: '#4caf50'},
    background: {default: '#0d1117', paper: '#161b22'},
  },
  shape: {borderRadius: 8},
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
  },
})

// НОВАЯ СТРУКТУРА ДАННЫХ (Sections)
const menuGroups = [
  {
    grade: '6',
    title: 'КЛАСС',
    color: '#2196f3',
    sections: [
      {
        title: 'Программирование на языке Python',
        items: [
          {
            label: 'Типы данных Python',
            path: '/python-arithmetic',
          },
          {
            label: 'Правила записи арифметических выражений',
            path: '/python-types',
          },
        ],
      },
    ],
  },
  {
    grade: '7',
    title: 'КЛАСС',
    color: '#ff9800',
    sections: [
      {
        title: 'Программирование на языке Python',
        items: [
          {label: 'Работа с файлами', path: '/python-files'},
          {label: 'Python Логика', path: '/python-if-visualizer'},
          {label: 'Вложенные условия Python', path: '/python-branching'},
          {label: 'Операторы сравнения', path: '/python-comparison'},
        ],
      },
    ],
  },
  {
    grade: '8',
    title: 'КЛАСС',
    color: '#00bcd4',
    sections: [
      {
        title: 'Программирование алгоритмов на языке Python',
        items: [
          {label: 'Цикл While в Python', path: '/python-while'},
          {label: 'Цикл For в Python', path: '/python-for'},
          {label: 'Оператор continue', path: '/python-continue'},
          {label: 'Оператор break', path: '/python-break'},
          {label: 'Трассировка', path: '/python-trace'},
        ],
      },
    ],
  },
  {
    grade: '9',
    title: 'КЛАСС',
    color: '#e91e63',
    sections: [
      {
        title: 'Программирование Python',
        items: [
          {label: 'Одномерные массивы', path: '/arrays'},
          {label: 'Поиск в массивах', path: '/array-search'},
          {label: 'Перестановка элементов', path: '/array-swap'},
          {label: 'Двумерные массивы', path: '/2d-arrays'},
          {label: 'Сортировка массивов', path: '/sorting'},
          {label: 'Методы списков', path: '/list-methods'},
        ],
      },
      {
        title: 'Создание 2D-игры на языке программирования python',
        items: [
          {label: 'Основы Pygame', path: '/pygame-intro'},
          {label: 'Создание окна для игры', path: '/pygame-graphics'},
          {label: 'Анимация персонажа', path: '/pygame-animation'},
        ],
      },
    ],
  },
  {
    grade: '10',
    title: 'КЛАСС',
    color: '#3f51b5',
    sections: [
      {
        title: 'Алгоритмизация и программирование',
        items: [
          {label: 'Функции и процедуры в Python', path: '/python-functions'},
          {label: 'Работа со строками в Python', path: '/string-lab'},
        ],
      },
    ],
  },
]

export const App = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar
          position='sticky'
          sx={{
            bgcolor: '#0d1117',
            borderBottom: '1px solid #30363d',
            height: '70px',
            zIndex: 1100,
            justifyContent: 'center',
          }}
          elevation={0}>
          <Container maxWidth='xl'>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'>
              <Typography
                variant='h5'
                component={Link}
                to='/'
                sx={{
                  fontWeight: 900,
                  color: '#4caf50',
                  textDecoration: 'none',
                  letterSpacing: 1,
                }}>
                Я знаю
                <Box component='span' sx={{color: '#fff'}}>
                  Python
                </Box>
              </Typography>

              <Button
                onClick={handleOpen}
                endIcon={
                  <KeyboardArrowDownIcon
                    sx={{
                      transform: open ? 'rotate(180deg)' : 'none',
                      transition: '0.3s',
                      color: '#4caf50',
                    }}
                  />
                }
                sx={{
                  color: '#8b949e',
                  fontWeight: 700,
                  fontSize: {xs: '0.7rem', sm: '0.8rem'},
                }}>
                ОБЗОР ВСЕХ КЛАССОВ
              </Button>
            </Stack>
          </Container>
        </AppBar>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          transformOrigin={{vertical: 'top', horizontal: 'center'}}
          PaperProps={{
            sx: {
              mt: 1,
              bgcolor: 'rgba(22, 27, 34, 0.98)',
              backdropFilter: 'blur(10px)',
              border: '1px solid #30363d',
              borderRadius: '0 0 16px 16px',
              width: '100%',
              maxWidth: '100vw',
              left: '0 !important',
              right: 0,
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              '& .MuiList-root': {padding: 0},
            },
          }}>
          <Container maxWidth='xl' sx={{py: 5}}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(5, 1fr)',
                },
                gap: 4,
              }}>
              {menuGroups.map((group) => (
                <Box key={group.title}>
                  {/* ВМЕСТО ИКОНКИ - ЦИФРА КЛАССА */}
                  <Typography
                    variant='button'
                    sx={{
                      color: group.color,
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      borderBottom: `2px solid ${alpha(group.color, 0.2)}`,
                      pb: 1,
                    }}>
                    <Box
                      sx={{
                        width: 26,
                        height: 26,
                        bgcolor: group.color,
                        color: '#000',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        fontSize: '0.8rem',
                      }}>
                      {group.grade}
                    </Box>
                    {group.title}
                  </Typography>

                  {/* РЕНДЕР СЕКЦИЙ В МЕНЮ */}
                  <Stack spacing={2}>
                    {group.sections.map((section, idx) => (
                      <Box key={idx}>
                        <Typography
                          variant='caption'
                          sx={{
                            color: '#444c56',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                            display: 'block',
                            mb: 0.5,
                          }}>
                          {section.title}
                        </Typography>
                        <Stack spacing={0.5}>
                          {section.items.map((item) => (
                            <Button
                              key={item.path}
                              component={Link}
                              to={item.path}
                              onClick={handleClose}
                              sx={{
                                justifyContent: 'flex-start',
                                color: '#8b949e',
                                fontSize: '0.75rem',
                                textTransform: 'none',
                                p: '2px 0',
                                minHeight: 0,
                                '&:hover': {
                                  color: group.color,
                                  bgcolor: 'transparent',
                                  transform: 'translateX(4px)',
                                },
                                transition: '0.2s',
                              }}>
                              {item.label}
                            </Button>
                          ))}
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Box>
          </Container>
        </Menu>
        <Container maxWidth='xl' sx={{mt: 5, pb: 10}}>
          <AnimatedRoutes />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}
