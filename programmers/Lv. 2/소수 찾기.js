// https://school.programmers.co.kr/learn/courses/30/lessons/42839

function solution(numbers) {
  var answer = new Set();

  const num = Array.from(numbers);
  const visited = Array.from({ length: num.length }, () => false);

  function round(curNum) {
    for (let i = 0; i < num.length; i++) {
      if (!visited[i]) {
        visited[i] = true;
        const targetNum = curNum + num[i];
        if (isPrime(+targetNum)) answer.add(+targetNum);
        round(targetNum);
        visited[i] = false;
      }
    }
  }

  function isPrime(number) {
    if (number < 2) return false;
    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
        return false;
      }
    }
    return true;
  }

  round("");

  return answer.size;
}
