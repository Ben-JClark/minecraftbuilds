import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { rename } from "fs/promises";
import { CustomError } from "./CustomError.js";

// Get the multer middleware instance that provides methods to get data and files from multipart/form-data posts
import multer from "multer";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imagePath = path.resolve(__dirname, "../../public/images/");
const multerInstance = multer({ dest: imagePath });

/**
 * Renames a set of images to the set of filenames in the specified foler.
 * Throws a CustomError(null,null,"message")
 * @param currNames The names of the files that are to be renamed
 * @param newNames The new names of the files
 * @param folder The image folder from the images we are renaming
 */
async function renameImages(
  currNames: string[],
  newNames: string[],
  imageFor: "base" | "shop" | "farm"
): Promise<void> {
  if (currNames.length === newNames.length) {
    try {
      const renamePromises = currNames.map(async (currName: string, i: number) => {
        const currPath = path.resolve(__dirname, `../../public/images/${currName}`);
        const newPath = path.resolve(__dirname, `../../public/images/${imageFor}-${newNames[i]}.png`);
        return rename(currPath, newPath);
      });
      await Promise.all(renamePromises);
    } catch (error) {
      throw new CustomError(null, null, "Error renaming files");
    }
  } else {
    throw new CustomError(null, null, "Error renaming stored images, filenames provided have unequal length");
  }
}

/**
 * Checks if the input is a string array and the length is within the range
 * Throws a CustomError(400,"image_files","message")
 * @param input the file names
 * @param min the minimum number of file names
 * @param max the maximum number of file names
 */
function validFileNames(input: any, min: number, max: number): void {
  if (input !== undefined) {
    if (input !== null) {
      if (Array.isArray(input)) {
        if (input.length >= min) {
          if (input.length <= max) {
            if (input.every((filename) => typeof filename === "string")) {
              return;
            } else {
              throw new CustomError(400, "image_files", "The file names are not all a string");
            }
          } else {
            throw new CustomError(
              400,
              "image_files",
              `You can't upload more than ${max} ${max > 1 ? "files" : "file"} `
            );
          }
        } else {
          throw new CustomError(400, "image_files", `You must at lest upload ${min} ${min > 1 ? "files" : "file"} `);
        }
      } else {
        throw new CustomError(400, "image_files", "The files are not an array");
      }
    } else {
      throw new CustomError(400, "image_files", "The files can't be null");
    }
  } else {
    throw new CustomError(400, "image_files", "The files cannot be undefined");
  }
}

export { multerInstance, path, __dirname, renameImages, validFileNames };
