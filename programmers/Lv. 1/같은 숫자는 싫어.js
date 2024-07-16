// https://school.programmers.co.kr/learn/courses/30/lessons/12906

function solution(arr) {
  const answer = [];
  arr.forEach((v) => {
    if (answer[answer.length - 1] !== v) answer.push(v);
  });

  return answer;
}
