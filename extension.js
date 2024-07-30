const helper = require('./src/i18n/manifest.helper.js');

module.exports = {
    name: 'ClassCancellationNotification',
    publisher: 'Three Rivers College',
    cards: [{
        type: 'FormsCard',
        source: './src/cards/ClassCancellation.jsx',
        title: 'Class Cancellation Notification',
        displayCardType: 'Forms Card',
        description: 'This card is used to send class cancellation notifications to a predefined group of people.',
        configuration: {
            client:[
                {
                    key: 'notificationUrl',
                    label: 'Endpoint URL',
                    type: 'url',
                    required: true
                },
                {
                    key: 'responseCode',
                    label: 'Successful Endpoint HTTP Response Code',
                    type: 'text',
                    required: true
                },
                {
                    key: 'submitText',
                    label: 'Custom Submit Text',
                    type: 'text',
                },
            ]
        }
    }],
    queries: {
        'getPerson': [
            {
                'resourceVersions': {
                    'persons': { min: 12 }
                },
                'query':
                    `query getPerson($personId: ID){
                        persons: {persons} (filter: {id: {EQ: $personId}
                                }
                            ) 
                            {
                                edges {
                                    node {
                                        credentials {
                                            type
                                            value
                                        }
                                        names {
                                            preference
                                            fullName
                                        }
                                        emails {
                                            type {
                                                emailType
                                            }
                                            emailAddress :address
                                        }
                                    }
                                }
                            }
                    }`
            }
        ]
    }
};