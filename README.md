<!-- markdownlint-disable MD033 -->

<div align="center">
  <h1>FFCS</h1>
  This web application is a tool to visualize your timetable for the students of VIT Vellore & Chennai to help with FFCS course registrations.. 
<!--   <br>The site is available at https://leetcode-predictor.vercel.app/ <br> -->
<!--   <b>Go check it out !!!</b> -->
  <br />
  <br />
</div>
</div>

## Demo
![ffcs_capture](https://github.com/Midas847/FFCS/assets/44649707/1b9f4015-8624-41c1-8c37-cc3447f34137)

## Database

- [PostgreSQL](https://www.postgresql.org/): Relational database
- [Prisma](https://www.prisma.io/):ORM

## Backend

- [Nest.js](https://docs.nestjs.com/): open-source, back-end framework for Node.js and TypeScript.
- [bcrypt](https://www.npmjs.com/package/bcrypt): A library to help you hash passwords.
- [Swagger](https://swagger.io/): API documentation.
- [Redis](https://redis.io/): The open source, in-memory cache data store

## Frontend

- [React](https://reactjs.org/): most popular front-end library
- [TailwindCSS](https://tailwindcss.com/) : modern CSS framework and its component library

# Development


Follow these steps to run the app locally.
### Sever
## Environment variables

```
POSTGRES_URL: your postgres URL
```
## Backend
```
git clone https://github.com/Midas847/FFCS.git
cd ffcs
npm install
npx prisma migrate dev --preview-feature
docker-compose up -d
cp .env.example .env
npm run start:dev
```
## Frontend Deployment

```
git clone https://github.com/Midas847/FFCS.git
cd ffcs-fontend
npm install
npm start
```
## ER diagram
![FFCS (1)](https://github.com/Midas847/FFCS/assets/44649707/f637422d-f685-4a9a-8fc7-44953c0359c8)

# ToDo
   - deploying
   - make the admin portal
