const {models,model,Schema}=require('mongoose');

const UserSchema=new Schema({
    phone_number:{
        type:Number,
        validate:{
            validator:function(v){
                return /\d{10}/.test(v);
            },
            message: (props) => `${props.value} is not a valid 10-digit phone number!`,
        },
        required:true,
        
    },
    priority:{
        type:Number,
        enum:[0,1,2], //twillo calling priority
        default:0
    }
})

const User=models.User || model("User",UserSchema);

module.exports=User;