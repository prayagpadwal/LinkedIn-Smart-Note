# LinkedIn Smart Note

LinkedIn Smart Note is a Chrome extension that automatically generates personalized connection request messages on LinkedIn. When a user selects “Add a note,” the extension extracts profile information and inserts a customized message based on a user-defined template.

---

## Overview

This extension improves networking efficiency by generating structured, context-aware LinkedIn connection notes. It leverages LinkedIn’s DOM, Chrome Storage APIs, and Manifest V3 service workers to deliver a streamlined and customizable experience.

---

## Features

* Automatically generates LinkedIn connection notes
* Extracts profile information (first name and headline field)
* Supports a customizable message template
* Toggle for enabling or disabling auto-fill
* Clean popup interface for configuration
* Built using Chrome Manifest V3

---

## Installation (Developer Mode)

1. Download or clone this repository.

2. Open Google Chrome and navigate to:

   ```
   chrome://extensions
   ```

3. Enable **Developer mode** (top-right corner).

4. Select **Load unpacked**.

5. Choose the project directory.

The extension will now appear in your Chrome toolbar.

---

## Project Structure

```
LinkedIn-Smart-Note/
│── manifest.json
│── background.js
│── content.js
│── popup.html
│── popup.css
│── popup.js
│── content.css
│── image.png
│── image16.png
│── image48.png
│── image128.png
└── README.md
```

---

## How It Works

### Content Script (content.js)

Monitors LinkedIn pages and detects when the user clicks “Add a note.”
Extracts the user’s name and field from the profile headline, then inserts a personalized message.

### Popup Interface

Allows users to edit their note template and toggle auto-fill functionality.

### Background Service Worker

Handles storage and retrieval of user settings using the Chrome Storage API.

---

## Template Customization

You can customize the note template using placeholders:

| Placeholder | Description                                 |
| ----------- | ------------------------------------------- |
| `{name}`    | First name of the LinkedIn profile          |
| `{field}`   | Primary keyword extracted from the headline |

Example template:

```
Hi {name}, I'd love to connect and learn more about your work in {field}.
```

---

## Icons

The extension includes standard Chrome icon sizes:

* image16.png
* image48.png
* image128.png

Configured in `manifest.json`:

```json
"icons": {
  "16": "image16.png",
  "48": "image48.png",
  "128": "image128.png"
}
```

---

## Known Issues

* LinkedIn periodically updates its interface, which may require selector updates in `content.js`.
* After modifying any file, reload the extension via `chrome://extensions`.

---

## Contributing

Contributions are welcome. For significant changes, please open an issue to discuss your ideas before submitting a pull request.
