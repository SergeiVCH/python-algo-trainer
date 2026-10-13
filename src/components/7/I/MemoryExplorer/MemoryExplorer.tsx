import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import {useState} from 'react'
// Иконки
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloudIcon from '@mui/icons-material/Cloud'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SpeedIcon from '@mui/icons-material/Speed'

const MEMORY_TYPES = {
  internal: {
    title: 'Внутренняя память',
    color: '#2196f3',
    subtitle: 'Энергозависимая и очень быстрая',
    items: [
      {
        name: 'Регистры',
        desc: 'Находятся прямо в процессоре. Самая быстрая память в мире.',
      },
      {name: 'Кэш (L1, L2, L3)', desc: 'Буфер между процессором и ОЗУ.'},
      {
        name: 'ОЗУ (RAM)',
        desc: 'Оперативная память. Здесь хранятся запущенные программы.',
      },
      {name: 'ПЗУ (ROM)', desc: 'Хранит инструкции для загрузки (BIOS/UEFI).'},
    ],
  },
  external: {
    title: 'Внешняя память',
    color: '#4caf50',
    subtitle: 'Долговременная и объемная',
    items: [
      {name: 'SSD / HDD', desc: 'Основные накопители для файлов и ОС.'},
      {name: 'Flash-накопители', desc: 'USB-флешки и SD-карты.'},
      {name: 'Оптические диски', desc: 'CD, DVD, Blu-Ray.'},
      {name: 'Облако', desc: 'Удаленные сервера (Google Drive, iCloud).'},
    ],
  },
}

const EXTENDED_QUIZ = [
  {
    id: 1,
    name: 'Регистры процессора',
    type: 'internal',
    hint: 'Это часть самого "мозга" компьютера',
  },
  {
    id: 2,
    name: 'Внешний SSD',
    type: 'external',
    hint: 'Подключается через USB',
  },
  {
    id: 3,
    name: 'Чип BIOS',
    type: 'internal',
    hint: 'Постоянная память на материнской плате',
  },
  {
    id: 4,
    name: 'Google Диск',
    type: 'external',
    hint: 'Хранится на сервере в интернете',
  },
  {
    id: 5,
    name: 'Кэш-память L2',
    type: 'internal',
    hint: 'Ускоряет работу процессора',
  },
  {
    id: 6,
    name: 'Магнитная лента',
    type: 'external',
    hint: 'Используется для архивов в дата-центрах',
  },
]

