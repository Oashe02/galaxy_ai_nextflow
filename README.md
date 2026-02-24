# NEXTFLOW 

## Features

### Interactive Node Workspace
- **BaseNode Architecture**: A high-fidelity node system with interactive handle labels and real time execution.
- **Auto-Chaining**: Intelligently aggregates text and image inputs from connected nodes to build complex prompt contexts.
- **Dynamic Previews**: Integrated "Matrix View" for cropping and high-fidelity video frame previews.

### Core Nodes
- **Run Any LLM**: Support for Google Gemini (2.0 Flash/Pro), OpenAI (GPT-4o), (Claude 3.5). Features grouping, temperature control, and multimodal support.
- **Crop Image**: Precision percentage-based cropping using server-side FFmpeg processing.
- **Extract Frame**: High-fidelity video frame extraction at specific timestamps or percentages.
- **Asset Hub**: Dedicated upload nodes for high-resolution images and videos with detailed metadata tracking.

### Enterprise-Grade Foundation
- **Clerk Authentication**: Full-flow auth integration ensuring all workflows and history are securely scoped to the user.
- **Workflow History**: A professional audit log featuring execution traces, duration metrics, and status badges (Success, Failure, Partial).
- **Trigger.dev Integration**: All long-running compute tasks (FFmpeg, LLM calls) are offloaded to background workers for zero-latency UI performance.

## Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/), [React Flow](https://reactflow.dev/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Backend / ORM**: [Prisma](https://www.prisma.io/) with PostgreSQL
- **Authentication**: [Clerk](https://clerk.com/)
- **Task Orchestration**: [Trigger.dev](https://trigger.dev/)
- **Media Processing**: [FFmpeg](https://ffmpeg.org/), [Sharp](https://sharp.pixelplumbing.com/)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/)

## Getting Started

### Prerequisites
- Node.js 18+
- A PostgreSQL database (e.g., [Neon](https://neon.tech/))
- API Keys for: Clerk, Trigger.dev, and Google AI Studio (Gemini)

### Installation

1. **Clone & Install Dependencies**
   ```bash
   git clone https://github.com/Oashe02/galaxy_ai_nextflow
   cd nextflow
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the root:
   ```env
   DATABASE_URL="postgresql://..."
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
   CLERK_SECRET_KEY="..."
   TRIGGER_SECRET_KEY="..."
   GEMINI_API_KEY="..."
   ```

3. **Database Migration**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start Development Servers**
   In two separate terminals:
   ```bash
   # Terminal 1: Next.js dev server
   npm run dev

   # Terminal 2: Trigger.dev worker
   npx trigger.dev@latest dev
   ```

## Project Structure

```text
src/
├── app/               # Next.js App Router (Protected Routes & APIs)
├── components/        
│   ├── canvas/        # Workflow Canvas & Edge logic
│   ├── layout/        # Premium Navbar & Hero sections
│   ├── nodes/         # BaseNode engine & Custom Node definitions
│   └── sidebar/       # History panels & Feature hubs
├── lib/               # DAG Runners, Prisma client, and Utilities
├── store/             # Zustand Workflow state
└── trigger/           # Background task definitions (LLM, Media)
```
