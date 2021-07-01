# EaseYourTrip_n_Life_Using_Automation
**Install Puppeteer**<br />
Command ---> npm i puppeteer
<br />

**Video Link:**<br />
https://drive.google.com/drive/folders/1mp0ZiKChcsR-j81kjL1WvF4yb_VntMw-?usp=sharing

<br />

**Recommendation:**
1. Use your Email-Id and password in 3rd and 4th line respectively of the script.<br />
2. Must go through ReadMe File once. This file looks big but it's very easy and will clear everything about each functionality of this project.
<br />
<br />

**Code:**<br />
Use automation.js file

**I have made a project which is based on Automation using puppeteer.** 

                                                    10 Major Functionalities
1. Send list of Train Details to the email address.<br />
2. Send the Current Status of Particular Train to the email address.<br />
3. Send list of Flight Details to the email address.<br />
4. Send list of Bus Details to the email address.<br />
5. Send list of Hotel Details to the email address.<br />
6. Send Weather Forecast of the next 14 days to the email address.<br />
7. Send list of Top 50 Songs to the email address.<br />
8. Send the list of Most popular News of last 24 Hours to the email address.<br />
9. Send list of Best TV Shows whose rating is above 9 to the email address.<br />
10. Send list of Best Movies whose rating is above 8.8 to the email address.<br />

Stores all the sent data locally also.

<br />
<br />

                                                  Sites Used in this Project
railyatri.in  ,   makemytrip.com  ,   yatra.com  ,   weather.com  ,   gaana.com  ,   timesofindia.com  ,    imdb.com
<br />
<br />

                                                  Brief about Code and Video
I ran each function one by one because of my internet speed. You can ran it asynchronously my making some changes in the code using args values and count function.<br />

I have made this project by keeping this in mind that if someone wants to go on a trip so he can get all the necessary details. like if someone wants to go by train so he can get the train details and also he can check the current status of that train or any other train. He or she can also check the bus or flight details. Then he can also check, details of all the hotels present at their destination point. He can check the weather details of that city so to plan accordingly.<br />
He can also get the list of top 50 songs to listen during his journey.<br />
He can also get the links of Best Rated Movies, TV Shows and Popular News.<br />
<br />
<br />

Let’s look each of these one by one.<br />
<br />
**1. Train Details**
* Code part:
  * In my code, I have already mentioned the places i.e. From Chandigarh to Panipat.                
* Terminal part:
  * node automation.js TrainDetails                                                                      
* Video part:
  * Just pick any date you want else leave it as it is. It will fetch all the data and store it in our data.json file and send us a mail on the EmailID provided.            
* Output part:
  * From Station
  * To Station
  * Date
  * {Code, TrainName, Departure, Arrival, Duration, Classes with Prices and Seat Availability}

<br />
<br />

**2. Train Status**
* Code part:
  * In my code, I have already mentioned the code No. of train i.e. 02952                            
* Terminal part:
  * node automation.js TrainStatus
* Video part:
  * It will fetch all the data and store it in our data.json file and send us a mail on the EmailID provided.
* Output part:
  * Code
  * Train Name
  * Date Started
  * FAQs with updated answer **(best part)**
  * Details of each station {Station Name, Arrival, Current Status, Halt Time} 
<br />
<br />

**3. Flight Details**
* Code part:
  * In my code, I have already mentioned the places i.e. From Delhi to Varanasi.
* Terminal part:
  * node automation.js FlightDetails
* Video part:
  * Just pick any date you want else leave it as it is. Also can select no. of passengers and class else leave it as it is. It will fetch all the data and store it in our data.json file and send us a mail on the EmailID provided.
* Output part:
  * Trip Type
  * From
  * To
  * Date
  * Return
  * Our Requirement
  * {FlightName, Departure, Arrival, Duration, Price} 

<br />
<br />

**4. Bus Details**
* Code part:
  * In my code, I have already mentioned the places i.e. From Chandigarh to Panipat.  
* Terminal part:
  * node automation.js BusDetails     
* Video part:
  * Just pick any date you want else leave it as it is. It will fetch all the data and store it in our data.json file and send us a mail on the EmailID provided.
* Output part:
  * From Station
  * To Station
  * Date
  * {Name, Departure, Arrival, Duration, Classes with Prices and Seat Availability}
<br />
<br />

**5. Hotel Details**
* Code part:
  * In my code, I have already mentioned the place i.e. looking in Zirakpur.            
* Terminal part:`
  * node automation.js HotelDetails   
* Video part:
  * Just pick check-in and check-out date you want, else leave it as it is. Also can add members and rooms. It will fetch all the data and store it in our data.json file and send us a mail on the EmailID provided.
* Output part:`
  * Place Looking For
  * Dates
  * Our Requirements
  * {Name, Location and Price}           **(Also give us details of nearby places ------- Best Part)**
<br />
<br />

**6. Weather Forecast**
* Code part:
  * In my code, I have already mentioned the place i.e. looking for Delhi.     
* Terminal part:
  * node automation.js Weather                                                            
* Video part:
  * It will fetch all the data of next 14 Days and store it in our data.json file and send us a mail on the EmailID provided.
* Output part:
  * { Date, Max Temperature, Min Temperature, Season/Summary, Wind Speed and Direction}
<br />
<br />

**7. Top 50 Songs**
* Terminal part:
  * node automation.js Top50Songs                                   
* Video part:
  * It will fetch all the data of next top 50 songs and store it in our data.json file and send us a mail on the EmailID provided.
* Output part:
  * { Song Name, Artists Name and Duration}
<br />
<br />


**8. Popular News**
* Terminal part:
  * node automation.js PopularNews  
* Video part:
  * It will fetch all the data of the Most Readed news in the last 24 hours and store it in our data.json file and send us a mail on the EmailID provided.
* Output part:
  * { HeadLine and Link}                 **(Best Part - Directly click on that link to get full info. of that news)**
<br />
<br />

**9. Best Tv Shows**
* Code part:
  * In my code, I have already mentioned the rating i.e. looking for above 9.                           
* Terminal part:
  * node automation.js BestTvShows  
* Video part:
  * It will fetch all the data of the rated TV Show higher than 9 and store it in our data.json file and send us a mail on the EmailID provided.
* Output part:
  * { TvShowName, Link and Rating}       **(Best Part - Directly click on that link to watch that Tv Show)**
<br />
<br />

**10. Best Movies**<br />
* Code part:
  * In my code, I have already mentioned the rating i.e. looking for above 8.8.             
* Terminal part:`
  * node automation.js BestMovies                                                                      
* Video part:
  * It will fetch all the data of the rated Movies higher than 8.8 and store it in our data.json file and send us a mail on the EmailID provided.
* Output part:`
  * { MovieName, Link and Rating}       **(Best Part - Directly click on that link to watch that Movie)**


