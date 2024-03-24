import Scrollbar from './components/scrollbar/scrollbar';
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
          }}
        >
          <Router />
        </Scrollbar>
      </ThemeProvider>
    );
}

export default App
