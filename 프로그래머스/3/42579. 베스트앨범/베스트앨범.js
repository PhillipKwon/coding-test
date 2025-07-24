function solution(genres, plays) {
    let genrePlay = {};
    
    const arr = genres.reduce((acc, cur, idx) => {
        acc.push({
            id: idx,
            genre: cur,
            play: plays[idx]
        })
        
        genrePlay[cur] = genrePlay[cur] ? genrePlay[cur]+=plays[idx] : plays[idx]
    
        return acc
    }, []).sort((a, b) => {
        return b.play - a.play
    })
    
    
    const sortedGenre = Object.fromEntries(Object.entries(genrePlay).sort((a, b) => {
      return b[1] - a[1]  
    }))
    
    
    var answer = [...Object.keys(sortedGenre).flatMap(genre => {
        return arr.filter((f) => f.genre == genre).slice(0, 2).map((m) => m.id)
    })]
      
    console.log(answer)
    return answer;
}