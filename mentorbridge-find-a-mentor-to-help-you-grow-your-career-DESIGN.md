---
version: "neuform"
name: "MentorBridge — Find a mentor to help you grow your career"
description: "MentorBridge connects students and junior professionals in Central Asia with trusted mentors in IT, design, marketing, business, and English."
colors:
  primary: "#D8CEBE"
  secondary: "#D7CBBB"
  accent: "#DDD2C2"
  background: "#1F1B16"
  surface: "#847666"
  text-primary: "#F8F4ED"
  text-secondary: "#D7CBBB"
  border: "#6E7A67"
typography:
  display-lg:
    fontFamily: "Inter"
    fontSize: "64px"
    fontWeight: 500
    lineHeight: "1.04"
    letterSpacing: "0"
  body-md:
    fontFamily: "BlinkMacSystemFont"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.6"
  label-md:
    fontFamily: "JetBrains Mono"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "1.2"
spacing:
  base: "8px"
  gap: "16px"
  card-padding: "24px"
  section-padding: "80px"
rounded:
  card: "8px"
  pill: "9999px"
---

# MentorBridge — Find a mentor to help you grow your career

Source: Neuform Trending templates. Views: 436; favorites: 23; remixes: 13.

## Overview
MentorBridge is built on a "Warm Professionalism" logic, balancing high-end career marketplace utility with a grounded, organic aesthetic. The visual mood is defined by a soft, earthy palette and a sense of architectural structure, conveying both trust and accessibility. The composition uses a centralized, constrained container (max-w-7xl) that feels intentional and anchored, while subtle depth cues and fine-line geometry maintain a premium, boutique feel.

## Colors
The system relies on a warm, neutral base derived from paper-toned whites and deep, earthy accents:
- **Surfaces:** Use `#f5efe6` as the primary background, with subtle variations like `#fbf6f0` or `#fcf8f1` for component cards to create depth through contrast.
- **Brand Accents:** Earth tones drive the identity: deep moss green (`#2e3a2f`) and rich mahogany brown (`#5c3822`) are used for primary buttons and high-contrast UI elements.
- **Text & Grays:** Body text is anchored in `#1f1b16`, with secondary labels and supporting text appearing in `#7e7365` or `#61564a`.
- **Highlights:** Surface overlays use low-opacity white (`rgba(255,255,255,0.48)`) and soft borders (`#d7cbbb`) to create a "glass-paper" aesthetic.

## Typography
The system utilizes a clean, sans-serif stack (Inter, system-ui) optimized for legibility and modern technical feel.
- **Display:** Used for hero headlines; characterized by tight tracking and bold weights to command attention.
- **Headline:** Clear, readable hierarchy using semi-bold weights for section headers, maintaining a balance between impact and a friendly, personal tone.
- **Body:** Standardized at 14-16px, favoring neutral line heights (1.75) for long-form comfort.
- **Label:** Small caps or subtle uppercase stylings with wide letter-spacing (`tracking-[0.18em]`) provide a functional, structured metadata feel for categories and breadcrumbs.

## Layout
The grid logic follows a "centered-canvas" approach within a 7xl max-width, maintaining a rigid but airy rhythm:
- **Grid Rhythm:** Sections are partitioned with significant vertical padding (12-20 rem), ensuring clarity and focus. 
- **Content Framing:** The system uses fixed side-bars (in `lg` viewports) with 1px border lines to act as "guide rails," emphasizing the verticality of the scroll.
- **Card Padding:** Inner card spacing is generous (1.5rem to 2rem), fostering a sense of quality and unhurried browsing.

## Elevation & Depth
Depth is created through a "stratified glass" technique rather than standard drop shadows:
- **Surface Recipe:** Use `linear-gradient` backgrounds to simulate light hitting paper, combined with subtle border-lines (`#d8cebe`) to define edges.
- **Blur:** Backdrop-blur (`backdrop-blur-xl`) is applied to fixed elements like headers, grounding the UI in a transient, elevated state above the page content.
- **Internal Shadows:** Use subtle inset border-lines (`inset 0 1px 0 rgba(255,255,255,0.75)`) to give buttons and primary cards a refined, tactile quality.

## Shapes
The shape language focuses on organic, soft-cornered geometry to contrast with professional content:
- **Corner Radius:** Utilize `rounded-[2rem]` for major container blocks and `rounded-[1.75rem]` for secondary article blocks, creating a consistent, friendly silhouette.
- **Silhouette:** Icons and badges use smaller, tight radiuses (`rounded-xl` or `rounded-2xl`) to maintain a sense of precision.
- **Geometry:** Avoid sharp 90-degree corners; the system favors "squircle-like" rounding throughout the component library.

## Components
- **Cards:** Defined by a specific border-gradient and soft background transparency, used to package mentor profiles and features.
- **Buttons:** Use dual-state styling: primary actions employ a dark, two-tone linear gradient, while secondary actions use light-tinted backgrounds with subtle borders.
- **Navigation Chips/Badges:** Small, pill-shaped tags with border-color accents highlight categories; they should be sparse and intentional.
- **Overlays/Details:** Interactive elements (FAQ) use a simple group-open pattern, favoring clear typography over complex transition states.

## Do's and Don'ts
- **Do** maintain the specific "paper-tone" background logic (`#f5efe6`) across all surface modules.
- **Do** ensure that all interactive surfaces (cards, buttons) include the defined sub-pixel border logic to maintain depth.
- **Don't** use standard, high-contrast black (#000000) for text; always default to the brand-specific dark brown/black (`#1f1b16`).
- **Don't** use heavy drop shadows; rely on linear gradients and border-light interactions to simulate elevation.

## Motion
- **Entrance:** Use a "word-by-word" reveal sequence (y: 115% translate, 0.9s duration, power3.out) for all major headlines triggered by scroll.
- **Hover:** Interactions should feature subtle color shifts or opacity transitions, avoiding aggressive scale-ups or physical shifts.
- **Scrolling:** Implement smooth-scroll behavior across the document to maintain the "calm, transparent" navigation experience.
- **Stagger:** Stagger element animations by 0.045s for text nodes to create a rhythmic, fluid feeling.

## WebGL
- **Implementation:** The background relies on a `#bg-canvas` fixed-viewport element using a `webgl` context.
- **Effect:** A procedural scene rendering floating, rotating `sdOctahedron` primitives. The animation loop (`requestAnimationFrame`) uses `u_time` for dynamic rotation, noise-based drift, and pulse effects.
- **Render Loop:** Employs a fixed-point vertex array for full-screen coverage. Palette cycling is handled by `hueRotateSepia` logic to keep the canvas color-matched to the page’s earthy CSS palette.
- **Optimization:** Includes a `resize` handler to maintain `devicePixelRatio` density and proper view scaling, with an `alpha: true` flag to allow the canvas to blend with the underlying radial-gradient CSS background.
