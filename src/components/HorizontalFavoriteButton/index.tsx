import { useContext } from 'react';
import favoriteButton from '../../images/blackHeartIcon.svg';
import notFavoriteButton from '../../images/whiteHeartIcon.svg';
import DataContext from '../../context/DataContext';
import { FavoriteRecipeType } from '../../types';

type FavoriteButtonProps = {
  isFavorite: boolean;
  id: string;
  testid: string; // inseri testid como prop
};

function HorizontalFavoriteButton({
  isFavorite, id, testid }: FavoriteButtonProps) {
  const { setIsUpdatedFavorites } = useContext(DataContext);
  const getFavorites = localStorage.getItem('favoriteRecipes');

  function addOrRemoveFromFavorites() {
    if (getFavorites) {
      const favoriteList = JSON.parse(getFavorites);
      const newFavorites = favoriteList
        .filter((favorite: FavoriteRecipeType) => favorite.id !== id);

      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setIsUpdatedFavorites(true);
    }
  }

  return (
    <button onClick={ addOrRemoveFromFavorites }>
      <img
        data-testid={ testid } // testid dinamico
        src={ isFavorite ? favoriteButton : notFavoriteButton }
        alt="Favorite"
      />
    </button>
  );
}

export default HorizontalFavoriteButton;
