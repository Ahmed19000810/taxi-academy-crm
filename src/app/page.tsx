"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckSquare, MapPin, ShieldCheck, Car } from "lucide-react";

const features = [
  { title: "Eligibility Checker", description: "Check Private Hire Licence eligibility", icon: "CheckSquare", href: "/dashboard/eligibility-checker" },
  { title: "Distance Calculator", description: "Calculate distances and driving times", icon: "MapPin", href: "/dashboard/distance-calculator" },
  { title: "Lead Verification", description: "Match leads with bookings", icon: "ShieldCheck", href: "/dashboard/lead-verification" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="border-b border-border/40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold">Taxi Academy</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login"><Button variant="ghost">Sign In</Button></Link>
            <Link href="/register"><Button>Get Started</Button></Link>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">CRM & Eligibility Platform for <span className="text-primary">Taxi Academy</span></h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Streamline your private hire licence operations</p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/register"><Button size="lg" className="text-base">Start Free Trial</Button></Link>
          <Link href="/login"><Button size="lg" variant="outline" className="text-base">Sign In</Button></Link>
        </div>
      </section>
    </div>
  );
}