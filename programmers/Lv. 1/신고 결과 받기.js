// https://school.programmers.co.kr/learn/courses/30/lessons/92334

function solution(id_list, report, k) {
  var answer = Array(id_list.length).fill(0);
  console.log(answer);
  const report_list = {};

  id_list.map((user) => {
    report_list[user] = [];
  });

  report.map((user) => {
    const [from, to] = user.split(" ");
    if (!report_list[to].includes(from)) {
      report_list[to].push(from);
    }
  });

  for (r in report_list) {
    if (report_list[r].length >= k) {
      report_list[r].map((user) => {
        answer[id_list.indexOf(user)] += 1;
      });
    }
  }

  return answer;
}
