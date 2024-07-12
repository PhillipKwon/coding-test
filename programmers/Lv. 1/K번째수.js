// https://school.programmers.co.kr/learn/courses/30/lessons/42748

function solution(array, commands) {
  return commands.map(([from, to, pos]) => {
    return [...array].slice(from - 1, to).sort((a, b) => a - b)[pos - 1];
  });
}
