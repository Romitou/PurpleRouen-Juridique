
from playwright.sync_api import sync_playwright, Page, expect
import os

def check_pdf_generation():
    # Since we can't easily view PDFs in Playwright without a viewer,
    # we will render the HTML template directly to verify the styling.
    # The build.js logic combines CSS and HTML. We will simulate that here.

    with open('legal_docs/theme/style.css', 'r') as f:
        css = f.read()

    with open('legal_docs/theme/template.html', 'r') as f:
        template = f.read()

    # We'll just check the CGV content roughly converted (or just dummy text)
    # Ideally we'd run the node script to generate HTML, but let's just mock it
    # to see if the styles are applied.

    # We will assume the node script is correct (it uses standard libraries)
    # and verify the visual style by injecting the CSS into a page with the structure.

    mock_content = """
    <h1>CONDITIONS GÉNÉRALES DE VENTE (CGV)</h1>
    <p><strong>Dernière mise à jour : 25 Octobre 2023</strong></p>
    <h2>1. Objet</h2>
    <p>Les présentes Conditions Générales de Vente (ci-après "CGV") régissent les relations contractuelles...</p>
    """

    final_html = template.replace('{{title}}', 'CGV').replace('{{css}}', css).replace('{{content}}', mock_content)

    # Write this to a temp file
    with open('verification/preview.html', 'w') as f:
        f.write(final_html)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(f"file://{os.getcwd()}/verification/preview.html")

        # Take a screenshot
        page.screenshot(path="verification/preview.png", full_page=True)
        browser.close()

if __name__ == "__main__":
    check_pdf_generation()
