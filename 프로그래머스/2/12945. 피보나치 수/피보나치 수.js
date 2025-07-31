function solution(n) {
    if (n === 1) return 1
    if (n === 1) return 0
    
    let prev2 = 0
    let prev1 = 1
    let cur = 0
    
    for (let i = 2; i <= n; i++) {
        cur = (prev1 + prev2) % 1234567
        prev2 = prev1
        prev1 = cur
    }
    
    return cur
}