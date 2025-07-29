const solution = (n) => {
  const arr = n.map((v) => v.split(" ").map((v) => +v));

  arr.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

  let count = 0;
  let last = -1;

  for (let i = 1; i < arr.length; i++) {
    const [s, e] = arr[i];

    if (s >= last) {
      last = e;
      count++;
    }
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
  solution(input); // 문제 풀이 함수 호출
  process.exit(); // 프로세스 종료
});
