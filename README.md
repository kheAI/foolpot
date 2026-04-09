# FoolPot: The Teapot That Interviews You Before Rejecting You

![Error 418](https://img.shields.io/badge/HTTP%20Status-418%20I'm%20a%20Teapot-red)
![Powered By](https://img.shields.io/badge/AI-Gemini%203.1%20Flash%20Lite-blue)
![Deployment](https://img.shields.io/badge/Deployed-Cloud%20Run-green)

**Live Demo:** [https://foolpot-750841821481.us-central1.run.app/](https://foolpot-750841821481.us-central1.run.app/)

## ☕ The Concept

Welcome to **FoolPot**, a highly over-engineered, utterly silly homage to Larry Masinter's infamous HTCPCP joke protocol (Hyper Text Coffee Pot Control Protocol). 

FoolPot is a teapot that thinks it's an elite Big Tech recruiter. Instead of just giving you a standard `418 I'm a Teapot` HTTP error, it makes you work for your rejection.

## 🧠 How It Works (The AI Judgment Engine)

The Google AI integration is central to the joke, not just decorative:

1. **The Interview:** Users are subjected to ridiculous intake questions.
2. **The Judgment:** Responses are processed by **Gemini (`gemini-3.1-flash-lite-preview`)**.
3. **The Philosophy:** Gemini evaluates your answers against the stringent [KheAi Philosophy](https://www.kheai.com/posts/kheai-protocol-systemic-autonomy-architecture) to calculate a highly arbitrary **'Brewability Score'**.
4. **The Meltdown:** As your score inevitably drops, the custom SVG teapot UI gets progressively more offended—changing colors, shaking violently, and blowing off steam. 
5. **The Rejection:** Finally, Gemini generates a personalized, incredibly condescending refusal letter.



## 🚀 Push & Deploy to Google Cloud Run

Want your own judgmental teapot? Here is the exact path to deploy this repository to Google Cloud Run while staying strictly in the free tier (a requirement for many hackathons and Dev.to challenges).

### 1. Setup GitHub & Google Cloud

1. Push your code to a public GitHub repository.
2. Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
3. Ensure the following APIs are enabled: **Billing**, **Cloud Run**, **Cloud Build**, and **Artifact Registry**.

### 2. Configure Cloud Run

1. Search for **Cloud Run** and click **Create Service**.
2. Choose **Continuously deploy new revisions from a source repository**.
3. Click **Setup Cloud Build**, connect your GitHub account, and select your repository.
4. Select **Dockerfile** as your build configuration.

### 3. The "Free-Tier" Secret Settings

Configure your service exactly like this to avoid surprise bills:

* **Region:** `us-central1`, `us-east1`, or `us-west1`.
* **Authentication:** Allow unauthenticated invocations *(makes it publicly accessible)*.
* **CPU Allocation:** CPU is only allocated during request processing.
* **Autoscaling:** * **Min instances:** `0` *(Ensures you stay in the free tier, though it results in a slight "cold start" delay for the first visitor).* **Max instances:** `1`
* **Container Port:** Change to `3000`.

### 4. Variables & Secrets

* Expand the **"Variables & Secrets"** section.
* Add your Gemini API key under the variable name `GEMINI_API_KEY` (or `NEXT_PUBLIC_GEMINI_API_KEY` depending on your local `.env` setup).
* Click **Create!**



## 🛠️ Local Development

Want to test the teapot's temper locally? 

**Prerequisites:** Node.js

Clone the repository and install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and add your Gemini API key:

Code snippet

```
GEMINI_API_KEY=your_gemini_api_key_here
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000&authuser=5) and prepare to be rejected.



