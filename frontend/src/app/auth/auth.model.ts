export class User {
    public firstName: string = "";
    public lastName: string = "";
    public email: string = "";
    public token: string = "";
};

export class CreateUser {
    public firstName: string = "";
    public lastName: string = "";
    public email: string = "";
    public password: string = "";
};

export class LoginData {
    public email: string = "";
    public password: string = "";
}