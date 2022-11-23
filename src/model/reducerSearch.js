import * as Actions from "../controllers/action-types/actionTypesSearch";

const initialState = {
    searchResults: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case Actions.SEARCH_SAVE_RESULT: {
            const { data = {} } = action;
            const { hangBanTraLai } = data;
            return {
                ...state,
                searchResults: hangBanTraLai,
            }
        }



        default:
            return state;
    }
}