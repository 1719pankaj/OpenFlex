# OpenFlex: Step-by-Step Setup Guide 🛠️

Welcome to OpenFlex! This guide will walk you through every step to get your personalized portfolio website up and running. We'll assume you're starting from scratch, so don't worry if you're new to some of these tools!

## Table of Contents

1.  [Prerequisites: What You'll Need](#1-prerequisites-what-youll-need)
2.  [Step 1: Get the OpenFlex Code (Fork & Clone)](#2-step-1-get-the-openflex-code-fork--clone)
    *   [Forking the Repository](#forking-the-repository)
    *   [Cloning Your Fork](#cloning-your-fork)
3.  [Step 2: Install Necessary Software (if you haven't already)](#3-step-2-install-necessary-software)
4.  [Step 3: Set Up the Project](#4-step-3-set-up-the-project)
5.  [Step 4: Customize Your Portfolio (Edit `resume-data.json`)](#5-step-4-customize-your-portfolio-edit-resume-datajson)
    *   [Understanding JSON](#understanding-json)
    *   [Editing the File](#editing-the-file)
    *   [Help! I Got an Error After Editing! (JSON Validation)](#6-help-i-got-an-error-after-editing-json-validation)
6.  [Step 5: See Your Changes Locally](#7-step-5-see-your-changes-locally)
7.  [Step 6: Save Your Changes to GitHub](#8-step-6-save-your-changes-to-github)
8.  [Step 7: Deploy Your Website to the World with Vercel](#9-step-7-deploy-your-website-to-the-world-with-vercel)
9.  [Step 8: Get a Free Custom Domain (e.g., `yourname.is-a.dev`)](#10-step-8-get-a-free-custom-domain-eg-yournameis-a-dev)
10. [Troubleshooting & Support](#11-troubleshooting--support)

---

## 1. Prerequisites: What You'll Need

Before we start, make sure you have:

*   A **GitHub account**: If you don't have one, sign up at [github.com](https://github.com/). It's free!
*   **Git** installed on your computer: This is a version control system. [Download Git here](https://git-scm.com/downloads).
*   **Node.js and npm** installed on your computer: Node.js is a JavaScript runtime, and npm is its package manager. We recommend the LTS version. [Download Node.js and npm here](https://nodejs.org/) (npm comes with Node.js).

You can check if you have Git and Node.js/npm installed by opening a terminal (Command Prompt, PowerShell, or Terminal on Mac/Linux) and typing:
`git --version`
`node -v`
`npm -v`
If you see version numbers, you're good to go!

---

## 2. Step 1: Get the OpenFlex Code (Fork & Clone)

You need to make your own copy of the OpenFlex project before you can customize it.

### Forking the Repository

"Forking" creates a personal copy of the OpenFlex repository under your GitHub account.

1.  Go to the main OpenFlex GitHub page: [https://github.com/1719pankaj/OpenFlex](https://github.com/1719pankaj/OpenFlex) (Replace `1719pankaj/OpenFlex` with the correct repository URL if it's hosted elsewhere).
2.  In the top-right corner of the page, click the **"Fork"** button.
    ![GitHub Fork Button](https://docs.github.com/assets/cb-23088/images/help/repository/fork-button.png)
3.  If prompted, select your GitHub account as the destination for the fork.
4.  GitHub will create a copy of the repository under your account (e.g., `https://github.com/YOUR_USERNAME/OpenFlex`).

### Cloning Your Fork

"Cloning" downloads the forked repository from your GitHub account to your computer.

1.  On your forked repository page on GitHub (e.g., `https://github.com/YOUR_USERNAME/OpenFlex`), click the green **"< > Code"** button.
2.  Make sure **HTTPS** is selected, and then click the **copy icon** next to the URL. This copies the repository URL.
    ![GitHub Clone Button](https://docs.github.com/assets/cb-23088/images/help/repository/code-button.png)
3.  Open your terminal (Command Prompt, PowerShell, or Terminal on Mac/Linux).
4.  Navigate to the directory where you want to save the project. For example, to go to your Desktop:
    ```bash
    cd Desktop
    ```
5.  Type `git clone` and then paste the URL you copied. It should look like this:
    ```bash
    git clone https://github.com/YOUR_USERNAME/OpenFlex.git
    ```
    Replace `YOUR_USERNAME` with your actual GitHub username.
6.  Press Enter. Git will download the project files into a new folder named `OpenFlex`.

---

## 3. Step 2: Install Necessary Software (if you haven't already)

If you skipped the prerequisites, please go back and ensure you have **Git** and **Node.js (with npm)** installed.

---

## 4. Step 3: Set Up the Project

Now that you have the code, let's get it ready.

1.  In your terminal, navigate into the project folder:
    ```bash
    cd OpenFlex
    ```
2.  Install the necessary project packages. These are libraries OpenFlex needs to run. Type:
    ```bash
    npm install
    ```
    This might take a few minutes. You'll see a lot of text scrolling – that's normal!

---

## 5. Step 4: Customize Your Portfolio (Edit `resume-data.json`)

This is where the magic happens! All your portfolio content is controlled by a single file: `src/config/resume-data.json`.

### Understanding JSON

JSON (JavaScript Object Notation) is a simple format for storing data. It uses key-value pairs.
*   **Keys** are like labels (e.g., `"name"`), always in double quotes.
*   **Values** are the actual data (e.g., `"Your Name Here"`), also in double quotes for text. Numbers don't need quotes.
*   Items are separated by commas.
*   Curly braces `{}` define objects (collections of key-value pairs).
*   Square brackets `[]` define arrays (lists of items).

**Example snippet:**
```json
{
  "personal": {
    "name": "Pankaj Kumar Roy",
    "title": "Full-Stack Developer",
    "email": "1719pankaj@gmail.com"
  }
}
```

### Editing the File

1.  Open the `OpenFlex` folder in your favorite code editor (like [VS Code](https://code.visualstudio.com/), which is free and excellent) or even a simple text editor (like Notepad on Windows or TextEdit on Mac).
2.  Navigate to the `src` folder, then the `config` folder.
3.  Open the file named `resume-data.json`.
4.  Carefully edit the values to reflect your personal information, projects, experience, skills, etc.
    *   **Only change the text on the right side of the colons (the values).** Do not change the keys (the text in quotes on the left).
    *   Pay close attention to commas: make sure there's a comma after each item in a list *except for the last one*.
    *   Ensure all your text strings are enclosed in double quotes.
5.  **Save the file** after making your changes (Ctrl+S or Cmd+S).

---

## 6. Help! I Got an Error After Editing! (JSON Validation)

If your website doesn't load correctly after editing `resume-data.json`, you might have a small mistake in the JSON format. This is very common!

**How to check your JSON:**

1.  Go to an online JSON validator, like [JSONLint](https://jsonlint.com/).
2.  Copy the entire content of your `resume-data.json` file.
3.  Paste it into the text area on the JSON validator website.
4.  Click the "Validate JSON" button.
5.  The validator will tell you if there's an error and often point to the line number where the problem is.

**Common JSON errors:**

*   **Missing comma:** Between items in a list or key-value pairs.
*   **Extra comma:** After the last item in a list or the last key-value pair in an object.
*   **Missing double quotes:** Around keys or string values.
*   **Mismatched brackets `{}` or `[]`**: Make sure every opening bracket has a closing one.

Fix the error in your `resume-data.json` file, save it, and try again.

---

## 7. Step 5: See Your Changes Locally

Before you show your website to the world, let's preview it on your computer.

1.  Make sure you are in the `OpenFlex` directory in your terminal.
2.  Type the following command and press Enter:
    ```bash
    npm run dev
    ```
3.  This will start a local development server. After a moment, you should see a message like:
    `ready - started server on 0.0.0.0:3000, url: http://localhost:3000`
4.  Open your web browser (Chrome, Firefox, etc.) and go to `http://localhost:3000`.
5.  You should see your portfolio website with all the changes you made!

To stop the local server, go back to your terminal and press `Ctrl+C`.

---

## 8. Step 6: Save Your Changes to GitHub

Now that you've customized your portfolio and tested it locally, it's time to save these changes back to your forked repository on GitHub.

1.  In your terminal (make sure you're in the `OpenFlex` directory), type the following commands one by one:
    *   Add all your changed files to be tracked by Git:
        ```bash
        git add .
        ```
    *   Commit your changes with a descriptive message:
        ```bash
        git commit -m "Updated resume data and portfolio content"
        ```
        (You can change the message to be more specific if you like.)
    *   Push your committed changes from your computer to your GitHub repository:
        ```bash
        git push origin main
        ```
        (If your main branch is called something else, like `master`, use that name instead of `main`.)

If you go to your forked repository on GitHub (e.g., `https://github.com/YOUR_USERNAME/OpenFlex`), you should see your updated files.

---

## 9. Step 7: Deploy Your Website to the World with Vercel

Vercel is a platform that makes it incredibly easy to deploy websites like OpenFlex for free.

1.  Go to [vercel.com](https://vercel.com/) and sign up using your GitHub account. It's free!
2.  Once logged into your Vercel dashboard, click on **"Add New..."** and then **"Project"**.
    ![Vercel Add New Project](https://vercel.com/docs/images/quickstart/add-new-project.png)
3.  **Import Git Repository:** Vercel will show a list of your GitHub repositories. Find your forked `OpenFlex` repository (e.g., `YOUR_USERNAME/OpenFlex`) and click the **"Import"** button next to it.
    *   If you don't see your repository, you might need to configure Vercel's access to your GitHub account or use the "Import Third-Party Git Repository" option and paste your repo's HTTPS URL.
4.  **Configure Project:**
    *   **Project Name:** Vercel will suggest a name (usually your repository name). You can keep it or change it.
    *   **Framework Preset:** Vercel should automatically detect it as a **Next.js** project. If not, select Next.js.
    *   **Build and Output Settings:** Usually, you don't need to change these for OpenFlex.
    *   **Environment Variables (Optional):** If you plan to use analytics with PostHog (as configured in the original template), you would add your `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` here. Otherwise, you can skip this.
5.  Click the **"Deploy"** button.
6.  Vercel will now build and deploy your website. This might take a few minutes. You'll see the build progress.
7.  Once it's done, Vercel will give you a URL (like `your-project-name.vercel.app`). Congratulations! Your portfolio is live!

Whenever you push new changes to your GitHub repository (Step 6), Vercel will automatically rebuild and redeploy your website with the latest updates!

---

## 10. Step 8: Get a Free Custom Domain (e.g., `yourname.is-a.dev`)

Want a cooler domain name than the default Vercel one? `is-a.dev` offers free subdomains for developers! We'll connect it to your Vercel-deployed site.

**Follow the official `is-a.dev` guide for Vercel here:**
➡️ **[https://docs.is-a.dev/guides/vercel/](https://docs.is-a.dev/guides/vercel/)** ⬅️

Here's a summary of the steps from their guide:

1.  **Go to `is-a.dev`:** Open [is-a.dev](https://is-a.dev/) in your browser and click "Login with GitHub".
2.  **Create a New Record:**
    *   Once logged in, click on "Create a new record" or a similar button.
    *   **Subdomain:** Enter the name you want before `.is-a.dev` (e.g., if you want `pankaj.is-a.dev`, enter `pankaj`). Make sure it's available.
    *   **Record Type:** Select **`CNAME`**.
    *   **Content / Value:** Enter exactly **`cname.vercel-dns.com`**. (Do NOT enter your Vercel project URL here).
        ![is-a.dev CNAME record](https://docs.is-a.dev/assets/images/cname-record-b029f416202079f3a9f79580fc88784a.png) (*Image from is-a.dev docs*)
    *   Click "Create" or "Save".

3.  **Add Domain to Vercel:**
    *   Go to your Vercel dashboard ([vercel.com](https://vercel.com/)).
    *   Select your OpenFlex project.
    *   Go to the **"Settings"** tab for your project.
    *   Click on **"Domains"** in the sidebar.
    *   In the input field, type your full `is-a.dev` domain (e.g., `pankaj.is-a.dev`) and click **"Add"**.
        ![Vercel Add Domain](https://vercel.com/docs/images/assign-domain-name-to-project/add-domain-name.png)
    *   Vercel should automatically detect the `CNAME` record you set up on `is-a.dev` and configure the domain. It might take a few minutes (or sometimes longer) for DNS changes to propagate across the internet.
    *   You should see "Valid Configuration" next to your domain in Vercel.

Now, your custom `yourname.is-a.dev` domain should point to your awesome OpenFlex portfolio!

---

## 11. Troubleshooting & Support

*   **Problem with JSON?** Refer back to the [JSON Validation](#6-help-i-got-an-error-after-editing-json-validation) section.
*   **Vercel deployment failed?** Check the build logs on Vercel for error messages. Often, it's related to an error in `resume-data.json` or a problem during the `npm install` phase.
*   **Custom domain not working?**
    *   Double-check your `CNAME` record on `is-a.dev` points to `cname.vercel-dns.com`.
    *   Ensure you added the correct full domain (e.g., `yourname.is-a.dev`) to Vercel.
    *   Wait some time for DNS propagation (can take up to 24-48 hours in rare cases, but usually much faster).
*   **Still stuck?** You can open an issue on the [OpenFlex GitHub repository](https://github.com/1719pankaj/OpenFlex/issues) (replace with the correct URL if needed) for help.

---

That's it! You now have a beautiful, customizable portfolio website. Go share it with the world!

