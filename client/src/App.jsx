import Scrollbar from './components/scrollbar';
import { useScrollToTop } from './hooks/use-scroll-to-top';

import Router from './routes/sections';
import ThemeProvider from './theme';

const App = () => {
  useScrollToTop();

    return (
      <ThemeProvider>
        <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': {
              height: 1,
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Router />
        </Scrollbar>
      </ThemeProvider>
    );
}

export default App
