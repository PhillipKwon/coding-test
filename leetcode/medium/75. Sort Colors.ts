// https://leetcode.com/problems/sort-colors/

/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {
  const counting = Array(3).fill(0);

  for (let i = 0; i < nums.length; i++) {
    counting[nums[i]]++;
  }

  console.log(counting);
  nums.fill(0, 0, counting[0]);
  nums.fill(1, counting[0], counting[0] + counting[1]);
  nums.fill(2, counting[0] + counting[1]);
}
