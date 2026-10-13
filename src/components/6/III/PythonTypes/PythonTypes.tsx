import CodeIcon from '@mui/icons-material/Code';
import {
    Box,
    Card,
    Chip,
    Container,
    Grid,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { useState } from 'react';

// Данные полностью соответствуют параграфу 17 вашего учебника
const pythonTypes = [
  { name: 'Целые числа', type: 'int', example: '1, 150, 500', color: '#4caf50' },
  { name: 'Вещественные числа', type: 'float', example: '2.5, 5.8, 100.0', color: '#2196f3' },
  { name: 'Строки', type: 'str', example: '"hello", "hey", "100"', color: '#ff9800' },
  { name: 'Списки', type: 'list', example: '[5, "hey", 10.5]', color: '#e91e63' },
  { name: 'Словарь', type: 'dict', example: '{"Hello": "Привет"}', color: '#9c27b0' },
  { name: 'Кортеж', type: 'tuple', example: '(1, 2, 3) — неизменная последовательность', color: '#00bcd4' },
  { name: 'Логический тип', type: 'boolean', example: 'true, false', color: '#f44336' },
];

export const PythonTypes = () => {
  const [selected, setSelected] = useState(pythonTypes[0]);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          mb: 4,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        }}
      >
        <CodeIcon sx={{ fontSize: 40, color: '#ffcc00' }} />
        Типы данных <span style={{ color: '#ffcc00', marginLeft: '8px' }}>Python</span>
      </Typography>

      <Grid container spacing={3}>
        {/* Список типов — используем стандарт size */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={1.5}>
            {pythonTypes.map((t) => (
              <Paper
                key={t.type}
                onClick={() => setSelected(t)}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  bgcolor: selected.type === t.type ? '#1e2633' : '#0d1117',
                  border: `1px solid ${selected.type === t.type ? t.color : '#30363d'}`,
                  transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    bgcolor: '#161b22',
                    transform: 'translateX(5px)',
                  },
                }}
              >
                <Typography sx={{ fontWeight: 700, color: selected.type === t.type ? '#fff' : '#8b949e' }}>
                  {t.name}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Grid>

        {/* Интерактивная карточка — используем стандарт size */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card
            sx={{
              p: 4,
              bgcolor: '#161b22',
              border: `2px solid ${selected.color}`,
              borderRadius: 4,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: `0 0 20px ${selected.color}20`,
            }}
          >
            <Box sx={{ mb: 'auto' }}>
              <Chip
                label={selected.type}
                sx={{
                  bgcolor: selected.color,
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '1rem',
                  mb: 3,
                  px: 1
                }}
              />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>
                {selected.name}
              </Typography>
              <Typography variant="body1" sx={{ color: '#abb2bf', mb: 1 }}>
                Примеры в Python:
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: '#0d1117',
                  fontFamily: 'monospace',
                  color: selected.color,
                  border: '1px solid #30363d',
                  mb: 3
                }}
              >
                {selected.example}
              </Paper>
            </Box>

            <Box
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.03)',
                p: 2,
                borderRadius: 2,
                border: '1px dashed #30363d',
                mt: 2
              }}
            >
              <Typography variant="caption" sx={{ color: '#8b949e', lineHeight: 1.6 }}>
                <b>Справка:</b> Тип данных — это описание допустимых значений. 
                В Python тип определяется автоматически (динамическая типизация).
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};