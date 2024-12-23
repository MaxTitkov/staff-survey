const canConvertToInt = (str) => {
    return !isNaN(str) && Number.isInteger(Number(str));
}

const calculateSurvey = (data, surveyMap, startQuestionsIdx, endQuestionsIdx) => {
	let patientScores = new Object();
	data.forEach((row, rowIndex) => {
    	patientScores[rowIndex] = 0;
		if(canConvertToInt(row[0])){
            row.slice(startQuestionsIdx, endQuestionsIdx).forEach((answerText, index) => {
    		let currentQuestion = surveyMap[index];
    		const selectedAnswer = currentQuestion.find(answer => answer.text === answerText);
    		if (selectedAnswer) {
			      patientScores[rowIndex] += selectedAnswer.score;
			    } else {
			      console.warn(`Ответ "${answerText}" не найден для вопроса ${index}.`);
			    }
    		})
        }
    })
    return patientScores
}

const getAnswers = (data, surveyMap, startQuestionsIdx, endQuestionsIdx) => {
	let patientScores = new Object();
	data.forEach((row, rowIndex) => {
		// console.log(row)
    	patientScores[row[0]] = [];
    	if(canConvertToInt(row[0])){
            row.slice(startQuestionsIdx, endQuestionsIdx).forEach((answerText, index) => {
    		let currentQuestion = surveyMap[index];
    		const selectedAnswer = currentQuestion.find(answer => answer.text === answerText);
			// console.log(selectedAnswer)
    		if (selectedAnswer) {
				patientScores[row[0]].push(selectedAnswer)
			    } else {
			    console.warn(`Ответ "${answerText}" не найден для вопроса ${index}.`);
			    }
    		})
        }
    })
    return patientScores
}
