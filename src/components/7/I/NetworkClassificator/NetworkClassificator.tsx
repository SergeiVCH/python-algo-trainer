import {
    Box,
    Button,
    Card,
    Chip,
    Container,
    Divider,
    Fade,
    Grid,
    Paper,
    Stack,
    Tab,
    Tabs,
    Typography
} from '@mui/material';
import { useState } from 'react';
// Иконки
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CableIcon from '@mui/icons-material/Cable';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import WifiIcon from '@mui/icons-material/Wifi';

export const NetworkClassificator = () => {
  const [tabValue, setTabValue] = useState(0);
  
  // Состояние для Блока 2 (Скорость)
  const [selectedSpeed, setSelectedSpeed] = useState({ 
    id: 'mid', speed: '100 Мбит/с', color: '#ff9800', desc: 'HD Видео и соцсети' 
  });

  // Состояние для Блока 4 (Лаборатория)
  const [labSelection, setLabSelection] = useState({ owner: '', medium: '', speed: '' });

  const checkLabResult = () => {
    const { owner, medium, speed } = labSelection;
    if (!owner || !medium || !speed) {
      alert('Сначала выберите все параметры конфигурации!');
      return;
    }
    if (owner === 'Ведомственная' && (medium === 'Витая пара' || medium === 'Оптоволокно')) {
      alert('✅ Отлично! Сеть Цирка запущена. Вы выбрали правильный тип владения и надежную проводную среду.');
    } else if (owner === 'Государственная') {
      alert('❌ Ошибка: Цирк — это отдельная организация. Выберите "Ведомственная".');
    } else if (medium === 'Wi-Fi') {
      alert('❌ В задании указано, что важна стабильность кабеля. Wi-Fi может давать помехи.');
    } else {
      alert('🤔 Сеть работает, но для касс Цирка это не оптимальный выбор. Попробуй еще раз!');
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#010409', minHeight: '100vh', color: '#e6edf3', pb: 10 }}>
      <Container maxWidth="lg">
        
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, color: '#00bcd4', mb: 1 }}>
            Классификация сетей
          </Typography>
          <Typography variant="body1" sx={{ color: '#8b949e' }}>
            Принадлежность • Скорость • Среда передачи
          </Typography>
        </Box>

        <Tabs 
          value={tabValue} 
          onChange={(_, v) => setTabValue(v)} 
          centered 
          sx={{ mb: 4, '& .MuiTab-root': { color: '#8b949e', fontWeight: 700 } }}
        >
          <Tab label="Принадлежность" />
          <Tab label="Скорость (Live)" />
          <Tab label="Среда передачи" />
        </Tabs>

        {/* --- БЛОК 1: ПРИНАДЛЕЖНОСТЬ --- */}
        {tabValue === 0 && (
          <Fade in={true}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 4, bgcolor: '#0d1117', borderRadius: '24px', border: '1px solid #00bcd440', height: '100%' }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <ApartmentIcon sx={{ color: '#00bcd4', fontSize: 40 }} />
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>Ведомственные</Typography>
                  </Stack>
                  <Typography variant="body1" sx={{ color: '#8b949e', mb: 3 }}>
                    Принадлежат одной организации (театры, цирки, банки).
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: '#161b22', borderRadius: '12px' }}>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Пример: Сеть касс городского Цирка.</Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 4, bgcolor: '#0d1117', borderRadius: '24px', border: '1px solid #4caf5040', height: '100%' }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <AccountBalanceIcon sx={{ color: '#4caf50', fontSize: 40 }} />
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>Государственные</Typography>
                  </Stack>
                  <Typography variant="body1" sx={{ color: '#8b949e', mb: 3 }}>
                    Сети министерств и ведомств (Минздрав, МВД РК).
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: '#161b22', borderRadius: '12px' }}>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Пример: Сеть Министерства образования.</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Fade>
        )}

        {/* --- БЛОК 2: СКОРОСТЬ (МАКСИМАЛЬНЫЙ ИНТЕРАКТИВ) --- */}
        {tabValue === 1 && (
          <Fade in={true}>
            <Paper sx={{ p: 4, bgcolor: '#0d1117', borderRadius: '32px', border: '1px solid #30363d' }}>
              <Typography variant="h5" sx={{ mb: 4, textAlign: 'center', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <RocketLaunchIcon color="primary" /> Тест-драйв сетевых каналов
              </Typography>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 5 }}>
                  <Stack spacing={2}>
                    {[
                      { id: 'low', label: 'Низкая', speed: '10 Мбит/с', color: '#f44336', desc: 'Текст и почта' },
                      { id: 'mid', label: 'Средняя', speed: '100 Мбит/с', color: '#ff9800', desc: 'HD Видео и соцсети' },
                      { id: 'high', label: 'Высокая', speed: '1000 Мбит/с', color: '#4caf50', desc: '4K и облака' },
                    ].map((item) => (
                      <Paper 
                        key={item.id}
                        onClick={() => setSelectedSpeed(item)}
                        sx={{ 
                          p: 2, cursor: 'pointer', bgcolor: selectedSpeed.id === item.id ? `${item.color}15` : '#161b22',
                          border: `2px solid ${selectedSpeed.id === item.id ? item.color : 'transparent'}`,
                          transition: '0.3s', '&:hover': { transform: 'translateX(10px)' }
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: item.color }}>{item.label}</Typography>
                        <Typography variant="h6">{item.speed}</Typography>
                        <Typography variant="caption" sx={{ color: '#8b949e' }}>{item.desc}</Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 7 }}>
                  <Box sx={{ 
                    height: '100%', minHeight: 250, bgcolor: '#010409', borderRadius: '20px', p: 3,
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative',
                    overflow: 'hidden', border: '1px solid #30363d'
                  }}>
                    <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', color: '#8b949e' }}>
                      Передача файла 1 ГБ через <b>{selectedSpeed.speed}</b>
                    </Typography>
                    <Box sx={{ position: 'relative', height: 60, bgcolor: '#161b22', borderRadius: '30px', mb: 3, border: '1px solid #30363d' }}>
                      <Box sx={{ position: 'absolute', top: '50%', left: 20, right: 20, height: 2, bgcolor: '#30363d', transform: 'translateY(-50%)' }} />
                      <Box sx={{
                        position: 'absolute', top: '50%', left: 20, width: 24, height: 24, 
                        bgcolor: selectedSpeed.color, borderRadius: '6px', transform: 'translateY(-50%)',
                        boxShadow: `0 0 20px ${selectedSpeed.color}`,
                        animation: `moveData ${selectedSpeed.id === 'low' ? '5s' : selectedSpeed.id === 'mid' ? '1.5s' : '0.4s'} infinite linear`,
                        '@keyframes moveData': { '0%': { left: '5%' }, '100%': { left: '90%' } }
                      }} />
                    </Box>
                    <Stack direction="row" justifyContent="space-around" textAlign="center">
                      <Box>
                        <Typography variant="h4" sx={{ color: selectedSpeed.color, fontWeight: 900 }}>
                          {selectedSpeed.id === 'low' ? '13 мин' : selectedSpeed.id === 'mid' ? '80 сек' : '8 сек'}
                        </Typography>
                        <Typography variant="caption">Время ожидания</Typography>
                      </Box>
                      <Box>
                        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 900 }}>1 ГБ</Typography>
                        <Typography variant="caption">Размер файла</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Fade>
        )}

        {/* --- БЛОК 3: СРЕДА ПЕРЕДАЧИ --- */}
        {tabValue === 2 && (
          <Fade in={true}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ p: 4, bgcolor: '#0d1117', color: '#fff', borderRadius: '24px', border: '1px solid #30363d' }}>
                  <CableIcon sx={{ fontSize: 50, color: '#2196f3', mb: 2 }} />
                  <Typography variant="h5" fontWeight={800} gutterBottom>Проводные</Typography>
                  <Divider sx={{ bgcolor: '#30363d', mb: 2 }} />
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {['Коаксиальный', 'Витая пара', 'Оптико-волокно'].map(t => (
                      <Chip key={t} label={t} variant="outlined" sx={{ color: '#8b949e' }} />
                    ))}
                  </Stack>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ p: 4, bgcolor: '#0d1117', color: '#fff', borderRadius: '24px', border: '1px solid #30363d' }}>
                  <WifiIcon sx={{ fontSize: 50, color: '#9c27b0', mb: 2 }} />
                  <Typography variant="h5" fontWeight={800} gutterBottom>Беспроводные</Typography>
                  <Divider sx={{ bgcolor: '#30363d', mb: 2 }} />
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {['Радиосвязь', 'Wi-Fi', 'WiMAX'].map(t => (
                      <Chip key={t} label={t} variant="outlined" sx={{ color: '#8b949e' }} />
                    ))}
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Fade>
        )}

        {/* --- БЛОК 4: ИНТЕРАКТИВНАЯ ЛАБОРАТОРИЯ (ВСЕГДА ВИДЕН) --- */}
        /* --- УЛУЧШЕННАЯ ИНТЕРАКТИВНАЯ ЛАБОРАТОРИЯ --- */
