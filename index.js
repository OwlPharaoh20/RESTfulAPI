// This is a basic Node.js backend application
// It uses the Express.js framework to handle HTTP requests and responses
// The application provides a RESTful API for managing courses

// Import the required modules
const Joi = require('joi'); // Joi is a validation library for JavaScript
const express = require('express'); // Express.js is a web application framework for Node.js
const app = express(); // Create an instance of the Express.js app

// Add middleware to parse JSON requests
app.use(express.json());

// Define an array of courses
const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

// Define a route for the root URL
app.get('/', (req, res) => {
  // Send a simple "Hello World" response
  res.send('Hello World');
});

// Define a route to retrieve all courses
app.get('/api/courses', (req, res) => {
  // Send the array of courses as a response
  res.send(courses);
});

// Define a route to create a new course
app.post('/api/courses', (req, res) => {
  // Validate the request body using Joi
  const { error } = validateCourse(req.body);
  if (error) {
    // If the request is invalid, send a 400 Bad Request response
    res.status(400).send(error.details[0].message);
    return;
  }

  // Create a new course object
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  // Add the new course to the array
  courses.push(course);

  // Send the new course as a response
  res.send(course);
});

// Define a route to retrieve a course by ID
app.get('/api/courses/:id', (req, res) => {
  // Get the course ID from the URL parameter
  const courseId = parseInt(req.params.id);

  // Find the course in the array
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    // If the course is not found, send a 404 Not Found response
    res.status(404).send('The course with the given ID was not found');
  } else {
    // Send the course as a response
    res.send(course);
  }
});

// Define a route to update a course
app.put('/api/courses/:id', (req, res) => {
  // Get the course ID from the URL parameter
  const courseId = parseInt(req.params.id);

  // Find the course in the array
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    // If the course is not found, send a 404 Not Found response
    res.status(404).send('The course with the given ID was not found');
    return;
  }

  // Validate the request body using Joi
  const { error } = validateCourse(req.body);
  if (error) {
    // If the request is invalid, send a 400 Bad Request response
    res.status(400).send(error.details[0].message);
    return;
  }

  // Update the course object
  course.name = req.body.name;

  // Send the updated course as a response
  res.send(course);
});

// Define a route to delete a course
app.delete('/api/courses/:id', (req, res) => {
  // Get the course ID from the URL parameter
  const courseId = parseInt(req.params.id);

  // Find the course in the array
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    // If the course is not found, send a 404 Not Found response
    res.status(404).send('The course with the given ID was not found');
    return;
  }

  // Remove the course from the array
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Send the deleted course as a response
  res.send(course);
});

// Define a function to validate a course object using Joi
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

// Set the port number for the server
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});