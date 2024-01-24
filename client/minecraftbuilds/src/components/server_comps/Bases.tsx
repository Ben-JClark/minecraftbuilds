import { useEffect, useState } from "react";

interface Props {
  serverName: string;
  serverID: number;
}

type BasePreview = {
  baseId: number;
  baseName: string;
  mainImageUrl: string;
  ownerId: number;
  ownerName: string;
  listedDate: Date;
  xCord: number | undefined;
  yCord: number | undefined;
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
            const baseList: BasePreview[] = data.map((baseData: any) => ({
              baseId: baseData.id,
              baseName: baseData.base_name,
              mainImageUrl: baseData.main_image_url,
              ownerId: baseData.owner_id,
              ownerName: baseData.owner_name,
              listedDate: new Date(baseData.created_at),
              xCord: baseData.x_coordindate,
              yCord: baseData.y_coordindate,
              forSale: baseData.for_sale,
              purchasePrice: baseData.purchase_price,
              purchaseItem: baseData.purchase_item,
              buyerID: baseData.buyer_id,
              buyerName: baseData.buyer_name,
            }));
            setBaseList(baseList);
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
    <>
      <h1>
        Server: {serverName} ID: {serverID} Bases
      </h1>
    </>
  );
}

export default Bases;
