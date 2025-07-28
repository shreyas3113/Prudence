import { database } from '../core/firebase.js';
import { ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

// Default FAQs for initialization
export const defaultFaqs = [
    { question: "What is HTML?", answer: "HTML (HyperText Markup Language) is the standard language for creating web pages.", language: "Web Development" },
    { question: "Who developed HTML?", answer: "HTML was developed by Tim Berners-Lee and released in 1991.", language: "Web Development" },
    { question: "What are the key features of HTML?", answer: "HTML provides structure with tags, supports multimedia, and is the foundation of web content.", language: "Web Development" },
    { question: "How do you create a heading in HTML?", answer: "Use <h1> to <h6> tags:\n\nExample:\n```html\n<h1>Main Heading</h1>\n```", language: "Web Development" },
    { question: "What is a div in HTML?", answer: "A div is a block-level container for grouping elements.\n\nExample:\n```html\n<div>Content here</div>\n```", language: "Web Development" },
    { question: "How do you add an image in HTML?", answer: "Use the <img> tag with a src attribute:\n\nExample:\n```html\n<img src=\"image.jpg\" alt=\"Description\">\n```", language: "Web Development" },
    { question: "What is CSS?", answer: "CSS (Cascading Style Sheets) is used to style and layout web pages.", language: "Web Development" },
    { question: "How do you link CSS to HTML?", answer: "Use the <link> tag in the <head>:\n\nExample:\n```html\n<link rel=\"stylesheet\" href=\"styles.css\">\n```", language: "Web Development" },
    { question: "What is a class in CSS?", answer: "A class is a reusable style identifier defined with a dot (.).\n\nExample:\n```css\n.className { color: blue; }\n```", language: "Web Development" },
    { question: "How do you center an element with CSS?", answer: "Use margin: auto; or flexbox:\n\nExample:\n```css\n.centered { margin: 0 auto; width: 50%; }\n```", language: "Web Development" },
    { question: "What is JavaScript?", answer: "JavaScript is a programming language that adds interactivity to web pages.", language: "Web Development" },
    { question: "How do you add JavaScript to HTML?", answer: "Use the <script> tag:\n\nExample:\n```html\n<script src=\"script.js\"></script>\n```", language: "Web Development" },
    { question: "What is a variable in JavaScript?", answer: "A variable stores data using let, const, or var.\n\nExample:\n```javascript\nlet x = 5;\n```", language: "Web Development" },
    { question: "How do you write a function in JavaScript?", answer: "Use the function keyword:\n\nExample:\n```javascript\nfunction greet() { console.log(\"Hello\"); }\n```", language: "Web Development" },
    { question: "What is the DOM?", answer: "The DOM (Document Object Model) is a tree-like structure representing HTML elements.", language: "Web Development" },
    { question: "How do you select an element in JavaScript?", answer: "Use document.getElementById() or querySelector():\n\nExample:\n```javascript\ndocument.getElementById(\"myId\");\n```", language: "Web Development" },
    { question: "What is an event in JavaScript?", answer: "An event is an action like a click or keypress that triggers code.\n\nExample:\n```javascript\ndocument.addEventListener(\"click\", function() { alert(\"Clicked\"); });\n```", language: "Web Development" },
    { question: "What is responsive design?", answer: "Responsive design adapts a website to different screen sizes using CSS media queries.", language: "Web Development" },
    { question: "How do you create a media query in CSS?", answer: "Use @media:\n\nExample:\n```css\n@media (max-width: 600px) { body { font-size: 14px; } }\n```", language: "Web Development" },
    { question: "What is a flexbox?", answer: "Flexbox is a CSS layout model for arranging items in a container.\n\nExample:\n```css\ndisplay: flex;\n```", language: "Web Development" },
    { question: "What is a grid in CSS?", answer: "CSS Grid is a 2D layout system for rows and columns.\n\nExample:\n```css\ndisplay: grid; grid-template-columns: 1fr 1fr;\n```", language: "Web Development" },
    { question: "How do you style a button in CSS?", answer: "Use CSS properties:\n\nExample:\n```css\nbutton { background-color: blue; color: white; }\n```", language: "Web Development" },
    { question: "What is a semantic HTML tag?", answer: "A semantic tag describes its meaning, like <header> or <footer>.\n\nExample:\n```html\n<header>Website Header</header>\n```", language: "Web Development" },
    { question: "How do you create a form in HTML?", answer: "Use the <form> tag with input elements:\n\nExample:\n```html\n<form><input type=\"text\"><button>Submit</button></form>\n```", language: "Web Development" },
    { question: "What is HTTP?", answer: "HTTP (HyperText Transfer Protocol) is the foundation of data communication on the web.", language: "Web Development" },
    { question: "What is a GET request?", answer: "A GET request retrieves data from a server.\n\nExample:\n```javascript\nfetch('https://api.example.com');\n```", language: "Web Development" },
    { question: "What is a POST request?", answer: "A POST request sends data to a server.\n\nExample:\n```javascript\nfetch('https://api.example.com', { method: 'POST', body: JSON.stringify(data) });\n```", language: "Web Development" },
    { question: "What is REST API?", answer: "REST (Representational State Transfer) is an architectural style for web services.", language: "Web Development" },
    { question: "How do you use Bootstrap?", answer: "Include Bootstrap CSS and JS via CDN:\n\nExample:\n```html\n<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css\" rel=\"stylesheet\">\n```", language: "Web Development" },
    { question: "What is a CDN?", answer: "A CDN (Content Delivery Network) delivers web content like CSS or JS from multiple servers.", language: "Web Development" },
    { question: "How do you debug JavaScript?", answer: "Use console.log() or browser developer tools.\n\nExample:\n```javascript\nconsole.log(\"Debug message\");\n```", language: "Web Development" },
    { question: "What is a callback function?", answer: "A callback is a function passed as an argument to another function.\n\nExample:\n```javascript\nsetTimeout(() => console.log(\"Delayed\"), 1000);\n```", language: "Web Development" },
    { question: "What is a promise in JavaScript?", answer: "A promise handles asynchronous operations with .then() and .catch().\n\nExample:\n```javascript\nlet promise = new Promise((resolve) => resolve(\"Success\"));\npromise.then(console.log);\n```", language: "Web Development" },
    { question: "What is async/await?", answer: "async/await simplifies asynchronous code with promises.\n\nExample:\n```javascript\nasync function fetchData() { let response = await fetch('https://api.example.com'); }\n```", language: "Web Development" },
    { question: "What is JSON?", answer: "JSON (JavaScript Object Notation) is a lightweight data format.\n\nExample:\n```javascript\nlet data = { name: \"John\", age: 30 };\n```", language: "Web Development" },
    { question: "How do you parse JSON?", answer: "Use JSON.parse():\n\nExample:\n```javascript\nlet obj = JSON.parse('{\"name\": \"John\"}');\n```", language: "Web Development" },
    { question: "What is a framework?", answer: "A framework is a pre-built structure for developing web applications, like React or Vue.", language: "Web Development" },
    { question: "What is React?", answer: "React is a JavaScript library for building user interfaces.\n\nExample:\n```jsx\nfunction App() { return <h1>Hello</h1>; }\n```", language: "Web Development" },
    { question: "What is a component in React?", answer: "A component is a reusable building block in React.\n\nExample:\n```jsx\nfunction Button() { return <button>Click</button>; }\n```", language: "Web Development" },
    { question: "What is state in React?", answer: "State is an object that stores data and can change over time.\n\nExample:\n```jsx\nconst [count, setCount] = useState(0);\n```", language: "Web Development" },
    { question: "What is props in React?", answer: "Props are read-only data passed to components.\n\nExample:\n```jsx\nfunction Welcome(props) { return <h1>Hello, {props.name}</h1>; }\n```", language: "Web Development" },
    { question: "What is CSS-in-JS?", answer: "CSS-in-JS is a technique to write CSS inside JavaScript files.\n\nExample:\n```javascript\nconst style = { color: 'blue' };\n```", language: "Web Development" },
    { question: "What is a media query?", answer: "A media query applies styles based on device characteristics.\n\nExample:\n```css\n@media (max-width: 600px) { body { font-size: 14px; } }\n```", language: "Web Development" },
    { question: "How do you create a table in HTML?", answer: "Use <table>, <tr>, <th>, and <td> tags:\n\nExample:\n```html\n<table><tr><th>Name</th></tr><tr><td>John</td></tr></table>\n```", language: "Web Development" },
    { question: "What is a meta tag?", answer: "A meta tag provides metadata about the HTML document.\n\nExample:\n```html\n<meta name=\"description\" content=\"Web page description\">\n```", language: "Web Development" },
    { question: "What is SEO?", answer: "SEO (Search Engine Optimization) improves a website's visibility on search engines.", language: "Web Development" },
    { question: "How do you optimize images for the web?", answer: "Use compressed formats like JPEG or WebP and add alt text.\n\nExample:\n```html\n<img src=\"image.webp\" alt=\"Description\">\n```", language: "Web Development" },
    { question: "What is a browser?", answer: "A browser is software like Chrome or Firefox that renders web pages.", language: "Web Development" },
    { question: "What is a viewport?", answer: "A viewport is the visible area of a web page in a browser.\n\nExample:\n```html\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n```", language: "Web Development" },
    { question: "What is a cookie?", answer: "A cookie is a small text file stored by a browser to track user data.\n\nExample:\n```javascript\ndocument.cookie = \"name=John\";\n```", language: "Web Development" },
    { question: "What is localStorage?", answer: "localStorage is a web storage API for storing data locally.\n\nExample:\n```javascript\nlocalStorage.setItem(\"key\", \"value\");\n```", language: "Web Development" },
    { question: "What is sessionStorage?", answer: "sessionStorage stores data for one session, cleared when the tab closes.\n\nExample:\n```javascript\nsessionStorage.setItem(\"key\", \"value\");\n```", language: "Web Development" },
    { question: "What is CORS?", answer: "CORS (Cross-Origin Resource Sharing) manages cross-origin HTTP requests.", language: "Web Development" },
    { question: "How do you handle forms in JavaScript?", answer: "Use the addEventListener on form submit:\n\nExample:\n```javascript\ndocument.querySelector('form').addEventListener('submit', (e) => { e.preventDefault(); });\n```", language: "Web Development" },
    { question: "What is a RESTful API?", answer: "A RESTful API follows REST principles for CRUD operations.\n\nExample:\n```javascript\nfetch('https://api.example.com/users', { method: 'POST' });\n```", language: "Web Development" },
    { question: "What is a single-page application?", answer: "An SPA is a web app that loads a single HTML page and updates dynamically.", language: "Web Development" },
    { question: "What is WebSocket?", answer: "WebSocket provides full-duplex communication channels over a single TCP connection.", language: "Web Development" },
    { question: "What is a CDN for JavaScript?", answer: "A CDN delivers JavaScript files, like jQuery, from a global network.\n\nExample:\n```html\n<script src=\"https://code.jquery.com/jquery-3.6.0.min.js\"></script>\n```", language: "Web Development" },
    { question: "How do you create a hover effect in CSS?", answer: "Use the :hover pseudo-class:\n\nExample:\n```css\nbutton:hover { background-color: yellow; }\n```", language: "Web Development" },
    { question: "What is a framework vs library?", answer: "A framework provides structure (e.g., Angular), while a library is a toolset (e.g., jQuery).", language: "Web Development" },
    { question: "What is a build tool?", answer: "A build tool like Webpack or Gulp automates tasks like minification.\n\nExample:\n```javascript\nmodule.exports = { mode: 'production' };\n```", language: "Web Development" },
    { question: "What is versioning in web development?", answer: "Versioning tracks changes in code using tools like Git.\n\nExample:\n```bash\ngit commit -m \"Update CSS\"\n```", language: "Web Development" },
    { question: "What is a 404 error?", answer: "A 404 error indicates a page is not found on the server.", language: "Web Development" },
    { question: "How do you redirect a page in JavaScript?", answer: "Use window.location:\n\nExample:\n```javascript\nwindow.location.href = \"https://newpage.com\";\n```", language: "Web Development" },
    { question: "What is a favicon?", answer: "A favicon is a small icon displayed in the browser tab.\n\nExample:\n```html\n<link rel=\"icon\" type=\"image/x-icon\" href=\"/favicon.ico\">\n```", language: "Web Development" },
    { question: "What is progressive enhancement?", answer: "Progressive enhancement builds a basic version first, then adds advanced features.", language: "Web Development" },
    { question: "What is lazy loading?", answer: "Lazy loading delays loading of non-critical resources like images.\n\nExample:\n```html\n<img src=\"image.jpg\" loading=\"lazy\" alt=\"Description\">\n```", language: "Web Development" },
    { question: "What is a CSS preprocessor?", answer: "A preprocessor like Sass adds features like variables to CSS.\n\nExample:\n```scss\n$primary-color: blue;\nbody { color: $primary-color; }\n```", language: "Web Development" },
    { question: "What is a web server?", answer: "A web server hosts and delivers web content, like Apache or Nginx.", language: "Web Development" },
    { question: "What is HTTPS?", answer: "HTTPS is HTTP with encryption via SSL/TLS for secure communication.", language: "Web Development" },
    { question: "How do you validate a form?", answer: "Use HTML5 attributes or JavaScript:\n\nExample:\n```html\n<input type=\"email\" required>\n```", language: "Web Development" },
    { question: "What is a CDN for CSS?", answer: "A CDN delivers CSS files, like Bootstrap, from a global network.\n\nExample:\n```html\n<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css\" rel=\"stylesheet\">\n```", language: "Web Development" },
    { question: "What is a CSS reset?", answer: "A CSS reset standardizes browser default styles.\n\nExample:\n```css\n* { margin: 0; padding: 0; }\n```", language: "Web Development" },
    { question: "What is a z-index?", answer: "z-index controls the stack order of elements on the z-axis.\n\nExample:\n```css\n.element { z-index: 10; }\n```", language: "Web Development" },
    { question: "What is a transition in CSS?", answer: "A transition smoothly changes property values over time.\n\nExample:\n```css\ndiv { transition: width 2s; }\n```", language: "Web Development" },
    { question: "What is an animation in CSS?", answer: "An animation creates dynamic effects using @keyframes.\n\nExample:\n```css\n@keyframes slide { from { margin-left: 0; } to { margin-left: 100px; } }\n```", language: "Web Development" },
    { question: "What is a web accessibility?", answer: "Web accessibility ensures websites are usable by people with disabilities.", language: "Web Development" },
    { question: "How do you add ARIA roles?", answer: "Use aria-* attributes:\n\nExample:\n```html\n<div role=\"button\" aria-label=\"Close\">X</div>\n```", language: "Web Development" },
    { question: "What is a CDN fallback?", answer: "A fallback loads local files if a CDN fails.\n\nExample:\n```html\n<script>if (!window.jQuery) document.write('<script src=\"local.js\">');</script>\n```", language: "Web Development" }
];

export const defaultPersonalityFaqs = [
    { question: "What is personality development?", answer: "Personality development involves enhancing personal traits like confidence, communication, and emotional intelligence to improve overall behavior and interactions. It includes self-awareness, goal-setting, and adapting to social situations, often through training or self-help techniques.", language: "Personality Development" },
    { question: "How can I improve my self-confidence?", answer: "Build self-confidence by setting achievable goals, celebrating small wins, practicing positive self-talk, stepping out of your comfort zone, learning new skills, surrounding yourself with supportive people, and focusing on your strengths rather than weaknesses.", language: "Personality Development" },
    { question: "What are the key traits of a good leader?", answer: "Effective leaders possess vision, communication skills, empathy, integrity, adaptability, decision-making ability, accountability, and the ability to inspire and motivate others. They lead by example and create a positive work environment.", language: "Personality Development" },
    { question: "How can I improve my communication skills?", answer: "Enhance communication by actively listening, maintaining eye contact, using clear and concise language, practicing empathy, asking questions, being aware of body language, and adapting your style to different audiences.", language: "Personality Development" },
    { question: "What is emotional intelligence?", answer: "Emotional intelligence (EQ) is the ability to understand, use, and manage emotions effectively. It includes self-awareness, self-regulation, motivation, empathy, and social skills. High EQ helps in building relationships and making better decisions.", language: "Personality Development" },
    { question: "How can I develop better time management skills?", answer: "Improve time management by prioritizing tasks, using tools like calendars and to-do lists, setting realistic deadlines, avoiding procrastination, learning to say no, delegating when possible, and eliminating time-wasting activities.", language: "Personality Development" },
    { question: "What is the importance of goal setting?", answer: "Goal setting provides direction, motivation, and a sense of purpose. It helps measure progress, increases focus, builds confidence, and creates a roadmap for success. SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) are most effective.", language: "Personality Development" },
    { question: "How can I overcome fear of public speaking?", answer: "Overcome public speaking anxiety by practicing regularly, preparing thoroughly, visualizing success, using breathing techniques, starting with smaller audiences, focusing on your message rather than yourself, and gradually building confidence through experience.", language: "Personality Development" },
    { question: "What is the difference between introvert and extrovert?", answer: "Introverts gain energy from solitude and prefer deep, meaningful conversations with few people. Extroverts gain energy from social interactions and prefer group activities. Both personality types have unique strengths and can develop skills from the other type.", language: "Personality Development" },
    { question: "How can I build better relationships?", answer: "Build relationships by being genuine, showing interest in others, practicing active listening, being reliable and trustworthy, showing appreciation, resolving conflicts constructively, and investing time in meaningful connections.", language: "Personality Development" },
    { question: "What is the importance of networking?", answer: "Networking builds professional relationships, creates opportunities, provides support and mentorship, helps stay updated with industry trends, and can lead to career advancement. It's about building genuine connections, not just collecting contacts.", language: "Personality Development" },
    { question: "How can I develop a positive mindset?", answer: "Develop a positive mindset by practicing gratitude, reframing negative thoughts, surrounding yourself with positive people, focusing on solutions rather than problems, celebrating small wins, and maintaining a growth mindset.", language: "Personality Development" },
    { question: "What is stress management?", answer: "Stress management involves identifying stressors, using coping strategies like exercise, meditation, deep breathing, time management, setting boundaries, seeking support, and maintaining work-life balance to reduce negative stress impact.", language: "Personality Development" },
    { question: "How can I improve my decision-making skills?", answer: "Improve decision-making by gathering relevant information, considering multiple perspectives, weighing pros and cons, trusting your intuition, learning from past decisions, seeking advice when needed, and being willing to adapt if circumstances change.", language: "Personality Development" },
    { question: "What is the importance of continuous learning?", answer: "Continuous learning keeps you relevant, improves skills, increases confidence, opens new opportunities, enhances problem-solving abilities, and promotes personal growth. It's essential for career advancement and personal development.", language: "Personality Development" },
    { question: "How can I develop resilience?", answer: "Build resilience by developing a growth mindset, maintaining perspective during challenges, building strong relationships, practicing self-care, learning from failures, staying flexible, and focusing on what you can control.", language: "Personality Development" },
    { question: "What is the importance of body language?", answer: "Body language communicates emotions, confidence, and intentions. Good posture, eye contact, open gestures, and appropriate facial expressions enhance communication effectiveness and create positive impressions in personal and professional settings.", language: "Personality Development" },
    { question: "How can I improve my listening skills?", answer: "Enhance listening by giving full attention, avoiding interruptions, showing interest through body language, asking clarifying questions, reflecting back what you heard, avoiding judgment, and focusing on understanding rather than responding.", language: "Personality Development" },
    { question: "What is the importance of adaptability?", answer: "Adaptability is crucial in today's fast-changing world. It involves being open to new ideas, learning from experiences, adjusting to different situations, embracing change, and developing skills to handle uncertainty effectively.", language: "Personality Development" },
    { question: "How can I develop creativity?", answer: "Develop creativity by exploring new experiences, practicing brainstorming, challenging assumptions, collaborating with diverse people, taking breaks to refresh your mind, keeping an idea journal, and allowing yourself to make mistakes.", language: "Personality Development" },
    { question: "What is the importance of empathy?", answer: "Empathy builds stronger relationships, improves communication, enhances leadership skills, promotes teamwork, helps resolve conflicts, and creates more inclusive environments. It's understanding and sharing others' feelings and perspectives.", language: "Personality Development" },
    { question: "How can I overcome procrastination?", answer: "Overcome procrastination by breaking tasks into smaller steps, setting deadlines, eliminating distractions, using the two-minute rule, rewarding progress, understanding your triggers, and creating a supportive environment for productivity.", language: "Personality Development" },
    { question: "What is the importance of self-discipline?", answer: "Self-discipline enables goal achievement, builds character, improves productivity, enhances self-confidence, creates consistency, and helps develop good habits. It's the foundation for long-term success in any area of life.", language: "Personality Development" },
    { question: "How can I develop better problem-solving skills?", answer: "Improve problem-solving by defining the problem clearly, gathering information, brainstorming solutions, evaluating options, implementing the best solution, monitoring results, and learning from the process for future challenges.", language: "Personality Development" },
    { question: "What is the importance of work-life balance?", answer: "Work-life balance prevents burnout, improves health, enhances relationships, increases productivity, promotes happiness, and leads to long-term career satisfaction. It involves setting boundaries and prioritizing personal well-being alongside professional goals.", language: "Personality Development" },
    { question: "How can I develop assertiveness?", answer: "Develop assertiveness by expressing your needs clearly, using 'I' statements, maintaining eye contact, speaking with confidence, respecting others' rights, practicing in low-risk situations, and finding the balance between passive and aggressive communication.", language: "Personality Development" },
    { question: "What is the importance of feedback?", answer: "Feedback provides valuable insights for improvement, helps identify blind spots, accelerates learning, builds relationships, and promotes growth. Seek feedback regularly and learn to give constructive feedback to others.", language: "Personality Development" },
    { question: "How can I develop better negotiation skills?", answer: "Improve negotiation by preparing thoroughly, understanding both parties' needs, listening actively, finding common ground, being flexible, maintaining professionalism, and focusing on win-win solutions rather than just winning.", language: "Personality Development" },
    { question: "What is the importance of mentorship?", answer: "Mentorship accelerates learning, provides guidance, expands networks, offers support during challenges, helps avoid common mistakes, and promotes career advancement. Both being a mentor and having a mentor are valuable experiences.", language: "Personality Development" },
    { question: "How can I develop better conflict resolution skills?", answer: "Improve conflict resolution by staying calm, listening to all perspectives, finding common ground, focusing on the issue not the person, being willing to compromise, seeking win-win solutions, and following up to ensure resolution.", language: "Personality Development" },
    { question: "What is the importance of personal branding?", answer: "Personal branding differentiates you professionally, builds credibility, creates opportunities, helps achieve career goals, and establishes your reputation. It involves consistently communicating your values, skills, and unique qualities.", language: "Personality Development" },
    { question: "How can I develop better presentation skills?", answer: "Enhance presentation skills by knowing your audience, structuring content clearly, practicing delivery, using visual aids effectively, managing nervousness, engaging the audience, and seeking feedback for continuous improvement.", language: "Personality Development" },
    { question: "What is the importance of cultural intelligence?", answer: "Cultural intelligence enables effective interaction across cultures, improves global business success, enhances teamwork in diverse environments, reduces misunderstandings, and promotes inclusive workplaces in our interconnected world.", language: "Personality Development" },
    { question: "How can I develop better teamwork skills?", answer: "Improve teamwork by communicating effectively, being reliable, supporting team members, sharing credit, resolving conflicts constructively, adapting to different working styles, and focusing on team goals over individual recognition.", language: "Personality Development" },
    { question: "What is the importance of emotional regulation?", answer: "Emotional regulation improves decision-making, enhances relationships, reduces stress, increases productivity, and promotes mental health. It involves recognizing emotions, understanding triggers, and choosing appropriate responses.", language: "Personality Development" },
    { question: "How can I develop better critical thinking?", answer: "Enhance critical thinking by questioning assumptions, analyzing information objectively, considering multiple perspectives, evaluating evidence, recognizing biases, drawing logical conclusions, and being open to changing your mind.", language: "Personality Development" },
    { question: "What is the importance of networking events?", answer: "Networking events provide opportunities to meet professionals, learn industry trends, build relationships, find mentors, discover job opportunities, and expand your professional circle. Approach them with genuine interest and follow up appropriately.", language: "Personality Development" },
    { question: "How can I develop better leadership skills?", answer: "Improve leadership by developing vision, communicating effectively, building trust, empowering others, leading by example, making decisions confidently, handling conflicts, and continuously learning and adapting to change.", language: "Personality Development" },
    { question: "What is the importance of self-reflection?", answer: "Self-reflection promotes self-awareness, helps identify areas for improvement, enhances decision-making, increases emotional intelligence, and accelerates personal growth. Regular reflection helps you learn from experiences and make better choices.", language: "Personality Development" },
    { question: "How can I develop better customer service skills?", answer: "Enhance customer service by listening actively, showing empathy, being patient, solving problems efficiently, following up, maintaining professionalism, and going above and beyond to exceed expectations.", language: "Personality Development" },
    { question: "What is the importance of professional development?", answer: "Professional development keeps skills current, increases marketability, opens career opportunities, improves job satisfaction, enhances confidence, and ensures long-term career success in a rapidly changing workplace.", language: "Personality Development" },
    { question: "How can I develop better sales skills?", answer: "Improve sales skills by understanding customer needs, building relationships, communicating value effectively, handling objections, closing deals, following up, and maintaining ethical practices while achieving targets.", language: "Personality Development" },
    { question: "What is the importance of work ethic?", answer: "Strong work ethic builds reputation, increases productivity, creates opportunities, earns respect, promotes career advancement, and leads to personal satisfaction. It involves reliability, dedication, and commitment to quality work.", language: "Personality Development" },
    { question: "How can I develop better project management skills?", answer: "Enhance project management by planning thoroughly, organizing resources, communicating clearly, managing timelines, handling risks, coordinating team efforts, and delivering results on time and within budget.", language: "Personality Development" },
    { question: "What is the importance of innovation?", answer: "Innovation drives progress, creates competitive advantages, solves problems, improves efficiency, and opens new opportunities. Developing innovative thinking helps adapt to change and stay relevant in any field.", language: "Personality Development" },
    { question: "How can I develop better analytical skills?", answer: "Improve analytical skills by gathering relevant data, identifying patterns, evaluating information objectively, drawing logical conclusions, presenting findings clearly, and using insights to make informed decisions.", language: "Personality Development" },
    { question: "What is the importance of integrity?", answer: "Integrity builds trust, enhances reputation, creates lasting relationships, promotes ethical decision-making, and forms the foundation for long-term success. It involves consistency between words and actions.", language: "Personality Development" },
    { question: "How can I develop better coaching skills?", answer: "Enhance coaching by asking powerful questions, listening actively, providing constructive feedback, setting clear goals, supporting growth, holding accountability, and helping others discover their own solutions.", language: "Personality Development" },
    { question: "What is the importance of adaptability in leadership?", answer: "Adaptable leaders navigate change effectively, inspire confidence during uncertainty, adjust strategies as needed, embrace new technologies, and create resilient organizations that thrive in dynamic environments.", language: "Personality Development" },
    { question: "How can I develop better strategic thinking?", answer: "Improve strategic thinking by understanding big picture goals, analyzing trends, considering long-term implications, identifying opportunities, making connections between different areas, and planning for multiple scenarios.", language: "Personality Development" },
    { question: "What is the importance of emotional intelligence in leadership?", answer: "Emotional intelligence in leadership builds stronger teams, improves communication, enhances decision-making, creates positive work environments, increases employee engagement, and drives organizational success.", language: "Personality Development" },
    { question: "How can I develop better delegation skills?", answer: "Improve delegation by matching tasks to team members' strengths, providing clear instructions, setting expectations, offering support, trusting others to complete work, and following up appropriately without micromanaging.", language: "Personality Development" },
    { question: "What is the importance of continuous improvement?", answer: "Continuous improvement drives excellence, increases efficiency, enhances competitiveness, promotes innovation, builds better products/services, and creates a culture of learning and growth in organizations.", language: "Personality Development" },
    { question: "How can I develop better change management skills?", answer: "Enhance change management by communicating vision clearly, addressing concerns, involving stakeholders, providing support during transitions, celebrating successes, and maintaining momentum throughout the change process.", language: "Personality Development" },
    { question: "What is the importance of cross-cultural communication?", answer: "Cross-cultural communication enables global collaboration, reduces misunderstandings, builds inclusive environments, improves international business success, and promotes respect for diverse perspectives in our interconnected world.", language: "Personality Development" },
    { question: "How can I develop better influence skills?", answer: "Improve influence by building credibility, understanding others' needs, communicating value, building relationships, using persuasion ethically, leading by example, and creating win-win situations that benefit all parties.", language: "Personality Development" },
    { question: "What is the importance of resilience in the workplace?", answer: "Workplace resilience helps navigate challenges, maintain performance under pressure, adapt to change, recover from setbacks, maintain work-life balance, and sustain long-term career success in demanding environments.", language: "Personality Development" },
    { question: "How can I develop better mentoring skills?", answer: "Enhance mentoring by sharing knowledge generously, providing guidance without controlling, offering constructive feedback, being a good listener, setting clear expectations, and supporting mentees' growth and development.", language: "Personality Development" },
    { question: "What is the importance of innovation in leadership?", answer: "Innovative leadership drives organizational growth, creates competitive advantages, attracts talent, improves problem-solving, adapts to market changes, and positions companies for long-term success in dynamic environments.", language: "Personality Development" },
    { question: "How can I develop better crisis management skills?", answer: "Improve crisis management by staying calm under pressure, gathering accurate information quickly, communicating clearly, making decisive decisions, coordinating response efforts, learning from experiences, and preparing for future crises.", language: "Personality Development" },
    { question: "What is the importance of servant leadership?", answer: "Servant leadership prioritizes others' growth, builds stronger organizations, increases employee engagement, creates positive cultures, improves retention, and leads to sustainable long-term success through service to others.", language: "Personality Development" },
    { question: "How can I develop better team building skills?", answer: "Enhance team building by creating shared goals, fostering open communication, building trust, encouraging collaboration, recognizing contributions, resolving conflicts, and creating an environment where teams can thrive.", language: "Personality Development" },
    { question: "What is the importance of strategic communication?", answer: "Strategic communication aligns messages with organizational goals, builds stakeholder relationships, manages reputation, drives change, improves decision-making, and creates shared understanding across all levels.", language: "Personality Development" },
    { question: "How can I develop better organizational skills?", answer: "Improve organizational skills by creating systems, prioritizing tasks, managing time effectively, maintaining order, planning ahead, using tools efficiently, and creating processes that enhance productivity and reduce stress.", language: "Personality Development" },
    { question: "What is the importance of cultural sensitivity?", answer: "Cultural sensitivity promotes inclusive environments, reduces conflicts, improves collaboration, enhances customer relationships, supports global business success, and demonstrates respect for diverse backgrounds and perspectives.", language: "Personality Development" },
    { question: "How can I develop better public relations skills?", answer: "Enhance PR skills by understanding media relations, crafting compelling messages, managing reputation, building relationships with stakeholders, handling crises, and communicating effectively across various channels.", language: "Personality Development" },
    { question: "What is the importance of ethical leadership?", answer: "Ethical leadership builds trust, creates sustainable organizations, attracts talent, improves decision-making, enhances reputation, and ensures long-term success by doing what's right, not just what's profitable.", language: "Personality Development" },
    { question: "How can I develop better facilitation skills?", answer: "Improve facilitation by creating inclusive environments, managing group dynamics, asking powerful questions, keeping discussions focused, encouraging participation, managing time effectively, and helping groups reach consensus.", language: "Personality Development" },
    { question: "What is the importance of digital leadership?", answer: "Digital leadership drives technological transformation, improves efficiency, enhances customer experiences, creates competitive advantages, and positions organizations for success in the digital economy.", language: "Personality Development" },
    { question: "How can I develop better stakeholder management?", answer: "Enhance stakeholder management by identifying key stakeholders, understanding their needs, building relationships, communicating effectively, managing expectations, creating value, and ensuring long-term support for initiatives.", language: "Personality Development" },
    { question: "What is the importance of purpose-driven leadership?", answer: "Purpose-driven leadership inspires action, attracts talent, builds loyalty, creates meaning, drives performance, and ensures organizations contribute positively to society while achieving business objectives.", language: "Personality Development" },
    { question: "How can I develop better strategic execution skills?", answer: "Enhance strategic execution by creating clear plans, aligning resources, building accountability, monitoring progress, adapting to changes, communicating effectively, and ensuring strategies translate into results.", language: "Personality Development" },
    { question: "What is the importance of inclusive decision making?", answer: "Inclusive decision making improves outcomes, builds commitment, enhances creativity, reduces resistance, creates ownership, and ensures decisions reflect diverse perspectives and meet broader organizational needs.", language: "Personality Development" },
    { question: "How can I develop better organizational agility skills?", answer: "Improve organizational agility by creating flexible structures, building adaptive capacity, encouraging experimentation, learning quickly, responding to changes, and creating cultures that embrace uncertainty and opportunity.", language: "Personality Development" },
    { question: "What is the importance of trust-based leadership?", answer: "Trust-based leadership builds stronger relationships, improves collaboration, enhances performance, reduces costs, increases speed, and creates environments where people can take risks and innovate effectively.", language: "Personality Development" },
    { question: "How can I develop better strategic communication skills?", answer: "Enhance strategic communication by aligning messages with goals, understanding audiences, choosing appropriate channels, measuring effectiveness, adapting approaches, and ensuring consistent communication that drives results.", language: "Personality Development" },
    { question: "What is the importance of resilience in leadership?", answer: "Resilient leadership navigates challenges, maintains performance, inspires confidence, adapts to change, recovers from setbacks, and creates organizations that can thrive despite adversity and uncertainty.", language: "Personality Development" },
    { question: "How can I develop better innovation leadership skills?", answer: "Improve innovation leadership by creating supportive environments, encouraging experimentation, managing risk, building innovation capacity, recognizing creativity, and driving organizations toward breakthrough solutions and growth.", language: "Personality Development" },
    { question: "What is the importance of collaborative leadership in teams?", answer: "Collaborative leadership in teams improves performance, enhances creativity, builds relationships, increases engagement, creates ownership, and develops leadership capacity throughout the organization.", language: "Personality Development" },
    { question: "How can I develop better strategic thinking for the future?", answer: "Enhance strategic thinking for the future by analyzing trends, anticipating changes, considering scenarios, building flexibility, preparing for uncertainty, and creating strategies that position organizations for long-term success.", language: "Personality Development" },
    { question: "What is the importance of emotional intelligence in decision making?", answer: "Emotional intelligence in decision making improves outcomes, reduces bias, enhances relationships, increases buy-in, creates better solutions, and ensures decisions consider both rational and emotional factors.", language: "Personality Development" },
    { question: "How can I develop better organizational change skills?", answer: "Improve organizational change skills by understanding change dynamics, communicating vision, managing resistance, building support, creating momentum, sustaining change, and ensuring lasting transformation.", language: "Personality Development" },
    { question: "What is the importance of strategic networking?", answer: "Strategic networking builds relationships, creates opportunities, provides insights, enhances influence, supports career advancement, and creates value for both individuals and organizations through meaningful connections.", language: "Personality Development" },
    { question: "How can I develop better crisis leadership skills?", answer: "Enhance crisis leadership by staying calm, gathering information, communicating clearly, making decisions, coordinating response, supporting teams, learning from experience, and building organizational resilience.", language: "Personality Development" },
    { question: "What is the importance of inclusive innovation?", answer: "Inclusive innovation leverages diverse perspectives, creates better solutions, reaches broader markets, improves accessibility, drives growth, and ensures innovations benefit all segments of society.", language: "Personality Development" },
    { question: "How can I develop better strategic partnership skills?", answer: "Improve strategic partnership skills by identifying opportunities, building relationships, creating value, managing expectations, resolving conflicts, measuring success, and ensuring partnerships deliver mutual benefits.", language: "Personality Development" },
    { question: "What is the importance of adaptive strategy?", answer: "Adaptive strategy enables organizations to respond to change, seize opportunities, manage uncertainty, maintain relevance, and achieve success in dynamic and unpredictable environments.", language: "Personality Development" },
    { question: "How can I develop better organizational learning skills?", answer: "Enhance organizational learning by creating learning cultures, sharing knowledge, encouraging experimentation, learning from failures, building learning systems, and ensuring continuous improvement across the organization.", language: "Personality Development" },
    { question: "What is the importance of strategic talent management?", answer: "Strategic talent management attracts, develops, and retains key talent, builds competitive advantages, drives performance, supports growth, and ensures organizations have the capabilities needed for success.", language: "Personality Development" },
    { question: "How can I develop better innovation ecosystem skills?", answer: "Improve innovation ecosystem skills by building networks, fostering collaboration, creating supportive environments, managing relationships, leveraging external resources, and driving innovation across multiple stakeholders.", language: "Personality Development" },
    { question: "What is the importance of strategic communication in leadership?", answer: "Strategic communication in leadership aligns organizations, builds support, drives change, manages reputation, creates clarity, and ensures everyone understands and works toward shared goals and vision.", language: "Personality Development" },
    { question: "How can I develop better organizational resilience skills?", answer: "Enhance organizational resilience by building adaptive capacity, creating flexible structures, developing contingency plans, fostering learning cultures, and ensuring organizations can thrive despite challenges and uncertainty.", language: "Personality Development" },
    { question: "What is the importance of strategic thinking in innovation?", answer: "Strategic thinking in innovation aligns innovation efforts with organizational goals, identifies opportunities, manages resources, creates competitive advantages, and ensures innovations deliver value and drive growth.", language: "Personality Development" },
    { question: "How can I develop better collaborative innovation skills?", answer: "Improve collaborative innovation by building diverse teams, creating supportive environments, facilitating collaboration, managing conflicts, sharing knowledge, and ensuring innovations benefit from multiple perspectives and expertise.", language: "Personality Development" },
    { question: "What is the importance of strategic leadership development?", answer: "Strategic leadership development builds organizational capacity, ensures succession planning, drives performance, supports growth, creates competitive advantages, and ensures organizations have the leadership needed for future success.", language: "Personality Development" },
    { question: "How can I develop better organizational transformation skills?", answer: "Enhance organizational transformation skills by creating compelling visions, building coalitions, managing change, communicating effectively, sustaining momentum, and ensuring lasting transformation that drives organizational success.", language: "Personality Development" },
    { question: "What is the importance of strategic thinking in change management?", answer: "Strategic thinking in change management aligns change efforts with organizational goals, identifies key stakeholders, manages resources, creates momentum, and ensures changes deliver intended benefits and drive organizational success.", language: "Personality Development" },
    { question: "How can I develop better innovation strategy skills?", answer: "Improve innovation strategy skills by identifying opportunities, allocating resources, managing risk, building capabilities, measuring success, and ensuring innovation efforts align with organizational goals and create competitive advantages.", language: "Personality Development" },
    { question: "What is the importance of strategic communication in change management?", answer: "Strategic communication in change management builds understanding, creates support, manages resistance, maintains momentum, ensures alignment, and helps organizations successfully implement changes that drive improvement and growth.", language: "Personality Development" },
    { question: "How can I develop better organizational development leadership?", answer: "Enhance organizational development leadership by understanding systems, facilitating change, building capacity, improving processes, developing culture, and creating organizations that can adapt, learn, and thrive in changing environments.", language: "Personality Development" },
    { question: "What is the importance of strategic thinking in talent development?", answer: "Strategic thinking in talent development aligns development efforts with organizational needs, identifies critical capabilities, manages resources, creates pipelines, and ensures organizations have the talent needed for current and future success.", language: "Personality Development" },
    { question: "How can I develop better innovation leadership in teams?", answer: "Improve innovation leadership in teams by creating supportive environments, encouraging creativity, managing risk, building innovation capacity, recognizing contributions, and ensuring teams can develop breakthrough solutions that drive organizational success.", language: "Personality Development" },
    { question: "What is the importance of strategic communication in innovation?", answer: "Strategic communication in innovation builds understanding, creates support, manages expectations, shares knowledge, drives adoption, and ensures innovations deliver value and achieve intended impact across the organization.", language: "Personality Development" },
    { question: "How can I develop better organizational learning leadership?", answer: "Enhance organizational learning leadership by creating learning cultures, building learning systems, encouraging knowledge sharing, facilitating learning, measuring impact, and ensuring organizations continuously improve and adapt through learning.", language: "Personality Development" },
    { question: "What is the importance of strategic thinking in organizational development?", answer: "Strategic thinking in organizational development aligns development efforts with organizational goals, identifies improvement opportunities, manages resources, creates sustainable change, and ensures development initiatives drive organizational success and growth.", language: "Personality Development" },
    { question: "How can I develop better innovation culture leadership?", answer: "Improve innovation culture leadership by creating supportive environments, encouraging experimentation, managing risk, building innovation capacity, recognizing creativity, and ensuring organizations develop cultures that drive continuous innovation and growth.", language: "Personality Development" },
    { question: "What is the importance of strategic communication in talent management?", answer: "Strategic communication in talent management builds understanding, creates engagement, manages expectations, shares opportunities, drives development, and ensures talent management efforts attract, develop, and retain the people needed for organizational success.", language: "Personality Development" },
    { question: "How can I develop better organizational transformation leadership?", answer: "Enhance organizational transformation leadership by creating compelling visions, building coalitions, managing complex change, communicating effectively, sustaining momentum, and ensuring transformations deliver lasting improvements that drive organizational success.", language: "Personality Development" },
    { question: "What is the importance of strategic thinking in leadership development?", answer: "Strategic thinking in leadership development aligns development efforts with organizational needs, identifies critical capabilities, manages resources, creates pipelines, and ensures organizations develop the leadership capacity needed for current and future success.", language: "Personality Development" },
    { question: "How can I develop better innovation ecosystem leadership?", answer: "Improve innovation ecosystem leadership by building networks, fostering collaboration, creating supportive environments, managing relationships, leveraging external resources, and ensuring organizations can drive innovation across multiple stakeholders and create competitive advantages.", language: "Personality Development" },
    { question: "What is the importance of strategic communication in organizational development?", answer: "Strategic communication in organizational development builds understanding, creates support, manages change, shares knowledge, drives improvement, and ensures development initiatives create lasting positive change that drives organizational success and growth.", language: "Personality Development" }
];

// Flag to prevent multiple simultaneous updates
let isUpdatingPersonalityFaqs = false;

export function loadFaqsFromFirebase(onFaqsLoaded, onPersonalityFaqsLoaded) {
    const faqsRef = ref(database, 'faqs');
    const personalityFaqsRef = ref(database, 'personalityFaqs');

    onValue(faqsRef, (snapshot) => {
        const data = snapshot.val();
        let faqs = data ? Object.values(data) : [];
        if (!data) {
            defaultFaqs.forEach((faq, index) => {
                set(ref(database, `faqs/${index}`), faq);
            });
            faqs = defaultFaqs;
        }
        if (onFaqsLoaded) onFaqsLoaded(faqs);
    });

    onValue(personalityFaqsRef, (snapshot) => {
        const data = snapshot.val();
        let personalityFaqs = data ? Object.values(data) : [];
        
        // Check if we have the full set of personality FAQs (should be 100+ entries)
        // Also check if the first FAQ matches our expected content to avoid duplicates
        const hasCompleteFaqs = data && 
                               Object.keys(data).length >= 100 && 
                               data[0] && 
                               data[0].question === defaultPersonalityFaqs[0].question;
        
        if (!hasCompleteFaqs && !isUpdatingPersonalityFaqs) {
            isUpdatingPersonalityFaqs = true;
            console.log('Updating personality FAQs in Firebase...');
            console.log('Current FAQs count:', data ? Object.keys(data).length : 0);
            
            // Remove existing data and add all default personality FAQs
            set(ref(database, 'personalityFaqs'), null).then(() => {
                const promises = defaultPersonalityFaqs.map((faq, index) => 
                    set(ref(database, `personalityFaqs/${index}`), faq)
                );
                return Promise.all(promises);
            }).then(() => {
                console.log('Personality FAQs updated successfully!');
                isUpdatingPersonalityFaqs = false;
                personalityFaqs = defaultPersonalityFaqs;
                if (onPersonalityFaqsLoaded) onPersonalityFaqsLoaded(personalityFaqs);
            }).catch(error => {
                console.error('Error updating personality FAQs:', error);
                isUpdatingPersonalityFaqs = false;
                // Fallback to existing data if update fails
                if (onPersonalityFaqsLoaded) onPersonalityFaqsLoaded(personalityFaqs);
            });
        } else {
            console.log('Personality FAQs already complete, using existing data');
            if (onPersonalityFaqsLoaded) onPersonalityFaqsLoaded(personalityFaqs);
        }
    });
}

// Function to clear all personality FAQs
export function clearPersonalityFaqs() {
    console.log('Clearing all personality FAQs...');
    return set(ref(database, 'personalityFaqs'), null).then(() => {
        console.log('All personality FAQs cleared successfully!');
    }).catch(error => {
        console.error('Error clearing personality FAQs:', error);
        throw error;
    });
}



export function getFaqAnswer(message, faqs, personalityFaqs) {
    const clean = (txt) => txt.toLowerCase().replace(/[?.!]/g, '').trim();
    const userText = clean(message);
    
    // Check for exact match in regular FAQs
    let result = faqs.find(faq => clean(faq.question) === userText);
    if (result) {
        return result.answer;
    }
    
    // Check for partial match in regular FAQs
    result = faqs.find(faq => clean(faq.question).includes(userText) || userText.includes(clean(faq.question)));
    if (result) {
        return result.answer;
    }
    
    // Check for exact match in personality FAQs
        result = personalityFaqs.find(faq => clean(faq.question) === userText);
    if (result) {
        return result.answer;
    }
    
    // Check for partial match in personality FAQs
    result = personalityFaqs.find(faq => clean(faq.question).includes(userText) || userText.includes(clean(faq.question)));
    if (result) {
        return result.answer;
    }
    
    return null;
} 