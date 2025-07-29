function solution(targets) {
    targets.sort((a, b) => a[1] - b[1])
    
    let count = 0
    let last = -1
    
    for(let i = 0; i < targets.length; i++) {
        const [s, e] = targets[i]
        
        if (s >= last) {
            last = e
            count++
        }
    }
    
    return count
}