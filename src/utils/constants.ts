export const mainUrl = 'https://norma.nomoreparties.space/api/';
export const endPointLogin = 'auth/login';
export const endPointLogouting = 'auth/logout';
export const endPointRegistration = 'auth/register';
export const endPointForgotPassword = 'password-reset';
export const endPointResetPassword = 'password-reset/reset';
export const endPointRefreshToken = 'auth/token';
export const endPointUpdateUserData = 'auth/user';
export const mainUrlGoods = 'https://650ea71954d18aabfe995724.mockapi.io/kail-store-nike/';
export const endPointGoods = 'goods';
export const endPointCurrentGood = 'goods/?name=';

export const mainPATH = '/';
export const faqPATH = '/faq';
export const loginPATH = '/login';
export const registerPATH = '/register';
export const forgotPasswordPATH = '/forgot-password';
export const resetPasswordPATH = '/reset-password';
export const profilePATH = '/profile';
export const goodsPATH = '/goods';
export const goodsNamePATH = '/goods/:name';
export const subscribeAlertPATH = '/subscribe-alert';
export const cartPATH = '/cart';
export const errorPATH = '*';


export const inputsForgotPasswordPage = [
  {
    name:"email",
    type:"email",
    placeholder: "Email",
    errorMessage:"Email shoud be valid",
    label:"Email",
    image: '../../images/icons/email_icon_grey_background_icon.png',
    required: true,
  },
];

export const inputsLoginPage = [
  {
    name:"email",
    type:"email",
    placeholder: "Email",
    errorMessage:"Email shoud be valid",
    label:"Email",
    required: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage: "Password shoud be more then 6 characters and shoudn't include any special character",
    label: "Password",
    required: true,
    pattern: "^[A-Za-z0-9]{6,1000}"
  }
];

export  const inputsRegisterPage = [
  {
    name:"email",
    type:"email",
    placeholder: "Email",
    errorMessage:"Email shoud be valid",
    label:"Email",
    image: '../../images/icons/email_icon_grey_background_icon.png',
    required: true,
  },
  {
    name:"name",
    type:"name",
    placeholder: "Name",
    errorMessage:"Name should not be empty",
    label:"name",
    image: '../../images/icons/login_icon.png',
    required: true,
  },

  {
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage: "Password shoud be more then 8 characters and shoudn't include any special character",
    label: "Password",
    image:'../../images/icons/key_icon.png',
    required: true,
    pattern: "^[A-Za-z0-9]{8,1000}"
  }
];

export const inputsResetPasswordPage = [
  {
    name: "password",
    type: "password",
    placeholder: "Press new password",
    errorMessage: "Password shoud be more then 4 characters and shoudn't include any special character",
    label: "Password",
    required: true,
    pattern: "^[A-Za-z0-9]{4,1000}"
  },
  {
    name: "code",
    type: "text",
    placeholder: "Enter code from email",
    errorMessage: "",
    label: "Verify code",
    required: true,
  },
];

export const inputsProfilePage = [
  {
    name:"name",
    type:"name",
    placeholder: "Name",
    errorMessage:"Name should not be empty",
    label:"name",
    image: '../../images/icons/login_icon.png',
    required: true,
  },
  {
    name:"email",
    type:"email",
    placeholder: "Email",
    errorMessage:"Email shoud be valid",
    label:"Email",
    image: '../../images/icons/email_icon_grey_background_icon.png',
    required: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage: "Password shoud be more then 8 characters and shoudn't include any special character",
    label: "Password",
    image:'../../images/icons/key_icon.png',
    required: true,
    pattern: "^[A-Za-z0-9]{6,1000}"
  }
];