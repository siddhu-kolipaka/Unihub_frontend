import { useEffect, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HistoryIcon from "@mui/icons-material/History";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import "./index.css";
import { useSelector } from "react-redux";

function MainQuestion() {
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [
      { color: ["#ff0000", "#00ff00", "#0000ff", "#220055"] },
      { background: [] },
    ],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const Editor = {
    modules: {
      syntax: false,
      toolbar: toolbarOptions,
      clipboard: { matchVisual: false },
    },
    formats: [
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
    ],
  };

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");

  const [questionData, setQuestionData] = useState();
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.auth.user);

  const handleQuill = (value) => setAnswer(value);

  useEffect(() => {
    async function getFunctionDetails() {
      try {
        const res = await axios.get(`/api/question/${id}`);
        setQuestionData(res.data[0]);
      } catch (err) {
        console.error(err);
      }
    }
    getFunctionDetails();
  }, [id]);

  async function getUpdatedAnswer() {
    try {
      const res = await axios.get(`/api/question/${id}`);
      setQuestionData(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = async () => {
    const body = { question_id: id, answer, user };
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      await axios.post("/api/answer", body, config);
      alert("Answer added successfully");
      setAnswer("");
      getUpdatedAnswer();
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async () => {
    if (comment.trim()) {
      const body = { question_id: id, comment, user };
      try {
        await axios.post(`/api/comment/${id}`, body);
        setComment("");
        setShow(false);
        getUpdatedAnswer();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">
            {questionData?.title || "Loading..."}
          </h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <div className="info">
            <p>
              Asked{" "}
              <span>
                {new Date(
                  questionData?.created_at || Date.now()
                ).toLocaleString()}
              </span>
            </p>
            <p>
              Active <span>today</span>
            </p>
            <p>
              Viewed <span>43 times</span>
            </p>
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">▲</p>
                <p className="arrow">0</p>
                <p className="arrow">▼</p>
                <BookmarkIcon />
                <HistoryIcon />
              </div>
            </div>
            <div className="question-answer">
              <p>{parse(questionData?.body || "")}</p>
              <div className="author">
                <small>
                  asked{" "}
                  {new Date(
                    questionData?.created_at || Date.now()
                  ).toLocaleString()}
                </small>
                <div className="auth-details">
                  <p>{questionData?.user?.displayName || "Anonymous"}</p>
                </div>
              </div>
              <div className="comments">
                <div className="comment">
                  {questionData?.comments?.map((_qd) => (
                    <p key={_qd?._id}>
                      {_qd.comment}{" "}
                      <span>- {_qd.user?.displayName || "Anonymous"}</span>
                      <small>
                        {new Date(
                          _qd.created_at || Date.now()
                        ).toLocaleString()}
                      </small>
                    </p>
                  ))}
                </div>
                <p onClick={() => setShow(!show)}>Add a comment</p>
                {show && (
                  <div className="title">
                    <textarea
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add your comment..."
                      rows={5}
                    />
                    <button
                      onClick={handleComment}
                      style={{ maxWidth: "fit-content" }}
                    >
                      Add comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="all-questions" style={{ flexDirection: "column" }}>
          <p
            style={{
              marginBottom: "20px",
              fontSize: "1.3rem",
              fontWeight: "300",
            }}
          >
            {questionData?.answerDetails?.length || 0} Answers
          </p>
          {questionData?.answerDetails?.map((_q) => (
            <div
              key={_q._id}
              className="all-questions-container"
              style={{ borderBottom: "1px solid #eee" }}
            >
              <div className="all-questions-left">
                <div className="all-options">
                  <p className="arrow">▲</p>
                  <p className="arrow">0</p>
                  <p className="arrow">▼</p>
                  <BookmarkIcon />
                  <HistoryIcon />
                </div>
              </div>
              <div className="question-answer">
                {parse(_q.answer || "")}
                <div className="author">
                  <small>
                    answered{" "}
                    {new Date(_q.created_at || Date.now()).toLocaleString()}
                  </small>
                  <div className="auth-details">
                    <p>{_q.user?.displayName || "Anonymous"}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="main-answer">
        <h3 style={{ fontSize: "22px", margin: "10px 0", fontWeight: "400" }}>
          Your Answer
        </h3>
        <ReactQuill
          value={answer}
          onChange={handleQuill}
          modules={Editor.modules}
          theme="snow"
          style={{ height: "200px" }}
        />
      </div>
      <button
        onClick={handleSubmit}
        style={{ marginTop: "100px", maxWidth: "fit-content" }}
      >
        Post your answer
      </button>
    </div>
  );
}

export default MainQuestion;
