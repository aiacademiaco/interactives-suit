const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const readline = require("readline"); // 1. Importar readline

const COURSES_DIR = path.join(__dirname, "../../pages/courses");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Please enter the course name: ", (courseName) => {
  createNewCourse(courseName);
  rl.close();
});

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

  // Create section-01 folder
  const sectionPath = path.join(coursePath, "section-01");
  fs.mkdirSync(sectionPath, { recursive: true });

  // Create interactive-01.vue file in section-01
  fs.writeFileSync(
    path.join(sectionPath, "interactive-01.vue"),
    `
    <template>
        <div>
            <!-- your code -->
        </div>
    </template>
    `
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
