import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddQuestion = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.username);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const quillModules = {
    toolbar: toolbarOptions,
    clipboard: {
      matchVisual: false,
    },
  };

  const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() !== "" && body.trim() !== "") {
      const bodyJSON = {
        title,
        body,
        tags: JSON.stringify(tags),
        user,
      };

      console.log(bodyJSON);

      try {
        // await axios.post("/api/question", bodyJSON);
        alert("Question added successfully");
      } catch (err) {
        console.error("Error submitting question:", err);
        alert("Failed to submit question. Please try again.");
      }
    } else {
      alert("Title and body are required fields.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      <div
        style={{
          height: "calc(100vh - 80px)",
          marginTop: "80px",
          marginBottom: "90px",
        }}
        className="max-w-3xl w-full mx-auto"
      >
        {/* Header */}
        <div className="bg-gray-800 rounded-2xl p-5 mb-5 shadow-lg">
          <h1 className="text-4xl font-bold text-pri mb-2 text-center">
            Ask a Public Question
          </h1>
          <p className="text-gray-300 text-center">
            Be specific and imagine you’re asking a question to another person.
          </p>
        </div>

        {/* Title Input */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-4 shadow-lg">
          <label className="block text-lg font-semibold text-pri mb-3">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full p-3 border border-pri rounded-lg bg-gray-700 text-pri placeholder-pri focus:ring-2 focus:ring-pri focus:border-pri transition-all text-lg"
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          />
          <small className="text-sm text-gray-400 mt-2">
            Be specific and concise with your question title.
          </small>
        </div>

        {/* Body Input */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-5 shadow-lg">
          <label className="block text-lg font-semibold text-pri mb-2">
            Body
          </label>
          <div className="bg-gray-700 rounded-lg border border-pri">
            <ReactQuill
              value={body}
              onChange={setBody}
              modules={quillModules}
              formats={quillFormats}
              theme="snow"
              className="text-pri text-lg"
              placeholder="Include all the information someone would need to answer your question."
            />
          </div>
          <small className="text-sm text-gray-400 mt-2">
            Provide detailed information to get the best answers.
          </small>
        </div>

        {/* Tags Input */}
        <div className="bg-gray-800 rounded-2xl p-5 mb-2 shadow-lg">
          <label className="block text-lg font-semibold text-pri mb-2">
            Tags
          </label>
          <div className="w-full p-3 border border-pri rounded-lg bg-gray-700 text-pri placeholder-pri focus:ring-2 focus:ring-pri focus:border-pri transition-all text-lg">
            <TagsInput
              value={tags}
              onChange={setTags}
              name="tags"
              placeHolder="Press enter to add a new tag"
            />
          </div>
          <small className="text-sm text-gray-400 mt-2">
            Add up to 5 tags to describe what your question is about.
          </small>
        </div>

        {/* Submit Button */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-lg">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-pri to-blue-600 text-white px-6 py-3 rounded-lg font-bold uppercase hover:from-pri-dark hover:to-blue-700 transition-all shadow-lg text-lg"
          >
            Add Your Question
          </button>
        </div>

        {/* Custom CSS for Quill Icons (Unchanged) */}
        <style>
          {`
            .ql-toolbar.ql-snow {
              border: 1px solid #6d28d9 !important; /* Purple border */
              border-radius: 8px 8px 0 0;
              background-color: #374151; /* Gray-700 */
            }
            .ql-container.ql-snow {
              border: 1px solid #6d28d9 !important; /* Purple border */
              border-radius: 0 0 8px 8px;
              background-color: #374151; /* Gray-700 */
            }
            .ql-snow .ql-stroke {
              stroke: #d8b4fe !important; /* Light purple for icons */
            }
            .ql-snow .ql-fill {
              fill: #d8b4fe !important; /* Light purple for icons */
            }
            .ql-snow .ql-picker {
              color: #d8b4fe !important; /* Light purple for picker text */
            }
            .ql-editor {
              font-size: 1.125rem; /* text-lg */
              color: #e9d5ff; /* Light purple for text */
            }
            .ql-editor.ql-blank::before {
              color: #9ca3af; /* Gray-400 for placeholder */
              font-size: 1.125rem; /* text-lg */
              font-style: normal !important;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default AddQuestion;
