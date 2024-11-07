function solution(condition, trees) {
  const [n, m] = condition.split(" ").map((v) => +v);
  const treeHeights = trees.split(" ").map((v) => +v);
  let max = 0;

  let left = 0;
  let right = Math.max(...treeHeights);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const sum = treeHeights.reduce((acc, cur) => {
      return acc + (cur - mid > 0 ? cur - mid : 0);
    }, 0);

    if (sum >= m) {
      max = Math.max(max, mid);
    }

    if (sum === m) {
      break;
    } else if (sum < m) {
      right = mid - 1;
    } else if (sum > m) {
      left = mid + 1;
    }
  }

  console.log(max);
}

/* readline Module */
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", function (line) {
  input.push(line); // 입력받은 문자열, line
}).on("close", function () {
  solution(input[0], input[1]); // 문제 풀이 함수 호출
  process.exit(); // 프로세스 종료
});
