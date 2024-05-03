import { Link } from "react-router-dom";
import "../../styling/LinkButton.css";

interface Props {
  buttonText: string;
  url: string;
}

function LinkButton({ url, buttonText }: Props) {
  return (
    <Link to={url}>
      <button className="link-button">{buttonText}</button>
    </Link>
  );
}

export default LinkButton;
