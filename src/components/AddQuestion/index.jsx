import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";

import axios from "axios";
import { TagsInput } from "react-tag-input-component";
import { useNavigate } from "react-router-dom";

const AddQuestion = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data safely
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored && stored.username) {
      setUser(stored.username);
    } else {
      console.error("No user found in localStorage");
    }
  }, []);

  // Quill toolbar configuration
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
        tag: JSON.stringify(tag),
        user,
      };

      try {
        await axios.post("/api/question", bodyJSON);
        alert("Question added successfully");
        navigate("/");
      } catch (err) {
        console.error("Error submitting question:", err);
      }
    } else {
      alert("Title and body are required fields.");
    }
  };

  return (
    <div className="add-question">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            {/* Title Input */}
            <div className="question-option">
              <div className="title">
                <h3>Title</h3>
                <small>
                  Be specific and imagine you’re asking a question to another
                  person.
                </small>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                />
              </div>
            </div>

            {/* Body Input */}
            <div className="question-option">
              <div className="title">
                <h3>Body</h3>
                <small>
                  Include all the information someone would need to answer your
                  question.
                </small>
                <ReactQuill
                  value={body}
                  onChange={setBody}
                  modules={quillModules}
                  formats={quillFormats}
                  className="react-quill"
                  theme="snow"
                />
              </div>
            </div>

            {/* Tags Input */}
            <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <small>
                  Add up to 5 tags to describe what your question is about.
                </small>
                <TagsInput
                  value={tag}
                  onChange={setTag}
                  placeHolder="Press enter to add a new tag"
                />
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleSubmit} className="button">
          Add your question
        </button>
      </div>
    </div>
  );
};

export default AddQuestion;
