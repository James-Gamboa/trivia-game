// @ts-nocheck
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const Question = ({ category, onAnswer, usedQuestions, setUsedQuestions, onNextQuestion }) => {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        let url;
        if (category === "Random") {
          url = "https://the-trivia-api.com/v2/questions";
        } else {
          url = `https://the-trivia-api.com/v2/questions?category=${category.toLowerCase()}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error fetching question");
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          console.error("Invalid data format:", data);
          return;
        }

        const unusedQuestions = data.filter((q) => !usedQuestions.includes(q.id));

        if (unusedQuestions.length === 0) {
          setUsedQuestions([]);
        }

        const randomQuestion = unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
        setQuestion(randomQuestion);
        setUsedQuestions([...usedQuestions, randomQuestion.id]);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    if (!usedQuestions.includes(question?.id)) {
      fetchQuestion();
    }
  }, [category, usedQuestions, question, setUsedQuestions]);

  const handleAnswer = () => {
    if (selectedOption) {
      const isCorrect = selectedOption === question?.correctAnswer;
      onAnswer(isCorrect, question);
      onNextQuestion();
      setSelectedOption(null);
    }
  };

  return (
    <div className="question">
      {question && (
        <>
          <h2>{question.category}</h2>
          <p>{question.question.text}</p>
          <ul>
            {question.incorrectAnswers &&
              question.incorrectAnswers.map((option, index) => (
                <li
                  key={index}
                  className={selectedOption === option ? "selected" : ""}
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                </li>
              ))}
            <li
              className={selectedOption === question.correctAnswer ? "selected" : ""}
              onClick={() => setSelectedOption(question.correctAnswer)}
            >
              {question.correctAnswer}
            </li>
          </ul>
          <button onClick={handleAnswer}>Enviar</button>
        </>
      )}
    </div>
  );
};

export default Question;
