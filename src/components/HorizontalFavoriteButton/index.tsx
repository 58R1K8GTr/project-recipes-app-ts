import { useContext, useState, useEffect } from 'react';
import favoriteButton from '../../images/blackHeartIcon.svg';
import notFavoriteButton from '../../images/whiteHeartIcon.svg';
import DataContext from '../../context/DataContext';
import { FavoriteRecipeType } from '../../types';

type FavoriteButtonProps = {
  isFavorite: boolean;
  id: string;
  testid: string;
  recipeDetails: FavoriteRecipeType;
};

function HorizontalFavoriteButton(
  { isFavorite, id, testid, recipeDetails }: FavoriteButtonProps,
) {
  const { setIsUpdatedFavorites } = useContext(DataContext);
  const [isFavorited, setIsFavorited] = useState(isFavorite);

  useEffect(() => {
    const getFavorites = localStorage.getItem('favoriteRecipes');
    if (getFavorites) {
      const favoriteList: FavoriteRecipeType[] = JSON.parse(getFavorites);
      const isAlreadyFavorited = favoriteList.some((favorite) => favorite.id === id);
      setIsFavorited(isAlreadyFavorited);
    } else {
      setIsFavorited(false);
    }
  }, [id]);

  function addOrRemoveFromFavorites() {
    const getFavorites = localStorage.getItem('favoriteRecipes');
    let favoriteList: FavoriteRecipeType[] = getFavorites ? JSON.parse(getFavorites) : [];

    if (isFavorited) {
      favoriteList = favoriteList.filter((favorite) => favorite.id !== id);
    } else {
      const newFavorite: FavoriteRecipeType = recipeDetails;
      favoriteList.push(newFavorite);
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteList));
    setIsFavorited(!isFavorited);
    setIsUpdatedFavorites(true);
  }

  return (
    <button onClick={ addOrRemoveFromFavorites } className="button_control">
      <img
        data-testid={ testid }
        src={ isFavorited ? favoriteButton : notFavoriteButton }
        className="favorite_btn"
        alt="favoritar"
      />
    </button>
  );
}

export default HorizontalFavoriteButton;
