import { notification } from "antd";
import { takeLeading, select, put, take, call, fork, delay } from "redux-saga/effects";
import * as Actions from "../action-types/actionTypesHangBanTraLai";
import axios from "axios";
import * as lodash from "lodash";
import { assign, cloneDeep, find, findIndex } from "lodash";

const apiEndPointDongPhatSinh = "https://637471ab08104a9c5f8038ef.mockapi.io/api/v1/dongPhatSinh";
const apiEndPointHangBanTraLai = "https://637471ab08104a9c5f8038ef.mockapi.io/api/v1/hangBanTraLai";

const ObjectID = require("bson-objectid");

export function* watcherHangBanTraLai() {
    yield takeLeading(Actions.HANG_BAN_TRA_LAI_CREATE_NEW, workerCreateNewHangBanTraLai);
    yield takeLeading(Actions.HANG_BAN_TRA_LAI_UPDATE, workerUpdateHangBanTraLai);
    yield takeLeading(Actions.HANG_BAN_TRA_LAI_UPDATE_STATUS, workerUpdateHangBanTraLaiStatus);
    yield takeLeading(Actions.HANG_BAN_TRA_LAI_GET_DATA_API, workerCallApi);
    yield takeLeading(Actions.HANG_BAN_TRA_LAI_CHECK_SAVED, workerCheckSavedHangBanTraLai)
    yield takeLeading(Actions.DONG_PHAT_SINH_MULTI_SAVE, workerSaveMultiDongPhatSinh);
}

const getNotification = (message, description) => {
    notification.success({
        message: message,
        description: description,
        placement: "bottomRight",
        duration: 1
    })
}

function* workerCreateNewHangBanTraLai(action) {
    try {
        const hangBanTraLaiId = ObjectID().toString();
        const { data = {} } = action;
        const { hangBanTraLai: newHangBanTraLai, dongPhatSinh: newDongPhatSinh } = data;

        let newLineHangBanTraLai = {
            invoice_symbol: newHangBanTraLai.invoice_symbol,
            invoice_date: newHangBanTraLai.invoice_date._d.toString(),
            entry_date: newHangBanTraLai.entry_date._d.toString(),
            _id: hangBanTraLaiId,
            name: "",
            invoice_code: newHangBanTraLai.invoice_code,
            description: newHangBanTraLai.description ? newHangBanTraLai.description : `Hang ban tra lai cua ${newHangBanTraLai.partner_id}`,
            partner_id: newHangBanTraLai.partner_id,
            tot_amount: newHangBanTraLai.tot_amount,
            status: "unpost"
        };

        // const copyDongPhatSinh = [...newLineDongPhatSinh, ...dongPhatSinh];


        yield put({
            type: Actions.HANG_BAN_TRA_LAI_CHECK_SAVED,
            data: {
                newData: newLineHangBanTraLai,
                ttype: "create",
                apiEndPoint: apiEndPointHangBanTraLai,
            }
        })
        const res = yield take(Actions.HANG_BAN_TRA_LAI_CHECK_SAVED_TAKE);
        let copyHangBanTraLai = yield call(workerDoApiCall, { apiEndPoint: apiEndPointHangBanTraLai });


        //thuc hien save dong phat sinh

        let newLineDongPhatSinh = cloneDeep(newDongPhatSinh);
        newLineDongPhatSinh.forEach((row, index) => {
            row.hangBanTraLaiId = hangBanTraLaiId;
        }
        );

        yield put({
            type: Actions.DONG_PHAT_SINH_MULTI_SAVE,
            data: {
                newLineDongPhatSinh: newLineDongPhatSinh,
            }
        })
        yield take(Actions.DONG_PHAT_SINH_CHECK_SAVED_TAKE);

        let copyDongPhatSinh = yield call(workerDoApiCall, { apiEndPoint: apiEndPointDongPhatSinh });

        yield put({
            type: Actions.HANG_BAN_TRA_LAI_SAVE,
            data: {
                copyDongPhatSinh: copyDongPhatSinh,
                copyHangBanTraLai: copyHangBanTraLai
            }
        })
        // end of save dong phat sinh

        getNotification("Thành công", "Chứng từ được tạo thành công");
        action.getId(hangBanTraLaiId);
        action.setIsLoading(false);
    } catch (error) { }
}

