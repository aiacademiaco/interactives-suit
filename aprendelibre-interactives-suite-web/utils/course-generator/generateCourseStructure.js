const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const COURSES_DIR = path.join(__dirname, "../../pages/courses");

createNewCourse("Test Course");

function generateUniqueId() {
  return uuidv4();
}

function sanitizeCourseName(courseName) {
  return courseName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}

function courseExists(courseName) {
  if (!fs.existsSync(COURSES_DIR)) {
    fs.mkdirSync(COURSES_DIR);
  }
  const sanitizedCourseName = sanitizeCourseName(courseName);
  const existingCourses = fs.readdirSync(COURSES_DIR);
  return existingCourses.some((dir) => dir.startsWith(sanitizedCourseName));
}

function createCourseDirectory(courseId, courseName) {
  const sanitizedCourseName = sanitizeCourseName(courseName);
  const directoryName = `${sanitizedCourseName}_${courseId}`;
  const coursePath = path.join(COURSES_DIR, directoryName);

  if (!fs.existsSync(coursePath)) {
    fs.mkdirSync(coursePath, { recursive: true });
  }

  // Crear carpeta section-01
  const sectionPath = path.join(coursePath, "section-01");
  fs.mkdirSync(sectionPath, { recursive: true });

  // Crear archivo index.html en section-01
  fs.writeFileSync(
    path.join(sectionPath, "index.html"),
    "<!-- Content for index.html -->"
  );

  // Crear archivo interactive-01.vue en section-01
  fs.writeFileSync(
    path.join(sectionPath, "interactive-01.vue"),
    "<!-- Content for interactive-01.vue -->"
  );

  return coursePath;
}

function createNewCourse(courseName) {
  if (
    !courseName ||
    typeof courseName !== "string" ||
    courseName.trim().length === 0
  ) {
    console.error("Please provide a valid course name.");
    return;
  }

  if (courseExists(courseName)) {
    console.error(`A course with the name "${courseName}" already exists.`);
    return;
  }

  const courseId = generateUniqueId();
  const courseDir = createCourseDirectory(courseId, courseName);

  fs.writeFileSync(
    path.join(courseDir, "README.md"),
    `# Course ${courseName} (ID: ${courseId})`
  );
  console.log(`Course '${courseName}' created with ID: ${courseId}`);
}
