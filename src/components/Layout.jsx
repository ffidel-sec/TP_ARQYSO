import { Outlet } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <ThemeToggle />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <footer className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 dark:from-indigo-950 dark:via-indigo-900 dark:to-indigo-950 text-indigo-200/80 text-center text-sm py-5">
        <div className="max-w-6xl mx-auto px-4">
          <p className="font-medium">TP Arquitectura y Sistemas Operativos — 2026</p>
          <p className="text-xs mt-1 opacity-60">Paginación y Segmentación de la Memoria RAM</p>
        </div>
      </footer>
    </div>
  )
}
