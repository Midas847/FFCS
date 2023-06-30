/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
const filePath = './prisma/slots.json';
const facultyPath = './prisma/faculty.json';
const coursePath = './prisma/courses.json';

const data = JSON.parse(readFileSync(filePath, 'utf-8'));
const faculty = JSON.parse(readFileSync(facultyPath, 'utf-8'));
const courses = JSON.parse(readFileSync(coursePath, 'utf-8'));

const prisma = new PrismaClient();

export enum CourseType {
  THEORY,
  LAB,
}

async function main() {
  for (const slot of data) {
    // console.log(slot);
    await prisma.slot.upsert({
      where: { id: 1000 },
      update: {},
      create: {
        slot: slot.id,
        day: slot.day,
        start: slot.start,
        end: slot.end,
      },
    });
  }

  for (const fac of faculty) {
    // console.log(fac);
    await prisma.faculty.upsert({
      where: { id: 'Saswata' },
      update: {},
      create: {
        id: fac.id,
        name: fac.name,
        school: fac.school,
        role: 'faculty',
      },
    });
  }

  for (const course of courses) {
    // console.log(course);
    await prisma.course.upsert({
      where: {
        course_id_course_type: {
          course_id: 'Saswata',
          course_type: 'THEORY',
        },
      },
      update: {},
      create: {
        course_id: course.course_id,
        name: course.name,
        slot_ids: course.slot_ids,
        faculty_id: course.faculty_id,
        course_type: course.course_type,
        credit: course.credit,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
