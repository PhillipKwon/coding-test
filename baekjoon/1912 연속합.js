// 문제 풀이
const solution = (n, arr) => {
  n = +n;
  arr = arr.split(" ").map((v) => +v);

  const main = Array(arr.length - 1).fill(null);

  main[0] = arr[0];

  for (let i = 1; i < arr.length; i++) {
    main[i] = Math.max(arr[i], main[i - 1] + arr[i]);
  }

  console.log(Math.max(...main));
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
