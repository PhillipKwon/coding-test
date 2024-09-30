// https://school.programmers.co.kr/learn/courses/30/lessons/258712

function solution(friends, gifts) {
  var answer = 0;
  const history = {};
  const giftScore = {};

  for (me of friends) {
    history[me] = {};
    giftScore[me] = 0;
    for (friend of friends) {
      if (me !== friend) history[me][friend] = 0;
    }
  }

  for (gift of gifts) {
    const [from, to] = gift.split(" ");

    history[from][to]++;

    giftScore[from]++;
    giftScore[to]--;
  }

  for (f of friends) {
    let score = 0;
    for (h in history) {
      if (f != h) {
        if (
          history[f][h] > history[h][f] ||
          (history[f][h] === history[h][f] && giftScore[f] > giftScore[h])
        ) {
          score++;
        }
      }
    }
    answer = answer < score ? score : answer;
  }

  return answer;
}
