import lodash from 'lodash';

export const caseTypes = {
  UPPER_CASE: 1,
  LOWER_CASE: 2,
  CAMEL_CASE: 10,
  SNAKE_CASE: 11,
  KEBAB_CASE: 12,
};

export const lodashMappings = {
  [caseTypes.UPPER_CASE]: lodash.upperCase,
  [caseTypes.LOWER_CASE]: lodash.lowerCase,
  [caseTypes.CAMEL_CASE]: lodash.camelCase,
  [caseTypes.SNAKE_CASE]: lodash.snakeCase,
  [caseTypes.KEBAB_CASE]: lodash.kebabCase,
};

export default caseTypes;
