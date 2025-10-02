/**
문제 1: 올바른 괄호 (스택 활용)

설명:
괄호 문자열이 주어졌을 때, 올바른 괄호인지 확인하는 문제입니다.

여는 괄호 ( 가 있으면 반드시 닫는 괄호 ) 가 있어야 합니다.

올바른 순서로 매칭되는지 판단하세요.
*/

function solution(str) {
  let openCnt = 0;

  for (const s of str) {
    if (s === "(") {
      openCnt++;
    } else {
      if (openCnt <= 0) return "NO";
      else openCnt--;
    }
  }

  return openCnt === 0 ? "YES" : "NO";
}

console.log(solution("(()())"));
console.log(solution("())(()"));
