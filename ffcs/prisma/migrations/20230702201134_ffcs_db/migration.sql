-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('THEORY', 'LAB');

-- CreateEnum
CREATE TYPE "Days" AS ENUM ('mon', 'tue', 'wed', 'thu', 'fri');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'admin', 'faculty');

-- CreateTable
CREATE TABLE "Faculty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "course_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slot_ids" TEXT[],
    "faculty_id" TEXT NOT NULL,
    "course_type" "CourseType" NOT NULL,
    "credit" INTEGER NOT NULL,
    "available_slots" INTEGER NOT NULL DEFAULT 60,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("course_id","course_type")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" SERIAL NOT NULL,
    "slot" TEXT NOT NULL,
    "day" "Days" NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "REGISTER_COURSES" (
    "course_id" TEXT NOT NULL,
    "course_type" "CourseType" NOT NULL,
    "faculty_id" TEXT NOT NULL,
    "slot_ids" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stud_id" TEXT NOT NULL,

    CONSTRAINT "REGISTER_COURSES_pkey" PRIMARY KEY ("course_id","course_type","stud_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "credits" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_id_key" ON "Faculty"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "REGISTER_COURSES" ADD CONSTRAINT "REGISTER_COURSES_stud_id_fkey" FOREIGN KEY ("stud_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "REGISTER_COURSES" ADD CONSTRAINT "REGISTER_COURSES_course_id_course_type_fkey" FOREIGN KEY ("course_id", "course_type") REFERENCES "Course"("course_id", "course_type") ON DELETE RESTRICT ON UPDATE CASCADE;
