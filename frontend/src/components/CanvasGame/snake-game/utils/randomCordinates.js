const randomCordinates = function (forbiddenArray = []) {
  let randomNum;
  let tempArray = Array.from({ length: 225 }, (v, i) => i);
  tempArray = tempArray.filter((num) => !forbiddenArray.includes(num));
  randomNum = tempArray[Math.floor(Math.random() * tempArray.length)];

  return { x: Math.floor(randomNum / 15), y: randomNum % 15 };
};

export { randomCordinates };
