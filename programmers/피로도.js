// https://school.programmers.co.kr/learn/courses/30/lessons/87946

function solution(k, dungeons) {
  const answer = [];

  const visited = Array(dungeons.length).fill(false);

  function DFS(piro, stage) {
    answer.push(stage);
    for (let i = 0; i < dungeons.length; i++) {
      const [least, use] = dungeons[i];
      if (!visited[i] && piro >= least) {
        visited[i] = true;
        DFS(piro - use, stage + 1);
        visited[i] = false;
      }
    }
  }

  DFS(k, 0);

  return Math.max(...answer);
}
