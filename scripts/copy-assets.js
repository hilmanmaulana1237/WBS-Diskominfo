const fs = require('fs');
const path = require('path');

// Create public/assets directory if it doesn't exist
const assetsDir = path.join(__dirname, '../public/assets');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// Copy Bootstrap CSS
const bootstrapCssSource = path.join(__dirname, '../node_modules/bootstrap/dist/css');
const bootstrapCssDest = path.join(assetsDir, 'bootstrap/css');
if (!fs.existsSync(bootstrapCssDest)) {
    fs.mkdirSync(bootstrapCssDest, { recursive: true });
}
fs.readdirSync(bootstrapCssSource).forEach(file => {
    fs.copyFileSync(
        path.join(bootstrapCssSource, file),
        path.join(bootstrapCssDest, file)
    );
});

// Copy Bootstrap JS
const bootstrapJsSource = path.join(__dirname, '../node_modules/bootstrap/dist/js');
const bootstrapJsDest = path.join(assetsDir, 'bootstrap/js');
if (!fs.existsSync(bootstrapJsDest)) {
    fs.mkdirSync(bootstrapJsDest, { recursive: true });
}
fs.readdirSync(bootstrapJsSource).forEach(file => {
    fs.copyFileSync(
        path.join(bootstrapJsSource, file),
        path.join(bootstrapJsDest, file)
    );
});

// Copy Bootstrap Icons
const bootstrapIconsSource = path.join(__dirname, '../node_modules/bootstrap-icons/font');
const bootstrapIconsDest = path.join(assetsDir, 'bootstrap-icons');
if (!fs.existsSync(bootstrapIconsDest)) {
    fs.mkdirSync(bootstrapIconsDest, { recursive: true });
}

// Copy Bootstrap Icons fonts folder
const iconsFontsSource = path.join(bootstrapIconsSource, 'fonts');
const iconsFontsDest = path.join(bootstrapIconsDest, 'fonts');
if (fs.existsSync(iconsFontsSource) && fs.statSync(iconsFontsSource).isDirectory()) {
    if (!fs.existsSync(iconsFontsDest)) {
        fs.mkdirSync(iconsFontsDest, { recursive: true });
    }
    fs.readdirSync(iconsFontsSource).forEach(file => {
        fs.copyFileSync(
            path.join(iconsFontsSource, file),
            path.join(iconsFontsDest, file)
        );
    });
}

// Copy Bootstrap Icons CSS files
fs.readdirSync(bootstrapIconsSource).forEach(file => {
    const filePath = path.join(bootstrapIconsSource, file);
    if (fs.statSync(filePath).isFile()) {
        fs.copyFileSync(
            filePath,
            path.join(bootstrapIconsDest, file)
        );
    }
});

console.log('✓ Bootstrap assets copied successfully!');
