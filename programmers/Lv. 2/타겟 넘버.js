// https://school.programmers.co.kr/learn/courses/30/lessons/43165

function solution(numbers, target) {
  let answer = 0;
  const oper = ["-", ""];

  function DFS(cur, step) {
    if (step === numbers.length) {
      if (cur === target) answer += 1;
      return;
    }

    for (let j = 0; j < 2; j++) {
      cur = cur + Number(`${oper[j]}${numbers[step]}`);
      DFS(cur, step + 1);
      cur = cur - Number(`${oper[j]}${numbers[step]}`);
    }
  }

  DFS(0, 0);

  return answer;
}
