const mongoose = require('mongoose');
//创建集合规则
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        requied: true,
        minllength: 2,
        maxlength: 10
    },
    age: {
        type: Number,
        min: 12,
        max: 45
    },
    sex: String,
    email: String,
    hobbies: [String],
    collage: String,
    enterDate: {
        type: Date,
        default: Date.now
    }
});
//创建学生集合
const Student = mongoose.model('Student', studentSchema);

//将学生信息集合进行导出
module.exports = Student;