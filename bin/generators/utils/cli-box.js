import createEmojiRegex from 'emoji-regex';
const EMOJI_REGEX = createEmojiRegex();
const FORMAT_REGEX = /#(\w+)\^((?:[^#]+)+)#\^/g;

let BOX = {
  TOP_LEFT: '╭',
  TOP_RIGHT: '╮',
  BOTTOM_LEFT: '╰',
  BOTTOM_RIGHT: '╯',
  TOP: '─', BOTTOM: '─', LEFT: '│', RIGHT: '│',
  PAD_X: 1
};

const suffix = (message, char = ' ', count = 1) => {
  return message + Array(count).fill(char).join('');
};

const prefix = (message, char = ' ', count = 1) => {
  return Array(count).fill(char).join('') + message;
};

const emojiLength = (str) => {
  let match, emojiLength = 0;
  if (!str.match(EMOJI_REGEX)) return 2;

  // eslint-disable-next-line no-cond-assign
  while (match = EMOJI_REGEX.exec(str)) {
  	const emoji = match[0];
  	switch (emoji) {
  		case '⏫': emojiLength += 1; break;
  		case '💡':
  		case '👉': emojiLength += 2; break;
  		case 'ℹ️': emojiLength += 3; break;
  		case '🤷‍♀️':
  		case '🤷‍♂️': emojiLength += 5; break;
  		case '❓': emojiLength += 0; break;
  		default: emojiLength += [...emoji].length;
  	}
  }
  return emojiLength;
};

const maxLineLength = (messages) => {
  return Math.max(...messages.map(message => message.replace(FORMAT_REGEX).length)) + 1
};

const applyFormatting = (message) => {
  let offset = 0;
  message = message.replace(FORMAT_REGEX, (_, _format, text) => {
  	offset += 6; // Because expected pattern has 6 extra characters per match, for pattern #AB^something#^
  	let [ format, color ] = _format.split('');
  	switch (format) {
  		case 'b': text = text.bold; break;
  		case 'c': text = text.bold.italic; break;
  		case 'd': text = text.bold.underline; break;
  		case 'i': text = text.italic; break;
  		case 'j': text = text.italic.underline; break;
  		case 'u': text = text.underline; break;
  		case 'a': text = text.bold.italic.underline; break;
  		default: break;
  	}
  	switch (color) {
  		case 'y': text = text.yellow; break;
  		case 'c': text = text.cyan; break;
  		case 'g': text = text.green; break;
  		default: break;
  	}
  	return text;
  });
  return { message, offset }
};

export const box = ({ message, asText = false }) => {
  let output = '';
  const print = asText ? (msg) => { output += msg + '\n' } : console.log;

  let messages = message.split('\n');
  let length = maxLineLength(messages);

  messages = messages.map(message => {
  	let shortage = length - message.length;
  	let padLength = Math.ceil(shortage, 10);
  	message = suffix(message, ' ', padLength);
  	message = prefix(message, ' ', BOX.PAD_X);
  	return message;
  });

  length = maxLineLength(messages);
  let HORIZONTAL = Array(length + 1).fill(BOX.TOP).join('');

  print(`${BOX.TOP_LEFT}${HORIZONTAL}${BOX.TOP_RIGHT}`.green);

  messages.forEach(message => {
  	let formattedOutput = applyFormatting(message);
  	let offset = formattedOutput.offset;
  	message = formattedOutput.message;
  	message = suffix(message, ' ', emojiLength(message) + offset);
  	print(`${BOX.LEFT.green}${message}${BOX.RIGHT.green}`);
  });
  print(`${BOX.BOTTOM_LEFT}${HORIZONTAL}${BOX.BOTTOM_RIGHT}`.green);

  return output;
};
