// https://leetcode.com/problems/maximum-subarray/?envType=study-plan-v2&envId=top-interview-150

function maxSubArray(nums: number[]): number {
  let curSum: number = nums[0];
  let maxSum: number = nums[0];

  for (let i = 1; i < nums.length; i++) {
    curSum = Math.max(nums[i], curSum + nums[i]);
    maxSum = Math.max(curSum, maxSum);
  }

  return maxSum;
}
