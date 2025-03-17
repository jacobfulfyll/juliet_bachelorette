# Juliet's Bachelorette Party Website

A beautiful, interactive web application for Juliet's bachelorette party, featuring:

- Two-step verification system to ensure only invited guests can access the details
- Personalized welcome messages for each guest
- Interactive timeline of events
- Travel information with location details, transportation options, and packing list
- Photo gallery (with placeholders for actual photos)
- Animated background and smooth transitions between sections

## Technologies Used

- Next.js
- React
- Framer Motion for animations
- Tailwind CSS for styling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Verification System

The website includes a two-step verification process:
1. First step: Answer the question "What type of bride is Juliet?" (Answer: "an august bride")
2. Second step: Select your name from the list of invited guests

## Features

### Timeline
An interactive timeline showing all the planned activities for the bachelorette weekend.

### Travel Information
Details about the location, transportation options, and a comprehensive packing list.

### Photo Gallery
A placeholder gallery that can be populated with actual photos from the event.

## Customization

To customize this website for another event:
1. Update the verification questions and answers in `VerificationStep1.js` and `VerificationStep2.js`
2. Modify the personalized welcome messages in `Welcome.js`
3. Update the timeline events in `Timeline.js`
4. Change the travel information in `TravelInfo.js`
5. Replace placeholder images with actual photos in `PhotoGallery.js`

## License

This project is created for personal use and is not licensed for commercial purposes. 