// 문제 풀이
const solution = (s, t) => {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    stack.push(s[i]);
    if (t[t.length - 1] === s[i]) {
      var flag = true;
      for (let j = 1; j < t.length; j++) {
        if (stack[stack.length - 1 - j] !== t[t.length - 1 - j]) {
          flag = false;
        }
      }

      if (flag) {
        for (let k = 0; k < t.length; k++) {
          stack.pop();
        }
      }
    }
  }

  console.log(stack.join("") === "" ? "FRULA" : stack.join(""));
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
