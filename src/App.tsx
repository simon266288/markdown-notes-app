import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotesList } from './pages/NotesList'
import { EditorPage } from './pages/EditorPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NotesList />} />
        <Route path="/note/:id" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
