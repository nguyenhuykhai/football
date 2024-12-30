import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "src/theme/ThemeContext";
import styled from "styled-components";
import MainPage from "./features/mainPage";
import GamePage from "./features/gamePage";

const Container = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  transition: all 0.3s ease;
`;

function App() {
  return (
    <ThemeProvider>
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
