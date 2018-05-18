
# Correl
Correlation station! Choo choo! :station:

## Description
Correl helps you track a symptoms severity with factors you wish to track it with so you can find a link between any factors which cause irritation to your symptom.

## User Journey/User Stories
#### As a user, I can...
- Easily set up an account
- Enter a physical symptom (ie. fatigue, itchy skin)
- Enter an emotional symptom (ie. stress, mood changes)
- Set my own scale to rate my symptoms by a measure that is meaningful to me
- Enter an external factor (ie. water intake, exercise)
- Set my own factor scale to rate external factors in a way that is meaningful to me
- Easily rate my symptom(s) daily using my custom scale
- Easily rate my factor(s) daily using my custom scale
- Decide which data to update and not be required to enter all data

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
- html
- css
- javascript
- d3

## What we've learned
We learned a considerable amount specifically roles and the iterative process of designing an app from scratch. What stands out from what we've learnt:
- [x] Collaborative process in working in small dev teams.
- [x] The importance of the design process and figma sketch up before coding.
- [x] Testing with Travis.
- [x] Use of Handlebars.
- [x] Importance of MVP.

## Team Roles
#### Eade - Scrum Master
#### Jennah - QA
#### Jenath - Devops
#### Tammy - UX
