export const toTestCard = (rawTestCard) => {
    const result = { ...rawTestCard };
    result.evaluated = !!rawTestCard.result;
    result.scheduled = !!rawTestCard.startDate || !!rawTestCard.endDate;

    return result;
}
