import { takeLeading, put } from "redux-saga/effects";
import * as Actions from "../actionTypesSearch";
import * as lodash from "lodash";
import { notification } from "antd";

export function* watcherSearch() {
    yield takeLeading(Actions.SEARCH_PROCESS, watcherSearchProcess);
}

function* watcherSearchProcess(action) {
    try {
        const { data = {} } = action;
        const { searchValue, ttype, searchField, isRecall } = data;
        let newDanhSachSanPham = [];
        switch (ttype) {
            case "ten": {
                newDanhSachSanPham = searchField.filter(sanPham => (lodash.includes(sanPham.ten.toLowerCase(), searchValue.toLowerCase())));
                break;
            }

            case "soLuongLonHon": {
                newDanhSachSanPham = searchField.filter(sanPham => sanPham.soLuongSanPham >= parseInt(searchValue))
                break;
            }

            case "soLuongNhoHon": {
                newDanhSachSanPham = searchField.filter(sanPham => sanPham.soLuongSanPham <= parseInt(searchValue))
                break;
            }

            default: {
                newDanhSachSanPham = searchField.filter(sanPham => (lodash.includes(sanPham.ten.toLowerCase(), searchValue.toLowerCase())));
                break;
            }
        };

        if (searchValue.length === 0 && !isRecall) {
            notification.success({
                description: `Hiển thị toàn bộ sản phẩm`,
                placement: "bottomRight"
            })
        }

        if (!newDanhSachSanPham.length > 0) {
            notification.warning({
                message: "Lỗi",
                description: "Không tìm thấy sản phẩm theo thông tin đã nhập",
                placement: "bottomRight"
            })
        }
        if (newDanhSachSanPham.length > 0 && !isRecall && searchValue.length > 0) {
            notification.success({
                message: "Thành công",
                description: `Tìm thấy ${newDanhSachSanPham.length} sản phẩm theo yêu cầu`,
                placement: "bottomRight"
            })
        }

        yield put({
            type: Actions.SEARCH_SAVE_RESULT,
            data: {
                newDanhSachSanPham: newDanhSachSanPham
            }
        });

    } catch (error) { }

}

