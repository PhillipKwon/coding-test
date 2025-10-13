// https://leetcode.com/problems/rotate-array/description/?envType=study-plan-v2&envId=top-interview-150

/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
  k = k % nums.length;
  if (k === 0) return;

  reverseFn(nums, 0, nums.length - 1);
  reverseFn(nums, 0, k - 1);
  reverseFn(nums, k, nums.length - 1);
}

function reverseFn(arr: number[], start: number, end: number) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}
