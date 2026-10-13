import CompressIcon from '@mui/icons-material/Compress';
import { Box, Chip, Grid, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

export const HuffmanCompressor = () => {
  const [text, setText] = useState('АЛГОРИТМ ХАФФМАНА В КАЗАХСТАНЕ');

  // Логика расчета статистики и объемов
  const stats = useMemo(() => {
    const freq: Record<string, number> = {};
    text.split('').forEach(char => freq[char] = (freq[char] || 0) + 1);
    return Object.entries(freq).sort((a, b) => b[1] - a[1]);
  }, [text]);

  const originalBits = text.length * 16; 
  const compressedBits = stats.reduce((acc, [_, count], index) => {
    const bitLength = index < 2 ? 1 : index < 4 ? 2 : index < 8 ? 3 : 4;
    return acc + (count * bitLength);
  }, 0);

  const formatSize = (bits: number) => {
    const b = bits / 8;
    const kb = b / 1024;
    const mb = kb / 1024;
    return {
      bits: bits.toLocaleString(),
      bytes: b.toFixed(2),
      kb: kb.toFixed(5),
      mb: mb.toFixed(8)
    };
  };

  const originalSize = formatSize(originalBits);
  const compressedSize = formatSize(compressedBits);

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, textAlign: 'center', color: '#9c27b0' }}>
        HUFFMAN <span style={{ color: '#fff' }}>COMPRESSOR</span>
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Ввод текста */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 4, bgcolor: '#0d1117', border: '1px solid #30363d', height: '100%' }}>
            <Typography sx={{ color: '#abb2bf', mb: 2 }}>Введите текст для сжатия:</Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value.toUpperCase())}
              sx={{ bgcolor: '#161b22', input: { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' } }}
            />
          </Paper>
        </Grid>

        {/* Сравнение размеров */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2} sx={{ height: '100%' }}>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#161b22', borderColor: '#30363d', flex: 1 }}>
              <Typography variant="caption" color="error">ИСХОДНЫЙ РАЗМЕР (UTF-16)</Typography>
              <Typography variant="h5" sx={{ color: '#fff', my: 1 }}>{originalSize.bits} бит</Typography>
              <Typography variant="body2" sx={{ color: '#abb2bf' }}>{originalSize.bytes} Байт | {originalSize.kb} КБ</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#161b22', borderColor: '#4caf50', flex: 1 }}>
              <Typography variant="caption" color="success.main">СЖАТЫЙ РАЗМЕР (HUFFMAN)</Typography>
              <Typography variant="h5" sx={{ color: '#fff', my: 1 }}>{compressedSize.bits} бит</Typography>
              <Typography variant="body2" sx={{ color: '#abb2bf' }}>{compressedSize.bytes} Байт | {compressedSize.kb} КБ</Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* Таблица статистики */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ color: '#fff', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CompressIcon /> Частотный анализ
        </Typography>
        <Paper sx={{ bgcolor: '#0d1117', border: '1px solid #30363d' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#9c27b0' }}>Символ</TableCell>
                <TableCell sx={{ color: '#fff' }}>Частота</TableCell>
                <TableCell sx={{ color: '#fff' }}>Вес (%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map(([char, count]) => (
                <TableRow key={char}>
                  <TableCell sx={{ color: '#fff' }}>{char === ' ' ? 'ПРОБЕЛ' : char}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{count}</TableCell>
                  <TableCell sx={{ color: '#4caf50' }}>{((count / text.length) * 100).toFixed(0)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Chip 
          label={`Эффективность сжатия: ${(100 - (compressedBits / originalBits * 100)).toFixed(1)}%`} 
          color="secondary" 
          variant="outlined" 
          sx={{ fontWeight: 'bold' }}
        />
      </Box>
    </Box>
  );
};