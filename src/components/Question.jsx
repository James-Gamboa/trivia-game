/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { useEffect, useState } from 'react';

const Question = ({ category, onAnswer }) => {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`https://the-trivia-api.com/v2/questions?category=${category}`);
        if (!response.ok) {
          throw new Error('Error fetching question');
        }
        const data = await response.json();
        const unusedQuestions = data.filter((q) => !usedQuestions.includes(q.id));
        if (unusedQuestions.length === 0) {
          setUsedQuestions([]);
        }
        const randomQuestion = unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
        setQuestion(randomQuestion);
        setUsedQuestions([...usedQuestions, randomQuestion.id]);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, [category, usedQuestions]);

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
            {question.options.map((option, index) => (
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
