// https://school.programmers.co.kr/learn/courses/30/lessons/42842#

function solution(brown, yellow) {
  const area = brown + yellow;

  let w,
    h = 0;

  for (var i = 3; i <= 5000; i++) {
    if (area % i === 0) {
      const x = i,
        y = area / i;
      if ((x - 2) * (y - 2) === yellow) {
        (w = x), (h = y);
        break;
      }
    }
  }

  console.log(w, h);
  var answer = [w, h].sort((a, b) => b - a);
  return answer;
}
