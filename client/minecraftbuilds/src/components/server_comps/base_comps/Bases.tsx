import { useEffect, useState } from "react";
import BaseListing from "./BaseListing";
import "../../../styling/Bases.css";
import ButtonAddBase from "./ButtonAddBase";

import axios from "axios";
// Imports related to parsing the server response
import type { ServerResponse, ServerMessage } from "../../../ServerUtils";
import { parseServerMessage } from "../../../ServerUtils";

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
  // The data received from a server response, used for error handling
  const [serverMessage, setServerMessage] = useState<ServerMessage | undefined>(undefined);

  useEffect(() => {
    async function getBaseList() {
      try {
        const getResponse = await axios.get(`http://localhost:5000/server/${serverID}/bases`);
        const response: ServerResponse = getResponse.data;

        const list: BasePreview[] = response.data.map((baseData: any) => ({
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
        setServerMessage(parseServerMessage(response));
      } catch (error: any) {
        setServerMessage(parseServerMessage(error?.response?.data));
      }
    }

    getBaseList();
  }, []);

  return (
    <div className="bases">
      <div className="options">
        <h1>{serverName} Bases</h1>
      </div>
      <div className="content">
        {/* Display any errors*/}
        {serverMessage?.success === false ? <div className="generic-error"> {serverMessage?.errorMessage} </div> : null}

        <ul className="b-container">
          <li className="b-item" key={"AddBaseListing"}>
            <ButtonAddBase serverName={serverName} serverID={serverID} />
          </li>
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
