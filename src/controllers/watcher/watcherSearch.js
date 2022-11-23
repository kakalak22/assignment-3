import { takeLeading, put, call, select } from "redux-saga/effects";
import * as Actions from "../action-types/actionTypesSearch";
import * as ActionsHangBanTraLai from "../action-types/actionTypesHangBanTraLai";
import axios from "axios";
import * as lodash from "lodash";
import { notification } from "antd";
import { isEqual } from "lodash";

const apiEndPointHangBanTraLai = "https://637471ab08104a9c5f8038ef.mockapi.io/api/v1/hangBanTraLai";


export function* watcherSearch() {
    yield takeLeading(Actions.SEARCH_PROCESS, watcherSearchProcess);
}

function* watcherSearchProcess(action) {
    try {
        const { data = {} } = action;
        const { searchValue, status, isReset } = data;

        const resApiSearch = yield call(workerDoSearchApi, { apiEndPoint: apiEndPointHangBanTraLai, searchValue: searchValue });

        let newHangBanTraLai = [];

        switch (status) {
            case "all": {
                newHangBanTraLai = resApiSearch;
                break;
            }
            default: {
                newHangBanTraLai = resApiSearch.filter(row => row.status === status);
                break
            }
        }

        if (!isReset && newHangBanTraLai.length >= 1) {
            notification.success({
                message: "Thành công",
                description: `Tìm thấy ${newHangBanTraLai.length} chứng từ theo yêu cầu!`,
                duration: 2,
                placement: "topRight",

            })
        }

        if (newHangBanTraLai.length < 1) {
            notification.warning({
                message: "Không tìm thấy chứng từ theo yêu cầu",
                duration: 2,
                placement: "topRight",

            })
        }


        yield put({
            type: ActionsHangBanTraLai.HANG_BAN_TRA_LAI_SINGLE_SAVE,
            data: {
                copyHangBanTraLai: newHangBanTraLai
            }
        })


    } catch (error) { }

}

function workerDoSearchApi(data) {
    const options = {
        method: 'GET',
        url: data.apiEndPoint,
        params: {
            search: data.searchValue
        }
    }

    return axios(options).then(res => {
        return res.data;
        // return res.data.products;
    }).catch(error => {
        return { error: "error-catch" };
    })
}