import { ToastContainer } from "react-toastify";
import AddQuestion from "../../components/AddQuestion";
// import MainQuestion from "./components/ViewQuestion/MainQuestion"
// import AllQuestions from "./components/StackOverflow/AllQuestions"
import StackOverflow from "@/components/StackOverflow";
import ViewQuestion from "@/components/ViewQuestion";

const Home = () => {
  return (
    <>
      <div className="w-full h-screen  flex items-center justify-center">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          className="md:w-fit"
        />

        <AddQuestion/>
        {/* <MainQuestion/> */}
        {/* <AllQuestions/> */}
        {/* <StackOverflow/> */}
        {/* <ViewQuestion /> */}
      </div>
    </>
  );
};

export default Home;
