import { useEffect, useState } from "react";
import BaseListing from "./BaseListing";
import "../../../styling/Bases.css";
import LinkButton from "../../ui_components/LinkButton";
import axios, { AxiosError } from "axios";

type ServerError = {
  feild: string | null;
  message: string | null;
};

interface Props {
  serverName: string;
  serverID: number;
}

type BasePreview = {
  baseId: number;
  baseName: string;
  mainImageName: string | number;
  ownerId: number;
  ownerName: string;
  listedDate: Date;
  xCord: number | undefined;
  zCord: number | undefined;
  forSale: boolean | undefined;
  purchasePrice: number | undefined;
  purchaseItem: string | undefined;
  buyerID: number | undefined;
  buyerName: string | undefined;
};

function Bases({ serverName, serverID }: Props) {
  const [baseList, setBaseList] = useState<BasePreview[]>([]);
  const [serverError, setServerError] = useState<ServerError | null>(null);

  useEffect(() => {
    async function getBaseList() {
      try {
        const getResponse = await axios.get(`http://localhost:5000/servers/${serverID}/bases`);
        // const response: ServerResponse = getResponse.data;

        const list: BasePreview[] = getResponse.data.map((baseData: any) => ({
          baseId: baseData.id,
          baseName: baseData.base_name,
          mainImageName: baseData.main_image_name,
          ownerId: baseData.owner_id,
          ownerName: baseData.owner_username,
          listedDate: new Date(baseData.created_at),
          xCord: baseData.x_coordinate,
          zCord: baseData.z_coordinate,
          forSale: baseData.for_sale,
          purchasePrice: baseData.purchase_price,
          purchaseItem: baseData.purchase_item,
          buyerID: baseData.buyer_id,
          buyerName: baseData.buyer_username,
        }));
        setBaseList(list);
        setServerError(null);
      } catch (error: unknown) {
        if (
          error instanceof AxiosError &&
          error.response &&
          "feild" in error.response.data &&
          "message" in error.response.data
        ) {
          setServerError({ feild: error.response.data.feild, message: error.response.data.message });
        } else {
          setServerError({ feild: null, message: "Something went wrong" });
        }
      }
    }

    getBaseList();
  }, []);

  return (
    <div className="bases">
      <div className="options">
        <h1>{serverName} Bases</h1>
        <LinkButton buttonText="Add base" url={`/server/${serverName}/${serverID}/bases/add`} />
      </div>
      <div className="content">
        {/* Display any errors*/}
        {serverError !== null ? (
          <div className="generic-error">
            {serverError.feild} {serverError.message}{" "}
          </div>
        ) : null}
        <ul className="b-container">
          {baseList.map((base: BasePreview) => (
            <li className="b-item" key={base.baseId}>
              <BaseListing base={base} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Bases;
export type { BasePreview };
