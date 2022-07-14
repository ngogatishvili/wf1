// selectors

export const userSelector = (store) => store.user.user;
export const showRegisterAlertSelector = (store) => store.user.showRegisterAlert;
export const registerAlertSelector = (store) => store.user.registerAlert;
export const showLoginAlertSelector = (store) => store.user.showLoginAlert;
export const loginAlertSelector = (store) => store.user.loginAlert;
export const showChangeAlertSelector = (store) => store.user.changeAlert;
export const changeAlertText = (store) => store.user.changeAlertText;
export const userImageSelector = (store) => store.user.img;
export const showImageAlertSelector = (store) => store.user.showImgAlert;
export const imageAlertTextSelector = (store) => store.user.imgAlertText;
export const showPassAlertSuccessSelector = (store) => store.user.showPassAlertSuccess;
export const passAlertSuccessSelector = (store) => store.user.passAlertSuccess;
export const showPassAlertErrorSelector = (store) => store.user.showPassAlertError;
export const passAlertErrorSelector = (store) => store.user.passAlertError;
