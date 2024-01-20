const {models,model,Schema}=require('mongoose');

const UserSchema=new Schema({
    phone_number:{
        type:Number,
        required:true        
    },
    priority:{
        type:Number,
        enum:[0,1,2],
        default:0
    }
})

const User=models.User || model("User",UserSchema);

module.exports=User;