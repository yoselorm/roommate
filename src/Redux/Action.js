export const addUser = (user) => {
    return {
        type: "ADD_USER",
        payload: user,
    };
};
export const addQuestion = (question) => {
    return {
        type: "ADD_QUESTION",
        payload: question,
    };
};
export const addProfile = (profile) => {
    return {
        type: "ADD_PROFILE",
        payload: profile,
    };
};
export const addDetails = (details) => {
    return {
        type: "ADD_DETAILS",
        payload: details,
    };
};
export const authUser = (auth) => {
    return {
        type: "AUTH_USER",
        payload: auth,
    }
}
export const editUser = (edit) => {
    return {
        type: "EDIT_USER",
        payload: edit,
    };
};
export const deleteUser = (Delete) => {
    return {
        type: "DELETE_USER",
        payload: Delete,
    };
};

