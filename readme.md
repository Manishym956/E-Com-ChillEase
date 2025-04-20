# ChillEase E-Commerce Platform

ChillEase is a comprehensive e-commerce platform specializing in fans and air conditioners. This monorepo contains three separate applications and a backend server, providing a complete solution for customers, administrators, and delivery personnel.

![ChillEase](355a0a18-64e4-4dbc-a7f8-9f847ef58f72.jpeg)

## 📹 Demo Video

Check out our demo video to see the platform in action: [ChillEase Demo](https://drive.google.com/file/d/1MYFtnUJLODKjuk4pZDCfaQV2Wq4sXpf2/view?usp=sharing)

## 🚀 Features

### Customer Application
- Product browsing with filtering, sorting, and search capabilities
- Color and size variants for all products
- Shopping cart functionality
- User authentication via Google OAuth
- Order placement and tracking
- Responsive design for all devices

### Admin Dashboard
- Order management system
- Rider assignment for shipment
- Order status updates
- Administrator authentication via Google OAuth
- Overview of sales and delivery statistics

### Rider PWA (Progressive Web App)
- Mobile-optimized delivery interface
- Order details with customer information
- Delivery status updates (Delivered/Undelivered)
- Google Maps integration for navigation
- Works offline with PWA capabilities

### Backend Server
- RESTful API architecture
- MongoDB database integration
- Google OAuth authentication
- Role-based access control
- Order and product management

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Google Cloud account (for OAuth)

## 🔧 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Zuvees-fullstack-e-com.git
   cd Zuvees-fullstack-e-com
   ```

2. **Set up environment variables**

   Create `.env` files in each application directory:

   **Server (.env)**
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/chillease
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   APPROVED_ADMIN_EMAILS=admin@example.com,your-admin-email@example.com
   APPROVED_RIDER_EMAILS=rider@example.com,your-rider-email@example.com
   CORS_ORIGIN_CLIENT=http://localhost:5100
   CORS_ORIGIN_ADMIN=http://localhost:5200
   CORS_ORIGIN_RIDER=http://localhost:5300
   ```

   **Client/Admin/Rider (.env)**
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the Applications Locally

To run all applications, open 4 different terminal windows and navigate to each directory:

**Terminal 1 - Backend Server**
```bash
cd apps/server
npm run dev
```

**Terminal 2 - Client App**
```bash
cd apps/client
npm run dev
```

**Terminal 3 - Admin Dashboard**
```bash
cd apps/admin
npm run dev
```

**Terminal 4 - Rider PWA**
```bash
cd apps/rider-pwa
npm run dev
```

Access the applications at:
- Client: [http://localhost:5100](http://localhost:5100)
- Admin: [http://localhost:5200](http://localhost:5200)
- Rider: [http://localhost:5300](http://localhost:5300)
- Backend API: [http://localhost:5000](http://localhost:5000)

## 🔒 Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Configure the OAuth consent screen
4. Create OAuth 2.0 Client IDs for web applications
5. Add authorized JavaScript origins:
   - http://localhost:5100 (Client)
   - http://localhost:5200 (Admin)
   - http://localhost:5300 (Rider)
6. Add the same URIs as authorized redirect URIs
7. Copy the Client ID to your environment variables

## 📱 Testing the Applications

**Client App:**
- Browse products by category (fans or ACs)
- Filter and sort products
- Add items to cart
- Sign in with your Google account
- Complete checkout process

**Admin Dashboard:**
- Sign in with an admin email (must be in APPROVED_ADMIN_EMAILS)
- View all orders
- Update order status from "Paid" to "Shipped"
- Assign riders to orders

**Rider App:**
- Sign in with a rider email (must be in APPROVED_RIDER_EMAILS)
- View assigned orders
- Update delivery status (Delivered/Undelivered)
- Get directions to delivery addresses

## 🚀 Deployment

The applications can be deployed to Vercel using the following steps:

### Backend Server Deployment
Since the server folder deployment might be restricted on Vercel, consider these alternative approaches:

Option 1: Deploy to Railway/Render
1. Create a new project on Railway or Render
2. Connect your GitHub repository
3. Configure the following:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Root Directory: `apps/server`
4. Add Environment Variables from your `.env` file
5. Deploy and note down the API URL

Option 2: Deploy to Heroku
1. Create a new Heroku application
2. Connect your GitHub repository
3. Set the project path to `apps/server`
4. Configure environment variables in Heroku dashboard
5. Deploy using Heroku CLI or GitHub integration
6. Note down the API URL

### Frontend Applications Deployment (on Vercel)
For each frontend application (client, admin, rider-pwa):

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Configure the following:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `apps/[client|admin|rider-pwa]`
4. Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.[platform].app/api
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```
5. Update Google OAuth settings in Google Cloud Console
6. Deploy

### Important Post-Deployment Steps
1. Update CORS settings in backend environment variables:
   ```
   CORS_ORIGIN_CLIENT=https://your-client-app.vercel.app
   CORS_ORIGIN_ADMIN=https://your-admin-app.vercel.app
   CORS_ORIGIN_RIDER=https://your-rider-app.vercel.app
   ```
2. Ensure all environment variables are properly set
3. Update Google OAuth authorized origins and redirect URIs with new domains

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Manish Y M - Initial work

## 🙏 Acknowledgments

- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- UI components using [Tailwind CSS](https://tailwindcss.com/)

---

*This project was created as part of a software engineering assignment.*