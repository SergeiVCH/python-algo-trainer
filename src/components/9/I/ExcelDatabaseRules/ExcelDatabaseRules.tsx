import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import TableViewIcon from '@mui/icons-material/TableView'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    Fade,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    Typography
} from '@mui/material'
import { useState } from 'react'

const rules = [
  {
    title: 'Отдельный лист',
    desc: 'Базу данных лучше вести на чистом листе без посторонних записей по бокам.',
    icon: <InfoOutlinedIcon color="primary" />,
  },
  {
    title: 'Строка заголовков',
    desc: 'Первая строка — это имена полей. Они должны быть уникальными и краткими.',
    icon: <TableViewIcon color="primary" />,
  },
  {
    title: 'Единообразие типов',
    desc: 'В одном столбце — только один тип данных (либо числа, либо текст, либо даты).',
    icon: <CheckCircleOutlineIcon color="primary" />,
  },
  {
    title: 'Запрет объединения',
    desc: 'Никогда не объединяйте ячейки внутри таблицы. Это "ломает" сортировку.',
    icon: <ErrorOutlineIcon color="error" />,
  },
]

export const ExcelDatabaseRules = () => {
  const [showFeedback, setShowFeedback] = useState<boolean | null>(null)

  return (
    <Box sx={{ py: 4, maxWidth: 1000, margin: '0 auto', px: 2 }}>
      {/* ЗАГОЛОВОК */}
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 900, color: '#fff', textAlign: 'center' }}>
        БД в электронных таблицах
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#8b949e', textAlign: 'center' }}>
        Основные правила организации данных в Excel (9 класс)
      </Typography>

      {/* КАРТОЧКИ ПРАВИЛ */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {rules.map((rule, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index}>
            <Card sx={{ bgcolor: '#1c2128', border: '1px solid #30363d', height: '100%' }}>
              <CardContent sx={{ display: 'flex', gap: 2 }}>
                {rule.icon}
                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700 }}>
                    {rule.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#8b949e' }}>
                    {rule.desc}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ТЕОРЕТИЧЕСКИЙ БЛОК: СТРУКТУРА */}
      <Paper sx={{ p: 3, bgcolor: '#0d1117', border: '1px solid #30363d', borderRadius: 4, mb: 4 }}>
        <Typography variant="h6" sx={{ color: '#03a9f4', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningAmberIcon /> Важные ограничения:
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon><CheckCircleOutlineIcon sx={{ color: '#4caf50', fontSize: 20 }} /></ListItemIcon>
            <ListItemText sx={{ color: '#d1d5db' }} primary="Заголовки полей — строго в одну ячейку (без переносов на две строки)." />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircleOutlineIcon sx={{ color: '#4caf50', fontSize: 20 }} /></ListItemIcon>
            <ListItemText sx={{ color: '#d1d5db' }} primary="Отсутствие пустых строк внутри базы (база должна быть монолитной)." />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircleOutlineIcon sx={{ color: '#4caf50', fontSize: 20 }} /></ListItemIcon>
            <ListItemText sx={{ color: '#d1d5db' }} primary="Оформление: выделите шапку жирным шрифтом или границами." />
          </ListItem>
        </List>
      </Paper>

      {/* ИНТЕРАКТИВ: ПРОВЕРКА ЗНАНИЙ */}
      <Typography variant="h5" sx={{ mb: 3, color: '#fff', fontWeight: 800 }}>
        Тренажер: Найди ошибку
      </Typography>

      <Grid container spacing={3}>
        {/* Пример 1: Плохой */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, bgcolor: '#1c2128', opacity: 0.8, border: '1px solid #f4433644' }}>
            <Typography variant="caption" sx={{ color: '#f44336', fontWeight: 900 }}>ВАРИАНТ А (Ошибочный)</Typography>
            <Box sx={{ mt: 1, border: '1px solid #30363d', fontSize: '0.8rem' }}>
              <Box sx={{ display: 'flex', bgcolor: '#30363d', p: 0.5, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>
                <Box sx={{ flex: 1, borderRight: '1px solid #000' }}>Товар</Box>
                <Box sx={{ flex: 1 }}>Цена за шт. / Остаток</Box>
              </Box>
              <Box sx={{ display: 'flex', p: 0.5, color: '#8b949e', borderBottom: '1px solid #30363d' }}>
                <Box sx={{ flex: 1 }}>Ручка</Box>
                <Box sx={{ flex: 1 }}>15 руб / 10</Box>
              </Box>
            </Box>
            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#8b949e' }}>
              * Ошибка: Объединение данных (цена и остаток) в одном поле.
            </Typography>
          </Paper>
        </Grid>

        {/* Пример 2: Хороший */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, bgcolor: '#1c2128', border: '1px solid #4caf5044' }}>
            <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 900 }}>ВАРИАНТ Б (Правильный)</Typography>
            <Box sx={{ mt: 1, border: '1px solid #30363d', fontSize: '0.8rem' }}>
              <Box sx={{ display: 'flex', bgcolor: '#03a9f4', p: 0.5, fontWeight: 'bold', color: '#fff' }}>
                <Box sx={{ flex: 1, borderRight: '1px solid #fff' }}>Товар</Box>
                <Box sx={{ flex: 1, borderRight: '1px solid #fff' }}>Цена</Box>
                <Box sx={{ flex: 1 }}>Остаток</Box>
              </Box>
              <Box sx={{ display: 'flex', p: 0.5, color: '#fff', borderBottom: '1px solid #30363d' }}>
                <Box sx={{ flex: 1 }}>Ручка</Box>
                <Box sx={{ flex: 1 }}>15</Box>
                <Box sx={{ flex: 1 }}>10</Box>
              </Box>
            </Box>
            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#8b949e' }}>
              * Правильно: Разные характеристики — в разных столбцах.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography sx={{ color: '#fff', mb: 2 }}>Какое из правил наиболее критично для автоматической сортировки?</Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined" onClick={() => setShowFeedback(false)}>Объединение ячеек</Button>
          <Button variant="outlined" onClick={() => setShowFeedback(true)}>Отсутствие пустых строк</Button>
        </Stack>
        
        {showFeedback !== null && (
          <Fade in={true}>
            <Alert 
              severity="info" 
              sx={{ mt: 3, bgcolor: '#0d1117', color: '#fff', border: '1px solid #03a9f4' }}
              onClose={() => setShowFeedback(null)}
            >
              <AlertTitle>Пояснение</AlertTitle>
              Оба правила важны, но <strong>объединение ячеек</strong> физически запрещает Excel выполнять сортировку, а <strong>пустые строки</strong> заставляют программу думать, что таблица закончилась раньше времени.
            </Alert>
          </Fade>
        )}
      </Box>
    </Box>
  )
}