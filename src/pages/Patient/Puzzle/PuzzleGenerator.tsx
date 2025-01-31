import React, { useEffect } from 'react';
import PuzzlePiece from "./PuzzlePiece";

const PuzzleGenerator: React.FC<{ image: string; complexity: number; onGenerate: (pieces: PuzzlePiece[]) => void }> = ({ image, complexity, onGenerate }) => {
  //Generate positions based on complexity
  const generatePositions = (complexity: number) => {
    const positions = [];
    const pieceSize = (complexity / 2) * 100; // Example size
    for (let row = 0; row < complexity; row++) {
      for (let col = 0; col < complexity; col++) {
        positions.push({ x: (col % 2 === 0 ? 2 : -1) * ((col + 1) * pieceSize), y: (row + 1) * pieceSize * 1.5 });
      }
    }
    return positions;
  };

  const positions = generatePositions(complexity);

  
  const generatePuzzlePieces = () => {
  const pieces: PuzzlePiece[] = [];
  const pieceSize = (complexity / 2) * 100; // Example size
  for (let row = 0; row < complexity; row++) {
    for (let col = 0; col < complexity; col++) {
    pieces.push({
      id: row * complexity + col,
      imagePart: `${image}`,
      position: positions.splice(Math.floor(Math.random() * positions.length), 1)[0],
      correctPosition: { x: col * pieceSize, y: row * pieceSize },
      crop: { x: col * pieceSize, y: row * pieceSize },
    });
    }
  }
  onGenerate(pieces);
  };

  useEffect(() => {
  if (image) {
    generatePuzzlePieces();
  }
  }, [image, complexity]);

  if (!image) {
  return null;
  }

  return null;
};

export default PuzzleGenerator;
