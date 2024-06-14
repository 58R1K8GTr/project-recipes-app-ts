import './styles.css';

function StartRecipeButton({ text }: { text: string }) {
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
