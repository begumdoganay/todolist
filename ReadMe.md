# Elegant Task Manager

A beautiful and elegant task management application with multiple themes and language support.

![Task Manager Preview](screenshot.png)

## Features

### 🎨 Theme Options
- Pastel (Default)
- Evening
- Ocean
- Spring
- Lavender
- Sunset
- Mint
- Peach

### 🌐 Language Support
- English (🇬🇧)
- Turkish (🇹🇷)
- French (🇫🇷)
- Spanish (🇪🇸)
- German (🇩🇪)

### ✨ Key Features
- Elegant and modern design
- Multiple pastel theme options
- Multi-language support
- Task management with priorities
- Location and time tracking
- Project categorization
- Local storage for data persistence
- Responsive design

## Technology Stack

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts
- SortableJS

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/elegant-task-manager.git
```

2. Navigate to the project directory:
```bash
cd elegant-task-manager
```

3. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

## Usage

### Adding a Task
1. Fill in the task details:
   - Task Name
   - Project Category
   - Start Time
   - Location
   - Priority Level

2. Click "Add Task" to create the task

### Changing Themes
- Click on any theme button in the theme selector to instantly change the application's appearance
- Theme preference is saved automatically

### Changing Language
- Select your preferred language from the language dropdown
- All interface elements will update automatically
- Language preference is saved for future visits

## Project Structure

```
elegant-task-manager/
│
├── index.html          # Main HTML file
├── README.md          # Project documentation
└── screenshot.png     # Project preview image
```

## Customization

### Adding New Themes
Add new theme variables in the `:root` CSS selector:

```css
.theme-newtheme {
    --bg-primary: #your-color;
    --bg-secondary: #your-color;
    --accent: #your-color;
}
```

### Adding New Languages
Add new language translations in the `translations` object:

```javascript
const translations = {
    newlang: {
        taskName: 'Task Name in new language',
        // Add other translations
    }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Begüm Doğanay - [Your Website](https://yourwebsite.com)

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- SortableJS for drag & drop functionality