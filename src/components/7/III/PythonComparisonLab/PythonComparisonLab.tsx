import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Box, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export const PythonComparisonLab = () => {
  const [valA, setValA] = useState<number>(10);
  const [valB, setValB] = useState<number>(5);

  const operators = [
    { op: '<', label: 'Меньше', logic: (a: number, b: number) => a < b },
    { op: '<=', label: 'Меньше или равно', logic: (a: number, b: number) => a <= b },
    { op: '>', label: 'Больше', logic: (a: number, b: number) => a > b },
    { op: '>=', label: 'Больше или равно', logic: (a: number, b: number) => a >= b },
    { op: '==', label: 'Равно', logic: (a: number, b: number) => a == b },
    { op: '!=', label: 'Не равно', logic: (a: number, b: number) => a != b },
  ];

  return (
    <Box sx={{ py: 4 }}>
      {/* Центрированный двухцветный заголовок */}
      <Typography
        variant="h4"
        sx={{
          mb: 5,
          fontWeight: 900,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          textTransform: 'uppercase'
        }}
      >
        <CompareArrowsIcon sx={{ fontSize: 40, color: '#ff9800' }} />
        <Box component="span" sx={{ color: '#fff' }}>Операторы</Box>
        <Box component="span" sx={{ color: '#ff9800' }}>Сравнения</Box>
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Интерактивный ввод */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, mb: 3, bgcolor: '#161b22', border: '1px solid #30363d', color: '#fff' }}>
            <Typography variant="overline" sx={{ color: '#8b949e', display: 'block', mb: 2, textAlign: 'center' }}>
              Тестирование логических выражений
            </Typography>
            <Stack direction="row" spacing={{ xs: 2, md: 4 }} justifyContent="center" alignItems="center">
              <Box>
                <Typography variant="caption" sx={{ color: '#ff7b72', fontWeight: 'bold' }}>VARIABLE A</Typography>
                <TextField 
                  fullWidth
                  type="number" 
                  value={valA} 
                  onChange={(e) => setValA(Number(e.target.value))}
                  sx={{ 
                    mt: 1, bgcolor: '#0d1117', borderRadius: 1,
                    '& .MuiInputBase-input': { color: '#79c0ff', textAlign: 'center', fontSize: '1.2rem' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#30363d' }
                  }}
                />
              </Box>
              <Typography variant="h5" sx={{ pt: 3, color: '#30363d', fontWeight: 900 }}>VS</Typography>
              <Box>
                <Typography variant="caption" sx={{ color: '#ff7b72', fontWeight: 'bold' }}>VARIABLE B</Typography>
                <TextField 
                  fullWidth
                  type="number" 
                  value={valB} 
                  onChange={(e) => setValB(Number(e.target.value))}
                  sx={{ 
                    mt: 1, bgcolor: '#0d1117', borderRadius: 1,
                    '& .MuiInputBase-input': { color: '#79c0ff', textAlign: 'center', fontSize: '1.2rem' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#30363d' }
                  }}
                />
              </Box>
            </Stack>
          </Paper>

          {/* Таблица логики */}
          <Paper sx={{ bgcolor: '#161b22', border: '1px solid #30363d', overflow: 'hidden', borderRadius: 2 }}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: '0.8fr 1fr 1.5fr 1fr', 
              p: 2, 
              bgcolor: '#0d1117', 
              borderBottom: '1px solid #30363d' 
            }}>
              <Typography variant="caption" sx={{ color: '#2dd4bf', fontWeight: 800 }}>MATH</Typography>
              <Typography variant="caption" sx={{ color: '#2dd4bf', fontWeight: 800 }}>PYTHON</Typography>
              <Typography variant="caption" sx={{ color: '#2dd4bf', fontWeight: 800 }}>ОПИСАНИЕ</Typography>
              <Typography variant="caption" sx={{ color: '#2dd4bf', fontWeight: 800, textAlign: 'center' }}>BOOL</Typography>
            </Box>

            {operators.map((item, index) => {
              const isTrue = item.logic(valA, valB);
              return (
                <Box 
                  key={index} 
                  sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: '0.8fr 1fr 1.5fr 1fr', 
                    p: 2, 
                    alignItems: 'center',
                    borderBottom: index !== operators.length - 1 ? '1px solid #30363d' : 'none',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.02)' }
                  }}
                >
                  <Typography sx={{ color: '#8b949e', fontWeight: 500 }}>{item.op.replace('==', '=')}</Typography>
                  <Typography sx={{ color: '#ff7b72', fontFamily: 'monospace', fontWeight: 'bold' }}>{item.op}</Typography>
                  <Typography sx={{ color: '#c9d1d9', fontSize: '0.9rem' }}>{item.label}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ 
                      display: 'flex', alignItems: 'center', gap: 1, 
                      px: 1.5, py: 0.5, borderRadius: 1,
                      bgcolor: isTrue ? 'rgba(45, 212, 191, 0.1)' : 'rgba(248, 81, 73, 0.05)',
                      color: isTrue ? '#2dd4bf' : '#f85149',
                      border: '1px solid',
                      borderColor: isTrue ? 'rgba(45, 212, 191, 0.3)' : 'rgba(248, 81, 73, 0.2)',
                      minWidth: 85, justifyContent: 'center'
                    }}>
                      {isTrue ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : <CancelIcon sx={{ fontSize: 16 }} />}
                      <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
                        {isTrue ? 'TRUE' : 'FALSE'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};