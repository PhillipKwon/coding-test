// https://leetcode.com/problems/search-insert-position/

function searchInsert(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    const m = l + Math.floor((r - l) / 2);

    if (nums[m] === target) return m;
    else if (nums[m] < target) l = m + 1;
    else r = m - 1;
  }
  return l;
}
