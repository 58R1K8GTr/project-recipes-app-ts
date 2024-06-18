import './styles.css';

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
      className="card bg-color recipe-card"
    >
      <img
        src={ recipeImage }
        data-testid={ `${index}-card-img` }
        alt=""
        className="card-img-top"
      />

      <p
        data-testid={ `${index}-card-name` }
        className="card-text m-1"
      >
        {recipeName}
      </p>

    </div>
  );
}

export default RecipeCard;
