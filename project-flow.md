Backend:

1. initialize server's package.json
npm init -y

2. Install dependencies:
npm install bcryptjs
npm install cookie-parser
npm install cors
npm install csurf
npm install dotenv
npm install express
npm install express-async-handler
npm install express-validator
npm install helmet
npm install jsonwebtoken
npm install morgan
npm install per-env
npm install pg@">=8.4.1"
npm install sequelize@5
npm install sequelize-cli@5


3. Install the following packages as dev-dependencies:
npm install -D dotenv-cli
npm install -D nodemon

4. Create .env in the backend folder

5. To generate JWT and put it in .env
openssl rand -base64 10

6. In the backend create config folder,
   create index.js with environment variables settings

7. In the backend folder create .sequelizerc to configure db

8. Initialize db folder
npx sequelize init

9. Replace the content of config/database.js file

10. In psql: create user with the same credentials as in .env
psql
create user event_wild_app with password 'SuPeRsTrOnG!P@sSwOrD!' createdb;
\q

11. In terminal run command to create db
npx dotenv sequelize db:create

12. In backend create app.js,
    initialize express application,
    connect morgan, cookieParser(), express.json()
    add cors(), helmet, csurf

13. Create routes folder

14. Inside routes folder create index.js,
    connect routes in app.js(import routes!)

15. Create in the backend folder create folder bin,
    inside bin create file www,
    add server configurations inside www

16 In package.json add scripts:
    "scripts": {
    "sequelize": "sequelize",
    "sequelize-cli": "sequelize-cli",
    "start": "per-env",
    "start:development": "nodemon -r dotenv/config ./bin/www",
    "start:production": "node ./bin/www"
    }

17. Create api folder inside routes,
    inside api folder - index.js
    Create router in inidex.js, export it

18. In routes/index.js
   connect to the api router

19. Error Handling:
    404 error handler
    sequelize error handler
    error formatter

20. User Authentication:
    Create Users table
    npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string

    Configure migration file and model file, migrate
    npx dotenv sequelize db:migrate

    Undo migration:
    npx dotenv sequelize db:migrate:undo

    Check in the psql:
    psql <database name> -c '\d "Users"'

    Generate seeds file for Users table
    npx sequelize seed:generate --name usersData

    Seed the db
    npx dotenv sequelize db:seed:all

    Undo seeding
    npx dotenv sequelize db:seed:undo:all

    Check if users were created
    psql <database name> -c 'SELECT * FROM "Users"'

    In User model define model scopes
    Create User.prototype methods: toSafeObject()
                                   validatePassword(password)
                                   getCurrentUserById(id)
                                   login
                                   signup
    Create utils folder, iside - auth.js
    In auth.js: setTokenCookie
                restoreUser
                requireAuth

20. Create user auth api routes:
    Login: POST /api/session
    Logout: DELETE /api/session
    Signup: POST /api/users
    Get session user: GET /api/session


 ({
    email: 'spidey@spider.man,
    username: 'Spidey',
    password: 'password'
  })

21. Implement validation of the request body



Frontend:

1. Set up Redux
   Create frontend folder
   npx create-react-app . --template @appacademy/react-redux-v17 --use-npm
   npm install js-cookie

2. Set up proxy



Demo credentials:
demo@user.io
demoPassword



Sequelize:
npx sequelize model:generate --name Category --attributes type:string
npx sequelize model:generate --name Event --attributes hostId:integer,categoryId:integer,name:string,description:text,location:string,date:dateonly,capacity:integer,img:text
npx sequelize model:generate --name Ticket --attributes eventId:integer,userId:integer

Restrictions:
Category:
type - varchar(100)
unique: true;

Event:
hostId-not null
categoryId-not null
name-unique


Ticket:
eventId-not null
userId-not null



Relationships:

Event.belongsTo(models.User, { foreignKey: "hostId" });
User.hasMany(models.Event, { foreignKey: "hostId" });


Category.hasMany(models.Event, {foreignKey: "categoryId"});
Event.belongsTo(models.Category, {foreignKey: "categoryId"});


