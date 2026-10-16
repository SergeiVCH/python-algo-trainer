import Container from '@mui/material/Container'
import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'

import { FunctionsAndProceduresVisualizer } from '../10/FunctionsAndProceduresVisualizer/FunctionsAndProceduresVisualizer'
import { StringFunctionsLab } from '../10/StringFunctionsLab/StringFunctionsLab'
import { StringLab } from '../10/StringLab/StringLab'
import { PythonArithmetic } from '../6/III/PythonArithmetic/PythonArithmetic'
import { PythonTypes } from '../6/III/PythonTypes/PythonTypes'
import { FileTypeExplorer } from '../7/I/FileTypeExplorer/FileTypeExplorer'
import { PythonBranchingLab } from '../7/III/PythonBranchingLab/PythonBranchingLab'
import { PythonComparisonLab } from '../7/III/PythonComparisonLab/PythonComparisonLab'
import { PythonFilesLab } from '../7/III/PythonFilesLab/PythonFilesLab'
import { PythonIfVisualizer } from '../7/III/PythonIfVisualizer/PythonIfVisualizer'
import { PythonLifeLogic } from '../7/III/PythonLogicLab/PythonLogicLab'
import { PythonTracer } from '../8/II/PythonTracer/PythonTracer'
import { ForLoopVisualizer } from '../8/III/ForLoopVisualizer/ForLoopVisualizer'
import { LoopBreakLab } from '../8/III/LoopBreakLab/LoopBreakLab'
import { LoopContinueLab } from '../8/III/LoopContinueLab/LoopContinueLab'
import { WhileLoopVisualizer } from '../8/III/WhileLoopVisualizer/WhileLoopVisualizer'
import { ArraySearchComponent } from '../9/III/ArraySearchComponent/ArraySearchComponent'
import { ArraySwapComponent } from '../9/III/ArraySwapComponent/ArraySwapComponent'
import { ListMethodsComponent } from '../9/III/ListMethodsComponent/ListMethodsComponent'
import { SortingVisualizer } from '../9/III/SortingVisualizer/SortingVisualizer'
import { TwoDimensionalArrayComponent } from '../9/III/TwoDimensionalArrayComponent/TwoDimensionalArrayComponent'
import { PygameAnimationComponent } from '../9/IV/PygameAnimationComponent/PygameAnimationComponent'
import { PygameGraphicsComponent } from '../9/IV/PygameGraphicsComponent/PygameGraphicsComponent'
import { PygameIntroComponent } from '../9/IV/PygameIntroComponent/PygameIntroComponent'
import { BackButton } from '../BackButton/BackButton'
import { HomeMenu } from '../HomeMenu/HomeMenu'

export const AnimatedRoutes = () => {
  const location = useLocation() // Получаем текущий путь (например, "/logic")

  return (
    <AnimatePresence mode='wait'>
      {/* key={location.pathname} заставляет React перерисовывать Routes при каждом переходе */}
      <Routes location={location} key={location.pathname}>
        <Route
          path='/'
          element={
            <PageWrapper>
              <HomeMenu />
            </PageWrapper>
          }
        />
        // 6 класс
        <Route
          path='/python-types'
          element={
            <PageWrapper>
              <PythonTypes />
            </PageWrapper>
          }
        />
        <Route
          path='/python-arithmetic'
          element={
            <PageWrapper>
              <PythonArithmetic />
            </PageWrapper>
          }
        />
        // 7
        <Route
          path='/file-types'
          element={
            <PageWrapper>
              <FileTypeExplorer />
            </PageWrapper>
          }
        />
        <Route
          path='/python-files'
          element={
            <PageWrapper>
              <PythonFilesLab />
            </PageWrapper>
          }
        />
        <Route
          path='/python-if-visualizer'
          element={
            <PageWrapper>
              <PythonIfVisualizer />
            </PageWrapper>
          }
        />
        <Route
          path='/python-branching'
          element={
            <PageWrapper>
              <PythonBranchingLab />
            </PageWrapper>
          }
        />
        <Route
          path='/python-comparison'
          element={
            <PageWrapper>
              <PythonComparisonLab />
            </PageWrapper>
          }
        />
        <Route
          path='/complex-conditions'
          element={
            <PageWrapper>
              <PythonLifeLogic />
            </PageWrapper>
          }
        />
        // 8
        <Route
          path='/python-while'
          element={
            <PageWrapper>
              <WhileLoopVisualizer />
            </PageWrapper>
          }
        />
        <Route
          path='/python-for'
          element={
            <PageWrapper>
              <ForLoopVisualizer />
            </PageWrapper>
          }
        />
        <Route
          path='/python-continue'
          element={
            <PageWrapper>
              <LoopContinueLab />
            </PageWrapper>
          }
        />
        <Route
          path='/python-break'
          element={
            <PageWrapper>
              <LoopBreakLab />
            </PageWrapper>
          }
        />
        <Route
          path='/python-trace'
          element={
            <PageWrapper>
              <PythonTracer />
            </PageWrapper>
          }
        />
        // 9
        <Route
          path='/arrays'
          element={
            <PageWrapper>
              <ArraySwapComponent />
            </PageWrapper>
          }
        />
        <Route
          path='/array-search'
          element={
            <PageWrapper>
              <ArraySearchComponent />
            </PageWrapper>
          }
        />
        <Route
          path='/array-swap'
          element={
            <PageWrapper>
              <ArraySwapComponent />
            </PageWrapper>
          }
        />
        <Route
          path='/2d-arrays'
          element={
            <PageWrapper>
              <TwoDimensionalArrayComponent />
            </PageWrapper>
          }
        />
        <Route
          path='/sorting'
          element={
            <PageWrapper>
              <SortingVisualizer />
            </PageWrapper>
          }
        />
        <Route
          path='/list-methods'
          element={
            <PageWrapper>
              <ListMethodsComponent />
            </PageWrapper>
          }
        />
        <Route
          path='/pygame-intro'
          element={
            <PageWrapper>
              <PygameIntroComponent />
            </PageWrapper>
          }
        />
        <Route
          path='/pygame-graphics'
          element={
            <PageWrapper>
              <PygameGraphicsComponent />
            </PageWrapper>
          }
        />
        <Route
          path='/pygame-animation'
          element={
            <PageWrapper>
              <PygameAnimationComponent />
            </PageWrapper>
          }
        />
        // 10
        <Route
          path='/python-functions'
          element={
            <PageWrapper>
              <FunctionsAndProceduresVisualizer />
            </PageWrapper>
          }
        />
        <Route
          path='/string-lab'
          element={
            <PageWrapper>
              <StringLab />
            </PageWrapper>
          }
        />
        <Route
          path='/string-functions-lab'
          element={
            <PageWrapper>
              <StringFunctionsLab />
            </PageWrapper>
          }
        />
        <Route
          path='/python-files-lab'
          element={
            <PageWrapper>
              <PythonFilesLab />
            </PageWrapper>
          }
        />
       
      </Routes>
    </AnimatePresence>
  )
}

const PageWrapper = ({children}: {children: React.ReactNode}) => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <motion.div
      initial={{opacity: 0, y: 10}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: -10}}
      transition={{duration: 0.3}}>
      <Container maxWidth='xl' sx={{pt: 3}}>
        {/* Кнопка показывается везде, кроме главной страницы */}
        {!isHomePage && <BackButton />}

        {children}
      </Container>
    </motion.div>
  )
}
