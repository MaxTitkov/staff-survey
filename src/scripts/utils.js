const calculateSurvey = (data, surveyMap, startQuestionsIdx, endQuestionsIdx) => {
	let patientScores = new Object();
	data.forEach((row, rowIndex) => {
    	patientScores[rowIndex] = 0;
    	if(typeof row[0] !=='undefined'){
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
