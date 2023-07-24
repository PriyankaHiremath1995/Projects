import { React, useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useLocation } from "react-router-dom";

import "../styles/Quiz.css";
import Result from "./Result.js";

const Quiz = () => {
  const location = useLocation();
  const { questions, startTime } = location.state;
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [values, setValues] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState();

  const { question, choices, correctAnswer } = questions[activeQuestion];

  useEffect(() => {
    setQuizStartTime(Date.now());
  });

  const onClickNext = () => {
    const nextStartTime = Date.now();
    setSelectedAnswerIndex(null);
    setActiveQuestion((prev) => prev);

    let timeTaken =
      activeQuestion === 0
        ? nextStartTime - startTime
        : nextStartTime - quizStartTime;
    var m = Math.floor(timeTaken / (60 * 60));
    timeTaken = timeTaken - m * 60 * 60;
    var s = Math.floor(timeTaken / 60);
    timeTaken = timeTaken - s * 60;
    var ms = timeTaken;

    const body = {
      question: question,
      answer: choices[selectedAnswerIndex],
      isCorrect: selectedAnswer ? true : false,
      timeTaken: `${m}m:${s}s:${ms}ms`,
    };

    fetch("http://localhost:8000/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      fetch("http://localhost:8000/results")
        .then((res) => {
          if (!res.ok) {
            throw Error("Failed to fetch the data.");
          }
          return res.json();
        })
        .then((result) => {
          setValues(result);
          let correctAnswers = 0;
          let wrongAnswers = 0;

          result.map((eachResult) => {
            if (eachResult.isCorrect) {
              correctAnswers = correctAnswers + 1;
            } else {
              wrongAnswers = wrongAnswers + 1;
            }
          });
          setResult({
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers,
          });
          setActiveQuestion(0);
          setShowResult(true);
          setLoading(false);
          setError(null);
        })
        .catch((err) => {
          setShowResult(true);
          setError(err.message);
          setLoading(false);
        });
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  return (
    <>
      {!showResult ? (
        <div className="quiz-container">
          <div
            style={{
              width: 95,
              height: 100,
              margin: "auto",
              position: "absolute",
              left: "630px",
              top: "50px",
              zIndex: 1,
              background: "white",
              borderRadius: "150px",
            }}
          >
            <CircularProgressbar
              styles={buildStyles({
                pathColor: "#44B77B",
                textColor: "#000000",
              })}
              value={((activeQuestion + 1) / questions.length) * 100}
              text={`${activeQuestion + 1}/${questions.length}`}
            />
          </div>
          <div style={{ paddingTop: "70px" }}>
            <h2>{question}</h2>
            <ul>
              {choices.map((answer, index) => (
                <li
                  onClick={() => onAnswerSelected(answer, index)}
                  key={answer}
                  className={
                    selectedAnswerIndex === index ? "selected-answer" : null
                  }
                  style={{ cursor: "pointer" }}
                >
                  {answer}
                </li>
              ))}
            </ul>
            <button
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}
              style={{ cursor: "pointer" }}
            >
              {activeQuestion === questions.length - 1
                ? "Finish"
                : "Next" + "              🠢"}
            </button>
          </div>
        </div>
      ) : (
        <>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {!loading && !error && (
            <Result
              totalQuestion={questions.length}
              result={result}
              savedResult={values}
            />
          )}
        </>
      )}
    </>
  );
};

export default Quiz;
