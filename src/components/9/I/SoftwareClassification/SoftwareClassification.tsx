import {useState} from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest' // Системное
import AppRegistrationIcon from '@mui/icons-material/AppRegistration' // Прикладное
import BuildCircleIcon from '@mui/icons-material/BuildCircle' // Служебное
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const swData = [
  {
    title: 'Системное',
    subtitle: 'ПО',
    icon: <SettingsSuggestIcon sx={{fontSize: 40}} />,
    color: '#2196f3',
    desc: 'Обеспечивает работу компьютера и сетей. Это "фундамент", на котором работает всё остальное.',
    examples: [
      'Операционные системы (Windows, Linux, macOS)',
      'Драйверы устройств',
      'Ядро системы',
    ],
  },
  {
    title: 'Прикладное',
    subtitle: 'ПО',
    icon: <AppRegistrationIcon sx={{fontSize: 40}} />,
    color: '#4caf50',
    desc: 'Программы для решения конкретных задач пользователя. То, ради чего мы используем компьютер.',
    examples: [
      'Текстовые редакторы (Word)',
      'Графические редакторы (Photoshop)',
      'Браузеры и игры',
    ],
  },
  {
    title: 'Служебное',
    subtitle: 'ПО (Утилиты)',
    icon: <BuildCircleIcon sx={{fontSize: 40}} />,
    color: '#ff9800',
    desc: 'Программы для обслуживания компьютера: проверки, настройки и очистки системы.',
    examples: ['Антивирусы', 'Архиваторы (WinRAR)', 'Программы очистки диска'],
  },
]

export const SoftwareClassification = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <Box sx={{py: 4, maxWidth: 1200, margin: '0 auto', px: 2}}>
      {/* ДВУХЦВЕТНЫЙ ЗАГОЛОВОК */}
      <Typography
        variant='h4'
        sx={{
          mb: 6,
          fontWeight: 900,
          textAlign: 'center',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}>
        <Box component='span'>Классификация</Box>
        <Box component='span' sx={{color: '#2196f3'}}>
          ПО
        </Box>
      </Typography>

      <Grid container spacing={4}>
        {swData.map((item, index) => (
          <Grid size={{xs: 12, md: 4}} key={index}>
            <Card
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              sx={{
                height: '100%',
                bgcolor: '#1c2128',
                border: '1px solid',
                borderColor: hoveredIndex === index ? item.color : '#30363d',
                borderRadius: 4,
                transition: '0.4s',
                transform:
                  hoveredIndex === index ? 'translateY(-10px)' : 'none',
                boxShadow:
                  hoveredIndex === index
                    ? `0 10px 30px -10px ${item.color}66`
                    : 'none',
              }}>
              <CardContent sx={{p: 3}}>
                <Stack
                  direction='row'
                  spacing={2}
                  alignItems='center'
                  sx={{mb: 3}}>
                  <Avatar
                    sx={{
                      bgcolor: `${item.color}22`,
                      color: item.color,
                      width: 60,
                      height: 60,
                      border: `1px solid ${item.color}`,
                    }}>
                    {item.icon}
                  </Avatar>
                  <Box>
                    <Typography
                      variant='h5'
                      sx={{fontWeight: 800, color: '#fff'}}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant='subtitle2'
                      sx={{color: item.color, fontWeight: 700}}>
                      {item.subtitle}
                    </Typography>
                  </Box>
                </Stack>

                <Typography
                  variant='body2'
                  sx={{
                    color: '#8b949e',
                    mb: 3,
                    minHeight: 60,
                    lineHeight: 1.6,
                  }}>
                  {item.desc}
                </Typography>

                <Divider sx={{bgcolor: '#30363d', mb: 2}} />

                <Typography
                  variant='overline'
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    mb: 1,
                    display: 'block',
                  }}>
                  Примеры:
                </Typography>

                <List dense sx={{p: 0}}>
                  {item.examples.map((ex, i) => (
                    <ListItem key={i} sx={{px: 0}}>
                      <ListItemIcon sx={{minWidth: 30}}>
                        <CheckCircleOutlineIcon
                          sx={{color: item.color, fontSize: 18}}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={ex}
                        primaryTypographyProps={{
                          fontSize: '0.85rem',
                          color: '#d1d5db',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ИТОГОВАЯ ПАМЯТКА */}
      <Paper
        sx={{
          mt: 8,
          p: 4,
          bgcolor: '#0d1117',
          border: '1px dashed #30363d',
          borderRadius: 4,
          textAlign: 'center',
        }}>
        <Typography variant='h6' sx={{color: '#fff', mb: 2, fontWeight: 700}}>
          💡 Базовое ПО (ОС) — это "дирижер" компьютерного оркестра
        </Typography>
        <Typography sx={{color: '#8b949e', maxWidth: 800, margin: '0 auto'}}>
          Без системного ПО прикладные программы не смогут получить доступ к
          памяти или процессору, а служебные программы помогают содержать этот
          сложный механизм в чистоте и порядке.
        </Typography>
      </Paper>
    </Box>
  )
}
