# Talent-Hunting 🎯

A modern, professional recruitment and talent management platform built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### For Candidates

-   **Professional Profile Management**: Create and manage comprehensive professional profiles
-   **Profile Completeness Tracking**: Visual progress indicators and completion suggestions
-   **Job Opportunities**: Browse and apply for relevant positions
-   **Skills & Experience Showcase**: Highlight your expertise and work history
-   **CV/Resume Upload**: Upload and manage your professional documents
-   **LinkedIn Integration**: Connect your LinkedIn profile

### For Recruiters

-   **Candidate Discovery**: Find and evaluate potential candidates
-   **Profile Analytics**: Comprehensive candidate profiles with skills and experience
-   **Application Management**: Track and manage job applications
-   **Advanced Search**: Filter candidates by skills, experience, and qualifications

### Authentication & Security

-   **Strong Password Validation**: Enforce secure password requirements
-   **OAuth Integration**: Sign up/sign in with GitHub and Google
-   **JWT Authentication**: Secure token-based authentication
-   **Profile Image Management**: Upload and manage profile pictures with fallback avatars

### User Experience

-   **Responsive Design**: Optimized for desktop, tablet, and mobile
-   **Dark/Light Mode**: Toggle between themes
-   **Modern UI/UX**: Clean, professional interface using Tailwind CSS
-   **Form Validation**: Comprehensive client-side validation with Zod
-   **Loading States**: Smooth loading experiences with skeleton components

## 🛠️ Tech Stack

-   **Frontend**: React 19, TypeScript, Vite
-   **Styling**: Tailwind CSS, shadcn/ui components
-   **State Management**: Zustand
-   **Form Handling**: React Hook Form with Zod validation
-   **Routing**: React Router v7
-   **HTTP Client**: Axios
-   **Icons**: React Icons
-   **Build Tool**: Vite
-   **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd Talent-Hunting-Front
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    ```bash
    cp .env.example .env.local
    ```

    Update the environment variables in `.env.local` with your configuration.

4. **Start the development server**

    ```bash
    npm run dev
    ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build
-   `npm run lint` - Run ESLint
-   `npm run lint:fix` - Fix ESLint errors
-   `npm run format` - Format code with Prettier

## 📁 Project Structure

```
src/
├── @types/           # TypeScript type definitions
├── auth/             # Authentication context and providers
├── components/       # Reusable UI components
│   ├── shared/       # Shared components (BackButton, DefaultAvatar, etc.)
│   ├── template/     # Layout and template components
│   └── ui/           # Base UI components
├── configs/          # Application configuration
├── constants/        # Application constants
├── hooks/            # Custom React hooks
├── locales/          # Internationalization
├── services/         # API services
├── store/            # Zustand stores
├── utils/            # Utility functions
└── views/            # Page components
    ├── auth/         # Authentication pages
    ├── candidate/    # Candidate-specific pages
    └── recruitment/  # Recruitment-specific pages
```

## 🎨 Key Components

### DefaultAvatar

A smart avatar component that provides fallbacks when user images are not available:

-   Shows user initials with random background colors
-   Falls back to a user icon when no name is provided
-   Supports multiple sizes and shapes

### BackButton

A reusable back navigation component:

-   Automatically handles browser history
-   Provides fallback navigation paths
-   Consistent styling across the application

### Profile Completeness

Enhanced profile tracking with:

-   Visual progress indicators
-   Detailed completion breakdown
-   Actionable suggestions for improvement
-   Professional tips and guidance

## 🔐 Authentication Features

### Password Requirements

-   Minimum 8 characters
-   At least one uppercase letter
-   At least one lowercase letter
-   At least one number
-   At least one special character
-   Real-time strength indicator

### OAuth Integration

-   GitHub authentication
-   Google authentication
-   Seamless sign-up and sign-in flow

## 📱 Responsive Design

The application is fully responsive and optimized for:

-   Desktop (1200px+)
-   Tablet (768px - 1199px)
-   Mobile (320px - 767px)

## 🎯 Profile Management

### Profile Sections

1. **Summary**: Professional overview and career objectives
2. **Skills**: Technical and soft skills with proficiency levels
3. **Experience**: Work history with detailed descriptions
4. **Education**: Academic background and qualifications
5. **Additional Info**: LinkedIn profile and CV upload

### Validation Rules

-   Summary: 20-1000 characters
-   Skills: At least one skill required
-   Experience: At least one work experience required
-   Education: At least one education entry required
-   LinkedIn URL: Valid URL format (optional)
-   CV: PDF, DOC, DOCX up to 0.7MB (optional)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   Built with [React](https://reactjs.org/)
-   Styled with [Tailwind CSS](https://tailwindcss.com/)
-   Icons from [React Icons](https://react-icons.github.io/react-icons/)
-   Form validation with [Zod](https://zod.dev/)

## 📞 Support

For support and questions:

-   Create an issue in the repository
-   Contact the development team
-   Check the documentation

---

**Talent-Hunting** - Connecting talent with opportunities 🎯
