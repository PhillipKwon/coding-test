// 문제 풀이
const solution = (inp) => {
  const [condition, ...rest] = inp;
  const [n, m] = condition.split(" ").map((v) => +v);

  const map = rest.reduce((acc, cur) => {
    const row = cur.split(" ").map((v) => +v);
    acc.push(row);
    return acc;
  }, []);

  let answer = 0;

  function BF(bX, bY, wallCnt) {
    if (wallCnt === 3) {
      const safeCnt = checkSafe(spreadVirus(map));
      if (answer < safeCnt) answer = safeCnt;
      return;
    }

    for (let i = bX; i < n; i++) {
      for (let j = bY; j < m; j++) {
        if (map[i][j] === 0) {
          map[i][j] = 1;
          BF(i, j + 1, wallCnt + 1);

          map[i][j] = 0;
        }
      }
      bY = 0;
    }
  }

  BF(0, 0, 0);
  console.log(answer);

  function spreadVirus(simulMap) {
    const tempMap = simulMap.map((r) => {
      return [...r];
    });
    const queue = [];

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (simulMap[i][j] === 2) queue.push([i, j]);
      }
    }

    const nx = [-1, 0, 1, 0];
    const ny = [0, 1, 0, -1];
    while (queue.length > 0) {
      const [x, y] = queue.shift();

      for (let i = 0; i < 4; i++) {
        let dx = x + nx[i];
        let dy = y + ny[i];

        if (dx >= 0 && dy >= 0 && dx < n && dy < m && tempMap[dx][dy] === 0) {
          queue.push([dx, dy]);
          tempMap[dx][dy] = 2;
        }
      }
    }

    return tempMap;
  }

  function checkSafe(simulMap) {
    let count = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (simulMap[i][j] === 0) count++;
      }
    }

    return count;
  }
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
