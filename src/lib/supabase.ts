import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

function assertEnv(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`${name} is not configured`)
  }
}

export function createSupabaseAuthClient() {
  assertEnv("NEXT_PUBLIC_SUPABASE_URL", supabaseUrl)
  assertEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", supabaseAnonKey)

  return createClient(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export function createSupabaseAdminClient() {
  assertEnv("NEXT_PUBLIC_SUPABASE_URL", supabaseUrl)
  assertEnv("SUPABASE_SERVICE_ROLE_KEY", supabaseServiceRoleKey)

  return createClient(supabaseUrl!, supabaseServiceRoleKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export function getBaseUrl() {
  return (
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000"
  )
}
