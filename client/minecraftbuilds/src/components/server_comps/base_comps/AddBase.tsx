import { FormEvent, useState } from "react";
import ImageInput from "../../form_comps/ImageInput";
import TextInput from "../../form_comps/TextInput";
import NumberInput from "../../form_comps/NumberInput";
import TextAreaInput from "../../form_comps/TextAreaInput";
import RadioInput from "../../form_comps/RadioInput";
import { Link } from "react-router-dom";
import axios from "axios";

// Imports related to parsing the server response
import type { ServerResponse, ServerMessage } from "../../../ServerUtils";
import { parseServerMessage } from "../../../ServerUtils";

type baseFormData = {
  base_name: string;
  base_description: string;
  x_coordinate: number;
  z_coordinate: number;
  for_sale: boolean;
  purchase_price: number;
  purchase_item: string;
  purchase_method: string;
  image_files: File[];
};

interface Props {
  serverName: string;
  serverID: number;
}

function AddBase({ serverName, serverID }: Props) {
  const [formData, setFormData] = useState<baseFormData>({
    base_name: "",
    base_description: "",
    x_coordinate: 0,
    z_coordinate: 0,
    for_sale: false,
    purchase_price: 0,
    purchase_item: "",
    purchase_method: "",
    image_files: [],
  });
  const [serverMessage, setServerMessage] = useState<ServerMessage | undefined>(undefined);

  /**
   * Update the formdata to contain the value entered in the input
   */
  function handleChange(formFeild: string, value: string | number | boolean | File[]) {
    setFormData({
      ...formData,
      [formFeild]: value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      let bodyFormData = new FormData();

      // Append form feilds except for the images array
      for (let [key, value] of Object.entries(formData)) {
        if (key !== "image_files") {
          bodyFormData.append(key, value.toString());
        }
      }

      // Append the form images
      formData.image_files.forEach((file: File) => {
        bodyFormData.append(`image_files`, file);
      });

      const postResponse = await axios.post(`http://localhost:5000/server/${serverID}/bases`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("postResponse: ", postResponse);
      const response: ServerResponse = postResponse.data;
      setServerMessage(parseServerMessage(response));
    } catch (error: any) {
      setServerMessage(parseServerMessage(error?.response?.data));
    }
  }

  return (
    <>
      <div className="options">
        <h1>Add your base to {serverName}</h1>
      </div>
      <div className="content">
        {/* Display a link back to the bases page if form is successfully submitted */}
        {serverMessage?.success ? (
          <div className="success-message">
            <h1>Success</h1>
            <p>Base added to the server</p>
            <p>
              Navigate back to the <Link to={`/server/${serverName}/${serverID}/bases`}>Bases Page</Link>
            </p>
          </div>
        ) : (
          <>
            {/* Display a generic error if no feild is invalid, else ask the user to correct it */}
            {serverMessage?.success === false ? (
              <div className="generic-error">
                {serverMessage?.invalidFeild === undefined ? (
                  <>{serverMessage.errorMessage}</>
                ) : (
                  <>Invalid input in the feild {serverMessage.invalidFeild}</>
                )}
              </div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <section>
                <TextInput
                  label="Give your base a name"
                  feild="base_name"
                  max={32}
                  required={true}
                  onChange={handleChange}
                  error={serverMessage?.invalidFeild === "base_name" ? serverMessage?.errorMessage : null}
                />
                <p>Where is your base located?</p>
                <NumberInput
                  label="X"
                  feild="x_coordinate"
                  required={false}
                  max={8388607}
                  min={-8388607}
                  onChange={handleChange}
                  error={serverMessage?.invalidFeild === "x_coordinate" ? serverMessage?.errorMessage : null}
                />
                <NumberInput
                  label="Z"
                  feild="z_coordinate"
                  required={false}
                  max={8388607}
                  min={-8388607}
                  onChange={handleChange}
                  error={serverMessage?.invalidFeild === "z_coordinate" ? serverMessage?.errorMessage : null}
                />
                <TextAreaInput
                  label="Describe your base"
                  feild="base_description"
                  max={1000}
                  required={false}
                  onChange={handleChange}
                  error={serverMessage?.invalidFeild === "base_description" ? serverMessage?.errorMessage : null}
                />
              </section>
              <section>
                <ImageInput
                  label="Upload some screenshots of your base"
                  feild={"image_files"}
                  required={false}
                  max={5}
                  onChange={handleChange}
                  formImageFiles={formData.image_files}
                  error={serverMessage?.invalidFeild === "image_files" ? serverMessage?.errorMessage : null}
                />
              </section>
              <section>
                <div>Is your base for sale?</div>

                <RadioInput
                  label="Yes"
                  name="for_sale"
                  feild="for_sale_yes"
                  value={true}
                  isChecked={formData.for_sale ? true : false}
                  onChange={handleChange}
                />
                <RadioInput
                  label="No"
                  name="for_sale"
                  feild="for_sale_no"
                  value={false}
                  isChecked={formData.for_sale ? false : true}
                  onChange={handleChange}
                />
                <div className="input-error">
                  {serverMessage?.invalidFeild === "for_sale" ? serverMessage?.errorMessage : null}
                </div>

                {formData.for_sale ? (
                  <>
                    <NumberInput
                      label="How much will your base cost?"
                      feild="purchase_price"
                      required={false}
                      max={65535}
                      min={0}
                      onChange={handleChange}
                      error={serverMessage?.invalidFeild === "purchase_price" ? serverMessage?.errorMessage : null}
                    />

                    <TextInput
                      label="What is the currency?"
                      feild="purchase_item"
                      max={41}
                      required={false}
                      onChange={handleChange}
                      error={serverMessage?.invalidFeild === "purchase_item" ? serverMessage?.errorMessage : null}
                    />

                    <TextAreaInput
                      label="Enter your payment instructions"
                      feild="purchase_method"
                      max={255}
                      required={false}
                      onChange={handleChange}
                      error={serverMessage?.invalidFeild === "purchase_method" ? serverMessage?.errorMessage : null}
                    />
                  </>
                ) : null}
              </section>
              <section>
                <button type="submit">Upload base</button>
              </section>
            </form>
          </>
        )}
      </div>
    </>
  );
}

export default AddBase;
