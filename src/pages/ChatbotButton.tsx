import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { chatbox, person } from 'ionicons/icons';
import './ChatbotButton.css';

const ChatbotButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const predefinedQuestionsAndAnswers = [
    {
      question: '¿Dónde puedo solicitar una asesoría?',
      answer: 'Puedes solicitar una asesoría en la sección "Calendario" o haciendo clic aquí: [Enlace] (Las asesorías están sujetas a cupos).',
    },
    {
      question: '¿Donde puedo inscribir cursos?',
      answer: 'Los cursos se pueden inscribir en la sección "Cursos" o haciendo clic aquí: [Enlace] (Los cursos están sujetos a cupos) .',
    },
    {
      question: '¿Como puedo postear en el foro?',
      answer: 'Esta caracteristica aún no está disponible',
    },
    {
      question: '¿Como actualizo mi dirección de correo?',
      answer: 'Aún se está implementando esta funcionalidad, por ahora no se puede.',
    },
    {
      question: '¿a1?',
      answer: '2',
    },
  ];

  const handleQuestionClick = (question: string) => {
    // Mostrar la pregunta seleccionada
    setCurrentQuestion(question);
  };

  useEffect(() => {
    // Restablecer la pregunta actual cuando el chat se cierra
    if (!isChatOpen) {
      setCurrentQuestion(null);
    }
  }, [isChatOpen]);

  return (
    <div className={`chatbot-button ${isChatOpen ? 'open' : ''}`}>
      <IonIcon className="icon" aria-hidden="true" icon={chatbox} onClick={toggleChat} />
      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-questions">
            {currentQuestion ? (
              // Mostrar respuesta si se hizo clic en una pregunta
              <div className="question-and-answer">
                <p className="question">{currentQuestion}</p>
                <IonIcon className="chat-icon" aria-hidden="true" icon={person}/><b className="question">Asistente:</b>
                <p className="typewriter monospace big-caret lorem">
                {predefinedQuestionsAndAnswers.find(item => item.question === currentQuestion)?.answer}</p>
                <button className="new-query-button" onClick={() => setCurrentQuestion(null)}>Hacer otra consulta</button>
              </div>
            ) : (
              // Mostrar lista de preguntas si no se ha hecho clic en ninguna
              predefinedQuestionsAndAnswers.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(item.question)}
                >
                  {item.question}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotButton;
