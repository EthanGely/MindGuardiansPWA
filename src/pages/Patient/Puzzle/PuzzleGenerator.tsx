import React, { useEffect } from 'react';
import PuzzlePiece from "./PuzzlePiece";

const positions = [
  { x: -200, y: 0 },
  { x: 200, y: 0 },
  { x: 200, y: 200 },
  { x: -200, y: 200 },
];

const PuzzleGenerator: React.FC<{ image: string; complexity: number; onGenerate: (pieces: PuzzlePiece[]) => void }> = ({ image, complexity, onGenerate }) => {
  const generatePuzzlePieces = () => {
  const pieces: PuzzlePiece[] = [];
  const pieceSize = 100; // Example size
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
