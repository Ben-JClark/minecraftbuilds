import { Link } from "react-router-dom";

interface Props {
  buttonText: string;
  url: string;
}

function LinkButton({ url, buttonText }: Props) {
  return (
    <Link to={url}>
      <button>{buttonText}</button>
    </Link>
  );
}

export default LinkButton;
