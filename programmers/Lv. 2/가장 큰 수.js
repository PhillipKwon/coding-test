// https://school.programmers.co.kr/learn/courses/30/lessons/42746#

function solution(numbers) {
  const answer = numbers
    .map((v) => v + "")
    .sort((a, b) => b + a - (a + b))
    .join("");

  return answer[0] === "0" ? "0" : answer;
}