export const MemoryExplorer = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [finished, setFinished] = useState(false)
  const themeColor = '#2196f3'

  const score = Object.keys(answers).filter(
    (id) =>
      answers[Number(id)] ===
      EXTENDED_QUIZ.find((q) => q.id === Number(id))?.type,
  ).length

  return (
    <Box sx={{p: 4, bgcolor: '#010409', minHeight: '100vh', color: '#e6edf3'}}>
      <Container maxWidth='lg'>
        {/* Заголовок в фирменном стиле */}
        <Box sx={{textAlign: 'center', mb: 8}}>
          <Typography
            variant='h2'
            sx={{
              fontWeight: 900,
              color: themeColor,
              textTransform: 'uppercase',
              letterSpacing: 4,
              textShadow: `0 0 30px ${themeColor}60`,
              mb: 1,
            }}>
            Memory Master
          </Typography>
          <Typography
            variant='h6'
            sx={{color: '#8b949e', maxWidth: '600px', mx: 'auto'}}>
            От регистров до облаков: изучи полную иерархию компьютерной памяти
          </Typography>
        </Box>

        {/* Сравнение Видов */}
        <Grid container spacing={4} sx={{mb: 10}}>
          {Object.entries(MEMORY_TYPES).map(([key, group]) => (
            <Grid size={{xs: 12, md: 6}} key={key}>
              <Paper
                sx={{
                  p: 0,
                  bgcolor: '#0d1117',
                  border: `1px solid ${group.color}30`,
                  borderRadius: '24px',
                  overflow: 'hidden',
                }}>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: `${group.color}10`,
                    borderBottom: `1px solid ${group.color}30`,
                  }}>
                  <Stack direction='row' spacing={2} alignItems='center'>
                    {key === 'internal' ? (
                      <SpeedIcon sx={{color: group.color}} />
                    ) : (
                      <CloudIcon sx={{color: group.color}} />
                    )}
                    <Box>
                      <Typography
                        variant='h5'
                        sx={{color: group.color, fontWeight: 800}}>
                        {group.title}
                      </Typography>
                      <Typography variant='caption' sx={{color: '#8b949e'}}>
                        {group.subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box sx={{p: 3}}>
                  <Stack spacing={2}>
                    {group.items.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 2,
                          bgcolor: '#161b22',
                          borderRadius: '12px',
                          border: '1px solid #30363d',
                          transition: '0.2s',
                          '&:hover': {bgcolor: '#1c2128'},
                        }}>
                        <Typography
                          variant='subtitle1'
                          sx={{color: group.color, fontWeight: 700, mb: 0.5}}>
                          {item.name}
                        </Typography>
                        <Typography variant='body2' sx={{color: '#8b949e'}}>
                          {item.desc}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Квиз: Битва за память */}
        <Paper
          sx={{
            p: {xs: 3, md: 6},
            bgcolor: '#0d1117',
            borderRadius: '40px',
            border: '1px solid #30363d',
            position: 'relative',
          }}>
          <Typography
            variant='h4'
            sx={{textAlign: 'center', fontWeight: 900, mb: 2}}>
            🏁 Сортировщик 2.0
          </Typography>
          <Typography
            variant='body1'
            sx={{textAlign: 'center', color: '#8b949e', mb: 6}}>
            Сможешь классифицировать все виды памяти без ошибок?
          </Typography>

          <Grid container spacing={2}>
            {EXTENDED_QUIZ.map((item) => (
              <Grid size={{xs: 12}} key={item.id}>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: '#161b22',
                    borderRadius: '16px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}>
                  <Stack direction='row' spacing={2} alignItems='center'>
                    <Tooltip title={item.hint} arrow placement='left'>
                      <HelpOutlineIcon
                        sx={{color: '#30363d', cursor: 'help'}}
                      />
                    </Tooltip>
                    <Typography sx={{fontWeight: 600}}>{item.name}</Typography>
                  </Stack>

                  <Stack direction='row' spacing={1}>
                    <Button
                      variant={
                        answers[item.id] === 'internal'
                          ? 'contained'
                          : 'outlined'
                      }
                      onClick={() =>
                        setAnswers((prev) => ({...prev, [item.id]: 'internal'}))
                      }
                      sx={{
                        borderRadius: '10px',
                        color:
                          answers[item.id] === 'internal' ? '#fff' : '#2196f3',
                      }}>
                      Внутренняя
                    </Button>
                    <Button
                      variant={
                        answers[item.id] === 'external'
                          ? 'contained'
                          : 'outlined'
                      }
                      color='success'
                      onClick={() =>
                        setAnswers((prev) => ({...prev, [item.id]: 'external'}))
                      }
                      sx={{
                        borderRadius: '10px',
                        color:
                          answers[item.id] === 'external' ? '#fff' : '#4caf50',
                      }}>
                      Внешняя
                    </Button>
                    {finished && (
                      <Box sx={{display: 'flex', alignItems: 'center', ml: 1}}>
                        {answers[item.id] === item.type ? (
                          <CheckCircleIcon color='success' />
                        ) : (
                          <Box sx={{color: '#f44336', fontWeight: 900}}>✕</Box>
                        )}
                      </Box>
                    )}
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{textAlign: 'center', mt: 6}}>
            {!finished ? (
              <Button
                variant='contained'
                disabled={Object.keys(answers).length < EXTENDED_QUIZ.length}
                onClick={() => setFinished(true)}
                sx={{
                  bgcolor: themeColor,
                  px: 8,
                  py: 2,
                  borderRadius: '15px',
                  fontWeight: 800,
                }}>
                Проверить всё
              </Button>
            ) : (
              <Stack alignItems='center' spacing={2}>
                <Typography
                  variant='h5'
                  sx={{
                    color:
                      score === EXTENDED_QUIZ.length ? '#4caf50' : '#ff9800',
                  }}>
                  Твой результат: {score} из {EXTENDED_QUIZ.length}
                </Typography>
                <Button
                  onClick={() => {
                    setAnswers({})
                    setFinished(false)
                  }}
                  sx={{color: '#8b949e'}}>
                  Попробовать снова
                </Button>
              </Stack>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
