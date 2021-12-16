![](https://lh5.googleusercontent.com/5Gr2dZXHJdmIiASsPw9put-6mR20e4g1gOk-af4krREaJ7NqkZnqXLD5QgiotfNHYhGRh387HSqdhjRwxdwOvQzg9ChhfIrZz0FdxVu6gktBtG-sy1MX6Xq36Gmrzu_6G_K7LDQZ)

Spearmint helps developers easily create functional React/Redux/Endpoint/Paint Timing tests without writing any code. It dynamically converts user inputs into executable Jest test code by using DOM query selectors provided by @testing-library.

# Installation 
Please download spearmint from our [website](https://www.spearmintjs.com/). Available for Mac OS and Windows.


# How to use in development mode

### For Mac developers

**Prerequisite**: Install Xcode 

First install
1. Fork and clone this repository.
2. ```npm install```
3. ```npm run watch```
3. ```npm run start-dev```

***

### For Windows developers
        
**Prerequisite**: Install Node.js globally 
    
1. Fork and clone this repository.
2. ```npm install```
3. ```npm run watch```
3. ```npm run start-dev```

Note: Windows users may also have to run Spearmint in admin mode


<br>


# How it works


1.  On the initial screen, a user is prompt to login, sign up (via OAuth or standard sign-up/login), or login as a guest. Once logged in choose your file and load your application to start creating tests.

![](/public/mainPage.png)

2.  Utilize our auto-complete, drop-down options, and tooltips features to easily create arrangement, action, and assertion test statements for React; reducer, action creator, asynchronous action creator, and middleware test statements for Redux; and hooks, context, and endpoint test statements. Spearmint can save test templates for future use for logged in user (not guests). 

![](/public/generateTest.png)

3.  Spearmint will then convert user input to dynamically generate a test file, which you can click export icon on the left nav bar to automatically save the test file in the **\_\_tests\_\_** folder.  


4.  Lastly click **Run Test** button and follow the guide and click what type of test you would like to perform.
![](/public/runTest.png) 

5.  An accessibility lens has been added in the app to give developers with different mismatches various options to interact with the app. 

![](/public/AccLens_Demo.gif)

6. The latest version of Spearmint has a specific focus on security. The [Snyk](https://snyk.io/) library has been utilized to ensure your application is up to snuff for various security standards and protect your application from malicious attacks. 
Users can now test their application for vulnerabilities including: SQL Injection, Cross-site Scripting (XSS), Hardcoded Secrets, and much more! 

![](/public/demos/snyk-test-app.gif)

# New features with version 0.8.0

-Security testing via Snyk 

-Guest Login

-Cross-platform functionality (Mac OS w/ M1 chip, Mac OS w/ Intel chip, Windows)

-60% reduced package size 

-Accelerated startup time

-Ample bug fixes

<br>

# Demos

### Guest login
![](/public/demos/guest-login.gif)

### Signup + login 
![](/public/demos/signup-login.gif)

### Snyk auth + dependency test
![](/public/demos/snyk-auth-testdep.gif)

### Snyk fix dependencies
![](/public/demos/snyk-fixdep.gif)

### Generate endpoint test
![](/public/demos/snyk-auth-testdep.gif)

### Run a specific test 
![](/public/demos/snyk-auth-testdep.gif)

<br>


# Snyk Setup  


### Authenticate Snyk 
![](/public/demos/snyk-auth-testdep.gif)

### Enable Snyk code
![](/public/demos/snyk-enable.gif)

# The Spearmint Team
<hr>

> Alan [@alanrichardson7](https://github.com/alanrichardson7) <br />
> Alex [@apark0720](https://github.com/apark0720) <br />
> Alfred  [@astaiglesia](https://github.com/astaiglesia) <br />
> Annie  [@annieshinn](https://github.com/annieshinn) <br />
> Ben [@bkwak](https://github.com/bkwak) <br />
> Charlie [@charlie-maloney](https://github.com/charlie-maloney) <br /> 
> Chloe [@HeyItsChloe](https://github.com/HeyItsChloe) <br />
> Cornelius [@corneeltron](https://github.com/corneeltron)  <br />
> Dave [@davefranz](https://github.com/davefranz) <br />
> Dieu [@dieunity](https://github.com/dieunity) <br />
> Eric [@ericgpark](https://github.com/ericgpark) <br />
> Evan [@Berghoer](https://github.com/Berghoer) <br /> 
> Gabriel [@bielchristo](https://github.com/bielchristo) <br />
> Joe [@josephnagy](https://github.com/Josephnagy) <br />
> Johnny [@johnny-lim](https://github.com/johnny-lim) <br />
> Julie [@julicious100](https://github.com/julicious100) <br />
> Justin [@JIB3377](https://github.com/JIB3377) <br />
> Karen [@karenpinilla](https://github.com/karenpinilla) <br /> 
> Linda [@lcwish](https://github.com/lcwish) <br />
> Luis [@Luis-KM-Lo](https://github.com/Luis-KM-Lo) <br />
> Max B[@mbromet](https://github.com/mbromet) <br />
> Max W [@MaxWeisen](https://github.com/MaxWeisen) <br />
> Mike [@mbcoker](https://github.com/mbcoker) <br />
> Mo [@mhmaidi789](https://github.com/mhmaidi789) <br /> 
> Natlyn [@natlynp](https://github.com/natlynp) <br /> 
> Nick [@nicolaspita](https://github.com/nicolaspita) <br />
> Owen [@oweneldridge](https://github.com/oweneldridge) <br />
> Rachel [@rachethecreator](https://github.com/rachethecreator) <br />
> Sean Y [@seanyyoo](https://github.com/seanyyoo)<br />
> Sean H [@sean-haverstock](https://github.com/Sean-Haverstock) <br /> 
> Sharon [@sharon-zhu](https://github.com/sharon-zhu) <br /> 
> Sieun [@sieunjang](https://github.com/sieunjang) <br />
> Terence [@TERR-inss](https://github.com/TERR-inss) <br />
> Tolan [@taoantaoan](https://github.com/taoantaoan) <br />
> Tristen [@twastell](https://github.com/twastell) <br />
> Tyler [@tytyjameson](https://github.com/tytyjameson)
<hr>

***

# If You Want To Contribute: 
The following is a list of features + improvements for future open-source developers that the Spearmint team has either started or would like to see implemented. Or, if you have additional new ideas, feel free to implement those as well! 
- Vue test generation 
- Github OAuth login (was available in previous versions, but the components used became deprecated)
- Additional security testing functionality 
