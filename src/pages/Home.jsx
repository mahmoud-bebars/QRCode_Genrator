import QrCodeCard from "../components/QrCodeCard";

const Home = () => {
  return (
    <>
      <main className="grid h-screen w-screen place-items-center bg-blue-100 bg-cover">
        <QrCodeCard />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </main>
    </>
  );
};

export default Home;
