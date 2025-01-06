const ImageSelection: React.FC<{ onImageSelect: (image: string) => void }> = ({ onImageSelect }) => {
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.[0]) {
        const reader = new FileReader();
        reader.onload = () => onImageSelect(reader.result as string);
        reader.readAsDataURL(event.target.files[0]);
      }
    };
  
    return (
    <div>
      <label htmlFor="file-upload" className="button button--primary">
        Choisir une image sur votre appareil
      </label>
      <input id="file-upload" type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
    </div>
    );
  };

  export default ImageSelection;