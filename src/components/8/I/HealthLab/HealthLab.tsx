import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import PsychologyIcon from '@mui/icons-material/Psychology'
import RouterIcon from '@mui/icons-material/Router'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {
  Alert,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import {useState} from 'react'

export const HealthLab = () => {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)

  const tasks = [
    {
      issue: 'Синдром «сухого глаза»',
      fix: 'Каждые 25 минут делать упражнения для глаз и чаще моргать',
      source: 'Схема 3',
    },
    {
      issue: 'Искривление позвоночника',
      fix: 'Соблюдать прямую осанку и делать разминочные упражнения',
      source: 'Схема 2',
    },
    {
      issue: 'Бессонница и депрессия',
      fix: 'Составить график работы за компьютером и придерживаться его',
      source: 'Схема 5',
    },
  ]
  return (
    <Box sx={{py: 4}}>
      <Typography
        variant='h4'
        sx={{
          mb: 5,
          fontWeight: 900,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          textTransform: 'uppercase',
        }}>
        <HealthAndSafetyIcon sx={{fontSize: 40, color: '#f44336'}} />
        <Box component='span' sx={{color: '#fff'}}>
          Безопасная
        </Box>
        <Box component='span' sx={{color: '#f44336'}}>
          Работа
        </Box>
      </Typography>

      <Grid container spacing={3}>
        {/* ФАКТОР 1: ОПОРНО-ДВИГАТЕЛЬНЫЙ АППАРАТ */}
        <Grid size={{xs: 12, md: 6}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 4,
            }}>
            <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 2}}>
              <AccessibilityNewIcon sx={{color: '#ff9800'}} />
              <Typography variant='h6' sx={{color: '#fff'}}>
                Осанка и позвоночник
              </Typography>
            </Stack>
            <Typography variant='body2' sx={{color: '#8b949e', mb: 2}}>
              Длительное сидячее положение приводит к искривлению позвоночника и
              деформации межпозвоночных дисков.
            </Typography>
            <Alert
              severity='warning'
              sx={{
                bgcolor: '#0d1117',
                color: '#ffb74d',
                border: '1px solid #30363d',
              }}>
              <b>Профилактика:</b> Держите спину прямой, делайте разминку и
              ведите активный образ жизни.
            </Alert>
          </Paper>
        </Grid>

        {/* ФАКТОР 2: ЗРЕНИЕ */}
        <Grid size={{xs: 12, md: 6}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 4,
            }}>
            <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 2}}>
              <VisibilityIcon sx={{color: '#00bcd4'}} />
              <Typography variant='h6' sx={{color: '#fff'}}>
                Влияние на зрение
              </Typography>
            </Stack>
            <Typography variant='body2' sx={{color: '#8b949e', mb: 2}}>
              Возникает «синдром сухого глаза», теряется четкость изображения и
              развивается близорукость.
            </Typography>
            <Alert
              severity='info'
              sx={{
                bgcolor: '#0d1117',
                color: '#4fc3f7',
                border: '1px solid #30363d',
              }}>
              <b>Совет:</b> Расстояние до монитора — 60-70 см. Каждые 25 минут
              делайте упражнения для глаз.
            </Alert>
          </Paper>
        </Grid>

        {/* ФАКТОР 3: ЭЛЕКТРОМАГНИТНОЕ ИЗЛУЧЕНИЕ */}
        <Grid size={{xs: 12, md: 6}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 4,
            }}>
            <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 2}}>
              <RouterIcon sx={{color: '#f44336'}} />
              <Typography variant='h6' sx={{color: '#fff'}}>
                Излучение и кровь
              </Typography>
            </Stack>
            <Typography variant='body2' sx={{color: '#8b949e', mb: 2}}>
              Электромагнитные лучи могут влиять на нервную систему, сердце и
              изменять состав крови.
            </Typography>
            <Alert
              severity='error'
              sx={{
                bgcolor: '#0d1117',
                color: '#e57373',
                border: '1px solid #30363d',
              }}>
              <b>Важно:</b> Используйте современные ЖК-мониторы и выключайте
              компьютер после работы.
            </Alert>
          </Paper>
        </Grid>

        {/* ФАКТОР 4: ПСИХИКА И ЗАВИСИМОСТЬ */}
        <Grid size={{xs: 12, md: 6}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 4,
            }}>
            <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 2}}>
              <PsychologyIcon sx={{color: '#9c27b0'}} />
              <Typography variant='h6' sx={{color: '#fff'}}>
                Психика и сон
              </Typography>
            </Stack>
            <Typography variant='body2' sx={{color: '#8b949e', mb: 2}}>
              Длительное пребывание в сети ведет к интернет-зависимости,
              депрессии, бессоннице и головным болям.
            </Typography>
            <Alert
              severity='info'
              sx={{
                bgcolor: '#0d1117',
                color: '#ba68c8',
                border: '1px solid #30363d',
              }}>
              <b>Решение:</b> Составьте график работы за ПК и не используйте
              интернет без необходимости.
            </Alert>
          </Paper>
        </Grid>
      </Grid>

      {/* Интерактивный чек-лист самопроверки */}
      <Box sx={{mt: 5}}>
        <Typography
          variant='h5'
          sx={{color: '#fff', mb: 3, textAlign: 'center'}}>
          Чек-лист правильного рабочего места
        </Typography>
        <Paper
          sx={{
            bgcolor: '#0d1117',
            border: '1px solid #30363d',
            borderRadius: 4,
            p: 2,
          }}>
          <List>
            {[
              'Верхняя точка монитора на уровне глаз',
              'Хорошее освещение комнаты',
              'Расслабленные мышцы шеи и спины',
              'Частое моргание во время работы',
            ].map((text, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <HealthAndSafetyIcon sx={{color: '#2dd4bf'}} />
                </ListItemIcon>
                <ListItemText primary={text} sx={{color: '#8b949e'}} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <Paper
        sx={{
          p: 4,
          mt: 4,
          bgcolor: '#0d1117',
          border: '2px solid #2dd4bf',
          borderRadius: 4,
        }}>
        <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 3}}>
          <TaskAltIcon sx={{color: '#2dd4bf'}} />
          <Typography variant='h6' sx={{color: '#fff'}}>
            Интерактив: Лаборатория профилактики
          </Typography>
        </Stack>

        <Typography variant='body2' sx={{color: '#8b949e', mb: 3}}>
          Выберите проблему, чтобы узнать, как её предотвратить согласно
          правилам ТБ:
        </Typography>

        <Grid container spacing={2}>
          {tasks.map((task) => (
            <Grid size={{xs: 12, sm: 4}} key={task.issue}>
              <Button
                fullWidth
                variant={
                  selectedIssue === task.issue ? 'contained' : 'outlined'
                }
                onClick={() => setSelectedIssue(task.issue)}
                sx={{
                  py: 1.5,
                  borderColor: '#30363d',
                  color: selectedIssue === task.issue ? '#fff' : '#8b949e',
                  bgcolor:
                    selectedIssue === task.issue ? '#2dd4bf' : 'transparent',
                  '&:hover': {bgcolor: '#2dd4bf', color: '#fff'},
                }}>
                {task.issue}
              </Button>
            </Grid>
          ))}
        </Grid>

        {selectedIssue && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              bgcolor: '#161b22',
              borderRadius: 2,
              borderLeft: '4px solid #2dd4bf',
            }}>
            <Typography
              variant='subtitle1'
              sx={{color: '#fff', fontWeight: 'bold', mb: 1}}>
              ✅ Решение:
            </Typography>
            <Typography variant='body1' sx={{color: '#2dd4bf'}}>
              {tasks.find((t) => t.issue === selectedIssue)?.fix}
            </Typography>
            <Typography
              variant='caption'
              sx={{color: '#8b949e', mt: 1, display: 'block'}}>
              Источник: {tasks.find((t) => t.issue === selectedIssue)?.source}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  )
}
