// https://school.programmers.co.kr/learn/courses/30/lessons/150370

function solution(today, terms, privacies) {
  var answer = [];

  // 유효기간 map으로 저장
  // today - 유효기간 한 삭제 기준날짜 구하기
  const [tY, tM, tD] = today.split(".").map((v) => +v);
  const termM = {};

  for (t of terms) {
    let [name, month] = t.split(" ");
    termM[name] = +month;
  }

  for (let i = 0; i < privacies.length; i++) {
    const [date, name] = privacies[i].split(" ");
    const [y, m, d] = date.split(".");
    const [tY, tM, tD] = today.split(".");

    if (
      new Date(y, m - 1 + termM[name], d).valueOf() <=
      new Date(tY, tM - 1, tD).valueOf()
    ) {
      answer.push(i + 1);
    }
  }

  return answer;
}
