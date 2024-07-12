// https://school.programmers.co.kr/learn/courses/30/lessons/42578

function solution(clothes) {
  const obj = {};
  clothes.forEach((item) => {
    if (obj[item[1]]) {
      obj[item[1]] = [...obj[item[1]], item[0]];
    } else {
      obj[item[1]] = [item[0]];
    }
  });

  const res = Object.entries(obj).reduce((acc, cur) => {
    return acc * (cur[1].length + 1);
  }, 1);

  return res - 1;
}
