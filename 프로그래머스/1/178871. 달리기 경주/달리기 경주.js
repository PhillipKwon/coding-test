function solution(players, callings) {
    const playerToRank = new Map()
    const rankToPlayer = [...players]
    
    players.forEach((p, i) => {
        playerToRank.set(p, i)
    })
    
    for (const c of callings) {
        // 호출 선수 등수 가져오기
        const calledRank = playerToRank.get(c)
        
        // 그 앞선수 명 가져오기
        const front = rankToPlayer[calledRank-1]
        
        playerToRank.set(c, calledRank-1)
        playerToRank.set(front, calledRank)
        
        rankToPlayer[calledRank] = front
        rankToPlayer[calledRank - 1] = c
    }
    
    return rankToPlayer
}