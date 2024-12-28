import { ThemeProvider } from "src/theme/ThemeContext";
import styled from "styled-components";
import MainScreenPage from "src/features/mainScreen";

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
        <MainScreenPage />
      </Container>
    </ThemeProvider>
  );
}

export default App;
