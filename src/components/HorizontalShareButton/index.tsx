import { Dispatch, SetStateAction } from 'react';
import shareIcon from '../../images/shareIcon.svg';

type CopyInfoType = {
  recipeType: string;
  recipeId: string;
};

type ShareButtonPropsType = {
  testid: string;
  copyInfo: CopyInfoType;
  setIsCopied: Dispatch<SetStateAction<boolean>>;
};

function HorizontalShareButton({ testid, copyInfo, setIsCopied }: ShareButtonPropsType) {
  const { recipeType, recipeId } = copyInfo;

  async function copyToClipboard(type: string, id: string) {
    await navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setIsCopied(true);
  }

  return (
    <button onClick={ () => copyToClipboard(recipeType, recipeId) }>
      <img
        data-testid={ testid }
        src={ shareIcon }
        alt="Share"
      />
    </button>
  );
}

export default HorizontalShareButton;
