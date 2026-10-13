import AccountTreeIcon from '@mui/icons-material/AccountTree'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import KeyIcon from '@mui/icons-material/Key'
import LanIcon from '@mui/icons-material/Lan'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import TableChartIcon from '@mui/icons-material/TableChart'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ReplayIcon from '@mui/icons-material/Replay'
import {
  Box,
  Card,
  Chip,
   Grid, // Используем Grid2 для совместимости с последними версиями MUI
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Fade,
  Divider
} from '@mui/material'
import { useState } from 'react'

const dbTypes = [
  {
    id: 0,
    label: 'Иерархическая',
    icon: <AccountTreeIcon />,
    color: '#ff9800',
    description:
      'Данные организованы по принципу "предок-потомок". Напоминает структуру папок в Windows.',
    pros: [
      'Быстрый доступ к данным при четкой структуре',
      'Эффективна для простых зависимостей',
    ],
    cons: [
      'Сложно вносить изменения',
      'Трудно отобразить связи "многие-ко-многим"',
    ],
  },
  {
    id: 1,
    label: 'Сетевая',
    icon: <LanIcon />,
    color: '#03a9f4',
    description:
      'Улучшенная иерархическая модель. У одного "потомка" может быть несколько "предков".',
    pros: ['Гибкие связи между данными', 'Высокая скорость поиска'],
    cons: ['Очень сложная структура', 'Трудно поддерживать целостность данных'],
  },
  {
    id: 2,
    label: 'Реляционная (Табличная)',
    icon: <TableChartIcon />,
    color: '#4caf50',
    description:
      'Данные хранятся в виде связанных таблиц. Самый популярный вид БД сегодня.',
    pros: ['Простота и понятность', 'Легко менять структуру', 'Строгая логика'],
    cons: [
      'Может работать медленнее на гигантских объемах',
      'Требует больше памяти',
    ],
  },
]