function* workerSaveMultiDongPhatSinh(action) {
    try {
        const { data = {} } = action;
        const { newLineDongPhatSinh } = data;
        for (let i = 0; i < newLineDongPhatSinh.length; i++) {
            yield call(workerPostApi, { newData: newLineDongPhatSinh[i], apiEndPoint: apiEndPointDongPhatSinh });
        }
        yield put({
            type: Actions.DONG_PHAT_SINH_CHECK_SAVED_TAKE,
        })
    } catch (error) {
        console.log(error);
    }
}


function* workerUpdateHangBanTraLai(action) {
    try {
        console.log("watcher update")
        const { data = {} } = action;
        let { dongPhatSinh: newDongPhatSinh, hangBanTraLai: newHangBanTraLai } = data;

        const { hangBanTraLai } = yield select(state => state.hangBanTraLai);
        const { dongPhatSinh } = yield select(state => state.hangBanTraLai);

        const index = findIndex(hangBanTraLai, { _id: newHangBanTraLai._id });

        let copyDongPhatSinh = cloneDeep(dongPhatSinh);
        let copyHangBanTraLai = cloneDeep(hangBanTraLai);


        newHangBanTraLai.invoice_date = newHangBanTraLai.invoice_date._d.toString();
        newHangBanTraLai.entry_date = newHangBanTraLai.entry_date._d.toString();

        yield put({
            type: Actions.HANG_BAN_TRA_LAI_CHECK_SAVED,
            data: {
                newData: newHangBanTraLai,
                ttype: "update",
                apiEndPoint: apiEndPointHangBanTraLai,
                id: copyHangBanTraLai[index].id
            }
        })

        yield take(Actions.HANG_BAN_TRA_LAI_CHECK_SAVED_TAKE);



        let temp = copyDongPhatSinh.filter(el => el.hangBanTraLaiId === copyHangBanTraLai[index]._id);
        console.log(temp);
        for (let i = 0; i < newDongPhatSinh.length; i++) {
            let index = findIndex(dongPhatSinh, { _id: newDongPhatSinh[i]._id });
            if (index > -1) {
                assign(copyDongPhatSinh[index], { hangBanTraLaiId: newHangBanTraLai._id, ...newDongPhatSinh[i] });
                yield call(workerUpdateApi, { newData: copyDongPhatSinh[index], apiEndPoint: apiEndPointDongPhatSinh, id: copyDongPhatSinh[index].id })
            }
            if (temp.length < newDongPhatSinh.length) {
                yield call(workerPostApi, { newData: newDongPhatSinh[i], apiEndPoint: apiEndPointDongPhatSinh });
            }
            if (temp.length > newDongPhatSinh.length) {
                yield call(workerDeleteApi, { id: copyDongPhatSinh[index].id, apiEndPoint: apiEndPointDongPhatSinh })
            }
        }


        let res1 = yield call(workerDoApiCall, { apiEndPoint: apiEndPointHangBanTraLai });
        let res2 = yield call(workerDoApiCall, { apiEndPoint: apiEndPointDongPhatSinh });
        action.setIsLoading(false);
        action.setReadOnly(true);
        getNotification("Thành công", "Chứng từ đã được cập nhật");

        yield put({
            type: Actions.HANG_BAN_TRA_LAI_SAVE,
            data: {
                copyDongPhatSinh: res2,
                copyHangBanTraLai: res1
            }
        })

    } catch (error) { }
}

