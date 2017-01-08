type StringMap = {[X: string]: string};
type StringToStringMap = (X: string) => StringMap;
type StringToBoolean = (X: string) => boolean;
type ShallowMergeReducer = (X: StringMap, Y: StringMap) => StringMap;

export let validateLoginForm = (serializedForm: StringMap) => {
  let requiredFields: Array<string> = ['username', 'password'];
  let missingFields: StringToBoolean = (fieldName) => !serializedForm[fieldName];
  let toErrorMessageObject: StringToStringMap = (fieldName) => ({ [fieldName]: 'field is empty' });
  let shallowMergeObjects: ShallowMergeReducer = (previous, current) => ({...previous, ...current});

  return requiredFields
    .filter(missingFields)
    .map(toErrorMessageObject)
    .reduce(shallowMergeObjects, {});
};
