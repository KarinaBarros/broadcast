import { createTheme } from '@mui/material/styles'

export const getTheme = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  return createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',

      primary: {
        main: '#7c4dff',
      },

      background: {
        default: prefersDarkMode
          ? '#09090b'
          : '#ffffff',

        paper: prefersDarkMode
          ? '#18181b'
          : '#ffffff',
      },
    },

    shape: {
      borderRadius: 12,
    },

    typography: {
      fontFamily: 'Inter, sans-serif',
    },
  })
}