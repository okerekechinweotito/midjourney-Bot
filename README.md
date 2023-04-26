# Twitter Bot Template

### To setup and run the program locally
1. Setup a [Twitter Developer](https://developer.twitter.com) account, you can follow the instructions [down here](#to-create-a-twitter-developer-account)
2. Create a new project with a new app in the Twitter developer portal
3. Clone this repository, or create your own repo using this as a template
4. Create a `.env` file and fill it out with tokens & keys from your Twitter dev account (use the provided `.env-example` file as a reference)
5. From the base directory, run `npm install` to install the necessary packages
6. Also from the base directory, run `node index.js` to run the script and send a tweet
7. Add some of your own logic in the `handleTweet()` function and test it out!

### To automagically send tweets on a schedule
1. Push your newly created repository to a remote Github repo
2. Add the environment variables securely
    1. On your repository page on Github, select the Settings tab
    2. On the left side under the Security header, open the Secrets dropdown and select Actions
    3. Select the green "New repository secret" button
    
    ![image](https://user-images.githubusercontent.com/42755431/208821499-2e7d1a16-436a-4f9d-bc26-c51549c6c832.png)
    
    4. For the Name, enter `ENV_FILE`
    5. For the Secret, paste the exact contents of your local `.env` file (don't worry, it's secure)
    
    ![image](https://user-images.githubusercontent.com/42755431/208821679-0cf0b22b-cf5f-43de-863d-ca35a97c852d.png)
    
    6. Select the green "Add secret" button
3. Create a Github Action (if you're already familiar with Github Actions, skip to step v for the yml code)

    1. On your repository page on Github, select the Actions tab
    2. On the left side, select the "New workflow" button
    3. At the top, under the "Choose a workflow" header, select the blue link which says "set up a workflow yourself"
    4. You're now creating a new file, you can leave the name as the default `main.yml`
    5. For the content of the file, paste the following code:
    
    ```yml
    name: send-tweet
    on: workflow_dispatch
    jobs:
      tweet:
        runs-on: ubuntu-latest
        strategy:
          matrix:
            node-version: [16.x]

        steps:
          - uses: actions/checkout@v3
          - name: Use Node.js ${{ matrix.node-version }}
            uses: actions/setup-node@v3
            with:
              node-version: ${{ matrix.node-version }}
          - run: npm ci
          - run: npm i
          - run: echo "${{ secrets.ENV_FILE }}" > .env
          - run: node index.js
    ```
    6. In the top right, select "Start commit", and then "Commit new file"
4. Run your Github Action
5. Change `on: workflow_dispatch` to a cron schedule set to your desired schedule:
```yml
on:
  schedule:
    # Runs "at minute 55 past every hour" (see https://crontab.guru)
    - cron: '55 * * * *'
```

### To create a Twitter Developer account
1. Create new twitter account for your bot
2. Head to https://developer.twitter.com
3. Sign up button
4. In the "What's your use case?" section, select "Making a bot" and Continue
5. Verify your email
6. Enter a name for your app
7. Write all of the secrets and keys down! These are used in your `.env` file
8. Continue to the Dashboard
9. TODO: Instructions on how to change token access from `read only` to `read & write`
