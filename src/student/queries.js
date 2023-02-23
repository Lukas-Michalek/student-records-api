// All queries will be stored here

const getStudents = 'SELECT * FROM students'
const getStudentsById = 'SELECT * FROM students WHERE id = $1'
const checkEmailExists = 'SELECT s FROM students s WHERE s.email = $1'


// Note that ID is created automatically and increment as stated when created table as ID SERIAL PRIMARY KEY ... It is however recommended to use the new identity syntax rather than serial that is: id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL
const addStudent = 'INSERT INTO students(name, email, age, date_of_birth) VALUES ($1, $2, $3, $4)';

const deleteStudentById = 'DELETE FROM students WHERE id=$1';

const updateStudentById = 'UPDATE students SET name = $1 WHERE id = $2'




module.exports = {
    getStudents,
    getStudentsById,
    checkEmailExists,
    addStudent,
    deleteStudentById,
    updateStudentById,
}
