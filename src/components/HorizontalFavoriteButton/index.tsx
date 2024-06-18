import { useContext, useState, useEffect } from 'react';
import favoriteButton from '../../images/blackHeartIcon.svg';
import notFavoriteButton from '../../images/whiteHeartIcon.svg';
import DataContext from '../../context/DataContext';
import { FavoriteRecipeType } from '../../types';

type FavoriteButtonProps = {
  isFavorite: boolean;
  id: string;
  testid: string;
};

function HorizontalFavoriteButton({ isFavorite, id, testid }: FavoriteButtonProps) {
  const { setIsUpdatedFavorites } = useContext(DataContext);
  const [isFavorited, setIsFavorited] = useState(isFavorite);

  useEffect(() => {
    setIsFavorited(isFavorite);
  }, [isFavorite]);

  function addOrRemoveFromFavorites() {
    const getFavorites = localStorage.getItem('favoriteRecipes');
    let favoriteList: FavoriteRecipeType[] = getFavorites ? JSON.parse(getFavorites) : [];

    if (isFavorited) {
      favoriteList = favoriteList.filter((favorite) => favorite.id !== id);
    } else {
      const newFavorite: FavoriteRecipeType = {
        id,
        type: window.location.pathname.includes('/meals') ? 'meal' : 'drink',
        nationality: '',
        category: '',
        alcoholicOrNot: '',
        name: '',
        image: '',
      };
      favoriteList.push(newFavorite);
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteList));
    setIsFavorited(!isFavorited);
    setIsUpdatedFavorites(true);
  }

  return (
    <button onClick={ addOrRemoveFromFavorites }>
      <img
        data-testid={ testid }
        src={ isFavorited ? favoriteButton : notFavoriteButton }
        alt={ isFavorited ? 'Unfavorite' : 'Favorite' }
      />
    </button>
  );
}

export default HorizontalFavoriteButton;
