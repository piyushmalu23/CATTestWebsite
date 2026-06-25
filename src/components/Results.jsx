import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { tests } from '../data/testData';

function Results() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [attemptData, setAttemptData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        // Try Firebase first
        if (db) {
          const docRef = doc(db, 'testAttempts', attemptId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setAttemptData(docSnap.data());
            setLoading(false);
            return;
          }
        }

        // Fallback to localStorage
        const localData = localStorage.getItem(`attempt_${attemptId}`);
        if (localData) {
          setAttemptData(JSON.parse(localData));
        }
      } catch (error) {
        console.warn('Error fetching from Firebase, trying localStorage:', error);
        // Try localStorage as fallback
        const localData = localStorage.getItem(`attempt_${attemptId}`);
        if (localData) {
          setAttemptData(JSON.parse(localData));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAttempt();
  }, [attemptId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!attemptData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-gray-600">Results not found</p>
          <button onClick={() => navigate('/')} className="mt-4 btn-primary">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const test = tests[attemptData.testId];
  const percentage = parseFloat(attemptData.score);
  const timeTakenMins = Math.floor(attemptData.timeTaken / 60);
  const timeTakenSecs = attemptData.timeTaken % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Test Results</h1>
          <p className="text-gray-600">{attemptData.testName}</p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <div className="text-center">
              <div className={`w-40 h-40 rounded-full flex items-center justify-center ${
                percentage >= 70 ? 'bg-green-100' : percentage >= 40 ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <div className="text-center">
                  <div className={`text-5xl font-bold ${
                    percentage >= 70 ? 'text-green-600' : percentage >= 40 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {percentage}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Score</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <div>
                <p className="text-gray-600">Correct Answers</p>
                <p className="text-2xl font-bold text-green-600">
                  {attemptData.correctAnswers} / {attemptData.totalQuestions}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Time Taken</p>
                <p className="text-2xl font-bold text-primary-600">
                  {timeTakenMins}m {timeTakenSecs}s
                </p>
              </div>
              <div>
                <p className="text-gray-600">Completed On</p>
                <p className="text-lg font-medium text-gray-700">
                  {new Date(attemptData.completedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Answers */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Review</h2>
          
          <div className="space-y-6">
            {test.questions.map((question, index) => {
              const userAnswer = attemptData.answers[question.id];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={question.id} className={`p-6 rounded-lg border-2 ${
                  isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      Question {index + 1}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>

                  <p className="text-gray-800 mb-4">{question.question}</p>

                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg ${
                          optIndex === question.correct
                            ? 'bg-green-100 border-2 border-green-400'
                            : optIndex === userAnswer && !isCorrect
                            ? 'bg-red-100 border-2 border-red-400'
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        <span className="font-medium">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        <span className="ml-2">{option}</span>
                        {optIndex === question.correct && (
                          <span className="ml-2 text-green-600 font-semibold">✓ Correct Answer</span>
                        )}
                        {optIndex === userAnswer && !isCorrect && (
                          <span className="ml-2 text-red-600 font-semibold">✗ Your Answer</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {question.explanation && (
                    <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                      <p className="text-sm font-semibold text-blue-900 mb-1">Explanation:</p>
                      <p className="text-sm text-blue-800">{question.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/history')}
            className="btn-secondary"
          >
            View History
          </button>
          <button
            onClick={() => navigate(`/test/${attemptData.testId}`)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Retake Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
