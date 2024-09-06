## Weekend Project - Week 3

To consolidate this week's knowledge, students should complete the following project:

1. Create a GitHub repository for your project
2. Add all group members as collaborators
3. Create a README.md file with your project description
4. Use the `story-telling-app` as a base repository or create a new application from scratch using NextJS
5. Implement a table of characters that users can create for the story
   - Users should be able to add, edit, and delete characters
   - Each new character should have a name, description, and personality
6. Customize the prompt to generate a story using user-created characters, if any
7. Implement a summary of each character's role in the story after the full text has been generated
8. Test different models for story generation and compare their outputs
   - Evaluate how well the models "remember" user-created characters
   - Experiment with different **context window** sizes across models to observe their impact on output
   - Test models of varying sizes and observe how this influences the output
     - Use models compatible with your device, focusing on the experiment rather than overall story quality
9. Submit your project via the submission form

## Getting Started

## Setup AI Backend
- add OpenAI API Key to `.env.local`
- or use local AI backend

## Install
- git clone this repo
- cd into the directory
- install dependencies

```bash
git clone git@github.com:ionescu77/encode-club-ai-and-gpt-bootcamp-q3-homework-week3.git
cd encode-club-ai-and-gpt-bootcamp-q3-homework-week3
npm install
```

## Run project
First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
