import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MainPage from "./pages/MainPage";
import AllDataPage from './pages/AllDataPage';
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/alldata' element={<AllDataPage />} />
          <Route path='/search' element={<SearchPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
