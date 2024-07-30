# Class Cancellation Notification Card
A simple form card for Ellucian Experience. It is used to notify predefined individuals about class cancellations.

## Requirements
* Ethos Data Access with the `persons` Ethos data model set up.
  * Tested with Colleague only
* An endpoint such as a Power Automate flow or Data Connect Serverless API that accepts the JSON payload for processing.

## Quick Start
Use your favorite Git tool to clone this repository and run: 

```sh
npm install
```

You will also need to set up your `.env` file using the normal method outlined by Ellucian.

## How To Use
On the Ellucian Experience configuration page, edit the card. 

1. In the configuration section, enter the URL the JSON payload will submit to. Submissions use the POST method.
2. Enter the Successful Endpoint HTTP Response Code you expected to be returned as not all endpoints return 200. For example, Power Automate returns a `202`.
3. Enter what you want the submitted text to say if different from default. 
    * Default text is `Thanks for notifying us of your class cancellation. Remember: This is only notifies staff of this cancellation. You will need to notify your students separately.`


## JSON Output Payload Schema
```json
{
    "type": "object",
    "properties": {
        "personId": {
            "type": "string"
        },
        "personEmail": {
            "type": "string"
        },
        "preferredName": {
            "type": "string"
        },
        "cancelDate": {
            "type": "string"
        },
        "cancelTime": {
            "type": "string"
        },
        "subject": {
            "type": "string"
        },
        "number": {
            "type": "string"
        },
        "section": {
            "type": "string"
        },
        "notificationType": {
            "type": "string"
        }
    }
}
```
## Images
![](/docs/images/allClass.jpg)
![](/docs/images/singleClass.jpg)
![](/docs/images/submitted.jpg)


## To Do
* Get sections through Data Access or Data Connect so manual entry is not required.
* Update output payload to be formatted for Ellucian Ethos publishing endpoint and retrieve notice via Ethos data model API call.
* Internationalization fully implemented.