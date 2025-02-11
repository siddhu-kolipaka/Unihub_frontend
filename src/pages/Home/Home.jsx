import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  return (
    <>
      <div className="w-full h-screen bg-back flex items-center justify-center">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          className="md:w-fit"
        />
      </div>
    </>
  );
};

export default Home;
