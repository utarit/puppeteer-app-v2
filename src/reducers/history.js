const historyReducerDefaultState = [];

const historyReducer = (state = historyReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD':
            return [...state, action.record];
        case 'REMOVE':
            console.log('OK')
            return state.filter(({id}) => action.id !== id);
        default:
            return state;
    }
};

export default historyReducer;