const columnMapping = {
    through: "Ticket",
    otherKey: "eventId",
    foreignKey: "userId",
};

User.belongsToMany(models.Event,columnMapping)

const columnMapping2 = {
    through: "Ticket",
    otherKey: "userId",
    foreignKey: "eventId",
};

Event.belongsToMany(models.User,columnMapping2)



npx dotenv sequelize db:migrate


npx sequelize seed:generate --name categoryData &&
npx sequelize seed:generate --name eventData &&
npx sequelize seed:generate --name ticketData


//update all the seed files with seed data

npx dotenv sequelize db:seed:undo:all
npx dotenv sequelize db:migrate:undo:all
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all






For heroku:

heroku run npx sequelize-cli db:seed:undo:all
heroku run npx sequelize-cli db:migrate:undo:all
heroku run npx sequelize-cli db:migrate
heroku run npx sequelize-cli db:seed:all












Event seed data:

[
  {
    hostId: 3,
    categoryId: 4,
    name: 'Krofft Kon - Tribute to Sid and Marty Krofft',
    description: 'Krofft Kon will be a day of celebrating the entertaining Saturday morning kids shows produced by Sid & Marty Krofft.  Come join the FUN!',
    location: '4 Orinda Theatre Sq, Orinda, CA 94563',
    date: '2022-05-21',
    img: '/images/S3JvZmZ0IEtvbiAtIFRyaWJ1dGUgdG8gU2lkIGFuZCBNYXJ0eSBLcm9mZnQ=.jpeg',
    capacity: 128,
  },
  {
    hostId: 3,
    categoryId: 2,
    name: 'FoodieLand Night Market  - Berkeley | August 5-7',
    description: 'FoodieLand is a foodie-inspired three-day event where family and friends gather together for food and drink, shopping, and entertainment.',
    location: '1100 Eastshore Highway, Berkeley, CA 94710',
    date: '2022-08-05',
    img: '/images/Rm9vZGllTGFuZCBOaWdodCBNYXJrZXQgIC0gQmVya2VsZXkgfCBBdWd1c3QgNS03.jpeg',
    capacity: 103,
  },
  {
    hostId: 1,
    categoryId: 1,
    name: 'Biblical Theology Workshop for Women :: San Francisco, CA',
    description: 'Over three energetic and interactive sessions, discover how tracing the Bible’s major themes helps us to grasp its important message.',
    location: '2303 Ygnacio Valley Road, Walnut Creek, CA 94598',
    date: '2022-05-07',
    img: '/images/QmlibGljYWwgVGhlb2xvZ3kgV29ya3Nob3AgZm9yIFdvbWVuIDo6IFNhbiBGcmFuY2lzY28sIENB.jpeg',
    capacity: 122,
  },
  {
    hostId: 4,
    categoryId: 5,
    name: 'Rivertown Art and Wine Walk!',
    description: 'Enjoy a Fun Evening of  Wine Tasting, Art, Music, Shopping & Food!',
    location: '300 G Street, Antioch, CA 94509',
    date: '2022-05-07',
    img: '/images/Uml2ZXJ0b3duIEFydCBhbmQgV2luZSBXYWxrIQ==.jpeg',
    capacity: 100,
  },
  {
    hostId: 2,
    categoryId: 4,
    name: 'TEASE SOUTHERN KITCHEN SUNDAY BRUNCH',
    description: 'Join us every Sunday for our Signature Brunch on our outdoor patio!',
    location: '5319 MARTIN LUTHER KING JR. WAY, Oakland, CA 94609',
    date: '2022-05-08',
    img: '/images/VEVBU0UgU09VVEhFUk4gS0lUQ0hFTiBTVU5EQVkgQlJVTkNI.jpeg',
    capacity: 59,
  },
  {
    hostId: 3,
    categoryId: 2,
    name: 'Toasted Life Summer Outdoor Block Party',
    description: "Let's Kick off Summer the Toasted Life Way – In Celebration of JOY!",
    location: 'Entrance to Outdoor Space, Oakland, CA 94612',
    date: '2022-05-21',
    img: '/images/VG9hc3RlZCBMaWZlIFN1bW1lciBPdXRkb29yIEJsb2NrIFBhcnR5.jpeg',
    capacity: 128,
  },
  {
    hostId: 4,
    categoryId: 4,
    name: '73rd Black & White Ball',
    description: 'The  73rd Annual Black and White Benefit Ball',
    location: '1970 Diamond Blvd, Concord, CA 94520',
    date: '2022-05-21',
    img: '/images/NzNyZCBCbGFjayAmIFdoaXRlIEJhbGw=.jpeg',
    capacity: 136,
  },
  {
    hostId: 2,
    categoryId: 9,
    name: 'Bay Area KidFest ‘22 Admission & All-Day Rides Wristband-Limited Time Offer',
    description: "31st Bay Area KidFest on the May 28-30, 2022 Memorial Day Weekend is back as one of the Bay Area's favorite family events.",
    location: 'Mt. Diablo High School, Concord, CA 94520',
    date: '2022-05-28',
    img: '/images/QmF5IEFyZWEgS2lkRmVzdCDigJgyMiBBZG1pc3Npb24gJiBBbGwtRGF5IFJpZGVzIFdyaXN0YmFuZC1MaW1pdGVkIFRpbWUgT2ZmZXI=.jpeg',
    capacity: 87,
  },
  {
    hostId: 1,
    categoryId: 3,
    name: 'Mosswood Meltdown',
    description: 'Summer event at Mosswood Park',
    location: '3612 Webster St, Oakland CA , CA 94610',
    date: '2022-07-02',
    img: '/images/TW9zc3dvb2QgTWVsdGRvd24=.jpeg',
    capacity: 110,
  },
  {
    hostId: 2,
    categoryId: 7,
    name: 'Glochella',
    description: 'Miles Minnick & GLO Collective are hosting an event in the Bay Area that will shake the region',
    location: '501 Auto Center Drive, Antioch, CA 94509',
    date: '2022-06-11',
    img: '/images/R2xvY2hlbGxh.jpeg',
    capacity: 74,
  },
  {
    hostId: 1,
    categoryId: 8,
    name: 'UNCORKED is BACK!!!!',
    description: 'MARK YOUR CALENDAR! The Return of Walnut Creek UNCORKED',
    location: '1275 Broadway Plaza, Walnut Creek, CA 94596',
    date: '2022-06-22',
    img: '/images/VU5DT1JLRUQgaXMgQkFDSyEhISE=.jpeg',
    capacity: 44,
  },
  {
    hostId: 4,
    categoryId: 3,
    name: 'SALSA & BACHATA FRIDAYS in Walnut Creek!',
    description: 'SALSA BACHA FRIDAYS in Walnut Creek! Dance Party & Classes with DJ WILLIE LOVE!',
    location: '1661 Botelho Drive ##190, Walnut Creek, CA 94596',
    date: '2022-05-06',
    img: '/images/U0FMU0EgJiBCQUNIQVRBIEZSSURBWVMgaW4gV2FsbnV0IENyZWVrIQ==.jpeg',
    capacity: 123,
  },
  {
    hostId: 3,
    categoryId: 6,
    name: 'CAPA 2022 June Showcase - WEDNESDAY, JUNE 1 - SHOW C',
    description: "Join us for CAPA's 2022 June Showcase!",
    location: 'Campolindo High School 300 Moraga Road, Moraga, CA 94556',
    date: '2022-06-01',
    img: '/images/Q0FQQSAyMDIyIEp1bmUgU2hvd2Nhc2UgLSBXRURORVNEQVksIEpVTkUgMSAtIFNIT1cgQw==.jpeg',
    capacity: 90,
  },
  {
    hostId: 2,
    categoryId: 7,
    name: 'Red Bull Dance Your Style Oakland Qualifier',
    description: 'Red Bull Dance Your Style is a global all-styles street dance event series with a unique battle format.',
    location: 'Frank H. Ogawa Plaza, Oakland, CA 94612',
    date: '2022-05-06',
    img: '/images/UmVkIEJ1bGwgRGFuY2UgWW91ciBTdHlsZSBPYWtsYW5kIFF1YWxpZmllcg==.jpeg',
    capacity: 113,
  },
  {
    hostId: 1,
    categoryId: 4,
    name: "90's Comedy Night: Stand Up Comedy With A 90's Dress Code",
    description: "Professional stand up comedy with a lightly enforced dress code. Costume up because we want it to look like you stepped into the 90's",
    location: '2112 North Main Street, Walnut Creek, CA 94596',
    date: '2022-05-05',
    img: '/images/OTAncyBDb21lZHkgTmlnaHQ6IFN0YW5kIFVwIENvbWVkeSBXaXRoIEEgOTAncyBEcmVzcyBDb2Rl.jpeg',
    capacity: 131,
  },
  {
    hostId: 1,
    categoryId: 8,
    name: 'Building Safety Through Community',
    description: "Join us for the Family Justice Center's annual Building Safety Through Community celebration!",
    location: '100 Buckley Street, Martinez, CA 94553',
    date: '2022-05-14',
    img: '/images/QnVpbGRpbmcgU2FmZXR5IFRocm91Z2ggQ29tbXVuaXR5.jpeg',
    capacity: 100,
  },
  {
    hostId: 1,
    categoryId: 9,
    name: 'Sausage Fest Comedy: Secret Ladies Comedy Show  Live',
    description: 'This is just another comedy show feature all guy comics SYKE! Sausage Fest Comedy brings you lineups dominated by the funniest lady comics!',
    location: '2112 North Main Street, Walnut Creek, CA 94596',
    date: '2022-05-26',
    img: '/images/U2F1c2FnZSBGZXN0IENvbWVkeTogU2VjcmV0IExhZGllcyBDb21lZHkgU2hvdyAgTGl2ZQ==.jpeg',
    capacity: 42,
  },
  {
    hostId: 4,
    categoryId: 10,
    name: 'Diablo Valley College CAR SHOW - Great Designers Series',
    description: 'Diablo Valley College (DVC) Great Designers Series Car  Show  and  CNC Robotics Open House',
    location: '270 Viking Drive Parking Lot 2, Pleasant Hill, CA 94523',
    date: '2022-05-07',
    img: '/images/RGlhYmxvIFZhbGxleSBDb2xsZWdlIENBUiBTSE9XIC0gR3JlYXQgRGVzaWduZXJzIFNlcmllcw==.jpeg',
    capacity: 37,
  },
  {
    hostId: 2,
    categoryId: 3,
    name: 'Afro Soca Love : Oakland Black Owned Marketplace + Afterparty',
    description: 'Circulate Our Dollars With Black Owned Businesses While Celebrating Community!',
    location: '341 13th St, Oakland, CA 94612',
    date: '2022-05-14',
    img: '/images/QWZybyBTb2NhIExvdmUgOiBPYWtsYW5kIEJsYWNrIE93bmVkIE1hcmtldHBsYWNlICsgQWZ0ZXJwYXJ0eQ==.jpeg',
    capacity: 130,
  },
  {
    hostId: 4,
    categoryId: 6,
    name: 'UC Berkeley Space Technology Symposium 2022',
    description: 'A professional conference for students and the space industry',
    location: 'University of California, Berkeley, Berkeley, CA 94720',
    date: '2022-05-04',
    img: '/images/VUMgQmVya2VsZXkgU3BhY2UgVGVjaG5vbG9neSBTeW1wb3NpdW0gMjAyMg==.jpeg',
    capacity: 30,
  },
  {
    hostId: 2,
    categoryId: 5,
    name: 'Starr King Commencement 2022',
    description: 'A hybrid Commencement ceremony to celebrate the Starr King Class of 2022.',
    location: '55 Eckley Lane, Walnut Creek, CA 94596',
    date: '2022-05-12',
    img: '/images/U3RhcnIgS2luZyBDb21tZW5jZW1lbnQgMjAyMg==.jpeg',
    capacity: 89,
  },
  {
    hostId: 2,
    categoryId: 8,
    name: '16th Annual Knights of Columbus Charity Golf  PLEASE JOIN  OUR WAITLIST',
    description: '16th Annual Knights of Columbus  \nCharity Golf Tournament',
    location: '599 Blackhawk Club Drive, Danville, CA 94506',
    date: '2022-06-27',
    img: '/images/MTZ0aCBBbm51YWwgS25pZ2h0cyBvZiBDb2x1bWJ1cyBDaGFyaXR5IEdvbGYgIFBMRUFTRSBKT0lOICBPVVIgV0FJVExJU1Q=.jpeg',
    capacity: 63,
  },
  {
    hostId: 2,
    categoryId: 2,
    name: '5th Annual Black Food & Wine Experience 2022',
    description: '5th Annual Black Food & Wine Experience. Food, Wine, Cocktails, Music & Culture.',
    location: '2323 Broadway, Oakland, CA 94612',
    date: '2022-06-18',
    img: '/images/NXRoIEFubnVhbCBCbGFjayBGb29kICYgV2luZSBFeHBlcmllbmNlIDIwMjI=.jpeg',
    capacity: 30,
  },
  {
    hostId: 3,
    categoryId: 1,
    name: 'Rooted & Rysing Grand Opening',
    description: "Young people's vision for RYSE is finally here! Please join us for Grand Opening to celebrate RYSE Commons.",
    location: '3939 Bissell Avenue, Richmond, CA 94805',
    date: '2022-05-14',
    img: '/images/Um9vdGVkICYgUnlzaW5nIEdyYW5kIE9wZW5pbmc=.jpeg',
    capacity: 90,
  },
  {
    hostId: 3,
    categoryId: 4,
    name: 'Toasted Life | Vibe Lounge R&B',
    description: 'Meet us after Oakland First Friday at  Zanzi Oakland for an unforgettable R&B night with your Toasted Life family!',
    location: '19 Grand Avenue, Oakland, CA 94612',
    date: '2022-05-06',
    img: '/images/VG9hc3RlZCBMaWZlIHwgVmliZSBMb3VuZ2UgUiZC.jpeg',
    capacity: 59,
  },
  {
    hostId: 4,
    categoryId: 10,
    name: '8th Annual Pints for Paws®',
    description: 'The 8th Annual Pints For Paws beer festival returns in 2022 as an in-person event!',
    location: '2700 Ninth Street, Berkeley, CA 94710',
    date: '2022-06-04',
    img: '/images/OHRoIEFubnVhbCBQaW50cyBmb3IgUGF3c8Ku.jpeg',
    capacity: 144,
  },
  {
    hostId: 2,
    categoryId: 2,
    name: 'Mini Miners!',
    description: 'Get outside with your toddlers on this FREE nature play program hosted monthly by Black Diamond Mines Naturalist Ashley Adams!',
    location: '5175 Somersville Road, Antioch, CA 94509',
    date: '2022-05-10',
    img: '/images/TWluaSBNaW5lcnMh.jpeg',
    capacity: 43,
  },
  {
    hostId: 4,
    categoryId: 1,
    name: 'Contra Costa Spring League  & Bay Area Ladies League Annual Luncheon!',
    description: "That's right!  BALL and CCSL are coming together to  host this year's  Annual  Luncheon.\n" +
      ' Sign up today.',
    location: '3169 Roundhill Road, Alamo, CA 94507',
    date: '2022-05-17',
    img: '/images/Q29udHJhIENvc3RhIFNwcmluZyBMZWFndWUgICYgQmF5IEFyZWEgTGFkaWVzIExlYWd1ZSBBbm51YWwgTHVuY2hlb24h.jpeg',
    capacity: 32,
  },
  {
    hostId: 4,
    categoryId: 10,
    name: 'NO WAHALA WEDNESDAYS  (The Hottest Afrobeats Weekly In The Bay Area)',
    description: 'The brand "UTA" stands for United Tribes of Africa a and is inspired by the pan african belief system.',
    location: '811 Washington Street, Oakland, CA 94607',
    date: '2022-05-04',
    img: '/images/Tk8gV0FIQUxBIFdFRE5FU0RBWVMgIChUaGUgSG90dGVzdCBBZnJvYmVhdHMgV2Vla2x5IEluIFRoZSBCYXkgQXJlYSk=.jpeg',
    capacity: 31,
  },
  {
    hostId: 2,
    categoryId: 9,
    name: 'Family Fun Fridays in Pittsburg In May',
    description: 'The City of Pittsburg is celebrating Family Fun Fridays throughout May.  Enjoy music, games, fitness activities, food trucks and more.',
    location: 'East 8th Street, Pittsburg, CA 94565',
    date: '2022-05-06',
    img: '/images/RmFtaWx5IEZ1biBGcmlkYXlzIGluIFBpdHRzYnVyZyBJbiBNYXk=.jpeg',
    capacity: 94,
  },
  {
    hostId: 4,
    categoryId: 7,
    name: '4 -8 hours AM  Pain & the Elderly – PM  Legal Issues for CNAs',
    description: 'Class schedule: 8:30AM –Pain & the Elderly (4 CEUs); '1:00PM –Legal Issues for CNAs (4 CEUs)'
    location: '2950 Buskirk Avenue Ste 290, WALNUT CREEK, CA 94597',
    date: '2022-05-12',
    img: '/images/NCAtOCBob3VycyBBTSAgUGFpbiAmIHRoZSBFbGRlcmx5IOKAkyBQTSAgTGVnYWwgSXNzdWVzIGZvciBDTkFz.jpeg',
    capacity: 113,
  },
  {
    hostId: 4,
    categoryId: 2,
    name: "Mother's Day Brunch & Mimosas by San Pablo Bay!",
    description: 'Celebrate our Moms with brunch and mimosas by the San Pablo Bay!',
    location: '13 Pacific Avenue, Rodeo, CA 94572',
    date: '2022-05-07',
    img: '/images/TW90aGVyJ3MgRGF5IEJydW5jaCAmIE1pbW9zYXMgYnkgU2FuIFBhYmxvIEJheSE=.jpeg',
    capacity: 127,
  },
  {
    hostId: 3,
    categoryId: 10,
    name: 'Barks and Brews',
    description: 'Join us for our first event of the year! Every delicious beer supports our efforts in helping homeless and abused animals in our community.',
    location: '2313 Oak Grove Road, Walnut Creek, CA 94598',
    date: '2022-05-17',
    img: '/images/QmFya3MgYW5kIEJyZXdz.jpeg',
    capacity: 97,
  },
  {
    hostId: 3,
    categoryId: 3,
    name: 'The Wiz Jr',
    description: 'Aspire Visual & Performing Arts Academy and the city of Antioch present, The Wiz Jr!',
    location: '213 F Street, Antioch, CA 94509',
    date: '2022-05-20',
    img: '/images/VGhlIFdpeiBKcg==.jpeg',
    capacity: 98,
  },
  {
    hostId: 4,
    categoryId: 3,
    name: 'Berkeley Farmers Market Salsa Festival 2022',
    description: 'Mark you calendar for the Farmers Market Salsa Festival!',
    location: '1947 Center Street, Berkeley, CA 94704',
    date: '2022-05-21',
    img: '/images/QmVya2VsZXkgRmFybWVycyBNYXJrZXQgU2Fsc2EgRmVzdGl2YWwgMjAyMg==.jpeg',
    capacity: 143,
  },
  {
    hostId: 2,
    categoryId: 4,
    name: 'FREE  PELLETB Testing',
    description: 'FREE   California POST Entry-Level Law Enforcement Test Battery-POST PELLETB  Written Exam',
    location: '340 Marina Boulevard, Pittsburg, CA 94565',
    date: '2022-06-11',
    img: '/images/RlJFRSAgUEVMTEVUQiBUZXN0aW5n.jpeg',
    capacity: 148,
  },
  {
    hostId: 3,
    categoryId: 6,
    name: 'Car show',
    description: 'Liberty Auto, Pastimes Car Club, Brentwood PAL and Traditions Rod and Custom is hosting a car show 5/7/22. 9am-2pm $25 car entry',
    location: '929 2nd Street, Brentwood, CA 94513',
    date: '2022-05-07',
    img: '/images/Q2FyIHNob3c=.jpeg',
    capacity: 40,
  },
  {
    hostId: 1,
    categoryId: 6,
    name: 'Curry Canyon Ranch Mt. Diablo Audubon Hike',
    description: 'All Discover Diablo hikes are subject to, and will honor, all applicable COVID-19–related restrictions in place for our area.',
    location: 'Address Provided After Registration, Clayton, CA 94517',
    date: '2022-05-05',
    img: '/images/Q3VycnkgQ2FueW9uIFJhbmNoIE10LiBEaWFibG8gQXVkdWJvbiBIaWtl.jpeg',
    capacity: 65
  },
  {
    hostId: 1,
    categoryId: 10,
    name: 'Senior Directed Plays',
    description: 'Bentley Senior Directed Plays!',
    location: '1000 Upper Happy Valley Road, Lafayette, CA 94549',
    date: '2022-05-04',
    img: '/images/U2VuaW9yIERpcmVjdGVkIFBsYXlz.jpeg',
    capacity: 100,
  },
  {
    hostId: 3,
    categoryId: 7,
    name: 'blink 180TRUE (Tribute to Blink 182) LIVE at Retro Junkie',
    description: 'blink 180TRUE (Tribute to Blink 182) LIVE at Retro Junkie',
    location: '2112 North Main Street, Walnut Creek, CA 94596',
    date: '2022-05-13',
    img: '/images/YmxpbmsgMTgwVFJVRSAoVHJpYnV0ZSB0byBCbGluayAxODIpIExJVkUgYXQgUmV0cm8gSnVua2ll.jpeg',
    capacity: 140,
  }
]





