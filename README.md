# L1120 iPaaS Hackathon

Welcome to this hackathon. Putting integration solution together used to take days and you will have to have some sort of coding background to successfully put data from various services together. Today, with Red Hat’s low code iPaaS platform, we will use the minimum number of codes to achieve maximum integration results! 

First of all, give us 15 mins to walk through the tooling platform with you,  so you know where everything is. After that we will let you work on two instructor lead integration scenarios, to get you familiar with the environment, and platform. Then you are free to hack it away! 

## Setup Environment

### Add API Connectors

There are five SaaS location service provided, you will need to setup up in Fuse to use it, here is how. [Click me](CUSTOMAPICONNECTOR.md)

### Add Technical Extension

To step up, you can also use the following services for follow this [Link](TECHEXTENSION.md) to install the tech extension. 

- **Log**

This extension allows you to determin what to show in the log

![Log](docs/images/tech-extension-log.png)

- **Twilio**

This extension allows you to send text message, you can define things to send by defining the input and sender message.

![Twilio](docs/images/tech-extension-twilio.png)


- **Location List format**

Turns all the API data list into the format that is needed by GUI.

![Location List Format](docs/images/tech-extension-location-list-format.png)


- **Remove Camel Header**

Removes the Camel header

![Remove Header](docs/images/tech-extension-removeheader.png)


## Environment 

### MAP GUI Interface

