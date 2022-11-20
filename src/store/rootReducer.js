import { combineReducers } from "redux";
import reducerHangBanTraLai from "../model/reducerHangBanTraLai";
import reducerSanPham from "../model/reducerSanPham";


const rootReducer = combineReducers({
    hangBanTraLai: reducerHangBanTraLai,
    danhSachSanPham: reducerSanPham
})

export default rootReducer;