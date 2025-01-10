# Contributing to Room Booking App

Here’s how to get started:

## Prerequisites

1. Install [Git](https://git-scm.com/): A version control system that allows you to download (clone) the project repository.
2. Install [Node.js](https://nodejs.org/) (we recommend the latest LTS version): A JavaScript runtime that enables you to run the application on your computer.
3. Install a code editor like [Visual Studio Code](https://code.visualstudio.com/):  An application to view and edit the project’s code files.

## Setting Up the Project Locally

1. **Fork the Repository**:  
   - Go to the [Room Booking App Repository](https://github.com/yzzhuo/room-booking-app).  
   - Click on "Fork" to create your copy.
2. **Clone Your Fork**:  
   Copy the repository URL and run the following command in your terminal:  
   ```bash
    git clone https://github.com/your-username/room-booking-app.git
   ```
    For the link above, please replace your-username with your GitHub username.

3. **Navigate to the Project Directory**:
    ```bash
        cd room-booking-app
    ```

4. **Install Dependencies:**
    ```bash
    npm install
    ```

5. **Run the Application:**
    ```bash
    npm run dev
    ```
Open http://localhost:5173/ in your browser.

## How to start development and merge your code
### Branching (Optional if you are using your fork repo)
1. Create a new branch for your work:
```
  git checkout -b feature/your-feature-name
```
Use a descriptive branch name (e.g., feature/room-list-page).

### Pull lastest updates from the original repository (often called "upstream"):
1. First, add the original repository as a remote (you only need to do this once):
``` bash
git remote add upstream https://github.com/yzzhuo/room-booking-app.git
```

2. Fetch all the branches and their respective commits from the upstream repository:
```
git fetch upstream
```

3. Make sure you're on your local main branch:
```
git rebase upstream/main
```
If you run into any merge conflicts, you'll need to resolve them manually. The rebase approach will give you a cleaner history but should only be used if you haven't shared your changes with others yet.

Alternative approach using merge (instead of rebase)

### Submitting Changes
1.	Commit your changes with a clear message:
```
  git add .
  git commit -m "Add feature to filter rooms by availability"
```
you can use your own commit message above for your submission.

2.	Push your branch to GitHub:
```
git push origin feature/your-feature-name
```

3. Open a Pull Request:
- Navigate to your forked repository on GitHub.
- Click the “Compare & pull request” button.
- Provide a clear title and description of your changes.
- Submit the pull request.

4. Aftering the pull request is approved, your code will be merged into the target.