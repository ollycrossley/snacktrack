# Snacktrack

Welcome to Snacktrack! Snacktrack is a full-stack web project that allows users and local food-truck vendors to connect, supporting local independent businesses all over.

Here is the [Snacktrack](https://snacktrack.vercel.app/) website for your pleasure.


## Navigating the website

### Sign up
On launching the site, you will be greeted by login and signup forms for customers and drivers.

#### The customer journey
On signup, you will be asked to input your username, email, and password. There is also an option to include an avatar image of your choice.

After signing up, you will be automatically logged in and taken to the map. If you accept permissions to have your location data taken, the map will load, centred around your location. On this map, you will be able to see all the local food-truck businesses in your area. You can refresh the map to update your location.

Each business will have their own icon signifying the type of food/drink they sell. Upon clicking on an icon, you will be able to see the business's name, business type, and average rating. You will also be able to click on links to either see more info about the business or receive Google Maps directions based on your location (which will open in a new tab).

Each business's info page will provide info regarding their name, business type, and opening hours. You will be able to see their logo and menu (via a pop-up modal) and read their About section.

Should you so choose, you also have the option to leave a rating (up to 5 stars) and an optional review. Further, you can delete any reviews you have made.

You may also access the business list via a separate businesses page found in the navigation bar. Here, you can filter by whether a business is currently active and sort by average rating.

#### The driver journey
On signup, you will be asked for your name, username, email, business name, business type, and password. Additionally, you have the options to include a logo, a picture of your stall, a menu, and your business's opening hours. 

After signing up, you will be automatically logged in and taken to the map. If you accept permissions to have your location data taken, the map will load, centred around your location. You can refresh the map to update your location. Additionally, you can toggle whether your business is currently active (open) or not.

Navigating the rest of the website is then similar to the customer, except drivers cannot leave reviews.

## Navigating the code

First, ensure that you clone this repository into your local device by typing 
```
git clone https://github.com/ollycrossley/snacktrack
```

and then 
```
cd front-end/snacktrack
```

Next, type 

```
npm install
```
to install all the necessary dependencies and devdependencies.

If successful, you package.json should look something like this:

```
{
 "@react-google-maps/api": "^2.19.2",
    "axios": "^1.5.0",
    "bulma": "^0.9.4",
    "google-map-react": "^2.2.1",
    "moment": "^2.29.4",
    "next": "13.4.19",
    "next-cloudinary": "^4.22.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-router-dom": "^6.16.0",
    "react-switch": "^7.0.0",
    "sass": "^1.67.0
}
```

with the "^" icon indicating the minimum version necessary to run the app.
