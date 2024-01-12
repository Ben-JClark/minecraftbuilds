interface Props {
  serverName: string;
}

function Home({ serverName }: Props) {
  return (
    <>
      <h1>{serverName} Home</h1>
    </>
  );
}

export default Home;
