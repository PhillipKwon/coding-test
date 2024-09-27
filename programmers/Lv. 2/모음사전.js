function solution(word) {
  var answer = 0;
  const c = ["A", "E", "I", "O", "U"];
  let found = false;

  function DFS(w) {
    if (w.length > 5 || found) return;
    if (w === word) {
      found = true;
      return;
    }
    answer++;

    for (let i = 0; i < 5; i++) {
      DFS(w + c[i]);
    }
  }

  DFS("");

  return answer;
}
