export const toTestCard = (rawTestCard) => {
    const result = { ...rawTestCard };
    result.evaluated = !!rawTestCard.result && rawTestCard.attempts === (rawTestCard.passedAttempts || 0);
    result.scheduled = !!rawTestCard.startDate || !!rawTestCard.endDate;

    return result;
};