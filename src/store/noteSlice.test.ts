import { describe, it, expect, beforeEach } from 'vitest'
import { useNoteStore } from './noteSlice'

describe('noteSlice', () => {
  beforeEach(() => {
    useNoteStore.setState({ notes: [], isLoaded: true })
  })

  it('should add a note', () => {
    const { addNote } = useNoteStore.getState()
    const newNote = addNote('Test Title', 'Test Content')
    
    expect(newNote.title).toBe('Test Title')
    expect(newNote.content).toBe('Test Content')
    expect(newNote.id).toBeDefined()
    expect(useNoteStore.getState().notes.length).toBe(1)
  })

  it('should update a note', () => {
    const { addNote, updateNote } = useNoteStore.getState()
    const newNote = addNote('Original Title', 'Original Content')
    
    const updated = updateNote(newNote.id, { title: 'Updated Title' })
    
    expect(updated).not.toBeNull()
    expect(updated?.title).toBe('Updated Title')
    expect(updated?.content).toBe('Original Content')
  })

  it('should delete a note', () => {
    const { addNote, deleteNote } = useNoteStore.getState()
    const newNote = addNote('Test', 'Content')
    
    expect(useNoteStore.getState().notes.length).toBe(1)
    
    const result = deleteNote(newNote.id)
    
    expect(result).toBe(true)
    expect(useNoteStore.getState().notes.length).toBe(0)
  })

  it('should get note by id', () => {
    const { addNote, getNoteById } = useNoteStore.getState()
    const newNote = addNote('Test', 'Content')
    
    const found = getNoteById(newNote.id)
    expect(found).not.toBeNull()
    expect(found?.title).toBe('Test')
    
    const notFound = getNoteById('non-existent-id')
    expect(notFound).toBeNull()
  })
})
