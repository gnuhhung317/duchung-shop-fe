import { IsPhoneNumber, isString, IsString } from "class-validator";
export class RegisterDto{
    @IsString()
    @IsPhoneNumber()
    phoneNumber:String;
    @IsString()
    password:String;
    @IsString()
    retypePassword:String;
    @IsString()
    fullName:String;
    address:String;
    dateOfBirth:Date;
    facebookAccountId:number;
    googleAccountId:number;
    roleId:number;

    constructor(phoneNumber:String, password:String, retypePassword:String, fullName:String, address:String, dateOfBirth:Date, facebookAccountId:number, googleAccountId:number, roleId:number){
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.retypePassword = retypePassword;
        this.fullName = fullName;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.facebookAccountId = facebookAccountId;
        this.googleAccountId = googleAccountId;
        this.roleId = roleId;
    }
}