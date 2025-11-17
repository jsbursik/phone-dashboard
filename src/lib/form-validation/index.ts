export function filename(v: string) {
  const syntax = /^(\$?[\w.-]+\.\w+|\$\w+)$/;
  return syntax.test(v);
}
