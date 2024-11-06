function solution(bridge_length, weight, truck_weights) {
    let answer = 1;
    
    const first = truck_weights.shift()
    let totalWeight = first
    const onBridge = [{w: first, step: 0}]
    
    function checkTotalWeight(income) {
        return totalWeight + income <= weight
    }
    
    function checkMaxLength() {
        return onBridge.length + 1 <= bridge_length
    }
    
    function checkAcrossed(el) {
        return el.step === bridge_length    
    }
    
    while(onBridge.length > 0) {
        const target = truck_weights[0]
        
        // 한칸 앞으로
        onBridge.forEach(t => {
            t.step += 1
        })
        
        //내리기
        if (checkAcrossed(onBridge[0])) {
            totalWeight -= onBridge[0].w
            onBridge.shift()
        }
        
        // 다리에 올리기
        if (checkTotalWeight(target) && checkMaxLength()) {
            const next = truck_weights.shift()
            totalWeight += next
            onBridge.push({w: next, step: 0})
        }
        
        answer += 1
    }
    
    return answer
}