function* workerUpdateHangBanTraLaiStatus(action) {
    try {
        const { hangBanTraLai } = yield select(state => state.hangBanTraLai);
        const { dongPhatSinh } = yield select(state => state.hangBanTraLai);
        const { data = {} } = action;
        const { _id, status } = data;

        const index = findIndex(hangBanTraLai, { _id: _id });
        let copyHangBanTraLai = cloneDeep(hangBanTraLai);
        copyHangBanTraLai[index].status = status;

        if (status === "post") {
            copyHangBanTraLai[index].name = `HBTL/2022/00${copyHangBanTraLai[index].id}`
        }

        yield put({
            type: Actions.HANG_BAN_TRA_LAI_CHECK_SAVED,
            data: {
                newData: copyHangBanTraLai[index],
                ttype: "update",
                apiEndPoint: apiEndPointHangBanTraLai,
                id: copyHangBanTraLai[index].id
            }
        })

        yield take(Actions.HANG_BAN_TRA_LAI_CHECK_SAVED_TAKE);
        let res1 = yield call(workerDoApiCall, { apiEndPoint: apiEndPointHangBanTraLai });
        let res2 = yield call(workerDoApiCall, { apiEndPoint: apiEndPointDongPhatSinh });

        console.log(res1);

        yield put({
            type: Actions.HANG_BAN_TRA_LAI_SAVE,
            data: {
                copyDongPhatSinh: res2,
                copyHangBanTraLai: res1
            }
        })

        action.setStatus(status);
        action.setFieldValue("name", `HBTL/2022/00${copyHangBanTraLai[index].id}`);
        getNotification("Thành công", "Chứng từ đã được cập nhật");
    } catch (error) {
        console.log(error)
    }
}


// Kiểm tra call api thành công hay không

function* workerCheckSavedHangBanTraLai(action) {
    try {
        const { data = {} } = action;
        const { newData, ttype, id, apiEndPoint } = data;
        console.log(id);
        let res = null;
        switch (ttype) {
            case "create": {
                res = yield call(workerPostApi, { newData: newData, apiEndPoint: apiEndPoint });
                break;
            };

            case "delete": {
                res = yield call(workerDeleteApi, { id: id })
                break;
            }

            case "update": {
                res = yield call(workerUpdateApi, { newData: newData, apiEndPoint: apiEndPoint, id: id })
                break;
            }

            default: {
                console.log("chua nhap ttype")
                break;
            }
        }
        yield put({
            type: Actions.HANG_BAN_TRA_LAI_CHECK_SAVED_TAKE,
            data: {
                newData: res
            }
        })

    } catch (error) { }
}


function* workerCallApi(action) {
    try {
        let res1 = yield call(workerDoApiCall, { apiEndPoint: apiEndPointHangBanTraLai });
        let res2 = yield call(workerDoApiCall, { apiEndPoint: apiEndPointDongPhatSinh });
        yield put({
            type: Actions.HANG_BAN_TRA_LAI_SAVE,
            data: {
                copyDongPhatSinh: res2,
                copyHangBanTraLai: res1
            }
        })
        action.setIsLoading(false);
    } catch (error) { }
}
/// Call API

function workerUpdateApi(data) {
    const options = {
        method: 'PUT',
        url: `${data.apiEndPoint}/${data.id}`,
        data: data.newData
    }

    return axios(options).then(res => {
        console.log(res.data)
        return res.data;
    }).catch(error => {
        return { error: "error-catch" };
    })
}

function workerDeleteApi(data) {
    const options = {
        method: 'DELETE',
        url: `${data.apiEndPoint}/${data.id}`,
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
        url: data.apiEndPoint,
        data: data.newData

    }

    return axios(options).then(res => {
        return res.data;
    }).catch(error => {
        return { error: "error-catch" };
    })
}

function workerDoApiCall(data) {
    const options = {
        method: 'GET',
        url: data.apiEndPoint,
    }

    return axios(options).then(res => {
        return res.data;
        // return res.data.products;
    }).catch(error => {
        return { error: "error-catch" };
    })
}
