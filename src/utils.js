export const getTime = (time) => {
  return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
};

export const getRandomElementFromArray = (arrayName) => {
  return Math.floor(Math.random() * arrayName.length);
};
