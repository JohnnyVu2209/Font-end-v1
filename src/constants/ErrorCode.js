const ERRORS = {
    //login error
    ERR_USER_NOT_BLANK : 'ErrorMessage.EnterUsername',
    ERR_PASSWORD_NOT_BLANK: 'ErrorMessage.EnterPassword',
    ERR_LOGIN_FAIL: 'ErrorMessage.UsernameOrPasswordIsIncorrect',

    //toast type
    DANGER:'danger',

    //User feild message
    REQUIRED_USERNAME: "ErrorMessage.RequiredUsername",
    MIN_USERNAME:"ErrorMessage.MinUser",
    MAX_USERNAME:"ErrorMessage.MaxUser",
    FORMAT_USERNAME:"ErrorMessage.UserFormat",
    REQUIRED_PASSWORD: "ErrorMessage.RequiredPassword",
    PASSWORD_FORMAT:"ErrorMessage.PasswordFormat",
    REQUIRED_FIRSTNAME:"ErrorMessage.RequiredFName",
    MAX_FIRSTNAME:"ErrorMessage.MaxFirstName",
    MAX_LASTNAME:"ErrorMessage.MaxLastName",
    REQUIRED_LASTNAME:"ErrorMessage.RequiredLName",
    PHONE_FORMAT:"ErrorMessage.PhoneFormat",
    EMAIL_FORMAT:"ErrorMessage.EmailFormat",
    MAX_EMAIL:"ErrorMessage.MaxEmail",
    MIN_DOB:"ErrorMessage.MinDob",
    MAX_DOB:"ErrorMessage.MaxDob",
    MIN_ADDRESS:"ErrorMessage.MinAddress",
    MAX_AVATAR:"ErrorMessage.MaxAvatar",
    AVATAR_FORMAT:"ErrorMessage.AvatarFormat",
    REQUIRED_ROLE:"ErrorMessage.RequiredRole",
    REQUIRED_CODE:"ErrorMessage.RequiredCode",
    REQUIRED_CENTER:"ErrorMessage.RequiredCenter",
    REQUIRED_GENDER:"ErrorMessage.RequiredGender",
    //User Action fail
    CREATE_USER_FAIL: "ErrorMessage.CrUserFail",
    UPDATE_USER_FAIL: "ErrorMessage.UpUserFail",
    DELETE_USER_FAIL: "ErrorMessage.DelUserFail",

    //Center field message
    REQUIRED_CENTERNAME: "ErrorMessage.RequiredCentername",
    URL_FORMAT:"ErrorMessage.UrlFormat",
    //Center action fail
    CREATE_CENTER_FAIL: "ErrorMessage.CrCenterFail",
    UPDATE_CENTER_FAIL: "ErrorMessage.UpCenterFail",
    DELETE_CENTER_FAIL: "ErrorMessage.DelCenterFail",
    REMOVE_MEMBER_FAIL: "ErrorMessage.RmvMemFail",
    ADD_MEMBER_FAIL: "ErrorMessage.AddMemFail",
    //Role action fail
    CREATE_ROLE_FAIL:"ErrorMessage.CrRoleFail",
    DELETE_ROLE_FAIL:"ErrorMessage.DelRoleFail",
    EDIT_ROLE_FAIL:"ErrorMessage.EditRoleFail",
    NOT_ALLOW_DELETE_DEFAULT_ROLE:"ErrorMessage.DelDefRole"

};

export default ERRORS;