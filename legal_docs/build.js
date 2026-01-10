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
// Charger l'image en base64 pour Puppeteer
function getFooterImageBase64() {
    const imagePath = path.join(__dirname, '../assets/banners/footer.png');
    if (fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);
        return `data:image/png;base64,${imageBuffer.toString('base64')}`;
    }
    return '';
}

const HEADER_HTML = `
    <div style="font-size: 10px; text-align: right; width: 100%; margin-right: 20px; font-family: Helvetica, Arial, sans-serif;">
        Document généré le <span class="date"></span>
    </div>`;

function getFooterHTML() {
    const footerImageBase64 = getFooterImageBase64();
    return `
    <div style="position: absolute; bottom: 0; left: 0; margin: 0; padding: 0; width: 100%; font-family: 'Roboto', Helvetica, Arial, sans-serif;">
        <!-- Image de fond -->
        <img src="${footerImageBase64}" style="width: 100%; height: auto; display: block; margin: 0; padding: 0; position: relative;" />
        
        <!-- Contenu superposé -->
        <div style="position: absolute; top: 60%; left: 0; width: 100%; transform: translateY(-50%); display: flex; justify-content: flex-end; align-items: center; padding: 0 150px; box-sizing: border-box;">
            <!-- Page à droite -->
            <div style="font-size: 15px; color: #ffffff; font-weight: 500;">
                Page <span class="pageNumber"></span> / <span class="totalPages"></span>
            </div>
        </div>
    </div>`;
}

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
            bottom: '25mm', // Adjusted for footer to be flush with page bottom
            left: '20mm'
        },
        displayHeaderFooter: true,
        headerTemplate: HEADER_HTML,
        footerTemplate: getFooterHTML(),
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
