import AddIcon from '@mui/icons-material/Add'
import TableChartIcon from '@mui/icons-material/TableChart'
import TuneIcon from '@mui/icons-material/Tune'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import {
  Box,
  Button,
  Chip,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  alpha,
} from '@mui/material'
import {useCallback, useState, useMemo} from 'react'

// --- ТИПЫ ДАННЫХ ---
// Добавили типы colorScale и duplicates
type RuleType = 'classic' | 'dataBar' | 'iconSet' | 'colorScale' | 'duplicates'

interface FormattingRule {
  id: string
  range: string
  type: RuleType
  condition: 'gt' | 'lt' | 'eq' | 'contains'
  value: string | number
  style: {
    label: string
    bgColor: string
    textColor: string
  }
}

const PRESET_COLORS = [
  {label: 'Красный', bgColor: '#f85149', textColor: '#fff'},
  {label: 'Зеленый', bgColor: '#4caf50', textColor: '#fff'},
  {label: 'Синий', bgColor: '#2196f3', textColor: '#fff'},
  {label: 'Золотой', bgColor: '#ff9800', textColor: '#fff'},
]

export const StandaloneExcelRules = () => {
  const [cells, setCells] = useState<Record<string, string>>({
    A1: '10',
    B1: '20',
    C1: '150',
    D1: '40',
    E1: '90',
    A2: '100',
    B2: '55',
    C2: '200',
    D2: '310',
    E2: '15',
    A3: '300',
    B3: '5',
    C3: '80',
    D3: '120',
    E3: '250',
    A4: '45',
    B4: '130',
    C4: '10',
    D4: '95',
    E4: '180',
    A5: '210',
    B5: '85',
    C5: '350',
    D5: '60',
    E5: '20',
  })

  const [rules, setRules] = useState<FormattingRule[]>([
    {
      id: '1',
      range: 'A1:E5',
      type: 'classic',
      condition: 'lt',
      value: 50,
      style: PRESET_COLORS[0],
    },
    {
      id: '2',
      range: 'C1:C5',
      type: 'dataBar',
      condition: 'gt',
      value: 0,
      style: PRESET_COLORS[2],
    },
    {
      id: '3',
      range: 'A1:E5',
      type: 'iconSet',
      condition: 'gt',
      value: 150,
      style: PRESET_COLORS[1],
    },
  ])

  const [newRule, setNewRule] = useState<Omit<FormattingRule, 'id'>>({
    range: 'A1:E5',
    type: 'classic',
    condition: 'gt',
    value: 100,
    style: PRESET_COLORS[0],
  })

  const isCellInRange = (cellId: string, range: string) => {
    try {
      const [start, end] = range.split(':')
      if (!end) return cellId === start
      const col = cellId[0].charCodeAt(0)
      const row = parseInt(cellId.substring(1))
      const sCol = start[0].charCodeAt(0),
        sRow = parseInt(start.substring(1))
      const eCol = end[0].charCodeAt(0),
        eRow = parseInt(end.substring(1))
      return col >= sCol && col <= eCol && row >= sRow && row <= eRow
    } catch {
      return false
    }
  }

  // Вспомогательная функция для поиска дубликатов
  const duplicateValues = useMemo(() => {
    const allVals = Object.values(cells).filter((v) => v !== '')
    return allVals.filter((item, index) => allVals.indexOf(item) !== index)
  }, [cells])

  const getDynamicStyle = useCallback(
    (id: string) => {
      const val = parseFloat(cells[id]) || 0
      const activeRule = rules.find((rule) => isCellInRange(id, rule.range))

      if (!activeRule) return {}

      if (activeRule.type === 'classic') {
        let matches = false
        switch (activeRule.condition) {
          case 'gt':
            matches = val > Number(activeRule.value)
            break
          case 'lt':
            matches = val < Number(activeRule.value)
            break
          case 'eq':
            matches = val === Number(activeRule.value)
            break
          case 'contains':
            matches = cells[id].includes(String(activeRule.value))
            break
        }
        return matches
          ? {
              backgroundColor: alpha(activeRule.style.bgColor, 0.2),
              color: activeRule.style.bgColor,
              fontWeight: 'bold',
              border: `1px solid ${activeRule.style.bgColor}`,
            }
          : {}
      }

      if (activeRule.type === 'dataBar') {
        const maxVal = 400
        const percentage = Math.min((val / maxVal) * 100, 100)
        return {
          background: `linear-gradient(90deg, ${alpha(activeRule.style.bgColor, 0.3)} ${percentage}%, transparent ${percentage}%)`,
        }
      }

      if (activeRule.type === 'colorScale') {
        // Имитация градиента: чем выше число, тем плотнее цвет
        const intensity = Math.min(val / 400, 1)
        return {
          backgroundColor: alpha(activeRule.style.bgColor, intensity),
          color: intensity > 0.5 ? '#fff' : 'inherit',
        }
      }

      if (activeRule.type === 'duplicates') {
        const isDup = duplicateValues.includes(cells[id])
        return isDup
          ? {
              backgroundColor: alpha('#ffeb3b', 0.3),
              border: '1px dashed #fbc02d',
              color: '#fbc02d',
            }
          : {}
      }

      return {}
    },
    [cells, rules, duplicateValues],
  )

  const renderIcon = (id: string) => {
    const val = parseFloat(cells[id]) || 0
    const iconRule = rules.find(
      (r) => r.type === 'iconSet' && isCellInRange(id, r.range),
    )
    if (!iconRule) return null

    if (val > Number(iconRule.value))
      return <TrendingUpIcon sx={{color: '#4caf50', fontSize: 16}} />
    if (val < Number(iconRule.value))
      return <TrendingDownIcon sx={{color: '#f85149', fontSize: 16}} />
    return <HorizontalRuleIcon sx={{color: '#8b949e', fontSize: 16}} />
  }

  const rows = ['1', '2', '3', '4', '5']
  const cols = ['A', 'B', 'C', 'D', 'E']

  return (
    <Box sx={{width: '100%', maxWidth: 1200, mx: 'auto', p: 2}}>
      <Typography
        variant='h5'
        sx={{
          color: '#fff',
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          fontWeight: 'bold',
        }}>
        <TableChartIcon color='primary' /> Условное форматирование 5x5
      </Typography>

      <Box
        sx={{
          p: 3,
          bgcolor: '#0d1117',
          borderRadius: 4,
          border: '1px solid #30363d',
        }}>
        <Grid container spacing={3}>
          {/* ТАБЛИЦА */}
          <Grid size={{xs: 12, lg: 7}}>
            <TableContainer
              component={Paper}
              sx={{bgcolor: 'transparent', boxShadow: 'none'}}>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{border: '1px solid #30363d', width: 40}} />
                    {cols.map((c) => (
                      <TableCell
                        key={c}
                        align='center'
                        sx={{
                          color: '#8b949e',
                          border: '1px solid #30363d',
                          fontWeight: 'bold',
                        }}>
                        {c}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r}>
                      <TableCell
                        sx={{
                          bgcolor: '#161b22',
                          color: '#8b949e',
                          border: '1px solid #30363d',
                          textAlign: 'center',
                        }}>
                        {r}
                      </TableCell>
                      {cols.map((c) => {
                        const id = `${c}${r}`
                        return (
                          <TableCell
                            key={id}
                            sx={{
                              p: 0,
                              border: '1px solid #30363d',
                              position: 'relative',
                              height: 40,
                              ...getDynamicStyle(id),
                            }}>
                            <Stack
                              direction='row'
                              alignItems='center'
                              sx={{px: 0.5, height: '100%'}}>
                              {renderIcon(id)}
                              <TextField
                                variant='standard'
                                fullWidth
                                value={cells[id] || ''}
                                onChange={(e) =>
                                  setCells({...cells, [id]: e.target.value})
                                }
                                InputProps={{
                                  disableUnderline: true,
                                  sx: {
                                    px: 0.5,
                                    color: 'inherit',
                                    fontWeight: 'inherit',
                                    textAlign: 'center',
                                    fontSize: '0.875rem',
                                  },
                                }}
                              />
                            </Stack>
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* ПАНЕЛЬ УПРАВЛЕНИЯ */}
          <Grid size={{xs: 12, lg: 5}}>
            <Stack spacing={2}>
              <Paper
                sx={{p: 2, bgcolor: '#161b22', border: '1px solid #30363d'}}>
                <Typography
                  variant='subtitle2'
                  sx={{
                    color: '#8b949e',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}>
                  <TuneIcon fontSize='small' /> Настройка правила
                </Typography>

                <Stack spacing={2}>
                  <Select
                    size='small'
                    fullWidth
                    value={newRule.type}
                    onChange={(e) =>
                      setNewRule({...newRule, type: e.target.value as RuleType})
                    }>
                    <MenuItem value='classic'>Классический (Цвет)</MenuItem>
                    <MenuItem value='dataBar'>Data Bar (Гистограмма)</MenuItem>
                    <MenuItem value='iconSet'>Icon Set (Значки)</MenuItem>
                    <MenuItem value='colorScale'>Цветовая шкала</MenuItem>
                    <MenuItem value='duplicates'>Дубликаты</MenuItem>
                  </Select>

                  <TextField
                    label='Диапазон (напр. A1:E5)'
                    size='small'
                    value={newRule.range}
                    onChange={(e) =>
                      setNewRule({
                        ...newRule,
                        range: e.target.value.toUpperCase(),
                      })
                    }
                  />

                  {/* Скрываем настройки условия, если они не нужны для типа правила */}
                  {newRule.type !== 'dataBar' &&
                    newRule.type !== 'colorScale' &&
                    newRule.type !== 'duplicates' && (
                      <Stack direction='row' spacing={1}>
                        <Select
                          size='small'
                          fullWidth
                          value={newRule.condition}
                          onChange={(e) =>
                            setNewRule({
                              ...newRule,
                              condition: e.target.value as any,
                            })
                          }>
                          <MenuItem value='gt'>Больше чем</MenuItem>
                          <MenuItem value='lt'>Меньше чем</MenuItem>
                          <MenuItem value='eq'>Равно</MenuItem>
                        </Select>
                        <TextField
                          type='number'
                          size='small'
                          fullWidth
                          label='Значение'
                          value={newRule.value}
                          onChange={(e) =>
                            setNewRule({...newRule, value: e.target.value})
                          }
                        />
                      </Stack>
                    )}

                  <Stack direction='row' spacing={1} justifyContent='center'>
                    {PRESET_COLORS.map((p) => (
                      <Box
                        key={p.label}
                        onClick={() => setNewRule({...newRule, style: p})}
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: p.bgColor,
                          borderRadius: '50%',
                          cursor: 'pointer',
                          border:
                            newRule.style.label === p.label
                              ? '2px solid #fff'
                              : 'none',
                          transition: '0.2s',
                          '&:hover': {transform: 'scale(1.1)'},
                        }}
                      />
                    ))}
                  </Stack>

                  <Button
                    variant='contained'
                    size='small'
                    startIcon={<AddIcon />}
                    onClick={() =>
                      setRules([
                        ...rules,
                        {...newRule, id: Date.now().toString()},
                      ])
                    }>
                    Применить правило
                  </Button>
                </Stack>
              </Paper>

              <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                {rules.map((rule) => (
                  <Chip
                    key={rule.id}
                    size='small'
                    label={`${rule.type.toUpperCase()}: ${rule.range}`}
                    onDelete={() =>
                      setRules(rules.filter((r) => r.id !== rule.id))
                    }
                    sx={{
                      bgcolor: rule.style.bgColor,
                      color: rule.style.textColor,
                      fontWeight: 'bold',
                    }}
                  />
                ))}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
