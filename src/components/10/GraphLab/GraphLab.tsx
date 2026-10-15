import AccountTreeIcon from '@mui/icons-material/AccountTree'
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck'
import RouteIcon from '@mui/icons-material/Route'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import ReplayIcon from '@mui/icons-material/Replay'
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import { useState } from 'react'

export const GraphLab = () => {
  // Представление графа в виде словаря смежности (Adjacency List в Python)
  const [graph] = useState<{ [key: string]: string[] }>({
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E'],
  })

  const [visited, setVisited] = useState<string[]>([])
  const [currentStepInfo, setCurrentStepInfo] = useState<string>(
    'Граф инициализирован. Выберите алгоритм обхода (BFS или DFS).'
  )
  const [log, setLog] = useState<string[]>([
    '💡 Тренажёр графов инициализирован. Структура задана словарем смежности в Python.',
  ])

  // --- 1. Обход в ширину (BFS - Breadth-First Search) ---
  const handleBfs = () => {
    const startNode = 'A'
    const queue: string[] = [startNode]
    const seen: Set<string> = new Set([startNode])
    const order: string[] = []

    while (queue.length > 0) {
      const node = queue.shift()!
      order.push(node)
      for (const neighbor of graph[node] || []) {
        if (!seen.has(neighbor)) {
          seen.add(neighbor)
          queue.push(neighbor)
        }
      }
    }

    setVisited(order)
    setCurrentStepInfo(`Обход в ширину (BFS) из вершины '${startNode}'`)
    setLog((prev) => [
      `📘 [Описание BFS]: Алгоритм обхода в ширину исследует граф по уровням (вначале соседи, потом соседи соседей) с использованием очереди (queue).`,
      `💻 [Код Python]: 
def bfs(graph, start):
    visited, queue = [], [start]
    while queue:
        node = queue.pop(0)
        if node not in visited:
            visited.append(node)
            queue.extend([n for n in graph[node] if n not in visited])
    return visited`,
      `🎯 [Результат обхода]: ${order.join(' -> ')}`,
      ...prev,
    ])
  }

  // --- 2. Обход в глубину (DFS - Depth-First Search) ---
  const handleDfs = () => {
    const startNode = 'A'
    const stack: string[] = [startNode]
    const seen: Set<string> = new Set()
    const order: string[] = []

    while (stack.length > 0) {
      const node = stack.pop()!
      if (!seen.has(node)) {
        seen.add(node)
        order.push(node)
        // Добавляем соседей в обратном порядке для правильного порядка стека
        const neighbors = [...(graph[node] || [])].reverse()
        for (const neighbor of neighbors) {
          if (!seen.has(neighbor)) {
            stack.push(neighbor)
          }
        }
      }
    }

    setVisited(order)
    setCurrentStepInfo(`Обход в глубину (DFS) из вершины '${startNode}'`)
    setLog((prev) => [
      `📘 [Описание DFS]: Алгоритм обхода в глубину идет как можно дальше по каждой ветке, прежде чем вернуться назад, используя стек (stack / рекурсию).`,
      `💻 [Код Python]:
def dfs(graph, node, visited=None):
    if visited is None: visited = []
    visited.append(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited`,
      `🎯 [Результат обхода]: ${order.join(' -> ')}`,
      ...prev,
    ])
  }

  const handleReset = () => {
    setVisited([])
    setCurrentStepInfo('Граф сброшен. Выберите алгоритм обхода.')
    setLog(['🔄 Состояние лаборатории графов сброшено.'])
  }

  return (
    <Container maxWidth='lg' sx={{ py: 6 }}>
      {/* Шапка */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography
          variant='h3'
          sx={{
            fontWeight: 900,
            color: '#fff',
            mb: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}>
          <AccountTreeIcon sx={{ fontSize: 45, color: '#3fb950' }} />
          Алгоритмы на графах в Python
        </Typography>
        <Typography variant='h6' sx={{ color: '#8b949e' }}>
          Интерактивный практикум по представлению графов, BFS и DFS обходам (10 класс)
        </Typography>
      </Box>

      {/* Визуальная карта графа (Словарь смежности / Узлы) */}
      <Paper
        sx={{
          p: 4,
          bgcolor: '#0d1117',
          border: '1px solid #30363d',
          borderRadius: 4,
          mb: 4,
        }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <NetworkCheckIcon sx={{ color: '#58a6ff' }} />
            <Typography
              variant='subtitle1'
              sx={{ color: '#58a6ff', fontWeight: 'bold' }}>
              Граф (Словарь смежности: graph = {JSON.stringify(graph).replace(/"/g, "'")})
            </Typography>
          </Box>
          <Chip
            label={currentStepInfo}
            variant='outlined'
            sx={{ color: '#3fb950', borderColor: '#3fb950' }}
          />
        </Box>

        {/* Схема узлов графа */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            minHeight: 120,
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#161b22',
            p: 3,
            borderRadius: 2,
            border: '1px solid #30363d',
          }}>
          {Object.keys(graph).map((node) => {
            const isVisited = visited.includes(node)
            const visitOrderIndex = visited.indexOf(node)

            return (
              <Box key={node} sx={{ textAlign: 'center' }}>
                <Tooltip title={`Связи: ${graph[node].join(', ')}`}>
                  <Paper
                    sx={{
                      width: 65,
                      height: 65,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      bgcolor: isVisited ? '#238636' : '#0d1117',
                      border: `2px solid ${isVisited ? '#3fb950' : '#58a6ff'}`,
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      borderRadius: '50%',
                      boxShadow: isVisited ? '0 0 15px rgba(47, 185, 80, 0.4)' : 'none',
                      transition: 'all 0.3s ease',
                    }}>
                    {node}
                    {isVisited && (
                      <Typography variant='caption' sx={{ fontSize: '0.65rem', color: '#fff' }}>
                        #{visitOrderIndex + 1}
                      </Typography>
                    )}
                  </Paper>
                </Tooltip>
                <Typography
                  variant='caption'
                  sx={{ color: '#8b949e', mt: 1, display: 'block' }}>
                  → [{graph[node].join(',')}]
                </Typography>
              </Box>
            )
          })}
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Панель управления и выбор алгоритмов */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Box>
              <Typography
                variant='subtitle1'
                sx={{ color: '#00bcd4', mb: 2, fontWeight: 'bold' }}>
                Алгоритмы обхода графа
              </Typography>

              <Grid container spacing={1.5} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12 }}>
                  <Button
                    fullWidth
                    variant='contained'
                    startIcon={<RouteIcon />}
                    onClick={handleBfs}
                    sx={{
                      bgcolor: '#238636',
                      '&:hover': { bgcolor: '#2ea043' },
                      mb: 1.5,
                    }}>
                    Запустить BFS (Обход в ширину)
                  </Button>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    fullWidth
                    variant='outlined'
                    startIcon={<ShuffleIcon />}
                    onClick={handleDfs}
                    sx={{
                      borderColor: '#30363d',
                      color: '#58a6ff',
                      '&:hover': { borderColor: '#58a6ff' },
                    }}>
                    Запустить DFS (Обход в глубину)
                  </Button>
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant='text'
                color='inherit'
                startIcon={<ReplayIcon />}
                onClick={handleReset}
                sx={{ color: '#8b949e', fontSize: '0.8rem' }}>
                Сбросить обход графа
              </Button>
            </Box>

            <Alert
              severity='info'
              sx={{
                mt: 3,
                bgcolor: 'transparent',
                color: '#8b949e',
                border: '1px solid #30363d',
              }}>
              Графы в Python чаще всего задаются через словари смежности <code>dict</code>, где ключи — вершины, а значения — списки соседей.
            </Alert>
          </Paper>
        </Grid>

        {/* Виртуальная консоль логов и теории */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            sx={{
              p: 3,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography
                variant='subtitle1'
                sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                Виртуальная консоль Python (Логи и теория)
              </Typography>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#238636',
                  alignSelf: 'center',
                }}
              />
            </Box>

            <Box
              sx={{
                flex: 1,
                bgcolor: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: 2,
                p: 2,
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                color: '#8b949e',
                maxHeight: 340,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}>
              {log.map((entry, index) => (
                <Box
                  key={index}
                  sx={{
                    borderBottom: '1px solid #161b22',
                    pb: 1,
                    color: entry.includes('📘') ? '#58a6ff' : '#c9d1d9',
                    whiteSpace: 'pre-wrap',
                  }}>
                  {entry}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default GraphLab