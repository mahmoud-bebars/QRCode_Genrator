import QrCodeCard from "../components/QrCodeCard";

const Home = () => {
  return (
    <>
      <main className="grid h-screen w-screen place-items-center bg-white bg-cover bg-[url('https://images.unsplash.com/photo-1550482768-88b710a445fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] ">
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        <QrCodeCard />
      </main>
    </>
  );
};

export default Home;