export const DatabaseBasics = () => {
  const [activeTab, setActiveTab] = useState(0)

  // Состояние для интерактивного задания
  const [answers, setAnswers] = useState({
    field1: '', // Фамилия -> string
    field2: '', // Дата рождения -> date
    field3: '', // Количество книг -> number
    field4: '', // На руках? -> boolean
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleCheck = () => {
    let currentScore = 0
    if (answers.field1 === 'string') currentScore++
    if (answers.field2 === 'date') currentScore++
    if (answers.field3 === 'number') currentScore++
    if (answers.field4 === 'boolean') currentScore++
    setScore(currentScore)
    setIsSubmitted(true)
  }

  const resetQuiz = () => {
    setAnswers({ field1: '', field2: '', field3: '', field4: '' })
    setIsSubmitted(false)
  }

  return (
    <Box sx={{ py: 4, maxWidth: 1100, margin: '0 auto', px: 2 }}>
      {/* ЗАГОЛОВОК */}
      <Typography
        variant='h4'
        sx={{
          mb: 4,
          fontWeight: 900,
          textAlign: 'center',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}>
        <Box component='span'>Базы</Box>
        <Box component='span' sx={{ color: '#03a9f4' }}>данных</Box>
      </Typography>

      {/* ВЫБОР ТИПА БД */}
      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        centered
        sx={{
          mb: 4,
          '& .MuiTabs-indicator': { bgcolor: dbTypes[activeTab].color },
          '& .MuiTab-root': {
            color: '#8b949e',
            '&.Mui-selected': { color: '#fff' },
          },
        }}>
        {dbTypes.map((type) => (
          <Tab key={type.id} icon={type.icon} label={type.label} />
        ))}
      </Tabs>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#1c2128',
              borderRadius: 4,
              border: `1px solid ${dbTypes[activeTab].color}44`,
              height: '100%',
            }}>
            <Typography variant='h5' sx={{ color: '#fff', mb: 2, fontWeight: 800 }}>
              {dbTypes[activeTab].label} модель
            </Typography>
            <Typography variant='body1' sx={{ color: '#8b949e', mb: 4 }}>
              {dbTypes[activeTab].description}
            </Typography>

            {activeTab === 2 && (
              <Box sx={{ mt: 2 }}>
                <TableContainer component={Paper} sx={{ bgcolor: '#0d1117', border: '1px solid #30363d' }}>
                  <Table size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: '#4caf50', fontWeight: 900, borderBottom: '2px solid #30363d' }}>
                          <KeyIcon sx={{ fontSize: 14, mr: 0.5 }} /> ID
                        </TableCell>
                        <TableCell sx={{ color: '#fff', borderBottom: '2px solid #30363d' }}>Фамилия</TableCell>
                        <TableCell sx={{ color: '#fff', borderBottom: '2px solid #30363d' }}>Класс</TableCell>
                        <TableCell sx={{ color: '#fff', borderBottom: '2px solid #30363d' }}>Возраст</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow sx={{ '&:hover': { bgcolor: '#1c2128' } }}>
                        <TableCell sx={{ color: '#4caf50' }}>1</TableCell>
                        <TableCell sx={{ color: '#d1d5db' }}>Иванов</TableCell>
                        <TableCell sx={{ color: '#d1d5db' }}>9 "А"</TableCell>
                        <TableCell sx={{ color: '#d1d5db' }}>15</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack direction='row' spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                  <Chip label='Запись = Строка' size='small' variant='outlined' sx={{ color: '#03a9f4', borderColor: '#03a9f4' }} />
                  <Chip label='Поле = Столбец' size='small' variant='outlined' sx={{ color: '#ff9800', borderColor: '#ff9800' }} />
                  <Chip label='Ключ = Уникальность' size='small' variant='outlined' sx={{ color: '#4caf50', borderColor: '#4caf50' }} />
                </Stack>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2}>
            <Card sx={{ bgcolor: '#0d1117', border: '1px solid #30363d', borderRadius: 4 }}>
              <Box sx={{ p: 2, bgcolor: '#4caf5011', borderBottom: '1px solid #4caf5033' }}>
                <Typography variant='subtitle2' sx={{ color: '#4caf50', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AddCircleOutlineIcon fontSize='small' /> Достоинства
                </Typography>
              </Box>
              <List dense>
                {dbTypes[activeTab].pros.map((pro, i) => (
                  <ListItem key={i}><ListItemText primary={pro} primaryTypographyProps={{ fontSize: '0.85rem', color: '#d1d5db' }} /></ListItem>
                ))}
              </List>
            </Card>

            <Card sx={{ bgcolor: '#0d1117', border: '1px solid #30363d', borderRadius: 4 }}>
              <Box sx={{ p: 2, bgcolor: '#f4433611', borderBottom: '1px solid #f4433633' }}>
                <Typography variant='subtitle2' sx={{ color: '#f44336', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <RemoveCircleOutlineIcon fontSize='small' /> Недостатки
                </Typography>
              </Box>
              <List dense>
                {dbTypes[activeTab].cons.map((con, i) => (
                  <ListItem key={i}><ListItemText primary={con} primaryTypographyProps={{ fontSize: '0.85rem', color: '#d1d5db' }} /></ListItem>
                ))}
              </List>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* ИНТЕРАКТИВНОЕ ЗАДАНИЕ */}
      <Typography variant="h5" sx={{ mb: 3, mt: 6, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 1 }}>
        <HelpOutlineIcon color="primary" /> Практика: Проектирование таблицы
      </Typography>

      <Paper sx={{ p: { xs: 2, md: 4 }, bgcolor: '#0d1117', borderRadius: 4, border: '2px solid #30363d' }}>
        <Typography variant="h6" sx={{ color: '#03a9f4', mb: 1 }}>
          Задание: Типы данных в библиотеке
        </Typography>
        <Typography variant="body2" sx={{ color: '#8b949e', mb: 4 }}>
          Подбери правильный тип данных для каждого поля таблицы «Выданные книги».
        </Typography>

        <Grid container spacing={3}>
          {[
            { id: 'field1', label: 'Автор книги', options: [['string', 'Текстовый'], ['number', 'Числовой']] },
            { id: 'field2', label: 'Дата выдачи', options: [['date', 'Дата'], ['string', 'Текстовый']] },
            { id: 'field3', label: 'Кол-во страниц', options: [['number', 'Числовой'], ['boolean', 'Логический']] },
            { id: 'field4', label: 'Вернули в срок?', options: [['boolean', 'Логический (Да/Нет)'], ['string', 'Текстовый']] },
          ].map((item) => (
            <Grid size={{ xs: 12, sm: 6 }} key={item.id}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: '#8b949e' }}>{item.label}</InputLabel>
                <Select
                  value={answers[item.id as keyof typeof answers]}
                  label={item.label}
                  onChange={(e) => setAnswers({ ...answers, [item.id]: e.target.value })}
                  disabled={isSubmitted}
                  sx={{ 
                    color: '#fff', 
                    '.MuiOutlinedInput-notchedOutline': { borderColor: '#30363d' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#03a9f4' }
                  }}
                >
                  {item.options.map(([val, lab]) => (
                    <MenuItem key={val} value={val}>{lab}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, bgcolor: '#30363d' }} />

        {!isSubmitted ? (
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleCheck}
            disabled={Object.values(answers).some(v => v === '')}
            sx={{ bgcolor: '#03a9f4', fontWeight: 800, py: 1.5 }}
          >
            Проверить решение
          </Button>
        ) : (
          <Box>
            <Fade in={true}>
              <Alert 
                severity={score === 4 ? "success" : "warning"}
                icon={score === 4 ? <CheckCircleIcon /> : null}
                sx={{ bgcolor: score === 4 ? '#1b5e20' : '#422a06', color: '#fff', mb: 2, borderRadius: 2 }}
              >
                Верно: {score} из 4. {score === 4 ? "Отлично! Ты понимаешь структуру данных." : "Попробуй найти ошибку в типах полей."}
              </Alert>
            </Fade>
            <Button startIcon={<ReplayIcon />} onClick={resetQuiz} sx={{ color: '#8b949e' }}>Сбросить</Button>
          </Box>
        )}
      </Paper>
    </Box>
  )
}