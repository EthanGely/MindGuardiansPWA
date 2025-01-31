import { useEffect, useState } from "react";
import PuzzlePiece from "./PuzzlePiecesV2";

const PuzzleBoardCopy: React.FC<{ pieces: PuzzlePiece[]; complexity: Array<number> }> = ({ pieces, complexity }) => {
  const [selectedPiece, setSelectedPiece] = useState<PuzzlePiece | null>(null);
  const [currentPieces, setCurrentPieces] = useState(pieces);
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);
  const [error, setError] = useState(0);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);

  const handleDestinationClick = (destination: PuzzlePiece) => {
    let errors = error;

    if (selectedPiece) {
      const newPieces = currentPieces.map((piece) => {
        if (piece === selectedPiece) {
          if (piece.id === destination.id) {
            return { ...piece, isCorrect: true };
          } else {
            errors++;
          }
        }
        return piece;
      });

      if (newPieces.every((piece) => piece.isCorrect)) {
        setPuzzleCompleted(true);
      }
      setSelectedPiece(null);

      setCurrentPieces(newPieces);
      setError(errors);
      return;
    }
    console.log("no selected piece");
  };

  const selectedPiecesLeft = currentPieces.slice(0, Math.ceil(currentPieces.length / 2));
  const selectedPiecesRight = currentPieces.slice(Math.ceil(currentPieces.length / 2));


  useEffect(() => {
    const images = currentPieces.map(piece => piece.image.src);
    const imageElements = images.map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const checkImagesLoaded = () => {
      if (imageElements.every(img => img.complete)) {
        setImageAspectRatio(imageElements[0].width / imageElements[0].height);
      } else {
        setTimeout(checkImagesLoaded, 100);
      }
    };

    checkImagesLoaded();
  }, [currentPieces]);



  return (
    <div className={'pV2' + (puzzleCompleted ? " complete" : "")}>
      <div className="puzzle__wrapper u-align-center">
        <div className="puzzle__left">
          {selectedPiecesLeft.filter((piece) => !piece.isCorrect).map((piece) => (
            <div
              className={"puzzle__piece puzzle__piece--" + (!piece.isCorrect ? "incorrect" : "correct") + (piece === selectedPiece ? " puzzle__piece--selected" : "")}
              key={piece.id}
              onClick={() => {
                setSelectedPiece(piece === selectedPiece ? null : piece);
              }}
              tabIndex={0}
              style={{ aspectRatio: imageAspectRatio }}
            >
              <img src={piece.image.src} alt="" />
            </div>
          ))}
        </div>
        <div className="puzzle__flex-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {Array.from({ length: complexity[1] }).map((_, rowIndex) => (
            <div key={rowIndex} className="puzzle__flex-row" style={{ maxHeight: `calc(100% / ${complexity[1]})` }}>
              {currentPieces.sort((a, b) => a.id - b.id).slice(rowIndex * complexity[0], (rowIndex + 1) * complexity[0]).map((piece) => (
              <div
                className={"puzzle__destination" + (selectedPiece ? " puzzle__destination--selectable" : "")}
                key={piece.id}
                onClick={() => {
                handleDestinationClick(piece);
                }}
                style={{ aspectRatio: imageAspectRatio }}
              >
                {piece.isCorrect && <img src={piece.image.src} alt="" />}
              </div>
              ))}
            </div>
          ))}
        </div>
        
        <div className="puzzle__right">
          {selectedPiecesRight.filter((piece) => !piece.isCorrect).map((piece) => (
            <div
            className={"puzzle__piece puzzle__piece--" + (!piece.isCorrect ? "incorrect" : "correct") + (piece === selectedPiece ? " puzzle__piece--selected" : "")}
              key={piece.id}
              onClick={() => {
                setSelectedPiece(piece === selectedPiece ? null : piece);
              }}
              tabIndex={0}
              style={{ aspectRatio: imageAspectRatio }}
            >
              <img src={piece.image.src} alt="" />
            </div>
          ))}
        </div>
        </div>
        <div className="puzzle__error">Nombre d'erreurs : {error}</div>
        {puzzleCompleted && (
          <div className="puzzle__complete">
            <h2>Puzzle complet !</h2>
            <div className="flex u-align-center u-g-4">
              <button className="button button--primary" onClick={() => window.location.reload()}>
                Rejouer
              </button>
              <button className="button button--primary" onClick={() => (window.location.href = "/patient")}>
                Retour
              </button>
            </div>
          </div>
        )}
      </div>
  );
};

export default PuzzleBoardCopy;
