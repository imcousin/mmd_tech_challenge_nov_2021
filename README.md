# mmd_tech_challenge_nov_2021


<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <!-- <li><a href="#contributing">Contributing</a></li> -->
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

An application that allows students to submit assignments and the instructor can mark the assignments on the website.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [MongoDB](https://www.mongodb.com/)
* [Express.js](https://expressjs.com/)
* [Node.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

<!-- This is an example of how you may give instructions on setting up your project locally. -->
<!-- To get a local copy up and running follow these simple example steps. -->

### Prerequisites

Things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can installing and setting up your app. This template  rely on external dependency or service of remote MongoDB at the moment._

1. Clone the repo
   ```sh
   git clone https://github.com/imcousin/mmd_tech_challenge_nov_2021
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create and enter your ENV variables in `.env` under the server folder
   ```env
  DB_USER=mmdadmin
  DB_PASSWORD=mmdadmin123
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

Instructor login have been seeded as
email: 'teacher@teacher.com'
pw: '123123'

In order for a instructor user to see student assignments for marking, a student will need to submit student assignments first.

Student logins have been seeded as
email: 'studentone@student.com'
pw: '123123'
email: 'studenttwo@student.com'
pw: '123123'
email: 'studentthree@student.com'
pw: '123123'

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Fix docker compose not loading local container db properly, needs authentication.
- [ ] Seed container db when mongo container starts.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Cusson Cheung - [@your_twitter](https://twitter.com/cussoncheung?lang=ga)

Project Link: [https://github.com/imcousin/mmd_tech_challenge_nov_2021](https://github.com/imcousin/mmd_tech_challenge_nov_2021)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Basic MERN Stack with REST](https://github.com/codedamn/full-mern-stack-video/)
* [Express](https://github.com/expressjs/express)
* [nodemon](https://github.com/remy/nodemon)
* [dotenv](https://github.com/motdotla/dotenv)
* [CORS](https://github.com/expressjs/cors)
* [JWT](https://github.com/auth0/node-jsonwebtoken)
* [Tailwind](https://tailwind.com)
* [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
* [mongoose](https://github.com/Automattic/mongoose)
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/cussoncheung