import camelCase from 'lodash/camelCase.js';
import { caseTypes, lodashMappings } from '../constants/case.constants.js';

/**
 * 객체의 key와 value를 특정 case로 변환하는 함수.
 * @param {*} obj key-value pair that is to be case-transformed
 * @param {*} caseType caseType as mapped in case.constants.js
 * @returns
 */
export const transformCase = (obj, caseType) => {
  if (!Object.values(caseTypes).includes(caseType)) {
    console.error(`Error | transformCase failed: caseType ${caseType}`);
    return;
  }
  transformCaseRec(obj, caseType);
};

const transformCaseRec = (obj, caseType) => {
  if (Array.isArray(obj)) {
    // 배열인 경우, 배열의 각 요소에 대해 재귀적으로 transformCaseRec 함수를 호출
    return obj.map((v) => transformCaseRec(v, caseType));
  } else if (obj !== null && typeof obj === 'object' && obj.constructor === Object) {
    // 객체인 경우, 객체의 키를 변환하고, 값에 대해서도 재귀적으로 transformCaseRec 함수를 호출
    return Object.keys(obj).reduce((result, key) => {
      result[lodashMappings[caseType](key)] = transformCaseRec(obj[key]);
      return result;
    }, {});
  }
  // 객체도 배열도 아닌 경우, 원본 값을 반환
  return obj;
};

export const toCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    // 배열인 경우, 배열의 각 요소에 대해 재귀적으로 toCamelCase 함수를 호출
    return obj.map((v) => toCamelCase(v));
  } else if (obj !== null && typeof obj === 'object' && obj.constructor === Object) {
    // 객체인 경우, 객체의 키를 카멜케이스로 변환하고, 값에 대해서도 재귀적으로 toCamelCase 함수를 호출
    return Object.keys(obj).reduce((result, key) => {
      result[camelCase(key)] = toCamelCase(obj[key]);
      return result;
    }, {});
  }
  // 객체도 배열도 아닌 경우, 원본 값을 반환
  return obj;
};
