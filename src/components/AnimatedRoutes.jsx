import { useLocation, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './Layout'
import Home from '../pages/Home'
import TemaPage from '../pages/TemaPage'
import SubTemaPage from '../pages/SubTemaPage'

export default function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tema/:slug" element={<TemaPage />} />
            <Route path="/subtema/:subSlug" element={<SubTemaPage />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}
