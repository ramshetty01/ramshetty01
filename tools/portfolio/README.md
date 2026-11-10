# Build the Word portfolio brief

The checked-in Markdown chapters are snapshots of each repository's inspected
PROJECT_BRIEF.md. Refresh the source chapters and status table before generating a
new report. The workflow images are simplified diagrams, not complete failure graphs.

```sh
cd tools/portfolio
npm ci
node build.cjs /absolute/path/AI_Project_Portfolio_Brief.docx
```

The generator reads PROJECT_PORTFOLIO.md plus the four chapters under projects/.
It creates an A4 Word document with headings, a table-of-contents field, hyperlinks,
tables, code examples and page numbers. Update the table of contents in Word if needed.
No API credentials, model calls or deployment access are required.
