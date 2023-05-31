export const toTestCard = (rawTestCard, savedTasks) => {
    try {
        const result = { ...rawTestCard };

        result.evaluated = !!rawTestCard.result && rawTestCard.attempts === (rawTestCard.passedAttempts || 0);
        result.scheduled = !!rawTestCard.startDate || !!rawTestCard.endDate;
        result.saved = savedTasks[rawTestCard.ID];

        return result;
    } catch (error) {
        console.error(error);
    }
};