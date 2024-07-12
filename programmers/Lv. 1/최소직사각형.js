// https://school.programmers.co.kr/learn/courses/30/lessons/86491

function solution(sizes) {
  let w = 0;
  let h = 0;
  sizes.forEach((s) => {
    const [a, b] = s.sort((a, b) => b - a);
    w = w > a ? w : a;
    h = h > b ? h : b;
  });

  var answer = w * h;
  return answer;
}
