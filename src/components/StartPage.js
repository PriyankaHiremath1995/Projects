import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/StartPage.css";
import Logo from "../images/LogoNew.png";

const StartPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const startQuiz = () => {
    const startTime = Date.now();
    setLoading(false);
    fetch("http://localhost:8000/questions")
      .then((res) => {
        if (!res.ok) {
          throw Error("Failed to fetch the data.");
        }
        return res.json();
      })
      .then((questions) => {
        navigate("/quiz", { state: { questions, startTime } });
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="card">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <div>{error}</div>
          ) : (
            <>
              <div className="center">
                <img src={Logo} alt="Upraised Logo" width="300" height="90" />
              </div>

              <div className="center_circle" style={{ paddingTop: "70px" }}>
                <div className="circle"> Quiz</div>
              </div>

              <div className="center" style={{ paddingTop: "100px" }}>
                <button
                  className="button"
                  onClick={() => {
                    startQuiz();
                  }}
                >
                  Start
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default StartPage;
