// https://school.programmers.co.kr/learn/courses/30/lessons/12916

function solution(s) {
  var answer = true;
  let pCnt = 0,
    yCnt = 0;

  for (let i = 0; i < s.split("").length; i++) {
    const target = s[i].toLowerCase();
    if (target === "p") pCnt++;
    else if (target === "y") yCnt++;
  }

  if (pCnt !== yCnt) return false;

  return answer;
}
