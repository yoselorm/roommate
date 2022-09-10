const initialState = {
    users: [],


    question: [],
    profile: [],
    authUser: false
}




export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER":
            return (state = { ...state, users: action.payload });

        //return (state = { users: [...action.payload] });
        //return { user: action.payload }
        case "ADD_QUESTION":
            return (state = { ...state, question: [...state.question, action.payload] });
        case "ADD_PROFILE":
            // return (state = { ...state, profile: [...state.profile, action.payload] });
            return (state = { ...state, profile: action.payload });
        case 'AUTH_USER':
            return { authUser: action.payload }

        case "EDIT_USER":
            const newData = state.users.filter(
                (user) => user.id !== action.payload.id
            );
            return { users: [...newData, action.payload] };

        case "DELETE_USER":
            const deleteUser = state.users.filter((users) => users.id !== action.payload.id)
            return { users: [...deleteUser] };
        default:
            return state;
    }
}


export default profileReducer;


