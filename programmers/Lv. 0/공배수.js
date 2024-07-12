// https://school.programmers.co.kr/learn/courses/30/lessons/181936

function solution(number, n, m) {
  return number % n === 0 && number % m === 0 ? 1 : 0;
}
