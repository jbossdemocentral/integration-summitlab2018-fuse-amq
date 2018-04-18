# L1120 iPaaS Hackathon

Welcome to this hackathon. Putting integration solution together used to take days and you will have to have some sort of coding background to successfully put data from various services together. Today, with Red Hat’s low code iPaaS platform, we will use the minimum number of codes to achieve maximum integration results! 

First of all, give us 15 mins to walk through the tooling platform with you,  so you know where everything is. After that we will let you work on two instructor lead integration scenarios, to get you familiar with the environment, and platform. Then you are free to hack it away! 

## Environment 

### MAP GUI Interface

Go to [http://gui-YOURUSERID-summitlab.opentlc.com](http://gui-YOURUSERID-summitlab.opentlc.com) (TBC). This is where you can use to display the result, and places for you to submit input as well.  To interact You will need to pass/retrive data from messaging queues that are assign to you!

What is the fun of integration if you don’t have API/data? 

### Location API Services

Go to the following links to access  (login with your user id/pwd)

- Restaurant/BAR Locations (TBA)
- ATM Locations (TBA)
- Parking locations (TBA)
- ER/Hospital Locations (TBA)
- Landmarks Locations (TBA)



### Schema in Database: (TBC)
To make things more interesting, you will have access to the local conference meetup location in the Database. 

- Schema Name: sampledb 
- Table Name: meetups

| Column name | Data Type | Description |
|---|---|---|
| meetupid | int | Unique ID number |
| meetupname | varchar(100) | Name of the meetup |
| lng | decimal | Longitude of the meetup location |
| lat | decimal | Latitude of the meetup location |
| desc | text | Short Description of meetups  |


### Other Services

To step up the game, you can also use the following services for 

- **Amazon S3**
More details to come!  (DISCUSSION: Do we set this up for audience or they do it on their own)

- **Twilio**
More details to come!  (DISCUSSION: Do we set this up for audience or they do it on their own)



![Lab Environment](images/labenv.png)


### Deployment on AMQ Online

We will have ONE single Topic that everyone listen to for announcement! 

- 1 queue for __display__
- 1 queue for __input__
- 1 queue for __location display in map__
- 1 queue for __route display in map__
- 3 queues in case the participants needs it, __temp queues__


![Broker Env](images/msgenv.png)

## Working with GUI

![Working with GUI](images/gui.png)

### Communicating to Display Panel 
To display messages in the display panel, you will need to send the text into the receiving messaging broker queue. And you will need to follow the data format listed below: 

```
{
  "Color":"red",
  "UserName":"Christina",
  "Content":"this is the message for everyone!!"
}
```


### Showing location in Map
Map allows you to ping point and mark multiple locations, the location can be set by passing into a messaging broker queue with the data format below:

### Showing route in Map
To add route in the map, simply pass in the route data below into a messaging broker queue:

### Data from Input
Inputs are collected and formatted into a messaging broker queue ready for you to process after submitting it with the submit button. An example of the data is show below:

```
{
  "type":"accouncement",
  "content": [{"this is the message for everyone!!"}]
}
```

or 

```
{
  "type":"forSurroundingATM",
  "Content":[
    { "bankid":"",
	   "location": {"lng":3.444,"lat":6.643}
	 }
  ]
}
```

## First Hack - Data Shapes and Data Mapper
-Instructor lead-

![Working with GUI](images/hack-01-01.png)

Publishing and receiving from announcement topic!

Announcement Topic Datashape: 

```
{
  "type":"accouncement",
  "content": [{"this is the message for everyone!!"}]
}
```


![Working with GUI](images/hack-01-02.png)

```
{
  "Color":"red",
  "UserName":"Christina",
  "Content":"this is the message for everyone!!"
}
```

## Second Hack
(Instructor lead)
Showing all ATM locations



## Off you go! 
Have fun Hacking!