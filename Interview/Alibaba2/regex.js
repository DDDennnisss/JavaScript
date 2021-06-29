function isCamelCase(paramName) {
  if (!paramName) return false;
  const regex = /^[a-z]([A-Za-z0-9]+)?$/
  return regex.test(paramName)
}

// 测试
console.log(isCamelCase('camelCase07'));
// isCamelCase('');
// isCamelCase('camel');
// isCamelCase('PascalCase');
// isCamelCase('camelCase');
// isCamelCase('camelCaseCaseCase');
// isCamelCase('camelCaseR');