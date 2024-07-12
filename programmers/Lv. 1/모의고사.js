// https://school.programmers.co.kr/learn/courses/30/lessons/42840

function solution(answers) {
  const students = [
    { ans: [1, 2, 3, 4, 5], cnt: 0 },
    { ans: [2, 1, 2, 3, 2, 4, 2, 5], cnt: 0 },
    { ans: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5], cnt: 0 },
  ];

  answers.forEach((a, i) => {
    students.forEach((stu, j) => {
      const stuAnsIdx = i % stu.ans.length;
      if (a == stu.ans[stuAnsIdx]) stu.cnt++;
    });
  });

  const max = Math.max(students[0].cnt, students[1].cnt, students[2].cnt);

  var answer = [];
  students.forEach((v, i) => {
    if (v.cnt === max) answer.push(i + 1);
  });

  return answer;
}
