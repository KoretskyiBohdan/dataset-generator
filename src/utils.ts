export const getRandomNumber = (max = Number.MAX_SAFE_INTEGER) => Math.round(Math.random() * max);

export const createId = () => getRandomNumber(Number.MAX_SAFE_INTEGER);
