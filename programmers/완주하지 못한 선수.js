// https://school.programmers.co.kr/learn/courses/30/lessons/42576

function solution(participant, completion) {
  const obj = {};

  for (part of participant) {
    obj[part] ? obj[part]++ : (obj[part] = 1);
  }

  for (comp of completion) {
    obj[comp]--;
  }

  for (o in obj) {
    if (obj[o]) return o;
  }
}
