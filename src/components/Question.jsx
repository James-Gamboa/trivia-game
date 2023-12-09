/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { useEffect, useState } from 'react';

const Question = ({ onAnswer }) => {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch('https://the-trivia-api.com/v2/questions');
        if (!response.ok) {
          throw new Error('Error fetching question');
        }
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, []);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    onAnswer(option === question?.correct_answer);
  };

  return (
    <div className="question">
      {question && (
        <>
          <h2>{question.category}</h2>
          <p>{question.question}</p>
          <ul>
            {question.options?.map((option, index) => (
              <li key={index} onClick={() => handleAnswer(option)}>
                {option}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Question;