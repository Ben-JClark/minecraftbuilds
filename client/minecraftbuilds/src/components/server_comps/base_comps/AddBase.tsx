import { FormEvent, useState } from "react";
import ImageInput from "../../form_comps/ImageInput";
import TextInput from "../../form_comps/TextInput";
import NumberInput from "../../form_comps/NumberInput";
import TextAreaInput from "../../form_comps/TextAreaInput";
import RadioInput from "../../form_comps/RadioInput";
import { Link } from "react-router-dom";
import axios from "axios";

enum MessageType {
  Success,
  Warning,
  Error,
}

type Message = {
  text: string;
  type: MessageType;
  element: string | null;
};

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
  const [message, setMessage] = useState<Message | null>(null);

  console.log("formData:", formData);

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
    let response;
    try {
      let bodyFormData = new FormData();

      // Append form feilds except for the images array
      for (let [key, value] of Object.entries(formData)) {
        if (key !== "image_files") {
          bodyFormData.append(key, value.toString());
        }
      }

      // Append the form images
      formData.image_files.forEach((file: File, index: number) => {
        bodyFormData.append(`image_files`, file);
      });

      console.log("bodyFormData: ", bodyFormData);

      response = await axios.post(`http://localhost:5000/server/${serverID}/bases`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // No error = success, redirect to the base list
      if (response.request.status === 201) {
        const newMessage: Message = { text: "Successfully added your base!", type: MessageType.Success, element: null };
        setMessage(newMessage);
      } else {
        console.log("Error: no error from server didn't get expected 201 status code");
      }
    } catch (error: any) {
      if (error.response) {
        console.log("Error posting base to server: ", error.response.data);
        const newMessage: Message = {
          text: error.response.data.errorMessage,
          type: MessageType.Error,
          element: error.response.data.invalidFeild,
        };
        setMessage(newMessage);
      } else {
        console.log("General Error posting base to server: ", error.message);
      }
    }
  }

  return (
    <>
      <div className="options">
        <h1>Add your base to {serverName}</h1>
      </div>
      <div className="content">
        {/* Display a link back to the bases page if form is successfully submitted */}
        {message?.type === MessageType.Success ? (
          <div className="success-message">
            <h1>{message.text}</h1>
            <p>
              Navigate back to the <Link to={`/server/${serverName}/${serverID}/bases`}>Bases Page</Link>
            </p>
          </div>
        ) : (
          <>
            {/* Display any general errors (errors not addressed to any element) */}
            <div className="server-error">
              {message?.type === MessageType.Error && message?.element === undefined ? message.text : null}
            </div>
            <form onSubmit={handleSubmit}>
              <section>
                <TextInput
                  label="Give your base a name"
                  feild="base_name"
                  max={32}
                  required={true}
                  onChange={handleChange}
                  error={message?.element === "base_name" ? message.text : null}
                />
                <p>Where is your base located?</p>
                <NumberInput
                  label="X"
                  feild="x_coordinate"
                  required={false}
                  max={8388607}
                  min={-8388607}
                  onChange={handleChange}
                  error={message?.element === "x_coordinate" ? message.text : null}
                />
                <NumberInput
                  label="Z"
                  feild="z_coordinate"
                  required={false}
                  max={8388607}
                  min={-8388607}
                  onChange={handleChange}
                  error={message?.element === "z_coordinate" ? message.text : null}
                />
                <TextAreaInput
                  label="Describe your base"
                  feild="base_description"
                  max={1000}
                  required={false}
                  onChange={handleChange}
                  error={message?.element === "base_description" ? message.text : null}
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
                  error={message?.element === "image_files" ? message.text : null}
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
                <div className="input-error">{message?.element === "for_sale" ? message.text : null}</div>

                {formData.for_sale ? (
                  <>
                    <NumberInput
                      label="How much will your base cost?"
                      feild="purchase_price"
                      required={false}
                      max={65535}
                      min={0}
                      onChange={handleChange}
                      error={message?.element === "purchase_price" ? message.text : null}
                    />

                    <TextInput
                      label="What is the currency?"
                      feild="purchase_item"
                      max={41}
                      required={false}
                      onChange={handleChange}
                      error={message?.element === "purchase_item" ? message.text : null}
                    />

                    <TextAreaInput
                      label="Enter your payment instructions"
                      feild="purchase_method"
                      max={255}
                      required={false}
                      onChange={handleChange}
                      error={message?.element === "purchase_method" ? message.text : null}
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
