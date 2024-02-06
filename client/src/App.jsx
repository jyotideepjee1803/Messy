import { useScrollToTop } from './hooks/use-scroll-to-top';

import Router from './routes/sections';
import ThemeProvider from './theme';

const App = () => {
  useScrollToTop();

    return (
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    );
}

export default App
