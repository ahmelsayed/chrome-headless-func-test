const puppeteer = require("puppeteer");
const fs = require("fs");

module.exports = async function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto("https://example.com");
  await page.screenshot({ path: "example.png" });
  await browser.close();

  context.res = {
    status: 202,
    body: Buffer.from(fs.readFileSync("example.png")),
    headers: {
      "Content-Type": "image",
      "Content-Disposition": `attachment; filename=example.png`
    }
  };
};
