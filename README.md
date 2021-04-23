(View Raw will give you the markdown that you can copy to your repos!)


![MIT LICENSE](https://img.shields.io/github/license/lucasgabrielson/floradex.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/lucasgabrielson/floradex.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/lucasgabrielson/floradex.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/lucasgabrielson/floradex.svg?style=social)

# PROJECT NAME

The Floradex

## Description

_Duration: 2 Week Sprint_

The Floradex allows users to interact more deeply with State Natural Areas. Users are given a list of all of the grasses, trees, and wildflowers within each Natural Area in Minnesota. If they are able to find these plants they can upload a picture of them to the app for verification. Once verified by admins the find is added to the users total and they can earn badges commensurate with the amount of plants found and can compete against their friends. 

In order to accomplish this I used the MN DNR Api, the Google Maps Api, and the Trefle Plants Api. From these sources I got the information regarding the State Natural Areas, the plants therein, their latitutde and longititude, and images of the plants. I have created React functional components to display the State Natural Areas and plants and also have used Material UI Modals for descriptions and images regarding my table data. I have created a relational postgreSQL databse 

<!-- To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](www.heroku.com) -->

## Screen Shot

<img width="1440" alt="Screen Shot 2021-04-22 at 10 31 26 PM" src="https://user-images.githubusercontent.com/74149109/115877364-f7ddc080-a40c-11eb-983d-642e8f15cedc.png">
<img width="1440" alt="Screen Shot 2021-04-22 at 10 31 48 PM" src="https://user-images.githubusercontent.com/74149109/115877368-f9a78400-a40c-11eb-83ff-3dceb785bad8.png">
<img width="1434" alt="Screen Shot 2021-04-22 at 10 32 01 PM" src="https://user-images.githubusercontent.com/74149109/115877374-fa401a80-a40c-11eb-8e6c-1a6f20761fec.png">

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)

## Installation



1. Create a database named `floradex`,
2. The queries in the `tables.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Create an account with Google Cloud Platform, AWS, and Trefle.io
5. Obtain API Key from Google and Trefle
6. Describe S3 bucket procedure
7. Create .env file with . . . 
8. Run `npm run server` in your terminal
9. Run `npm run client` in your terminal
10. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. Create an Account
2. Use the interactive Map, List of Natural Areas or Plants to find Natural Areas to Explore
3. Take Pictures of Plants at the Natural Areas and upload them 
4. Admin will verify your finds and you will get credit for the find
5. Rise through the leaderboard and claim the top spot!


## Built With

- React.js
- Node.js
- Redux
- JavaScript
- Material UI
- CSS
- Express.js
- Passport.js



## Acknowledgement
Thanks to [Jaclyn Gabrielson](https://www.linkedin.com/in/jmerriamcpa/), [Graham Gabrielson](https://www.researchgate.net/profile/Graham-Gabrielson), [Curtis Payne](https://www.linkedin.com/in/curtis-payne/), and [Jack Behrens](https://www.linkedin.com/in/jackbehrens/) [[Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.

## Support
If you have suggestions or issues, please email me at (lucascgabrielson@gmail.com)
