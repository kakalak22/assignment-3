import { notification } from "antd";
import { takeLeading, select, put, take, call } from "redux-saga/effects";
import * as Actions from "../action-types/actionTypesHangBanTraLai";
import axios from "axios";
import * as lodash from "lodash";
import { assign, cloneDeep, findIndex } from "lodash";

const ObjectID = require("bson-objectid");

export function* watcherHangBanTraLai() {
    yield takeLeading(Actions.HANG_BAN_TRA_LAI_CREATE_NEW, workerCreateNewHangBanTraLai);
    yield takeLeading(Actions.HANG_BAN_TRA_LAI_UPDATE, workerUpdateHangBanTraLai);
}
/*
const getNotification = (message, description) => {
    notification.success({
        message: message,
        description: description,
        placement: "bottomRight",
        duration: 1
    })
}*/

function* workerCreateNewHangBanTraLai(action) {
    try {
        const hangBanTraLaiId = ObjectID().toString();
        const { hangBanTraLai } = yield select(state => state.hangBanTraLai);
        const { dongPhatSinh } = yield select(state => state.hangBanTraLai);
        const { data = {} } = action;
        const { hangBanTraLai: newHangBanTraLai, dongPhatSinh: newDongPhatSinh } = data
        let copyHangBanTraLai = [
            {
                invoice_symbol: newHangBanTraLai.invoice_symbol,
                invoice_date: newHangBanTraLai.invoice_date._d.toString(),
                entry_date: newHangBanTraLai.entry_date._d.toString(),
                _id: hangBanTraLaiId,
                name: newHangBanTraLai.name,
                invoice_code: newHangBanTraLai.invoice_code,
                description: newHangBanTraLai.description ? newHangBanTraLai.description : `Hang ban tra lai cua ${newHangBanTraLai.partner_id}`,
                partner_id: newHangBanTraLai.partner_id,
                tot_amount: newHangBanTraLai.tot_amount,
                status: "unpost"
            },
            ...hangBanTraLai
        ];

        let temp = cloneDeep(newDongPhatSinh);
        temp.forEach((row, index) => {
            row.hangBanTraLaiId = hangBanTraLaiId;
        }
        );

        const copyDongPhatSinh = [...temp, ...dongPhatSinh];

        console.log(copyDongPhatSinh);
        yield put({
            type: Actions.HANG_BAN_TRA_LAI_SAVE,
            data: {
                copyDongPhatSinh: copyDongPhatSinh,
                copyHangBanTraLai: copyHangBanTraLai
            }
        })
        //     const { sanPham, imgUrl } = data;
        //     let newObj = {
        //         ten: sanPham.ten,
        //         moTa: sanPham.moTa,
        //         linkHinhAnh: imgUrl || "",
        //         donGia: sanPham.donGia,
        //         soLuongSanPham: sanPham.soLuongSanPham,
        //         hienThi: sanPham.hienThi,
        //     };

        //     yield put({
        //         type: Actions.SAN_PHAM_CHECK_SAVED,
        //         data: {
        //             sanPham: newObj,
        //             ttype: "create"
        //         }
        //     })

        //     const res = yield take(Actions.SAN_PHAM_CHECK_SAVED_TAKE);
        //     const { newSanPham } = res.data;
        //     console.log(newSanPham);
        //     let newDanhSachSanPham = [newSanPham, ...danhSachSanPham];
        //     yield put({
        //         type: Actions.SAN_PHAM_SAVE, data:
        //         {
        //             newDanhSachSanPham: newDanhSachSanPham
        //         }
        //     });
        //     getNotification("Thành công", "Sản phẩm được tạo thành công");

    } catch (error) { }
}

