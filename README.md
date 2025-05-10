# ASCII Flow Field

An interactive ASCII art visualization that combines weather data, time-based animations, and music-inspired color schemes. The project creates a dynamic 3D torus rendered in ASCII characters, with colors and patterns that respond to real-time weather conditions and time of day.

## Features

- **Dynamic ASCII Art**: A 3D torus rendered using ASCII characters with smooth animations and color transitions
- **Real-time Weather Integration**: Uses Open-Meteo API to display current weather conditions and temperature
- **Time-based Transitions**: Artwork and colors change based on time of day (dawn, day, dusk, night)
- **Music-inspired Themes**: Features artists like Beach House, Tycho, Slowdive, Cigarettes After Sex, and M83
- **Interactive Elements**: Mouse hover effects create dynamic dithering patterns
- **Responsive Design**: Adapts to any screen size while maintaining visual quality

## Technical Details

### Weather Integration
- Uses Open-Meteo API for real-time weather data
- Updates every 5 minutes
- Displays current temperature and weather conditions
- Weather affects the color scheme and patterns of the visualization

### Time-based Features
- Automatically detects time of day (dawn, day, dusk, night)
- Transitions between different visual states based on time
- Smooth color and pattern changes during transitions

### Artist Themes
Each artist has unique color schemes and patterns:
- **Beach House**: Dreamy, ethereal color palettes
- **Tycho**: Digital, geometric patterns
- **Slowdive**: Atmospheric, layered visuals
- **Cigarettes After Sex**: Intimate, cinematic moments
- **M83**: Cinematic, vibrant imagery

### Interactive Elements
- Mouse hover creates dynamic dithering effects
- Smooth transitions between states
- Responsive to user interaction

## Setup

1. Clone the repository
2. Open `index.html` in a modern web browser
3. No additional dependencies or setup required

## Browser Support

Works best in modern browsers that support:
- Canvas API
- ES6+ JavaScript features
- Fetch API

## Credits

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Inspired by ASCII art and generative design
- Music themes based on various artists' visual aesthetics

## License

MIT License - feel free to use and modify for your own projects. 