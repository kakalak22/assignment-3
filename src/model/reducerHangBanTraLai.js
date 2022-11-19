import * as Actions from "../controllers/action-types/actionTypesHangBanTraLai";

const initialState = {
    hangBanTraLai: [
        {
            id: 1,
            name: "DBH/2022/001",
            invoice_code: "BH01",
            description: "Bán hàng cho Tuyền",
            partner_id: "Ngoc Tuyen",
            invoice_date: "17/11/2022",
            entry_date: "17/11/2022",
            tot_amount: 2850000,
            status: "post"
        }
    ]
}

export default (state = initialState, action) => {
    switch (action.type) {
        // case Actions.SAVE_ITEM_TO_CART: {
        //     const { data = {} } = action;
        //     const { newMyCart } = data;
        //     return {
        //         ...state
        //     }
        // }
        default:
            return state;
    }
}