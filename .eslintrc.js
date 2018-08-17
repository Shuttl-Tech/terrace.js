const OFF = 0, WARN = 1, ERROR = 2;

module.exports = {
	"extends": "react-app",
	"rules": {
		"react/jsx-no-literals": [ERROR, {"noStrings": true}]
	}
};
