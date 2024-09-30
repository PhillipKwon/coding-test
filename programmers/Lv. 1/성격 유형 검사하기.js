// https://school.programmers.co.kr/learn/courses/30/lessons/118666

function solution(survey, choices) {
  var answer = "";

  const stat = {
    R: 0,
    T: 0,
    C: 0,
    F: 0,
    J: 0,
    M: 0,
    A: 0,
    N: 0,
  };

  for (let i = 0; i < survey.length; i++) {
    const [l, r] = survey[i].split("");

    if (choices[i] < 4) {
      stat[l] += 4 - choices[i];
    } else if (choices[i] > 4) {
      stat[r] += choices[i] - 4;
    }
  }

  function getType(l, r) {
    if (stat[l] > stat[r]) return l;
    else if (stat[l] < stat[r]) return r;
    else return [l, r].sort()[0];
  }

  answer += getType("R", "T");
  answer += getType("C", "F");
  answer += getType("J", "M");
  answer += getType("A", "N");

  return answer;
}