Category data:

{
    type: "community & culture",
},
{
    type: "music",
},
{
    type: "food & drink",
},
{
    type: "music",
},
{
    type: "film, media & entertainment",
},
{
    type: "religion & spirituality",
},
{
    type: "performing & visual arts",
},
{
    type: "health & wellness",
},
{
    type: "government & politics",
},
{
    type: "other",
},







Ticket data


[{
    hostId: 1,
    eventId: 1,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 2,
    eventId: 2,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 2,
    eventId: 3,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 2,
    eventId: 4,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 2,
    eventId: 5,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 4,
    eventId: 6,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 1,
    eventId: 7,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 1,
    eventId: 8,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 4,
    eventId: 9,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 4,
    eventId: 10,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 2,
    eventId: 11,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 1,
    eventId: 12,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 1,
    eventId: 13,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 4,
    eventId: 14,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 3,
    eventId: 15,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 2,
    eventId: 16,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 1,
    eventId: 17,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 2,
    eventId: 18,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 2,
    eventId: 19,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 4,
    eventId: 20,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 3,
    eventId: 21,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 2,
    eventId: 22,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 4,
    eventId: 23,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 3,
    eventId: 24,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 4,
    eventId: 25,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 4,
    eventId: 26,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 3,
    eventId: 27,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 4,
    eventId: 28,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 1,
    eventId: 29,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 2,
    eventId: 30,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 2,
    eventId: 31,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 4,
    eventId: 32,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 4,
    eventId: 33,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 2,
    eventId: 34,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 4,
    eventId: 35,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 3,
    eventId: 36,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 3,
    eventId: 37,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 1,
    eventId: 38,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 1,
    eventId: 39,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  },
  {
    hostId: 2,
    eventId: 40,
    createdAt: 2022-05-02T16:25:16.083Z,
    updatedAt: 2022-05-02T16:25:16.083Z
  }







to see error logs in sequelize logs:  in config - database.js - development: logging: true
