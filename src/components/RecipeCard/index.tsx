type CardPropType = {
  recipeName: string;
  recipeImage: string;
  index: number;
};

function RecipeCard({ cardInfo }: { cardInfo: CardPropType }) {
  const { recipeName, recipeImage, index } = cardInfo;

  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ recipeImage }
        data-testid={ `${index}-card-img` }
        alt=""
        style={ { width: '100%' } }
      />
      <p data-testid={ `${index}-card-name` }>{recipeName}</p>
    </div>
  );
}

export default RecipeCard;
