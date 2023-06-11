export const formatDate = (date) => {
    if (!date && typeof date !== 'object') {
        return '';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
};

export const toDate = (dateStr) => {
    if (!dateStr)  {
        return null;
    }

    const result = new Date(dateStr);

    return isNaN(result) ? null : result;
}