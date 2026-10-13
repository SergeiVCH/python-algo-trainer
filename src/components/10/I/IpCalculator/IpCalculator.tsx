import RouterIcon from '@mui/icons-material/Router'
import {
  Box,
  Divider,
  Grid,
  Paper,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {useState} from 'react'

export const IpCalculator = () => {
  const [ip, setIp] = useState('192.168.1.15')
  const [mask, setMask] = useState(24)

  // Функция перевода в двоичный вид с разделением по октетам
  const toBinary = (address: string) => {
    return address
      .split('.')
      .map((octet) => parseInt(octet).toString(2).padStart(8, '0'))
      .join('.')
  }

  const calculateNetwork = (ipAddr: string, prefix: number) => {
    const ipBin = toBinary(ipAddr).replace(/\./g, '')
    const netBin = ipBin.substring(0, prefix).padEnd(32, '0')
    const chunks = netBin.match(/.{1,8}/g)
    return chunks ? chunks.map((chunk) => parseInt(chunk, 2)).join('.') : ''
  }

  const networkAddr = calculateNetwork(ip, mask)

  return (
    <Box sx={{py: 4}}>
      <Typography
        variant='h4'
        sx={{fontWeight: 900, mb: 4, textAlign: 'center', color: '#2196f3'}}>
        NETWORK <span style={{color: '#fff'}}>IP VISUALIZER</span>
      </Typography>

      <Grid container spacing={4}>
        {/* Настройка адреса */}
        <Grid size={{xs: 12, md: 5}}>
          <Paper sx={{p: 4, bgcolor: '#0d1117', border: '1px solid #30363d'}}>
            <Typography sx={{color: '#fff', mb: 3}}>Настройки узла</Typography>
            <TextField
              fullWidth
              label='IP Address'
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              sx={{mb: 4, bgcolor: '#161b22'}}
            />
            <Typography gutterBottom sx={{color: '#abb2bf'}}>
              Маска подсети: /{mask}
            </Typography>
            <Slider
              value={mask}
              min={1}
              max={32}
              onChange={(_, v) => setMask(v as number)}
              sx={{color: '#2196f3'}}
            />
            <Typography
              variant='caption'
              sx={{color: '#4b5263', display: 'block', mt: 1}}>
              Маска определяет, какая часть адреса относится к сети, а какая — к
              устройству.
            </Typography>
          </Paper>
        </Grid>

        {/* Визуализация расчета */}
        <Grid size={{xs: 12, md: 7}}>
          <Paper sx={{p: 4, bgcolor: '#0d1117', border: '1px solid #30363d'}}>
            <Stack spacing={3}>
              <Box>
                <Typography variant='caption' color='primary'>
                  IP В ДВОИЧНОМ ВИДЕ:
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'monospace',
                    color: '#fff',
                    wordBreak: 'break-all',
                    fontSize: '1.1rem',
                  }}>
                  {toBinary(ip)
                    .split('.')
                    .map((o, i) => (
                      <span
                        key={i}
                        style={{color: i * 8 < mask ? '#4caf50' : '#fff'}}>
                        {o}
                        {i < 3 ? '.' : ''}
                      </span>
                    ))}
                </Typography>
              </Box>

              <Divider sx={{borderColor: '#30363d'}} />

              <Box
                sx={{
                  p: 2,
                  bgcolor: '#161b22',
                  borderRadius: 2,
                  borderLeft: '4px solid #4caf50',
                }}>
                <Typography variant='caption' sx={{color: '#4caf50'}}>
                  АДРЕС СЕТИ (NETWORK ID):
                </Typography>
                <Typography variant='h5' sx={{color: '#fff', fontWeight: 900}}>
                  {networkAddr}
                </Typography>
                <Typography variant='caption' sx={{color: '#abb2bf'}}>
                  Бинарно: {toBinary(networkAddr)}
                </Typography>
              </Box>

              <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                <RouterIcon sx={{color: '#2196f3'}} />
                <Typography variant='body2' sx={{color: '#abb2bf'}}>
                  Доступно хостов в этой сети:{' '}
                  <b>{Math.pow(2, 32 - mask) - 2}</b>
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{mt: 4, p: 3, bgcolor: '#0a0d11', borderRadius: 2}}>
        <Typography variant='subtitle2' sx={{color: '#2196f3', mb: 1}}>
          КАК ЭТО РАБОТАЕТ В ШКОЛЕ:
        </Typography>
        <Typography variant='body2' sx={{color: '#4b5263'}}>
          Мы берем IP и Маску, переводим в двоичный вид и применяем поразрядную
          конъюнкцию (логическое И). Зеленым цветом выделена часть адреса,
          которая зафиксирована маской подсети.
        </Typography>
      </Box>
    </Box>
  )
}
