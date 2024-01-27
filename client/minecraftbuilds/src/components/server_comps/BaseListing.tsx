import type { BasePreview } from "./Bases";
import "../../styling/BaseListing.css";

interface Props {
  base: BasePreview;
}

function BaseListing({ base }: Props) {
  const handleClick = () => {
    console.log("You selected: ", base.baseName);
  };

  return (
    <div onClick={handleClick} className="b-button">
      <div className="b-title">
        <h2>{base.baseName}</h2>
      </div>
      <div className="b-sale">
        <p>{base.forSale ? `For Sale. ${base.purchasePrice} ${base.purchaseItem}` : null}</p>
      </div>
      <div className="b-image"></div>
      <div className="b-tags">
        <p>Listed by {base.ownerName}</p>
        <p>
          Located {base.xCord} // {base.zCord}
        </p>
      </div>
    </div>
  );
}

export default BaseListing;
