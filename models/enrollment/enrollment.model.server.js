var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model('EnrollmentModel', enrollmentSchema);

function enrollStudentInSection(enrollment) {
    return enrollmentModel.create(enrollment);
};

function unenrollStudentInSection(enrollment) {
    return enrollmentModel.deleteOne({ _id: enrollment} );
}


function findSectionsForStudent(studentId) {
    return enrollmentModel.find({student: studentId})
        .populate('section')
        .exec();
}

function findCoursesForStudent(studentId) {
    return enrollmentModel.find({student: studentId})
        .populate('section')
        .exec();
}



module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    unenrollStudentInSection: unenrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent
};



