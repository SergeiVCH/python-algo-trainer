import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Chip,
  Divider,
  Stack,
  Alert,
} from '@mui/material';
import DataObjectIcon from '@mui/icons-material/DataObject';
import PaymentsIcon from '@mui/icons-material/Payments';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const DataTypesLab = () => {
  const [inputValue, setInputValue] = useState('4');
  const [format, setFormat] = useState('General');

  // Логика форматирования (имитация работы движка Excel)
  const formatValue = (val: string, type: string) => {
    const num = parseFloat(val);
    if (isNaN(num) && type !== 'Text') return 'Ошибка вводе';

    switch (type) {
      case 'Number': return num.toFixed(2);
      case 'Currency': return num.toLocaleString('ru-RU', { style: 'currency', currency: 'KZT' });
      case 'Percentage': return (num).toFixed(2) + '%';
      case 'Date': return '04.01.1900'; // В Excel 4 — это 4-й день от начала века
      case 'Time': return '00:00:00';
      case 'Scientific': return num.toExponential(2);
      case 'Fraction': return '4/1';
      case 'Text': return val;
      default: return val;
    }
  };

  const formats = [
    { id: 'General', label: 'Общий', desc: 'Формат по умолчанию' },
    { id: 'Number', label: 'Числовой', desc: 'Добавляет десятичные разряды (4 → 4,00)' },
    { id: 'Currency', label: 'Денежный', desc: 'Добавляет символ валюты' },
    { id: 'Date', label: 'Дата', desc: 'Число как количество дней с 01.01.1900' },
    { id: 'Percentage', label: 'Процентный', desc: 'Умножает на 100 и ставит % (75 → 75,00%)' },
    { id: 'Scientific', label: 'Экспоненциальный', desc: 'Для очень больших/маленьких чисел' },
    { id: 'Text', label: 'Текстовый', desc: 'Отображает точно так же, как ввели' },
  ];

  return (
    <Box sx={{ py: 4, maxWidth: 1000, margin: '0 auto' }}>
      <Typography variant='h4' sx={{ mb: 4, fontWeight: 900, textAlign: 'center', color: '#fff', display: 'flex', justifyContent: 'center', gap: 2 }}>
        <DataObjectIcon sx={{ fontSize: 40, color: '#0288d1' }} />
        Типы данных <Box component='span' sx={{ color: '#0288d1' }}>в Excel</Box>
      </Typography>

      <Grid container spacing={4}>
        {/* ИНТЕРАКТИВНОЕ ПРЕВЬЮ */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b22', border: '1px solid #30363d', borderRadius: 4, height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 3 }}>Лаборатория форматов</Typography>
            
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Введите число"
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                sx={{ 
                  input: { color: '#fff' }, 
                  '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#30363d' } } 
                }}
              />

              <FormControl fullWidth>
                <InputLabel sx={{ color: '#8b949e' }}>Выберите формат</InputLabel>
                <Select
                  value={format}
                  label="Выберите формат"
                  onChange={(e) => setFormat(e.target.value)}
                  sx={{ color: '#fff', '.MuiOutlinedInput-notchedOutline': { borderColor: '#30363d' } }}
                >
                  {formats.map(f => (
                    <MenuItem key={f.id} value={f.id}>{f.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ 
                p: 4, 
                bgcolor: '#0d1117', 
                borderRadius: 3, 
                border: '2px solid #0288d1',
                textAlign: 'center' 
              }}>
                <Typography variant="caption" sx={{ color: '#8b949e', textTransform: 'uppercase' }}>
                  Результат в ячейке:
                </Typography>
                <Typography variant="h3" sx={{ color: '#fff', fontWeight: 'bold', mt: 1 }}>
                  {formatValue(inputValue, format)}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* СПРАВОЧНИК */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, bgcolor: '#0d1117', border: '1px solid #30363d', borderRadius: 4 }}>
            <Typography variant="subtitle1" sx={{ color: '#fff', mb: 2, fontWeight: 'bold' }}>Описание формата:</Typography>
            <Typography variant="body1" sx={{ color: '#0288d1', mb: 1, fontWeight: 'bold' }}>
              {formats.find(f => f.id === format)?.label}
            </Typography>
            <Typography variant="body2" sx={{ color: '#8b949e', lineHeight: 1.8 }}>
              {formats.find(f => f.id === format)?.desc}
            </Typography>
            
            <Divider sx={{ my: 3, bgcolor: '#30363d' }} />
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip icon={<PaymentsIcon />} label="Денежный" sx={{ color: '#fff', bgcolor: '#161b22' }} />
              <Chip icon={<CalendarMonthIcon />} label="Дата" sx={{ color: '#fff', bgcolor: '#161b22' }} />
              <Chip label="1.23E+05" sx={{ color: '#fff', bgcolor: '#161b22' }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* КАРТОЧКИ ВСЕХ ФОРМАТОВ */}
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={2}>
           {/* Здесь можно отрендерить остальные форматы, которые ты перечислил (Дробный, Дополнительный и т.д.) */}
           <Grid size={{ xs: 12 }}>
              <Alert severity="info" sx={{ bgcolor: '#0d1117', color: '#8b949e', border: '1px solid #30363d' }}>
                💡 <b>Совет:</b> Используйте <b>Текстовый формат</b>, если нужно ввести номер телефона или длинный серийный номер, начинающийся с нуля, чтобы Excel не удалил «лишние» нули в начале.
              </Alert>
           </Grid>
        </Grid>
      </Box>
    </Box>
  );
};