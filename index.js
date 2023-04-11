#! /usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

async function copyFiles() {
  try {
    // Copy HeroIcon.jsx to ./src/components/Icons/
    const heroIconSrcPath = path.join(__dirname, 'HeroIcon.jsx');
    const heroIconDestPath = path.join(process.cwd(), 'src', 'components', 'Icons', 'HeroIcon.jsx');
    await fs.copyFile(heroIconSrcPath, heroIconDestPath);
    console.log(`Copied HeroIcon.jsx to ${heroIconDestPath}`);

    // Copy heroIcons directory to ./public/
    const heroIconsSrcPath = path.join(__dirname, 'heroIcons');
    const heroIconsDestPath = path.join(process.cwd(), 'public', 'heroIcons');
    await fs.mkdir(heroIconsDestPath, { recursive: true });
    await fs.copyFile(heroIconsSrcPath, heroIconsDestPath);
    console.log(`Copied heroIcons to ${heroIconsDestPath}`);
  } catch (error) {
    console.error(error);
  }
}

copyFiles();