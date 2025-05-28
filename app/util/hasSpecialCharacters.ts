

export default function hasSpecialCharacters(input: any) {
  input = input.replace(",", "")
  input = input.replace("(", "")
  input - input.replace(")", "")
  const specialCharRegex = /[^a-zA-Z0-9 ]/; 
  return specialCharRegex.test(input);
}

