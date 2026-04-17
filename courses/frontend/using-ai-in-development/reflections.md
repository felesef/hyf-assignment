Part A: Review and Improve Portfolio

1. Get a code review: The reviews that I get from AI:
- Readability	Good; small improvement with a short CSS/JS comment.
- Best practices	Solid semantics and a11y; add focus-visible, consider reduced motion and prefers-color-scheme.
- Bugs	Low risk; harden theme with try/catch for localStorage and normalize stored theme value.
- Security	Fine for a static CV; keep external links and future dynamic content in mind.

2. Note improvements: 
- Update the hero to “SDET | Backend Engineer” (or the same wording as the PDF), change the About to 11+ years and a short version of the PDF summary (ISTQB, tech focus, Agile). Replace the two experience cards with your real roles, dates, companies, and 2–3 highlights each so the page matches the CV.
- Restructure the Skills section to mirror the Resume (e.g. Programming, Databases, DevOps, Testing, Tools) and add the technologies (Golang, Java, Cypress, Playwright, AWS, Docker, etc.). In Contact (or hero), add real email, phone, LinkedIn URL, and location (e.g.  "Denmark”) so recruiters get the same info as on the REsume.
- Replace that with real entries: one line per degree/cert (institution, program, year). Add a separate “Certifications” block (or subsection) for ISTQB and the IBM courses (DevOps, Cloud, Docker, Kubernetes, Agile, Python, etc.) HYF courses. That makes the portfolio match the CV and helps both humans and ATS with keywords.

3. Generate a diagram - Use AI to generate an ASCII diagram that describes the structure of your portfolio project.

```
                    +------------------+
                    |   index.html     |
                    |  (Portfolio CV)  |
                    +--------+---------+
                             |
         +-------------------+-------------------+
         |                   |                   |
         v                   v                   v
  +-------------+    +-------------+    +-------------+
  | styles.css  |    | scripts.js  |    |  <body>     |
  | (theme,     |    | (year,      |    |  structure  |
  |  layout)    |    |  theme)     |    |             |
  +-------------+    +-------------+    +------+------+
                                              |
              +-------------------------------+-------------------------------+
              |               |               |               |               |
              v               v               v               v               v
       +-----------+   +-----------+   +-----------+   +-----------+   +-----------+
       |  <header> |   |   hero    |   |  about    |   | experience|   |  skills   |
       |  nav +    |   |  name,    |   |  summary  |   |  cards    |   |  tags     |
       |  theme    |   |  title    |   |           |   |           |   |           |
       +-----------+   +-----------+   +-----------+   +-----------+   +-----------+
              |                                                               |
              +---------------------------------------------------------------+
                                              |
                                              v
                                    +-------------------+
                                    |  education +      |
                                    |  contact         |
                                    +---------+--------+
                                              |
                                              v
                                    +-------------------+
                                    |  <footer>         |
                                    |  year, copy       |
                                    +-------------------+
```

4. Reflect on learnings:
- AI can shorten the development and make the things easier. But It can have hallucination, and over-engineering. Be cautious always.
- AI can enhance your skill and become your mentor on learning those skills. But at the and you should also make your own research, it can miss some points or it can load you unnecessary things.
- AI is very helpful on code review. But you should put strict rulesets to prevent it making lots off unnecessary comments. 

Part B: Ethics and Risks:
- Code quality: with the usage of AI the gap between mid and junior developers are closed but this brings many code quality issues. This can bring un-maintainable, bad-structured and hard to understandable code bases.
- AI generated code reviews can be technically correct but it would miss the business logic. Someone still review it from the business logic perspective.
- Relying on AI too much will weaken the skills of the developers. And this would bring many hardness on company and personal level skill pool. 
- Sharing codebases with AI will bring many security vulnerabilities, data and secret leakages.
- Using AI will bring new company ethic policies to compliance by the developers. This would lead new conflicts in work environment.