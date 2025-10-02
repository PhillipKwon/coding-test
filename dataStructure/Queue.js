/**
문제 1: 프로세스 실행 순서 (큐 활용)

설명:
여러 개의 프로세스가 실행 대기 큐에 있습니다.

각 프로세스는 우선순위를 가지고 있습니다.

큐의 맨 앞 프로세스를 꺼내고, 뒤에 더 높은 우선순위가 있으면 다시 큐 뒤로 보냅니다.

그렇지 않으면 실행합니다.
*/

function solution([, priority, target]) {
  const queue = priority.map((p, i) => [p, i]);
  let processed = 0;

  while (queue.length > 0) {
    const [pri, idx] = queue.shift();

    if (queue.some(([p]) => p > pri)) {
      queue.push([pri, idx]);
    } else {
      processed++;
      if (idx === target) return processed;
    }
  }

  return processed;
}

console.log(solution([6, [1, 1, 9, 1, 1, 1], 0]));
