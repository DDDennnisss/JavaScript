function isCamelCase(paramName) {
  if (!paramName) return false;
  const regex = /^[a-z]([A-Za-z]+)?$/
  return regex.test(paramName)
}

// 测试
console.log(isCamelCase('camel-Case'));
// isCamelCase('');
// isCamelCase('camel');
// isCamelCase('PascalCase');
// isCamelCase('camelCase');
// isCamelCase('camelCaseCaseCase');
// isCamelCase('camelCaseR');