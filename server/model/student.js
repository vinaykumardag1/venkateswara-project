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
    },
});

// Pre-save hook to generate roll number
NewSchema.pre("save", async function (next) {
    if (!this.rollNumber) {
        try {
            // Fetch the last student in the same batch and section
            const lastStudent = await this.constructor
                .findOne({ batch: this.batch, section: this.section })
                .sort({ rollNumber: -1 });

            let lastRollNumber = 0;
            if (lastStudent?.rollNumber) {
                // Extract the numeric part of the roll number
                const match = lastStudent.rollNumber.match(/\d+$/);
                lastRollNumber = match ? parseInt(match[0], 10) : 0;
            }

            // Generate the new roll number
            let newRollNumber = `SVCNMCA-${this.batch}-${(lastRollNumber + 1).toString().padStart(3, "0")}`;

            // Check if the roll number already exists
            let existingStudent = await this.constructor.findOne({ rollNumber: newRollNumber });
            
            // Keep generating new roll numbers if there is a conflict
            while (existingStudent) {
                lastRollNumber += 1;
                newRollNumber = `SVCNMCA-${this.batch}-${(lastRollNumber + 1).toString().padStart(3, "0")}`;
                existingStudent = await this.constructor.findOne({ rollNumber: newRollNumber });
            }

            // Assign the unique roll number
            this.rollNumber = newRollNumber;
            next();
        } catch (err) {
            console.error("Error generating roll number:", err.message);
            next(err);
        }
    } else {
        next();
    }
});


// Create the model
const studentModel = mongoose.model("students", NewSchema);

module.exports = studentModel;
