var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.sever');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function deleteSection(sectionId) {
    return sectionModel.deleteOne({ _id: sectionId } );
}

function updateSection(section) {
    return sectionModel.update(
        {_id: section.sectionId},
        { $set: {
                name : section.name,
                seats : section.seats
            }
        });
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId});
}

function decrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    },{
        $inc: {seats: -1}
    });
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    },{
        $inc: {seats: +1}
    });
}

module.exports = {
    createSection: createSection,
    deleteSection: deleteSection,
    updateSection: updateSection,
    findSectionsForCourse: findSectionsForCourse,
    decrementSectionSeats: decrementSectionSeats,
    incrementSectionSeats: incrementSectionSeats,
};