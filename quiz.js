const { useState } = React;
const { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle, Award } = lucide;

const ExcelQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      title: "Formules de base",
      question: "Quelle formule renvoie la plus grande valeur d'une plage de cellules ?",
      options: [
        { id: 'A', text: '=SOMME()' },
        { id: 'B', text: '=MOYENNE()' },
        { id: 'C', text: '=MAX()' },
        { id: 'D', text: '=NB()' }
      ],
      correct: 'C'
    },
    {
      id: 2,
      title: "Moyenne bonus",
      question: "La formule =MOYENNE(A1:A5) calcule :",
      options: [
        { id: 'A', text: 'La somme d\'A1 à A5' },
        { id: 'B', text: 'Le nombre de cellules non vides' },
        { id: 'C', text: 'La moyenne des valeurs de A1 à A5' },
        { id: 'D', text: 'Rien, elle renvoie une erreur' }
      ],
      correct: 'C'
    },
    {
      id: 3,
      title: "Autoremplissage",
      question: "Que se passe-t-il si tu fais un double-clic sur la poignée de recopie d'une cellule avec une formule ?",
      options: [
        { id: 'A', text: 'Rien ne se passe' },
        { id: 'B', text: 'La formule est copiée vers le bas jusqu\'à la dernière ligne de la colonne adjacente' },
        { id: 'C', text: 'Excel insère la date du jour' },
        { id: 'D', text: 'Excel remplace la formule par des valeurs' }
      ],
      correct: 'B'
    },
    {
      id: 4,
      title: "Listes personnalisées",
      question: "À quoi servent les listes personnalisées dans Excel ?",
      options: [
        { id: 'A', text: 'À créer des raccourcis clavier' },
        { id: 'B', text: 'À remplir automatiquement des séries spécifiques (ex. : équipes, services)' },
        { id: 'C', text: 'À faire des calculs automatiques' },
        { id: 'D', text: 'À trier les données numériques' }
      ],
      correct: 'B'
    },
    {
      id: 5,
      title: "Références absolues",
      question: "Dans la formule =$A1+B1, laquelle de ces affirmations est vraie ?",
      options: [
        { id: 'A', text: 'La colonne A est figée' },
        { id: 'B', text: 'La ligne 1 est figée' },
        { id: 'C', text: 'Rien n\'est figé' },
        { id: 'D', text: 'La cellule entière est figée' }
      ],
      correct: 'A'
    },
    {
      id: 6,
      title: "Raccourci magique",
      question: "Quel est le raccourci clavier pour faire basculer entre les types de références ($) ?",
      options: [
        { id: 'A', text: 'Ctrl + $' },
        { id: 'B', text: 'Alt + 4' },
        { id: 'C', text: 'F4' },
        { id: 'D', text: 'Shift + Entrée' }
      ],
      correct: 'C'
    },
    {
      id: 7,
      title: "Formule SI",
      question: "Que renvoie cette formule =SI(A1>10;\"OK\";\"Non\") si A1 = 12 ?",
      options: [
        { id: 'A', text: 'OK' },
        { id: 'B', text: 'Non' },
        { id: 'C', text: 'VRAI' },
        { id: 'D', text: 'Faux' }
      ],
      correct: 'A'
    },
    {
      id: 8,
      title: "NB.SI",
      question: "La formule =NB.SI(A1:A10;\">5\") permet de :",
      options: [
        { id: 'A', text: 'Compter les cellules contenant le chiffre 5' },
        { id: 'B', text: 'Compter les cellules vides' },
        { id: 'C', text: 'Compter les cellules supérieures à 5' },
        { id: 'D', text: 'Compter les formules' }
      ],
      correct: 'C'
    },
    {
      id: 9,
      title: "CONCATENER vs JOINDRE.TEXTE",
      question: "Quelle formule est la plus pratique pour combiner plusieurs textes avec un séparateur ?",
      options: [
        { id: 'A', text: '=JOINDRE.TEXTE(\", \"; VRAI; A1:A3)' },
        { id: 'B', text: '=CONCATENER(A1;A2;A3)' },
        { id: 'C', text: '=SOMME(A1:A3)' },
        { id: 'D', text: '=NB(A1:A3)' }
      ],
      correct: 'A'
    },
    {
      id: 10,
      title: "Piège classique",
      question: "Pourquoi la formule =A1+B1 peut donner un mauvais résultat après un autoremplissage vers le bas ?",
      options: [
        { id: 'A', text: 'Parce que la poignée ne fonctionne pas' },
        { id: 'B', text: 'Parce que les cellules ne sont pas vides' },
        { id: 'C', text: 'Parce que la ligne de la formule ne suit pas' },
        { id: 'D', text: 'Parce que la colonne adjacente est vide (donc le remplissage s\'arrête)' }
      ],
      correct: 'D'
    }
  ];

  const handleAnswerSelect = (optionId) => {
    if (showResult) return;
    setSelectedAnswer(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    const newAnswers = { ...answers, [currentQuestion]: selectedAnswer };
    setAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
      setShowResult(!!answers[currentQuestion - 1]);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers({});
    setQuizCompleted(false);
  };

  const getScore = () => {
    return Object.keys(answers).reduce((score, questionIndex) => {
      return score + (answers[questionIndex] === questions[questionIndex].correct ? 1 : 0);
    }, 0);
  };

  const getScorePercentage = () => {
    return Math.round((getScore() / questions.length) * 100);
  };

  if (quizCompleted) {
    const score = getScore();
    const percentage = getScorePercentage();
    
    return React.createElement('div', {
      className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
    }, 
      React.createElement('div', {
        className: "bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center"
      },
        React.createElement('div', { className: "mb-6" },
          React.createElement(Award, { className: "mx-auto h-16 w-16 text-yellow-500 mb-4" }),
          React.createElement('h1', { className: "text-3xl font-bold text-gray-800 mb-2" }, "Quiz terminé !"),
          React.createElement('div', { className: "text-6xl font-bold text-blue-600 mb-2" }, `${percentage}%`),
          React.createElement('p', { className: "text-lg text-gray-600" }, 
            `Vous avez obtenu ${score} sur ${questions.length} bonnes réponses`)
        ),
        React.createElement('div', { className: "mb-8" },
          React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-4" },
            React.createElement('div', {
              className: "bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-1000",
              style: { width: `${percentage}%` }
            })
          )
        ),
        React.createElement('div', { className: "flex justify-center space-x-4" },
          React.createElement('button', {
            onClick: resetQuiz,
            className: "flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          },
            React.createElement(RotateCcw, { className: "h-5 w-5" }),
            React.createElement('span', {}, "Recommencer")
          )
        )
      )
    );
  }

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correct;

  return React.createElement('div', {
    className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
  },
    React.createElement('div', {
      className: "bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full"
    },
      // Header
      React.createElement('div', {
        className: "flex justify-between items-center mb-8"
      },
        React.createElement('div', {
          className: "flex items-center space-x-4"
        },
          React.createElement('div', {
            className: "bg-blue-600 text-white px-4 py-2 rounded-lg font-bold"
          }, "Excel Quiz"),
          React.createElement('div', {
            className: "text-gray-500"
          }, `Question ${currentQuestion + 1} / ${questions.length}`)
        ),
        React.createElement('div', {
          className: "w-64 bg-gray-200 rounded-full h-2"
        },
          React.createElement('div', {
            className: "bg-blue-600 h-2 rounded-full transition-all duration-300",
            style: { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
          })
        )
      ),
      // Question
      React.createElement('div', { className: "mb-8" },
        React.createElement('div', {
          className: "text-sm text-blue-600 font-medium mb-2"
        }, currentQ.title),
        React.createElement('h2', {
          className: "text-2xl font-bold text-gray-800 mb-6"
        }, currentQ.question)
      ),
      // Options
      React.createElement('div', { className: "space-y-4 mb-8" },
        currentQ.options.map((option) => {
          let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";
          
          if (showResult) {
            if (option.id === currentQ.correct) {
              buttonClass += "border-green-500 bg-green-50 text-green-700";
            } else if (option.id === selectedAnswer && option.id !== currentQ.correct) {
              buttonClass += "border-red-500 bg-red-50 text-red-700";
            } else {
              buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
            }
          } else {
            if (selectedAnswer === option.id) {
              buttonClass += "border-blue-500 bg-blue-50 text-blue-700";
            } else {
              buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
            }
          }

          return React.createElement('button', {
            key: option.id,
            onClick: () => handleAnswerSelect(option.id),
            className: buttonClass,
            disabled: showResult
          },
            React.createElement('div', {
              className: "flex items-center justify-between"
            },
              React.createElement('div', {
                className: "flex items-center space-x-3"
              },
                React.createElement('span', {
                  className: "font-bold text-lg"
                }, `${option.id}.`),
                React.createElement('span', {
                  className: "font-medium"
                }, option.text)
              ),
              showResult && option.id === currentQ.correct && 
                React.createElement(CheckCircle, { className: "h-6 w-6 text-green-500" }),
              showResult && option.id === selectedAnswer && option.id !== currentQ.correct && 
                React.createElement(XCircle, { className: "h-6 w-6 text-red-500" })
            )
          );
        })
      ),
      // Result Message
      showResult && React.createElement('div', {
        className: `p-4 rounded-lg mb-8 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`
      },
        React.createElement('div', {
          className: "flex items-center space-x-2"
        },
          isCorrect ? 
            React.createElement(CheckCircle, { className: "h-6 w-6 text-green-600" }) :
            React.createElement(XCircle, { className: "h-6 w-6 text-red-600" }),
          React.createElement('span', {
            className: `font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`
          }, isCorrect ? 'Correct !' : `Incorrect. La bonne réponse est ${currentQ.correct}.`)
        )
      ),
      // Navigation
      React.createElement('div', {
        className: "flex justify-between items-center"
      },
        React.createElement('button', {
          onClick: handlePrevious,
          disabled: currentQuestion === 0,
          className: "flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        },
          React.createElement(ChevronLeft, { className: "h-5 w-5" }),
          React.createElement('span', {}, "Précédent")
        ),
        React.createElement('div', { className: "flex space-x-4" },
          !showResult ? 
            React.createElement('button', {
              onClick: handleSubmitAnswer,
              disabled: !selectedAnswer,
              className: "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
            }, "Valider") :
            React.createElement('button', {
              onClick: handleNext,
              className: "flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            },
              React.createElement('span', {}, 
                currentQuestion === questions.length - 1 ? 'Voir les résultats' : 'Suivant'),
              React.createElement(ChevronRight, { className: "h-5 w-5" })
            )
        )
      )
    )
  );
};

ReactDOM.render(React.createElement(ExcelQuiz), document.getElementById('root'));
