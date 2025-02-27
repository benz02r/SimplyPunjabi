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
            emailRedirectTo: `${window.location.origin}/auth-callback`, // ✅ Redirect to new callback page
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
            emailRedirectTo: `${window.location.origin}/auth-callback`, // ✅ Redirect to new callback page
        },
    });

    if (error) {
        console.error("❌ Error sending authentication email:", error.message);
        return { error };
    }

    console.log("✅ Authentication email sent!");
    return { success: true };
};
