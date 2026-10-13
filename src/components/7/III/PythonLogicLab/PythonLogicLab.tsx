import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, FormControlLabel, Paper, Stack, Switch, Typography } from '@mui/material';
import {Grid} from '@mui/material';
import { useState } from 'react';

export const PythonLifeLogic = () => {
  const [деньги, setДеньги] = useState(false);
  const [билет, setБилет] = useState(false);
  const [выходной, setВыходной] = useState(false);

  const getStatusStyle = (val: boolean) => ({
    display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 2,
    bgcolor: val ? 'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.1)',
    color: val ? '#81c784' : '#e57373',
    border: '1px solid',
    borderColor: val ? '#4caf50' : '#f44336',
    minWidth: 110, justifyContent: 'center'
  });

  return (
    <Box sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 5, fontWeight: 900, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 2 }}
      >
        <ConnectWithoutContactIcon sx={{ fontSize: 40, color: '#4caf50' }} />
        <Box component="span" sx={{ color: '#fff' }}>Жизненная</Box>
        <Box component="span" sx={{ color: '#4caf50' }}>Логика</Box>
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Условия */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b22', border: '1px solid #30363d', borderRadius: 3 }}>
            <Typography variant="overline" sx={{ color: '#8b949e', display: 'block', mb: 2 }}>
              Твои возможности:
            </Typography>
            <Stack spacing={2}>
              <FormControlLabel
                control={<Switch checked={деньги} onChange={(e) => setДеньги(e.target.checked)} color="success" />}
                label={<Typography sx={{ color: '#fff' }}>Есть деньги 💰</Typography>}
              />
              <FormControlLabel
                control={<Switch checked={билет} onChange={(e) => setБилет(e.target.checked)} color="success" />}
                label={<Typography sx={{ color: '#fff' }}>Есть билет 🎟️</Typography>}
              />
              <FormControlLabel
                control={<Switch checked={выходной} onChange={(e) => setВыходной(e.target.checked)} color="success" />}
                label={<Typography sx={{ color: '#fff' }}>Сегодня суббота 🏖️</Typography>}
              />
            </Stack>
          </Paper>
        </Grid>

        {/* Пояснения */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            
            {/* AND */}
            <Paper sx={{ p: 2, bgcolor: '#161b22', border: '1px solid #30363d' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography sx={{ color: '#ff7b72', fontWeight: 'bold' }}>and (И)</Typography>
                  <Typography variant="body2" sx={{ color: '#c9d1d9', mt: 0.5 }}>
                    <b>Пример:</b> Чтобы купить чипсы, нужны и <b>деньги</b>, и <b>магазин</b> под боком.
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#79c0ff', fontFamily: 'monospace' }}>
                    деньги <span style={{color:'#ff7b72'}}>and</span> билет
                  </Typography>
                </Box>
                <Box sx={getStatusStyle(деньги && билет)}>
                  {деньги && билет ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />}
                  <Typography variant="button" sx={{ fontWeight: 'bold' }}>{деньги && билет ? 'ИДУ' : 'ЖДУ'}</Typography>
                </Box>
              </Stack>
            </Paper>

            {/* OR */}
            <Paper sx={{ p: 2, bgcolor: '#161b22', border: '1px solid #30363d' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography sx={{ color: '#d29922', fontWeight: 'bold' }}>or (ИЛИ)</Typography>
                  <Typography variant="body2" sx={{ color: '#c9d1d9', mt: 0.5 }}>
                    <b>Пример:</b> Я пойду гулять, если сегодня <b>выходной</b> ИЛИ если у меня <b>есть билет</b>.
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#79c0ff', fontFamily: 'monospace' }}>
                    выходной <span style={{color:'#ff7b72'}}>or</span> билет
                  </Typography>
                </Box>
                <Box sx={getStatusStyle(выходной || билет)}>
                  {выходной || билет ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />}
                  <Typography variant="button" sx={{ fontWeight: 'bold' }}>{выходной || билет ? 'ИДУ' : 'ЖДУ'}</Typography>
                </Box>
              </Stack>
            </Paper>

            {/* NOT */}
            <Paper sx={{ p: 2, bgcolor: '#161b22', border: '1px solid #30363d' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography sx={{ color: '#a371f7', fontWeight: 'bold' }}>not (НЕ)</Typography>
                  <Typography variant="body2" sx={{ color: '#c9d1d9', mt: 0.5 }}>
                    <b>Пример:</b> Мы не пойдем в школу, если сегодня <b>НЕ</b> рабочий день.
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#79c0ff', fontFamily: 'monospace' }}>
                    <span style={{color:'#ff7b72'}}>not</span> билет
                  </Typography>
                </Box>
                <Box sx={getStatusStyle(!билет)}>
                  {!билет ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />}
                  <Typography variant="button" sx={{ fontWeight: 'bold' }}>{!билет ? 'ВЕРНО' : 'ЛОЖЬ'}</Typography>
                </Box>
              </Stack>
            </Paper>

          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};