import { languages } from 'prism-code-editor/prism';

//prettier-ignore
languages.phone_cfgs = {
	comment: {
		pattern: /#.*/
	},
	url: {
		pattern: /\[([^\]]+)\]/
	},
	keyword: [
			/(.*?)=/,
			/(.*?):/
	]
};
