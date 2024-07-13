<h1 align="center"> PROJECT FRONTEND: TATTOO STUDIO </h1>

<image src="" alt="Tattoo Studio">

---

## Table of Contents :file_folder:

1. [Description :classical_building:](#description-classical_building)
2. [Stack :gear:](#stack-gear)
3. [Project :open_book:](#Project-open_book)
4. [Link :dart:](#link-dart)
5. [Author :wave:](#author-wave)

---

## Description :classical_building:

I recently completed a frontend project for a potential tattoo and piercing shop. The primary goal was to connect the frontend with a database that had already been developed (accessible through a link I can provide). My work involved ensuring the frontend could effectively display the services offered, manage new user registrations, allow registered users to access and modify their profiles, handle appointment requests for services, and provide options for viewing and deleting appointments. As the developer, I also implemented functionality where the super admin can oversee the entire user list and delete user accounts as necessary.

---

## Stack :gear:

---

## Project :open_book:

### 1 - Local Installation:

<h4>BackEnd</h4>

- Go this root:

- Clone repository: https://github.com/annahico/PROJECT-Tattoo

  `npm install`.

- Start MySql.

- Create a new schema to import data.

- Fill .env and bd.ts files with the corresponding data.

  `npm run dev`.

  `npm run run-migrations`.

- Copy the data from the SQL folder into MySQL and execute the import.

<h4>FrontEnd</h4>

- Clone this repository.
  `npm install`.
  `npm run dev`.
- Access localhost from the console view.

### 2 - Info to log

- Super_admin:

```
<!-- _id: "1",
name: "super_admin",
email: "super_admin@email.com",
password: 123456,
role: "super_admin" -->
```

- Admin:

```
<!-- _id: "2",
name: "admin",
email: "'admin@email.com'",
password: 123456,
role: "admin" -->
```

- User:

```
<!-- _id: "3",
name: "'user1'",
email: "'user@email.com'",
password: 123456,
role: "user" -->
```

### 2 - Roots:

1. Home:

<image src="" alt="Home">

2. Sevices:

<image src="" alt="Services">

3. Profile

<image src="" alt="Profile">

4. Appointments:

<image src="" alt="Appointments">

5. New Appointment

### Bugs :collision:

- There is no time restriction: past days and nighttime hours can be selected.
- Services are chosen by ID, not by name. The order is as follows:

    <!-- 1 = Tatuajes personalizados
  
  2 = Tatuajes del catálogo
  
  3 = Restauración y rejuvenecimiento de trabajos
  
  4 = Colocación de piercings y dilataciones
  
  5 = Venta de piercings y otros artículos -->

<image src="" alt="New Appointment">

6. User(only super_admin):

<image src="" alt="Users">

7. Log:

<image src="" alt="Log">

8. Register:

<image src="" alt="Register">

---

---

## Link :dart:

https://github.com/annahico/PROJECT-Frontend

---

## Author :wave:

- **Anna Hidalgo Costa**
- [GitHub](https://github.com/annahico) - [LinkedIn](https://www.linkedin.com/in/annahico/)

---
