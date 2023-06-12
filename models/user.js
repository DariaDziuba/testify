import { formatDate } from '../helpers/dateHelper';

export const toUser = (rawUser) => {
    try {
        const result = { ...rawUser };
        result.dateOfBirth = (rawUser.dateOfBirth && new Date(rawUser.dateOfBirth)) || null;
        result.formattedDateOfBirth = formatDate(result.dateOfBirth);

        return result;
    } catch (error) {
        console.error(error);
    }
};