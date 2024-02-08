import { ChangeEvent, useState } from "react";
import "../../../styling/ImageInput.css";

type Image = {
  url: string;
  filename: string;
};

interface Props {
  label: string;
  feild: string;
  required: boolean;
  max: number;
  onChange: (formFeild: string, value: File[]) => void;
  formImageFiles: File[];
  error: string | null;
}

function ImageInput({ label, feild, required, max, onChange, formImageFiles, error }: Props) {
  const [images, setImages] = useState<Image[]>([]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const newImages: Image[] = []; // newImages stores the images for display
      const newFormImageFiles: File[] = []; // newFormImages is the image urls stored in the form

      for (let i = 0; i < e.target.files.length; i++) {
        newImages.push({ url: URL.createObjectURL(e.target.files[i]), filename: e.target.files[i].name });
        newFormImageFiles.push(e.target.files[i]);
      }

      setImages([...images, ...newImages]);
      onChange(feild, [...formImageFiles, ...newFormImageFiles]);
    }
  }

  return (
    <>
      <label htmlFor={feild}>{label}</label>
      <br />
      <input type="file" id={feild} name={feild} onChange={handleChange}></input>
      <div className="image-preview-container">
        {images.map((image: Image) => (
          <div key={image.url}>
            <img className="image-preview" src={image.url} alt={image.filename}></img>
            <p className="image-preview-url">{image.filename}</p>
          </div>
        ))}
      </div>
      <div className="input-error">{error}</div>
    </>
  );
}

export default ImageInput;
