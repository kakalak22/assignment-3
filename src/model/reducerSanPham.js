
const initialState = {
    danhSachSanPham: [
        {
            product_id: "SP01",
            name: "SSD",
            price: 500000,
            uom_id: "cai",
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