// function getRandomIntInclusive(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
// }
/*
function* workerMappingSanPham(action) {
    try {
        const { data = {} } = action;
        const { sanPhamList } = data;
        let newDanhSachSanPham = [];
        sanPhamList.forEach((sanPham, index) => {
            const sanPhamTmp = {
                // id: uuidv4(),
                // ten: sanPham.name,
                // moTa: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
                // linkHinhAnh: sanPham.image.url,
                // donGia: getRandomIntInclusive(100, 5000) * 1000,
                // soLuongSanPham: getRandomIntInclusive(0, 50),
                // hienThi: true,
                // moTa: sanPham.bred_for
                id: sanPham.id,
                // ten: sanPham.title,
                // linkHinhAnh: sanPham.thumbnail,
                // donGia: getRandomIntInclusive(100, 5000) * 1000,
                // soLuongSanPham: getRandomIntInclusive(0, 50),
                // hienThi: true,
                // moTa: sanPham.description //// dummy data
                ten: sanPham.ten,
                linkHinhAnh: sanPham.linkHinhAnh,
                donGia: sanPham.donGia,
                soLuongSanPham: sanPham.soLuongSanPham,
                hienThi: sanPham.hienThi,
                moTa: sanPham.moTa
            }
            newDanhSachSanPham.push(sanPhamTmp);
        })
        yield put({
            type: Actions.SAN_PHAM_SAVE,
            data: {
                newDanhSachSanPham: newDanhSachSanPham
            }
        })
    } catch (error) { }
}

*/
function* workerUpdateHangBanTraLai(action) {
    try {
        const { data = {} } = action;
        let { dongPhatSinh: newDongPhatSinh, hangBanTraLai: newHangBanTraLai } = data;

        const { hangBanTraLai } = yield select(state => state.hangBanTraLai);
        const { dongPhatSinh } = yield select(state => state.hangBanTraLai);

        const index = findIndex(hangBanTraLai, { _id: newHangBanTraLai._id });

        let copyHangBanTraLai = cloneDeep(hangBanTraLai);
        let copyDongPhatSinh = cloneDeep(dongPhatSinh);

        console.log(newHangBanTraLai);


        newHangBanTraLai.invoice_date = newHangBanTraLai.invoice_date._d.toString();
        newHangBanTraLai.entry_date = newHangBanTraLai.entry_date._d.toString();

        copyHangBanTraLai[index] = newHangBanTraLai;

        for (let i = 0; i < newDongPhatSinh.length; i++) {
            let index = findIndex(hangBanTraLai, { _id: newDongPhatSinh[i]._id });
            if (index > -1)
                assign(copyDongPhatSinh[index], { hangBanTraLaiId: newHangBanTraLai._id, ...newDongPhatSinh[i] });
            if (i > dongPhatSinh.length - 1)
                copyDongPhatSinh.push({ hangBanTraLaiId: newHangBanTraLai._id, ...newDongPhatSinh[i] });
        }

        console.log(copyDongPhatSinh);

        yield put({
            type: Actions.HANG_BAN_TRA_LAI_SAVE,
            data: {
                copyDongPhatSinh: copyDongPhatSinh,
                copyHangBanTraLai: copyHangBanTraLai
            }
        })


        // yield put({
        //     type: Actions.SAN_PHAM_CHECK_SAVED,
        //     data: {
        //         sanPham: sanPham,
        //         ttype: "update"
        //     }
        // });

        // const res = yield take(Actions.SAN_PHAM_CHECK_SAVED_TAKE);
        // const { newSanPham } = res.data;
        // if (newSanPham.id) {
        //     yield put({
        //         type: Actions.SAN_PHAM_SAVE,
        //         data: {
        //             newDanhSachSanPham: newDanhSachSanPham
        //         }
        //     });
        //     getNotification("Thành công", "Sản phẩm đã được cập nhật");
        // }

    } catch (error) { }
}

