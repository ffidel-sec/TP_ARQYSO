import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import AnimatedRoutes from './components/AnimatedRoutes'

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <AnimatedRoutes />
      </HashRouter>
    </ThemeProvider>
  )
}
