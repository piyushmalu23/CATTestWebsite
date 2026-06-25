import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

function History({ user }) {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        let attemptsData = [];

        // Try Firebase first
        if (db) {
          try {
            const q = query(
              collection(db, 'testAttempts'),
              orderBy('timestamp', 'desc')
            );

            const querySnapshot = await getDocs(q);
            attemptsData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
          } catch (fbError) {
            console.warn('Firebase not available, using localStorage');
          }
        }

        // Also get from localStorage
        const localAttempts = JSON.parse(localStorage.getItem('testAttempts') || '[]');

        // Merge and sort by timestamp
        const allAttempts = [...attemptsData, ...localAttempts]
          .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

        setAttempts(allAttempts);
      } catch (error) {
        console.error('Error fetching history:', error);
        // Fallback to localStorage only
        const localAttempts = JSON.parse(localStorage.getItem('testAttempts') || '[]');
        setAttempts(localAttempts);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">📚 Test History</h1>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {attempts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No test attempts yet</h2>
            <p className="text-gray-600 mb-6">Start taking tests to see your history here!</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Take a Test
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Attempts: <span className="text-primary-600">{attempts.length}</span>
              </h2>
            </div>

            <div className="grid gap-6">
              {attempts.map((attempt) => {
                const percentage = parseFloat(attempt.score);
                const timeTaken = Math.floor(attempt.timeTaken / 60);
                
                return (
                  <div
                    key={attempt.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer"
                    onClick={() => navigate(`/results/${attempt.id}`)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                            {attempt.subject}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            percentage >= 70
                              ? 'bg-green-100 text-green-700'
                              : percentage >= 40
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {percentage}% Score
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {attempt.testName}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Completed on {new Date(attempt.completedAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-6 text-center">
                        <div>
                          <p className="text-2xl font-bold text-green-600">
                            {attempt.correctAnswers}
                          </p>
                          <p className="text-xs text-gray-600">Correct</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-red-600">
                            {attempt.totalQuestions - attempt.correctAnswers}
                          </p>
                          <p className="text-xs text-gray-600">Incorrect</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-primary-600">
                            {timeTaken}m
                          </p>
                          <p className="text-xs text-gray-600">Time</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <span className="text-primary-600 font-medium">View Details →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default History;
