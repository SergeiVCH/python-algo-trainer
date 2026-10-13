import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import InfoIcon from '@mui/icons-material/Info'
import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Fade,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'

const infoProperties = [
  {
    title: 'Объективность',
    desc: 'Информация не зависит от чьего-либо мнения или желания.',
  },
  {
    title: 'Полнота',
    desc: 'Информации достаточно для понимания ситуации и принятия решения.',
  },
  {
    title: 'Актуальность',
    desc: 'Информация важна и существенна в текущий момент времени.',
  },
  {
    title: 'Полезность',
    desc: 'Информация помогает решать поставленные задачи и достигать целей.',
  },
  {
    title: 'Понятность',
    desc: 'Информация выражена на языке, доступном для того, кому она предназначена.',
  },
  {
    title: 'Достоверность',
    desc: 'Информация отражает истинное положение дел без искажений.',
  },
]

export const InfoPropertiesLab = () => {
  const [selected, setSelected] = useState(infoProperties[0])

  return (
    <Box sx={{p: 4, minHeight: '100vh', color: '#e6edf3'}}>
      {/* 1. ЗАГОЛОВОК: ВЫНЕСЕН ЗА ПРЕДЕЛЫ И ПО ЦЕНТРУ */}
      <Typography
        variant='h5'
        sx={{
          mb: 5,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // Центрирование по горизонтали
          gap: 1.5,
          textAlign: 'center',
        }}>
        <InfoIcon sx={{color: '#58a6ff'}} /> Свойства информации
      </Typography>

      {/* 2. ОСНОВНОЙ КОНТЕЙНЕР (БОКС) */}
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          p: 4,
          bgcolor: '#010409',
          border: '1px solid #30363d',
          borderRadius: 4,
        }}>
        <Grid container spacing={4}>
          {/* ЛЕВО: Меню */}
          <Grid size={{xs: 12, md: 4}}>
            <Stack spacing={2}>
              {infoProperties.map((prop) => (
                <Card
                  key={prop.title}
                  sx={{
                    bgcolor:
                      selected.title === prop.title ? '#161b22' : 'transparent',
                    border: '1px solid',
                    borderColor:
                      selected.title === prop.title ? '#58a6ff' : '#30363d',
                    backgroundImage: 'none',
                  }}>
                  <CardActionArea onClick={() => setSelected(prop)} sx={{p: 2}}>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        color:
                          selected.title === prop.title ? '#58a6ff' : '#8b949e',
                        fontWeight:
                          selected.title === prop.title ? 'bold' : 'normal',
                      }}>
                      {prop.title}
                    </Typography>
                  </CardActionArea>
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* ПРАВО: Описание */}
          <Grid size={{xs: 12, md: 8}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              {/* Название выбранного свойства вне рамки описания */}
              <Typography
                variant='overline'
                sx={{color: '#8b949e', letterSpacing: 2}}>
                Выбрано свойство
              </Typography>
              <Typography
                variant='h3'
                sx={{mb: 3, fontWeight: 'bold', color: '#58a6ff'}}>
                {selected.title}
              </Typography>

              {/* ОГРАНИЧЕННАЯ КАРТОЧКА (без height: 100%) */}
              <Paper
                sx={{
                  p: 4,
                  bgcolor: '#010409',
                  border: '1px solid #30363d',
                  borderRadius: 3,
                  color: '#e6edf3',
                  alignSelf: 'flex-start', // Важно: карточка не тянется вниз
                  width: '100%',
                  maxWidth: '650px',
                }}>
                <Fade in={true} key={selected.title}>
                  <Box>
                    <Box
                      sx={{display: 'flex', gap: 2, alignItems: 'flex-start'}}>
                      <CheckCircleOutlineIcon
                        sx={{color: '#3fb950', fontSize: 32, mt: 0.5}}
                      />
                      <Typography
                        variant='h5'
                        sx={{fontWeight: 300, lineHeight: 1.4}}>
                        {selected.desc}
                      </Typography>
                    </Box>
                    <Divider sx={{my: 3, bgcolor: '#30363d'}} />
                    <Typography variant='body2' sx={{color: '#8b949e'}}>
                      Раздел: Теоретические основы информатики
                    </Typography>
                  </Box>
                </Fade>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
