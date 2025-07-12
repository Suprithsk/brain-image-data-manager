# Brain Image Data Manager

A React-based web application for managing brain image datasets. This application provides an easy-to-use interface for viewing, filtering, and downloading brain imaging data.

## What This App Does

- **Browse Datasets**: View a list of brain imaging datasets with information like title, device, modality, and attributes
- **Filter Data**: Search and filter datasets by title, group, modality, and other criteria
- **File Management**: Browse and select files from specific datasets
- **Download Files**: Download selected files with progress tracking

## Prerequisites

Make sure you have **pnpm** installed on your computer. If you don't have it, you can install it by running:
```bash
npm install -g pnpm
```

## Getting Started

### 1. Download the Project
```bash
git clone https://github.com/Suprithsk/brain-image-data-manager.git
cd brain-image-data-manager
```

### 2. Install Everything You Need
Run this command to download all the required packages:
```bash
pnpm install
```

### 3. Start the Application
Run the app in development mode:
```bash
pnpm dev
```
After running this command, you'll see a message like "Local: http://localhost:5173". Open that link in your web browser to see the app.

### 4. Build for Production (Optional)
If you want to create a version ready for deployment:
```bash
pnpm build
```

## How to Use the Application

1. **Home Page**: Start by viewing the list of available datasets
2. **Filter Datasets**: Use the search bar and filter options to find specific datasets
3. **View Dataset Details**: Click on a dataset to see more information
4. **Browse Files**: Navigate to the files section to see available files
5. **Download Files**: Select files and click download to get them

## Project Structure

```
src/
├── components/       # Reusable pieces of the user interface
├── context/          # App-wide data management
├── pages/            # Different screens/pages of the app
├── apis/             # Code that talks to the server
├── App.jsx           # Main app component
└── main.jsx          # App starting point
```

## Available Commands

- `pnpm dev` - Start the app for development
- `pnpm build` - Create a production version
- `pnpm preview` - Preview the production version
- `pnpm lint` - Check code for issues

## Configuration

The app connects to a server to get data. The server address is set in the `.env` file:
```
VITE_API_BASE_URL='BACKEND_URL_HERE'
```

## Need Help?

If you're new to web development, here are some helpful resources:
- [React Basics](https://reactjs.org/tutorial/tutorial.html) - Learn the basics of React
- [pnpm Guide](https://pnpm.io/motivation) - Learn about the package manager we use

## Troubleshooting

**App won't start?**
- Make sure you ran `pnpm install` first
- Check that pnpm is installed correctly

**Can't see data?**
- Check your internet connection
- The server might be temporarily unavailable

---

For questions or issues, please create an issue on GitHub or contact the development team.
