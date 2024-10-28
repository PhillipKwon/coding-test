function solution(n, arr1, arr2) {
    var answer = [];
    
    function toBinary(num) {
        let result = []
        let power = n-1
        while(power >= 0) {
            let compare = 2**power
            
            if (compare <= num) {
                num -= compare
                result.push(1)
            } else {
                result.push(0)
            }
            power -= 1
        }
        
        return result
    }
    
    const bArr1 = arr1.map(a => {
        return toBinary(a)
    })
    
    const bArr2 = arr2.map(a => {
        return toBinary(a)
    })
    
    for (let i = 0; i < n; i++) {
        answer[i] = ""
        for (let j = 0; j < n; j++) {
            answer[i] += (bArr1[i][j] == "1" || bArr2[i][j] == "1") ? "#" : " "
        }
    }
    
    return answer;
}