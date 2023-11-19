const fs = require('fs');
const path = require('path');

// Load question bank from JSON file
const questionBankPath = path.resolve(__dirname, 'questionBank.json');
const questionBankContent = fs.readFileSync(questionBankPath, 'utf8');
const questionBank = JSON.parse(questionBankContent).questions;


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


function generateQuestionPaper(totalMarks, difficultyDistribution) {
  const questionPaper = [];
  for (const difficulty in difficultyDistribution) {
    const percentage = difficultyDistribution[difficulty];
    const targetMarks = Math.floor((totalMarks * percentage) / 100);

    const filteredQuestions = questionBank.filter(question => question.difficulty === difficulty);
    
    
    let noOfQuestions;
    if(difficulty==="Easy") 
        noOfQuestions=targetMarks/5;

    else if(difficulty==="Medium")
        noOfQuestions=targetMarks/10;    
    else if(difficulty==="Hard")
        noOfQuestions=targetMarks/15;
     console.log(`${noOfQuestions}`);
    if (filteredQuestions.length < noOfQuestions) {
      console.error(`Not enough questions with difficulty ${difficulty} in the Question Bank.`);
      return null;
    }

    const shuffledQuestions = shuffleArray(filteredQuestions);
    const selectedQuestions = shuffledQuestions.slice(0, noOfQuestions);
    // const selectedQuestions = filteredQuestions.slice(0, noOfQuestions);
    questionPaper.push(...selectedQuestions);
  }

  return questionPaper;
}

// Example usage
const totalMarks = 100;
const difficultyDistribution = { Easy: 20, Medium: 50, Hard: 30 };

const generatedPaper = generateQuestionPaper(totalMarks, difficultyDistribution);

if (generatedPaper) {
  console.log("Generated Question Paper:");
  console.log(generatedPaper);
} else {
  console.log("Failed to generate the question paper.");
}
