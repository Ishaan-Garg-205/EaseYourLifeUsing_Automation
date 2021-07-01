const pup = require('puppeteer');
const fs = require('fs');
const id1 = "";                             // Use Email id on which you want to send the mail
const password1 = "";                       // Enter Password of that Email Id
let data = [];

main();

async function main() {
    let args = process.argv.slice(2);

    if (args.includes("TrainDetails")) {
        train();
    }
    if (args.includes("TrainStatus")) {
        trainStatus();
    }
    if (args.includes("FlightDetails")) {
        flight();
    }
    if (args.includes("BusDetails")) {
        bus();
    }
    if (args.includes("HotelDetails")) {
        hotel();
    }
    if (args.includes("Weather")) {
        weather();
    }
    if (args.includes("Top50Songs")) {
        song();
    }
    if (args.includes("PopularNews")) {
        news();
    }
    if (args.includes("BestTvShows")) {
        tv();
    }
    if (args.includes("BestMovies")) {
        movie();
    }
}

async function train() {
    const browser = await pup.launch({ headless: false, defaultViewport: null, args: ["--start-maximized"] });
    const page = await browser.newPage();

    await page.goto("https://www.railyatri.in/train-ticket");
    await page.waitForTimeout(2000);

    await page.waitForSelector(".ry-floating-input.focus-input", { visible: true });
    await page.waitForSelector("input#boarding_from");
    await page.type("input#boarding_from", "CHANDIGARH");
    await page.waitForTimeout(2000);
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Tab");

    await page.waitForSelector("input#boarding_to", { visible: true });
    await page.type("input#boarding_to", "PANIPAT");
    await page.waitForTimeout(2000);
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Tab");
    await page.waitForTimeout(5000);
    await Promise.all([page.click("#tt_search_dweb"), page.waitForNavigation()]);

    await page.waitForTimeout(5000);

    let allTrainDetails = await page.evaluate(function () {
        let ans = [];

        let codes = [];
        let names = [];
        let departure = [];
        let arrival = [];
        let duration = [];
        let classWithSeat = [];

        let from = document.getElementById("fromStation_input").value;
        let to = document.getElementById("toStation_input").value;
        let date = document.getElementById("datepicker").value;

        let object = {};

        object['From'] = from;
        object['To'] = to;
        object['Date'] = date;
        ans.push(object);

        let trainInfo = document.getElementsByClassName("TrainInFo-block")
        for (let i = 0; i < trainInfo.length; i++) {
            let code = trainInfo[i].firstElementChild.innerText.split(" ", 1)[0];
            codes.push(code);
            let name = trainInfo[i].firstElementChild.innerText.substring(6);
            names.push(name);
            let timeInfo = trainInfo[i].getElementsByClassName("TravelTimeInfo")[0].innerText.split("\n")
            let dept = timeInfo[0];
            departure.push(dept);

            if (isNaN(timeInfo[2].substring(0, 1))) {
                let dur = timeInfo[4];
                duration.push(dur);
                let arr = timeInfo[6];
                arrival.push(arr);
            } else {
                let dur = timeInfo[2];
                duration.push(dur);
                let arr = timeInfo[4];
                arrival.push(arr);
            }

            let object = {};
            let ticketsdetails = document.getElementsByClassName("SA-layout-block");
            let allTickets = ticketsdetails[i].getElementsByClassName("Open-Seat");
            for (let j = 0; j < allTickets.length; j++) {
                let classRateSeatDetails = allTickets[j].getElementsByClassName("SA-info")[0].innerText.split("\n");
                let classRate = classRateSeatDetails[0];
                let seat = classRateSeatDetails[2];

                object[classRate] = seat;
                classWithSeat.push(object);
            }
        }

        for (let i = 0; i < codes.length; i++) {
            let obj = {};
            obj['Code'] = codes[i];
            obj['Name'] = names[i];
            obj['Class'] = classWithSeat[i];
            obj['Departure'] = departure[i];
            obj['Arrival'] = arrival[i];
            obj['Duration'] = duration[i];
            ans.push(obj);
        }
        return ans;
    });

    let obj = {};
    obj['TRAINS'] = allTrainDetails;
    data.push(obj);
    fs.writeFileSync("data.json", JSON.stringify(data));

    await page.waitForTimeout(3000);
    await page.goto("https://www.gmail.com");
    await page.waitForSelector("#identifierId", { visible: true });
    await page.type("#identifierId", id1);
    await page.waitForSelector(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b", { visible: true });
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForSelector("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", { visible: true });
    await page.type("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", password1);
    await page.waitForTimeout(1000);
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.goto(page.url() + "?compose=new");
    await page.waitForSelector(`textarea[name = "to"]`, { visible: true });
    await page.type(`textarea[name = "to"]`, id1);
    await page.waitForSelector(`input[name='subjectbox']`, { visible: true });
    await page.type(`input[name='subjectbox']`, "TRAIN DETAILS");
    await page.waitForSelector(`[role='textbox']`, { visible: true });

    await page.type(`[role='textbox']`, "Looking From : " + allTrainDetails[0].From + "\n");
    await page.type(`[role='textbox']`, "Looking To : " + allTrainDetails[0].To + "\n");
    await page.type(`[role='textbox']`, "Date of Journey: " + allTrainDetails[0].Date + "\n\n\n");

    await page.waitForSelector(`[role='textbox']`, { visible: true });
    for (let i = 1; i < allTrainDetails.length; i++) {
        await page.type(`[role='textbox']`, "Code: " + allTrainDetails[i].Code + "\n");
        await page.type(`[role='textbox']`, "Name: " + allTrainDetails[i].Name + "\n");
        await page.type(`[role='textbox']`, "Departure: " + allTrainDetails[i].Departure + "\n");
        await page.type(`[role='textbox']`, "Arrival: " + allTrainDetails[i].Arrival + "\n");
        await page.type(`[role='textbox']`, "Duration: " + allTrainDetails[i].Duration + "\n");
        await page.type(`[role='textbox']`, "Classes: " + JSON.stringify(allTrainDetails[i].Class) + "\n\n");
    }

    await page.keyboard.down("Control");
    await page.keyboard.press("Enter");
    await page.keyboard.up("Control");
    await page.waitForTimeout(2000);
    await browser.close();

}



async function trainStatus() {
    const browser = await pup.launch({ headless: false, defaultViewport: null, args: ["--start-maximized"] });
    const page = await browser.newPage();

    await page.goto("https://www.railyatri.in/live-train-status");
    await page.waitForTimeout(2000);

    await page.waitForSelector("input#train_running_status");
    await page.type("input#train_running_status", "02952");                    
    await page.waitForTimeout(2000);

    await page.evaluate(function () {
        document.getElementsByClassName("btn find-train-btn")[0].click();
    });

    await page.waitForNavigation();
    await page.waitForTimeout(2000);
    let NameDate = await page.evaluate(function () {                       
        let ans = [];

        let name = document.getElementsByClassName("col-xs-12 lts-timeline_title")[0].getElementsByTagName("span")[0].innerText;
        let startDate = document.getElementsByClassName("lts-timeline_time-table")[0].getElementsByTagName("span")[0].innerText;
        let obj = {};
        obj['Name'] = name;
        obj['Date'] = startDate;
        ans.push(obj);

        return ans;
    });

    let obj1 = {};
    obj1['TRAIN'] = NameDate;
    data.push(obj1);
    fs.writeFileSync("data.json", JSON.stringify(data));

    let FAQs = await page.evaluate(function () {                                                  
        let quesWithAns = [];

        let ques = [];
        let ans = [];
        let faqs = document.getElementsByClassName("schemaClass")[0].innerText.split("Q");
        for (let i = 1; i < faqs.length; i++) {
            let quesWithAns = faqs[i].split("\n\n");
            ques.push("Q" + quesWithAns[0]);
            ans.push(quesWithAns[1]);
        }
        for (let i = 0; i < ques.length; i++) {
            let obj = {};
            obj['Ques'] = ques[i];
            obj['Ans'] = ans[i];
            quesWithAns.push(obj);
        }
        return quesWithAns;
    });
    
    let obj2 = {};
    obj2['FAQs'] = FAQs;
    data.push(obj2);
    fs.writeFileSync("data.json", JSON.stringify(data));

    let StatusDetails = await page.evaluate(function () {                                          
        let ans = [];

        let station = [];
        let arrival = [];
        let status = [];
        let halts = [];

        let fullinfo = document.getElementsByClassName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");

        for (let i = 0; i < fullinfo.length; i++) {
            let info = fullinfo[i].innerText.split("\t");
            station.push(info[0]);
            arrival.push(info[1]);
            status.push(info[2]);
            halts.push(info[3]);
        }

        for (let i = 0; i < station.length; i++) {
            let obj = {};
            obj['Name'] = station[i];
            obj['Arrival'] = arrival[i];
            obj['Status'] = status[i];
            obj['Halts'] = halts[i];
            ans.push(obj);
        }

        return ans;
    });

    let obj3 = {};
    obj3['Status'] = StatusDetails;
    data.push(obj3);
    fs.writeFileSync("data.json", JSON.stringify(data));

    await page.goto("https://www.gmail.com");
    await page.waitForSelector("#identifierId", { visible: true });
    await page.type("#identifierId", id1);
    await page.waitForSelector(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b", { visible: true });
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForSelector("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", { visible: true });
    await page.type("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", password1);
    await page.waitForTimeout(1000);
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.goto(page.url() + "?compose=new");
    await page.waitForSelector(`textarea[name = "to"]`, { visible: true });
    await page.type(`textarea[name = "to"]`, id1);
    await page.waitForSelector(`input[name='subjectbox']`, { visible: true });
    await page.type(`input[name='subjectbox']`, "TRAIN STATUS");
    await page.waitForSelector(`[role='textbox']`, { visible: true });

    await page.type(`[role='textbox']`, "Code & Name: " + NameDate[0].Name + "\n");
    await page.type(`[role='textbox']`, NameDate[0].Date + "\n\n\n");

    for (let i = 0; i < FAQs.length; i++) {
        await page.type(`[role='textbox']`, FAQs[i].Ques + "\n");
        await page.type(`[role='textbox']`, FAQs[i].Ans + "\n\n");
    }

    for (let i = 0; i < StatusDetails.length; i++) {
        await page.type(`[role='textbox']`, "Station Name: " + StatusDetails[i].Name + "\n");
        await page.type(`[role='textbox']`, "Arrival Time: " + StatusDetails[i].Arrival + "\n");
        await page.type(`[role='textbox']`, "Current Status: " + StatusDetails[i].Status + "\n");
        await page.type(`[role='textbox']`, "Halt Time: " + StatusDetails[i].Halts + "\n\n");
    }
    await page.keyboard.down("Control");
    await page.keyboard.press("Enter");
    await page.keyboard.up("Control");
    await page.waitForTimeout(2000);
    await browser.close();
}





async function flight() {
    const browser = await pup.launch({ headless: false, defaultViewport: null, slowMo: 20, args: ["--start-maximized"] });
    const page = await browser.newPage();

    await page.goto("https://www.makemytrip.com/flights/");
    await page.waitForTimeout(1000);

    await page.click(".fsw_inputBox.searchCity.inactiveWidget");
    await page.click("input#fromCity");
    await page.waitForSelector(".react-autosuggest__input.react-autosuggest__input--open", { visible: true });
    await page.type(".react-autosuggest__input.react-autosuggest__input--open", "Delhi");
    await page.waitForTimeout(2000);
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await page.click(".fsw_inputBox.searchToCity.inactiveWidget ");
    await page.waitForSelector(".react-autosuggest__input.react-autosuggest__input--open", { visible: true });
    await page.type(".react-autosuggest__input.react-autosuggest__input--open", "Varanasi");
    await page.waitForTimeout(2000);
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await page.waitForTimeout(10000);

    await page.evaluate(function () {
        document.getElementsByClassName("makeFlex vrtlCenter")[1].firstElementChild.click();
    });
    await page.waitForNavigation();
    await page.waitForTimeout(5000);

    let allFlightDetails = await page.evaluate(function () {
        let ans = [];

        let names = [];
        let departure = [];
        let arrival = [];
        let duration = [];
        let prices = [];

        let object = {};
        let tripType = document.getElementsByClassName("hsw_inner")[0].getElementsByClassName("hsw_inputBox tripTypeWrapper")[0].innerText.split("\n")[1];
        let details = document.getElementsByClassName("hsw_inner")[0].getElementsByTagName("input");
        let From = details[0].value;
        let To = details[1].value;
        let Date = details[2].value;
        let Return = "";
        if (details[3].value == "") {
            Return += "You are looking for One Way Only"
        } else {
            Return += details[3].value;
        }
        let Requirement = details[4].value;
        object["TripType"] = tripType;
        object["From"] = From;
        object["To"] = To;
        object["Date"] = Date;
        object["Return"] = Return;
        object["Require"] = Requirement;

        ans.push(object);

        let FlightDetails = document.getElementsByClassName("fli-list")

        for (let i = 0; i < FlightDetails.length; i++) {
            let name = FlightDetails[i].getElementsByClassName("listingCard")[0].getElementsByClassName("makeFlex spaceBetween")[0].getElementsByClassName("makeFlex")[1].innerText;
            let timeDetails = FlightDetails[i].getElementsByClassName("listingCard")[0].getElementsByClassName("makeFlex spaceBetween")[0].getElementsByClassName("makeFlex")[3].innerText.split("\n");
            let price = FlightDetails[i].getElementsByClassName("listingCard")[0].getElementsByClassName("makeFlex spaceBetween")[0].getElementsByClassName("makeFlex")[7].innerText.split("\n")[0];

            let depart = timeDetails[0] + " , " + timeDetails[2];
            let journeyTime = timeDetails[4] + " , " + timeDetails[6];

            let arr = "";
            if (timeDetails.length == 11) {
                arr += timeDetails[8] + " , " + timeDetails[10];
            } else {
                arr += timeDetails[8] + " , " + timeDetails[9] + " , " + timeDetails[11];
            }

            names.push(name);
            departure.push(depart);
            duration.push(journeyTime);
            arrival.push(arr);
            prices.push(price);
        }

        for (let i = 0; i < names.length; i++) {
            let obj = {};
            obj['Name'] = names[i];
            obj['Departure'] = departure[i];
            obj['Duration'] = duration[i];
            obj['Arrival'] = arrival[i];
            obj['Price'] = prices[i];
            ans.push(obj);
        }
        return ans;

    })

    let obj2 = {};
    obj2['FLIGHTS'] = allFlightDetails;
    data.push(obj2);
    fs.writeFileSync("data.json", JSON.stringify(data));
    

    await page.waitForTimeout(5000);
    await page.goto("https://www.gmail.com");

    await page.waitForSelector("#identifierId", { visible: true });
    await page.type("#identifierId", id1);
    await page.waitForSelector(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b", { visible: true });
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForSelector("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", { visible: true });
    await page.type("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", password1);
    await page.waitForTimeout(1000);
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.goto(page.url() + "?compose=new");
    await page.waitForSelector(`textarea[name = "to"]`, { visible: true });
    await page.type(`textarea[name = "to"]`, id1);
    await page.waitForSelector(`input[name='subjectbox']`, { visible: true });
    await page.type(`input[name='subjectbox']`, "FLIGHT DETAILS");
    await page.waitForSelector(`[role='textbox']`, { visible: true });
    await page.type(`[role='textbox']`, "Trip Type : " + allFlightDetails[0].TripType + "\n");
    await page.type(`[role='textbox']`, "Looking From : " + allFlightDetails[0].From + "\n");
    await page.type(`[role='textbox']`, "Looking To : " + allFlightDetails[0].To + "\n");
    await page.type(`[role='textbox']`, "Date of Journey: " + allFlightDetails[0].Date + "\n");
    await page.type(`[role='textbox']`, "Return Date: " + allFlightDetails[0].Return + "\n");
    await page.type(`[role='textbox']`, "No. of Person and Class: " + allFlightDetails[0].Require + "\n\n\n");

    await page.waitForSelector(`[role='textbox']`, { visible: true });
    for (let i = 1; i < allFlightDetails.length; i++) {
        await page.waitForSelector(`[role='textbox']`, { visible: true });
        await page.type(`[role='textbox']`, "Name: " + allFlightDetails[i].Name + "\n");
        await page.type(`[role='textbox']`, "Departure: " + allFlightDetails[i].Departure + "\n");
        await page.type(`[role='textbox']`, "Duration: " + allFlightDetails[i].Duration + "\n");
        await page.type(`[role='textbox']`, "Arrival: " + allFlightDetails[i].Arrival + "\n");
        await page.waitForSelector(`[role='textbox']`, { visible: true });
        await page.type(`[role='textbox']`, "Price: " + allFlightDetails[i].Price + "\n\n");
    }
    await page.keyboard.down("Control");
    await page.keyboard.press("Enter");
    await page.keyboard.up("Control");
    await page.waitForTimeout(2000);
    await browser.close();
}




async function bus() {
    const browser = await pup.launch({ headless: false, defaultViewport: null, args: ["--start-maximized"] });
    const page = await browser.newPage();

    await page.goto("https://www.railyatri.in/bus-booking");
    await page.waitForTimeout(2000);

    await page.waitForSelector("input#from-city");
    await page.type("input#from-city", "CHANDIGARH");
    await page.waitForTimeout(1000);
    await page.keyboard.press("Tab");

    await page.waitForSelector("input#to-city", { visible: true });
    await page.type("input#to-city", "PANIPAT");
    await page.waitForTimeout(1000);
    await page.keyboard.press("Tab");
    await page.waitForTimeout(10000);
    await Promise.all([page.click("#gro-bb-search-btn"), page.waitForNavigation()]);

    await page.waitForSelector(".jsx-2082256739.route_normalBusesList__34mnJ.dWebNormalBusList", { visible: true });

    let busesInformation = await page.evaluate(function () {
        let ans = [];

        let names = [];
        let classes = [];
        let departure = [];
        let arrival = [];
        let duration = [];
        let prices = [];
        let seats = [];

        let from = document.getElementById("id1").getAttribute("placeholder");
        let to = document.getElementById("id2").getAttribute("placeholder");
        let date = document.getElementById("nice-dates-input").value;

        let object = {};

        object['From'] = from;
        object['To'] = to;
        object['Date'] = date;
        ans.push(object);


        let busDetails = document.getElementsByClassName("jsx-2082256739 route_normalBusesList__34mnJ dWebNormalBusList")[0].getElementsByClassName("BusListItem_details__b06zp");
        for (let i = 0; i < busDetails.length; i++) {
            let name = busDetails[i].getElementsByClassName("BusListItem_itemLeft__3neT5")[0].innerText.split("\n")[0];
            let classAvailable = busDetails[i].getElementsByClassName("BusListItem_itemLeft__3neT5")[0].innerText.split("\n")[1];

            let timeDetails = busDetails[i].getElementsByClassName("BusListItem_itemMiddle__1QapD")[0].innerText.split("\n");
            let dept = timeDetails[0] + " from " + timeDetails[3];
            let journeyTime = timeDetails[1];
            let arr = timeDetails[2] + " at " + timeDetails[5];

            let price = busDetails[i].getElementsByClassName("BusListItem_itemRight__3mcfs")[0].innerText.split("\n")[1];
            let seat = busDetails[i].getElementsByClassName("BusListItem_itemRight__3mcfs")[0].innerText.split("\n")[2];

            names.push(name);

            if (classAvailable == null) {
                classes.push("Not mentioned on the site");
            } else {
                classes.push(classAvailable);
            }

            departure.push(dept);
            arrival.push(arr);
            duration.push(journeyTime);
            prices.push(price);
            seats.push(seat);
        }

        for (let i = 0; i < names.length; i++) {
            let obj = {};
            obj['Name'] = names[i];
            obj['Class'] = classes[i];
            obj['Departure'] = departure[i];
            obj['Arrival'] = arrival[i];
            obj['Duration'] = duration[i];
            obj['Price'] = prices[i];
            obj['Seat'] = seats[i];
            ans.push(obj);
        }
        return ans;
    });
   
    let obj = {};
    obj['BUSES'] = busesInformation;
    data.push(obj);
    fs.writeFileSync("data.json", JSON.stringify(data));

    await page.waitForTimeout(2000);
    await page.goto("https://www.gmail.com");

    await page.waitForSelector("#identifierId", { visible: true });
    await page.type("#identifierId", id1);
    await page.waitForSelector(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b", { visible: true });
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForSelector("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", { visible: true });
    await page.type("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", password1);
    await page.waitForTimeout(1000);
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.goto(page.url() + "?compose=new");
    await page.waitForSelector(`textarea[name = "to"]`, { visible: true });
    await page.type(`textarea[name = "to"]`, id1);
    await page.waitForSelector(`input[name='subjectbox']`, { visible: true });
    await page.type(`input[name='subjectbox']`, "BUS DETAILS");
    await page.waitForSelector(`[role='textbox']`, { visible: true });

    await page.type(`[role='textbox']`, "Looking From : " + busesInformation[0].From + "\n");
    await page.type(`[role='textbox']`, "Looking To : " + busesInformation[0].To + "\n");
    await page.type(`[role='textbox']`, "Date of Journey: " + busesInformation[0].Date + "\n\n\n");

    await page.waitForSelector(`[role='textbox']`, { visible: true });
    for (let i = 1; i < busesInformation.length; i++) {
        await page.type(`[role='textbox']`, "Name: " + busesInformation[i].Name + "\n");
        await page.type(`[role='textbox']`, "Classes: " + busesInformation[i].Class + "\n");
        await page.type(`[role='textbox']`, "Departure: " + busesInformation[i].Departure + "\n");
        await page.type(`[role='textbox']`, "Arrival: " + busesInformation[i].Arrival + "\n");
        await page.type(`[role='textbox']`, "Duration: " + busesInformation[i].Duration + "\n");
        await page.type(`[role='textbox']`, "Price: " + busesInformation[i].Price + "\n");
        await page.type(`[role='textbox']`, "Seats: " + busesInformation[i].Seat + "\n\n");
    }

    await page.keyboard.down("Control");
    await page.keyboard.press("Enter");
    await page.keyboard.up("Control");
    await page.waitForTimeout(2000);
    await browser.close();

}



async function hotel() {
    const browser = await pup.launch({ headless: false, defaultViewport: null, slowMo: 50, args: ["--start-maximized"] });
    const page = await browser.newPage();

    await page.goto("https://www.yatra.com/hotels");
    await page.waitForTimeout(2000);

    await page.waitForSelector("input#BE_hotel_destination_city");
    await page.click("input#BE_hotel_destination_city");
    await page.type("input#BE_hotel_destination_city", "Zirakpur");
    await page.waitForTimeout(2000);
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    await page.waitForTimeout(10000);

    await Promise.all([page.click("#BE_hotel_htsearch_btn"), page.waitForNavigation()]);
    page.waitForTimeout(2000);

    await page.waitForSelector(".rating-label.txt-greenNew.ng-binding");
    await page.waitForSelector(".rating-label.ng-binding");
    let tripfilter = await page.$$('.rating-label.txt-greenNew.ng-binding');
    let starfilter = await page.$$('.rating-label.ng-binding');
    await starfilter[3].click();
    await starfilter[4].click();
    await page.waitForTimeout(1000);
    await tripfilter[4].click();

    await page.waitForTimeout(3000);

    let allHotelDetails = await page.evaluate(async function () {
        let ans = [];
        let object = {};
        let names = [];
        let locations = [];
        let prices = [];

        let getInputDetails = document.getElementsByClassName("full city-details")[0].innerText.split("\n");
        let Place = getInputDetails[0];
        let Duration = getInputDetails[2];
        let Requirement = getInputDetails[4] + getInputDetails[5];
        object["Place"] = Place;
        object["Duration"] = Duration;
        object["Req"] = Requirement;
        ans.push(object);

        let totalHotels = document.getElementsByClassName("matrix-label uprcse ng-binding")[0].getElementsByClassName("ng-binding")[0].innerText.trim();
        let number = Number(totalHotels.substring(1, totalHotels.length - 1))
        let hotelDetails = document.getElementsByClassName("result-details-wrapper full");
        for (let i = 0; i < number; i++) {
            let name = hotelDetails[i].getElementsByClassName("hotel-name full fs-18 three-dot")[0].innerText;
            let location = hotelDetails[i].getElementsByClassName("hand blue pr mt4")[0].innerText;
            let price = hotelDetails[i].getElementsByClassName("fr show-lt-768 new-theme-price")[0].getElementsByClassName("hotel-price-value hand")[0].getElementsByClassName("bold ng-binding")[0].innerText;

            names.push(name);
            locations.push(location);
            prices.push(price);
        }

        for (let i = 0; i < names.length; i++) {
            let obj = {};
            obj['Name'] = names[i];
            obj['Location'] = locations[i];
            obj['Price'] = prices[i];
            ans.push(obj);
        }

        return ans;
    })

    let obj = {};
    obj['HOTELS'] = allHotelDetails;
    data.push(obj);
    fs.writeFileSync("data.json", JSON.stringify(data));

    await page.goto("https://www.gmail.com");
    await page.waitForSelector("#identifierId", { visible: true });
    await page.type("#identifierId", id1);
    await page.waitForSelector(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b", { visible: true });
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForSelector("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", { visible: true });
    await page.type("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", password1);
    await page.waitForTimeout(1000);
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.goto(page.url() + "?compose=new");
    await page.waitForSelector(`textarea[name = "to"]`, { visible: true });
    await page.type(`textarea[name = "to"]`, id1);
    await page.waitForSelector(`input[name='subjectbox']`, { visible: true });
    await page.type(`input[name='subjectbox']`, "HOTEL DETAILS");
    await page.waitForSelector(`[role='textbox']`, { visible: true });
    await page.type(`[role='textbox']`, "Place Searched: " + allHotelDetails[0].Place + "\n");
    await page.type(`[role='textbox']`, "Dates Looking For: " + allHotelDetails[0].Duration + "\n");
    await page.type(`[role='textbox']`, "My Requirements: " + allHotelDetails[0].Req + "\n\n\n");
    await page.waitForSelector(`[role='textbox']`, { visible: true });

    for (let i = 1; i < allHotelDetails.length; i++) {
        await page.type(`[role='textbox']`, "Name: " + allHotelDetails[i].Name + "\n");
        await page.type(`[role='textbox']`, "Location: " + allHotelDetails[i].Location + "\n");
        await page.type(`[role='textbox']`, "Price: " + allHotelDetails[i].Price + "\n\n");
    }
    await page.keyboard.down("Control");
    await page.keyboard.press("Enter");
    await page.keyboard.up("Control");
    await page.waitForTimeout(2000);
    await browser.close();
}



async function weather() {
    let browser = await pup.launch({ headless: false, defaultViewport: false, args: ["--start-maximized"] });
    const page = await browser.newPage();

    await page.goto("https://www.weather.com");
    await page.waitForTimeout(3000);
    await page.waitForSelector("#LocationSearch_input", { visible: true });
    await page.type("#LocationSearch_input", "Delhi");
    await page.waitForTimeout(3000);
    await page.keyboard.press("Enter");
    await page.waitForSelector(".styles--OverflowNav--3K26b.styles--overflowNav--1CF6b a", { visible: true });
    let items = await page.$$(".styles--OverflowNav--3K26b.styles--overflowNav--1CF6b a");
    let link = await page.evaluate(function (element) {
        return element.getAttribute('href');
    }, items[2]);
    await page.goto("https://www.weather.com" + link);

    await page.waitForSelector(".DetailsSummary--extendedData--aaFeV", { visible: true });
    let detailItems = await page.$$(".DetailsSummary--extendedData--aaFeV");
    let details = [];
    for (let i = 2; i < detailItems.length; i++) {
        let data = await page.evaluate(function (element) {
            return element.innerText;
        }, detailItems[i]);
        details.push(data);
    }

    await page.waitForSelector(".DetailsSummary--daypartName--1Mebr", { visible: true });
    let dateItems = await page.$$(".DetailsSummary--daypartName--1Mebr");
    let dates = [];
    for (let i = 1; i < dateItems.length; i++) {
        let date = await page.evaluate(function (element) {
            return element.innerText;
        }, dateItems[i]);
        dates.push(date);
    }
    await page.waitForSelector(".DetailsSummary--highTempValue--3x6cL", { visible: true });
    let maxItems = await page.$$(".DetailsSummary--highTempValue--3x6cL");
    let maxs = [];
    for (let i = 1; i < maxItems.length; i++) {
        let max = await page.evaluate(function (element) {
            return element.innerText;
        }, maxItems[i]);
        maxs.push(max);
    }
    await page.waitForSelector(".DetailsSummary--lowTempValue--1DlJK", { visible: true });
    let minItems = await page.$$(".DetailsSummary--lowTempValue--1DlJK");
    let mins = [];
    for (let i = 1; i < minItems.length; i++) {
        let min = await page.evaluate(function (element) {
            return element.innerText;
        }, minItems[i]);
        mins.push(min);
    }

    let weather = [];
    let j = 0;
    for (let i = 0; i < mins.length; i++) {
        let obj = {};
        obj['Date'] = dates[i];
        obj['Max'] = maxs[i];
        obj['Min'] = mins[i];
        obj['Summary'] = details[j];
        j++;
        obj['Wind'] = details[j];
        j++;
        weather.push(obj);
    }
   
    let obj = {};
    obj['WEATHER'] = weather;
    data.push(obj);
    fs.writeFileSync("data.json", JSON.stringify(data));
   
    await page.goto("https://www.gmail.com");
    await page.waitForSelector("#identifierId", { visible: true });
    await page.type("#identifierId", id1);
    await page.waitForSelector(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b", { visible: true });
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForSelector("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", { visible: true });
    await page.type("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", password1);
    await page.waitForTimeout(1000);
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.goto(page.url() + "?compose=new");
    await page.waitForSelector(`textarea[name = "to"]`, { visible: true });
    await page.type(`textarea[name = "to"]`, id1);
    await page.waitForSelector(`input[name='subjectbox']`, { visible: true });
    await page.type(`input[name='subjectbox']`, "WEATHER FORECAST");
    await page.waitForSelector(`[role='textbox']`, { visible: true });
    for (let i = 0; i < weather.length; i++) {
        await page.type(`[role='textbox']`, "DATE: " + weather[i].Date + "\n");
        await page.type(`[role='textbox']`, "MAX TEMP: " + weather[i].Max + "\n");
        await page.type(`[role='textbox']`, "MIN TEMP: " + weather[i].Min + "\n");
        await page.type(`[role='textbox']`, "SUMMARY: " + weather[i].Summary + "\n");
        await page.type(`[role='textbox']`, "WIND:  " + weather[i].Wind + "\n\n");
    }
    await page.keyboard.down("Control");
    await page.keyboard.press("Enter");
    await page.keyboard.up("Control");
    await page.waitForTimeout(1000);
    await browser.close();
}


async function song() {
    let browser = await pup.launch({ headless: false, defaultViewport: false, args: ["--start-maximized"] });
    const page = await browser.newPage();
    await page.goto("https://gaana.com/playlist/gaana-dj-hindi-top-50-1");
    await page.waitForSelector(".draggable", { visible: true });
    await page.waitForSelector(".s_l.artworkload._cursor", { visible: true });

    await page.waitForTimeout(20000);
    let songDetails = await page.evaluate(async function () {
        let list = document.getElementsByClassName("s_l artworkload _cursor");
        let songs = [];
        for (let i = 0; i < list.length; i++) {
            let songName = list[i].innerText.split("\n")[1];
            let songArtist = list[i].innerText.split("\n")[2];
            let songDuration = list[i].innerText.split("\n")[3];
            let object = {};
            object['Name'] = songName;
            object['Artist'] = songArtist;
            object['Duration'] = songDuration;
            songs.push(object);
        }
        return songs;
    })

    let obj = {};
    obj['SONGS'] = songDetails;
    data.push(obj);
    fs.writeFileSync("data.json", JSON.stringify(data));
    
    await page.goto("https://www.gmail.com");
    await page.waitForSelector("#identifierId", { visible: true });
    await page.type("#identifierId", id1);
    await page.waitForSelector(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b", { visible: true });
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForSelector("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", { visible: true });
    await page.type("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", password1);
    await page.waitForTimeout(1000);
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.goto(page.url() + "?compose=new");
    await page.waitForSelector(`textarea[name = "to"]`, { visible: true });
    await page.type(`textarea[name = "to"]`, id1);
    await page.waitForSelector(`input[name='subjectbox']`, { visible: true });
    await page.type(`input[name='subjectbox']`, "TOP 50 HINDI SONGS BY GAANA");
    await page.waitForSelector(`[role='textbox']`, { visible: true });
    for (let i = 0; i < songDetails.length; i++) {
        await page.type(`[role='textbox']`, "Song: " + songDetails[i].Name + "\n");
        await page.type(`[role='textbox']`, "Artists: " + songDetails[i].Artist + "\n");
        await page.type(`[role='textbox']`, "Duration: " + songDetails[i].Duration + "\n\n");
    }
    await page.keyboard.down("Control");
    await page.keyboard.press("Enter");
    await page.keyboard.up("Control");
    await page.waitForTimeout(1000);
    await browser.close();
}


async function news() {
    let browser = await pup.launch({ headless: false, defaultViewport: false, args: ["--start-maximized"] });
    const page = await browser.newPage();
    page.goto("https://timesofindia.indiatimes.com/news");
    await page.waitForTimeout(2000);

    let link = await page.evaluate(function() {
        return document.getElementsByClassName("nav-Most Read no-hover")[0].getElementsByTagName("a")[0].href;
    })
    
    await page.goto(link, page.waitForNavigation());
    await page.waitForTimeout(2000);

    let link2 = await page.evaluate(function() {
        return document.getElementById("news-24h").href;
    })
    
    await page.goto(link2, page.waitForNavigation());
    await page.waitForTimeout(2000);

    let newsDetails = await page.evaluate(function() {
        let list = document.querySelectorAll("#itemContainer li");
        let ans = [];
        for (let i = 0; i < list.length; i++) {
            let obj = {};
            let headings = list[i].getElementsByTagName("strong")[0].innerText;
            let link = list[i].getElementsByTagName("strong")[0].getElementsByTagName("a")[0].href;
            obj['Headline'] = headings;
            obj['Link'] = link;
            ans.push(obj);
        }
        return ans;
    })
    
    let obj = {};
    obj['NEWS'] = newsDetails;
    data.push(obj);
    fs.writeFileSync("data.json", JSON.stringify(data));

    await page.goto("https://www.gmail.com");
    await page.waitForSelector("#identifierId", { visible: true });
    await page.type("#identifierId", id1);
    await page.waitForSelector(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b", { visible: true });
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForSelector("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", { visible: true });
    await page.type("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", password1);
    await page.waitForTimeout(1000);
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.goto(page.url() + "?compose=new");
    await page.waitForSelector(`textarea[name = "to"]`, { visible: true });
    await page.type(`textarea[name = "to"]`, id1);
    await page.waitForSelector(`input[name='subjectbox']`, { visible: true });
    await page.type(`input[name='subjectbox']`, "RECENT POPULAR NEWS");
    await page.waitForSelector(`[role='textbox']`, { visible: true });

    for (let i = 0; i < newsDetails.length; i++) {
        await page.type(`[role='textbox']`, "HEADLINE: " + newsDetails[i].Headline + "\n");
        await page.type(`[role='textbox']`, "LINK: " + newsDetails[i].Link + "\n\n");
    }
    await page.keyboard.down("Control");
    await page.keyboard.press("Enter");
    await page.keyboard.up("Control");
    await page.waitForTimeout(2000);
    await browser.close();
}


async function tv() {
    let browser = await pup.launch({ headless: false, defaultViewport: false, args: ["--start-maximized"] });
    const page = await browser.newPage();

    await page.goto("https://www.imdb.com/");
    await page.waitForSelector("#imdbHeader-navDrawerOpen--desktop", { visible: true });
    await page.click("#imdbHeader-navDrawerOpen--desktop");
    await page.waitForSelector(".ipc-list__item.nav-link.NavLink-sc-19k0khm-0.dvLykY.ipc-list__item--indent-one", { visible: true });
    let menus = await page.$$(".ipc-list__item.nav-link.NavLink-sc-19k0khm-0.dvLykY.ipc-list__item--indent-one");
    let link = await page.evaluate(function (element) {
        return element.getAttribute('href');
    }, menus[15]);

    await page.goto("https://www.imdb.com/" + link);
    await page.waitForSelector(".titleColumn a", { visible: true });
    let tvShowNames = await page.$$(".titleColumn a");
    await page.waitForSelector(".ratingColumn.imdbRating strong", { visible: true });
    let tvShowRatings = await page.$$(".ratingColumn.imdbRating strong");
    let tvShows = [];
    let count = 0;
    for (let i = 0; i < tvShowNames.length; i++) {
        let name = await page.evaluate(function (element) {
            return element.innerText;
        }, tvShowNames[i]);
        let link = await page.evaluate(function (element) {
            return element.getAttribute('href');
        }, tvShowNames[i]);
        let rating = await page.evaluate(function (element) {
            return element.innerText;
        }, tvShowRatings[i]);

        if(Number(rating) > 9){
            let obj = {};
            obj['name'] = name;
            obj['Link'] = "https://www.imdb.com" + link;
            obj['Rating'] = rating;
            tvShows.push(obj);
            count++;
        }else{
            break;
        }
    }

    let obj2 = {};
    obj2['TV SHOWS'] = tvShows;
    data.push(obj2);
    fs.writeFileSync("data.json", JSON.stringify(data));

    await page.goto("https://www.gmail.com");
    await page.waitForSelector("#identifierId", { visible: true });
    await page.type("#identifierId", id1);
    await page.waitForSelector(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b", { visible: true });
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForSelector("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", { visible: true });
    await page.type("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", password1);
    await page.waitForTimeout(1000);
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.goto(page.url() + "?compose=new");
    await page.waitForSelector(`textarea[name = "to"]`, { visible: true });
    await page.type(`textarea[name = "to"]`, id1);
    await page.waitForSelector(`input[name='subjectbox']`, { visible: true });
    await page.type(`input[name='subjectbox']`, "TV Shows RATING ABOVE 9 ON IMDB");
    await page.waitForSelector(`[role='textbox']`, { visible: true });
    await page.type(`[role='textbox']`, "There are total " + count + " TV Shows which have rating above 9 on IMDb\n\n");

    for (let i = 0; i < tvShows.length; i++) {
        await page.type(`[role='textbox']`, "NAME: " + tvShows[i].name + "\n");
        await page.type(`[role='textbox']`, "RATING: " + tvShows[i].Rating + "\n");
        await page.type(`[role='textbox']`, "LINK: " + tvShows[i].Link + "\n\n");
    }
    await page.keyboard.down("Control");
    await page.keyboard.press("Enter");
    await page.keyboard.up("Control");
    await page.waitForTimeout(2000);
    await browser.close();
}


async function movie() {
    let browser = await pup.launch({ headless: false, defaultViewport: false, args: ["--start-maximized"] });
    const page = await browser.newPage();

    await page.goto("https://www.imdb.com/");
    await page.waitForSelector("#imdbHeader-navDrawerOpen--desktop", { visible: true });
    await page.click("#imdbHeader-navDrawerOpen--desktop");
    await page.waitForSelector(".ipc-list__item.nav-link.NavLink-sc-19k0khm-0.dvLykY.ipc-list__item--indent-one", { visible: true });
    let menus = await page.$$(".ipc-list__item.nav-link.NavLink-sc-19k0khm-0.dvLykY.ipc-list__item--indent-one");
    let link = await page.evaluate(function (element) {
        return element.getAttribute('href');
    }, menus[2]);
    await page.goto("https://www.imdb.com/" + link);
    await page.waitForSelector(".titleColumn a", { visible: true });
    let moviesNames = await page.$$(".titleColumn a");
    await page.waitForSelector(".ratingColumn.imdbRating strong", { visible: true });
    let movieRatings = await page.$$(".ratingColumn.imdbRating strong");
    let movies = [];
    let count = 0;
    for (let i = 0; i < movieRatings.length; i++) {
        let name = await page.evaluate(function (element) {
            return element.innerText;
        }, moviesNames[i]);
        let link = await page.evaluate(function (element) {
            return element.getAttribute('href');
        }, moviesNames[i]);
        let rating = await page.evaluate(function (element) {
            return element.innerText;
        }, movieRatings[i]);
        if(Number(rating) > 8.8){
            let obj = {};
            obj['Name'] = name;
            obj['Link'] = "https://www.imdb.com" + link;
            obj['Rating'] = rating;
            movies.push(obj);
            count++;
        }else{
            break;
        }
    }

    let obj2 = {};
    obj2['MOVIES'] = movies;
    data.push(obj2);
    fs.writeFileSync("data.json", JSON.stringify(data));
    
    await page.goto("https://www.gmail.com");
    await page.waitForSelector("#identifierId", { visible: true });
    await page.type("#identifierId", id1);
    await page.waitForSelector(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b", { visible: true });
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForSelector("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", { visible: true });
    await page.type("#password .aCsJod.oJeWuf .aXBtI.Wic03c .Xb9hP .whsOnd.zHQkBf", password1);
    await page.waitForTimeout(1000);
    await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.goto(page.url() + "?compose=new");
    await page.waitForSelector(`textarea[name = "to"]`, { visible: true });
    await page.type(`textarea[name = "to"]`, id1);
    await page.waitForSelector(`input[name='subjectbox']`, { visible: true });
    await page.type(`input[name='subjectbox']`, "MOVIES RATING ABOVE 8.8 ON IMDB");
    await page.waitForSelector(`[role='textbox']`, { visible: true });
    await page.type(`[role='textbox']`, "There are total " + count + " movies which have rating above 8.8 on IMDb\n\n");
    for (let i = 0; i < movies.length; i++) {
        await page.type(`[role='textbox']`, "NAME: " + movies[i].Name + "\n");
        await page.type(`[role='textbox']`, "RATING: " + movies[i].Rating + "\n");
        await page.type(`[role='textbox']`, "LINK: " + movies[i].Link + "\n\n");
    }
    await page.keyboard.down("Control");
    await page.keyboard.press("Enter");
    await page.keyboard.up("Control");
    await page.waitForTimeout(1000);
    await browser.close();
}

