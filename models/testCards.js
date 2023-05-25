import { toTestCard } from './testCard';

export const toTestCards = (rawRestCards) => {
    const result = [];
    rawRestCards.forEach((rawRestCard) => result.push(toTestCard(rawRestCard)));

    return result;
};