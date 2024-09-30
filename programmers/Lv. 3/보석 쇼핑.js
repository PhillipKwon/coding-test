// https://school.programmers.co.kr/learn/courses/30/lessons/67258

function solution(gems) {
  var answer = [0, gems.length - 1];
  let [left, right] = [0, 0];
  const maxType = new Set(gems).size;
  const obj = {};
  let objCnt = 1;

  obj[gems[0]] = 1;

  while (left < gems.length && right < gems.length) {
    if (objCnt === maxType) {
      if (right - left + 1 < answer[1] - answer[0] + 1) answer = [left, right];

      obj[gems[left]] -= 1;

      if (obj[gems[left]] === 0) {
        delete obj[gems[left]];
        objCnt--;
      }

      left++;
    } else {
      right++;

      if (obj[gems[right]]) obj[gems[right]]++;
      else {
        obj[gems[right]] = 1;
        objCnt++;
      }
    }
  }

  return [answer[0] + 1, answer[1] + 1];
}
