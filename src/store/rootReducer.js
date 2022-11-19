import { combineReducers } from "redux";
import reducerHangBanTraLai from "../model/reducerHangBanTraLai";


const rootReducer = combineReducers({
    hangBanTraLai: reducerHangBanTraLai,
})

export default rootReducer;