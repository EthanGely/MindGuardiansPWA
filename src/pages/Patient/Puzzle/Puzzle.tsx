import { useState } from "react";
import ImageSelection from "./ImageSelection";
import PuzzleGenerator from "./PuzzleGenerator";
import PuzzleGeneratorV2 from "./PuzzleGeneratorV2";
import PuzzleBoard from "./PuzzleBoard";
import PuzzleBoardV2 from "./PuzzleBoard copy";
import PuzzlePiece from "./PuzzlePiece";
import PuzzlePiecesV2 from "./PuzzlePiecesV2";


const Puzzle: React.FC<{ isV2: boolean  }> = ({ isV2 }) => {
    const [image, setImage] = useState<string>("");
    const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
    const [piecesV2, setPiecesV2] = useState<PuzzlePiecesV2[]>([]);
    const [complexity, setComplexity] = useState<[number, number] | []>([]);

    return (
        <div>
          {complexity.length === 0 && (
            <div>
              <label>
                Complexity:
                <input
                  type="number"
                  value={complexity[0]}
                  onChange={(e) => setComplexity([parseInt(e.target.value), parseInt(e.target.value)])}
                />
              </label>
            </div>
          )}
          {!image ? (
            <ImageSelection onImageSelect={setImage} />
          ) : ((isV2 ? piecesV2.length === 0 : pieces.length === 0) ? (
            (isV2 ? <PuzzleGeneratorV2 image={image} complexity={complexity} onGenerate={setPiecesV2} /> : <PuzzleGenerator image={image} complexity={complexity[0]} onGenerate={setPieces} />)
          ) : (
            (isV2 ? <PuzzleBoardV2 pieces={piecesV2} complexity={complexity} /> : <PuzzleBoard pieces={pieces} />)
          ))}
        </div>
      );
}

export default Puzzle;