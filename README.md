# EaseYourLifeUsing_Automation
**Install Puppeteer**                                   // Command ---> npm i puppeteer

**Video Link:**
https://drive.google.com/drive/folders/1mp0ZiKChcsR-j81kjL1WvF4yb_VntMw-?usp=sharing

**Recommendation:**
Use your Email-Id and password in 3rd and 4th line respectively of the script.
Must go through ReadMe File once. This file looks big but it's very easy and will clear everything about each functionality of this project.

**Code:**
Use automation.js file

**I have made a project which is based on Automation using puppeteer.** 

                  10 Major Functionalities
**1. Send list of Train Details to the email address.                                     Site Used : railyatri.in
**2. Send the Current Status of Particular Train to the email address.                    Site Used : railyatri.in
**3. Send list of Flight Details to the email address.                                    Site Used : makemytrip.com**
**4. Send list of Bus Details to the email address.                                       Site Used : railyatri.in**
**5. Send list of Hotel Details to the email address.                                     Site Used : yatra.com**
**6. Send Weather Forecast of the next 14 days to the email address.                      Site Used : weather.com**
**7. Send list of Top 50 Songs to the email address.                                      Site Used : gaana.com**
**8. Send the list of Most popular News of last 24 Hours to the email address.            Site Used : timesofindia.com**
**9. Send list of Best TV Shows whose rating is above 9 to the email address.             Site Used : imdb.com**
**10.Send list of Best Movies whose rating is above 8.8 to the email address.             Site Used : imdb.com**

***Stores all the sent data locally also.



**Brief about code and video:**

I ran each function one by one because of my internet speed. You can ran it asynchronously my making some changes in the code using args values and count function.

I have made this project by keeping this in mind that if someone wants to go on a trip so he can get all the necessary details. like if someone wants to go by train so he can get the train details and also he can check the current status of that train or any other train. He or she can also check the bus or flight details. Then he can also check, details of all the hotels present at their destination point. He can check the weather details of that city so to plan accordingly.
He can also get the list of top 50 songs to listen during his journey. 
He can also get the links of Best Rated Movies, TV Shows and Popular News.


Let’s look each of these one by one.


**1. Train Details**
                        `Code part:`
In my code, I have already mentioned the places i.e. From Chandigarh to Panipat.                      // You can change these names also

                      `Terminal part:`
node automation.js TrainDetails                                                                       // TrainDetails is the keyword which I have used, you can change it also

                       `Video part:`
Just pick any date you want else leave it as it is. It will fetch all the data and store it in our data.json file and send us a mail on the EmailID provided.
                        
                      `Output part:`
1. From Station,    2. To Station,    3. Date,    4. {Code, TrainName, Departure, Arrival, Duration, Classes with Prices and Seat Availability}



**2. Train Status**
                        `Code part:`
In my code, I have already mentioned the code No. of train i.e. 02952                                  // You can change this code Number

                      `Terminal part:`
node automation.js TrainStatus                                                                         // TrainStatus is the keyword which I have used, you can change it also

                       `Video part:`
It will fetch all the data and store it in our data.json file and send us a mail on the EmailID provided.
                        
                      `Output part:`
1. Code,    2. Train Name,    3. Date Started,    4. FAQs with updated answer (best part),      5. Details of each station {Station Name, Arrival, Current Status, Halt Time} 



**3. Flight Details**
                        `Code part:`
In my code, I have already mentioned the places i.e. From Delhi to Varanasi.                         // You can change these names also

                      `Terminal part:`
node automation.js FlightDetails                                                                     // FlightDetails is the keyword which I have used, you can change it also

                       `Video part:`
Just pick any date you want else leave it as it is. Also can select no. of passengers and class else leave it as it is. It will fetch all the data and store it in our data.json file and send us a mail on the EmailID provided.
                        
                      `Output part:`
1. Trip Type,   2. From,    3. To,    4. Date,    5. Return,    6. Our Requirement   7. {FlightName, Departure, Arrival, Duration, Price} 



**4. Bus Details**
                        `Code part:`
In my code, I have already mentioned the places i.e. From Chandigarh to Panipat.                        // You can change these names also

                      `Terminal part:`
node automation.js BusDetails                                                                           // BusDetails is the keyword which I have used, you can change it also

                       `Video part:`
Just pick any date you want else leave it as it is. It will fetch all the data and store it in our data.json file and send us a mail on the EmailID provided.
                        
                      `Output part:`
1. From Station,    2. To Station,    3. Date,    4. {Name, Departure, Arrival, Duration, Classes with Prices and Seat Availability}




**5. Hotel Details**
                        `Code part:`
In my code, I have already mentioned the place i.e. looking in Zirakpur.                              // You can look for any other place also

                      `Terminal part:`
node automation.js HotelDetails                                                                       // HotelDetails is the keyword which I have used, you can change it also

                       `Video part:`
Just pick check-in and check-out date you want, else leave it as it is. Also can add members and rooms. It will fetch all the data and store it in our data.json file and send us a mail on the EmailID provided.
                        
                      `Output part:`
1. Place Looking For,    2. Dates,    3. Our Requirements,    4. {Name, Location and Price}           // (Also give us details of nearby places ------- Best Part)



**6. Weather Forecast**
                        `Code part:`
In my code, I have already mentioned the place i.e. looking for Delhi.                                // You can look for any other place also

                      `Terminal part:`
node automation.js Weather                                                                            // Weather is the keyword which I have used, you can change it also

                       `Video part:`
It will fetch all the data of next 14 Days and store it in our data.json file and send us a mail on the EmailID provided.
                        
                      `Output part:`
1. { Date, Max Temperature, Min Temperature, Season/Summary, Wind Speed and Direction}



**7. Top 50 Songs**
                      `Terminal part:`
node automation.js Top50Songs                                                                          // Top50Songs is the keyword which I have used, you can change it also

                       `Video part:`
It will fetch all the data of next top 50 songs and store it in our data.json file and send us a mail on the EmailID provided.
                        
                      `Output part:`
1.{ Song Name, Artists Name and Duration}



**8. Popular News**
                      `Terminal part:`
node automation.js PopularNews                                                                         // PopularNews is the keyword which I have used, you can change it also

                       `Video part:`
It will fetch all the data of the Most Readed news in the last 24 hours and store it in our data.json file and send us a mail on the EmailID provided.
                        
                      `Output part:`
1.{ HeadLine and Link}                                                                             // (Best Part) - Directly click on that link to get full info. of that news



**9. Best Tv Shows**
                        `Code part:`
In my code, I have already mentioned the rating i.e. looking for above 9.                             // You can remove this or can look for another rating as well

                      `Terminal part:`
node automation.js BestTvShows                                                                        // BestTvShows is the keyword which I have used, you can change it also

                       `Video part:`
It will fetch all the data of the rated TV Show higher than 9 and store it in our data.json file and send us a mail on the EmailID provided.
                        
                      `Output part:`
1.{ TvShowName, Link and Rating}                                                                    // (Best Part) - Directly click on that link to watch that Tv Show



**10. Best Movies**
                        `Code part:`
In my code, I have already mentioned the rating i.e. looking for above 8.8.                             // You can remove this or can look for another rating as well

                      `Terminal part:`
node automation.js BestMovies                                                                        // BestMovies is the keyword which I have used, you can change it also

                       `Video part:`
It will fetch all the data of the rated Movies higher than 8.8 and store it in our data.json file and send us a mail on the EmailID provided.
                        
                      `Output part:`
1.{ MovieName, Link and Rating}                                                                    // (Best Part) - Directly click on that link to watch that Movie


