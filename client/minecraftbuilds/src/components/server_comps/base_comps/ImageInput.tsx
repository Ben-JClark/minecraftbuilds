import { ChangeEvent, useState } from "react";
import "../../../styling/ImageInput.css";
import type { BaseImage } from "./AddBase";

interface Props {
  setImageURLs: (imageURL: BaseImage[]) => void;
  imageURLs: BaseImage[];
}

function ImageInput({ setImageURLs, imageURLs }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const newImages: BaseImage[] = [];

      for (let i = 0; i < e.target.files.length; i++) {
        newImages.push({ objectUrl: URL.createObjectURL(e.target.files[i]), filename: e.target.files[i].name });
      }

      setImageURLs([...imageURLs, ...newImages]);
    }
  }

  return (
    <>
      <label htmlFor="image_paths">Upload a screenshots of your base</label>
      <br />
      <input type="file" id="image_paths" name="image_paths" onChange={handleChange}></input>
      <div className="image-preview-container">
        {imageURLs.map((baseImage: BaseImage) => (
          <div key={baseImage.objectUrl}>
            <img className="image-preview" src={baseImage.objectUrl} alt="Base Preview"></img>
            <p className="image-preview-url">{baseImage.filename}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ImageInput;
