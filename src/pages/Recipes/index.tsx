import { useLocation } from 'react-router-dom';
import Meals from '../../components/Meals';
import Drinks from '../../components/Drinks';
import Footer from '../../components/Footer';

function Recipes() {
  const location = useLocation();

  if (location.pathname === '/meals') {
    return (
      <>
        <Meals />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Drinks />
      <Footer />
    </>
  );
}

export default Recipes;
