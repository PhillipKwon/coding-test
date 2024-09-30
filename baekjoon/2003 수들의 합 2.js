// 문제 풀이
const solution = (nm, a) => {
  const [len, target] = nm.split(" ").map((v) => +v);
  const arr = a.split(" ").map((v) => +v);
  let count = 0;
  let [left, right] = [0, 1];
  let result = arr[left];

  while (right < len - 1) {
    if (result >= target) {
      result = result - arr[left];
      left++;
    } else if (right === len) break;
    else {
      result = result + arr[right];
      right++;
    }

    if (result === target) count++;
  }

  console.log(count);
};

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
