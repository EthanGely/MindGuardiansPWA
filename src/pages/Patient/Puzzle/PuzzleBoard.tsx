import { useState } from "react";
import PuzzlePiece from "./PuzzlePiece";

const PuzzleBoard: React.FC<{ pieces: PuzzlePiece[] }> = ({ pieces }) => {
  console.log("Displaying puzzle board");
  
  const [selectedPiece, setSelectedPiece] = useState<PuzzlePiece | null>(null);
  const [currentPieces, setCurrentPieces] = useState(pieces);
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);
  const [error, setError] = useState(0);

  const handleDestinationClick = (destination: PuzzlePiece) => {
    let errors = error;

    if (selectedPiece) {
      const newPieces = currentPieces.map((piece) => {
        if (piece === selectedPiece) {
          if (piece.id === destination.id) {
            return { ...piece, position: destination.correctPosition };
          } else {
              errors++;
          }
        }
        return piece;
      });

      if (newPieces.every((piece) => piece.position === piece.correctPosition)) {
        setPuzzleCompleted(true);
      }
      setSelectedPiece(null);

      setCurrentPieces(newPieces);
      setError(errors);
      return;
    }
    console.log("no selected piece");
  };

  return (
    <div className="puzzle__wrapper u-align-center">
      <div className={puzzleCompleted ? "puzzle puzzle--complete" : "puzzle"} style={{ backgroundImage: `url(${pieces[0].imagePart})` }}>
        {currentPieces.map((piece) => (
          <div
            className={piece.position !== piece.correctPosition ? "puzzle__piece puzzle__piece--incorrect" + (piece === selectedPiece ? " puzzle__piece--selected" : "") : `puzzle__piece puzzle__piece--correct`}
            key={piece.id}
            style={{
              top: piece.position.y,
              left: piece.position.x < 0 ? piece.position.x : "auto",
              right: piece.position.x > 0 ? -piece.position.x : "auto",
              backgroundImage: `url(${piece.imagePart})`,
              backgroundPosition: `-${piece.crop.x}px -${piece.crop.y}px`,
            }}
            draggable
            onClick={() => {
              console.log("piece clicked");
              setSelectedPiece(piece === selectedPiece ? null : piece);
            }}
          />
        ))}
        {currentPieces.map((piece) => (
          <div
            className={piece.position !== piece.correctPosition ? "puzzle__destination" + (selectedPiece ? ' puzzle__destination--selectable' : '') : "puzzle__destination puzzle__destination--correct"}
            key={piece.id}
            style={{
              zIndex: 1,
              gridArea: `${piece.correctPosition.y / 100 + 1} / ${piece.correctPosition.x / 100 + 1}`,
            }}
            onClick={() => handleDestinationClick(piece)}
          />
        ))}
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

export default PuzzleBoard;
