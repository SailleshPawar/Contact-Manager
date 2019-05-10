class User {
    constructor(username,confirmPassword, password,RoleId,IsDisable,id,errors) {
        this.username = username;
        this.confirmPassword=confirmPassword;
        this.password = password;
        this.RoleId = RoleId;
        this.IsDisable = IsDisable;     
        this.id = id;
        this.errors=errors;
    }
}

export default User;