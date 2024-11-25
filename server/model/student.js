const mongoose = require("mongoose");

// Define the schema
const NewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
    },
    dob: {
        type: Date,
        required: true,
      
    },
    address: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
        unique: true, // Ensure roll numbers are unique
    }
});

// Pre-save hook to generate roll number
NewSchema.pre("save", async function (next) {
    if (!this.rollNumber) {
        try {
            // Create a unique six-digit roll number
            const lastStudent = await mongoose
                .model("students", NewSchema)
                .findOne({ batch: this.batch, section: this.section })
                .sort({ rollNumber: -1 }); // Sort by rollNumber descending

            let lastRollNumber = 0;
            if (lastStudent?.rollNumber) {
                // Extract the last numeric part of the roll number
                lastRollNumber = parseInt(lastStudent.rollNumber.slice(-3)) || 0;
            }

            // Generate the new roll number
            const newRollNumber = `SVCNMCA-${this.batch}-${(lastRollNumber + 1).toString().padStart(3, "0")}`;

            this.rollNumber = newRollNumber;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

// Create the model
const studentModel = mongoose.model("students", NewSchema);

module.exports = studentModel;
