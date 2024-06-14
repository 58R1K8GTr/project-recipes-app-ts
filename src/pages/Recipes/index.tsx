import { useLocation } from 'react-router-dom';
import Meals from '../../components/Meals';
import Drinks from '../../components/Drinks';
import Footer from '../../components/Footer';

function Recipes() {
  const location = useLocation();

  return (
    <>
      { location.pathname === '/meals' ? <Meals /> : <Drinks /> }
      <Footer />
    </>
  );
}

export default Recipes;
