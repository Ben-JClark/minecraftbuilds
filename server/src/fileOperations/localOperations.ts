import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { rename } from "fs/promises";
import type { ValidationResult } from "../validation/TypeValidation.js";

// Get the multer middleware instance that provides methods to get data and files from multipart/form-data posts
import multer from "multer";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const baseImagePath = path.resolve(__dirname, "../../uploads/bases/");
const baseMulterInstance = multer({ dest: baseImagePath });

/**
 * Renames a set of images to the set of filenames in the specified foler
 * @param currNames The names of the files that are to be renamed
 * @param newNames The new names of the files
 * @param folder The image folder from the images we are renaming
 * @returns ValidationResult on how the renaming went
 */
async function renameImages(
  currNames: string[],
  newNames: string[],
  folder: "bases" | "shops" | "farms"
): Promise<ValidationResult> {
  let response: ValidationResult = {
    validRequest: false,
    statusCode: 500,
  };

  if (currNames.length === newNames.length) {
    try {
      const renamePromises = currNames.map(async (currName: string, i: number) => {
        const currPath = path.resolve(__dirname, `../../uploads/${folder}/${currName}`);
        const newPath = path.resolve(__dirname, `../../uploads/${folder}/${newNames[i]}`);
        console.log();
        return rename(currPath, newPath);
      });
      await Promise.all(renamePromises);
      // All files renamed successfully
      console.log(`renamed ${currNames.length} files`);
      response.validRequest = true;
    } catch (error) {
      console.log("Error renaming files: ", error);
      response.errorMessage = "Error storing images";
    }
  } else {
    response.errorMessage = "Error renaming stored images, filenames provided have unequal length";
  }
  console.log("response from queries.ts: ", response);
  return response;
}

export { baseMulterInstance, renameImages };