<Box sx={{ mt: 8, p: 4, bgcolor: '#0d1117', borderRadius: '40px', border: '2px solid #30363d' }}>
  <Typography variant="h5" sx={{ mb: 4, fontWeight: 800, textAlign: 'center' }}>
    🏗 Конструктор Сети: Задание №1
  </Typography>

  <Grid container spacing={4}>
    {/* Карточка ТЗ */}
    <Grid size={{ xs: 12, md: 4 }}>
      <Paper sx={{ p: 3, bgcolor: '#161b22', height: '100%', borderLeft: '5px solid #00bcd4' }}>
        <Typography variant="h6" color="primary" gutterBottom>📋 Техзадание:</Typography>
        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
          Объединить кассы <b>Цирка</b>. 
          <br />• <b>Условие 1:</b> Локальный объект.
          <br />• <b>Условие 2:</b> Только провода.
          <br />• <b>Условие 3:</b> Бюджетно.
        </Typography>
      </Paper>
    </Grid>

    {/* Интерактивные переключатели */}
    <Grid size={{ xs: 12, md: 8 }}>
      <Stack spacing={3}>
        {/* Шаг 1 */}
        <Box>
          <Typography variant="caption" sx={{ color: '#8b949e', textTransform: 'uppercase' }}>Шаг 1: Кто владелец?</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Button 
              variant={labSelection.owner === 'Ведомственная' ? "contained" : "outlined"}
              onClick={() => setLabSelection(p => ({...p, owner: 'Ведомственная'}))}
              fullWidth
            >Ведомство (Цирк)</Button>
            <Button 
              variant={labSelection.owner === 'Государственная' ? "contained" : "outlined"}
              onClick={() => setLabSelection(p => ({...p, owner: 'Государственная'}))}
              fullWidth
            >Государство</Button>
          </Stack>
        </Box>

        {/* Шаг 2 */}
        <Box>
          <Typography variant="caption" sx={{ color: '#8b949e', textTransform: 'uppercase' }}>Шаг 2: Как передаем?</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Button 
              startIcon={<CableIcon />}
              variant={labSelection.medium === 'Витая пара' ? "contained" : "outlined"}
              onClick={() => setLabSelection(p => ({...p, medium: 'Витая пара'}))}
              fullWidth
            >Витая пара</Button>
            <Button 
              startIcon={<WifiIcon />}
              variant={labSelection.medium === 'Wi-Fi' ? "contained" : "outlined"}
              onClick={() => setLabSelection(p => ({...p, medium: 'Wi-Fi'}))}
              fullWidth
            >Wi-Fi</Button>
          </Stack>
        </Box>

        {/* Кнопка Проверки с анимацией */}
        <Button 
          variant="contained" 
          size="large"
          color={labSelection.owner && labSelection.medium ? "primary" : "inherit"}
          onClick={checkLabResult}
          sx={{ 
            mt: 2, py: 2, fontWeight: 900,
            boxShadow: labSelection.owner === 'Ведомственная' ? '0 0 20px #00bcd4' : 'none'
          }}
        >
          🚀 ПРОВЕРИТЬ КОНФИГУРАЦИЮ
        </Button>
      </Stack>
    </Grid>
  </Grid>
</Box>

      </Container>
    </Box>
  );
};