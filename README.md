# External Display Conditions Extension to simulate found issues

## Setup and Install Dependencies

1. Clone the repository.
2. Copy `.env.sample` to `.env` and fill in your values:
3. Install Dependencies
```bash
npm install
npm run dev
```

# Issue 1: the editor can't load existing conditions 'extraData' from a def

When loading the editor for the first time, the editor will be loaded with the [default template.json](./src/template.json). 
This template contains an existing condition with `extraData`. 
When opening the console, we can see that the `extraData` is empty.

<img width="1111" height="785" alt="Screenshot 2025-11-04 at 16 22 13" src="https://github.com/user-attachments/assets/70665c81-2925-493b-9a0f-d7d0f235239b" />

# Issue 2: the editor is ignoring the initial template (maybe it is related to issue 1)

STR: 


1. Stop the app if it is running. 

   a. Change the emailId passed to the editor [in creds.js](./src/creds.js). Let's call it `"emailIdToto"` 

   b. Change the port in [vite.config.js](./vite.config.js) (ex: 5002) and run `npm run dev` again. 

Content loaded correctly 

<img width="984" height="458" alt="Screenshot 2025-11-04 at 16 44 21" src="https://github.com/user-attachments/assets/793bb21d-1831-4de9-b6f3-752088586aaf" />

&nbsp;

2. Update the editor content. Ex: We add a button `"Will be Saved to Local Storage"`. Click save button (it will get the current editor template and save it to localStorage)

<img width="984" height="458" alt="Screenshot 2025-11-04 at 16 45 18" src="https://github.com/user-attachments/assets/6b320169-1e2e-455e-a03c-d6268436235b" />

&nbsp;

3. Reload the page. we pass the template loaded from localStorage (the one we save above) to the editor. 
But the editor keeps showing the initial template (maybe it retrieves it from stripo reference database).

<img width="984" height="458" alt="Screenshot 2025-11-04 at 16 48 51" src="https://github.com/user-attachments/assets/b8be7220-ed88-4ddb-a152-483bbe7e62be" />

&nbsp;

When we log the console, we notice that the template passed to the editor is the one from the localStorage (the one with button `"Will be Saved to Local Storage"`). Alright.
But it is not the one loaded in the editor as you can see it above

<img width="448" height="160" alt="Screenshot 2025-11-04 at 17 01 18" src="https://github.com/user-attachments/assets/f762230b-0349-4bba-b3fd-4b2c93f24bb5" />

<img width="448" height="664" alt="Screenshot 2025-11-04 at 17 02 46" src="https://github.com/user-attachments/assets/0a5ad121-bc45-4d8b-acad-826fb768d3b5" />

<img width="706" height="189" alt="Screenshot 2025-11-04 at 17 04 07" src="https://github.com/user-attachments/assets/558504f1-6d24-482e-a9ec-7075c58068ab" />

&nbsp;

4. Try to update manually the template in `onTemplateLoaded` options by using `StripoEditorApi.actionsApi.updateHtmlAndCss`

<img width="684" height="288" alt="Screenshot 2025-11-04 at 17 10 31" src="https://github.com/user-attachments/assets/04713e0d-cdd4-4e6b-abfa-5214160baf35" />

&nbsp;

5. Reload the page. The editor load now the correct template (the one passed to init it)

<img width="728" height="289" alt="Screenshot 2025-11-04 at 17 12 22" src="https://github.com/user-attachments/assets/3b069b13-5c83-4bf1-9306-8de0402f1d66" />








