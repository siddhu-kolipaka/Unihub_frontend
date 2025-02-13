import FilterListIcon from "@mui/icons-material/FilterList";
import AllQuestions from "./AllQuestions";
import { Link } from "react-router-dom";

function Main({ questions }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Top Section - Header and Ask Question Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-purple-400">All Questions</h2>
          <Link to="/add-question">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold uppercase hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg">
              Ask Question
            </button>
          </Link>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex justify-between items-center">
            <p className="text-gray-300">{questions.length} questions</p>
            <div className="flex items-center space-x-6">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Newest
                </Link>
                <Link
                  to="/"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Active
                </Link>
                <Link
                  to="/"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  More
                </Link>
              </div>
              <div className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors cursor-pointer">
                <FilterListIcon />
                <p>Filter</p>
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {questions?.map((_q, index) => (
            <div key={`sebrhtbrVRR${index}`}>
              <AllQuestions data={_q} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;