import * as Actions from "../controllers/action-types/actionTypesHangBanTraLai";

const initialState = {
    donBanHang: [
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
        },
        {
            id: 2,
            name: "DBH/2022/002",
            invoice_code: "BH02",
            description: "Bán hàng cho Tuyền",
            partner_id: "Ngoc Bao",
            invoice_date: "Tue Nov 18 2022 14:18:33 GMT+0700 (Indochina Time)",
            entry_date: "Tue Nov 18 2022 14:18:33 GMT+0700 (Indochina Time)",
            tot_amount: 2850000,
            status: "post"
        }
    ],
    dongPhatSinhDonBanHang: [
        {
            credit_account_id: 1111,
            debit_account_id: 1112,
            donBanHangId: 1,
            name: "SSD",
            price: 500000,
            product_id: "SP01",
            quantity: 3,
            tax_credit_account_id: "",
            tax_debit_account_id: "",
            tax_name: "",
            uom_id: "cai",
            warehouse_id: "",
            _id: "637c60c05fe8eb4c038b156c",
            id: "2",
            amount: ""
        },
        {
            credit_account_id: 1111,
            debit_account_id: 1112,
            donBanHangId: 2,
            name: "SSD",
            price: 500000,
            product_id: "SP02",
            quantity: 3,
            tax_credit_account_id: "",
            tax_debit_account_id: "",
            tax_name: "",
            uom_id: "cai",
            warehouse_id: "",
            _id: "637c60c05fe8eb4c038b156c",
            id: "2",
            amount: ""
        },
    ]
}

export default (state = initialState, action) => {
    switch (action.type) {
        // case Actions.HANG_BAN_TRA_LAI_SAVE: {
        //     const { data = {} } = action;
        //     const { copyHangBanTraLai, copyDongPhatSinh } = data;
        //     return {
        //         ...state,
        //         hangBanTraLai: copyHangBanTraLai,
        //         dongPhatSinh: copyDongPhatSinh
        //     }
        // }

        // case Actions.HANG_BAN_TRA_LAI_SINGLE_SAVE: {
        //     const { data = {} } = action;
        //     const { copyHangBanTraLai } = data;
        //     return {
        //         ...state,
        //         hangBanTraLai: copyHangBanTraLai
        //     }
        // }


        default:
            return state;
    }
}