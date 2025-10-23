// https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-i

function hasSameDigits(s: string): boolean {
  while (s.length > 2) {
    let operS: string = "";
    for (let i = 1; i < s.length; i++) {
      operS += ((+s[i - 1] + +s[i]) % 10) + "";
    }
    s = operS;
  }

  return s[0] === s[1] ? true : false;
}
