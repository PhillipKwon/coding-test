// https://school.programmers.co.kr/learn/courses/30/lessons/12909

function solution(s) {
  const arr = s.split("");
  const stack = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === 0 && arr[i] === ")") return false;

    if (arr[i] === "(") stack.push(arr[i]);
    else if (arr[i] === ")") {
      if (!stack.length) return false;
      stack.pop();
    }
  }

  if (stack.length !== 0) return false;

  return true;
}
