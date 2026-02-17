import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useThemeStore } from './themeSlice'

describe('themeSlice', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'light' })
    vi.stubGlobal('document', {
      documentElement: {
        classList: {
          remove: vi.fn(),
          add: vi.fn(),
        },
      },
    })
  })

  it('should have initial theme as light', () => {
    const { theme } = useThemeStore.getState()
    expect(theme).toBe('light')
  })

  it('should toggle theme', () => {
    const { toggleTheme } = useThemeStore.getState()
    
    toggleTheme()
    expect(useThemeStore.getState().theme).toBe('dark')
    
    toggleTheme()
    expect(useThemeStore.getState().theme).toBe('light')
  })

  it('should set theme', () => {
    const { setTheme } = useThemeStore.getState()
    
    setTheme('dark')
    expect(useThemeStore.getState().theme).toBe('dark')
    
    setTheme('light')
    expect(useThemeStore.getState().theme).toBe('light')
  })
})
