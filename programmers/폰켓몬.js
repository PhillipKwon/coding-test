// https://school.programmers.co.kr/learn/courses/30/lessons/1845

function solution(nums) {
  const max = nums.length / 2;
  const posSet = new Set(nums).size;

  const answer = max < posSet ? max : posSet;
  return answer;
}
