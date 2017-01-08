export * from '~/state/reducers';

/*

  NOTE: This is a proxy file to avoid confusion.

  Reducers should only be imported in these situations:
  - Where the store is created (createStore.js)
  - Other reducers

  But since the reducers know what actions they can accept,
  it makes sense for them to export some constants for the
  actions to import those constants as well.

  Additionally, since redux selectors should be defined alongside
  reducers so that it will be easy for the developer to see how the
  selector output data are derived/transformed.

  Selectors are used all over the app, so this file is a proxy
  to help avoid that confusion and potential side effects.

*/

/*

  NOTE: if selectors return plain javascript objects
  then the components that use them don't have to
  worry about tranforming from immutable records to js objects

*/
