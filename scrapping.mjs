import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";
import path from "path";

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
    defaultViewport: {
      width: 1280,
      height: 800,
    },
  });

  const page = await browser.newPage();
  const baseURL = "https://naserpublicidad.org";

  await page.goto(baseURL, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  // Scroll para cargar contenido lazy
  for (let i = 0; i < 10; i++) {
    await page.evaluate(() => window.scrollBy(0, 500));
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Extraer enlaces internos
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a"))
      .map(a => a.href)
      .filter(href =>
        href.startsWith("https://naserpublicidad.org") &&
        !href.includes("#") &&
        !href.includes("tel:") &&
        !href.includes("mailto:")
      );
  });

  const uniqueLinks = [...new Set(links)];
  console.log(`🔗 Enlaces encontrados: ${uniqueLinks.length}`);

  const outputDir = "./scraped_pages";
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  for (const url of uniqueLinks) {
    try {
      console.log(`⏳ Navegando a: ${url}`);
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

      // Scroll para cargar contenido
      for (let i = 0; i < 10; i++) {
        await page.evaluate(() => window.scrollBy(0, 500));
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Espera adicional
      await new Promise(resolve => setTimeout(resolve, 2000));

      const elements = await page.evaluate(() => {
        const selectors = [
          ".elementor-widget-text-editor",
          ".elementor-heading-title",
          ".elementor-icon-box-title",
          ".elementor-icon-box-description",
          ".swiper-slide",
          ".swiper-slide-inner",
          ".swiper-slide-image",

        ];
        const nodes = Array.from(document.querySelectorAll(selectors.join(", ")));

        return nodes.map(node => ({
          tag: node.tagName.toLowerCase(),
          text: node.innerText.trim(),
          html: node.innerHTML.trim(),
        }));
      });

      const filename = url
        .replace(baseURL, "")
        .replace(/[^a-zA-Z0-9]/g, "_")
        .replace(/^_+|_+$/g, "") || "home";

      const filePath = path.join(outputDir, `scrape_${filename}.json`);

      fs.writeFileSync(filePath, JSON.stringify(elements, null, 2), "utf-8");
      console.log(`✅ Guardado: ${filePath}`);
    } catch (err) {
      console.error(`❌ Error en ${url}:`, err.message);
    }
  }

  await browser.close();
  console.log("🏁 Scraping finalizado.");
})();
