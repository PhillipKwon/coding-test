function solution(t, p) {
    var answer = 0;
    
    for (let i = 0; i <= t.length - p.length; i++) {
        let num = ""
        for (let j = i; j < i + p.length; j++) {
            num += t[j]
        }
        if (p >= num) {
            answer += 1
        }
    }
    return answer;
}