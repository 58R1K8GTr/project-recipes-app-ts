import './styles.css';

function StartRecipeButton({ text }) {
  return (
    <button
      data-testid="start-recipe-btn"
      className="start_button"
    >
      {`${text} Recipe`}
    </button>
  );
}

export default StartRecipeButton;
