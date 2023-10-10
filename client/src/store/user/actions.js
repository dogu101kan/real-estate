import {
  _setSignInStart,
  _setSignInSuccess,
  _setSignInFailure,
  _setUpdateStart,
  _setUpdateSuccess,
  _setUpdateFailure,
  _setUpdateInformationStart,
  _setUpdateInformationSuccess,
  _setUpdateInformationFailure,
  _setDeleteAccountStart,
  _setDeleteAccountSuccess,
  _setDeleteAccountFailure,
  _setLogoutStart,
  _setLogoutSuccess,
  _setLogoutFailure,
} from ".";
import store from "..";

export const setSignInStart = (data) => store.dispatch(_setSignInStart(data));
export const setSignInSuccess = (data) => store.dispatch(_setSignInSuccess(data));
export const setSignInFailure = (data) => store.dispatch(_setSignInFailure(data));

export const setUpdateStart = (data) => store.dispatch(_setUpdateStart(data));
export const setUpdateSuccess = (data) => store.dispatch(_setUpdateSuccess(data));
export const setUpdateFailure = (data) => store.dispatch(_setUpdateFailure(data));

export const setUpdateInformationStart = (data) => store.dispatch(_setUpdateInformationStart(data));
export const setUpdateInformationSuccess = (data) => store.dispatch(_setUpdateInformationSuccess(data));
export const setUpdateInformationFailure = (data) => store.dispatch(_setUpdateInformationFailure(data));

export const setDeleteAccountStart = (data) => store.dispatch(_setDeleteAccountStart(data));
export const setDeleteAccountSuccess = (data) => store.dispatch(_setDeleteAccountSuccess(data));
export const setDeleteAccountFailure = (data) => store.dispatch(_setDeleteAccountFailure(data));

export const setLogoutStart = (data) => store.dispatch(_setLogoutStart(data));
export const setLogoutSuccess = (data) => store.dispatch(_setLogoutSuccess(data));
export const setLogoutFailure = (data) => store.dispatch(_setLogoutFailure(data));