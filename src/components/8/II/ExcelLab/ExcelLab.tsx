import { useState } from 'react';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import FunctionsIcon from '@mui/icons-material/Functions';
import TableChartIcon from '@mui/icons-material/TableChart';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid, // Используем Grid2 для лучшей поддержки макетов
  Paper,
  Stack,
  Typography,
} from '@mui/material';

export const ExcelLab = () => {
  const [refType, setRefType] = useState('relative');
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  const toggleF4 = () => {
    const cycle = ['relative', 'absolute', 'mixedRow', 'mixedCol'];
    const nextIndex = (cycle.indexOf(refType) + 1) % cycle.length;
    setRefType(cycle[nextIndex]);
  };

  const renderRef = () => {
    switch (refType) {
      case 'absolute': return '=$A$1';
      case 'mixedRow': return '=A$1';
      case 'mixedCol': return '=$A1';
      default: return '=A1';
    }
  };

  return (
    <Box sx={{ py: 4, maxWidth: 1000, margin: '0 auto' }}>
      {/* ЗАГОЛОВОК */}
      <Typography
        variant='h4'
        sx={{
          mb: 5,
          fontWeight: 900,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          textTransform: 'uppercase',
          color: '#fff'
        }}>
        <TableChartIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
        Статистические <Box component='span' sx={{ color: '#2e7d32', ml: 1 }}>Данные</Box>
      </Typography>

      <Grid container spacing={3}>
        {/* ТЕОРИЯ */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b22', border: '1px solid #30363d', borderRadius: 4, height: '100%' }}>
            <Typography variant='h6' sx={{ color: '#fff', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <FunctionsIcon sx={{ color: '#2e7d32' }} /> Основы
            </Typography>
            <Typography variant='body2' sx={{ color: '#8b949e', mb: 2, lineHeight: 1.6 }}>
              Формула всегда начинается с <b>«=»</b>. <br />
              Ячейка — это точка встречи столбца и строки (например, <b>A1</b>).
            </Typography>
            <Divider sx={{ my: 2, bgcolor: '#30363d' }} />
            <Alert severity='success' icon={<AutoFixHighIcon />} sx={{ bgcolor: '#0d1117', color: '#4caf50', border: '1px solid #2e7d32' }}>
              <b>Автозаполнение:</b> тяните за «+» в углу ячейки, чтобы размножить формулу.
            </Alert>
          </Paper>
        </Grid>

        {/* ТРЕНАЖЕР F4 */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b22', border: '2px solid #2e7d32', borderRadius: 4 }}>
            <Typography variant='h6' sx={{ color: '#fff', mb: 1 }}>Тренажер клавиши F4</Typography>
            <Typography variant='caption' sx={{ color: '#8b949e', display: 'block', mb: 3 }}>
              Нажми на кнопку, чтобы увидеть магию знака «$»
            </Typography>

            <Box sx={{ p: 4, bgcolor: '#0d1117', borderRadius: 3, textAlign: 'center', mb: 3, border: '1px solid #30363d' }}>
              <Typography variant='h2' sx={{ color: '#fff', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: 6 }}>
                {renderRef()}
              </Typography>
              <Typography variant='subtitle1' sx={{ color: '#2e7d32', mt: 2, fontWeight: 'medium' }}>
                {refType === 'absolute' && 'Абсолютная: всё заблокировано'}
                {refType === 'relative' && 'Относительная: всё меняется'}
                {refType === 'mixedRow' && 'Смешанная: строка 1 неподвижна'}
                {refType === 'mixedCol' && 'Смешанная: столбец A неподвижен'}
              </Typography>
            </Box>

            <Button fullWidth variant='contained' onClick={toggleF4} sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' }, py: 1.5, fontWeight: 'bold' }}>
              Нажать клавишу F4
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* ТАБЛИЦА-ШПАРГАЛКА */}
      <Box sx={{ mt: 5 }}>
        <Typography variant='h5' sx={{ color: '#fff', mb: 3, fontWeight: 'bold' }}>Справочник ссылок</Typography>
        <Paper sx={{ overflow: 'hidden', bgcolor: '#0d1117', border: '1px solid #30363d', borderRadius: 4 }}>
          <Box component='table' sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <Box component='tr' sx={{ bgcolor: '#161b22' }}>
                <Box component='th' sx={{ p: 2, color: '#fff', textAlign: 'left', borderBottom: '1px solid #30363d' }}>Тип</Box>
                <Box component='th' sx={{ p: 2, color: '#fff', textAlign: 'left', borderBottom: '1px solid #30363d' }}>Запись</Box>
                <Box component='th' sx={{ p: 2, color: '#fff', textAlign: 'left', borderBottom: '1px solid #30363d' }}>Поведение при копировании</Box>
              </Box>
            </thead>
            <tbody>
              {[
                { type: 'Относительная', code: 'A1', desc: 'Меняется и строка, и столбец.', color: '#58a6ff' },
                { type: 'Абсолютная', code: '$A$1', desc: 'Адрес ячейки остается неизменным.', color: '#ff7b72' },
                { type: 'Смешанная', code: 'A$1', desc: 'Строка заблокирована, столбец меняется.', color: '#d2a8ff' },
                { type: 'Смешанная', code: '$A1', desc: 'Столбец заблокирован, строка меняется.', color: '#d2a8ff' },
              ].map((row, index) => (
                <Box component='tr' key={index} sx={{ '&:hover': { bgcolor: '#161b22' } }}>
                  <Box component='td' sx={{ p: 2, borderBottom: '1px solid #30363d', color: row.color, fontWeight: 'bold' }}>{row.type}</Box>
                  <Box component='td' sx={{ p: 2, borderBottom: '1px solid #30363d', color: '#fff', fontFamily: 'monospace' }}>{row.code}</Box>
                  <Box component='td' sx={{ p: 2, borderBottom: '1px solid #30363d', color: '#8b949e' }}>{row.desc}</Box>
                </Box>
              ))}
            </tbody>
          </Box>
        </Paper>
      </Box>

      {/* ЗОНА ПРАКТИКИ (QUIZ) */}
      <Box sx={{ mt: 5, p: 4, bgcolor: '#1c2128', borderRadius: 4, border: '1px dashed #2e7d32' }}>
        <Typography variant='h6' sx={{ color: '#fff', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <HelpOutlineIcon sx={{ color: '#2e7d32' }} /> Проверь себя
        </Typography>
        <Typography variant='body1' sx={{ color: '#8b949e', mb: 3 }}>
          Какую формулу нужно использовать, чтобы при копировании ссылка на ячейку <b>C10</b> никогда не менялась?
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {['=C10', '=$C10', '=C$10', '=$C$10'].map((option) => (
            <Button
              key={option}
              variant={quizAnswer === option ? 'contained' : 'outlined'}
              color={quizAnswer === option ? (option === '=$C$10' ? 'success' : 'error') : 'primary'}
              onClick={() => setQuizAnswer(option)}
              sx={{ flexGrow: 1, textTransform: 'none', fontWeight: 'bold' }}
            >
              {option}
            </Button>
          ))}
        </Stack>
        {quizAnswer && (
          <Typography sx={{ mt: 2, color: quizAnswer === '=$C$10' ? '#4caf50' : '#f85149', textAlign: 'center', fontWeight: 'bold' }}>
            {quizAnswer === '=$C$10' 
              ? '✅ Верно! Два знака доллара полностью «замораживают» адрес.' 
              : '❌ Ошибка. Чтобы ссылка была абсолютной, знак $ должен быть и у буквы, и у цифры.'}
          </Typography>
        )}
      </Box>
    </Box>
  );
};