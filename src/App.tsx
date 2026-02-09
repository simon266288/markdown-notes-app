import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotesList } from './pages/NotesList'
import { EditorPage } from './pages/EditorPage'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NotesList />} />
          <Route path="/note/:id" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
