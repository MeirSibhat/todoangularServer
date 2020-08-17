const mongoose = require("mongoose");
//const Joi = require("@hapi/joi");
//const config = require("config");


const toDoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 99
    },
    category: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 99
    },
    date: {
        type: String,
        required: true,
    }

})
exports.todoModel = mongoose.model("todos", toDoSchema)
/*  
    date: {
        type: String,
        required: true,
    }
    
moment().format('MM/DD/YYYY')
const validUser = (_user) => {
    let JoiSchema = Joi.object({
      id:Joi.string(),
      userName:Joi.string().min(2).max(99).required(),
    })
    return JoiSchema.validate(_user);
  }
  exports.validUser = validUser;

  */