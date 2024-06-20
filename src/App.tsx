import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './custom.css';
import { Routes, Route } from 'react-router-dom';
import VLibras from '@djpfs/react-vlibras';
import Login from './pages/Login/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import Recipes from './pages/Recipes';
import Layout from './components/Layout';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <div>
      <VLibras />
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route element={ <Layout /> }>
          <Route path="/meals" element={ <Recipes /> } />
          <Route path="/drinks" element={ <Recipes /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/done-recipes" element={ <DoneRecipes /> } />
          <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        </Route>
        <Route path="/meals/:id" element={ <RecipeDetails /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails /> } />
        <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
        <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
      </Routes>
    </div>
  );
}

export default App;
