import v from 'voca';
import { BAD_ARGUMENT_PATTERN, MISSING_ARGUMENT } from './error-codes';

export const CriticalError = (msg, code = -1) => { console.error(msg); process.exit(code); };

export const PatternMismatchError = () => CriticalError('Name doesn\'t fit pattern. It must be a single dasherized string. It\'ll be turned into a TitleCase string during usage.', BAD_ARGUMENT_PATTERN);
export const MissingHandlerName = ({ entity }) => CriticalError(`🚨 Missing ${v.titleCase(entity)} Name. Please specify a ${entity.toLowerCase()} name.`, MISSING_ARGUMENT);
