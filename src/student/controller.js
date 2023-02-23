// All business logic that is related to each route

// importing database
const pool = require("../../db");
const queries = require("./queries");

//Note that query has 2 parameters => 1. SQL Statement(the statement I want to use to query the database) and 2. error and results and if there is an error and something is not working with query we are just going to throw an error

// return all students
const getStudents = (request, response) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;

    // if there is no error and query was executed fine we are going to send back all rows from the database
    response.status(200).json(results.rows);
  });
};

const getStudentById = (request, response) => {
  // First I need to get out the id value out of req.params body and the use that id to query the database
  const id = parseInt(request.params.id);

  // Any additional variable that is being passed must be place in brackets [id, name ... ]
  // So I get query statements, variable I am passing into query statement and callback function
  pool.query(queries.getStudentsById, [id], (error, results) => {
    if (error) throw error;

    response.status(200).json(results.rows);
  });
};

// Create new student
const addStudent = (request, response) => {
  // When we send a request to our post endpoint, we are sending JSON aleong with that request because it needs to know what we want to store in the database and that JSON is our request body. In order to get that JSON out of request.body We are going to use JavaScript desctructuring

  const { name, email, age, date_of_birth } = request.body;

  // First thing I want to do is to check if there is not student with that email already in database as email must be unique

  // check if email exists

  pool.query(queries.checkEmailExists, [email], (error, results) => {
    // if there is an array and there is something in it(same email was found and the length is 1)
    if (results.rows.length) {
      response.send("Email already exists!");
    }

    // if there is nothing in array and therefore email does not exist add new student to database:
    pool.query(
      queries.addStudent,
      [name, email, age, date_of_birth],
      (error, results) => {
        if (error) throw error;

        response.status(201).send("Student created successfuly");
        console.log("Student Created");
      }
    );
  });
};

const deleteStudentById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(queries.getStudentsById, [id], (error, results) => {
    // I need to check if the user exist. If there is no user with specified id => req.params.id than results array is empty and thus 0 = falsy and in turn statement below is true as flasy === falsy

    const noStudentFound = !results.rows.length;

    if (noStudentFound) {
      response.send("Student does not exist in the database.");
    }

    // If however there is a student with id in req.params.id then:

    pool.query(queries.deleteStudentById, [id], (error, results) => {
      response.status(200).send("Student removed successfuly");
    });
  });
};


const updateStudentById = (request, response) => {
    const id = parseInt(request.params.id);

    // in this case lets update name
    const {name} = request.body;

    // check if student exist
    pool.query(queries.getStudentsById, [id], (erro, results) => {
        const noStudentFound = !results.rows.length;

        if (noStudentFound){
            response.send('No student with that ID exists!');
        }

        // if student exist update the student
        pool.query(queries.updateStudentById, [name, id], (error, results) => {
            if (error) throw error;

            response.status(200).send('Student updated successfuly')
        })
    })
}


module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  deleteStudentById,
  updateStudentById,
};
