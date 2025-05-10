class AsciiRing {
    constructor() {
        this.canvas = document.getElementById('asciiCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        // ASCII characters for different intensities
        this.asciiChars = ' .,:;~*oO@';
        
        // Animation properties
        this.angle = 0;
        this.rotationSpeed = 0.01;
        this.gradientAngle = 0;
        this.gradientSpeed = 0.01;
        
        // Color animation properties
        this.colorTime = 0;
        this.colorSpeed = 0.003;
        this.waveSpeed = 0.015;
        this.waveAmplitude = 0.15;
        
        // Complex color interaction properties
        this.colorPatterns = {
            time1: 0,
            time2: 0,
            time3: 0,
            pattern1: 0,
            pattern2: 0,
            pattern3: 0
        };
        this.patternSpeeds = {
            time1: 0.002,
            time2: 0.0015,
            time3: 0.0025,
            pattern1: 0.0008,
            pattern2: 0.0012,
            pattern3: 0.001
        };
        
        // Color harmony properties
        this.baseHue = 0.6; // Blue base hue
        this.hueRange = 0.1; // Tighter hue range
        this.saturationRange = 0.2; // Tighter saturation range
        this.brightnessRange = 0.15; // Tighter brightness range
        
        // 3D properties
        this.torusRadius = 0.6;    // Major radius of the torus
        this.tubeRadius = 0.3;     // Minor radius of the torus (increased from 0.2)
        this.fov = 2;              // Field of view
        this.cameraDistance = 4;   // Camera distance
        
        // Weather and time properties
        this.weatherData = null;
        this.lastWeatherUpdate = 0;
        this.weatherUpdateInterval = 300000; // 5 minutes
        
        // Text overlay properties
        this.overlayFont = '14px monospace';
        this.overlayColor = 'rgba(200, 200, 200, 0.8)';
        this.location = 'New York, NY';
        this.title = 'Chromatic Atmospheres';
        
        // Mouse interaction properties
        this.mouseX = 0;
        this.mouseY = 0;
        this.isHovering = false;
        this.ditherIntensity = 0;
        this.ditherSpeed = 0.1;
        
        // Center text properties
        this.centerTextFont = '16px monospace';
        this.centerTextColor = 'rgba(255, 255, 255, 0.9)';
        this.centerTextShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        this.centerTextDepth = 0; // Depth of text in 3D space
        
        // Text transition properties
        this.transitionChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
        this.transitionDuration = 1500; // 1.5 seconds transition
        this.transitionStartTime = 0;
        this.isTransitioning = false;
        this.currentDisplayText = '';
        this.targetDisplayText = '';
        this.transitionProgress = 0;
        this.scrambleDelay = 100; // Delay between character updates
        
        // Add mouse event listeners
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseenter', () => this.isHovering = true);
        this.canvas.addEventListener('mouseleave', () => {
            this.isHovering = false;
            this.ditherIntensity = 0;
        });
        
        // Handle window resize
        window.addEventListener('resize', () => this.resize());
        
        // Initialize weather data immediately
        this.updateWeatherData();
        
        // Set up periodic weather updates (every 5 minutes)
        setInterval(() => {
            console.log('Updating weather data...');
            this.updateWeatherData();
        }, 300000); // 5 minutes
        
        // Painter cycling properties
        this.painters = [
            {
                name: "Beach House",
                artworks: {
                    night: {
                        name: "Dark Spring",
                        colors: { r: 0.1, g: 0.1, b: 0.2 },     // Deep blue
                        accent: { r: 0.8, g: 0.2, b: 0.8 }      // Purple
                    },
                    dawn: {
                        name: "Sunrise",
                        colors: { r: 0.9, g: 0.6, b: 0.2 },     // Orange
                        accent: { r: 0.9, g: 0.9, b: 0.9 }      // White
                    },
                    day: {
                        name: "Space Song",
                        colors: { r: 0.2, g: 0.2, b: 0.8 },     // Blue
                        accent: { r: 0.8, g: 0.8, b: 0.2 }      // Yellow
                    },
                    dusk: {
                        name: "Sunset",
                        colors: { r: 0.8, g: 0.4, b: 0.2 },     // Orange
                        accent: { r: 0.2, g: 0.2, b: 0.8 }      // Blue
                    },
                    rain: {
                        name: "Rain in Numbers",
                        colors: { r: 0.2, g: 0.2, b: 0.8 },     // Blue
                        accent: { r: 0.9, g: 0.9, b: 0.9 }      // White
                    }
                },
                style: {
                    saturation: 1.3,
                    contrast: 1.7,
                    brushStroke: 0.2
                }
            },
            {
                name: "Tycho",
                artworks: {
                    night: {
                        name: "Night Sky",
                        colors: { r: 0.1, g: 0.1, b: 0.2 },     // Dark blue
                        accent: { r: 0.8, g: 0.8, b: 0.9 }      // Light blue
                    },
                    dawn: {
                        name: "Awake",
                        colors: { r: 0.2, g: 0.6, b: 0.8 },     // Light blue
                        accent: { r: 0.9, g: 0.9, b: 0.9 }      // White
                    },
                    day: {
                        name: "Sunrise Projector",
                        colors: { r: 0.9, g: 0.6, b: 0.2 },     // Orange
                        accent: { r: 0.2, g: 0.2, b: 0.8 }      // Blue
                    },
                    dusk: {
                        name: "Dive",
                        colors: { r: 0.2, g: 0.2, b: 0.8 },     // Blue
                        accent: { r: 0.8, g: 0.4, b: 0.2 }      // Orange
                    },
                    rain: {
                        name: "Cloud Generator",
                        colors: { r: 0.3, g: 0.3, b: 0.3 },     // Gray
                        accent: { r: 0.9, g: 0.9, b: 0.9 }      // White
                    }
                },
                style: {
                    saturation: 1.4,
                    contrast: 1.8,
                    brushStroke: 0.25
                }
            },
            {
                name: "Slowdive",
                artworks: {
                    night: {
                        name: "Star Roving",
                        colors: { r: 0.1, g: 0.1, b: 0.2 },     // Dark blue
                        accent: { r: 0.9, g: 0.9, b: 0.9 }      // White
                    },
                    dawn: {
                        name: "Morningrise",
                        colors: { r: 0.9, g: 0.8, b: 0.8 },     // Pink
                        accent: { r: 0.2, g: 0.2, b: 0.8 }      // Blue
                    },
                    day: {
                        name: "Sugar for the Pill",
                        colors: { r: 0.9, g: 0.9, b: 0.9 },     // White
                        accent: { r: 0.8, g: 0.2, b: 0.8 }      // Purple
                    },
                    dusk: {
                        name: "No Longer Making Time",
                        colors: { r: 0.8, g: 0.4, b: 0.2 },     // Orange
                        accent: { r: 0.2, g: 0.2, b: 0.8 }      // Blue
                    },
                    rain: {
                        name: "When the Sun Hits",
                        colors: { r: 0.2, g: 0.2, b: 0.8 },     // Blue
                        accent: { r: 0.9, g: 0.6, b: 0.2 }      // Orange
                    }
                },
                style: {
                    saturation: 1.2,
                    contrast: 1.6,
                    brushStroke: 0.15
                }
            },
            {
                name: "Cigarettes After Sex",
                artworks: {
                    night: {
                        name: "Apocalypse",
                        colors: { r: 0.1, g: 0.1, b: 0.1 },     // Black
                        accent: { r: 0.8, g: 0.8, b: 0.9 }      // Light blue
                    },
                    dawn: {
                        name: "Sunsetz",
                        colors: { r: 0.8, g: 0.4, b: 0.2 },     // Orange
                        accent: { r: 0.2, g: 0.2, b: 0.8 }      // Blue
                    },
                    day: {
                        name: "Sweet",
                        colors: { r: 0.9, g: 0.9, b: 0.9 },     // White
                        accent: { r: 0.8, g: 0.2, b: 0.8 }      // Purple
                    },
                    dusk: {
                        name: "Heavenly",
                        colors: { r: 0.2, g: 0.2, b: 0.8 },     // Blue
                        accent: { r: 0.9, g: 0.9, b: 0.9 }      // White
                    },
                    rain: {
                        name: "Cry",
                        colors: { r: 0.2, g: 0.2, b: 0.8 },     // Blue
                        accent: { r: 0.9, g: 0.9, b: 0.9 }      // White
                    }
                },
                style: {
                    saturation: 1.1,
                    contrast: 1.5,
                    brushStroke: 0.1
                }
            },
            {
                name: "M83",
                artworks: {
                    night: {
                        name: "Midnight City",
                        colors: { r: 0.1, g: 0.1, b: 0.2 },     // Dark blue
                        accent: { r: 0.8, g: 0.2, b: 0.8 }      // Purple
                    },
                    dawn: {
                        name: "Wait",
                        colors: { r: 0.9, g: 0.8, b: 0.8 },     // Pink
                        accent: { r: 0.2, g: 0.2, b: 0.8 }      // Blue
                    },
                    day: {
                        name: "Outro",
                        colors: { r: 0.2, g: 0.2, b: 0.8 },     // Blue
                        accent: { r: 0.9, g: 0.9, b: 0.9 }      // White
                    },
                    dusk: {
                        name: "Moonchild",
                        colors: { r: 0.8, g: 0.2, b: 0.8 },     // Purple
                        accent: { r: 0.2, g: 0.2, b: 0.8 }      // Blue
                    },
                    rain: {
                        name: "Hurry Up, We're Dreaming",
                        colors: { r: 0.2, g: 0.2, b: 0.8 },     // Blue
                        accent: { r: 0.9, g: 0.9, b: 0.9 }      // White
                    }
                },
                style: {
                    saturation: 1.5,
                    contrast: 1.9,
                    brushStroke: 0.3
                }
            }
        ];
        this.currentPainterIndex = 0;
        this.painterChangeInterval = 5000; // 5 seconds
        this.lastPainterChange = Date.now(); // Initialize with current time
        this.currentArtwork = null; // Add tracking for current artwork
        
        // Add weather description properties
        this.weatherDescriptions = {
            "Beach House": {
                night: "City lights blur into constellations, carrying whispers of distant memories.",
                dawn: "First rays paint the sky in pastel hues, a gentle awakening.",
                day: "Sunlight dances through the atmosphere, softening reality.",
                dusk: "The horizon burns with the last embers of daylight.",
                rain: "Raindrops trace patterns on windows, a melancholic symphony."
            },
            "Tycho": {
                night: "Stars pulse with electronic dreams across the infinite canvas.",
                dawn: "Morning light breaks through, painting digital gradients.",
                day: "Geometric patterns of light and shadow dance across surfaces.",
                dusk: "The day dissolves into pixels of color and warmth.",
                rain: "Clouds form and disperse like data streams in the sky."
            },
            "Slowdive": {
                night: "Stars shimmer through layers of atmosphere like a warm blanket.",
                dawn: "Morning mist hangs between reality and memory.",
                day: "Sunlight diffuses through the haze, softening the world.",
                dusk: "Time stretches and compresses in the fading light.",
                rain: "A wall of sound echoes through the streets."
            },
            "Cigarettes After Sex": {
                night: "The night air carries the weight of unspoken words.",
                dawn: "Morning arrives in slow motion, moments suspended.",
                day: "Long shadows of memory stretch across the ground.",
                dusk: "Reality and fantasy blur in the fading light.",
                rain: "Each drop a fragment of forgotten moments."
            },
            "M83": {
                night: "Neon dreams pulse through the urban constellation.",
                dawn: "Morning breaks like a cinematic sequence.",
                day: "Vibrant hues paint the world in light and shadow.",
                dusk: "Time stands still in the dreamy montage.",
                rain: "Each drop a note in nature's composition."
            }
        };
        
        // Start animation
        this.animate();
    }
    
    async updateWeatherData() {
        try {
            // Using Open-Meteo API (free, no API key required)
            const latitude = 40.7128;  // New York coordinates
            const longitude = -74.0060;
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph`;
            
            console.log('Fetching weather data from:', url);
            const response = await fetch(url);
            const data = await response.json();
            console.log('Raw weather data:', data);
            
            // Weather code to condition mapping
            const weatherConditions = {
                0: 'clear',
                1: 'mostly clear',
                2: 'partly cloudy',
                3: 'overcast',
                45: 'foggy',
                48: 'foggy',
                51: 'light drizzle',
                53: 'moderate drizzle',
                55: 'dense drizzle',
                61: 'slight rain',
                63: 'moderate rain',
                65: 'heavy rain',
                71: 'slight snow',
                73: 'moderate snow',
                75: 'heavy snow',
                77: 'snow grains',
                80: 'slight rain showers',
                81: 'moderate rain showers',
                82: 'violent rain showers',
                85: 'slight snow showers',
                86: 'heavy snow showers',
                95: 'thunderstorm',
                96: 'thunderstorm with slight hail',
                99: 'thunderstorm with heavy hail'
            };
            
            // Extract current conditions
            const currentConditions = {
                temperature: Math.round(data.current.temperature_2m),
                weather: weatherConditions[data.current.weather_code] || 'unknown',
                humidity: Math.round(data.current.relative_humidity_2m),
                windSpeed: Math.round(data.current.wind_speed_10m),
                time: new Date().toISOString()
            };
            
            this.weatherData = currentConditions;
            this.lastWeatherUpdate = Date.now();
            
            console.log('Processed weather data:', currentConditions);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // Fallback to time-based only if weather fetch fails
            this.weatherData = { 
                weather: 'unknown',
                temperature: '--',
                humidity: '--',
                windSpeed: '--'
            };
        }
    }
    
    getScrambledText(text, progress) {
        if (!text) return '';
        
        const result = [];
        const scrambleThreshold = 0.7; // When to start revealing new text
        const charCount = Math.max(text.length, this.targetDisplayText.length);
        const startPos = Math.floor((this.canvas.width - charCount * 8) / 2); // Approximate character width
        
        // Calculate the center position of the current text
        const currentCenter = Math.floor(text.length / 2);
        const targetCenter = Math.floor(this.targetDisplayText.length / 2);
        const centerOffset = targetCenter - currentCenter;
        
        for (let i = 0; i < charCount; i++) {
            const adjustedIndex = i - Math.floor(centerOffset * progress);
            const charProgress = (progress * charCount) - i;
            
            if (progress < scrambleThreshold) {
                // Scrambling phase
                if (charProgress > 0 && charProgress < 1) {
                    // This character is currently scrambling
                    if (Math.random() > charProgress) {
                        result.push(this.transitionChars[Math.floor(Math.random() * this.transitionChars.length)]);
                    } else if (adjustedIndex >= 0 && adjustedIndex < text.length) {
                        result.push(text[adjustedIndex]);
                    } else {
                        result.push(' ');
                    }
                } else if (charProgress >= 1) {
                    // This character is fully scrambled
                    result.push(this.transitionChars[Math.floor(Math.random() * this.transitionChars.length)]);
                } else if (adjustedIndex >= 0 && adjustedIndex < text.length) {
                    // This character hasn't started scrambling yet
                    result.push(text[adjustedIndex]);
                } else {
                    result.push(' ');
                }
            } else {
                // Revealing phase
                const revealProgress = (progress - scrambleThreshold) / (1 - scrambleThreshold);
                const charRevealProgress = (revealProgress * charCount) - i;
                
                if (charRevealProgress > 0 && charRevealProgress < 1) {
                    // This character is currently revealing
                    if (Math.random() > charRevealProgress) {
                        result.push(this.transitionChars[Math.floor(Math.random() * this.transitionChars.length)]);
                    } else if (i < this.targetDisplayText.length) {
                        result.push(this.targetDisplayText[i]);
                    } else {
                        result.push(' ');
                    }
                } else if (charRevealProgress >= 1) {
                    // This character is fully revealed
                    if (i < this.targetDisplayText.length) {
                        result.push(this.targetDisplayText[i]);
                    } else {
                        result.push(' ');
                    }
                } else {
                    // This character hasn't started revealing yet
                    result.push(this.transitionChars[Math.floor(Math.random() * this.transitionChars.length)]);
                }
            }
        }
        
        return result.join('');
    }
    
    updateTransition() {
        if (!this.isTransitioning) return;
        
        const now = Date.now();
        const elapsed = now - this.transitionStartTime;
        
        // Add delay between updates for smoother animation
        if (elapsed - this.lastUpdateTime < this.scrambleDelay) {
            return;
        }
        this.lastUpdateTime = elapsed;
        
        this.transitionProgress = Math.min(1, elapsed / this.transitionDuration);
        
        if (this.transitionProgress >= 1) {
            this.isTransitioning = false;
            this.currentDisplayText = this.targetDisplayText;
        }
    }
    
    startTransition(newText) {
        if (this.isTransitioning) return;
        
        this.currentDisplayText = this.targetDisplayText || newText;
        this.targetDisplayText = newText;
        this.transitionStartTime = Date.now();
        this.lastUpdateTime = 0;
        this.transitionProgress = 0;
        this.isTransitioning = true;
    }
    
    updatePainter() {
        const now = Date.now();
        if (now - this.lastPainterChange > this.painterChangeInterval) {
            this.currentPainterIndex = (this.currentPainterIndex + 1) % this.painters.length;
            this.lastPainterChange = now;
            this.currentArtwork = this.getCurrentArtwork();
            
            // Start transition with new painter and artwork
            const newText = `${this.getCurrentPainter().name} - ${this.currentArtwork.name}`;
            this.startTransition(newText);
            
            console.log('Painter changed to:', this.painters[this.currentPainterIndex].name);
            console.log('Artwork changed to:', this.currentArtwork.name);
        }
    }
    
    getCurrentPainter() {
        return this.painters[this.currentPainterIndex];
    }
    
    getCurrentArtwork() {
        const painter = this.getCurrentPainter();
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const timeOfDay = hour + minute / 60;
        
        // Define time periods (in hours)
        const sunrise = 6.5;  // 6:30 AM
        const sunset = 19.5;  // 7:30 PM
        const dawn = sunrise - 1;
        const dusk = sunset + 1;
        
        let timeKey;
        if (timeOfDay >= dawn && timeOfDay < sunrise) {
            timeKey = 'dawn';
        } else if (timeOfDay >= sunrise && timeOfDay < sunset) {
            timeKey = 'day';
        } else if (timeOfDay >= sunset && timeOfDay < dusk) {
            timeKey = 'dusk';
        } else {
            timeKey = 'night';
        }
        
        // Override with weather if significant
        if (this.weatherData && this.weatherData.weather) {
            const weather = this.weatherData.weather.toLowerCase();
            if (weather.includes('rain') || weather.includes('shower')) {
                timeKey = 'rain';
            }
        }
        
        return painter.artworks[timeKey];
    }
    
    getTimeBasedColor() {
        const artwork = this.getCurrentArtwork();
        return artwork.colors;
    }
    
    getWeatherModifier() {
        if (!this.weatherData || this.weatherData.weather === 'unknown') {
            return { r: 1, g: 1, b: 1 };
        }
        
        const weather = this.weatherData.weather;
        const temp = this.weatherData.temperature;
        
        // Weather condition modifiers - adjusted for better contrast
        const modifiers = {
            clear: { r: 1.2, g: 1.2, b: 1.1 },    // Brighter
            sunny: { r: 1.2, g: 1.2, b: 1.1 },    // Brighter
            cloudy: { r: 0.9, g: 0.9, b: 1.0 },   // Less gray
            rain: { r: 0.8, g: 0.8, b: 1.1 },     // More blue
            snow: { r: 1.0, g: 1.0, b: 1.1 },     // Brighter blue-white
            thunderstorm: { r: 0.7, g: 0.7, b: 0.9 }, // Less dark
            fog: { r: 0.95, g: 0.95, b: 1.0 },    // Less gray
            haze: { r: 1.0, g: 0.95, b: 0.9 }     // Less gray
        };
        
        // Find the closest matching weather condition
        let bestMatch = { r: 1, g: 1, b: 1 };
        
        for (const [condition, modifier] of Object.entries(modifiers)) {
            if (weather.includes(condition)) {
                bestMatch = modifier;
                break;
            }
        }
        
        // Temperature adjustment - adjusted for better contrast
        const tempModifier = temp < 32 ? 0.95 : (temp > 80 ? 1.15 : 1.05);
        
        return {
            r: bestMatch.r * tempModifier,
            g: bestMatch.g * tempModifier,
            b: bestMatch.b * tempModifier
        };
    }
    
    getComplexColorPattern(x, y, z, angle) {
        // Update pattern times
        this.colorPatterns.time1 += this.patternSpeeds.time1;
        this.colorPatterns.time2 += this.patternSpeeds.time2;
        this.colorPatterns.time3 += this.patternSpeeds.time3;
        this.colorPatterns.pattern1 += this.patternSpeeds.pattern1;
        this.colorPatterns.pattern2 += this.patternSpeeds.pattern2;
        this.colorPatterns.pattern3 += this.patternSpeeds.pattern3;
        
        // Create more subtle wave patterns
        const pattern1 = Math.sin(x * 1.5 + this.colorPatterns.time1) * 
                        Math.cos(y * 2 + this.colorPatterns.pattern1) * 
                        Math.sin(z * 2.5 + this.colorPatterns.time2);
        
        const pattern2 = Math.cos(x * 2 + this.colorPatterns.time2) * 
                        Math.sin(y * 2.5 + this.colorPatterns.pattern2) * 
                        Math.cos(z * 1.5 + this.colorPatterns.time3);
        
        const pattern3 = Math.sin(x * 2.5 + this.colorPatterns.time3) * 
                        Math.cos(y * 1.5 + this.colorPatterns.pattern3) * 
                        Math.sin(z * 2 + this.colorPatterns.time1);
        
        // Combine patterns with more balanced weights
        return (pattern1 * 0.35 + pattern2 * 0.35 + pattern3 * 0.3) * this.waveAmplitude;
    }
    
    getAnimatedColor(angle, depth) {
        const painter = this.getCurrentPainter();
        const artwork = this.getCurrentArtwork();
        const baseColor = artwork.colors;
        const accentColor = artwork.accent;
        
        // Create painter-specific wave patterns with increased intensity
        const wave1 = Math.sin(this.colorTime + angle * 1.5) * painter.style.brushStroke * 1.5;
        const wave2 = Math.cos(this.colorTime * 1.2 + angle * 2) * painter.style.brushStroke * 1.5;
        const wave3 = Math.sin(this.colorTime * 0.9 + angle * 2.5) * painter.style.brushStroke * 1.5;
        
        // Calculate 3D position for complex patterns
        const x = Math.cos(angle) * this.torusRadius;
        const y = Math.sin(angle) * this.torusRadius;
        const z = depth;
        
        // Get complex color pattern with increased intensity
        const complexPattern = this.getComplexColorPattern(x, y, z, angle) * 1.5;
        
        // Combine waves with depth and complex patterns
        const depthFactor = (depth + this.cameraDistance) / (2 * this.cameraDistance);
        const combinedWave = (wave1 + wave2 + wave3 + complexPattern) * (0.6 + depthFactor * 0.6);
        
        // Mix base and accent colors based on pattern
        const patternMix = (Math.sin(angle * 2 + this.colorTime) + 1) / 2;
        
        // Create painter-specific color variations with expanded range
        const r = Math.max(0.1, Math.min(0.9, 
            (baseColor.r * (1 - patternMix) + accentColor.r * patternMix) * (1 + combinedWave * painter.style.contrast)));
        const g = Math.max(0.1, Math.min(0.9, 
            (baseColor.g * (1 - patternMix) + accentColor.g * patternMix) * (1 + combinedWave * painter.style.contrast)));
        const b = Math.max(0.1, Math.min(0.9, 
            (baseColor.b * (1 - patternMix) + accentColor.b * patternMix) * (1 + combinedWave * painter.style.contrast)));
        
        // Add painter-specific hue shifts with increased intensity
        const hueShift1 = Math.sin(this.colorTime * 0.4) * 0.08 * painter.style.saturation;
        const hueShift2 = Math.cos(this.colorTime * 0.3) * 0.07 * painter.style.saturation;
        const hueShift3 = Math.sin(this.colorTime * 0.5) * 0.09 * painter.style.saturation;
        
        // Combine hue shifts with complex patterns
        const finalR = r + hueShift1 + complexPattern * 0.25;
        const finalG = g + hueShift2 + complexPattern * 0.22;
        const finalB = b + hueShift3 + complexPattern * 0.28;
        
        // Add enhanced color bleeding between channels
        const bleed = 0.12 * painter.style.saturation;
        const finalColor = {
            r: finalR + (finalG + finalB) * bleed,
            g: finalG + (finalR + finalB) * bleed,
            b: finalB + (finalR + finalG) * bleed
        };
        
        // Ensure colors stay within a harmonious range with increased contrast
        const maxDiff = 0.3 * painter.style.contrast;
        const avg = (finalColor.r + finalColor.g + finalColor.b) / 3;
        finalColor.r = avg + (finalColor.r - avg) * maxDiff;
        finalColor.g = avg + (finalColor.g - avg) * maxDiff;
        finalColor.b = avg + (finalColor.b - avg) * maxDiff;
        
        // Ensure minimum brightness and contrast
        const minBrightness = 0.3; // Minimum brightness threshold
        const brightness = (finalColor.r + finalColor.g + finalColor.b) / 3;
        
        if (brightness < minBrightness) {
            const scale = minBrightness / brightness;
            finalColor.r = Math.min(0.9, finalColor.r * scale);
            finalColor.g = Math.min(0.9, finalColor.g * scale);
            finalColor.b = Math.min(0.9, finalColor.b * scale);
        }
        
        // Ensure minimum contrast with background
        const backgroundBrightness = 0.1; // Background is #1a1a1a
        const contrastRatio = Math.abs(brightness - backgroundBrightness);
        const minContrast = 0.2; // Minimum contrast threshold
        
        if (contrastRatio < minContrast) {
            const adjustment = (minContrast - contrastRatio) * (brightness > backgroundBrightness ? 1 : -1);
            finalColor.r = Math.max(0.1, Math.min(0.9, finalColor.r + adjustment));
            finalColor.g = Math.max(0.1, Math.min(0.9, finalColor.g + adjustment));
            finalColor.b = Math.max(0.1, Math.min(0.9, finalColor.b + adjustment));
        }
        
        return `rgb(${Math.round(finalColor.r * 255)}, ${Math.round(finalColor.g * 255)}, ${Math.round(finalColor.b * 255)})`;
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Check if we're on mobile
        const isMobile = this.canvas.width < 768;
        
        // Calculate grid size based on screen size with mobile adjustment
        if (isMobile) {
            // On mobile, use a larger divisor to make the grid bigger
            this.gridSize = Math.floor(Math.min(this.canvas.width, this.canvas.height) / 40);
        } else {
            // Desktop remains the same
            this.gridSize = Math.floor(Math.min(this.canvas.width, this.canvas.height) / 60);
        }
        
        this.cols = Math.floor(this.canvas.width / this.gridSize);
        this.rows = Math.floor(this.canvas.height / this.gridSize);
        
        // Calculate aspect ratio
        this.aspectRatio = this.cols / this.rows;
        
        // Adjust torus size based on screen size
        if (isMobile) {
            // On mobile, make the torus proportionally larger
            this.torusRadius = 0.7;    // Increased from 0.6
            this.tubeRadius = 0.35;    // Increased from 0.3
            this.fov = 2.2;            // Increased from 2
            this.cameraDistance = 3.8; // Decreased from 4
        } else {
            // Desktop - slightly smaller
            this.torusRadius = 0.55;   // Decreased from 0.6
            this.tubeRadius = 0.28;    // Decreased from 0.3
            this.fov = 1.9;            // Decreased from 2
            this.cameraDistance = 4.2; // Increased from 4
        }
    }
    
    project3DTo2D(x, y, z) {
        // Apply perspective projection with aspect ratio correction
        const scale = this.fov / (this.cameraDistance + z);
        const projectedX = x * scale;
        const projectedY = y * scale;
        
        // Convert to screen coordinates with aspect ratio correction
        const screenX = (projectedX + 1) * this.cols / 2;
        const screenY = (projectedY + 1) * this.rows / 2;
        
        return { x: screenX, y: screenY, scale };
    }
    
    rotatePoint(x, y, z) {
        // Rotate only around Y axis (vertical)
        const cosY = Math.cos(this.angle);
        const sinY = Math.sin(this.angle);
        
        // Keep y coordinate unchanged to prevent wobble
        return {
            x: x * cosY - z * sinY,
            y: y,  // Keep y unchanged
            z: x * sinY + z * cosY
        };
    }
    
    wrapText(text, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = this.ctx.measureText(currentLine + " " + word).width;
            
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }
    
    drawOverlay() {
        this.ctx.font = this.overlayFont;
        this.ctx.fillStyle = this.overlayColor;
        
        // Get current time in military format
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        // Format date
        const dateString = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Draw text with padding
        const padding = 20;
        const lineHeight = 20;
        
        // Check if we're on mobile (width less than 768px)
        const isMobile = this.canvas.width < 768;
        
        if (isMobile) {
            // Mobile layout - stack everything vertically on the left
            this.ctx.textAlign = 'left';
            this.ctx.font = this.overlayFont;
            this.ctx.fillStyle = 'rgba(220, 220, 220, 0.9)';
            
            // Draw location
            this.ctx.fillText(this.location, padding, padding + lineHeight);
            
            // Draw weather information
            if (this.weatherData) {
                // Weather condition and temperature
                const weatherText = `${this.weatherData.weather} • ${this.weatherData.temperature}°F`;
                this.ctx.fillText(weatherText, padding, padding + lineHeight * 2);
                
                // Date and time
                this.ctx.fillText(`${dateString} ${timeString}`, padding, padding + lineHeight * 3);
            } else {
                // Draw date and time if weather data is unavailable
                this.ctx.fillText(`${dateString} ${timeString}`, padding, padding + lineHeight * 2);
            }
            
            // Draw artist and artwork info below
            this.ctx.font = 'bold 14px monospace';
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            
            // Update transition if active
            this.updateTransition();
            
            // Get the current display text (either transitioning or static)
            const displayText = this.isTransitioning 
                ? this.getScrambledText(this.currentDisplayText, this.transitionProgress)
                : this.currentDisplayText;
            
            // Position the text below the weather info
            const artistY = this.weatherData ? padding + lineHeight * 4 : padding + lineHeight * 3;
            this.ctx.fillText(displayText, padding, artistY);
            
            // Add poetic description
            const currentPainter = this.getCurrentPainter();
            const timeKey = this.getCurrentTimeKey();
            const description = this.weatherDescriptions[currentPainter.name][timeKey];
            
            // Draw description with slightly smaller font and reduced opacity
            this.ctx.font = '12px monospace';
            this.ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
            
            // Wrap description text for mobile
            const maxWidth = this.canvas.width - (padding * 2);
            const wrappedLines = this.wrapText(description, maxWidth);
            
            // Draw each line of the wrapped description
            wrappedLines.forEach((line, index) => {
                this.ctx.fillText(line, padding, artistY + lineHeight + (index * lineHeight));
            });
        } else {
            // Desktop layout - left and right side text
            // Left side text (date, time, location, weather)
            this.ctx.textAlign = 'left';
            this.ctx.font = this.overlayFont;
            this.ctx.fillStyle = 'rgba(220, 220, 220, 0.9)';
            
            // Draw location
            this.ctx.fillText(this.location, padding, padding + lineHeight);
            
            // Draw weather information
            if (this.weatherData) {
                // Weather condition and temperature
                const weatherText = `${this.weatherData.weather} • ${this.weatherData.temperature}°F`;
                this.ctx.fillText(weatherText, padding, padding + lineHeight * 2);
                
                // Date and time
                this.ctx.fillText(`${dateString} ${timeString}`, padding, padding + lineHeight * 3);
            } else {
                // Draw date and time if weather data is unavailable
                this.ctx.fillText(`${dateString} ${timeString}`, padding, padding + lineHeight * 2);
            }
            
            // Right side text (artist and artwork)
            this.ctx.textAlign = 'right';
            this.ctx.font = 'bold 14px monospace';
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            
            // Update transition if active
            this.updateTransition();
            
            // Get the current display text (either transitioning or static)
            const displayText = this.isTransitioning 
                ? this.getScrambledText(this.currentDisplayText, this.transitionProgress)
                : this.currentDisplayText;
            
            // Position the text on the right side with fixed padding
            this.ctx.fillText(displayText, this.canvas.width - padding, padding + lineHeight);
            
            // Add poetic description
            const currentPainter = this.getCurrentPainter();
            const timeKey = this.getCurrentTimeKey();
            const description = this.weatherDescriptions[currentPainter.name][timeKey];
            
            // Draw description with slightly smaller font and reduced opacity
            this.ctx.font = '12px monospace';
            this.ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
            
            // Wrap description text for desktop
            const maxWidth = this.canvas.width / 2 - padding;
            const wrappedLines = this.wrapText(description, maxWidth);
            
            // Draw each line of the wrapped description
            wrappedLines.forEach((line, index) => {
                this.ctx.fillText(line, this.canvas.width - padding, padding + lineHeight * 2 + (index * lineHeight));
            });
        }
        
        // Reset font, color, and alignment
        this.ctx.font = this.overlayFont;
        this.ctx.fillStyle = this.overlayColor;
        this.ctx.textAlign = 'left';
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = (e.clientX - rect.left) / this.canvas.width;
        this.mouseY = (e.clientY - rect.top) / this.canvas.height;
    }
    
    getDitherPattern(x, y, time) {
        if (!this.isHovering) return 0;
        
        // Calculate distance from mouse position
        const dx = x - this.mouseX;
        const dy = y - this.mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Create dithering effect based on distance and time
        const dither = Math.sin(time * 10 + distance * 20) * 
                      Math.cos(time * 8 + distance * 15) * 
                      Math.sin(time * 6 + distance * 10);
        
        // Smooth falloff based on distance
        const falloff = Math.max(0, 1 - distance * 3);
        
        return dither * falloff * this.ditherIntensity;
    }
    
    draw() {
        console.log("Starting draw frame");
        
        // Update weather data if needed
        if (Date.now() - this.lastWeatherUpdate > this.weatherUpdateInterval) {
            this.updateWeatherData();
        }
        
        // Update dither intensity
        if (this.isHovering) {
            this.ditherIntensity = Math.min(1, this.ditherIntensity + this.ditherSpeed);
        } else {
            this.ditherIntensity = Math.max(0, this.ditherIntensity - this.ditherSpeed);
        }
        
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Create buffers for depth sorting
        this.depthBuffer = new Array(this.cols * this.rows).fill(-Infinity);
        const charBuffer = new Array(this.cols * this.rows).fill(' ');
        const colorBuffer = new Array(this.cols * this.rows).fill('white');
        
        console.log("Canvas dimensions:", { 
            width: this.canvas.width, 
            height: this.canvas.height,
            cols: this.cols,
            rows: this.rows
        });
        
        // Draw ASCII torus with true 3D geometry
        const steps = 60; // Number of steps for torus generation
        
        // First pass: Draw outer surface
        for (let i = 0; i < steps; i++) {
            const theta = (i / steps) * Math.PI * 2;
            const cosTheta = Math.cos(theta);
            const sinTheta = Math.sin(theta);
            
            for (let j = 0; j < steps; j++) {
                const phi = (j / steps) * Math.PI * 2;
                const cosPhi = Math.cos(phi);
                const sinPhi = Math.sin(phi);
                
                // Calculate 3D point on torus with aspect ratio correction
                const x = (this.torusRadius + this.tubeRadius * cosPhi) * cosTheta;
                const y = (this.torusRadius + this.tubeRadius * cosPhi) * sinTheta * this.aspectRatio;
                const z = this.tubeRadius * sinPhi;
                
                // Rotate point
                const rotated = this.rotatePoint(x, y, z);
                
                // Project to 2D
                const projected = this.project3DTo2D(rotated.x, rotated.y, rotated.z);
                
                // Only draw if point is in front of camera and within reasonable bounds
                if (rotated.z > -this.cameraDistance * 0.8) {
                    const screenX = Math.floor(projected.x);
                    const screenY = Math.floor(projected.y);
                    
                    if (screenX >= 0 && screenX < this.cols && screenY >= 0 && screenY < this.rows) {
                        const index = screenY * this.cols + screenX;
                        const depth = rotated.z;
                        
                        // Only draw if this point is closer than what's already there
                        if (depth > this.depthBuffer[index]) {
                            this.depthBuffer[index] = depth;
                            
                            // Calculate brightness based on viewing angle and depth
                            const brightness = (cosPhi + 1) / 2 * (0.5 + 0.5 * (depth + this.cameraDistance) / (2 * this.cameraDistance));
                            
                            // Add dithering effect
                            const normalizedX = screenX / this.cols;
                            const normalizedY = screenY / this.rows;
                            const dither = this.getDitherPattern(normalizedX, normalizedY, this.colorTime);
                            const ditheredBrightness = Math.max(0, Math.min(1, brightness + dither));
                            
                            const charIndex = Math.floor(ditheredBrightness * (this.asciiChars.length - 1));
                            charBuffer[index] = this.asciiChars[charIndex];
                            
                            // Calculate animated color
                            colorBuffer[index] = this.getAnimatedColor(theta + this.gradientAngle, depth);
                        }
                    }
                }
            }
        }
        
        // Second pass: Draw inner surface with dithering
        for (let i = 0; i < steps; i++) {
            const theta = (i / steps) * Math.PI * 2;
            const cosTheta = Math.cos(theta);
            const sinTheta = Math.sin(theta);
            
            for (let j = 0; j < steps; j++) {
                const phi = (j / steps) * Math.PI * 2;
                const cosPhi = Math.cos(phi);
                const sinPhi = Math.sin(phi);
                
                // Calculate 3D point on inner surface of torus
                const x = (this.torusRadius - this.tubeRadius * cosPhi) * cosTheta;
                const y = (this.torusRadius - this.tubeRadius * cosPhi) * sinTheta * this.aspectRatio;
                const z = -this.tubeRadius * sinPhi; // Negative z for inner surface
                
                // Rotate point
                const rotated = this.rotatePoint(x, y, z);
                
                // Project to 2D
                const projected = this.project3DTo2D(rotated.x, rotated.y, rotated.z);
                
                // Only draw if point is in front of camera and within reasonable bounds
                if (rotated.z > -this.cameraDistance * 0.8) {
                    const screenX = Math.floor(projected.x);
                    const screenY = Math.floor(projected.y);
                    
                    if (screenX >= 0 && screenX < this.cols && screenY >= 0 && screenY < this.rows) {
                        const index = screenY * this.cols + screenX;
                        const depth = rotated.z;
                        
                        // Only draw if this point is closer than what's already there
                        if (depth > this.depthBuffer[index]) {
                            this.depthBuffer[index] = depth;
                            
                            // Calculate brightness based on viewing angle and depth
                            const brightness = (1 - cosPhi) / 2 * (0.4 + 0.4 * (depth + this.cameraDistance) / (2 * this.cameraDistance));
                            
                            // Add dithering effect
                            const normalizedX = screenX / this.cols;
                            const normalizedY = screenY / this.rows;
                            const dither = this.getDitherPattern(normalizedX, normalizedY, this.colorTime);
                            const ditheredBrightness = Math.max(0, Math.min(1, brightness + dither));
                            
                            const charIndex = Math.floor(ditheredBrightness * (this.asciiChars.length - 1));
                            charBuffer[index] = this.asciiChars[charIndex];
                            
                            // Calculate animated color
                            colorBuffer[index] = this.getAnimatedColor(theta + this.gradientAngle, depth);
                        }
                    }
                }
            }
        }
        
        // Draw the buffer
        this.ctx.font = `${this.gridSize}px monospace`;
        
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const index = y * this.cols + x;
                const char = charBuffer[index];
                this.ctx.fillStyle = colorBuffer[index];
                this.ctx.fillText(char, x * this.gridSize, y * this.gridSize);
            }
        }
        
        // Draw the overlay
        this.drawOverlay();
    }
    
    animate() {
        this.angle += this.rotationSpeed;
        this.gradientAngle += this.gradientSpeed;
        this.colorTime += this.colorSpeed;
        
        // Force a painter update check every frame
        this.updatePainter();
        
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    getCurrentTimeKey() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const timeOfDay = hour + minute / 60;
        
        // Define time periods (in hours)
        const sunrise = 6.5;  // 6:30 AM
        const sunset = 19.5;  // 7:30 PM
        const dawn = sunrise - 1;
        const dusk = sunset + 1;
        
        if (timeOfDay >= dawn && timeOfDay < sunrise) {
            return 'dawn';
        } else if (timeOfDay >= sunrise && timeOfDay < sunset) {
            return 'day';
        } else if (timeOfDay >= sunset && timeOfDay < dusk) {
            return 'dusk';
        } else {
            return 'night';
        }
    }
}

// Initialize the ASCII ring when the page loads
window.addEventListener('load', () => {
    new AsciiRing();
}); 