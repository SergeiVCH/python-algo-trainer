import {
  Alert,
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Fade,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Slide,
  Snackbar,
  Toolbar,
  Typography
} from '@mui/material'
import { useState } from 'react'

// Иконки
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import FolderIcon from '@mui/icons-material/Folder'
import GppBadIcon from '@mui/icons-material/GppBad'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import SearchIcon from '@mui/icons-material/Search'
import ShieldIcon from '@mui/icons-material/Shield'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

export const RealLifeDefense = () => {
  const [screen, setScreen] = useState<
    'desktop' | 'files' | 'tasks' | 'quarantine'
  >('desktop')
  const [isAttackActive, setIsAttackActive] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [notification, setNotification] = useState<{
    open: boolean
    msg: string
    severity: 'error' | 'success' | 'warning' | 'info'
  }>({open: false, msg: '', severity: 'info'})

  const [files, setFiles] = useState([
    {id: 1, name: 'diploma_final.docx', status: 'clean'},
    {id: 2, name: 'summer_trip_2025.jpg', status: 'clean'},
    {id: 3, name: 'minecraft_cheats.exe', status: 'source'},
    {id: 4, name: 'presentation.pptx', status: 'clean'},
  ])

  const [quarantine, setQuarantine] = useState<any[]>([])

  // Логика атаки
  const runAttack = () => {
    setIsAttackActive(true)
    setNotification({
      open: true,
      msg: 'ОБНАРУЖЕНА УГРОЗА: Trojan.Win32.Ransom.Generic',
      severity: 'error',
    })
    setFiles((prev) =>
      prev.map((f) => (f.status !== 'source' ? {...f, status: 'infected'} : f)),
    )
  }

  // Процесс лечения (Сканирование + Очистка)
  const startHealing = () => {
    setIsScanning(true)
    setProgress(0)
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer)
          setIsScanning(false)
          finishHealing()
          return 100
        }
        return Math.min(oldProgress + 10, 100)
      })
    }, 300)
  }

  const finishHealing = () => {
    const infected = files.filter(
      (f) => f.status === 'infected' || f.status === 'source',
    )
    setQuarantine((prev) => [...prev, ...infected])
    setFiles((prev) => prev.filter((f) => f.status === 'clean'))
    setIsAttackActive(false)
    setNotification({
      open: true,
      msg: 'Система очищена. Угрозы перемещены в карантин.',
      severity: 'success',
    })
  }

  const showToolInfo = (tool: string) => {
    const messages: any = {
      detector: {
        msg: 'ДЕТЕКТОР: Сканирование сигнатур завершено. Вирусов не найдено.',
        sev: 'info',
      },
      auditor: {msg: 'РЕВИЗОР: Контрольные суммы файлов в норме.', sev: 'info'},
    }
    if (isAttackActive) {
      setNotification({
        open: true,
        msg: 'ВНИМАНИЕ: Сначала используйте ПРОГРАММУ-ДОКТОР!',
        severity: 'warning',
      })
    } else {
      setNotification({
        open: true,
        msg: messages[tool].msg,
        severity: messages[tool].sev,
      })
    }
  }

  return (
    <Container maxWidth='lg' sx={{py: 4}}>
      {/* Заголовок системы */}
      <Typography
        variant='h6'
        sx={{
          textAlign: 'center',
          fontWeight: 900,
          letterSpacing: '5px',
          color: '#00ff41',
          textTransform: 'uppercase',
          mb: 2,
        }}>
        Cyber Defense OS
      </Typography>

      <Paper
        sx={{
          height: '680px',
          bgcolor: '#121212',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '4px solid #333',
          position: 'relative',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
        }}>
        {/* Панель задач ОС */}
        <AppBar position='static' sx={{bgcolor: '#212121'}}>
          <Toolbar variant='dense' sx={{gap: 2}}>
            <Button
              color='inherit'
              onClick={() => setScreen('desktop')}
              sx={{
                fontWeight: 800,
                borderRight: '1px solid #444',
                borderRadius: 0,
                pr: 2,
              }}>
              START
            </Button>
            <IconButton color='inherit' onClick={() => setScreen('files')}>
              <FolderIcon />
            </IconButton>
            <IconButton color='inherit' onClick={() => setScreen('quarantine')}>
              <Badge badgeContent={quarantine.length} color='warning'>
                <DeleteSweepIcon />
              </Badge>
            </IconButton>
            <IconButton color='inherit' onClick={() => setScreen('tasks')}>
              <WarningAmberIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Экранная область */}
        <Box sx={{p: 4, height: '500px', overflowY: 'auto'}}>
          {screen === 'desktop' && (
            <Box sx={{textAlign: 'center', mt: 12, opacity: 0.2}}>
              <Typography variant='h1'>🖥️</Typography>
              <Typography variant='h5'>Рабочий стол</Typography>
              <Typography variant='body2'>
                Используйте панель задач для навигации
              </Typography>
            </Box>
          )}

          {screen === 'files' && (
            <Fade in>
              <Box>
                <Typography
                  variant='h6'
                  sx={{color: '#aaa', mb: 4, fontFamily: 'monospace'}}>
                  C:\Users\Student\Documents
                </Typography>
                <Grid container spacing={4}>
                  {files.map((file) => (
                    <Grid size={{xs: 6, sm: 3}} key={file.id}>
                      <Box
                        onClick={() => file.status === 'source' && runAttack()}
                        sx={{
                          textAlign: 'center',
                          cursor: 'pointer',
                          p: 2,
                          borderRadius: 2,
                          transition: '0.2s',
                          '&:hover': {bgcolor: '#222'},
                          border:
                            file.status === 'infected'
                              ? '1px solid #ff4444'
                              : '1px solid transparent',
                        }}>
                        {file.status === 'infected' ? (
                          <GppBadIcon sx={{fontSize: 60, color: '#ff4444'}} />
                        ) : (
                          <InsertDriveFileIcon
                            sx={{
                              fontSize: 60,
                              color:
                                file.status === 'source'
                                  ? '#ff9800'
                                  : '#2196f3',
                            }}
                          />
                        )}
                        <Typography
                          sx={{color: '#fff', mt: 1, fontSize: '0.8rem'}}>
                          {file.status === 'infected'
                            ? 'VIRUS_LOCKED'
                            : file.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                {files.length === 0 && (
                  <Typography sx={{color: '#555', textAlign: 'center', mt: 5}}>
                    Папка пуста
                  </Typography>
                )}
              </Box>
            </Fade>
          )}

          {screen === 'quarantine' && (
            <Fade in>
              <Box>
                <Typography variant='h6' sx={{mb: 2, color: '#ff9800'}}>
                  ☣️ Карантин антивируса
                </Typography>
                <Alert severity='warning' sx={{mb: 3}}>
                  Объекты здесь изолированы. Они не могут выполнять код.
                </Alert>
                <List>
                  {quarantine.map((f, i) => (
                    <ListItem
                      key={i}
                      sx={{bgcolor: '#222', mb: 1, borderRadius: 1}}>
                      <ListItemIcon>
                        <GppBadIcon color='error' />
                      </ListItemIcon>
                      <ListItemText
                        primary={f.name}
                        secondary='Статус: Изолирован'
                        secondaryTypographyProps={{color: '#666'}}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Fade>
          )}

          {screen === 'tasks' && (
            <Fade in>
              <Box>
                <Typography variant='h6' sx={{mb: 2}}>
                  ⚙️ Активные процессы
                </Typography>
                <Alert severity={isAttackActive ? 'error' : 'success'}>
                  {isAttackActive
                    ? 'ВНИМАНИЕ: Обнаружен процесс с подозрительной активностью!'
                    : 'Все процессы работают в штатном режиме.'}
                </Alert>
              </Box>
            </Fade>
          )}
        </Box>

        {/* Прогресс лечения */}
        {isScanning && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 80,
              width: '100%',
              px: 4,
              zIndex: 10,
            }}>
            <Paper sx={{p: 2, bgcolor: '#000', border: '1px solid #00ff41'}}>
              <Typography
                variant='caption'
                sx={{color: '#00ff41', display: 'block', mb: 1}}>
                DR.WEB_ENGINE: Лечение файловой системы... {progress}%
              </Typography>
              <LinearProgress
                variant='determinate'
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#333',
                  '& .MuiLinearProgress-bar': {bgcolor: '#00ff41'},
                }}
              />
            </Paper>
          </Box>
        )}

        {/* Инструменты защиты (Футер) */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            p: 2,
            bgcolor: '#1a1a1a',
            borderTop: '1px solid #333',
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
          }}>
          <Button
            variant='contained'
            color='success'
            disabled={!isAttackActive || isScanning}
            startIcon={<HealthAndSafetyIcon />}
            onClick={startHealing}
            sx={{fontWeight: 700}}>
            ЛЕЧИТЬ (ПРОГРАММА-ДОКТОР)
          </Button>
          <Button
            variant='outlined'
            startIcon={<ShieldIcon />}
            sx={{color: '#888', borderColor: '#444'}}
            onClick={() => showToolInfo('auditor')}>
            РЕВИЗОР
          </Button>
          <Button
            variant='outlined'
            startIcon={<SearchIcon />}
            sx={{color: '#888', borderColor: '#444'}}
            onClick={() => showToolInfo('detector')}>
            ДЕТЕКТОР
          </Button>
        </Box>

        {/* Уведомления */}
        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={() => setNotification({...notification, open: false})}
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          TransitionComponent={Slide}>
          <Alert
            severity={notification.severity}
            variant='filled'
            sx={{width: '100%'}}>
            {notification.msg}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  )
}
