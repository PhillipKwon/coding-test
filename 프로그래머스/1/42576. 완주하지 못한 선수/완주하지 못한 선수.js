function solution(participant, completion) {
    const map = {}
    
    participant.forEach(part => {
        if (map[part]) map[part]++
        else map[part] = 1
    })
    
    completion.forEach(comp => {
        map[comp]--
    })
    
    for (let i in map) {
        if (map[i]) return i
    }
}