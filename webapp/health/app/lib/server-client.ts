import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = () => {
    const cookieStore = cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch (error) {
                        // The `set` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value: "", ...options });
                    } catch (error) {
                        // The `delete` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        },
    );
};

export const supabase = createClient();

export type Data = {
    "life_satisfaction": number | null
    "healthy_eating": number | null
    "physical_activity": number | null
    "green_space": number | null
    "gp_distance": number | null
    "pharmacy_distance": number | null
    "sport_facility_distance": number | null
    "air_pollution": number | null
    "noise_complaints": number | null
    "road_safety": number | null,
}

