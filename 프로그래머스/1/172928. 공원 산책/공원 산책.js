function solution(park, routes) {
    const direction = {
        "E": [0, 1],
        "W": [0,-1],
        "N": [-1, 0],
        "S": [1, 0]   
    }
    let current = [0, 0]
    
    for (let i = 0; i < park.length; i++) {
        for (let j = 0; j < park[i].length; j++) {
            if (park[i][j] === "S") {
                current = [i, j]
                break
            }
        }
    }
    
    for (let i = 0; i < routes.length; i++) {
        const [direc, cnt] = routes[i].split(" ")
        const result = move(current, direction[direc], cnt)
        current = result
    }
    
    function move(coordi , dir, count) {
        let [x, y] = coordi
        const [dx, dy] = dir
        
        for (let j = 1; j <= count; j++) {
            const nx = x + dx * j
            const ny = y + dy * j

            if (nx < 0 || ny < 0 || nx >= park.length || ny >= park[0].length || park[nx][ny] === "X") {
                return coordi
            }    
        }
        
        return [x+dx*count, y+dy*count]
    }
    
    return current
}