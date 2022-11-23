import { combineReducers } from "redux";
import reducerHangBanTraLai from "../model/reducerHangBanTraLai";
import reducerSanPham from "../model/reducerSanPham";
import reducerSearch from "../model/reducerSearch";
import reducerDonBanHang from "../model/reducerDonBanHang";


const rootReducer = combineReducers({
    hangBanTraLai: reducerHangBanTraLai,
    danhSachSanPham: reducerSanPham,
    search: reducerSearch,
    donBanHang: reducerDonBanHang
})

export default rootReducer;