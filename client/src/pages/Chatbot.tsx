import React, { useState, useEffect } from 'react';
import './Chatbot.css';

const Chatbot: React.FC = () => {
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [isTyping, setIsTyping] = useState(false);

  const questionsAndAnswers = [
    { question: '¿Dónde puedo encontrar información sobre los cursos?', answer: 'Puede encontrar información sobre los cursos en la sección "Cursos".' },
    { question: '¿Cuál es el horario de atención?', answer: 'Nuestro horario de atención es de lunes a viernes de 9:00 AM a 5:00 PM.' },
    // Agrega más preguntas y respuestas aquí
  ];

  const typeAnswer = (question: string, answer: string) => {
    setIsTyping(true);

    // Simular la escritura letra por letra
    let currentText = '';
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      currentText += answer[currentIndex];
      setResponses((prevResponses) => ({ ...prevResponses, [question]: currentText }));
      currentIndex++;

      if (currentIndex >= answer.length) {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 50); // Controla la velocidad de escritura ajustando el intervalo
  };

  return (
    <div className="chatbot-container">
      <div id="chat-container" className="chat-container">
        {questionsAndAnswers.map((item, index) => (
          <div key={index} className="chatbot-message">
            <button className="chatbot-question" onClick={() => typeAnswer(item.question, item.answer)}>
              {item.question}
            </button>
            {isTyping ? (
              <div className="chatbot-answer-typing">
                <span className="typing-animation">Escribiendo...</span>
              </div>
            ) : (
              <div className="chatbot-answer">
                {responses[item.question]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
