export function filename(v: string) {
  const syntax = /^(\$?[\w.-]+\.\w+|\$\w+)$/;
  return syntax.test(v);
}

export function hasVariables(text: string): boolean {
  const variablePattern = /\$\w+/;
  return variablePattern.test(text);
}

export function validateModelSpecificFile(filename: string, content: string, isModelSpecific: boolean): string | null {
  if (isModelSpecific) {
    if (hasVariables(filename)) {
      return "Model-specific files cannot have variables in the filename";
    }
    if (hasVariables(content)) {
      return "Model-specific files cannot have variables in the content";
    }
  }
  return null;
}

export function validateMacAddress(mac: string): boolean {
  // Accept MAC with colons (XX:XX:XX:XX:XX:XX), dashes (XX-XX-XX-XX-XX-XX), or without separators (XXXXXXXXXXXX)
  const macWithSeparators = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  const macWithoutSeparators = /^[0-9A-Fa-f]{12}$/;
  return macWithSeparators.test(mac) || macWithoutSeparators.test(mac);
}
