# Juliet's Bachelorette Party Web App - Project Scope Document

## Project Overview
This document outlines the scope for developing a React web application for Juliet's bachelorette party in Boca Raton, Florida. The web app will serve as an interactive invitation and itinerary for the party attendees, featuring a two-step verification process before accessing the main content.

## Project Objectives
- Create an engaging and interactive web experience for Juliet's bachelorette party attendees
- Provide a secure entry point that only allows invited guests to access the content
- Display a personalized welcome based on the guest's identity
- Present a visually appealing timeline of all scheduled events over the weekend
- Include relevant information about travel, accommodations, and activities

## Target Audience
The web app is exclusively designed for the following invited guests:
- Isabel
- Nicolle
- Kate
- Erica
- Alex
- Nikki
- Bethany

## Technical Requirements
- Frontend Framework: React.js
- Responsive design for mobile and desktop viewing
- Static hosting (no backend database required)
- Image optimization for fast loading

## Features & Functionality

### 1. Entry Verification System
- **Initial Landing Page**
  - Two sequential verification questions:
    1. "What type of bride is Juliet?" (Correct answer: ["An August Bride", "August", "An august", "August bride"]). please also make sure the answer is not case sensitive and check for all possible variations of the answer.
    2. "Who are you?" (Valid answers: Isabel, Nicolle, Kate, Erica, Alex, Nikki, Bethany)
  - Error handling for incorrect responses
  - Simple, elegant design with thematic styling

### 2. Personalized Welcome Page
- Customized welcome screen based on the name entered
- Unique hero image that corresponds to the specific guest
- Smooth transition into the main content
- Welcome message thanking the guest for being an important part of Juliet's life

### 3. Interactive Timeline Feature
- Scrollable, visually appealing timeline of the entire weekend
- Sectioned by days (May 23rd - May 26th)
- Subsections for different parts of each day (Morning, Afternoon, Evening, Late Night)
- Engaging descriptions for each activity
- Visual elements/photos for each section

### 4. Content Sections

#### Header Section
- Welcome message: "Welcome to Juliet's Bachelorette Party"
- Personalized thank you message to the guest

#### Location Section
- Title: "In beautiful Boca Raton, FL"
- Dates: "May 23rd - May 26th"
- Images of the accommodation

#### Travel Information
- "How to Get Here" section
- Airport options: Fort Lauderdale or West Palm Beach Airports
- Transportation note: "An Uber to the location will be necessary"

#### Day 1 (May 23rd) Itinerary
- **Morning**: Bagels and bask in the sun (with description)
- **Afternoon**: Pool day (with description)
- **Evening**: Movie night (with description)
- **Late Night**: Tea (with description)
- Each section includes a relevant photo

#### Day 2 (May 24th) Itinerary
- **Morning**: Bagels and walk (with description)
- **Afternoon**: Beach day (with description)
- **Evening**: Dinner in Del Ray (with description)
- **Late Night**: Dancing dancing dancing (with description)
- Each section includes a relevant photo

#### Day 3 (May 25th) Itinerary
- **Morning**: Sleep (with description)
- **Afternoon**: Pickleball (with description)
- **Evening**: Dinner at the club (with description)
- **Late Night**: PJ party (with description)
- Each section includes a relevant photo

#### Day 4 (May 26th) Itinerary
- Departure information: "Everyone flies home after a great weekend"

#### Navigation Feature
- "Back to top" button or link for easy navigation

## Design Requirements
- Elegant, celebratory aesthetic suitable for a bachelorette party
- Consistent color scheme and typography throughout
- High-quality images that convey the atmosphere of each activity
- Smooth animations for timeline scrolling and transitions
- Mobile-friendly design for on-the-go access during the trip

## Non-Functional Requirements
- **Performance**: Fast loading times, optimized images
- **Usability**: Intuitive navigation, clear content hierarchy
- **Compatibility**: Works across all modern browsers and devices
- **Security**: Basic front-end validation for the entry questions

## Out of Scope
- User registration/authentication system (using simple front-end validation instead)
- Backend database or server
- User-generated content or comments
- Payment processing for activities

## Implementation Plan

### Phase 1: Design & Prototyping
- Create wireframes for all screens
- Design mockups for desktop and mobile views
- Finalize color palette and typography
- Select and prepare all images

### Phase 2: Frontend Development
- Set up React project structure
- Implement landing page with verification questions
- Build personalized welcome screen
- Develop interactive timeline component
- Create day-by-day itinerary sections
- Implement responsive design

### Phase 3: Testing & Deployment
- Cross-browser testing
- Mobile responsiveness testing
- Content review and proofreading
- Deployment to hosting platform
- Share access with involved parties

## Timeline
- Design & Prototyping: [Insert timeline]
- Frontend Development: [Insert timeline]
- Testing & Deployment: [Insert timeline]
- Launch Date: Prior to May 23rd, 2025 (with sufficient lead time for guests)

## Deliverables
- Complete React application code
- All necessary assets (images, fonts, etc.)
- Deployment to selected hosting platform
- Access instructions for guests

This scope document outlines the requirements for creating an engaging, personalized web experience for Juliet's bachelorette party attendees. The finished product will serve as both an information resource and a memento of the celebration.
