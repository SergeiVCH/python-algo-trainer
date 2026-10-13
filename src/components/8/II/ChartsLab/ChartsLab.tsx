import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import {useState} from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export const ChartsLab = () => {
  // Начальные данные для функции y = 2x
  const [data, setData] = useState([
    {x: -2, y: -4},
    {x: -1, y: -2},
    {x: 0, y: 0},
    {x: 1, y: 2},
    {x: 2, y: 4},
  ])

  const updateValue = (index: number, field: 'x' | 'y', value: string) => {
    const newData = [...data]
    newData[index][field] = parseFloat(value) || 0
    setData(newData)
  }

  const addRow = () => {
    const lastX = data[data.length - 1]?.x || 0
    setData([...data, {x: lastX + 1, y: 0}])
  }

  const removeRow = (index: number) => {
    if (data.length > 2) {
      setData(data.filter((_, i) => i !== index))
    }
  }

  return (
    <Box sx={{py: 4, maxWidth: 1100, margin: '0 auto'}}>
      <Typography
        variant='h4'
        sx={{
          mb: 4,
          fontWeight: 900,
          textAlign: 'center',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
        }}>
        <ShowChartIcon sx={{fontSize: 40, color: '#4caf50'}} />
        Построение графиков{' '}
        <Box component='span' sx={{color: '#4caf50'}}>
          по таблице
        </Box>
      </Typography>

      <Grid container spacing={3}>
        {/* ТАБЛИЦА ЗНАЧЕНИЙ */}
        <Grid size={{xs: 12, md: 4}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 4,
            }}>
            <Typography variant='h6' sx={{color: '#fff', mb: 2}}>
              Таблица значений
            </Typography>
            <TableContainer sx={{maxHeight: 400}}>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{color: '#8b949e', fontWeight: 'bold'}}>
                      X
                    </TableCell>
                    <TableCell sx={{color: '#8b949e', fontWeight: 'bold'}}>
                      Y
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{border: 0}}>
                        <TextField
                          variant='standard'
                          type='number'
                          value={row.x}
                          onChange={(e) =>
                            updateValue(index, 'x', e.target.value)
                          }
                          sx={{input: {color: '#fff', textAlign: 'center'}}}
                        />
                      </TableCell>
                      <TableCell sx={{border: 0}}>
                        <TextField
                          variant='standard'
                          type='number'
                          value={row.y}
                          onChange={(e) =>
                            updateValue(index, 'y', e.target.value)
                          }
                          sx={{
                            input: {
                              color: '#4caf50',
                              textAlign: 'center',
                              fontWeight: 'bold',
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{border: 0}}>
                        <IconButton
                          onClick={() => removeRow(index)}
                          size='small'
                          sx={{color: '#f44336'}}>
                          <DeleteIcon fontSize='small' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              fullWidth
              startIcon={<AddCircleIcon />}
              onClick={addRow}
              sx={{mt: 2, color: '#4caf50'}}>
              Добавить точку
            </Button>
          </Paper>
        </Grid>

        {/* ГРАФИК */}
        <Grid size={{xs: 12, md: 8}}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: 4,
              height: 500,
            }}>
            <Typography variant='h6' sx={{color: '#fff', mb: 3}}>
              Визуализация функции
            </Typography>
            <ResponsiveContainer width='100%' height='90%'>
              <LineChart data={data.sort((a, b) => a.x - b.x)}>
                <CartesianGrid strokeDasharray='3 3' stroke='#30363d' />
                <XAxis
                  dataKey='x'
                  stroke='#8b949e'
                  type='number'
                  domain={['auto', 'auto']}
                />
                <YAxis stroke='#8b949e' />
                <Tooltip
                  contentStyle={{
                    // bgcolor: '#161b22',
                    border: '1px solid #30363d',
                  }}
                  itemStyle={{color: '#4caf50'}}
                />
                <Line
                  type='monotone'
                  dataKey='y'
                  stroke='#4caf50'
                  strokeWidth={3}
                  dot={{r: 6, fill: '#4caf50'}}
                  activeDot={{r: 8}}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
