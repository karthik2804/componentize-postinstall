import fs from 'fs';
import path from 'path';

const getFilePath = () => path.join(process.env.INIT_CWD, 'componentizejs.json');
const getPackageName = () => process.env.npm_package_name;
const getPackagePath = () => process.env.npm_package_config_wit;

function createFileIfNotExists(filePath, packageName, packagePath) {
    if (!fs.existsSync(filePath)) {
        const initialContent = JSON.stringify([{ name: packageName, witPath: packagePath }], null, 2);
        fs.writeFileSync(filePath, initialContent, 'utf8');
    }
}

function appendEntryIfNotExists(filePath, packageName, packagePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonArray = JSON.parse(fileContent);

    const entryExists = jsonArray.some(entry => entry.name === packageName && entry.witPath === packagePath);

    if (!entryExists) {
        jsonArray.push({ name: packageName, witPath: packagePath });
        fs.writeFileSync(filePath, JSON.stringify(jsonArray, null, 2), 'utf8');
    }
}

export function runPostInstallSetup() {
    const filePath = getFilePath();
    const packageName = getPackageName();
    const packagePath = getPackagePath();
    createFileIfNotExists(filePath, packageName, packagePath);
    appendEntryIfNotExists(filePath, packageName, packagePath);
}
