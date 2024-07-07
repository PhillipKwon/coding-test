// https://school.programmers.co.kr/learn/courses/30/lessons/42747

function solution(citations) {
  var answer = 0;
  citations.sort((a, b) => b - a);

  for (var i = 0; i < citations.length; i++) {
    if (citations[i] > i) answer++;
    else break;
  }

  return answer;
}
