import { useContext } from 'react';
import favoriteButton from '../../images/blackHeartIcon.svg';
import notFavoriteButton from '../../images/whiteHeartIcon.svg';
import DataContext from '../../context/DataContext';
import { FavoriteRecipeType } from '../../types';

type FavoriteButtonProps = {
  index: number;
  isFavorite: boolean;
  id: string;
};

function HorizontalFavoriteButton({
  index, isFavorite, id }: FavoriteButtonProps) {
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
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ isFavorite ? favoriteButton : notFavoriteButton }
        alt="Favorite"
      />
    </button>
  );
}

export default HorizontalFavoriteButton;
