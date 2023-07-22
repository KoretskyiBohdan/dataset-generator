export const getRandomNumber = (max: number) => Math.round(Math.random() * max);

export const createId = () => getRandomNumber(Number.MAX_SAFE_INTEGER);
