import * as Actions from "../actionTypesSearch";

const initialState = {
    searchResults: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case Actions.SEARCH_SAVE_RESULT: {
            const { data = {} } = action;
            const { newDanhSachSanPham } = data;
            return {
                ...state,
                searchResults: newDanhSachSanPham,
                isSearchClicked: isSearchClicked
            }
        }



        default:
            return state;
    }
}