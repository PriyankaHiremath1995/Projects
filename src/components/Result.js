import { React } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

import "../styles/Result.css";

const Result = (props) => {
  const { totalQuestion, result } = props;
  const { correctAnswers = 0, wrongAnswers = 0 } = result;
  const navigate = useNavigate();

  const finalResult = (correctAnswers / totalQuestion) * 100;

  const startAgain = () => {
    for (let id = 1; id <= totalQuestion; id++) {
      fetch("http://localhost:8000/results/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("Failed to fetch the data.");
          }
          return res.json();
        })
        .then(() => {
          navigate("/startPage");
        });
    }
  };

  return (
    <div className="result-container">
      <h2>Your Result</h2>
      <div style={{ paddingTop: "20px" }}>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: finalResult >= 50 ? "#5def7f" : "#ef6a6a",
            textColor: finalResult >= 50 ? "#5def7f" : "#ef6a6a",
          })}
          size="md"
          determinate
          value={finalResult}
          text={`${finalResult}%`}
        />
      </div>
      <ul>
        <li style={{ backgroundColor: "#5def7f" }}>{`${correctAnswers} Correct`}</li>
        <li style={{ backgroundColor: "#ef6a6a" }}>{`${wrongAnswers} Wrong`}</li>
      </ul>
      <button className="button" onClick={() => {startAgain()}}>Start Again</button>
    </div>
  );
};

export default Result;
