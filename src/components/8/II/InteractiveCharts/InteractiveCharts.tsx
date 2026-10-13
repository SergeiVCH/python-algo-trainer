import AreaChartIcon from '@mui/icons-material/AreaChart'
import BarChartIcon from '@mui/icons-material/BarChart'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import PieChartIcon from '@mui/icons-material/PieChart'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import TableRowsIcon from '@mui/icons-material/TableRows'
import {
  Alert,
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import {useMemo, useState} from 'react'

type ChartType = 'bar' | 'horizontalBar' | 'line' | 'area' | 'pie'

interface DataPoint {
  label: string
  value: number
  color: string
}

export const InteractiveCharts = () => {
  const [chartType, setChartType] = useState<ChartType>('bar')
  const [data, setData] = useState<DataPoint[]>([
    {label: 'Янв', value: 45, color: '#2196f3'},
    {label: 'Фев', value: 30, color: '#4caf50'},
    {label: 'Мар', value: 85, color: '#ff9800'},
    {label: 'Апр', value: 50, color: '#f44336'},
  ])

  const PLAN_LEVEL = 60

  const handleValueChange = (index: number, newValue: string) => {
    const val = Math.max(0, Math.min(100, Number(newValue) || 0))
    const newData = [...data]
    newData[index].value = val
    setData(newData)
  }

  const isGoalReached = useMemo(
    () => data.every((d) => d.value >= PLAN_LEVEL),
    [data],
  )

  // Расчет градиента для кольцевой диаграммы
  const pieGradient = useMemo(() => {
    const total = data.reduce((acc, d) => acc + d.value, 0)
    let currentPerc = 0
    return data
      .map((d) => {
        const perc = (d.value / total) * 100
        const start = currentPerc
        currentPerc += perc
        return `${d.color} ${start}% ${currentPerc}%`
      })
      .join(', ')
  }, [data])

  return (
    <Container maxWidth='lg' sx={{py: 4}}>
      {/* Центрированный двухцветный заголовок */}
      <Typography
        variant='h4' // Увеличил размер для солидности
        sx={{
          mb: 5,
          fontWeight: 900,
          textAlign: 'center', // Центрирование текста
          display: 'flex',
          justifyContent: 'center', // Центрирование контента внутри flex
          alignItems: 'center',
          gap: 2,
          textTransform: 'uppercase', // Делаем заголовок более строгим
          letterSpacing: '1px',
        }}>
        <BarChartIcon sx={{fontSize: 40, color: '#2dd4bf'}} />
        <Box component='span' sx={{color: '#fff'}}>
          Интерактивная
        </Box>
        <Box component='span' sx={{color: '#2dd4bf'}}>
          Визуализация
        </Box>
      </Typography>

      <Grid container spacing={4}>
        {/* ЛЕВАЯ ПАНЕЛЬ: ВВОД ДАННЫХ */}
        <Grid size={{xs: 12, md: 4}}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              color: '#fff',
            }}>
            <Typography
              variant='subtitle1'
              sx={{mb: 3, fontWeight: 700, color: '#8b949e'}}>
              Параметры системы (%)
            </Typography>
            <Stack spacing={2}>
              {data.map((item, index) => (
                <Box
                  key={item.label}
                  sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                  <Typography sx={{width: 45, fontWeight: 'bold'}}>
                    {item.label}
                  </Typography>
                  <TextField
                    size='small'
                    type='number'
                    value={item.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    sx={{
                      bgcolor: '#0d1117',
                      borderRadius: 1,
                      '& .MuiInputBase-input': {color: '#fff'},
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#30363d',
                      },
                    }}
                  />
                </Box>
              ))}
            </Stack>

            <Alert
              severity='info'
              sx={{
                mt: 4,
                bgcolor: '#0d1117',
                color: '#58a6ff',
                border: '1px solid #388bfd33',
              }}
              icon={<LightbulbIcon />}>
              Попробуйте разные типы диаграмм в меню справа.
            </Alert>
          </Paper>
        </Grid>

        {/* ПРАВАЯ ПАНЕЛЬ: ДИАГРАММА */}
        <Grid size={{xs: 12, md: 8}}>
          <Paper
            sx={{
              p: 4,
              height: '100%',
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 6,
                flexWrap: 'wrap',
                gap: 2,
              }}>
              <Typography variant='h6' sx={{color: '#fff'}}>
                Результат анализа
              </Typography>

              <FormControl
                size='small'
                sx={{minWidth: 200, bgcolor: '#0d1117', borderRadius: 1}}>
                <InputLabel sx={{color: '#8b949e'}}>Тип диаграммы</InputLabel>
                <Select
                  value={chartType}
                  label='Тип диаграммы'
                  onChange={(e) => setChartType(e.target.value as ChartType)}
                  sx={{color: '#fff', '.MuiSvgIcon-root': {color: '#8b949e'}}}>
                  <MenuItem value='bar'>
                    <BarChartIcon sx={{mr: 1, fontSize: 18}} /> Гистограмма
                  </MenuItem>
                  <MenuItem value='horizontalBar'>
                    <TableRowsIcon sx={{mr: 1, fontSize: 18}} /> Линейчатая
                  </MenuItem>
                  <MenuItem value='line'>
                    <ShowChartIcon sx={{mr: 1, fontSize: 18}} /> График
                  </MenuItem>
                  <MenuItem value='area'>
                    <AreaChartIcon sx={{mr: 1, fontSize: 18}} /> Область
                  </MenuItem>
                  <MenuItem value='pie'>
                    <PieChartIcon sx={{mr: 1, fontSize: 18}} /> Кольцевая
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box
              sx={{
                width: '100%',
                height: '300px',
                position: 'relative',
                display: 'flex',
                alignItems:
                  chartType === 'horizontalBar' ? 'stretch' : 'flex-end',
                flexDirection: chartType === 'horizontalBar' ? 'column' : 'row',
                justifyContent: 'space-around',
                px: 2,
                borderBottom:
                  chartType === 'pie' ? 'none' : '2px solid #30363d',
              }}>
              {/* Линия плана (скрыта для круговой) */}
              {chartType !== 'pie' && (
                <Box
                  sx={{
                    position: 'absolute',
                    [chartType === 'horizontalBar' ? 'left' : 'bottom']:
                      `${PLAN_LEVEL}%`,
                    top: chartType === 'horizontalBar' ? 0 : 'auto',
                    bottom:
                      chartType === 'horizontalBar' ? 0 : `${PLAN_LEVEL}%`,
                    right: chartType === 'horizontalBar' ? 'auto' : 0,
                    width: chartType === 'horizontalBar' ? '0px' : '100%',
                    height: chartType === 'horizontalBar' ? '100%' : '0px',
                    borderLeft:
                      chartType === 'horizontalBar'
                        ? '2px dashed #f85149'
                        : 'none',
                    borderTop:
                      chartType === 'horizontalBar'
                        ? 'none'
                        : '2px dashed #f85149',
                    zIndex: 1,
                    opacity: 0.6,
                  }}>
                  <Typography
                    variant='caption'
                    sx={{
                      position: 'absolute',
                      right: chartType === 'horizontalBar' ? -60 : 0,
                      top: -20,
                      color: '#f85149',
                      fontWeight: 'bold',
                    }}>
                    ПЛАН {PLAN_LEVEL}%
                  </Typography>
                </Box>
              )}

              {/* Вертикальная Гистограмма */}
              {chartType === 'bar' &&
                data.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      flex: 1,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <Tooltip title={`${item.value}%`} arrow>
                      <Box
                        sx={{
                          width: '60%',
                          height: `${item.value}%`,
                          bgcolor:
                            item.value >= PLAN_LEVEL ? item.color : '#30363d',
                          borderRadius: '4px 4px 0 0',
                          transition: 'height 0.4s ease',
                        }}
                      />
                    </Tooltip>
                    <Typography
                      variant='caption'
                      sx={{
                        mt: 1,
                        color: '#8b949e',
                        position: 'absolute',
                        bottom: -25,
                      }}>
                      {item.label}
                    </Typography>
                  </Box>
                ))}

              {/* Горизонтальная Линейчатая */}
              {chartType === 'horizontalBar' &&
                data.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}>
                    <Typography
                      variant='caption'
                      sx={{width: 40, color: '#8b949e'}}>
                      {item.label}
                    </Typography>
                    <Tooltip title={`${item.value}%`} arrow>
                      <Box
                        sx={{
                          height: '60%',
                          width: `${item.value}%`,
                          bgcolor:
                            item.value >= PLAN_LEVEL ? item.color : '#30363d',
                          borderRadius: '0 4px 4px 0',
                          transition: 'width 0.4s ease',
                        }}
                      />
                    </Tooltip>
                  </Box>
                ))}

              {/* Кольцевая диаграмма */}
              {chartType === 'pie' && (
                <Box
                  sx={{
                    width: 250,
                    height: 250,
                    borderRadius: '50%',
                    m: 'auto',
                    background: `conic-gradient(${pieGradient})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(0,0,0,0.5)',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      width: '60%',
                      height: '60%',
                      bgcolor: '#161b22',
                      borderRadius: '50%',
                      position: 'absolute',
                    },
                  }}>
                  <Typography variant='h5' sx={{zIndex: 1, fontWeight: 'bold'}}>
                    {Math.round(data.reduce((a, b) => a + b.value, 0) / 4)}%
                  </Typography>
                </Box>
              )}

              {/* SVG графики (Line/Area) */}
              {(chartType === 'line' || chartType === 'area') && (
                <svg
                  viewBox='0 0 400 100'
                  preserveAspectRatio='none'
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    overflow: 'visible',
                  }}>
                  {chartType === 'area' && (
                    <path
                      d={`M -10 100 ${data.map((d, i) => `L ${i * 120 + 20} ${100 - d.value}`).join(' ')} L 410 100 Z`}
                      fill={
                        isGoalReached
                          ? 'rgba(45, 212, 191, 0.2)'
                          : 'rgba(33, 150, 243, 0.15)'
                      }
                      style={{transition: 'all 0.5s ease'}}
                    />
                  )}
                  <path
                    d={`M 20 ${100 - data[0].value} ${data.map((d, i) => `L ${i * 120 + 20} ${100 - d.value}`).join(' ')}`}
                    fill='none'
                    stroke={isGoalReached ? '#2dd4bf' : '#2196f3'}
                    strokeWidth='2'
                    style={{transition: 'all 0.5s ease'}}
                  />
                  {data.map((d, i) => (
                    <circle
                      key={i}
                      cx={i * 120 + 20}
                      cy={100 - d.value}
                      r='3'
                      fill='#fff'
                    />
                  ))}
                </svg>
              )}
            </Box>

            <Box sx={{mt: 8}}>
              <Alert
                variant={isGoalReached ? 'filled' : 'outlined'}
                severity={isGoalReached ? 'success' : 'warning'}
                sx={{borderRadius: 2}}>
                {isGoalReached
                  ? '🎯 Цель достигнута по всем параметрам!'
                  : 'Внимание: некоторые показатели ниже уровня плана.'}
              </Alert>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
