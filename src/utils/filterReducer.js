// Reducer function to handle filter state changes
const filterReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_LANGUAGE':
            return { ...state, language: action.payload };
        case 'SET_USECASE':
            return { ...state, usecase: action.payload };
        case 'SET_TAG':
            return { ...state, codeTags: action.payload };
        default:
            return state;
    }
};

export default filterReducer;