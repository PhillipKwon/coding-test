function solution(video_len, pos, op_start, op_end, commands) {
   function toMin(time) {
       const [min, sec] = time.split(":").map(v => +v)
       
       return min * 60 + sec
   }
    
    const mVedio = toMin(video_len)
    let mPos = toMin(pos)
    const mOpStart = toMin(op_start)
    const mOpEnd = toMin(op_end)
    
    if (mPos >= mOpStart && mPos <= mOpEnd) mPos = mOpEnd
    
    commands.forEach((com) => {
        mPos += com === "next" ? 10 : -10
        
        if (mPos < 0) mPos = 0
        
        if (mPos > mVedio) mPos = mVedio
        
        if (mPos >= mOpStart && mPos <= mOpEnd) mPos = mOpEnd
    })
    
    const m = Math.floor(mPos/60) + ""
    const s = (mPos % 60) + ""
    
    return `${m.padStart(2, "0")}:${s.padStart(2, "0")}`
}