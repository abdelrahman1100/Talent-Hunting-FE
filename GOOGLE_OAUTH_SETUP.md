# Google OAuth Integration Setup

This document explains how to set up and use Google OAuth authentication in your Talent Hunting Front application.

## Overview

The frontend is now integrated with your backend Google OAuth implementation. The flow works as follows:

1. User clicks "Sign in with Google" button
2. Frontend redirects to backend `/auth/google` endpoint
3. Backend redirects to Google OAuth
4. User authenticates with Google
5. Google redirects back to backend `/auth/google/callback`
6. Backend processes the OAuth response and redirects to frontend with tokens
7. Frontend handles the callback and signs in the user

## Frontend Components

### 1. OAuth Services (`src/services/OAuthServices.ts`)

-   `initiateGoogleOAuth()`: Redirects user to backend Google OAuth endpoint
-   `handleGoogleOAuthCallback()`: Processes tokens from backend redirect
-   `checkGoogleOAuthStatus()`: Checks if Google OAuth is enabled on backend

### 2. OAuth Sign-In Component (`src/views/auth/SignIn/components/OauthSignIn.tsx`)

-   Renders Google and GitHub sign-in buttons
-   Handles Google OAuth button click (redirects to backend)

### 3. Google OAuth Callback (`src/views/auth/OAuthCallback/GoogleOAuthCallback.tsx`)

-   Handles the redirect from backend after successful OAuth
-   Processes tokens and signs in the user
-   Redirects to dashboard on success

## Backend Requirements

Your backend controller should redirect to the frontend with tokens in the URL. Here's the recommended approach:

### Update Your Backend Controller

```typescript
@Public()
@Get('google/callback')
@UseGuards(GoogleAuthGuard)
async googleCallback(@Req() req, @Res() res: Response) {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: 'Google authentication failed - no user data'
            });
        }

        const result = await this.authService.loginWithGoogle(user);

        // Redirect to frontend with tokens in URL params
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const redirectUrl = `${frontendUrl}/auth/google/callback?token=${result.accessToken}&user=${encodeURIComponent(JSON.stringify({
            id: user.id || user.sub,
            name: user.name || user.displayName,
            email: user.email
        }))}`;

        res.redirect(redirectUrl);
    } catch (error) {
        console.error('Google OAuth callback error:', error);
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const errorUrl = `${frontendUrl}/auth/google/callback?error=${encodeURIComponent(error.message)}`;
        res.redirect(errorUrl);
    }
}
```

## Environment Variables

Make sure your backend has these environment variables:

```env
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

## Frontend Routes

The Google OAuth callback route is automatically added:

```typescript
{
    key: 'googleOAuthCallback',
    path: `/auth/google/callback`,
    component: lazy(() => import('@/views/auth/OAuthCallback/GoogleOAuthCallback')),
    authority: [],
}
```

## Testing the Integration

1. **Start your backend** (should be running on `http://localhost:3000`)
2. **Start your frontend** (should be running on `http://localhost:5173`)
3. **Navigate to the sign-in page**
4. **Click "Sign in with Google"**
5. **Complete Google OAuth flow**
6. **You should be redirected back and signed in**

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from your frontend domain
2. **Redirect Loop**: Check that your backend redirects to the correct frontend URL
3. **Missing Tokens**: Verify that your backend is properly passing tokens in the redirect URL
4. **Route Not Found**: Ensure the `/auth/google/callback` route is properly configured

### Debug Steps

1. Check browser console for errors
2. Verify backend logs for OAuth flow
3. Check network tab for redirects
4. Ensure all environment variables are set correctly

## Security Considerations

1. **HTTPS in Production**: Always use HTTPS in production for OAuth flows
2. **Token Validation**: Backend should validate Google OAuth tokens
3. **User Data**: Only store necessary user information
4. **Session Management**: Implement proper session handling

## Next Steps

1. Test the integration thoroughly
2. Add error handling for edge cases
3. Implement proper user profile management
4. Add logout functionality
5. Consider implementing refresh token logic
