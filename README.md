# Correl
Correlation station! Choo choo! :station:

See it here: https://correl-symptom-tracker.herokuapp.com/

## Description
Correl is an application that allows users to enter symptoms they are suffering with and potentially contributing factors to  see any correlations between them over time.

## User Journey/User Stories
#### As a user, I can...
- Easily set up an account
- Enter a symptom (ie. fatigue, itchy skin, stress)
- Enter an external factor (ie. water intake, exercise)
- Customise my scale to rate symptoms and factors in a way that is meaningful to me
- Easily rate my symptom(s) and factor(s) daily using my custom scale
- See a graph of my symptom and factor ratings over time
- Choose which data I want to show on my graph
- Find clear instructions on how to use the application

## Gitflow

 - assign yourself to an issue and add `in-progress` label :traffic_light:
 - starts work on issue
 - commit work referencing issue add maybe adds an [emoji](https://gitmoji.carloscuesta.me/) :smile:
 - create a pull request
     - reference issue
     - add description of work completed
     - `assign` all of your team
     - if you are still working on the PR add [WIP] to the title (work in progress)
- __everybody__ in the team reviews the PR - **IMPORTANT!!!** :warning:
- the creator of the PR should respond to all the questions and/or make changes requested (or say why don't want to change has to be a good reason)
- the final team member to review should `assign` the QA and add `awaiting-review` label :clock1:
- the QA will review and reassign the creator of the PR and unassign themself :wave:
- this step repeats until the PR can be merged :twisted_rightwards_arrows: and the branch deleted :x:

## Setting up project locally
1. `git clone https://github.com/fac-13/correl.git`
2. `npm install`
3. run this command in the terminal (requires postgres installed): `createdb correl`
4.  `\i [copy full file path to dbbuild.sql]`
5. create config.env
	- `DB_URL=postgres://[username]:[password]@localhost:5432/correl`
	- `TEST_DB_URL=postgres://[username]:[password]@localhost:5432/correl`
	- run the app: `npm start`

## Tech Stack
- Express
- Handlebars
- d3
- PostgreSQL
- HTML/CSS
- Tape/Supertest


## What we've learned
We learned a considerable amount about the iterative process of designing an app from scratch. What stands out from what we've learned:
- [x] Collaborative process in working in small dev teams
- [x] The various roles in a development team (ie. Scrum Master, QA, Devops, UX, etc)
- [x] Using User Journeys/Problem Statements to guide a project and fine tune the end product
- [x] The importance of the design process and figma sketch up before coding
- [x] Testing with Travis
- [x] Importance of MVP
- [x] Benefits of Technical Spikes

## Team Roles
#### Eade - Scrum Master
#### Jennah - QA
#### Jenath - Devops
#### Tammy - UX
