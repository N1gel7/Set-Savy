function checkAnswer(questionId, correctAnswer) {
    const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
    const feedback = document.getElementById(`feedback-${questionId}`);

    if (selectedOption) {
        if (selectedOption.value === correctAnswer) {
            feedback.textContent = 'Correct!';
            feedback.className = 'feedback correct';
        } else {
            feedback.textContent = 'Incorrect. Try again!';
            feedback.className = 'feedback incorrect';
        }
    } else {
        feedback.textContent = 'Please select an answer.';
        feedback.className = 'feedback incorrect';
    }
}

function handleLogin(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (name && email) {
        // Redirect to the next page
        window.location.href = 'setdefinitions2.html';
    } else {
        alert('Please enter both name and email.');
    }
}

function goToQuiz() {
    window.location.href = 'setsDquiz3.html';
}

function goToPrevious() {
    window.location.href = 'setdefinitions2.html';
}

function goToNext() {
    window.location.href = 'setTypes4.html';
}


    function goToPreviouss() {
        window.location.href = 'setsDquiz3.html'; // Adjust path if necessary
    }

    function goToNextt() {
        window.location.href = 'Quiz5.html'; // Adjust path if necessary
    }

    function showTypes() {
        window.location.href = 'setTypes4.html'; // Redirect to the previous page
    }
    
    function showSetNotations() {
        window.location.href = 'setNotation6.html'; // Redirect to the next page
    }
    

    function showSubsetQuiz() {
        window.location.href = 'Quiz5.html'; // Redirect to the previous page
    }
    
    function showAdditionalQuiz() {
        window.location.href = 'Quiz7.html'; // Redirect to the next page
    }
    function showSetNotations() {
        window.location.href = 'setNotation6.html'; // Redirect to the Set Notations page
    }
    
    function showProofs() {
        window.location.href = 'laws8.html'; // Redirect to the Basic Proofs and Properties page
    }
    function showPrevious() {
        window.location.href = 'Quiz7.html';
    }
    
    function showNext() {
        window.location.href = 'proofsQuiz9.html';
    }
        function showPrevious() {
    window.location.href = 'laws8.html'; // Redirects to laws8.html
}

function navigateToReactApp(route) {
    window.location.href = `/${route}`; // This assumes your React app is handling these routes.
}


function showMajorQuiz() {
    window.location.href = 'majorQuiz10.html'; // Redirects to majorQuiz10.html
}

function toggleSolution() {
    const solution = document.getElementById('solution');
    if (solution.style.display === 'none' || solution.style.display === '') {
        solution.style.display = 'block';
    } else {
        solution.style.display = 'none';
    }
}


function handleMajorQuizSubmission() {
    let score = 0;
    const questions = majorQuizQuestions.slice(0, 15);
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ""; // Clear previous results if any

    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        const feedback = document.createElement('p');

        if (selectedOption) {
            if (selectedOption.value === question.correctAnswer) {
                score++;
                feedback.textContent = `Question ${index + 1}: Correct!`;
                feedback.className = "feedback correct";
            } else {
                feedback.textContent = `Question ${index + 1}: Incorrect. Correct Answer: ${question.correctAnswer}`;
                feedback.className = "feedback incorrect";
            }
        } else {
            feedback.textContent = `Question ${index + 1}: No answer selected. Correct Answer: ${question.correctAnswer}`;
            feedback.className = "feedback incorrect";
        }
        resultsContainer.appendChild(feedback);
    });

    alert(`Your score: ${score} / ${questions.length}`);
}

function loadMajorQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = ""; // Clear previous questions

    const selectedQuestions = majorQuizQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 15);

    selectedQuestions.forEach((question, index) => {
        const questionElem = document.createElement('div');
        questionElem.classList.add('question');
        questionElem.innerHTML = `
            <p>${index + 1}. ${question.question}</p>
            ${question.options.map((option, i) => `
                <label>
                    <input type="radio" name="q${index}" value="${String.fromCharCode(65 + i)}"> ${option}
                </label><br>
            `).join('')}
            <p id="feedback-q${index}" class="feedback"></p>
        `;
        quizContainer.appendChild(questionElem);
    });
}

