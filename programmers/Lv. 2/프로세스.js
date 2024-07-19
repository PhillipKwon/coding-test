// https://school.programmers.co.kr/learn/courses/30/lessons/42587

function solution(priorities, location) {
  const runned = [];

  const queue = priorities.reduce((acc, cur, idx) => {
    acc.push({
      id: idx,
      priority: cur,
    });

    return acc;
  }, []);

  while (queue.length > 0) {
    let task = queue.shift();

    if (queue.filter((v) => v.priority > task.priority).length > 0) {
      queue.push(task);
    } else {
      runned.push(task);
    }
  }

  return runned.findIndex((v) => v.id === location) + 1;
}
