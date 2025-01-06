import { useState } from "react";
import ImageSelection from "./ImageSelection";
import PuzzleGenerator from "./PuzzleGenerator";
import PuzzleBoard from "./PuzzleBoard";
import PuzzlePiece from "./PuzzlePiece";

const Puzzle: React.FC = () => {
    const [image, setImage] = useState<string>("");
    const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
    return (
        <div>
          {!image ? (
            <ImageSelection onImageSelect={setImage} />
          ) : (pieces.length === 0 ? (
              <PuzzleGenerator image={image} complexity={2} onGenerate={setPieces} />
          ) : (
            <PuzzleBoard pieces={pieces} />
          ))}
        </div>
      );
}

export default Puzzle;