// Ensure sections are displayed correctly when the page loads
window.onload = function() {
    loadMajorQuiz();
}
const majorQuizQuestions = [
    
        {
            question: "Which of the following statements is true about the power set of a set?",
            options: [
                "A. The power set of a set with n elements contains n elements.",
                "B. The power set of a set contains exactly one element.",
                "C. The power set of a set with n elements contains 2^n elements.",
                "D. The power set of an infinite set is also finite."
            ],
            correctAnswer: "C"
        },
        
        {
    question: "Which of the following is the correct definition of the union of two sets A and B?",
    options: [
        "A. A ∪ B = {x: x ∈ A or x ∈ B}",
        "B. A ∪ B = {x: x ∈ A and x ∈ B}",
        "C. A ∪ B = {x: x ∉ A and x ∈ B}",
        "D. A ∪ B = {x: x ∈ A and x ∉ B}"
    ],
    correctAnswer: "A"
},
{
    question: "If A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, what is the intersection of sets A and B?",
    options: [
        "A. {1, 2, 5, 6}",
        "B. {3, 4}",
        "C. {1, 2}",
        "D. {3, 4, 5}"
    ],
    correctAnswer: "B"
},
{
    question: "Which of the following is true about finite and infinite sets?",
    options: [
        "A. Every finite set is a subset of every infinite set.",
        "B. A finite set cannot be a subset of an infinite set.",
        "C. Every infinite set is a subset of a finite set.",
        "D. Every infinite set has infinitely many subsets."
    ],
    correctAnswer: "D"
},
{
    question: "What is the cardinality of the power set of a set with 4 elements?",
    options: [
        "A. 4",
        "B. 16",
        "C. 8",
        "D. 32"
    ],
    correctAnswer: "B"
},
{
    question: "Which of the following statements is true about the universal set?",
    options: [
        "A. The universal set is always a subset of every other set.",
        "B. The universal set contains only the elements of a single set.",
        "C. The universal set contains all possible elements under consideration for a given problem.",
        "D. The universal set is not necessary in set theory."
    ],
    correctAnswer: "C"
},
{
    question: "If A = {2, 4, 6, 8} and B = {1, 2, 3, 4, 5}, what is the symmetric difference A △ B?",
    options: [
        "A. {1, 3, 5, 6, 8}",
        "B. {2, 4}",
        "C. {1, 2, 3, 4, 5, 6, 8}",
        "D. {6, 8}"
    ],
    correctAnswer: "A"
},
{
    question: "Which of the following sets is a subset of N, the set of natural numbers?",
    options: [
        "A. {-1, 0, 1, 2, 3}",
        "B. {0, 1, 2, 3}",
        "C. {2.5, 3.1, 4.0}",
        "D. {1, 1.5, 2}"
    ],
    correctAnswer: "B"
},
{
    question: "If A = {1, 2, 3} and B = {3, 4, 5}, what is the union of sets A and B?",
    options: [
        "A. {1, 2, 3, 4, 5}",
        "B. {3}",
        "C. {1, 2}",
        "D. {1, 2, 3, 4}"
    ],
    correctAnswer: "A"
},
{
    question: "True or False: Every set is a subset of its power set.",
    options: [
        "A. True",
        "B. False"
    ],
    correctAnswer: "A"
},
{
    question: "What is the cardinality of the set P({a, b, c, d}), where P(S) denotes the power set of S?",
    options: [
        "A. 8",
        "B. 16",
        "C. 4",
        "D. 32"
    ],
    correctAnswer: "B"
},
{
    question: "Which of the following is the correct definition of a subset?",
    options: [
        "A. A set A is a subset of set B if and only if every element of A is also an element of B, but B can have extra elements.",
        "B. A set A is a subset of set B if and only if every element of B is also an element of A, but A can have extra elements.",
        "C. A set A is a subset of set B if and only if there are no elements in A that are not in B.",
        "D. A set A is a subset of set B if A contains exactly the same elements as B."
    ],
    correctAnswer: "A"
},
{
    question: "What is the cardinality of the set {∅, {∅}, {{∅}}}?",
    options: [
        "A. 3",
        "B. 4",
        "C. 2",
        "D. 5"
    ],
    correctAnswer: "A"
},
{
    question: "If A = {1, 2, 3, 4} and B = {2, 3, 4, 5}, what is the symmetric difference A △ B?",
    options: [
        "A. {1, 2, 3, 4, 5}",
        "B. {1, 5}",
        "C. {2, 3, 4}",
        "D. {1, 2, 3, 4, 5} ∪ ∅"
    ],
    correctAnswer: "B"
},
{
    question: "True or False: The power set of a finite set is always finite.",
    options: [
        "A. True",
        "B. False"
    ],
    correctAnswer: "A"
},
{
    question: "If A = {x: x is an even number less than 10} and B = {x: x is a prime number less than 10}, what is A ∩ B?",
    options: [
        "A. {2, 4, 6, 8}",
        "B. {2, 3, 5, 7}",
        "C. {2}",
        "D. {4, 6, 8}"
    ],
    correctAnswer: "C"
},
{
    question: "Which of the following statements is true about the universal set?",
    options: [
        "A. The universal set is the set of all possible elements for a given context, and all other sets are subsets of the universal set.",
        "B. The universal set can be any set and does not need to be related to any context.",
        "C. The universal set must be the empty set.",
        "D. The universal set must contain only the elements of the set N."
    ],
    correctAnswer: "A"
},
{
    question: "What is the result of the union of two disjoint sets A = {1, 2} and B = {3, 4}?",
    options: [
        "A. A ∪ B = ∅",
        "B. A ∪ B = A ∩ B",
        "C. A ∪ B = A",
        "D. A ∪ B = A ∪ B, with no common elements between A and B"
    ],
    correctAnswer: "D"
},
{
    question: "Which of the following is a true statement about infinite sets?",
    options: [
        "A. An infinite set cannot have a subset with more than countable elements.",
        "B. Every infinite set is countable.",
        "C. Every infinite set has a finite cardinality.",
        "D. Infinite sets always have the same cardinality."
    ],
    correctAnswer: "D"
},
{
    question: "True or False: The set {1, 2, 3} is a subset of the set {1, 2, 3, 4}, but not an element of it.",
    options: [
        "A. True",
        "B. False"
    ],
    correctAnswer: "A"
},
{
    question: "If A = {1, 2, 3, 4, 5}, what is the number of subsets of A that contain exactly 3 elements?",
    options: [
        "A. 5",
        "B. 10",
        "C. 15",
        "D. 20"
    ],
    correctAnswer: "B"
},
{
    question: "If U = {1, 2, 3, 4, 5, 6, 7} is the universal set and A = {1, 2, 3}, what is the complement of A in U?",
    options: [
        "A. {1, 2, 3}",
        "B. {4, 5, 6, 7}",
        "C. {3, 4, 5, 6, 7}",
        "D. {1, 2, 3, 4, 5, 6, 7}"
    ],
    correctAnswer: "B"
},
{
    question: "Which of the following is the correct definition of 'belongs to' in set theory?",
    options: [
        "A. x ∈ A means x is an element of set A.",
        "B. x ∈ A means A is a subset of x.",
        "C. x ∈ A means x is a proper subset of set A.",
        "D. x ∈ A means x is equal to set A."
    ],
    correctAnswer: "A"
},
{
    question: "True or False: The set of real numbers R is a subset of the set of complex numbers C.",
    options: [
        "A. True",
        "B. False"
    ],
    correctAnswer: "A"
},
{
    question: "What is the result of the symmetric difference between two disjoint sets A = {1, 2} and B = {3, 4}?",
    options: [
        "A. {1, 2, 3, 4}",
        "B. {1, 2}",
        "C. {3, 4}",
        "D. ∅"
    ],
    correctAnswer: "A"
},
{
    question: "If A = {x | x is an even number} and B = {2, 4, 6, 8}, which statement is correct?",
    options: [
        "A. B is a subset of A",
        "B. A is a subset of B",
        "C. A and B are equal",
        "D. None of the above"
    ],
    correctAnswer: "A"
},
{
    question: "The complement of an intersection of sets A and B is given by which of the following?",
    options: [
        "A. (A ∩ B)' = A' ∩ B'",
        "B. (A ∩ B)' = A' ∪ B'",
        "C. (A ∪ B)' = A' ∩ B'",
        "D. (A ∪ B)' = A' ∪ B'"
    ],
    correctAnswer: "B"
},
{
    question: "If the universal set U = {1, 2, 3, 4, 5, 6} and A = {2, 4, 6}, what is A' (the complement of A)?",
    options: [
        "A. {1, 2, 3, 4, 5}",
        "B. {2, 4, 6}",
        "C. {1, 3, 5}",
        "D. {1, 2, 3, 4, 5, 6}"
    ],
    correctAnswer: "C"
},
{
    question: "Which of the following best describes a disjoint set?",
    options: [
        "A. Sets with no common elements",
        "B. Sets with exactly one element in common",
        "C. Sets that are equal",
        "D. Sets that are subsets of each other"
    ],
    correctAnswer: "A"
},
{
    question: "The union of two sets A = {1, 2} and B = {2, 3} is:",
    options: [
        "A. {2}",
        "B. {1, 2, 3}",
        "C. {1, 2}",
        "D. {2, 3}"
    ],
    correctAnswer: "B"
},
{
    question: "Which of the following statements is true about the power set of the empty set?",
    options: [
        "A. It contains one subset",
        "B. It contains two subsets",
        "C. It contains no subsets",
        "D. It contains infinitely many subsets"
    ],
    correctAnswer: "A"
}
    
];
