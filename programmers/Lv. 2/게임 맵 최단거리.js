function solution(maps) {
  var answer = 0;

  const dx = [0, 1, -1, 0];
  const dy = [1, 0, 0, -1];

  // 목적지
  const n = maps.length - 1;
  const m = maps[0].length - 1;

  const visited = Array.from(Array(maps.length), () => Array(m).fill(false));

  const queue = [[0, 0, 1]];

  while (queue.length > 0) {
    let [x, y, cnt] = queue.shift();

    if (x === n && y === m) return cnt;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx <= n &&
        ny <= m &&
        maps[nx][ny] === 1 &&
        !visited[nx][ny]
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny, cnt + 1]);
      }
    }
  }

  return -1;
}
