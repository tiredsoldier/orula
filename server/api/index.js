const express = require("express");
const router = express.Router();
const db = require("../helpers/db");

router.get("/status", (req, res) => res.send({ status: "OK" }));

// Get All Courses
router.get("/courses", (req, res) => {
  db.getCourses().then(data => {
    res.send(data);
  });
});

// Get 1 Course
router.get("/courses/:id", (req, res) => {
  const course_id = req.params.id;
  db.getCourseById(course_id).then(data => {
    res.send(data);
  });
});

// Add Course
router.post("/courses", async (req, res) => {
  const { name, location, organisation_id } = req.body;
  if (
    (await db.checkCourseExist(name)) === false &&
    name !== "" &&
    name !== null
  ) {
    await db.addCourse(name, location, organisation_id);
    res.send("Successfully added course!");
  } else {
    res
      .status(403)
      .send("This course is already exist or course name field is empty");
  }
});

// Edit Course
router.put("/courses/:id", async (req, res) => {
  const course_id = req.params.id;
  const { name, location, organisation_id } = req.body;
  if (
    (await db.checkCourseExist(name)) === false &&
    name !== "" &&
    name !== null
  ) {
    await db.editCourse(course_id, name, location, organisation_id);
    res.send("Course is successfully updated!");
  } else {
    res
      .status(403)
      .send("This course is already exist or course name field is empty");
  }
});

// Delete Course
router.delete("/courses/:id", (req, res) => {
  const course_id = `${req.params.id}`;
  db.getCourses()
    .where("course_id", "=", course_id)
    .del()
    .then(data => {
      res.json(data);
    });
});

// Add Organisation
router.post("/organisations", async (req, res) => {
  const body = req.body;
  if (
    (await db.checkOrganisationExist(body.name)) === false &&
    body.name !== "" &&
    body.name !== null
  ) {
    await db.addOrganisation(body.name);
    res.send();
  } else {
    res
      .status(403)
      .send("This organisation is already exists or your name field is empty");
  }
});

// Get All Organisations
router.get("/organisations", (req, res) => {
  db.getOrganisations().then(data => {
    res.send(data);
  });
});
router.get("/courses/:id", (req, res) => {
  const course_id = `${req.params.id}`;
  db.getLessonsById(course_id).then(data => {
    res.send(data);
  });
});

// Get Organisations by Id
router.get("/organisations/:id", (req, res) => {
  const organisation_id = req.params.id;
  db.getOrganisationsById(organisation_id).then(data => {
    res.send(data);
  });
});

router.delete("/organisations/:id", async (req, res) => {
  const organisation_id = req.params.id;
  if ((await db.checkOrganisationToDelete(organisation_id)) === false) {
    db.deleteOrganisation(organisation_id).then(() => {
      res.send("Successfully deleted organisation!");
    });
  } else {
    res.status(403).send("This organisation isn't empty. It has some courses!");
  }
});

module.exports = router;
