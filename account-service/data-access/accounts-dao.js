const Account = require("../models/account")

module.exports = class AccountDAO{
    static async createAcc(accountObj){
        try{
            accountObj.dateCreated = new Date()
            const accObj = await new Account(accountObj).save()
            return accObj
        }
        catch(error){
            console.log(`Could not create an account : ${error}`)
            return error
        }
    }

    static async getAccDet(){

    }

    static async doDep(){

    }

    static async doWith(){

    }
}