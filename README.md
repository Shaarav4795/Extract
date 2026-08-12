# Extract

[![React](https://img.shields.io/badge/React-19.2.8-149eca?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension%20Manifest%20V3-4285F4?logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3)

## Project

Extract is a lightweight Chrome colour picker built with React, Vite, and TypeScript. It lets users pick a colour from anywhere on their screen, view it in multiple formats, copy the result, and keep their 10 most recent picks handy.

## Problem Statement

People who work with visual content are often blocked by one of these constraints:

1. Identifying an exact colour from a website, image, or design usually requires a separate tool on your computer which is awkward to use.
2. Switching between colour pickers and a browser interrupts what could be a quick interaction.
3. A picked colour is easy to lose when there is no history or format conversion.

## How Extract Solves It

Extract provides:

1. An eyedropper experience that picks colours directly from the screen.
2. Instant conversion between HEX, RGB, HSL, HSV, and CMYK formats.
3. An history of the 10 most recent colours.

## Who It Is For

Extract is designed for:

Designers, developers, and anyone who needs to identify and reuse colours quickly.

## How It Works

1. Open Extract from the Chrome toolbar.
2. Click Pick a colour and select a colour anywhere on your screen.
3. Choose a colour format from the dropdown.
4. Copy the value or click a recent swatch to use it again.
5. Clear your recent colour history whenever you want.

## Load extension in Chrome

1. Build the extension:

```bash
npm run build
```

1. Open `chrome://extensions` in Chrome.
2. Enable Developer mode.
3. Click Load unpacked and select the `dist/` folder.
4. Pin Extract to your toolbar and click the extension icon to open the popup.
