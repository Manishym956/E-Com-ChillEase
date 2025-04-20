# ChillEase E-commerce Platform

A full-stack e-commerce platform for fans and air conditioners.

## Project Structure

This is a monorepo with the following applications:

- `apps/client`: Customer-facing e-commerce website
- `apps/admin`: Admin dashboard for managing products and orders
- `apps/rider-pwa`: Progressive Web App for delivery riders
- `apps/server`: Backend API server

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository
2. Install dependencies for all applications:

```bash
# Install root dependencies
npm install

# Install dependencies for each application
cd apps/client && npm install
cd ../admin && npm install
cd ../rider-pwa && npm install
cd ../server && npm install
```

### Development

To run all applications in development mode:

```bash
# From the root directory
npm run dev
```

This will start:
- Server on port 5000
- Client on port 5100
- Admin on port 5200
- Rider PWA on port 5300

You can also run individual applications:

```bash
# Run only the client
npm run dev:client

# Run only the admin
npm run dev:admin

# Run only the rider PWA
npm run dev:rider

# Run only the server
npm run dev:server
```

### Building for Production

To build all applications for production:

```bash
# From the root directory
npm run build
```

## License

ISC 