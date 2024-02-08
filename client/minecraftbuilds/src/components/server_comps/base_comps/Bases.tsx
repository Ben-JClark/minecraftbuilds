import { useEffect, useState } from "react";
import BaseListing from "./BaseListing";
import "../../../styling/Bases.css";
import ButtonAddBase from "./ButtonAddBase";

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

  // When mounting fetch the list of bases from the server
  useEffect(() => {
    async function getBaseList() {
      try {
        const response = await fetch(`http://localhost:5000/server/${serverName}/${serverID}/bases`);
        const data = await response.json();
        if (data.error === undefined) {
          if (Array.isArray(data)) {
            const list: BasePreview[] = data.map((baseData: any) => ({
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
            console.log(list);
            setBaseList(list);
          } else {
            console.log("Error baselist is not in array format");
          }
        } else {
          console.log("Error occured from server when fetching the list of bases", data.error);
        }
      } catch (error) {
        console.log("Error when fetching list of bases: ", error);
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
