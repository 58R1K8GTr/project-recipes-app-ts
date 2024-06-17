import { Dispatch, SetStateAction } from 'react';
import shareIcon from '../../images/shareIcon.svg';

type CopyInfoType = {
  recipeType: string;
  recipeId: string;
};

type ShareButtonPropsType = {
  index: number;
  copyInfo: CopyInfoType;
  setIsCopied: Dispatch<SetStateAction<boolean>>;
};

function HorizontalShareButton({ index, copyInfo, setIsCopied }: ShareButtonPropsType) {
  const { recipeType, recipeId } = copyInfo;

  function copyToClipboard(type: string, id: string) {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setIsCopied(true);
  }

  return (
    <button onClick={ () => copyToClipboard(recipeType, recipeId) }>
      <img
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="Share"
      />
    </button>
  );
}

export default HorizontalShareButton;
