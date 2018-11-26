const TEMPLATE_REGEX = /\/\/(?:[ \-0-9]*)?template-(begin|end|line) +([\w|\-]+)(?: +)?(\w+)?/igm;

const ACTION = {
	KEEP: 'keep',
	REMOVE: 'remove'
};

const BLOCK_EDGE = {
	BEGIN: 'begin',
	END: 'end',
	LINE: 'line'
};

const tokenify = (str) => {
	let matches = TEMPLATE_REGEX.exec(str);
	TEMPLATE_REGEX.lastIndex = 0;
	if (matches) {
		let [ , blockEdge, commentToken, action ] = matches;
		let index = matches.index;
		return [ blockEdge, commentToken, action, index ];
	}
	else return null;
};

export const parseTemplateComments = ({ file, tokens = [], invert = false }) => {
	if (tokens.length) {
		tokens.forEach((token) => file = processTemplate({ file, token, invert }));
	}
	return processTemplate({ file });
};

const processTemplate = ({ file, token = 'generic', invert = false }) => {
	const DELIMITER = '\n';
	let splitFile = file.split(DELIMITER);
	let currentAction = null; // String | null

	return splitFile.map(line => {
		let tokens = tokenify(line);

		// if line has no tokens, and no action is set
		if (!tokens && !currentAction) return line;

		// if line has no tokens, but an action was set
		if (!tokens && currentAction) {
			switch (currentAction) {
				case ACTION.KEEP:
					return line;
				case ACTION.REMOVE:
					return null;
				default: return line;
			}
		}

		let [ blockEdge, commentToken, action, index ] = tokens;
		// if invert is set to false, reverse usages of `KEEP` and `REMOVE`.
		action = invert ? (action === ACTION.KEEP ? ACTION.REMOVE : ACTION.KEEP) : action;

		if (commentToken !== token) return line;

		switch (blockEdge) {
			case BLOCK_EDGE.BEGIN:
				currentAction = action;
				return null;
			case BLOCK_EDGE.END:
				currentAction = null;
				return null;
			case BLOCK_EDGE.LINE:
				switch (action) {
					case ACTION.KEEP: return line.slice(0, index).trimRight();
					case ACTION.REMOVE: return null;
					default: return line;
				}
			default: return line;
		}
	}).filter(_ => _ !== undefined && _ !== null).join(DELIMITER);
};
