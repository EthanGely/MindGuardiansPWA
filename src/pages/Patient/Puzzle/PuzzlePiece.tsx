
interface PuzzlePiece {
    id: number;
    imagePart: string; // Data URL or image source for the piece
    position: { x: number; y: number };
    correctPosition: { x: number; y: number };
    crop: { x: number; y: number };
  }

  export default PuzzlePiece;