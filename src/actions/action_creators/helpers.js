import types from '../types';
export const helpers_getCountries_Pending = ()=> ({type: types.HELPERS_GETCOUNTRIES_PENDING});
export const helpers_getCountries_Ok = (term)=> ({type: types.HELPERS_GETCOUNTRIES_OK, payload: term});
export const helpers_getCountries_Nok = (error)=> ({type: types.HELPERS_GETCOUNTRIES_NOK,payload: error});
