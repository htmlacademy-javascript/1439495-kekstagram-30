function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

function checkPalindrome (string) {
  let reverseString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }
  return string.replaceAll(' ', '').toLowerCase() === reverseString.replaceAll(' ', '').toLowerCase();
}

function extractNumbers (string) {
  let numbers = '';
  string = string.toString();
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i]))) {
      numbers += string[i];
    }
  }
  return +numbers || NaN;
}
