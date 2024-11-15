function solution(n, wires) {
    let answer = Number.MAX_SAFE_INTEGER
    let tree = Array.from(Array(n+1),()=>[])
    wires.map((element)=>{
        let [a,b] = element;

        tree[a].push(b);
        tree[b].push(a);
    })
    
    function BFS(target, except) {
        let count = 0
        const queue = [target]
        const visited = Array.from({length: n + 1}, () => false)
        
        visited[target] = true
        while(queue.length > 0) {
            let idx = queue.shift()
            
            tree[idx].forEach(i => {
                if (i !== except && !visited[i]) {
                    visited[i] = true
                    queue.push(i)
                }
            })
            
            count++
        }
        
        return count
    }
    
    wires.forEach(w => {
        const [a, b] = w
        
        answer = Math.min(answer, Math.abs(BFS(a, b) - BFS(b, a)))
    })
    
    return answer
}