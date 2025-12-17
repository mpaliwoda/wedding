# Wedding Website

A beautiful bilingual (English/Polish) static wedding website ready for deployment on GitHub Pages.

## Features

- **Bilingual Support**: Seamless switching between English and Polish
- **Responsive Design**: Looks great on all devices (desktop, tablet, mobile)
- **Elegant Animations**: Smooth scroll effects and subtle animations
- **Modern Design**: Clean, elegant layout perfect for weddings
- **Easy to Customize**: Simple HTML structure for quick customization

## Sections Included

1. **Hero Section**: Names and wedding date
2. **Our Story**: Couple's story (customizable)
3. **Event Details**: Ceremony and reception information
4. **Schedule**: Timeline of wedding day events
5. **RSVP**: Contact information for guests
6. **Accommodation**: Hotel recommendations for guests

## Customization

### Update Wedding Information

Edit `index.html` to customize:

1. **Names**: Line 22 - Change "Irena & Marcin" to your names
2. **Wedding Date**: Line 24 - Update "15.06.2026" to your date
3. **Story**: Lines 41-42 - Add your personal story
4. **Ceremony Location**: Lines 54-57 - Update church name and address
5. **Reception Location**: Lines 63-66 - Update venue name and address
6. **Schedule Times**: Lines 77, 86, 95, 104 - Adjust event times
7. **Contact Information**: Lines 118-121 - Update email and phone
8. **Hotels**: Lines 133-141 - Add your recommended hotels

### Customize Colors

Edit `styles.css` (lines 9-15) to change the color scheme:

```css
:root {
    --primary-color: #9b59b6;      /* Purple - Main brand color */
    --secondary-color: #e91e63;    /* Pink - Secondary accent */
    --accent-color: #5c6bc0;       /* Blue - Additional accent */
    --text-dark: #2c2c2c;          /* Dark text */
    --text-light: #ffffff;         /* Light text */
    --background-light: #f3e5f5;   /* Light purple background */
    --background-white: #ffffff;   /* White background */
}
```

### Update Translations

Each bilingual text element has `data-en` (English) and `data-pl` (Polish) attributes. For example:

```html
<h2 data-en="Our Story" data-pl="Nasza Historia">Our Story</h2>
```

Simply update the text in both attributes to change the content in each language.

## Deployment to GitHub Pages

### Option 1: Using Git Command Line

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   ```

2. **Add all files**:
   ```bash
   git add .
   ```

3. **Commit changes**:
   ```bash
   git commit -m "Initial wedding website"
   ```

4. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Name it (e.g., "wedding" or "our-wedding")
   - Don't initialize with README (we already have one)
   - Click "Create repository"

5. **Link local repository to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git branch -M main
   git push -u origin main
   ```

6. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" > "Pages"
   - Under "Source", select "main" branch
   - Select "/ (root)" folder
   - Click "Save"

7. **Access your website**:
   - Your site will be available at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`
   - It may take a few minutes for the site to become available

### Option 2: Using GitHub Desktop

1. Open GitHub Desktop
2. Click "File" > "Add Local Repository" and select your wedding folder
3. If prompted, click "Create a Repository"
4. Click "Publish repository" to push to GitHub
5. Follow steps 6-7 from Option 1 above

## Local Development

To preview the website locally:

1. **Simple method**: Just open `index.html` in your web browser

2. **Using a local server** (recommended for best preview):
   ```bash
   # If you have Python installed:
   python -m http.server 8000
   # OR
   python3 -m http.server 8000

   # Then open http://localhost:8000 in your browser
   ```

   ```bash
   # If you have Node.js installed:
   npx serve

   # Then open the URL shown in the terminal
   ```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Language Persistence

The website remembers the user's language preference using localStorage, so guests will see their chosen language when they return to the site.

## File Structure

```
wedding/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript for language switching
├── .nojekyll          # Tells GitHub Pages to skip Jekyll processing
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## Support

For issues with:
- **GitHub Pages**: Check [GitHub Pages documentation](https://docs.github.com/en/pages)
- **Customization**: Review the HTML/CSS comments in the files
- **Git/GitHub**: See [Git documentation](https://git-scm.com/doc)

## License

This is a template for personal use. Feel free to customize and use for your wedding!

---

**Made with ❤️ for your special day**
