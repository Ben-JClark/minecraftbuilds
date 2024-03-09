import LinkButton from "./LinkButton";

interface Props {
  message: string;
  buttonText: string;
  url: string;
}

function SuccessMessage({ message, buttonText, url }: Props) {
  return (
    <>
      <p>{message}</p>
      <LinkButton buttonText={buttonText} url={url} />
    </>
  );
}

export default SuccessMessage;
