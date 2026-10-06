import Student from './models.js';
import { fetchStudents } from './database.js';
import { calculateClassAverage, findTopStudent, filterStudents } from './analytics.js';

const round2 = (num) => Number(num.toFixed(2));

fetchStudents((rawData) => {
  console.log('Data received!\n');

  const students = rawData.map(
    (data) => new Student(data.id, data.name, data.courses)
  );


  console.log('Testing Immutability:');
  const first = students[0];
  const originalId = first.id;
  console.log(`Original ID: ${originalId}`);
  console.log('Attempting to change ID to 999...');

  try {
    first.id = 999; 
  } catch (error) {
  }

  const status = first.id === originalId
    ? 'Success: ID did not change'
    : 'Failed: ID was changed';
  console.log(`Final ID: ${first.id} (${status})\n`);


  console.log('--- Analytics Report ---');

  const avg101 = calculateClassAverage(students, 101);
  console.log(`Class Average for Course 101: ${round2(avg101)}`);

  const top = findTopStudent(students);
  console.log(`Top Student: ${top.name} (Average: ${round2(top.getAverage())})`);

  const in102 = filterStudents(students, (s) =>
    s.courses.some((c) => c.courseId === 102)
  );
  console.log(`Students in Course 102: ${in102.map((s) => s.name).join(', ')}`);
});