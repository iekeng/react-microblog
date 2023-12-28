import {BrowserRouter, Routes, Route, Navigate} from react-router-dom;
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import FeedPage from './pages/FeedPage';
import ExplorePage from './pages/ExplorePage';

function App() {
    return (
      <>
      <Container fluid className="App">
        <Header />
        <Routes>
          <Route path="/" element={<FeedPage />}/>
          <Route path="/explore" element={<LoginPage/>}/>
          <Route path="/page" element={<ExplorePage />}/>
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
    </Container>
    </>
  );
}

export default App;
