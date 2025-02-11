import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router";
import { Index as StackOverflow } from "@/components/StackOverflow";
import { Index as AddQuestion } from "@/components/AddQuestion";
import { Index as ViewQuestion } from "@/components/ViewQuestion";

const Forum = () => {
  return (
    <>
      <div className="w-full min-h-[100dvh] bg-back flex items-center justify-center">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          className="md:w-fit"
        />
      </div>
      <Routes>
        <Route path="/" element={<StackOverflow />}></Route>
        <Route path="/add-question" element={<AddQuestion />}></Route>
        <Route path="/question" element={<ViewQuestion />}></Route>
      </Routes>
    </>
  );
};

export default Forum;
