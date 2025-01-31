import { useEffect, useState } from "react";
import JSZip from "jszip";

const ImageSelection: React.FC<{ onImageSelect: (image: string) => void }> = ({ onImageSelect }) => {
  const [imageList, setImageList] = useState<string[]>([]);

  useEffect(() => {

    const fetchImages = async () => {
    const token = localStorage.getItem("jwtToken");
      try {
        const response = await fetch("https://ethan-server.com:8443/downloadImage", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "puzzleDefault" }),
        });
        const blob = await response.blob();
        const zip = await JSZip.loadAsync(blob);
        const imageFiles = Object.keys(zip.files).filter((fileName) => fileName.endsWith(".jpg") || fileName.endsWith(".png"));

        const imagePromises = imageFiles.map(async (fileName) => {
          const file = zip.file(fileName);
          if (file) {
            const fileData = await file.async("blob");
            return URL.createObjectURL(fileData);
          }
          return "";
        });

        const imageUrls = await Promise.all(imagePromises);
        setImageList(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }
    fetchImages();
  }, []);

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.[0]) {
        const reader = new FileReader();
        reader.onload = () => onImageSelect(reader.result as string);
        reader.readAsDataURL(event.target.files[0]);
      }
    };

    const handleImageSelect = (event: React.MouseEvent<HTMLImageElement>) => {
      onImageSelect(event.currentTarget.src);
    };
  
    return (
    <div>
      <label htmlFor="file-upload" className="button button--primary">
        Choisir une image sur votre appareil
      </label>
      <input id="file-upload" type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
      <h2>Images disponibles</h2>
      <div className="image-list">
        {imageList.map((image) => (
          <img className="image-list__item" src={image} alt="puzzle" key={image} onClick={handleImageSelect} />
        ))}
        {!imageList.length && <div>Chargement des images...</div>}
      </div>
    </div>
    );
  };

  export default ImageSelection;