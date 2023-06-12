import { toDate, formatDate } from '../helpers/dateHelper';

export const toTestCard = (rawTestCard, savedTasks) => {
    try {
        const result = { ...rawTestCard };

        result.ID = rawTestCard.taskId;
        result.name = rawTestCard.taskName;
        result.subject = rawTestCard.subjectLongName;
        result.subjectShort = rawTestCard.subjectShortName;
        result.questions = rawTestCard.totalQuestions;
        result.attempts = rawTestCard.attempts;
        result.passedAttempts = rawTestCard.passedAttempts;
        result.topics = rawTestCard.topics;
        result.startDate = rawTestCard.startTime && toDate(rawTestCard.startTime);
        result.endDate = rawTestCard.endTime && toDate(rawTestCard.endTime);
        result.formattedEndDate = formatDate(result.endDate);
        result.evaluated = !!rawTestCard.result;
        result.scheduled = !!result.startDate || !!result.endDate;
        result.availableToPass = rawTestCard.attempts === (rawTestCard.passedAttempts || 0);
        result.saved = savedTasks[rawTestCard.ID];

        return result;
    } catch (error) {
        console.error(error);
    }
};