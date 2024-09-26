import sys
sys.setrecursionlimit(100000)


def solution(m, n, puddles):
    # 방향 벡터 (오른쪽, 아래쪽)
    dx = [0, 1]
    dy = [1, 0]
    
    # 맵과 dp 테이블 초기화
    mapp = [[True] * m for _ in range(n)]
    d = [[0] * m for _ in range(n)]
    
    # 웅덩이 위치를 false로 표시
    for puddle in puddles:
        mapp[puddle[1]-1][puddle[0]-1] = False
    
    # DFS 함수 정의
    def DFS(x, y):
        if x == n-1 and y == m-1:  # 도착 지점에 도달한 경우
            return 1
        
        if d[x][y] > 0:  # 이미 계산된 경로가 있는 경우
            return d[x][y]
        
        cnt = 0
        for i in range(2):  # 오른쪽과 아래쪽으로 이동
            nx = x + dx[i]
            ny = y + dy[i]
            
            # 안전지대일 경우에만 탐색
            if nx < n and ny < m and mapp[nx][ny]:
                cnt += DFS(nx, ny)
        
        d[x][y] = cnt
        return cnt
    
    # 시작점에서 DFS 호출
    answer = DFS(0, 0)
    
    return answer % 1000000007