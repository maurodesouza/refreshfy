import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body, #__next': {
        height: '100%',
      },

      '#__next': {
        px: '5',
      },
      body: {
        bg: 'gray.50',
        color: 'gray.900',
        minHeight: '100vh',
      },
    },
  },
});

export { theme };