Go to [http://gui-YOURUSERID-summitlab.opentlc.com](http://gui-YOURUSERID-summitlab.opentlc.com) (TBC). This is where you can use to display the result, and places for you to submit input as well.  To interact You will need to pass/retrive data from messaging queues that are assign to you!

What is the fun of integration if you don’t have API/data? 

### Location API Services

Go to the following links to access  (login with your user id/pwd)

- **Restaurant Locations** d2b8f9e059c2bbfc1a5c7b1cb8115d60
- **ATM Locations**  b88456bf863608f5b79324eae13a4e46
- **Parking locations** 73917fb7c1c8d7142a5db4d6f0ec4a97
- **Bar locations**  f6ba725532f6797d5dc7afbf8c012c20
- **Store locations** b62940ff7a175691e0396b28ceaa0bf4

https://fusedemo.3scale.net/docs



![Lab Environment](docs/images/labenv.png)


### Deployment on AMQ Online

We will have ONE single Topic that everyone listen to for announcement! 

- 1 queue for __display__
- 1 queue for __input__
- 1 queue for __location display in map__
- 1 queue for __route display in map__
- 3 queues in case the participants needs it, __temp queues__


![Broker Env](docs/images/msgenv.png)



### Working with GUI

![Working with GUI](docs/images/gui.png)

### Communicating with the Notifications Display 
To display messages in the notifications widget, you will need to send the text into the receiving message broker topic. And you will need to follow the data format listed below: 

```
{
  "type": "Success",
  "header": "Christina",
  "message": "This is the message for <strong>everyone</strong>!!"
}
```

Message body allows non-abusive use of HTML. You can use one of the following message types:

* Info
* Success
* Warning
* Danger


### Showing Locations in the Map
Map allows you to pin point and mark multiple locations, the location can be set by passing into the receiving message broker queue with the data format below:

````
[
   {
      "location":{
         "lat":37.784323,
         "lng":-122.40069
      },
      "title":"Moscone Center",
      "type":"Point of Interest",
      "id":"109"
   },
   {
      "location":{
         "lat":37.785905,
         "lng":-122.413022
      },
      "title":"Hilton Union Square",
      "type":"Hotel",
      "id":"203"
   }
]
````


### Data from Input
Inputs are collected and formatted into a messaging broker queue ready for you to process after submitting it with the submit button. An example of the data is show below:

```
{
  "type": "announcement",
  "content": {
    "title": "Tester",
    "text": "This is the message for everyone!!"
  }
}
```



## First Hack - Data Shapes and Data Mapper
-Instructor lead-

Publishing input and receiving from announcement topic!
![Working with GUI](docs/images/hack-01-01.png)
![Working with GUI](docs/images/hack-01-02.png)

- Add connection for messaging broker for Input queue and announcement topic
Select the **Connections** on the side menu, and click on **Add Connection** button on the top right hand corner.
![AMQP Connection Setup](docs/images/amqp-connection-01.png)

Click on the AMQP Connector.
![AMQP Connection Setup](docs/images/amqp-connection-02.png)

Configure your AMQP settings accordingly, all the information should be avaliable in your OSE env, within the Broker's secret setting. 

   	- Connection URL : amqp://*messagingHost* 
   	- User Name: *username*
   	- Password: *password*
   	- Check Certificate: *Disable*

And click **Next** when done. 

![AMQP Connection Setup](docs/images/amqp-connection-04.png)
![AMQP Connection Setup](docs/images/amqp-connection-03.png)

Give a name to your broker connection, and click **create** 
![AMQP Connection Setup](docs/images/amqp-connection-05.png)

- **Create new integration**. Select the **Integration** on the side menu, and click on **Create Integration** in the center.

![Integration hack one](docs/images/hackone-integration-01.png)

- Select <YOUR_BROKER_CONNECTION> .
![Integration hack one](docs/images/hackone-integration-02.png)

- Select *subscribe for messages action*. 
![Integration hack one](docs/images/hackone-integration-03.png)

- Configure the name of the queue to listen
	- Destination Name: inputs
	- Destination Type: Queue 
![Integration hack one](docs/images/hackone-integration-04.png)

- Configure the Output data type,  
  	- Select Type: JSON Instance
	- Definition: 
	
```
{
  "type": "announcement",
  "content": {
    "title": "Tester",
    "text": "This is the message for everyone!!"
  }
}
```
![Integration hack one](docs/images/hackone-integration-05.png)

- For end connector setting, and select the <YOUR_BROKER_CONNECTION>   
![Integration hack one](docs/images/hackone-integration-06.png)

- Select *Publish messages action*. 
![Integration hack one](docs/images/hackone-integration-07.png)

- Configure the name of the queue to listen
	- Destination Name: notifications
	- Destination Type: Queue 
![Integration hack one](docs/images/hackone-integration-08.png)

- Configure the Output data type,  
  	- Select Type: JSON Instance
	- Definition: 
	
```
{
  "type": "Success",
  "header": "Christina",
  "message": "This is the message for <strong>everyone</strong>!!"
}
```	
![Integration hack one](docs/images/hackone-integration-09.png)

- Select *Add a Step* in the center
![Integration hack one](docs/images/hackone-integration-10.png)

- Select *Data Mapper* in action
![Integration hack one](docs/images/hackone-integration-12.png)

- Add two contant by clicking in the Source column **"+"** of *Constants* drop down menu. 
	- <YOUR_NAME>
	- Warning 
![Integration hack one](docs/images/hackone-integration-11.png)

- Drag and connect from Source to Target and click in **Done**
	- Custom -> Content -> text **to** message
	- Constants -> <YOUR_NAME>  **to** header
	- Constants -> Warning **to** type 
![Integration hack one](docs/images/hackone-integration-13.png)

- Give a name to integration and click in **Finish**
![Integration hack one](docs/images/hackone-integration-14.png)








## Second Hack

-Instructor lead-

Showing all Parking locations has the most cheap rate

![Second Hack](docs/images/hack-02-01.png)


- Add connection for messaging broker for Input queue if you have not done so from the previous hack

- Add API swagger to create API 

- Add Tech Extension  
 
- Add connection for API and Tech Extension 

- Add new integration

- From broker connection with following datashapes

```
{
  "type": "announcement",
  "content": {
    "title": "Tester",
    "text": "This is the message for everyone!!"
  }
}
```

- Data Mapper 

(TBA) Screen Shoot

- To externalbroker connection with following datashapes

```
{
  "username":"accouncement",
  "content": "this is the message for everyone!!"
}
```


## Off you go 
Have fun Hacking!