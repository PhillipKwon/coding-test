// https://school.programmers.co.kr/learn/courses/30/lessons/12951

function solution(s) {
  return s.split("").reduce((acc, cur, i) => {
    if (i === 0) cur = cur.toUpperCase();
    else if (s[i - 1] === " ") cur = cur.toUpperCase();
    else cur = cur.toLowerCase();
    acc += cur;
    return acc;
  }, "");
}
