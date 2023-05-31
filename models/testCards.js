import { getItem } from '../helpers/asyncStorageHelper';
import { toTestCard } from './testCard';

export const toTestCards = async (rawTestCards) => {
    const savedTasks = await getItem('savedTasks', true);

    return rawTestCards.map((rawTestCard) => toTestCard(rawTestCard, savedTasks || {}));
};