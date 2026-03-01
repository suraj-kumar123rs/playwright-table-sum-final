const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let total = 0;

  for (let seed = 30; seed <= 39; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url, { waitUntil: "networkidle" });

    const numbers = await page.$$eval("td", tds =>
      tds.map(td => Number(td.innerText.trim()))
    );

    for (const n of numbers) {
      if (Number.isFinite(n)) {
        total += n;
      }
    }
  }

  console.log("FINAL_SUM =", total);
  await browser.close();
})();
