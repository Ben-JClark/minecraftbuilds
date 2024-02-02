import { FormEvent, ChangeEvent, useState } from "react";
import ImageInput from "./ImageInput";
import "../../../styling/AddBase.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

enum MessageType {
  Success,
  Warning,
  Error,
}

type Message = {
  text: string;
  type: MessageType;
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
};

type BaseImage = {
  objectUrl: string;
  filename: string | null;
};

interface Props {
  serverName: string;
  serverID: number;
}

function AddBase({ serverName, serverID }: Props) {
  const [formData, setFormData] = useState<baseFormData>({
    base_name: "",
    base_description: "",
    x_coordinate: -1,
    z_coordinate: -1,
    for_sale: false,
    purchase_price: 0,
    purchase_item: "",
    purchase_method: "",
  });
  const [images, setImages] = useState<BaseImage[]>([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState<Message | null>(null);

  console.log("Images:", images);
  console.log("formData:", formData);

  /**
   * Update the formdata to contain the value entered in the html input element
   * @param e the HTMLInputElement that called this method through the onChange
   */
  function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value !== undefined) {
      if (e.target.value === "true") {
        setFormData({
          ...formData,
          [e.target.name]: true,
        });
      } else if (e.target.value === "false") {
        setFormData({
          ...formData,
          [e.target.name]: false,
        });
      } else {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    }
    console.log(formData);
  }

  function handleIntChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== undefined) {
      setFormData({
        ...formData,
        [e.target.name]: parseInt(e.target.value),
      });
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevents the default form from submitting
    let response;
    try {
      response = await axios.post(`http://localhost:5000/server/${serverName}/${serverID}/bases`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // No error = success, redirect to the base list
      console.log(response);
      if (response.request.status == 201) {
        const newMessage = { text: "Successfully added your base!", type: MessageType.Success };
        setMessage(newMessage);
        //navigate(`/server/${serverName}/${serverID}/bases`);
      } else {
        console.log("error");
      }
    } catch (error: any) {
      if (error.response) {
        console.log("Error posting base to server: ", error.response.data);
        const newMessage = { text: error.response.data.errorMessage, type: MessageType.Error };
        setMessage(newMessage);
      } else {
        console.log("General Error posting base to server: ", error.message);
      }
    }
  }

  // TODO: add required, maxlength to text inputs
  return (
    <>
      <div className="options">
        <h1>Add your base to {serverName}</h1>
      </div>
      <div className="content">
        {/* Display any messages from the server */}
        {message !== null ? <div>{message.text}</div> : null}
        {/* Display form if not successfully submitted*/}
        {message === null || message.type !== MessageType.Success ? (
          <form onSubmit={handleSubmit}>
            <section>
              <label htmlFor="base_name">Give your base a name</label>
              <br />
              <input type="text" id="base_name" name="base_name" onChange={handleChange}></input>
              <br />

              <p>Where is your base located?</p>
              <label htmlFor="x_coordinate">X</label>
              <input type="number" id="x_coordinate" name="x_coordinate" onChange={handleIntChange}></input>
              <label htmlFor="z_coordinate">Z</label>
              <input type="number" id="z_coordinate" name="z_coordinate" onChange={handleIntChange}></input>
              <br />

              <label htmlFor="base_description">Describe your base</label>
              <br />
              <textarea
                className="base-descr-input"
                id="base_description"
                name="base_description"
                onChange={handleChange}
              ></textarea>
            </section>
            <section>
              <ImageInput setImageURLs={setImages} imageURLs={images} />
            </section>
            <section>
              <div>Is your base for sale?</div>
              <label htmlFor="for_sale_yes">Yes</label>
              <input type="radio" id="for_sale_yes" name="for_sale" value={"true"} onChange={handleChange}></input>
              <label htmlFor="for_sale_no">No</label>
              <input
                type="radio"
                id="for_sale_no"
                name="for_sale"
                value={"false"}
                onChange={handleChange}
                defaultChecked
              ></input>
              {formData.for_sale ? (
                <div>
                  <br />
                  <label htmlFor="purchase_price">How much will your base cost?</label>
                  <br />
                  <input type="number" id="purchase_price" name="purchase_price" onChange={handleIntChange}></input>
                  <br />

                  <label htmlFor="purchase_item">What is the currency?</label>
                  <br />
                  <input type="text" id="purchase_item" name="purchase_item" onChange={handleChange}></input>
                  <br />

                  <label htmlFor="purchase_method">Enter your payment instructions</label>
                  <br />
                  <textarea
                    className="base-method-input"
                    id="purchase_method"
                    name="purchase_method"
                    onChange={handleChange}
                  ></textarea>
                  <br />
                </div>
              ) : null}
            </section>
            <section>
              <button type="submit">Upload base</button>
            </section>
          </form>
        ) : (
          <p>
            Navigate back to the <Link to={`/server/${serverName}/${serverID}/bases`}>Bases Page</Link>
          </p>
        )}
      </div>
    </>
  );
}

export default AddBase;
export type { BaseImage };
