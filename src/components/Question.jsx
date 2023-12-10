/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { useEffect, useState } from "react";

const Question = ({ category, onAnswer, usedQuestions, setUsedQuestions }) => {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`https://the-trivia-api.com/v2/questions?category=${category}`);
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

  const handleAnswer = (option) => {
    onAnswer(option === question?.correct_answer);
  };

  return (
    <div className="question">
      {question && (
        <>
          <h2>{question.category}</h2>
          <p>{question.question.text}</p>
          <ul>
            {question.options &&
              question.options.map((option, index) => (
                <li key={index} onClick={() => handleAnswer(option)}>
                  {option}
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Question;
