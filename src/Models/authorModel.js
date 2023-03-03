const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        collegeId: {
            type: objectId,
            ref: "CollegeModel"
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true });


module.exports = mongoose.model('Intern', internSchema)
