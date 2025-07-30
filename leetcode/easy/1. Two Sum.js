// https://leetcode.com/problems/two-sum/description/?envType=study-plan-v2&envId=top-interview-150

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const val = target - nums[i];

    if (map.has(val)) return [map.get(val), i];

    map.set(nums[i], i);
  }

  return [];
};
