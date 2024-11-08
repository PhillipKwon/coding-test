function solution(n, lost, reserve) {
    var answer = 0;
    
    const all = Array.from({length: n}, () => 1)
    reserve.forEach(r => {
        all[r-1]++
    })
    lost.forEach(l => {
        all[l-1]--
    })
    
    console.log(all)
    lost.sort().forEach(l => {
        if (all[l-1] > 0) return
        if (l-2 >= 0 && all[l-2] > 1) { // 앞에 친구
            all[l-2]--
            all[l-1]++
        } else if (l < all.length && all[l] > 1) { // 뒤에 친구
            all[l]--
            all[l-1]++
        }
    })
    
    all.forEach(a => {
        if (a) answer++
    })
    
    return answer;
}