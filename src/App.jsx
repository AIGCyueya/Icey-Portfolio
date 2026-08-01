import React, { useMemo } from 'react';
import './App.css';
import './css/animations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useDarkMode from './hooks/useDarkMode';
import AppContext from './AppContext';
import MainApp from './MainApp';
import ThemePreview from './components/ThemePreview';
import GlobalStyles from './theme/GlobalStyles';
import { lightTheme, darkTheme } from './theme/themes';
import { getPreviewTheme } from './theme/themePresets';

function App() {
  const darkMode = useDarkMode(true);
  const previewTheme = useMemo(() => {
    const id = new URLSearchParams(window.location.search).get('previewTheme');
    return getPreviewTheme(id);
  }, []);

  const activeTheme = useMemo(() => {
    if (previewTheme) return previewTheme;
    return darkMode.value ? darkTheme : lightTheme;
  }, [previewTheme, darkMode.value]);

  const effectiveDarkMode = previewTheme?.forceLight ? { value: false, toggle: darkMode.toggle } : darkMode;

  return (
    <AppContext.Provider value={{ darkMode: effectiveDarkMode }}>
      <ThemeProvider theme={activeTheme}>
        <GlobalStyles />
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/theme-preview" element={<ThemePreview />} />
              <Route path="/*" element={<MainApp />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
