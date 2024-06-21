export const getFormattedInstructions = (text: string | undefined) => {
  if (!text) return;
  const capitalizedInstructions = text.charAt(0).toUpperCase() + text.slice(1);

  const sentenceEndings = /(?<=[.?!])\s*/;
  const formattedInstructions = capitalizedInstructions
    .split(sentenceEndings)
    .map((sentence, index) => (
      <li key={ index }>
        {sentence.trim().endsWith('.') ? sentence.trim() : `${sentence.trim()}.`}
      </li>
    ));

  return formattedInstructions;
};
