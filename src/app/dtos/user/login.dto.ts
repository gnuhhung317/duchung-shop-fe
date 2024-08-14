import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator"

export class LoginDto{
    @IsPhoneNumber()
    @IsString()
    
    phoneNumber:String
    @IsString()
    @IsNotEmpty()
    password:String

    @IsNumber()
    roleId:Number
    constructor(data:any){
        this.phoneNumber = data.phoneNumber
        this.password = data.password
        this.roleId=data.roleId
    }
}