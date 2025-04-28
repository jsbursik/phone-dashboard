const codeValue =
	'# Paste your config here\n# For any dynamic values use "$value" format with $kebab_case\n$money\n$test';

let count = 0;

export const editors = $state([
	{
		id: count++,
		vars: <string[]>[],
		value: codeValue,
		language: 'phone_cfgs',
		config: true
	}
]);

export function addEditor() {
	editors.push({
		id: count++,
		vars: [],
		value:
			'# This code editor will maintain the same highlighting logic\n# even if your file differs in structure.',
		language: 'phone_cfgs',
		config: true
	});
}

export function removeEditor(id: number) {
	const index = editors.findIndex((e) => e.id === id);
	if (index === -1) return;
	editors.splice(index, 1);
}
