import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
   Grid,
  Card,
  Stack,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import LaptopIcon from '@mui/icons-material/Laptop';
import CodeIcon from '@mui/icons-material/Code';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BrushIcon from '@mui/icons-material/Brush';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Данные о комплектующих (в тенге ₸)
const components = {
  cpu: [
    { label: 'Бюджетный', price: 35000, level: 1 },
    { label: 'Средний', price: 95000, level: 2 },
    { label: 'Мощный', price: 220000, level: 3 },
  ],
  gpu: [
    { label: 'Встроенная', price: 0, level: 1 },
    { label: 'Игровая', price: 115000, level: 2 },
    { label: 'Топ/Про', price: 450000, level: 3 },
  ],
  ram: [
    { label: '8 ГБ', price: 15000, level: 1 },
    { label: '16 ГБ', price: 35000, level: 2 },
    { label: '32+ ГБ', price: 75000, level: 3 },
  ],
};

const profiles = {
  user: {
    title: 'Пользователь',
    icon: <LaptopIcon />,
    color: '#9e9e9e',
    needs: 'Офис, браузер, видео.',
    targets: { cpu: 0, gpu: 0, ram: 0 },
  },
  dev: {
    title: 'Разработчик',
    icon: <CodeIcon />,
    color: '#2196f3',
    needs: 'Код, Docker, тесты.',
    targets: { cpu: 1, gpu: 0, ram: 2 },
  },
  gamer: {
    title: 'Геймер',
    icon: <SportsEsportsIcon />,
    color: '#f44336',
    needs: 'Игры, высокий FPS.',
    targets: { cpu: 1, gpu: 2, ram: 1 },
  },
  designer: {
    title: 'Дизайнер',
    icon: <BrushIcon />,
    color: '#9c27b0',
    needs: '3D, видео, рендер.',
    targets: { cpu: 2, gpu: 2, ram: 2 },
  },
};

