import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { tests } from '../data/testData';

function TestPage({ user }) {
  const { testId } = useParams();
  const navigate = useNavigate();
  const test = tests[testId];

  // If test not found, redirect to home
  if (!test) {
    navigate('/');
    return null;
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(test.duration * 60); // Convert to seconds
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true); // Auto-submit when time is up
          return 0;
        }
        if (prev === 60) {
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 3000);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleSubmit = async (autoSubmit = false) => {
    if (!autoSubmit) {
      if (!window.confirm('Are you sure you want to submit the test?')) return;
    }

    // Calculate score
    let correct = 0;
    test.questions.forEach((q) => {
      if (answers[q.id] === q.correct) correct++;
    });

    const timeTaken = (test.duration * 60) - timeLeft;

    // Store results temporarily in localStorage for demo
    const attemptData = {
      userId: user.uid,
      userName: user.displayName || user.email,
      userEmail: user.email,
      testId: test.id,
      testName: test.name,
      subject: test.subject,
      totalQuestions: test.questions.length,
      correctAnswers: correct,
      score: ((correct / test.questions.length) * 100).toFixed(2),
      timeTaken: timeTaken,
      answers: answers,
      timestamp: new Date().toISOString(),
      completedAt: new Date().toISOString()
    };

    try {
      // Try to save to Firebase if configured
      if (db) {
        const docRef = await addDoc(collection(db, 'testAttempts'), {
          ...attemptData,
          timestamp: serverTimestamp()
        });
        // Also save to localStorage as backup
        localStorage.setItem(`attempt_${docRef.id}`, JSON.stringify(attemptData));
        navigate(`/results/${docRef.id}`);
      } else {
        throw new Error('Firebase not configured');
      }
    } catch (error) {
      console.warn('Firebase not available, saving to localStorage instead:', error);
      // Save to localStorage if Firebase fails
      const localId = `local_${Date.now()}`;
      localStorage.setItem(`attempt_${localId}`, JSON.stringify(attemptData));
      // Also save to a list of attempts
      const attempts = JSON.parse(localStorage.getItem('testAttempts') || '[]');
      attempts.push({ id: localId, ...attemptData });
      localStorage.setItem('testAttempts', JSON.stringify(attempts));
      navigate(`/results/${localId}`);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const question = test.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / test.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Timer */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{test.name}</h1>
              <p className="text-sm text-gray-600">{test.subject}</p>
            </div>
            <div className={`text-center px-6 py-3 rounded-lg ${
              timeLeft < 60 ? 'bg-red-100 animate-pulse' : 'bg-primary-100'
            }`}>
              <div className="text-xs text-gray-600 mb-1">Time Remaining</div>
              <div className={`text-2xl font-bold ${
                timeLeft < 60 ? 'text-red-600' : 'text-primary-600'
              }`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
          <div className="mt-3 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-bounce">
          ⚠️ Only 1 minute remaining!
        </div>
      )}

      {/* Question Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="mb-6">
            <span className="text-sm font-semibold text-primary-600">
              Question {currentQuestion + 1} of {test.questions.length}
            </span>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  answers[question.id] === index
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={answers[question.id] === index}
                  onChange={() => handleAnswer(question.id, index)}
                  className="mr-3"
                />
                <span className="font-medium text-gray-900">{String.fromCharCode(65 + index)}.</span>
                <span className="ml-2 text-gray-700">{option}</span>
              </label>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition"
            >
              ← Previous
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                {Object.keys(answers).length} of {test.questions.length} answered
              </span>
            </div>

            {currentQuestion === test.questions.length - 1 ? (
              <button
                onClick={() => handleSubmit(false)}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-6 py-3 btn-primary"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Question Palette */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Question Palette</h3>
          <div className="grid grid-cols-10 gap-2">
            {test.questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg font-medium transition ${
                  index === currentQuestion
                    ? 'bg-primary-600 text-white'
                    : answers[q.id] !== undefined
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2"></div>
              <span className="text-gray-600">Answered</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-primary-600 rounded mr-2"></div>
              <span className="text-gray-600">Current</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded mr-2"></div>
              <span className="text-gray-600">Not Answered</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TestPage;
