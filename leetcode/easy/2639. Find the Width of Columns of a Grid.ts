// https://leetcode.com/problems/find-the-width-of-columns-of-a-grid/

function findColumnWidth(grid: number[][]): number[] {
  const result: number[] = Array(grid[0].length).fill(0);

  for (let i = 0; i < grid[0].length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (isNaN(grid[j][i])) break;
      else result[i] = Math.max(result[i], (grid[j][i] + "").length);
    }
  }

  return result;
}
