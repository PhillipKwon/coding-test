function solution(places) {
  const result = [];
  for (const place of places) {
    let isSafePlace = 1;

    // 대기실을 순회하며 응시자의 자리에 대해 거리두기를 확인
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        // 응시자가 앉아있는데
        if (place[i][j] === "P") {
          // 거리두기를 지키지 않으면
          if (!isSafe(place, i, j)) {
            isSafePlace = 0;
            break;
          }
        }
      }

      if (!isSafePlace) {
        break;
      }
    }

    result.push(isSafePlace);
  }

  return result;
}

function isSafe(place, x, y) {
  // 상하좌우 방향을 나타내는 배열
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  for (let i = 0; i < 4; i++) {
    // 인접한 위치 좌표 계산
    const nx = x + dx[i];
    const ny = y + dy[i];

    // 대기실 범위 이내 여부 확인
    if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5) {
      // 맨해튼 거리가 1인 경우
      if (place[nx][ny] === "P") {
        return false;
        // 인접한 위치에 빈 테이블이 있는 경우
      } else if (place[nx][ny] === "O") {
        for (let j = 0; j < 4; j++) {
          // 빈 테이블을 기준으로 다른 방향으로 인접한 위치 좌표 계산
          const nnx = nx + dx[j];
          const nny = ny + dy[j];

          if (nnx >= 0 && nnx < 5 && nny >= 0 && nny < 5) {
            // 현재 응시자의 위치가 아닌 경우
            if (nnx !== x || nny !== y) {
              // 맨해튼 거리가 2이고 파티션 없이 응시자가 있는 경우
              if (place[nnx][nny] === "P") {
                return false;
              }
            }
          }
        }
      }
    }
  }

  // 거리두기를 모두 지키면 true
  return true;
}