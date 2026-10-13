import React, {useState} from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
} from '@mui/material'
import {Grid} from '@mui/material' // Ваш стандарт
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import TerminalIcon from '@mui/icons-material/Terminal'
import FolderZipIcon from '@mui/icons-material/FolderZip'
import DescriptionIcon from '@mui/icons-material/Description'
import SlideshowIcon from '@mui/icons-material/Slideshow'
import TableChartIcon from '@mui/icons-material/TableChart'
import ImageIcon from '@mui/icons-material/Image'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import AudioFileIcon from '@mui/icons-material/AudioFile'

// Данные из Таблицы 1
const fileCategories = [
  {
    type: 'Системный файл',
    ext: '.drv, .sys, .cab, .msi, .bak, .lnk, .cpl',
    icon: <TerminalIcon />,
    color: '#757575',
  },
  {
    type: 'Программный файл',
    ext: '.c, .pyw, .pyz, .java, .cpp',
    icon: <InsertDriveFileIcon />,
    color: '#4caf50',
  },
  {
    type: 'Архивный файл',
    ext: '.7z, .rar, .arj, .pkg, .tar, .gz',
    icon: <FolderZipIcon />,
    color: '#ff9800',
  },
  {
    type: 'Текстовый файл',
    ext: '.doc, .docx, .pdf, .txt, .odt, .tex',
    icon: <DescriptionIcon />,
    color: '#2196f3',
  },
  {
    type: 'Презентационный файл',
    ext: '.pps, .ppt, .pptx, .key, .odp',
    icon: <SlideshowIcon />,
    color: '#ff5722',
  },
  {
    type: 'Табличный файл',
    ext: '.xls, .ods, .xlsm, .xlsx',
    icon: <TableChartIcon />,
    color: '#2e7d32',
  },
  {
    type: 'Графический файл',
    ext: '.gif, .png, .jpg, .tiff, .bmp',
    icon: <ImageIcon />,
    color: '#e91e63',
  },
  {
    type: 'Видеофайл',
    ext: '.avi, .mp4, .wmv, .vob, .mpg, .mpeg',
    icon: <VideoLibraryIcon />,
    color: '#9c27b0',
  },
  {
    type: 'Аудиофайл',
    ext: '.mp3, .aif, .wav, .wma, .mpa',
    icon: <AudioFileIcon />,
    color: '#00bcd4',
  },
]

export const FileTypeExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState(fileCategories[3]) // По умолчанию Текстовый файл

  return (
    <Container maxWidth='lg' sx={{py: 6}}>
      <Typography
        variant='h4'
        sx={{fontWeight: 900, mb: 4, textAlign: 'center', color: '#fff'}}>
        Классификация <span style={{color: '#2196f3'}}>типов файлов</span>
      </Typography>

      <Grid container spacing={4}>
        {/* Список категорий (Меню слева) */}
        <Grid size={{xs: 12, md: 5}}>
          <Paper
            sx={{
              p: 2,
              bgcolor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: 3,
            }}>
            <Typography variant='overline' sx={{color: '#8b949e', ml: 1}}>
              Выберите категорию
            </Typography>
            <List>
              {fileCategories.map((item) => (
                <ListItem key={item.type} disablePadding>
                  <ListItemButton
                    onClick={() => setSelectedCategory(item)}
                    selected={selectedCategory.type === item.type}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      '&.Mui-selected': {
                        bgcolor: 'rgba(33, 150, 243, 0.1)',
                        '&:hover': {bgcolor: 'rgba(33, 150, 243, 0.2)'},
                      },
                      '&:hover': {bgcolor: '#1e2633'},
                    }}>
                    <ListItemIcon sx={{color: item.color}}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.type} sx={{color: '#fff'}} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Детальный просмотр выбранной категории */}
        <Grid size={{xs: 12, md: 7}}>
          <Paper
            sx={{
              p: 4,
              bgcolor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 3,
              height: '100%',
            }}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 3}}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: '#0d1117',
                  borderRadius: '50%',
                  color: selectedCategory.color,
                  display: 'flex',
                }}>
                {React.cloneElement(
                  selectedCategory.icon as React.ReactElement<any>,
                  {
                    sx: {fontSize: 40},
                  },
                )}
              </Box>
              <Box>
                <Typography
                  variant='h5'
                  sx={{fontWeight: 'bold', color: '#fff'}}>
                  {selectedCategory.type}
                </Typography>
                <Typography variant='body2' sx={{color: '#8b949e'}}>
                  Расширения этой группы
                </Typography>
              </Box>
            </Box>

            <Divider sx={{borderColor: '#30363d', mb: 3}} />

            <Typography variant='subtitle1' sx={{color: '#fff', mb: 2}}>
              Доступные форматы:
            </Typography>
            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1.5}}>
              {selectedCategory.ext.split(', ').map((ext) => (
                <Chip
                  key={ext}
                  label={ext}
                  sx={{
                    bgcolor: '#0d1117',
                    color: selectedCategory.color,
                    border: `1px solid ${selectedCategory.color}`,
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                  }}
                />
              ))}
            </Box>

            <Box
              sx={{
                mt: 5,
                p: 2,
                bgcolor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 2,
              }}>
              <Typography
                variant='caption'
                sx={{color: '#8b949e', fontStyle: 'italic'}}>
                * Расширение файла сообщает операционной системе, какой
                программой следует открыть данный объект.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
