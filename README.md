# Lezicuts

## Specification Deliverable

### Elevator Pitch
You know that feeling when you want to change your haircut but only have a picture of half of a guy's head to show the barber and have to hope the cut actually looks good on you? The Lezicuts application not only lets you keep track of your hair length, but also lets you browse haircuts with detailed specifications submitted by professional stylists and users alike so you can tell your barber exactly what you want!

### Design
![Three webpages design](PXL_20240117_224733904.jpg)
This is a rough sketch of the web application design

### Key Features

- Hair-length tracker
- Profile
- Submit your own haircuts
- Browse haircuts

### Technologies

- **HTML:** A profile/login page, a browsing page, and a page for creating a submission
- **CSS:** For styling and an orderly and strightforward appearance
- **JavaScript:** For login, and haircut submission
- **Service:** Backend service with endpoints for login
- **DB/Login:** Store Haircut, user info in database
- **WebSocket:** Notifications when a new haircut is submitted
- **React:** Application ported to use the React web framework

## HTML Deliverable

For this deliverable I built the structure of my website using HTML in the following ways:

- **HTML Pages** - Three HTML pages for login and profile info, creating, and browsing haircuts
- **Links** - All three pages can access each other
- **Text** - Descriptions for each fill form and filler text for various haircuts
- **Images** - Filler images for each haircut
- **DB/Login** - Input boxes and submit buttons for login and haircut creation
- **WebSocket** - Placeholder for real-time notifcations

## CSS Deliverable

For this deliverable, I added style to the existing HTML elements

- **Header, footer, main** - Added bootstrap elements to header and main
- **Nav** - Added bootstrap navbar to header
- **Resizing** - Used flex and bootstrap for window resizing
- **Elements, text, and images** - Used a combination of bootstrap elements and CSS for elements, and changed the default font

## JavaScript Deliverable

For this deliverable, I added functionality to all existing buttons

- **Login** - When you enter and submit a username, your name is displayed on the page
- **Database** - Local storage saves haircut information and retrieves it to display
- **WebSocket** - setInterval is used to change the username for notifications
- **Application Logic** - Using the create page to submit a haircut displays your haircut on the Cuts/Browse page

## Web Service Deliverable

I added Node.js/Express HTTP Service in this deliverable

- **Node.js/Express** - Done
- **Static Middleware** - Done
- **Calls to third-party endpoints** - I felt that my website did not need these
- **Backend Service Endpoints** - Uses endpoints instead of local storage for haircut generation!
- **Frontend calls service endpoints** - Uses endpoints

## Login/DB Deliverable

Logged in users will see the value that they put for hair length and haircuts are stored in the database

- **MongoDB DB** - created
- **Data/credentials stored in DB** - done
- **User registration** - creates account
- **Existing user** - stores hair length
- **Restricted functionality** - Not yet implemented
