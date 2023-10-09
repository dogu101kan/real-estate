import { _setSignInStart, _setSignInSuccess, _setSignInFailure, _setUpdateStart,
    _setUpdateSuccess,
    _setUpdateFailure } from ".";
import store from "..";

export const setSignInStart = data => store.dispatch(_setSignInStart(data));
export const setSignInSuccess = data => store.dispatch(_setSignInSuccess(data));
export const setSignInFailure = data => store.dispatch(_setSignInFailure(data));

export const setUpdateStart = data => store.dispatch(_setUpdateStart(data));
export const setUpdateSuccess = data => store.dispatch(_setUpdateSuccess(data));
export const setUpdateFailure = data => store.dispatch(_setUpdateFailure(data));