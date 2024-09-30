// 문제 풀이
const solution = (inp) => {
  let [lenCount, arr, ...rest] = inp;
  const [len, count] = [...lenCount.split(" ").map((v) => +v)];
  arr = arr.split(" ").map((v) => +v);
  rest = rest.map((v) => {
    return [...v.split(" ").map((v) => +v)];
  });

  const sumArr = [0];
  for (let i = 0; i < len; i++) {
    sumArr[i + 1] = sumArr[i] + arr[i];
  }

  rest.forEach(([start, end]) => {
    console.log(sumArr[end] - sumArr[start - 1]);
  });
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