/*

function* workerDeleteSanPham(action) {
    try {
        const { data = {} } = action;
        let { idSanPham } = data;
        const { danhSachSanPham } = yield select(state => state.reducerSanPham);

        // yield put({
        //     type: Actions.SAN_PHAM_SAVE,
        //     data: {
        //         newDanhSachSanPham: newDanhSachSanPham
        //     }
        // });

        yield put({
            type: Actions.SAN_PHAM_CHECK_SAVED,
            data: {
                id: idSanPham,
                ttype: "delete"
            }
        });

        // const res = yield take(Actions.SAN_PHAM_CHECK_SAVED_TAKE);
        // const { isSaved } = res.data;

        const res = yield take(Actions.SAN_PHAM_CHECK_SAVED_TAKE);
        const { newSanPham } = res.data;
        let newDanhSachSanPham = danhSachSanPham.filter(sanPham => sanPham.id !== newSanPham.id);
        yield put({
            type: Actions.SAN_PHAM_SAVE, data:
            {
                newDanhSachSanPham: newDanhSachSanPham
            }
        });
        getNotification("Thành công", "Đã xóa sản phẩm");

    } catch (error) { }
}

function* workerDeleteMultiSanPham(action) {
    try {
        const { data = {} } = action;
        const { sanPhamToDelete } = data;
        console.log("delete multi", sanPhamToDelete)
        const { danhSachSanPham } = yield select(state => state.reducerSanPham);
        let newDanhSachSanPham = lodash.differenceBy(danhSachSanPham, sanPhamToDelete, 'id');

        // yield put({
        //     type: Actions.SAN_PHAM_SAVE,
        //     data: {
        //         newDanhSachSanPham: newDanhSachSanPham
        //     }
        // });

        for (let i = 0; i < sanPhamToDelete.length; i++) {
            yield put({
                type: Actions.SAN_PHAM_CHECK_SAVED,
                data: {
                    id: sanPhamToDelete[i].id,
                    ttype: "delete"
                }
            });

            // const res = yield take(Actions.SAN_PHAM_CHECK_SAVED_TAKE);
            // const { isSaved } = res.data;

            const res = yield take(Actions.SAN_PHAM_CHECK_SAVED_TAKE);
            const { newSanPham } = res.data;
            if (newSanPham.id) {

                getNotification("Thành công", "Đã xóa sản phẩm");
            }
        }

        yield put({
            type: Actions.SAN_PHAM_SAVE, data:
            {
                newDanhSachSanPham: newDanhSachSanPham
            }
        });

        // yield put({
        //     type: Actions.SAN_PHAM_CHECK_SAVED,
        //     data: {
        //         prevDanhSachSanPham: danhSachSanPham
        //     }
        // });

        // const res = yield take(Actions.SAN_PHAM_CHECK_SAVED_TAKE);
        // const { isSaved } = res.data;
        // if (isSaved) getNotification("Thành công", "Đã xóa sản phẩm được chọn");
    } catch (error) {

    }
}

function* workerChangeStatus(action) {
    try {
        const { data = {} } = action;
        const { idSanPham, hienThi } = data;
        const { danhSachSanPham } = yield select(state => state.reducerSanPham);
        const index = danhSachSanPham.findIndex(sanPham => sanPham.id === idSanPham);
        let newDanhSachSanPham = lodash.cloneDeep(danhSachSanPham);
        newDanhSachSanPham[index].hienThi = !hienThi;

        // yield put({
        //     type: Actions.SAN_PHAM_SAVE,
        //     data: {
        //         newDanhSachSanPham: newDanhSachSanPham
        //     }
        // });

        yield put({
            type: Actions.SAN_PHAM_CHECK_SAVED,
            data: {
                sanPham: newDanhSachSanPham[index],
                ttype: "update"
            }
        });

        const res = yield take(Actions.SAN_PHAM_CHECK_SAVED_TAKE);
        const { newSanPham } = res.data;
        if (newSanPham.id) {
            yield put({
                type: Actions.SAN_PHAM_SAVE,
                data: {
                    newDanhSachSanPham: newDanhSachSanPham
                }
            });
            getNotification("Thành công", "Đã thay đổi trạng thái hiển thị");
        }

    } catch (error) { }

}

// Kiểm tra call api thành công hay không

function* workerCheckSavedSanPham(action) {
    try {
        const { data = {} } = action;
        const { sanPham, ttype, id } = data;
        let res = null;
        switch (ttype) {
            case "create": {
                res = yield call(workerPostApi, { sanPham: sanPham });
                break;
            };

            case "delete": {
                res = yield call(workerDeleteApi, { id: id })
                break;
            }

            case "update": {
                res = yield call(workerUpdateApi, { sanPham: sanPham })
                break;
            }

            default: {
                console.log("chua nhap ttype")
                break;
            }
        }
        yield put({
            type: Actions.SAN_PHAM_CHECK_SAVED_TAKE,
            data: {
                newSanPham: res
            }
        })

    } catch (error) { }
}


function* workerCallApi() {
    try {
        let res = yield call(workerDoApiCall);
        yield put({
            type: Actions.SAN_PHAM_MAPPING,
            data: {
                sanPhamList: res
            }
        })
    } catch (error) { }
}
/// Call API

function workerUpdateApi(data) {
    const { sanPham } = data;
    console.log(sanPham.id);
    const options = {
        method: 'PUT',
        url: `https://637471ab08104a9c5f8038ef.mockapi.io/api/v1/products/${sanPham.id}`,
        data: sanPham
    }

    return axios(options).then(res => {
        console.log(res.data)
        return res.data;
    }).catch(error => {
        return { error: "error-catch" };
    })
}

function workerDeleteApi(data) {
    const { id } = data;
    const options = {
        method: 'DELETE',
        url: `https://637471ab08104a9c5f8038ef.mockapi.io/api/v1/products/${id}`,
    }

    return axios(options).then(res => {
        return res.data;
    }).catch(error => {
        return { error: "error-catch" };
    })
}


function workerPostApi(data) {
    const options = {
        method: 'POST',
        url: "https://637471ab08104a9c5f8038ef.mockapi.io/api/v1/products",
        data: data.sanPham

    }

    return axios(options).then(res => {
        console.log(res.data)
        return res.data;
    }).catch(error => {
        return { error: "error-catch" };
    })
}

function workerDoApiCall(action) {
    const options = {
        method: 'GET',
        url: "https://637471ab08104a9c5f8038ef.mockapi.io/api/v1/products",
        // url: "https://dummyjson.com/products",
        // params: {
        //     limit: 100
        // }
    }

    return axios(options).then(res => {
        return res.data;
        // return res.data.products;
    }).catch(error => {
        return { error: "error-catch" };
    })
}*/