export const PCConfigurator = () => {
  const [profileKey, setProfileKey] = useState<keyof typeof profiles>('user');
  const [config, setConfig] = useState({ cpu: 0, gpu: 0, ram: 0 });

  const currentProfile = profiles[profileKey];

  const totalPrice = useMemo(() => {
    return (
      components.cpu[config.cpu].price +
      components.gpu[config.gpu].price +
      components.ram[config.ram].price +
      85000 // Базовая стоимость (матплата, корпус, БП, SSD)
    );
  }, [config]);

  const handleProfileChange = (_: any, newProfile: keyof typeof profiles) => {
    if (newProfile !== null) {
      setProfileKey(newProfile);
      setConfig(profiles[newProfile].targets);
    }
  };

  const formatKZT = (val: number) => {
    return val.toLocaleString('ru-RU') + ' ₸';
  };

  return (
    <Box sx={{ py: 4, maxWidth: 1100, margin: '0 auto', px: 2 }}>
      {/* Заголовок */}
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 900, textAlign: 'center', color: '#fff', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box component="span">Расчёт стоимости</Box>
        <Box component="span" sx={{ color: '#4caf50' }}>компьютера</Box>
      </Typography>

      {/* ШАГ 1: ВЫБОР ПРОФИЛЯ */}
      <Paper sx={{ p: { xs: 2, md: 3 }, bgcolor: '#1c2128', borderRadius: 4, mb: 4, border: '1px solid #30363d' }}>
        <Typography variant="subtitle2" sx={{ color: '#8b949e', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoOutlinedIcon fontSize="small" /> 1. Профиль использования:
        </Typography>
        <ToggleButtonGroup
          value={profileKey}
          exclusive
          onChange={handleProfileChange}
          fullWidth
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, 
            gap: 1,
            '& .MuiToggleButton-root': { 
              border: '1px solid #30363d !important', 
              borderRadius: '12px !important', 
              color: '#8b949e',
              py: 1.5,
              textTransform: 'none'
            },
            '& .Mui-selected': { 
              bgcolor: `${currentProfile.color}22 !important`, 
              color: `${currentProfile.color} !important`, 
              borderColor: `${currentProfile.color} !important` 
            } 
          }}
        >
          {Object.entries(profiles).map(([key, p]) => (
            <ToggleButton key={key} value={key}>
              <Stack alignItems="center">
                {p.icon}
                <Typography variant="caption" sx={{ fontWeight: 700, mt: 0.5 }}>{p.title}</Typography>
              </Stack>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2.5}>
            {Object.entries(components).map(([key, options]) => (
              <Paper key={key} sx={{ 
                p: { xs: 2, md: 3 }, 
                bgcolor: '#0d1117', 
                border: '1px solid #30363d', 
                borderRadius: 4,
                minHeight: '130px'
              }}>
                <Typography variant="overline" sx={{ color: '#8b949e', fontWeight: 700, letterSpacing: 1.5 }}>
                  {key === 'cpu' ? 'Процессор (CPU)' : key === 'gpu' ? 'Видеокарта (GPU)' : 'Оперативная память (RAM)'}
                </Typography>
                
                <Box sx={{ px: 1, mt: 1 }}>
                  <Slider
                    value={config[key as keyof typeof config]}
                    step={1}
                    marks={options.map((opt, i) => ({ value: i, label: opt.label }))}
                    min={0} max={2}
                    onChange={(_, v) => setConfig({ ...config, [key]: v as number })}
                    sx={{
                      color: currentProfile.color,
                      '& .MuiSlider-markLabel': { 
                        color: '#8b949e', 
                        fontSize: '0.7rem',
                        whiteSpace: 'nowrap'
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2" sx={{ color: '#4caf50', fontWeight: 800 }}>
                    +{formatKZT(options[config[key as keyof typeof config]].price)}
                  </Typography>
                  {options[config[key as keyof typeof config]].level < options[currentProfile.targets[key as keyof typeof config]].level && (
                    <Chip label="Ниже нормы" size="small" color="error" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                  )}
                </Box>
              </Paper>
            ))}
          </Stack>
        </Grid>

        {/* ИТОГОВАЯ КАРТОЧКА */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ 
            bgcolor: '#1c2128', 
            border: `2px solid ${currentProfile.color}`, 
            borderRadius: 4, 
            position: { md: 'sticky' }, 
            top: 20,
            overflow: 'visible' // Чтобы тень или элементы не резались
          }}>
            <Box sx={{ p: 2, bgcolor: `${currentProfile.color}11`, borderBottom: `1px solid ${currentProfile.color}33`, borderRadius: '14px 14px 0 0' }}>
              <Typography variant="h6" sx={{ color: currentProfile.color, fontWeight: 800 }}>Чек-лист сборки</Typography>
              <Typography variant="caption" sx={{ color: '#8b949e', display: 'block' }}>{currentProfile.needs}</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <List dense sx={{ py: 0 }}>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primaryTypographyProps={{ fontSize: '0.75rem', color: '#8b949e' }}
                    secondaryTypographyProps={{ fontSize: '0.9rem', color: '#fff' }}
                    primary="Процессор" secondary={components.cpu[config.cpu].label} 
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primaryTypographyProps={{ fontSize: '0.75rem', color: '#8b949e' }}
                    secondaryTypographyProps={{ fontSize: '0.9rem', color: '#fff' }}
                    primary="Видеокарта" secondary={components.gpu[config.gpu].label} 
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primaryTypographyProps={{ fontSize: '0.75rem', color: '#8b949e' }}
                    secondaryTypographyProps={{ fontSize: '0.9rem', color: '#fff' }}
                    primary="Память" secondary={components.ram[config.ram].label} 
                  />
                </ListItem>
                <Divider sx={{ my: 1.5, bgcolor: '#30363d' }} />
                <ListItem sx={{ px: 0, py: 0 }}>
                  <ListItemText 
                    primaryTypographyProps={{ fontSize: '0.75rem', color: '#8b949e' }}
                    primary="Базовые узлы (Матплата, БП, SSD)" 
                    secondary={formatKZT(85000)}
                  />
                </ListItem>
              </List>
              
              <Box sx={{ mt: 3, p: 2, bgcolor: '#000', borderRadius: 3, textAlign: 'center', border: '1px solid #333' }}>
                <Typography variant="overline" sx={{ color: '#8b949e', display: 'block', mb: -0.5 }}>ИТОГО К ОПЛАТЕ</Typography>
                <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 900 }}>
                  {formatKZT(totalPrice)}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};