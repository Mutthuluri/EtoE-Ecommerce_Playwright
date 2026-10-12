const fs = require('fs');
const path = require('path');

class ScreenshotHelper {
  static get screenshotsDir() {
    return path.join(__dirname, '..', 'test-results', 'screenshots');
  }

  static clearScreenshots() {
    const screenshotDir = this.screenshotsDir;
    if (fs.existsSync(screenshotDir)) {
      for (const entry of fs.readdirSync(screenshotDir, { withFileTypes: true })) {
        const fullPath = path.join(screenshotDir, entry.name);
        if (entry.isDirectory()) {
          fs.rmSync(fullPath, { recursive: true, force: true });
        } else {
          fs.rmSync(fullPath, { force: true });
        }
      }
    } else {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
  }

  static async captureFullPage(page, fileName) {
    const screenshotDir = this.screenshotsDir;
    fs.mkdirSync(screenshotDir, { recursive: true });
    const safeName = fileName.replace(/\s+/g, '-').toLowerCase();
    const screenshotPath = path.join(screenshotDir, `${safeName}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    return screenshotPath;
  }
}

module.exports = { ScreenshotHelper };
