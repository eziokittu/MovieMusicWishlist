import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/pages/Dashboard/Dashboard';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Error from './components/pages/Error';
import MoviesPage from './components/pages/Movies/MoviesPage';
import MusicPage from './components/pages/Music/MusicPage';
import WishlistPage from './components/pages/Wishlist/WishlistPage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='*' element={<Error />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/music' element={<MusicPage />} />
          <Route path='/lists' element={<WishlistPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App