import * as Actions from "../controllers/action-types/actionTypesHangBanTraLai";

const initialState = {
    hangBanTraLai: [
        {
            id: 1,
            name: "DBH/2022/001",
            invoice_code: "BH01",
            description: "Bán hàng cho Tuyền",
            partner_id: "Ngoc Tuyen",
            invoice_date: "Tue Nov 15 2022 14:18:33 GMT+0700 (Indochina Time)",
            entry_date: "Tue Nov 15 2022 14:18:33 GMT+0700 (Indochina Time)",
            tot_amount: 2850000,
            status: "post"
        }
    ],
    dongPhatSinh: [

    ]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.HANG_BAN_TRA_LAI_SAVE: {
            const { data = {} } = action;
            const { copyHangBanTraLai, copyDongPhatSinh } = data;
            return {
                ...state,
                hangBanTraLai: copyHangBanTraLai,
                dongPhatSinh: copyDongPhatSinh
            }
        }

        case Actions.HANG_BAN_TRA_LAI_SINGLE_SAVE: {
            const { data = {} } = action;
            const { copyHangBanTraLai } = data;
            return {
                ...state,
                hangBanTraLai: copyHangBanTraLai
            }
        }


        default:
            return state;
    }
}