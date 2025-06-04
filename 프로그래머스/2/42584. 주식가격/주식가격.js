function solution(prices) {
    const answer = Array(prices.length).fill(0);
    const stack = [];

    for (let i = 0; i < prices.length; i++) {
        while (stack.length && prices[i] < prices[stack[stack.length - 1]]) {
            const top = stack.pop();
            answer[top] = i - top;
        }
        stack.push(i);
    }

    // 스택에 남은 인덱스들은 끝까지 가격이 떨어지지 않은 경우
    while (stack.length) {
        const top = stack.pop();
        answer[top] = prices.length - 1 - top;
    }

    return answer;
}
