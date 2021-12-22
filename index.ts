import { MORSE_CODE } from './preloaded';

enum MorseChars {
  SLASH = "111",
  SPACE = "0000000",
  DOT = "1",
  PAUSE_BETWEEN_DOTS_SLASH = "0",
  PAUSE_BERWEEN_CARACTERS_INSIDE_WORD = "000"
}

const findTimeUnit = (bits: string) => {
  let timeUnit: number = Number.MAX_SAFE_INTEGER;
  let count: number = 1;
  if (bits.length === 1) {
    return 1;
  }
  for (let index: number = 1; index < bits.length; index++) {
    if (bits[index] === bits[index - 1]) {
      count += 1;
    } else {
      if (count < timeUnit) {
        timeUnit = count;
      }
      count = 1;
    }
  }
  return timeUnit === Number.MAX_SAFE_INTEGER ? count 
                                              : timeUnit;
}

const convertString = (convertedString: string, timeUnit: number): string => 
  convertedString.replace(new RegExp((MorseChars.SPACE as string).repeat(timeUnit), 'g'), '  ')
                 .replace(new RegExp((MorseChars.SLASH as string).repeat(timeUnit), 'g'), '-')
                 .replace(new RegExp((MorseChars.PAUSE_BERWEEN_CARACTERS_INSIDE_WORD as string).repeat(timeUnit), 'g'), ' ')
                 .replace(new RegExp((MorseChars.DOT as string).repeat(timeUnit), 'g'), '.')
                 .replace(new RegExp((MorseChars.PAUSE_BETWEEN_DOTS_SLASH as string).repeat(timeUnit), 'g'), '');

export const decodeBits = (bits: string) => {
  // ToDo: Accept 0's and 1's, return dots, dashes and spaces
  const correctBits = bits.replace(new RegExp("^[0]+|[0]+$", "g"), "");
  let timeUnit: number = findTimeUnit(correctBits);
  
  return convertString(correctBits, timeUnit);
};

export const decodeMorse = (morseCode: string) => {
  // ToDo: Accept dots, dashes and spaces, return human-readable message
  const resultArray: string[] = morseCode.split('  ');
  return morseCode.split('  ')
                  .map((word: string) => word.split(' ')
                                             .map((symbol: string, index: number) => MORSE_CODE[symbol])
                                             .join(''))
                  .join(' ');
};
