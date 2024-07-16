// https://school.programmers.co.kr/learn/courses/30/lessons/42586

function solution(progresses, speeds) {
  var answer = [];
  const days = [];

  for (let i = 0; i < progresses.length; i++) {
    days.push(Math.ceil((100 - progresses[i]) / speeds[i]));
  }

  let cnt = 1;
  let longest = days[0];

  for (let i = 1; i < progresses.length; i++) {
    if (longest >= days[i]) {
      cnt = cnt + 1;
    } else {
      answer.push(cnt);
      longest = days[i];
      cnt = 1;
    }
  }
  answer.push(cnt);

  return answer;
}
