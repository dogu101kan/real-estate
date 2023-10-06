import { _setBackgroundColor, _setBoxShadow, _setColor } from ".";
import store from "..";

export const setBackgroundColor = data => store.dispatch(_setBackgroundColor(data));
export const setColor = data => store.dispatch(_setColorColor(data));
export const setBoxShadow = data => store.dispatch(_setBoxShadow(data));

