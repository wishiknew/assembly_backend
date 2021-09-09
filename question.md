Overview
The goal is to write a Simple Server in NodeJs that will have only one API.

Given:
A date in milliseconds.
(Optional) museum to ignore

It will return:
The month of the search
The year of the search
The total visitors for the month, not counting the ignored museum
The museum with the highest number of visitors, not counting the ignored museum
The museum with the lowest number of visitors, not counting the ignored museum
The ignored museum.

The Task
Data
LA City keeps this data here. The data can be accessed in a number of ways, is up to you to define the approach
The Problem
Write an API Server on Node JS that has one API call:

GET /api/visitors?date=dateInMilliseconds&ignore=museumToIgnore

The response expected is:

{
    "attendance": {
        “month”: string,
        “year”: number,
        “highest”: {
            “museum”: string,
            “visitors”: number
        },
        “lowest”: {
            “museum”: string,
            “visitors”: number
        },
        “ignored”: {
            “museum”: string,
            “visitors”: number
        },
       “total”: number
    }
}
Example

GET /api/visitors?date=1404198000000

Should return

{
    "attendance": {
        “month”: “Jul”,
        “year”: “2014”,
        “highest”: {
          “museum”: “visitor_center_avila_adobe”,
          “visitors”: 32378,
        }
        “lowest”: {
          “museum”: “hellman_quon”,
          “visitors”: 120,
        },
       total: 60535
    }
}

GET /api/visitors?date=1404198000000&ignore=visitor_center_avila_adobe

Should return

{
    "attendance": {
        “month”: “Jul”,
        “year”: “2014”,
        “highest”: {
          “museum”: “america_tropical_interpretive_center”,
          “visitors”: 13490,
        }
        “lowest”: {
          “museum”: “hellman_quon”,
          “visitors”: 120,
        },
        “ignored”: {
          “museum”: “visitor_center_avila_adobe”,
          “visitors”: 32378,
        }
       total: 28157
    }
}

Notes
It is not necessary to add any type of authentication or authorization to the API.
The museum input parameter can be equal to the value in the data. I.e, “avila_adobe”, “firehouse_museum”, etc
The call on execution time can make a query to the LA City API endpoint. No need to store the LA City response in some intermediate cache for optimization.

Criteria
We will evaluate programs on code quality and output correctness. 

Some aspect to take into consideration:
There are clear comments or self-documenting code
Clear naming conventions
Concise and readable code
Responsibilities are properly broken into multiple class and methods
Error Cases addressed and properly handled
Code is testable.
Code has test coverage.
Submission Notes

Make sure to provide us a link to the repository (Github or Gitlab). 
The repository needs to have the code, but also a readme and installation instructions.
