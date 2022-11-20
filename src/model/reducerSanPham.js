
const initialState = {
    danhSachSanPham: [
        {
            product_id: "SP01",
            name: "SSD",
            price: 500000,
            uom_id: "cai",
        },
        {
            product_id: "SP02",
            name: "CPU core i9",
            price: 500000,
            uom_id: "cai",
        },
        {
            product_id: "SP03",
            name: "Ram",
            price: 500000,
            uom_id: "cai",
        },
        {
            product_id: "SP04",
            name: "HDD",
            price: 500000,
            uom_id: "cai",
        },
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