import {
  alpha,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {AnimatePresence, motion} from 'framer-motion'
import {Search} from 'lucide-react'
import {useMemo, useState} from 'react'
import {Link} from 'react-router-dom'

// Иконки
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AnimationIcon from '@mui/icons-material/Animation'
import BarChartIcon from '@mui/icons-material/BarChart'
import BugReportIcon from '@mui/icons-material/BugReport'
import CodeIcon from '@mui/icons-material/Code'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import GridOnIcon from '@mui/icons-material/GridOn'
import ImageIcon from '@mui/icons-material/Image'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import LoopIcon from '@mui/icons-material/Loop'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import PsychologyIcon from '@mui/icons-material/Psychology'
import RepeatIcon from '@mui/icons-material/Repeat'
import SortIcon from '@mui/icons-material/Sort'
import StorageIcon from '@mui/icons-material/Storage'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import TerminalIcon from '@mui/icons-material/Terminal'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'

// --- ДАННЫЕ ВЫНЕСЕНЫ ДЛЯ УДОБСТВА ФИЛЬТРАЦИИ ---
const categories = [
  {
    grade: '6',
    title: 'КЛАСС',
    iconColor: '#2196f3',
    sections: [
      {
        title: 'Программирование на языке Python',
        items: [
          {
            title: 'Типы данных Python',
            desc: 'Числа, строки, списки и словари.',
            icon: <CodeIcon />,
            path: '/python-types',
            color: '#ffcc00',
          },
          {
            title: 'Правила записи арифметических выражений',
            desc: 'Вычислительные операции над числами',
            icon: <BarChartIcon />,
            path: '/python-arithmetic',
            color: '#3f51b5',
          },
        ],
      },
    ],
  },
  {
    grade: '7',
    title: 'КЛАСС',
    iconColor: '#2196f3',
    sections: [
      {
        title: 'Программирование на языке Python',
        items: [
          {
            title: 'Работа с файлами',
            desc: 'Методы open(), read(), write().',
            icon: <InsertDriveFileIcon />,
            path: '/python-files',
            color: '#9c27b0',
          },
          {
            title: 'Python Логика',
            desc: 'Узнай, как компьютер принимает решения с помощью if-else.',
            icon: <PsychologyIcon />, // Иконка "мозга" или "логики"
            path: '/python-if-visualizer',
            color: '#3776ab',
          },
          {
            title: 'Вложенные условия Python',
            desc: 'Алгоритмы ветвления: работа с операторами if, elif и else для создания условий.',
            icon: <PsychologyIcon />,
            path: '/python-branching',
            color: '#2dd4bf', // Твой бирюзовый акцент для логических модулей
          },
          {
            title: 'Операторы сравнения',
            desc: 'Изучение логических операций: как компьютер сравнивает числа и выдает результат True или False.',
            icon: <CompareArrowsIcon />,
            path: '/python-comparison',
            color: '#ff9800', // Оранжевый цвет для акцента на логических операциях
          },
        ],
      },
    ],
  },
  {
    grade: '8',
    title: 'КЛАСС',
    iconColor: '#2196f3',
    sections: [
      {
        title: 'Программирование алгоритмов на языке Python',
        items: [
          {
            title: 'Цикл While в Python',
            desc: 'Интерактивная трассировка цикла. Посмотри, как меняются переменные на каждом шаге.',
            icon: <TerminalIcon />,
            path: '/python-while',
            color: '#ffeb3b',
          },
          {
            title: 'Цикл For в Python',
            desc: 'Визуализация итерации по range(). Узнай, почему цикл всегда останавливается на шаг раньше.',
            icon: <RepeatIcon />, // Или используй SyncIcon / терминал, если иконки еще не импортированы
            path: '/python-for',
            color: '#4caf50', // Зеленый цвет отлично контрастирует с желтым для while
          },
          {
            title: 'Оператор continue',
            desc: 'Интерактивная отладка for и while с оператором continue.',
            icon: <LoopIcon />,
            path: '/python-continue',
            color: '#ff9800',
          },
          {
            title: 'Оператор break',
            desc: 'Изучаем оператор break. Пойми, как мгновенно остановить любой цикл.',
            icon: <ExitToAppIcon />, // Импортируй: import ExitToAppIcon from '@mui/icons-material/ExitToApp';
            path: '/python-break',
            color: '#f44336',
          },
          {
            title: 'Трассировка',
            desc: 'Построй таблицу значений переменных и пойми алгоритм на 100%.',
            icon: <BugReportIcon />,
            path: '/python-trace',
            color: '#03a9f4',
          },
        ],
      },
    ],
  },
  {
    grade: '9',
    title: 'КЛАСС',
    iconColor: '#3f51b5',
    sections: [
      {
        title: 'Программирование алгоритмов на языке программирования Python',
        items: [
          {
            title: 'Одномерные массивы',
            desc: 'Списки Python: методы и индексы.',
            icon: <StorageIcon />,
            path: '/arrays',
            color: '#2196f3',
          },
          {
            title: 'Поиск в массивах',
            desc: 'Алгоритмы поиска элементов с заданными свойствами.',
            icon: <ManageSearchIcon />, // Или <SearchIcon />
            path: '/array-search',
            color: '#ff9800', // Оранжевый цвет для тем программирования
          },
          {
            title: 'Перестановка элементов',
            desc: 'Алгоритм обмена значений и реверс массива.',
            icon: <SwapHorizIcon />,
            path: '/array-swap',
            color: '#4caf50', // Зеленый цвет
          },
          {
            title: 'Двумерные массивы',
            desc: 'Работа с матрицами, вложенные циклы и индексы i, j.',
            icon: <GridOnIcon />,
            path: '/2d-arrays',
            color: '#1f6feb', // Синий цвет
          },
          {
            title: 'Сортировка массивов',
            desc: 'Пузырек, методы sort() и sorted(), возрастание и убывание.',
            icon: <SortIcon />,
            path: '/sorting',
            color: '#ff9800', // Оранжевый цвет
          },
          {
            title: 'Методы списков',
            desc: 'Вставка, удаление, поиск и подсчет элементов в Python.',
            icon: <AddCircleOutlineIcon />,
            path: '/list-methods',
            color: '#2196f3', // Синий цвет
          },
        ],
      },
      {
        title: 'Создание 2D-игры на языке программирования python',
        items: [
          {
            title: 'Основы Pygame',
            desc: 'Установка библиотеки и создание первого игрового окна.',
            icon: <VideogameAssetIcon />,
            path: '/pygame-intro',
            color: '#4caf50',
          },
          {
            title: 'Создание окна для игры',
            desc: 'Загрузка внешних изображений и работа с задним планом.',
            icon: <ImageIcon />, // Не забудь импортировать: ;
            path: '/pygame-graphics',
            color: '#2196f3', // Синий
          },
          {
            title: 'Анимация персонажа',
            desc: 'Создание живой анимации с помощью списков спрайтов и таймеров.',
            icon: <AnimationIcon />,
            path: '/pygame-animation',
            color: '#9c27b0', // Фиолетовый
          },
        ],
      },
    ],
  },
  {
    grade: '10',
    title: 'КЛАСС',
    iconColor: '#3f51b5',
    sections: [
      {
        title: 'Алгоритмизация и программирование',
        items: [
          {
            title: 'Функции и процедуры в Python',
            desc: 'Интерактивная визуализация подпрограмм. Разберите разницу между def с return и без.',
            icon: <TerminalIcon />,
            path: '/python-functions',
            color: '#ffeb3b',
          },
        ],
      },
    ],
  },
]

export const HomeMenu = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Состояния
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({})
  const [searchValue, setSearchValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [activeGrade, setActiveGrade] = useState<string | null>(null) // null значит "Все классы"

  const toggleCategory = (index: number) => {
    setCollapsed((prev) => ({...prev, [index]: !prev[index]}))
  }

  // --- ЛОГИКА ПОИСКА И ФИЛЬТРАЦИИ ПО КНОПКАМ ---
  const filteredCategories = useMemo(() => {
    const query = searchValue.toLowerCase().trim()

    return categories
      .filter((cat) => !activeGrade || cat.grade === activeGrade) // Фильтр по кнопке класса
      .map((cat) => {
        const filteredSections = cat.sections
          .map((section) => ({
            ...section,
            items: section.items.filter(
              (item) =>
                item.title.toLowerCase().includes(query) ||
                item.desc.toLowerCase().includes(query) ||
                cat.grade.includes(query),
            ),
          }))
          .filter((section) => section.items.length > 0)
        return {...cat, sections: filteredSections}
      })
      .filter((cat) => cat.sections.length > 0)
  }, [searchValue, activeGrade])

  const grades = ['6', '7', '8', '9', '10']

  return (
    <Container maxWidth='xl' sx={{py: isMobile ? 4 : 6}}>
      {/* Шапка */}
      <Box sx={{mb: 4, textAlign: 'center'}}>
        <motion.div
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}>
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            sx={{fontWeight: 900, mb: 1, color: '#fff'}}>
            Я знаю<span style={{color: '#4caf50'}}>Python</span>
          </Typography>
          <Typography
            variant='h6'
            sx={{color: '#8b949e', fontWeight: 400, mb: 2}}>
            Интерактивный тренажёр по основам программирования и алгоритмизации:
            от концепций к визуализации на Python{' '}
          </Typography>

          {/* ПОИСКОВАЯ СТРОКА */}
          <Box sx={{width: '100%', maxWidth: 600, mx: 'auto', mt: 4, mb: 4}}>
            <motion.div animate={{scale: focused ? 1.02 : 1}}>
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                  py: 1,
                  borderRadius: '16px',
                  bgcolor: focused
                    ? alpha('#0d1117', 0.9)
                    : alpha('#161b22', 0.8),
                  border: '1px solid',
                  borderColor: focused ? '#4caf50' : '#30363d',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  boxShadow: focused
                    ? `0 0 20px ${alpha('#4caf50', 0.15)}`
                    : 'none',
                }}>
                <Search size={20} color={focused ? '#4caf50' : '#8b949e'} />
                <InputBase
                  fullWidth
                  placeholder='Поиск уроков, классов или тем...'
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  sx={{ml: 2, color: '#fff', fontSize: '1rem'}}
                />
              </Paper>
            </motion.div>
          </Box>

          {/* КНОПКИ ВЫБОРА КЛАССА */}
          <Stack
            direction='row'
            spacing={1}
            justifyContent='center'
            sx={{mb: 6, flexWrap: 'wrap', gap: 1}}>
            <Button
              variant={activeGrade === null ? 'contained' : 'outlined'}
              onClick={() => setActiveGrade(null)}
              sx={{
                borderRadius: '12px',
                color: activeGrade === null ? '#fff' : '#8b949e',
                borderColor: '#30363d',
                bgcolor: activeGrade === null ? '#4caf50' : 'transparent',
                '&:hover': {
                  bgcolor:
                    activeGrade === null ? '#45a049' : alpha('#fff', 0.05),
                },
              }}>
              Все
            </Button>
            {grades.map((grade) => (
              <Button
                key={grade}
                variant={activeGrade === grade ? 'contained' : 'outlined'}
                onClick={() => setActiveGrade(grade)}
                sx={{
                  borderRadius: '12px',
                  color: activeGrade === grade ? '#fff' : '#8b949e',
                  borderColor: '#30363d',
                  bgcolor: activeGrade === grade ? '#2196f3' : 'transparent',
                  '&:hover': {
                    bgcolor:
                      activeGrade === grade ? '#1e88e5' : alpha('#fff', 0.05),
                  },
                }}>
                {grade} класс
              </Button>
            ))}
          </Stack>
        </motion.div>
      </Box>

      {/* Список контента */}
      <AnimatePresence mode='popLayout'>
        {filteredCategories.map((cat, catIdx) => {
          const isCollapsed = !!collapsed[catIdx]
          return (
            <motion.div
              key={cat.grade}
              layout
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              style={{marginBottom: '64px'}}>
              <Stack alignItems='center' spacing={2} sx={{mb: 4}}>
                <Box
                  onClick={() => toggleCategory(catIdx)}
                  sx={{
                    width: 70,
                    height: 70,
                    bgcolor: '#161b22',
                    borderRadius: '20px',
                    border: `2px solid ${cat.iconColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: `0 0 20px ${alpha(cat.iconColor, 0.15)}`,
                    '&:hover': {transform: 'scale(1.05)'},
                    transition: '0.3s',
                  }}>
                  <Typography
                    sx={{
                      fontSize: '2.5rem',
                      fontWeight: 900,
                      color: cat.iconColor,
                    }}>
                    {cat.grade}
                  </Typography>
                </Box>
                <Box sx={{textAlign: 'center'}}>
                  <Typography
                    variant='h5'
                    sx={{fontWeight: 800, color: '#fff'}}>
                    {cat.title}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => toggleCategory(catIdx)}
                  sx={{color: cat.iconColor}}>
                  {isCollapsed ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowUpIcon />
                  )}
                </IconButton>
              </Stack>

              <Collapse in={!isCollapsed}>
                {cat.sections.map((section, sIdx) => (
                  <Box key={sIdx} sx={{mb: 6}}>
                    <Typography
                      variant='overline'
                      sx={{
                        color: cat.iconColor,
                        fontWeight: 700,
                        letterSpacing: 2,
                        display: 'block',
                        mb: 2,
                        ml: 1,
                        opacity: 0.8,
                      }}>
                      {section.title}
                    </Typography>

                    <Grid container spacing={3}>
                      {section.items.map((item) => (
                        <Grid key={item.path} size={{xs: 12, sm: 6, md: 4}}>
                          <Card
                            sx={{
                              height: '100%',
                              bgcolor: '#161b22',
                              border: '1px solid #30363d',
                              borderRadius: 4,
                              transition: '0.3s',
                              '&:hover': {
                                transform: 'translateY(-8px)',
                                borderColor: item.color,
                                boxShadow: `0 10px 30px ${alpha(item.color, 0.15)}`,
                              },
                            }}>
                            <CardActionArea
                              component={Link}
                              to={item.path}
                              sx={{height: '100%'}}>
                              <CardContent
                                sx={{display: 'flex', gap: 2.5, p: 3}}>
                                <Box
                                  sx={{
                                    p: 1.5,
                                    minWidth: 54,
                                    height: 54,
                                    bgcolor: alpha(item.color, 0.1),
                                    borderRadius: '12px',
                                    color: item.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    border: `1px solid ${alpha(item.color, 0.2)}`,
                                  }}>
                                  {item.icon}
                                </Box>
                                <Box>
                                  <Typography
                                    variant='h6'
                                    sx={{
                                      fontWeight: 800,
                                      color: '#fff',
                                      mb: 0.5,
                                      fontSize: '1.1rem',
                                    }}>
                                    {item.title}
                                  </Typography>
                                  <Typography
                                    variant='body2'
                                    sx={{
                                      color: '#8b949e',
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden',
                                    }}>
                                    {item.desc}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </Collapse>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </Container>
  )
}
