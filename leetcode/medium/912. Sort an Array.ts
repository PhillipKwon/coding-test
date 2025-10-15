// https://leetcode.com/problems/sort-an-array/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

function sortArray(nums: number[]): number[] {
  // Base Case
  if (nums.length === 1) return nums;

  // 1. Divide
  const mid = Math.floor(nums.length / 2);
  const left = nums.slice(0, mid);
  const right = nums.slice(mid);

  // 2. Conqure
  const sortedLeft = sortArray(left);
  const sortedRight = sortArray(right);

  // 3. Combine
  return merge(sortedLeft, sortedRight);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}
