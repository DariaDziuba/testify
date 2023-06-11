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
        result.startDate = toDate(rawTestCard.startTime);
        result.endDate = toDate(rawTestCard.endTime);
        result.formattedEndDate = formatDate(result.endDate);
        result.evaluated = !!rawTestCard.result && rawTestCard.attempts === (rawTestCard.passedAttempts || 0);
        result.scheduled = !!rawTestCard.startDate || !!rawTestCard.endDate;
        result.saved = savedTasks[rawTestCard.ID];

        return result;
    } catch (error) {
        console.error(error);
    }
};