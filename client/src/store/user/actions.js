import { _setSignInStart, _setSignInSuccess, _setSignInFailure } from ".";
import store from "..";

export const setSignInStart = data => store.dispatch(_setSignInStart(data));
export const setSignInSuccess = data => store.dispatch(_setSignInSuccess(data));
export const setSignInFailure = data => store.dispatch(_setSignInFailure(data));