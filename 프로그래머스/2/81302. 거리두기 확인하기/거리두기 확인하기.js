function solution(places) {
    const dx = [0, 0, -1, 1]
    const dy = [-1, 1, 0, 0]
    var answer = [];
    
    const pLocation = Array.from({length: places.length}, () => [])
    
    for (let p = 0; p < places.length; p++) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (places[p][i][j] === "P") pLocation[p].push([i, j])
            }
        }    
    }
    
    for (let p = 0; p < places.length; p++) {
        const map = places[p]
        const queue = [...pLocation[p]]
        let flag = 1

        while(queue.length > 0) {
            const [x, y] = queue.shift()
            for (let i = 0; i < 4; i++) {
                const nx = x + dx[i]
                const ny = y + dy[i]
                
                if (nx >= 0 && ny >= 0 && nx < 5 && ny < 5) {
                    if (map[nx][ny] === "P") {
                        flag = 0
                        break;    
                    } else if (map[nx][ny] === "O") {
                        for (let j = 0; j < 4; j++) {
                            const nnx = nx + dx[j]
                            const nny = ny + dy[j]
                            
                            if (nnx >= 0 && nny >= 0 && nnx < 5 && nny < 5 && map[nnx][nny] === "P") {
                                if (nnx != x || nny != y) {
                                    flag = 0
                                    break    
                                }
                            }
                        }
                    }
                }
                if (!flag) break
            }    
            if (!flag) break
        }
        
        answer.push(flag)
    }
    
    return answer;
}