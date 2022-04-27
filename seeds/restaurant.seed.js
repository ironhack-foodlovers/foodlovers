// run this command in terminal: "node seeds/restaurant.seed.js"

const Restaurant = require('../models/Restaurant')

const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://foodLovers:hDlNs8fXGj6yq2jq@cluster0.bxyoi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

const restaurants = [
    {
        name: "Shiori",
        street: "Max-Beer-Str.",
        houseNumber: 13,
        zipCode: 10119,
        city: "Berlin",
        country: "Germany",
        //geoCoordinates
        telephone: "+49(0)3064467442",
        url: "http://www.shioriberlin.com/",
        //tags
        description: "Shiori's mission is and always has been to offer people a touchstone of Japanese culture through an immersive culinary experience.",
        //liked
    },
    {
        name: "Hako Ramen am Boxi",
        street: "Boxhagener Str.",
        houseNumber: 26,
        zipCode: 10245,
        city: "Berlin",
        country: "Germany",
        //geoCoordinates
        telephone: "+49(0)3084426700",
        url: "https://hakoramen.com/",
        //tags
        description: "Hako bedeutet übersetzt nicht nur Box (-hagener Straße), denn es wird in Japan auch für Orte verwendet, wo ein Live-Performance stattfindet. Sei es auf einer Bühne, Theater, Live-House oder sogar auch im Fußballstadion. Und genau das finden Sie auch bei uns! Ein harmonisches Zusammenspiel verschiedenster Zutaten. Ein Blick in die offene Küche mit Köchen, die tagtäglich für Sie die Nudelkörbe schwingen und eine Ramen Suppe nach dem anderen herbeizaubern. Kellnern, die mit schwungvollen Schritten viele Köstlichkeiten servieren.",
        //liked
    },
    {
        name: "BLACKBEARDS BBQ JOINT",
        street: "Pappelallee",
        houseNumber: 55,
        zipCode: 10437,
        city: "Berlin",
        country: "Germany",
        //geoCoordinates
        telephone: "+49(0)3041192288",
        url: "https://www.blackbeards.berlin/",
        //tags
        description: "Unter dem Motto „Das heißeste Smoker-Restaurant Deutschlands“ eröffnen wir die neuen Pforten unserer BLACKBEARDS BBQ-Factory. Für unser neues Projekt haben wir uns eine ganz besondere Location ausgesucht – eine alte Güterstation: Zur Alten Börse 68 in 12681 Berlin. Diese haben wir in liebevoller Handarbeit zu einer BBQ-Factory umgebaut. Restaurant, Eventfläche und Räucherei in einem Gebäude – hier füllen wir zukünftig die Räume mit dem rauchigen und würzigen Duft unserer BBQ-Spezialitäten. In unserem hauseigenen „Smoker“ wird das Fleisch im Niedrigtemperaturverfahren über viele Stunden gegart, um so ein saftiges und schmackhaftes Erlebnis zu kreieren. Das Ergebnis ist ein angenehm rauchiger Geschmack und eine wunderbar zarte Konsistenz. Qualität und Geschmack stehen für uns genauso im Vordergrund, wie ein nachhaltiger und sorgfältiger Umgang mit unseren Lebensmitteln. Ausgesuchte Lieferanten aus dem Umkreis versorgen uns mit frischer Ware. Letztendlich geht es um: Beef Brisket, Rippchen, Pulled Pork, satte Burger und vieles mehr… come on!",
        //liked
    },
    {
        name: "The Tree",
        street: "Brunnenstraße",
        houseNumber: 167,
        zipCode: 10119,
        city: "Berlin",
        country: "Germany",
        //geoCoordinates
        telephone: "+49(0)3067961848",
        url: "https://www.facebook.com/thetree.berlin",
        //tags
        description: "Das liebevoll gestaltete Lokal serviert authentisch chinesische Gerichte aus hausgemachten Nudeln und einer Vielzahl an pikanten Gewürzen.",
        //liked
    },
    {
        name: "Night Kitchen",
        street: "Oranienburger Str.",
        houseNumber: 32,
        zipCode: 10117,
        city: "Berlin",
        country: "Germany",
        //geoCoordinates
        telephone: "+49(0)3023575075",
        url: "https://www.nightkitchenberlin.com/",
        //tags
        description: "We offer Israeli-influenced, modern-Mediterranean meat, seafood and vegetarian/vegan dishes that are fresh, simply prepared and made for sharing. We use only the best, local where possible, ingredients and our style combines color, texture and the interplay between subtle flavors to keep your conversation flowing. Our dishes are designed to be light, energizing, to keep you fresh and in the mood to celebrate.",
        //liked
    },
    {
        name: "BAR TAUSEND",
        street: "Schiffbauerdamm",
        houseNumber: 11,
        zipCode: 10117,
        city: "Berlin",
        country: "Germany",
        //geoCoordinates
        telephone: "+49(0)3027582070",
        url: "http://www.tausendberlin.com/",
        //tags
        description: "`In the end you won't remember the time you spend in the office or mowing the lawn. Climb that mountain` - JACK KEROUAC",
        //liked
    },
    {
        name: "goldies",
        street: "Oranienstraße",
        houseNumber: 6,
        zipCode: 10997,
        city: "Berlin",
        country: "Germany",
        //geoCoordinates
        telephone: "+49(0)3074780320",
        url: "http://www.goldies-berlin.de/",
        //tags
        description: "Best bad food in town.",
        //liked
    },
    {
        name: "Chungking Noodles",
        street: "Reichenberger Str.",
        houseNumber: 35,
        zipCode: 10999,
        city: "Berlin",
        country: "Germany",
        //geoCoordinates
        telephone: "+49(0)3064467442 ",
        url: "https://www.instagram.com/chungkingnoodles/",
        //tags
        description: " immersive culinary experience.",
        //liked
    },
    {
        name: "Le Bon",
        street: "Boppstraße 1",
        houseNumber: 1,
        zipCode: 10967,
        city: "Berlin",
        country: "Germany",
        //geoCoordinates
        telephone: "+49(0)3063420794",
        url: "http://www.lebon-berlin.com/",
        //tags
        description: "No reservations - just come on by! Kitchen closes an hour before closing.",
        //liked
    },
    {
        name: "Mangiare Berlin",
        street: "Bugenhagenstraße",
        houseNumber: 19,
        zipCode: 10551,
        city: "Berlin",
        country: "Germany",
        //geoCoordinates
        telephone: "+49 15211922767",
        url: "https://www.mangiare-berlin-berlin.de/",
        //tags
        description: "Das Essen ist lecker , aber es war kalt und ich habe 1h und 20min gewartet auf eine Pizza. Ich bestelle weiterhin, aber die Lieferung muss verbessert werden.",
        //liked
    },
    {
        name: "Faelt Schöneberg",
        street: "Vorbergstraße",
        houseNumber: 10,
        zipCode: 10823,
        city: "Berlin",
        country: "Germany",
        //geoCoordinates
        telephone: "",
        url: "http://www.faelt.de/",
        //tags
        description: "GELEGEN IM SCHÖNEBERGER AKAZIENKIEZ, BEFINDET SICH DAS FAELT IN EINEM DENKMALGESCHÜTZTEN ALTBAU VON 1903. KREATIV, NACHHALTIG UND SCHNÖRKELLOS. DAS IST DIE PHILOSOPHIE VON BJÖRN SWANSON UND KÜCHENCHEF MAX KOCKOT. FAELT - REDUZIERT AUF DAS WESENTLICHE",
        //liked
    },
]

Restaurant.insertMany(restaurants)
  .then(restaurants => {
      console.log(`Success - added ${restaurants.length} to the db`)
      mongoose.connection.close()
  })
  .catch(err => {
      console.log(err)
  })
