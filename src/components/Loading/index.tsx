import { BeatLoader } from 'react-spinners';

function Loading() {
  return (
    <div className="text-center mt-5">
      <h2>Loading</h2>
      <BeatLoader
        color="#e30957"
        size={ 20 }
        aria-label="Loading indicator"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading;
