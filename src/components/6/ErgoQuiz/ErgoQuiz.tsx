import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { alpha, Box, Container,  Grid, Paper, Slider, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const ErgoSimulator = () => {
  const [backAngle, setBackAngle] = useState(15);
  const [neckAngle, setNeckAngle] = useState(10);
  const [legAngle, setLegAngle] = useState(115);

  const isBackCorrect = backAngle >= -5 && backAngle <= 5;
  const isNeckCorrect = neckAngle >= -5 && neckAngle <= 5;
  const isLegCorrect = legAngle >= 85 && legAngle <= 95;
  const allCorrect = isBackCorrect && isNeckCorrect && isLegCorrect;

  const getColor = (isCorrect: boolean) => (isCorrect ? '#4caf50' : '#f44336');

  return (
    <Container maxWidth="lg" sx={{ py: 4, userSelect: 'none' }}>
      <Paper sx={{ p: 4, bgcolor: '#161b22', border: '1px solid #30363d', borderRadius: 6 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Box sx={{ p: 1.5, bgcolor: alpha('#2196f3', 0.1), borderRadius: 3, color: '#2196f3' }}>
            <EmojiPeopleIcon fontSize="large" />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800 }}>Эрго-Лаб v2.0</Typography>
            <Typography variant="body1" sx={{ color: '#8b949e' }}>Настройка биомеханики рабочего места</Typography>
          </Box>
        </Stack>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{
              height: 500, bgcolor: '#0d1117', borderRadius: 4, position: 'relative', overflow: 'hidden', border: '2px solid #30363d',
              backgroundImage: `linear-gradient(#30363d 1px, transparent 1px), linear-gradient(90deg, #30363d 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}>
              
              {/* СТОЛ И МОНИТОР */}
              <Box sx={{ position: 'absolute', bottom: '30%', right: '10%', zIndex: 1 }}>
                <Box sx={{ 
                  width: 120, height: 80, bgcolor: '#161b22', border: '4px solid #30363d', 
                  borderRadius: 2, mb: 1, boxShadow: allCorrect ? '0 0 20px rgba(76, 175, 80, 0.2)' : 'none' 
                }}>
                   <Box sx={{ width: '100%', height: '10%', bgcolor: '#30363d', mt: '70%' }} />
                </Box>
                <Box sx={{ width: 8, height: 40, bgcolor: '#30363d', mx: 'auto' }} />
                <Box sx={{ width: 200, height: 12, bgcolor: '#21262d', borderRadius: 4, borderBottom: '4px solid #000' }} />
              </Box>

              {/* ПЕРСОНАЖ */}
              <Box sx={{ position: 'absolute', bottom: '25%', left: '35%' }}>
                
                {/* ТАЗ (Точка вращения всего тела) */}
                <Box sx={{ width: 24, height: 24, bgcolor: '#fff', borderRadius: '50%', position: 'relative', zIndex: 5, border: '4px solid #0d1117' }} />

                {/* НОГИ (БЕДРО) */}
                <Box sx={{ position: 'absolute', top: 6, left: 6, width: 100, height: 18, bgcolor: getColor(isLegCorrect), borderRadius: 4, originX: '0%' }}>
                   {/* ГОЛЕНЬ */}
                   <motion.div 
                    animate={{ rotate: legAngle - 90 }}
                    style={{ position: 'absolute', right: -6, top: 0, width: 18, height: 100, backgroundColor: getColor(isLegCorrect), borderRadius: 9, originY: '0%' }}
                   >
                     {/* СТУПНЯ */}
                     <Box sx={{ position: 'absolute', bottom: -4, left: 0, width: 45, height: 10, bgcolor: '#30363d', borderRadius: '0 6px 6px 0' }} />
                   </motion.div>
                </Box>

                {/* ТОРС И ВЕРХНЯЯ ЧАСТЬ (Связанная иерархия) */}
                <motion.div
                  animate={{ rotate: backAngle }}
                  style={{ position: 'absolute', bottom: 10, left: 4, width: 20, height: 130, backgroundColor: getColor(isBackCorrect), borderRadius: 10, originY: '100%' }}
                >
                  {/* РУКА (Плечо) */}
                  <Box sx={{ position: 'absolute', top: 20, left: 5, width: 10, height: 70, bgcolor: alpha('#fff', 0.1), borderRadius: 5 }} />

                  {/* ШЕЯ */}
                  <motion.div
                    animate={{ rotate: neckAngle }}
                    style={{ position: 'absolute', top: -15, left: 0, width: 20, height: 30, backgroundColor: getColor(isNeckCorrect), borderRadius: 4, originY: '100%' }}
                  >
                    {/* ГОЛОВА */}
                    <Box sx={{ 
                      position: 'absolute', top: -65, left: -22, width: 65, height: 65, 
                      bgcolor: '#1c2128', border: `4px solid ${getColor(isNeckCorrect)}`, 
                      borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                    }}>
                       {/* ГЛАЗА (Показывают направление) */}
                       <Box sx={{ position: 'absolute', right: 10, top: 25, width: 12, height: 4, bgcolor: getColor(isNeckCorrect), borderRadius: 2 }} />
                    </Box>
                  </motion.div>
                </motion.div>
              </Box>

              {/* HUD / ИНТЕРФЕЙС */}
              <Box sx={{ position: 'absolute', top: 20, left: 20, p: 2, bgcolor: alpha('#000', 0.4), borderRadius: 2, border: '1px solid #30363d' }}>
                <Typography variant="overline" sx={{ color: '#8b949e', display: 'block' }}>Angle Analysis</Typography>
                <Typography variant="body2" sx={{ color: isBackCorrect ? '#4caf50' : '#fff' }}>Back: {backAngle}°</Typography>
                <Typography variant="body2" sx={{ color: isNeckCorrect ? '#4caf50' : '#fff' }}>Neck: {neckAngle}°</Typography>
                <Typography variant="body2" sx={{ color: isLegCorrect ? '#4caf50' : '#fff' }}>Legs: {legAngle}°</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={4}>
              <SliderControl label="Наклон спины" value={backAngle} min={-20} max={40} onChange={setBackAngle} correct={isBackCorrect} unit="°" />
              <SliderControl label="Наклон шеи" value={neckAngle} min={-20} max={30} onChange={setNeckAngle} correct={isNeckCorrect} unit="°" />
              <SliderControl label="Угол в коленях" value={legAngle} min={70} max={150} onChange={setLegAngle} correct={isLegCorrect} unit="°" />

              <Paper sx={{ p: 3, bgcolor: alpha(allCorrect ? '#4caf50' : '#f44336', 0.05), border: '1px solid', borderColor: alpha(allCorrect ? '#4caf50' : '#f44336', 0.2), borderRadius: 4 }}>
                <Typography variant="h6" sx={{ color: allCorrect ? '#4caf50' : '#f44336', mb: 1, fontWeight: 700 }}>
                  {allCorrect ? "Идеально!" : "Внимание!"}
                </Typography>
                <Typography variant="body2" sx={{ color: '#c9d1d9' }}>
                  {allCorrect 
                    ? "Все показатели в норме. Такая поза минимизирует нагрузку на позвоночник." 
                    : "Подправьте красные зоны. Неправильный угол ведет к быстрой утомляемости."}
                </Typography>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

const SliderControl = ({ label, value, min, max, onChange, correct, unit }: any) => (
  <Box>
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
      <Typography variant="subtitle2" sx={{ color: '#8b949e' }}>{label}</Typography>
      <Typography variant="subtitle2" sx={{ color: correct ? '#4caf50' : '#f44336', fontWeight: 900 }}>{value}{unit}</Typography>
    </Stack>
    <Slider
      value={value} min={min} max={max}
      onChange={(_, v) => onChange(v as number)}
      sx={{
        color: correct ? '#4caf50' : '#f44336',
        '& .MuiSlider-thumb': { width: 24, height: 24, bgcolor: '#fff', border: '4px solid currentColor' },
        '& .MuiSlider-rail': { bgcolor: '#30363d', opacity: 1 }
      }}
    />
  </Box>
);