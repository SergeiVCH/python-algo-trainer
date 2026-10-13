import HubIcon from '@mui/icons-material/Hub';
import RouterIcon from '@mui/icons-material/Router';
import { Box, Grid, Paper, Typography } from '@mui/material';

const SvgPacket = ({ pathD, duration = "3s" }: { pathD: string, duration?: string }) => (
  <circle r="5" fill="#ffeb3b">
    <animateMotion dur={duration} repeatCount="indefinite" path={pathD} />
  </circle>
);

const SvgNode = ({ x, y, label }: { x: number, y: number, label: string }) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle r="15" fill="#1d2127" stroke="#30363d" strokeWidth="2" />
    <foreignObject x="-10" y="-10" width="20" height="20">
      <HubIcon sx={{ color: '#fff', fontSize: 20 }} />
    </foreignObject>
    <text x="0" y="28" textAnchor="middle" fill="#abb2bf" fontSize="10" style={{ pointerEvents: 'none' }}>{label}</text>
  </g>
);

export const NetworkComparison = () => {
  const svgSize = { width: 400, height: 300 };
  const centerX = svgSize.width / 2;
  const centerY = svgSize.height / 2;
  const radius = 80;

  const getPos = (i: number, total: number) => {
    const angle = (i * 2 * Math.PI) / total - Math.PI / 2;
    return { x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) };
  };

  const cardStyle = { 
    p: 3, bgcolor: '#0d1117', border: '1px solid #30363d', 
    height: '100%', display: 'flex', flexDirection: 'column',
    borderRadius: 2
  };

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, textAlign: 'center', color: '#607d8b', textTransform: 'uppercase' }}>
        Сетевые <span style={{ color: '#fff' }}>Топологии</span>
      </Typography>

      <Grid container spacing={3}>
        {/* 1. ШИНА */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={cardStyle}>
            <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center', mb: 2 }}>🚌 Шина (Bus)</Typography>
            <svg viewBox={`0 0 ${svgSize.width} ${svgSize.height}`} width="100%">
              <path d={`M 50 ${centerY} H ${svgSize.width - 50}`} stroke="#4b5263" strokeWidth="4" />
              {[1, 2, 3, 4, 5].map((n, i) => {
                const x = 70 + i * (svgSize.width - 140) / 4;
                return (
                  <g key={n}>
                    <line x1={x} y1={centerY} x2={x} y2={centerY - 40} stroke="#4b5263" strokeWidth="2" />
                    <SvgNode x={x} y={centerY - 55} label={`PC-${n}`} />
                  </g>
                );
              })}
              <SvgPacket pathD={`M 50 ${centerY} H ${svgSize.width - 50}`} />
            </svg>
          </Paper>
        </Grid>

        {/* 2. ЗВЕЗДА */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={cardStyle}>
            <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center', mb: 2 }}>⭐ Звезда (Star)</Typography>
            <svg viewBox={`0 0 ${svgSize.width} ${svgSize.height}`} width="100%">
              {[1, 2, 3, 4, 5].map((n, i) => {
                const pos = getPos(i, 5);
                const d = `M ${centerX} ${centerY} L ${pos.x} ${pos.y}`;
                return (
                  <g key={n}>
                    <path d={d} stroke="#4b5263" strokeWidth="2" />
                    <SvgNode x={pos.x} y={pos.y} label={`PC-${n}`} />
                    <SvgPacket pathD={d} duration="1.5s" />
                  </g>
                );
              })}
              <g transform={`translate(${centerX}, ${centerY})`}>
                <circle r="22" fill="#161b22" stroke="#ff9800" strokeWidth="2" />
                <foreignObject x="-12" y="-12" width="24" height="24">
                  <RouterIcon sx={{ color: '#ff9800', fontSize: 24 }} />
                </foreignObject>
              </g>
            </svg>
          </Paper>
        </Grid>

        {/* 3. КОЛЬЦО */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={cardStyle}>
            <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center', mb: 2 }}>⭕ Кольцо (Ring)</Typography>
            <svg viewBox={`0 0 ${svgSize.width} ${svgSize.height}`} width="100%">
              <circle cx={centerX} cy={centerY} r={radius} stroke="#4b5263" strokeWidth="2" fill="none" strokeDasharray="8,4" />
              {[1, 2, 3, 4, 5].map((n, i) => {
                const pos = getPos(i, 5);
                return <SvgNode key={n} x={pos.x} y={pos.y} label={`PC-${n}`} />;
              })}
              <SvgPacket 
                duration="4s"
                pathD={`M ${centerX} ${centerY - radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 ${-radius * 2}`} 
              />
            </svg>
          </Paper>
        </Grid>

        {/* 4. ДЕРЕВО (Исправленное) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={cardStyle}>
            <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center', mb: 2 }}>🌳 Дерево (Tree)</Typography>
            <svg viewBox={`0 0 ${svgSize.width} ${svgSize.height}`} width="100%">
              {/* Линии иерархии */}
              <path d={`M ${centerX} 40 L ${centerX - 80} 120`} stroke="#4b5263" strokeWidth="2" fill="none" />
              <path d={`M ${centerX} 40 L ${centerX + 80} 120`} stroke="#4b5263" strokeWidth="2" fill="none" />
              <path d={`M ${centerX - 80} 120 L ${centerX - 120} 220`} stroke="#4b5263" strokeWidth="2" fill="none" />
              <path d={`M ${centerX - 80} 120 L ${centerX - 40} 220`} stroke="#4b5263" strokeWidth="2" fill="none" />
              <path d={`M ${centerX + 80} 120 L ${centerX + 40} 220`} stroke="#4b5263" strokeWidth="2" fill="none" />
              <path d={`M ${centerX + 80} 120 L ${centerX + 120} 220`} stroke="#4b5263" strokeWidth="2" fill="none" />

              {/* Пакеты */}
              <SvgPacket pathD={`M ${centerX} 40 L ${centerX - 80} 120 L ${centerX - 120} 220`} duration="3s" />
              <SvgPacket pathD={`M ${centerX} 40 L ${centerX + 80} 120 L ${centerX + 120} 220`} duration="3s" />

              {/* Узлы */}
              <g transform={`translate(${centerX}, 40)`}>
                <rect x="-15" y="-15" width="30" height="30" rx="4" fill="#161b22" stroke="#f44336" strokeWidth="2" />
                <foreignObject x="-10" y="-10" width="20" height="20">
                  <RouterIcon sx={{ color: '#f44336', fontSize: 20 }} />
                </foreignObject>
                <text x="0" y="30" textAnchor="middle" fill="#f44336" fontSize="10" fontWeight="bold">ROOT</text>
              </g>

              <SvgNode x={centerX - 80} y={120} label="SW-1" />
              <SvgNode x={centerX + 80} y={120} label="SW-2" />
              <SvgNode x={centerX - 120} y={220} label="PC-1" />
              <SvgNode x={centerX - 40} y={220} label="PC-2" />
              <SvgNode x={centerX + 40} y={220} label="PC-3" />
              <SvgNode x={centerX + 120} y={220} label="PC-4" />
            </svg>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};