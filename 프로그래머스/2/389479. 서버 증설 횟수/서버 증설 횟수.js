function solution(players, m, k) {
    let count = 0;
    let shutdown = -1;
    let up = 0;
    let upArr = new Array(24).fill(0);
    
    for (let i = 0; i < players.length; i++) {
        up = Math.max(...upArr.filter((v, j) => j >= i))
        
        if ((up*m < players[i] && up !=0) || m <= players[i]) {
            const calc = Math.floor(players[i] / m - up)
            addServer(i, calc > 0 ? calc : 0)
            count += calc > 0 ? calc : 0
        }
    }
        
    function addServer(start, count) {
        for (let i = 0; i < k; i++) {
            if (start+i < upArr.length) upArr[start+i] += count
        }
    }
    
    return count;
}