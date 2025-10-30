import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * ✅ Sign Up a New User with Email
 * Redirects users to "/auth-callback" after clicking the verification link.
 */
export const signUpWithEmail = async (email, password) => {
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth-callback`,
        },
    });

    if (error) {
        console.error("❌ Error signing up:", error.message);
        return { error };
    }

    console.log("✅ Signup successful! Check email for confirmation.");
    return { success: true };
};

/**
 * ✅ Sign In a User with OTP (Magic Link)
 * Redirects users to "/auth-callback" to auto-login after clicking the email link.
 */
export const signInWithMagicLink = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth-callback`,
        },
    });

    if (error) {
        console.error("❌ Error sending authentication email:", error.message);
        return { error };
    }

    console.log("✅ Authentication email sent!");
    return { success: true };
};

/**
 * ✅ Sends a password reset email
 * Note: Users will be redirected to /auth-callback first to establish session,
 * then can be redirected to /reset-password from there
 */
export const sendPasswordResetEmail = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth-callback`,
    });

    if (error) {
        console.error("❌ Error sending password reset email:", error.message);
        return { error };
    }

    console.log("✅ Password reset email sent!");
    return { success: true };
};

/**
 * ✅ Updates user's password after they click the reset link
 */
export const updatePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
        console.error("❌ Error updating password:", error.message);
        return { error };
    }

    console.log("✅ Password updated successfully!");
    return { success: true };
};