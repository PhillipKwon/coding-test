// https://leetcode.com/problems/valid-parentheses/

function isValid(s: string): boolean {
  const stack: string[] = [];
  const pair: Record<string, string> = {
    "}": "{",
    ")": "(",
    "]": "[",
  };
  for (const c of s) {
    if (c === "(" || c === "{" || c === "[") {
      stack.push(c);
    } else if (stack.pop() !== pair[c]) {
      return false;
    }
  }

  return stack.length === 0 ? true : false;
}
