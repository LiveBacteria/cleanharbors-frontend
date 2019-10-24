# Work Server Frontend | Cleanharbors Frontend
An electron based frontend that interfaces with the [Work Api Server](https://github.com/LiveBacteria/work-api-server) I created.

## Usage
*Be sure to have run `npm i` before attempting use.*

***This application will only work while being logged in, and on Clean Harbors intrasite.***

On the initial launch, you may be required to log into the Clean Harbors intrasite.

Upon application launch, there will be a number of page redirects. After, the landing page will be a login request form.

### Login
The login for demonstration purposes is as follows:
```
user: Livebacteria
password: demoAuth
```
### How to Obtain DVIR Lists
For demonstration purposes this list can be used:
```
8750917,8751334,8752243,8753939,8756627,8760144,8762537,8765824,8767577,8771431
```

Search parameters are `Asset Number: 1031`, `Start Date: 10/14/2019`,`End Date: 10/20/2019`

Utlizing Cleanharbors WinWeb DVIR Search, enter a unit number and a date. Then, please check the `Select All` checkbox and click `Print DVIR`. This will open a new tab or window, with a URL that contains the list of DVIR numbers. Please select all the DVIR numbers and copy them. 

You now have a list of DVIRs on specified search results.

### Using DVIR Lists with the Application
Now that we have a predefined list of DVIRs. We can simply paste these values directly into the DVIR entry field and click `Start`.

*As this application is essentially in a pre-Aplha state, please allow 2 minutes up to 5 minutes for it to complete its task.*

Once the server shows it is no longer recieving data, click `Finished!`. This will open a new electron window, this will take a moment as the server compiles all the given PDF into a zip file for distribution.

Once the zip file has been downloaded, please close down the application and relaunch to complete another process.

## Features
* Mass DVIR download

## Future Features
* Server choice, local or secure cloud
* Application choice, Mass DVIR, Mass APR, Mass ELD, Weekly Duties

The backend can be found here: 
[Backend](https://github.com/LiveBacteria/work-api-server)
