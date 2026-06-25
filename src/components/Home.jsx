import { useNavigate } from 'react-router-dom';
import { tests } from '../data/testData';

function Home({ user }) {
  const navigate = useNavigate();

  const startTest = (testId) => {
    console.log('Starting test:', testId);
    navigate(`/test/${testId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                🎯 Zeal Prep
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/history')}
                className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition"
              >
                📚 My History
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in">
            Welcome to Zeal Prep! 🎓
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-100">
            Your Gateway to CAT Excellence
          </p>
          <p className="text-lg text-blue-50 max-w-3xl mx-auto mb-8">
            Master the Common Admission Test with our comprehensive practice tests.
            Build confidence, track progress, and achieve your MBA dreams.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">⏱️</span>
              <span>30-Min Timed Tests</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl">📊</span>
              <span>Instant Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl">📈</span>
              <span>Track Progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl">💡</span>
              <span>Detailed Explanations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Practice Test
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each test has a duration of <span className="font-semibold text-primary-600">30 minutes</span>.
            Once started, the timer cannot be paused. Select a test below to begin your preparation.
          </p>
        </div>

        {/* Test Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {Object.values(tests).map((test) => (
            <div key={test.id} className="card hover:scale-105 transition-transform duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-3">
                    {test.subject}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">{test.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl">📝</div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-700">
                  <span className="font-medium mr-2">📊 Questions:</span>
                  <span>{test.questions.length}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium mr-2">⏱️ Duration:</span>
                  <span>{test.duration} minutes</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium mr-2">📚 Topics:</span>
                  <span className="text-sm">
                    {test.id === 'test1' ? 'Arithmetic, Algebra, Geometry' : 'Reading Comprehension, Grammar, Vocabulary'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => startTest(test.id)}
                className="w-full btn-primary"
              >
                Start Test →
              </button>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">📌 Important Instructions</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Each test must be completed within 30 minutes</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>The test will auto-submit when the timer reaches zero</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>You can navigate between questions using the navigation buttons</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Your results will be saved and can be viewed in the History section</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>All test attempts are tracked with timestamps and scores</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Home;
