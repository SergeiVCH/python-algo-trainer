import {
    Alert,
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    Paper,
    Table, TableBody, TableCell,
    TableContainer, TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { useState } from 'react';
// Иконки
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import SaveIcon from '@mui/icons-material/Save';

export const TableProcessor = () => {
  // Начальные данные таблицы
  const [tableData, setTableData] = useState([
    ['№', 'Наименование товара', 'Кол-во', 'Цена'],
    ['1', 'Монитор', '2', '15000'],
    ['2', 'Клавиатура', '5', '1200'],
  ]);

  const [isHeaderBold, setIsHeaderBold] = useState(true);

  // Изменение текста в ячейке
  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  // Добавление строки
  const addRow = () => {
    const newRow = Array(tableData[0].length).fill('');
    setTableData([...tableData, newRow]);
  };

  // Удаление строки (кроме первой)
  const removeRow = (index: number) => {
    if (tableData.length > 1) {
      setTableData(tableData.filter((_, i) => i !== index));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: '#2c3e50' }}>
        📄 Редактор таблиц: Отчет по закупкам
      </Typography>

      <Paper sx={{ p: 0, borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
        {/* Панель инструментов (Toolbar) */}
        <Box sx={{ p: 1, bgcolor: '#f8f9fa', borderBottom: '1px solid #ddd', display: 'flex', gap: 1 }}>
          <Tooltip title="Жирный заголовок">
            <IconButton 
              color={isHeaderBold ? "primary" : "default"} 
              onClick={() => setIsHeaderBold(!isHeaderBold)}
            >
              <FormatBoldIcon />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem />
          <Button startIcon={<AddIcon />} size="small" onClick={addRow}>
            Добавить строку
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button startIcon={<SaveIcon />} variant="contained" size="small" color="success">
            Сохранить
          </Button>
        </Box>

        {/* Рабочая область таблицы */}
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {tableData[0].map((cell, colIndex) => (
                  <TableCell 
                    key={colIndex} 
                    sx={{ 
                      fontWeight: isHeaderBold ? 900 : 400, 
                      bgcolor: '#f1f3f4',
                      borderRight: '1px solid #ddd'
                    }}
                  >
                    <TextField
                      variant="standard"
                      fullWidth
                      value={cell}
                      onChange={(e) => handleCellChange(0, colIndex, e.target.value)}
                      InputProps={{ disableUnderline: true, sx: { fontWeight: 'inherit' } }}
                    />
                  </TableCell>
                ))}
                <TableCell sx={{ bgcolor: '#f1f3f4', width: 50 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.slice(1).map((row, rowIndex) => (
                <TableRow key={rowIndex + 1} hover>
                  {row.map((cell, colIndex) => (
                    <TableCell key={colIndex} sx={{ borderRight: '1px solid #eee', p: 1 }}>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={cell}
                        onChange={(e) => handleCellChange(rowIndex + 1, colIndex, e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      />
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <IconButton size="small" color="error" onClick={() => removeRow(rowIndex + 1)}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Подсказка для ученика */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <b>Задание:</b> Добавьте в таблицу третью строку с товаром «Мышь», количеством «10» и ценой «500».
      </Alert>
    </Container>
  );
};