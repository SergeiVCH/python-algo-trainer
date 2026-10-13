import BugReportIcon from '@mui/icons-material/BugReport'
import CopyrightIcon from '@mui/icons-material/Copyright'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import SecurityIcon from '@mui/icons-material/Security'
import {
  Alert,
  Box,
  Button,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import {List} from 'lucide-react'
import {useState} from 'react'

export const SecurityLab = () => {
  const [tab, setTab] = useState(0)

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
        <SecurityIcon sx={{fontSize: 40, color: '#4caf50'}} />
        <Box component='span' sx={{color: '#fff'}}>
          Безопасность
        </Box>
        <Box component='span' sx={{color: '#4caf50'}}>
          в сети
        </Box>
      </Typography>

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        centered
        sx={{
          mb: 4,
          '& .MuiTab-root': {color: '#8b949e'},
          '& .Mui-selected': {color: '#4caf50'},
        }}>
        <Tab label='Виды угроз' icon={<BugReportIcon />} />
        <Tab label='Цифровая культура' icon={<FingerprintIcon />} />
      </Tabs>

      {/* ТАБ 1: КЛАССИФИКАЦИЯ УГРОЗ */}
      {tab === 0 && (
        <Grid container spacing={3}>
          <Grid size={{xs: 12, md: 6}}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#161b22',
                border: '1px solid #30363d',
                height: '100%',
                borderRadius: 4,
              }}>
              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                sx={{mb: 2}}>
                <BugReportIcon sx={{color: '#f44336'}} />
                <Typography variant='h6' sx={{color: '#fff'}}>
                  Технические угрозы
                </Typography>
              </Stack>
              <Typography variant='body2' sx={{color: '#8b949e', mb: 2}}>
                Повреждают ПО, крадут персональные данные и нарушают
                конфиденциальность.
              </Typography>
              <Alert
                severity='error'
                sx={{
                  bgcolor: '#0d1117',
                  color: '#f85149',
                  border: '1px solid #f85149',
                }}>
                <b>Как защититься:</b> Регулярно обновляйте ОС и антивирусы, не
                делитесь паролями.
              </Alert>
            </Paper>
          </Grid>

          <Grid size={{xs: 12, md: 6}}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#161b22',
                border: '1px solid #30363d',
                height: '100%',
                borderRadius: 4,
              }}>
              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                sx={{mb: 2}}>
                <RecordVoiceOverIcon sx={{color: '#ff9800'}} />
                <Typography variant='h6' sx={{color: '#fff'}}>
                  Социальная инженерия
                </Typography>
              </Stack>
              <Typography variant='body2' sx={{color: '#8b949e', mb: 2}}>
                Атака на пользователя, а не на машину. Использует «слабость
                человеческого фактора».
              </Typography>
              <Box sx={{p: 2, bgcolor: '#0d1117', borderRadius: 2}}>
                <Typography
                  variant='caption'
                  sx={{color: '#ff9800', display: 'block'}}>
                  🚩 <b>Фишинг:</b> Поддельные письма от банков.
                </Typography>
                <Typography
                  variant='caption'
                  sx={{color: '#ff9800', display: 'block'}}>
                  🚩 <b>Претекстинг:</b> Обман по заранее составленному
                  сценарию.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* ТАБ 2: РЕПУТАЦИЯ И ПРАВО */}
      {tab === 1 && (
        <Grid container spacing={3}>
          <Grid size={{xs: 12, md: 6}}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#161b22',
                border: '1px solid #30363d',
                borderRadius: 4,
              }}>
              <Typography
                variant='h6'
                sx={{
                  color: '#fff',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}>
                <FingerprintIcon sx={{color: '#58a6ff'}} /> Цифровая репутация
              </Typography>
              <Typography variant='body2' sx={{color: '#8b949e', mb: 2}}>
                Любая информация о вас в сети может нанести вред или принести
                пользу.
              </Typography>
              <List size='small'>
                <ListItem sx={{px: 0}}>
                  <ListItemText
                    primary='Ограничьте доступ к профилю'
                    sx={{color: '#fff'}}
                  />
                </ListItem>
                <ListItem sx={{px: 0}}>
                  <ListItemText
                    primary='Не вредите информацией другим лицам'
                    sx={{color: '#fff'}}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid size={{xs: 12, md: 6}}>
            <Paper
              sx={{
                p: 3,
                bgcolor: '#161b22',
                border: '1px solid #30363d',
                borderRadius: 4,
              }}>
              <Typography
                variant='h6'
                sx={{
                  color: '#fff',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}>
                <CopyrightIcon sx={{color: '#2dd4bf'}} /> Авторское право
              </Typography>
              <Typography variant='body2' sx={{color: '#8b949e', mb: 2}}>
                Результат творения разума — ваша интеллектуальная собственность.
              </Typography>
              <Alert
                severity='success'
                sx={{
                  bgcolor: '#0d1117',
                  color: '#2dd4bf',
                  border: '1px solid #238636',
                }}>
                <b>Правило:</b> Всегда указывайте автора или ссылку на ресурс
                при копировании.
              </Alert>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* ИНТЕРАКТИВНОЕ ЗАДАНИЕ */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          bgcolor: '#111',
          border: '2px dashed #4caf50',
          borderRadius: 4,
        }}>
        <Typography variant='h6' sx={{color: '#fff', mb: 2}}>
          🚀 Миссия: Защити данные
        </Typography>
        <Typography variant='body2' sx={{color: '#8b949e', mb: 2}}>
          Пришло письмо: «Срочно подтвердите пароль от банка, иначе счет
          заблокируют». Ваши действия?
        </Typography>
        <Stack direction='row' spacing={2}>
          <Button variant='outlined' color='error' fullWidth>
            Ввести пароль
          </Button>
          <Button variant='contained' color='success' fullWidth>
            Игнорировать и пожаловаться на спам
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}
