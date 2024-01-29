interface Props {
  serverName: string;
  serverID: number;
}

function AddBase({ serverName, serverID }: Props) {
  async function handleSubmit(e: any) {
    console.log(e);
  }

  // TODO: add required, maxlength to text inputs
  return (
    <>
      <div className="options">
        <h1>Add your base to {serverName}</h1>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="base_name">Give your base a name</label>
            <br />
            <input type="text" id="base_name" name="base_name"></input>
            <br />
            <label htmlFor="base_description">Describe your base</label>
            <br />
            <input type="text" id="base_description" name="base_description"></input>
          </section>
          <section>
            <label htmlFor="upload_screenshot">Upload a screenshot of your base</label>
            <br />
            <input type="file" id="upload_screenshot" name="image"></input>
          </section>
          <section>
            <div>Is your base for sale?</div>
            <label htmlFor="for_sale_yes">Yes</label>
            <input type="radio" id="for_sale_yes" name="for_sale" value="true"></input>
            <label htmlFor="for_sale_no">No</label>
            <input type="radio" id="for_sale_no" name="for_sale" value="false" defaultChecked></input>
          </section>
          <section>
            <button type="submit">Upload base</button>
          </section>
        </form>
      </div>
    </>
  );
}

export default AddBase;
