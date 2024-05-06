import type { BasePreview } from "./BaseList";
import { timeSince } from "../../ServerListing";
import LinkButton from "../../ui_components/LinkButton";
import "../../../styling/BaseListing.css";

interface Props {
  base: BasePreview;
}

function BaseListing({ base }: Props) {
  return (
    <div className="b-li">
      <div className="b-title">
        <h3>{base.baseName}</h3>
      </div>
      {/* <div className="b-sale">
        <p>{base.forSale ? `For Sale. ${base.purchasePrice} ${base.purchaseItem}` : null}</p>
      </div> */}
      <img
        src={`http://localhost:5000/base-${String(base.mainImageName)}.png`}
        alt={base.baseName}
        className="b-image"
      ></img>
      <div className="b-li-container">
        <div className="b-username">{base.ownerName}</div>
        <LinkButton buttonText="View" url={`${base.baseId}`} />
      </div>

      {/* <div className="b-tags">
        <p>
          Listed by {base.ownerName} {timeSince(base.listedDate)} ago
        </p>
        <p>
          Located {base.xCord} // {base.zCord}
        </p>
      </div> */}
    </div>
  );
}

export default BaseListing;
