import SpeedIcon from '@mui/icons-material/Speed';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
    Alert,
    Box,
    Container,
    Divider,
    Grid,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

// Данные на основе вашей схемы
const units = [
  { label: 'Бит', value: 'bit', power: 0 },
  { label: 'Байт', value: 'byte', power: 1 },
  { label: 'Килобайт (Кбайт)', value: 'KB', power: 2 },
  { label: 'Мегабайт (Мбайт)', value: 'MB', power: 3 },
  { label: 'Гигабайт (Гбайт)', value: 'GB', power: 4 },
  { label: 'Терабайт (Тбайт)', value: 'TB', power: 5 },
  { label: 'Петабайт (Пбайт)', value: 'PB', power: 6 },
];

export const InfoConverter = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState('MB');

  // Логика перевода (базовое число 1024 согласно учебнику)
  const getInBytes = (val: number, unit: string) => {
    const power = units.find(u => u.value === unit)?.power || 0;
    if (unit === 'bit') return val / 8;
    return val * Math.pow(1024, power - 1);
  };

  const convert = (toUnit: string) => {
    const bytes = getInBytes(amount, fromUnit);
    const targetPower = units.find(u => u.value === toUnit)?.power || 0;
    
    if (toUnit === 'bit') return (bytes * 8).toLocaleString();
    const result = bytes / Math.pow(1024, targetPower - 1);
    return result < 0.001 ? result.toExponential(4) : result.toLocaleString();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, textAlign: 'center', color: '#00bcd4' }}>
        Единицы измерения <span style={{ color: '#fff' }}>информации</span>
      </Typography>

      <Grid container spacing={4}>
        {/* Панель управления */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3, bgcolor: '#0d1117', border: '1px solid #30363d', borderRadius: 3 }}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <SpeedIcon color="info" /> Ввод данных
            </Typography>
            
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Количество"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                sx={{ '& .MuiInputBase-root': { color: '#fff' }, '& .MuiInputLabel-root': { color: '#8b949e' } }}
              />
              <TextField
                select
                fullWidth
                label="Из единицы"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                sx={{ '& .MuiInputBase-root': { color: '#fff' }, '& .MuiInputLabel-root': { color: '#8b949e' } }}
              >
                {units.map((u) => (
                  <MenuItem key={u.value} value={u.value}>{u.label}</MenuItem>
                ))}
              </TextField>
            </Stack>

            <Alert icon={<TrendingUpIcon fontSize="inherit" />} severity="info" sx={{ mt: 4, bgcolor: '#161b22', color: '#00bcd4' }}>
              При переводе в <b>меньшую</b> единицу — <b>умножаем</b> на 1024.
            </Alert>
            <Alert icon={<TrendingDownIcon fontSize="inherit" />} severity="warning" sx={{ mt: 2, bgcolor: '#161b22', color: '#ff9800' }}>
              При переводе в <b>большую</b> единицу — <b>делим</b> на 1024.
            </Alert>
          </Paper>
        </Grid>

        {/* Результаты перевода */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ bgcolor: '#161b22', border: '1px solid #30363d', borderRadius: 3, overflow: 'hidden' }}>
            <Box sx={{ p: 2, bgcolor: '#0d1117', color: '#8b949e', fontWeight: 'bold', textAlign: 'center' }}>
              РЕЗУЛЬТАТЫ КОНВЕРТАЦИИ
            </Box>
            <Stack divider={<Divider sx={{ borderColor: '#30363d' }} />}>
              {units.map((u) => (
                <Box key={u.value} sx={{ 
                  p: 2, 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  bgcolor: fromUnit === u.value ? 'rgba(0, 188, 212, 0.1)' : 'transparent'
                }}>
                  <Typography sx={{ color: '#8b949e' }}>{u.label}</Typography>
                  <Typography sx={{ fontWeight: 'bold', color: fromUnit === u.value ? '#00bcd4' : '#fff', fontFamily: 'monospace' }}>
                    {convert(u.value)}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};