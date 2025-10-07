# 🍳 Recipe Sharing Application

A responsive Angular 19 application for sharing, creating, and managing recipes.  
Built with **Angular + TailwindCSS**, using **Reactive Forms**, **Routing**, and a **Mock localStorage backend**.

---

## 🚀 Features
- 🧁 Display recipes with title, description, and image  
- ✏️ Create, edit, and delete recipes  
- ❤️ Mark recipes as favorites  
- 🔍 Search recipes by title or ingredients  
- 🧩 Responsive UI using TailwindCSS  
- 💾 Data stored locally via browser `localStorage` (no backend setup required)

---

## 🛠️ Tech Stack
- **Frontend:** Angular 19 (standalone)
- **Styling:** TailwindCSS 4
- **Forms:** Angular Reactive Forms
- **Data Layer:** Local mock service
- **Routing:** Angular Router

---

## 🧩 How to Run

### 1️⃣ Clone and install
```bash
git clone https://github.com/giorgaa3/My-CookBook.git
cd My-CookBook
npm install

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
