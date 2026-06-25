export const tests = {
  test1: {
    id: 'test1',
    name: 'Quantitative Aptitude - Sample Test 1',
    subject: 'Quantitative Aptitude',
    duration: 30, // minutes
    questions: [
      {
        id: 1,
        question: "If a car travels at 60 km/h for 2 hours and then at 80 km/h for 3 hours, what is the average speed for the entire journey?",
        options: [
          "68 km/h",
          "70 km/h",
          "72 km/h",
          "75 km/h"
        ],
        correct: 2,
        explanation: "Total distance = (60×2) + (80×3) = 120 + 240 = 360 km. Total time = 2 + 3 = 5 hours. Average speed = 360/5 = 72 km/h"
      },
      {
        id: 2,
        question: "A shopkeeper marks his goods 40% above cost price and gives a discount of 20%. What is his profit percentage?",
        options: [
          "10%",
          "12%",
          "15%",
          "20%"
        ],
        correct: 1,
        explanation: "Let CP = 100. MP = 140. SP = 140 × 0.8 = 112. Profit = 12%"
      },
      {
        id: 3,
        question: "What is the value of (√64 + √36) × 2?",
        options: [
          "20",
          "24",
          "28",
          "32"
        ],
        correct: 2,
        explanation: "(8 + 6) × 2 = 14 × 2 = 28"
      },
      {
        id: 4,
        question: "If 5x - 3 = 3x + 7, then x = ?",
        options: [
          "3",
          "4",
          "5",
          "6"
        ],
        correct: 2,
        explanation: "5x - 3x = 7 + 3, 2x = 10, x = 5"
      },
      {
        id: 5,
        question: "A sum of money doubles itself in 8 years at simple interest. What is the rate of interest per annum?",
        options: [
          "10%",
          "12.5%",
          "15%",
          "20%"
        ],
        correct: 1,
        explanation: "If principal doubles, SI = P. SI = (P×R×8)/100 = P, so R = 12.5%"
      },
      {
        id: 6,
        question: "The ratio of two numbers is 3:4 and their sum is 84. What is the smaller number?",
        options: [
          "32",
          "36",
          "42",
          "48"
        ],
        correct: 1,
        explanation: "Let numbers be 3x and 4x. 3x + 4x = 84, 7x = 84, x = 12. Smaller number = 3×12 = 36"
      },
      {
        id: 7,
        question: "What is 15% of 240?",
        options: [
          "30",
          "32",
          "36",
          "40"
        ],
        correct: 2,
        explanation: "15% of 240 = (15/100) × 240 = 36"
      },
      {
        id: 8,
        question: "If the perimeter of a square is 48 cm, what is its area?",
        options: [
          "120 cm²",
          "144 cm²",
          "156 cm²",
          "168 cm²"
        ],
        correct: 1,
        explanation: "Side = 48/4 = 12 cm. Area = 12² = 144 cm²"
      },
      {
        id: 9,
        question: "A train 100 meters long crosses a pole in 10 seconds. What is its speed in km/h?",
        options: [
          "30 km/h",
          "36 km/h",
          "40 km/h",
          "45 km/h"
        ],
        correct: 1,
        explanation: "Speed = 100/10 = 10 m/s = 10 × (18/5) = 36 km/h"
      },
      {
        id: 10,
        question: "What is the next number in the series: 2, 6, 12, 20, 30, ?",
        options: [
          "38",
          "40",
          "42",
          "44"
        ],
        correct: 2,
        explanation: "Differences: 4, 6, 8, 10... Next difference is 12. So 30 + 12 = 42"
      }
    ]
  },
  test2: {
    id: 'test2',
    name: 'Verbal Ability - Sample Test 2',
    subject: 'Verbal Ability',
    duration: 30,
    questions: [
      {
        id: 1,
        question: "Choose the correct synonym for 'METICULOUS':",
        options: [
          "Careless",
          "Careful",
          "Messy",
          "Random"
        ],
        correct: 1,
        explanation: "Meticulous means showing great attention to detail; very careful and precise."
      },
      {
        id: 2,
        question: "Choose the word that is opposite in meaning to 'OPTIMISTIC':",
        options: [
          "Hopeful",
          "Pessimistic",
          "Cheerful",
          "Confident"
        ],
        correct: 1,
        explanation: "Optimistic means hopeful and confident about the future; pessimistic is its opposite."
      },
      {
        id: 3,
        question: "Fill in the blank: She was _____ by the sudden turn of events.",
        options: [
          "surprised",
          "surprising",
          "surprise",
          "surprisingly"
        ],
        correct: 0,
        explanation: "The correct form is 'surprised' (past participle used as an adjective)."
      },
      {
        id: 4,
        question: "Identify the grammatically correct sentence:",
        options: [
          "Neither of the students have completed their homework.",
          "Neither of the students has completed their homework.",
          "Neither of the students have completed his homework.",
          "Neither of the students are completing their homework."
        ],
        correct: 1,
        explanation: "'Neither' is singular and takes a singular verb 'has'."
      },
      {
        id: 5,
        question: "Choose the correct spelling:",
        options: [
          "Accommodate",
          "Acommodate",
          "Accomodate",
          "Acomodate"
        ],
        correct: 0,
        explanation: "The correct spelling is 'Accommodate' with two c's and two m's."
      },
      {
        id: 6,
        question: "What does the idiom 'Break the ice' mean?",
        options: [
          "To start a fight",
          "To make something cold",
          "To initiate conversation in a social setting",
          "To damage something"
        ],
        correct: 2,
        explanation: "'Break the ice' means to initiate conversation or make people feel more comfortable in a social setting."
      },
      {
        id: 7,
        question: "Choose the correct article: He is ___ honest man.",
        options: [
          "a",
          "an",
          "the",
          "no article needed"
        ],
        correct: 1,
        explanation: "We use 'an' before words starting with a vowel sound. 'Honest' starts with a silent 'h'."
      },
      {
        id: 8,
        question: "Identify the type of sentence: 'What a beautiful day!'",
        options: [
          "Interrogative",
          "Imperative",
          "Exclamatory",
          "Declarative"
        ],
        correct: 2,
        explanation: "An exclamatory sentence expresses strong emotion and ends with an exclamation mark."
      },
      {
        id: 9,
        question: "Choose the correctly punctuated sentence:",
        options: [
          "Its a beautiful day isnt it",
          "Its a beautiful day, isnt it?",
          "It's a beautiful day, isn't it?",
          "Its' a beautiful day isn't it?"
        ],
        correct: 2,
        explanation: "The correct form uses apostrophes for contractions and proper punctuation."
      },
      {
        id: 10,
        question: "What is the meaning of 'UBIQUITOUS'?",
        options: [
          "Rare",
          "Present everywhere",
          "Ancient",
          "Mysterious"
        ],
        correct: 1,
        explanation: "Ubiquitous means present, appearing, or found everywhere."
      }
    ]
  }
};
