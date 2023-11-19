const fs = require('fs');
const path = require('path');

// Load question bank from JSON file
const questionBankPath = path.resolve(__dirname, 'questionBank.json');
const questionBankContent = fs.readFileSync(questionBankPath, 'utf8');
const questionBank = JSON.parse(questionBankContent).questions;

// to randomize the questions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

// funtion to generate the question paper
function generateQuestionPaper(totalMarks, difficultyDistribution) {
  const questionPaper = [];
  for (const difficulty in difficultyDistribution) {
    const percentage = difficultyDistribution[difficulty];      
    const targetMarks = Math.floor((totalMarks * percentage) / 100);  // cal marks as per each difficulty

    const filteredQuestions = questionBank.filter(question => question.difficulty === difficulty);  //filtering the question acc to difficulty  
    
    
    let noOfQuestions;
    if(difficulty==="Easy") 
        noOfQuestions=targetMarks/5;
    else if(difficulty==="Medium")
        noOfQuestions=targetMarks/10;    
    else if(difficulty==="Hard")
        noOfQuestions=targetMarks/15;


    //  console.log(`${noOfQuestions}`);
    
    if (filteredQuestions.length < noOfQuestions) {
      console.error(`Not enough questions with difficulty ${difficulty} in the Question Bank.`);
      return null;
    }

    const shuffledQuestions = shuffleArray(filteredQuestions);
    const selectedQuestions = shuffledQuestions.slice(0, noOfQuestions);    // selection of question from randomize array
    questionPaper.push(...selectedQuestions);       // pushing the random question in result
  }

  return questionPaper;
}

// example test case

const totalMarks = 120;
const difficultyDistribution = { Easy: 20, Medium: 50, Hard: 30 };

const generatedPaper = generateQuestionPaper(totalMarks, difficultyDistribution);

if (generatedPaper) {
  console.log("Generated Question Paper:");
  console.log(generatedPaper);
} else {
  console.log("Failed to generate the question paper.");
}
