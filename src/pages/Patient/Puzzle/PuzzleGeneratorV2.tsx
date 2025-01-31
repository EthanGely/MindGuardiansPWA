import React, { useEffect } from "react";
import PuzzlePiece from "./PuzzlePiecesV2";

const PuzzleGenerator: React.FC<{ image: string; complexity: Array<number>; onGenerate: (pieces: PuzzlePiece[]) => void }> = ({ image, complexity, onGenerate }) => {
  const generatePuzzlePieces = (complexity: Array<number>) => {
    console.log("Generating puzzle pieces V2");
    console.log("Image: " + image);

    // get the image width and height
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const imageWidth = img.width;
      const imageHeight = img.height;

      const pieceWidth = imageWidth / complexity[0];
      const pieceHeight = imageHeight / complexity[1];

      console.log("piece width: " + pieceWidth);
      console.log("piece height: " + pieceHeight);

      const pieces: PuzzlePiece[] = [];
      let id = 0;
      console.log("Got here");

      for (let y = 0; y < complexity[1]; y++) {
        for (let x = 0; x < complexity[0]; x++) {
          const canvas = document.createElement("canvas");
          canvas.width = pieceWidth;
          canvas.height = pieceHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, -x * pieceWidth, -y * pieceHeight);
            const piece = new Image();
            piece.src = canvas.toDataURL();
            pieces.push({ id: id++, image: piece, isCorrect: false });
          }
        }
      }

      pieces.sort(() => Math.random() - 0.5);

      onGenerate(pieces);
    };
  };

  useEffect(() => {
    if (image) {
        console.log("Generating puzzle pieces");
        
        generatePuzzlePieces(complexity);
    }
    }, [image, complexity]);

  if (!image) {
    return null;
  }

  return null;
};

export default PuzzleGenerator;
