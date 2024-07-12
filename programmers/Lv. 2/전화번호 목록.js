// https://school.programmers.co.kr/learn/courses/30/lessons/42577?language=javascript

function solution(phone_book) {
  return !phone_book.sort().some((phone, i) => {
    if (i === phone_book.length - 1) return false;
    return phone_book[i + 1].startsWith(phone);
  });
}
