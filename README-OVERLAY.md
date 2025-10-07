# Kitchen Share Overlay (Angular + Tailwind v4 + json-server)

How to use:
1) Create a fresh Angular project (any name):
   ng new <your-project> --standalone --routing --style=scss --skip-git
   cd <your-project>

2) Install dev deps:
   npm i -D tailwindcss @tailwindcss/postcss postcss json-server

3) Extract this ZIP over your project root (overwrite files).

4) Ensure global style uses src/styles.css in angular.json.

5) Add this script to package.json if missing:
   "api": "json-server --watch db.json --port 3000"

6) Run:
   npm run api
   npm start
