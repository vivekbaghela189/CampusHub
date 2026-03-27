import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AdminEventForm from "@/components/admin/AdminEventForm"

export default async function RegisterEventPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  if (session.user.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-4 py-10 md:px-8">
      <section className="overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.18),transparent_24%),linear-gradient(180deg,#111422_0%,#0f172a_100%)] p-8 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.95)] md:p-12">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300 shadow-[0_0_20px_rgba(244,114,182,0.85)]" />
            Event Publishing
          </div>
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
            Register Event
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65 md:text-[1.2rem]">
            Create a new event and publish all the details students need before they register.
          </p>
        </div>

        <div className="mt-10">
          <AdminEventForm />
        </div>
      </section>
    </div>
  )
}
