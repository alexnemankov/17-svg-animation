# SVG Animations Dashboard - Technical Description

This document provides an overview of the architecture, tech stack, and conventions used in this project to help developers understand, maintain, and scale the application.

## 1. Overview
The project is a React-based web application designed to host, display, and interact with multiple SVG-based animations. It features a central dashboard where users can select animations and a dedicated viewer that provides universal controls like panning, zooming, and UI toggling.

## 2. Tech Stack
- **Build Tool**: [Vite](https://vitejs.dev/) - Chosen for its extremely fast HMR (Hot Module Replacement) and optimized build process.
- **Framework**: [React 18](https://react.dev/) - For building encapsulated, reusable UI components.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - For strict type-checking and improved developer experience.
- **Routing**: [React Router v6](https://reactrouter.com/) - Handles client-side navigation between the dashboard and individual animation pages.
- **Icons**: [Lucide React](https://lucide.dev/) - Provides clean, customizable SVG icons.

## 3. Project Architecture

The source code (`src/`) is organized into logical directories based on functionality:

```text
src/
├── animations/         # Contains all individual SVG animations and the registry
│   ├── index.ts        # The central registry for all animations
│   ├── types.ts        # TypeScript interfaces for animations
│   └── [AnimationName]/# Folder for a specific animation (e.g., IsometricServers)
│       ├── index.tsx   # Exports the connected wrapper component
│       ├── Component.tsx# The pure SVG component
│       └── Controls.tsx# Specific UI controls for this animation
├── components/         # Reusable UI components
│   ├── AnimationCard.tsx   # Dashboard card component
│   └── AnimationViewer.tsx # HOC/Wrapper for pan, zoom, and UI toggle
├── pages/              # Top-level route components
│   ├── Dashboard.tsx   # The main landing page
│   └── AnimationPage.tsx # Dynamic route wrapper for rendering an animation
├── App.tsx             # Root component defining React Router routes
└── index.css           # Global CSS variables and styling
```

## 4. Key Components

### `AnimationViewer` (`src/components/AnimationViewer.tsx`)
This is the core engine for interacting with SVGs. It wraps the rendered animation and provides:
- **Pan & Transform**: Implemented via mouse drag events (`onMouseDown`, `onMouseMove`, `onMouseUp`) and direct X/Y numerical inputs in the UI controls. It translates the `X` and `Y` coordinates of the child container.
- **Zoom/Scale**: Implemented via wheel events and a UI range slider. It scales the child container.
- **UI Toggle**: A master visibility state (`showUI`) that hides/shows the global viewer controls (including the pan/zoom controls). It also passes `showUI` as a prop to its children so individual animations can hide their specific controls, allowing for a completely immersive, distraction-free view.

### The Animations Registry (`src/animations/index.ts`)
Instead of hardcoding routes for every animation, the app uses a registry pattern. 
Animations are defined using the `AnimationDefinition` interface and registered via `registerAnimation()`. 
The `Dashboard` dynamically maps over this registry to generate cards, and the `AnimationPage` uses the URL parameter (`id`) to retrieve and render the correct component from this registry.

## 5. How to Add a New Animation

To expand the application with a new animation, follow these steps:

1. **Create the Folder**: Create a new directory under `src/animations/` (e.g., `src/animations/MyNewAnimation`).
2. **Build the Component**: Create your React SVG component. If it requires interactivity, create a Wrapper component that manages state.
   ```tsx
   // src/animations/MyNewAnimation/index.tsx
   import React from 'react';

   export const MyNewAnimationWrapper: React.FC<{ showUI?: boolean }> = ({ showUI }) => {
     return (
       <>
         <svg>...</svg>
         {showUI && <div className="controls">...</div>}
       </>
     );
   };
   ```
3. **Register the Animation**: Open `src/animations/index.ts` and register it:
   ```ts
   import { MyNewAnimationWrapper } from './MyNewAnimation';

   registerAnimation({
     id: 'my-new-animation', // URL slug
     title: 'My Awesome Animation',
     description: 'A brief description of what this does.',
     component: MyNewAnimationWrapper,
    });
    ```
4. **Done!** The animation will automatically appear on the Dashboard and be routable.

## 6. Best Practices for Future Development

When building new animations, please adhere to the following conventions:

### States and Local UI
Animations should be built as interactive experiences. 
- Implement **different states** for your animation (e.g., "Auto Loop", "Locked", "Unlocked").
- Provide **custom UI controls** within the animation wrapper to toggle these states.
- **Always respect the `showUI` prop**. If `showUI` is false, hide all of your local animation controls to maintain the immersive experience.

### Background and Canvas Scaling
Because the `AnimationViewer` allows users to zoom out significantly or pan infinitely, animations must handle backgrounds gracefully so users don't see ugly "box" edges.
- **Avoid fixing background rects to the SVG's 1:1 viewbox**.
- Instead, apply backgrounds (like radial gradients) to a massive container div wrapping the SVG (e.g., `width: 10000px; height: 10000px;`).
- Crucially, apply `flex-shrink: 0;` to this massive container so that the global flex-based layout does not horizontally or vertically squish your background. This guarantees a seamless backdrop regardless of pan or zoom state.

### Greenscreen Mode
The `AnimationViewer` provides a built-in **Greenscreen Mode** (`#08fe0b` background) to allow users to key out the animation background in video editors. 
- The viewer achieves this by adding a `.greenscreen-mode` CSS class to the root wrapper.
- If your animation provides a custom background (like the `Padlock`'s radial gradient), you **must** write a CSS rule to hide your custom background when this class is active. For example:
  ```css
  .greenscreen-mode .my-custom-container {
      background: transparent !important;
  }
  ```

## 7. Available Scripts

- `npm run dev`: Starts the local development server (Vite).
- `npm run build`: Compiles TypeScript and builds the app for production into the `dist/` folder.
- `npm run preview`: Bootstraps a local static web server that serves the files from `dist/` to preview the production build locally.
