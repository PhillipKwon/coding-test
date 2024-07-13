// https://school.programmers.co.kr/learn/courses/30/lessons/12939

function solution(s) {
  const arr = s.split(" ").map((v) => {
    return parseInt(v);
  });

  const max = Math.max(...arr);
  const min = Math.min(...arr);

  return `${min} ${max}`;
}
