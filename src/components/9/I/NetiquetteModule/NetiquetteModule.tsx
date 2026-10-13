import CheckIcon from '@mui/icons-material/Check'
import ReplayIcon from '@mui/icons-material/Replay'
import ShieldIcon from '@mui/icons-material/Shield'
import WarningIcon from '@mui/icons-material/Warning'
import {
  Box,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// --- ДАННЫЕ И ТИПЫ ---
const rawData = [
  {
    text: 'Привет! Поможешь разобраться с методами списков в Python?',
    type: 'SAFE',
  },
  {text: 'ТЫ ПРОСТО НУБ И КОД ТВОЙ УЖАСЕН!!!!!', type: 'TOXIC'},
  {
    text: 'СРОЧНО!! ТВОЙ АККАУНТ ВЗЛОМАН, ЖМИ ССЫЛКУ: bit.ly/hack-me',
    type: 'SPAM',
  },
  {text: 'Спасибо, отличная шпаргалка по массивам!', type: 'SAFE'},
  {text: 'Удали это и не позорься, ламер.', type: 'TOXIC'},
  {text: 'БЕСПЛАТНЫЕ ОЧКИ ОПЫТА ТОЛЬКО СЕГОДНЯ ТУТ —>>>', type: 'SPAM'},
  {text: 'Ребята, давайте общаться вежливее в общем чате.', type: 'SAFE'},
]

export const NetiquetteModule = () => {
  const [messages, setMessages] = useState<any[]>([])
  const [score, setScore] = useState(0)
  const [health, setHealth] = useState(100)
  const [isGameOver, setIsGameOver] = useState(false)

  const topic = {
    title: 'СЕТЕВОЙ ПАТРУЛЬ',
    desc: 'Система автоматической фильтрации трафика INFOSCHOOLv2',
    color: '#ff9800',
  }

  // Генерация сообщений
  useEffect(() => {
    if (isGameOver) return

    const interval = setInterval(() => {
      const randomMsg = rawData[Math.floor(Math.random() * rawData.length)]
      const newMsg = {...randomMsg, id: Date.now()}

      setMessages((prev) => {
        if (prev.length > 4) {
          // Если очередь переполнена
          setHealth((h) => Math.max(0, h - 15))
          return prev.slice(1) // Удаляем старое, чтобы освободить место
        }
        return [...prev, newMsg]
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [isGameOver])

  // Проверка на проигрыш
  useEffect(() => {
    if (health <= 0) setIsGameOver(true)
  }, [health])

  // Обработка клика
  const handleAction = (
    id: number,
    type: string,
    action: 'allow' | 'block',
  ) => {
    const isCorrect =
      (type === 'SAFE' && action === 'allow') ||
      (type !== 'SAFE' && action === 'block')

    if (isCorrect) {
      setScore((s) => s + 15)
    } else {
      setHealth((h) => Math.max(0, h - 20))
    }

    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const resetGame = () => {
    setHealth(100)
    setScore(0)
    setMessages([])
    setIsGameOver(false)
  }

  if (isGameOver) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#010409',
          color: 'white',
          p: 3,
        }}>
        <motion.div
          initial={{scale: 0.5, opacity: 0}}
          animate={{scale: 1, opacity: 1}}>
          <Typography
            variant='h2'
            sx={{
              color: '#f85149',
              fontWeight: 900,
              mb: 1,
              textAlign: 'center',
            }}>
            SYSTEM FAILURE
          </Typography>
          <Typography
            variant='h5'
            sx={{mb: 4, textAlign: 'center', color: '#8b949e'}}>
            Ваш рейтинг модерации: {score} XP
          </Typography>
          <Stack alignItems='center'>
            <Button
              variant='outlined'
              startIcon={<ReplayIcon />}
              onClick={resetGame}
              sx={{
                borderColor: '#30363d',
                color: '#ffffff',
                px: 4,
                py: 1.5,
                borderRadius: '12px',
                '&:hover': {borderColor: topic.color},
              }}>
              ПЕРЕЗАГРУЗИТЬ МОДУЛЬ
            </Button>
          </Stack>
        </motion.div>
      </Box>
    )
  }

  return (
    <Box sx={{p: 4, bgcolor: '#010409', minHeight: '100vh', color: '#e6edf3'}}>
      {/* 1. ЗАГОЛОВОК */}
      <Stack alignItems='center' sx={{mb: 6, textAlign: 'center'}}>
        <motion.div
          initial={{y: -30, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{duration: 0.6}}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mb: 1,
            }}>
            <ShieldIcon sx={{fontSize: 40, color: topic.color}} />
            <Typography
              variant='h4'
              sx={{
                fontWeight: 900,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: 4,
              }}>
              {topic.title}
            </Typography>
          </Box>
          <Typography
            variant='caption'
            sx={{color: '#8b949e', letterSpacing: 2}}>
            {topic.desc}
          </Typography>
        </motion.div>
      </Stack>

      <Container maxWidth='md'>
        {/* 2. СТАТУС-ПАНЕЛЬ */}
        <Stack direction='row' spacing={4} sx={{mb: 4, alignItems: 'center'}}>
          <Box sx={{flexGrow: 1}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
              <Typography variant='overline' sx={{color: '#8b949e'}}>
                ЦЕЛОСТНОСТЬ БРАНДМАУЭРА
              </Typography>
              <Typography
                variant='overline'
                sx={{color: health > 30 ? '#3fb950' : '#f85149'}}>
                {health}%
              </Typography>
            </Box>
            <LinearProgress
              variant='determinate'
              value={health}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: '#30363d',
                '& .MuiLinearProgress-bar': {
                  bgcolor: health > 30 ? '#3fb950' : '#f85149',
                },
              }}
            />
          </Box>
          <Box sx={{textAlign: 'right', minWidth: '100px'}}>
            <Typography variant='h4' sx={{color: topic.color, fontWeight: 900}}>
              {score}
            </Typography>
            <Typography variant='caption' sx={{color: '#8b949e'}}>
              RATING XP
            </Typography>
          </Box>
        </Stack>

        {/* 3. ИГРОВАЯ ЗОНА */}
        <Box
          sx={{
            position: 'relative',
            height: '500px',
            border: '1px solid #30363d',
            borderRadius: '24px',
            p: 3,
            bgcolor: '#0d1117',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            overflow: 'hidden',
          }}>
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{opacity: 0, x: -50, scale: 0.9}}
                animate={{opacity: 1, x: 0, scale: 1}}
                exit={{opacity: 0, scale: 0.5, transition: {duration: 0.2}}}
                layout>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: '#161b22',
                    border: '1px solid #30363d',
                    borderRadius: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    '&:hover': {borderColor: '#58a6ff'},
                  }}>
                  <Typography sx={{color: '#e6edf3', fontWeight: 500}}>
                    {msg.text}
                  </Typography>
                  <Stack direction='row' spacing={1} sx={{ml: 2}}>
                    <IconButton
                      onClick={() => handleAction(msg.id, msg.type, 'allow')}
                      sx={{
                        color: '#3fb950',
                        bgcolor: 'rgba(63, 185, 80, 0.1)',
                        '&:hover': {bgcolor: 'rgba(63, 185, 80, 0.2)'},
                      }}>
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleAction(msg.id, msg.type, 'block')}
                      sx={{
                        color: '#f85149',
                        bgcolor: 'rgba(248, 81, 73, 0.1)',
                        '&:hover': {bgcolor: 'rgba(248, 81, 73, 0.2)'},
                      }}>
                      <WarningIcon />
                    </IconButton>
                  </Stack>
                </Paper>
              </motion.div>
            ))}
          </AnimatePresence>

          {messages.length === 0 && (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Typography
                sx={{color: '#30363d', letterSpacing: 4, fontWeight: 700}}>
                [ МОНИТОРИНГ ТРАФИКА... ]
              </Typography>
            </Box>
          )}
        </Box>

        {/* ИНСТРУКЦИЯ */}
        <Typography
          variant='caption'
          sx={{
            mt: 3,
            display: 'block',
            color: '#8b949e',
            textAlign: 'center',
            lineHeight: 1.6,
          }}>
          ИНСТРУКЦИЯ: Пропускайте вежливые сообщения. Блокируйте спам, капс и
          агрессию. <br />
          Переполнение очереди (более 5 сообщений) или ошибки снижают
          целостность системы.
        </Typography>
      </Container>
    </Box>
  )
}
