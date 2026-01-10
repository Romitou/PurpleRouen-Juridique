const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const markdownIt = require('markdown-it');

const md = new markdownIt();

// Configuration
const CONTENT_DIR = path.join(__dirname, 'content');
const OUTPUT_DIR = path.join(__dirname, 'output');
const THEME_DIR = path.join(__dirname, 'theme');
const STYLE_PATH = path.join(THEME_DIR, 'style.css');
const TEMPLATE_PATH = path.join(THEME_DIR, 'template.html');

// Banner/Footer Configuration
// Pour une image, utilisez une URL http:// ou un chemin file:// absolu ou une image en base64 (data:image/png;base64,...)
// Exemple de logo (placeholder)
const LOGO_URL = "https://via.placeholder.com/100x30?text=LOGO";

const HEADER_HTML = `
    <div style="font-size: 10px; text-align: right; width: 100%; margin-right: 20px; font-family: Helvetica, Arial, sans-serif;">
        Document généré le <span class="date"></span>
    </div>`;

const FOOTER_HTML = `
    <div style="font-size: 10px; text-align: center; width: 100%; font-family: Helvetica, Arial, sans-serif; padding-top: 10px; border-top: 1px solid #ddd; margin: 0 20px;">
        <div style="margin-bottom: 5px;">
            <!-- Exemple d'image de bannière / logo -->
            <!-- <img src="${LOGO_URL}" style="height: 30px;" /> -->
            <strong>Mon Événement Super Cool</strong>
        </div>
        <div>
            SAS au capital de 1000€ - RCS Paris 123 456 789 <br />
            Page <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>
    </div>`;

async function convertMarkdownToPdf(filename) {
    const inputPath = path.join(CONTENT_DIR, filename);
    const outputPath = path.join(OUTPUT_DIR, filename.replace('.md', '.pdf'));

    console.log(`Processing ${filename}...`);

    if (!fs.existsSync(inputPath)) {
        console.error(`File not found: ${inputPath}`);
        return;
    }

    const content = fs.readFileSync(inputPath, 'utf8');
    const css = fs.readFileSync(STYLE_PATH, 'utf8');
    let template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

    // Convert Markdown to HTML
    const htmlContent = md.render(content);

    // Inject into template
    const finalHtml = template
        .replace('{{title}}', filename.replace('.md', '').toUpperCase())
        .replace('{{css}}', css)
        .replace('{{content}}', htmlContent);

    // Launch Puppeteer
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Set content
    await page.setContent(finalHtml, {
        waitUntil: 'networkidle0'
    });

    // Generate PDF
    await page.pdf({
        path: outputPath,
        format: 'A4',
        margin: {
            top: '20mm',
            right: '20mm',
            bottom: '30mm', // Increased bottom margin for footer
            left: '20mm'
        },
        displayHeaderFooter: true,
        headerTemplate: HEADER_HTML,
        footerTemplate: FOOTER_HTML,
        printBackground: true
    });

    await browser.close();
    console.log(`Generated: ${outputPath}`);
}

async function main() {
    // Ensure output dir exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Process all MD files in content dir
    const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));

    for (const file of files) {
        await convertMarkdownToPdf(file);
    }
}

main().catch(console.error);
