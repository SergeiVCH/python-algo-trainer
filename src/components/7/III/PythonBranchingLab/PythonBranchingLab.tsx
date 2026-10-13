import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TerminalIcon from '@mui/icons-material/Terminal';
import { Box, Button, Chip, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export const PythonBranchingLab = () => {
  const [age, setAge] = useState<number>(15);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [output, setOutput] = useState<string>('Нажмите "Запустить"');
  const [status, setStatus] = useState<'idle' | 'granted' | 'denied'>('idle');

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runCode = async () => {
    // Сброс состояния
    setActiveLine(1);
    setOutput("Анализ переменной age...");
    setStatus('idle');
    await sleep(800);

    // Проверка первого условия
    setActiveLine(2);
    await sleep(800);
    if (age >= 18) {
      setActiveLine(3);
      setOutput("Результат: Полный доступ");
      setStatus('granted');
    } else {
      // Переход к elif
      setActiveLine(4);
      await sleep(800);
      if (age >= 14) {
        setActiveLine(5);
        setOutput("Результат: Учебный доступ");
        setStatus('granted');
      } else {
        // Переход к else
        setActiveLine(6);
        await sleep(800);
        setActiveLine(7);
        setOutput("Результат: Отказ в доступе");
        setStatus('denied');
      }
    }
    
    // Завершение (через пару секунд убираем подсветку)
    setTimeout(() => setActiveLine(null), 2000);
  };

  const getLineStyle = (lineNum: number) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    p: '2px 8px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    bgcolor: activeLine === lineNum ? 'rgba(45, 212, 191, 0.2)' : 'transparent',
    borderLeft: '3px solid',
    borderLeftColor: activeLine === lineNum ? '#2dd4bf' : 'transparent',
  });

  return (
    <Box sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 5, fontWeight: 900, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 2, textTransform: 'uppercase' }}
      >
        <PsychologyIcon sx={{ fontSize: 40, color: '#2dd4bf' }} />
        <Box component="span" sx={{ color: '#fff' }}>Python</Box>
        <Box component="span" sx={{ color: '#2dd4bf' }}>Debugger</Box>
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3, bgcolor: '#161b22', border: '1px solid #30363d', color: '#fff' }}>
            <Typography variant="subtitle2" sx={{ color: '#8b949e', mb: 2 }}>ИНТЕРАКТИВНЫЙ РЕДАКТОР</Typography>
            
            <Box sx={{ fontFamily: 'monospace', bgcolor: '#0d1117', p: 2, borderRadius: 2, fontSize: '1.1rem' }}>
              <Box sx={getLineStyle(1)}>
                <Typography component="span" sx={{ color: '#ff7b72', mr: 1 }}>age</Typography> = 
                <TextField 
                  variant="standard" size="small" type="number" value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  sx={{ width: 50, ml: 1, input: { color: '#79c0ff', p: 0, textAlign: 'center' } }} 
                />
              </Box>

              <Box sx={getLineStyle(2)}>
                <Typography sx={{ color: '#ff7b72' }}>if <span style={{color: '#fff'}}>age &gt;= 18:</span></Typography>
              </Box>
              <Box sx={getLineStyle(3)}>
                <Typography sx={{ ml: 4, color: '#79c0ff' }}>print(<span style={{color: '#a5d6ff'}}>"Полный доступ"</span>)</Typography>
              </Box>

              <Box sx={getLineStyle(4)}>
                <Typography sx={{ color: '#ff7b72' }}>elif <span style={{color: '#fff'}}>age &gt;= 14:</span></Typography>
              </Box>
              <Box sx={getLineStyle(5)}>
                <Typography sx={{ ml: 4, color: '#79c0ff' }}>print(<span style={{color: '#a5d6ff'}}>"Учебный доступ"</span>)</Typography>
              </Box>

              <Box sx={getLineStyle(6)}>
                <Typography sx={{ color: '#ff7b72' }}>else:</Typography>
              </Box>
              <Box sx={getLineStyle(7)}>
                <Typography sx={{ ml: 4, color: '#79c0ff' }}>print(<span style={{color: '#a5d6ff'}}>"Отказ"</span>)</Typography>
              </Box>
            </Box>

            <Button 
              fullWidth variant="contained" startIcon={<PlayArrowIcon />}
              onClick={runCode} disabled={activeLine !== null}
              sx={{ mt: 3, bgcolor: '#238636', py: 1.5, fontWeight: 'bold' }}
            >
              {activeLine ? 'Выполнение...' : 'Запустить отладку'}
            </Button>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3, height: '100%', bgcolor: '#161b22', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ 
              width: 100, height: 100, borderRadius: 4, mb: 3,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              bgcolor: status === 'granted' ? '#23863622' : status === 'denied' ? '#f8514922' : '#30363d',
              border: '2px solid',
              borderColor: status === 'granted' ? '#238636' : status === 'denied' ? '#f85149' : '#484f58',
              transition: 'all 0.5s ease'
            }}>
              {status === 'granted' ? <LockOpenIcon sx={{ fontSize: 50, color: '#238636' }} /> :
               status === 'denied' ? <LockIcon sx={{ fontSize: 50, color: '#f85149' }} /> :
               <TerminalIcon sx={{ fontSize: 50, color: '#8b949e' }} />}
            </Box>
            <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center', minHeight: '3em' }}>
              {output}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
               <Chip label="STEP-BY-STEP" size="small" variant="outlined" sx={{ color: '#2dd4bf', borderColor: '#2dd4bf' }} />
               <Chip label="PYTHON 3.x" size="small" variant="outlined" sx={{ color: '#8b949e', borderColor: '#30363d' }} />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};