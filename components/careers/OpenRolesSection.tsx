"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface JobRole {
  id: string;
  reqCode: string;
  title: string;
  location: string;
  arrangement: string;
  type: string;
  team: string;
  status: "Open" | "Updated" | "Paused" | "Closed";
  statusLabel?: string;
  postedDate: string;
  imageSrc: string;
  imageAlt: string;
}

const allJobRoles: JobRole[] = [
  {
    id: "senior-frontend-engineer",
    reqCode: "DX-REQ-101",
    title: "Senior Frontend Engineer",
    location: "London, United Kingdom",
    arrangement: "Hybrid",
    type: "Full-time",
    team: "Engineering",
    status: "Open",
    postedDate: "1 Oct 2026",
    imageSrc: "/images/Careers/c2.png",
    imageAlt: "Frontend code and terminal setup",
  },
  {
    id: "trust-safety-analyst",
    reqCode: "DX-REQ-102",
    title: "Trust & Safety Analyst",
    location: "Manchester, United Kingdom",
    arrangement: "On-site",
    type: "Full-time",
    team: "Trust & Safety",
    status: "Open",
    postedDate: "28 Sept 2026",
    imageSrc: "/images/Careers/c3.png",
    imageAlt: "Document and identity review",
  },
  {
    id: "product-designer",
    reqCode: "DX-REQ-103",
    title: "Product Designer",
    location: "London, United Kingdom",
    arrangement: "Hybrid",
    type: "Full-time",
    team: "Design",
    status: "Updated",
    postedDate: "25 Sept 2026",
    imageSrc: "/images/Careers/c4.png",
    imageAlt: "Product design team collaboration",
  },
  {
    id: "partner-success-manager",
    reqCode: "DX-REQ-104",
    title: "Partner Success Manager",
    location: "Austin, United States",
    arrangement: "Remote within country",
    type: "Full-time",
    team: "Partnerships",
    status: "Open",
    postedDate: "22 Sept 2026",
    imageSrc: "/images/Careers/c5.png",
    imageAlt: "Logistics and dealer transport partner",
  },
  {
    id: "data-analyst",
    reqCode: "DX-REQ-105",
    title: "Data Analyst",
    location: "London, United Kingdom",
    arrangement: "Hybrid",
    type: "Contract",
    team: "Data",
    status: "Paused",
    statusLabel: "Paused — not accepting applications",
    postedDate: "15 Sept 2026",
    imageSrc: "/images/Careers/c6.png",
    imageAlt: "Data analytics dashboards",
  },
  {
    id: "customer-support-specialist",
    reqCode: "DX-REQ-106",
    title: "Customer Support Specialist",
    location: "Leeds, United Kingdom",
    arrangement: "On-site",
    type: "Part-time",
    team: "Support",
    status: "Closed",
    postedDate: "30 Aug 2026",
    imageSrc: "/images/Careers/c7.png",
    imageAlt: "Customer support consultation",
  },
];

export default function OpenRolesSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [teamFilter, setTeamFilter] = useState("All");
  const [arrangementFilter, setArrangementFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Most recent");

  const clearFilters = () => {
    setSearchTerm("");
    setLocationFilter("All");
    setTeamFilter("All");
    setArrangementFilter("All");
    setSortBy("Most recent");
  };

  const filteredRoles = allJobRoles.filter((role) => {
    const matchesSearch =
      role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "All" || role.location.includes(locationFilter);
    const matchesTeam = teamFilter === "All" || role.team === teamFilter;
    const matchesArrangement =
      arrangementFilter === "All" || role.arrangement === arrangementFilter;

    return matchesSearch && matchesLocation && matchesTeam && matchesArrangement;
  });

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className={container}>
        {/* Header */}
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Opportunities</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
              Open roles
            </h2>
          </Reveal>
        </div>

        {/* Filters Card */}
        <Reveal delay={150}>
          <div className="mt-8 sm:mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Search by role or team
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Location / region
                </label>
                <div className="relative mt-1.5">
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2 pr-8 text-xs sm:text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                  >
                    <option value="All">All</option>
                    <option value="London">London, United Kingdom</option>
                    <option value="Manchester">Manchester, United Kingdom</option>
                    <option value="Leeds">Leeds, United Kingdom</option>
                    <option value="Austin">Austin, United States</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Team */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Team
                </label>
                <div className="relative mt-1.5">
                  <select
                    value={teamFilter}
                    onChange={(e) => setTeamFilter(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2 pr-8 text-xs sm:text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                  >
                    <option value="All">All</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Trust & Safety">Trust & Safety</option>
                    <option value="Design">Design</option>
                    <option value="Partnerships">Partnerships</option>
                    <option value="Data">Data</option>
                    <option value="Support">Support</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Work arrangement */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Work arrangement
                </label>
                <div className="relative mt-1.5">
                  <select
                    value={arrangementFilter}
                    onChange={(e) => setArrangementFilter(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2 pr-8 text-xs sm:text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                  >
                    <option value="All">All</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                    <option value="Remote within country">Remote within country</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Sort by */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Sort by
                </label>
                <div className="relative mt-1.5">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2 pr-8 text-xs sm:text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                  >
                    <option value="Most recent">Most recent</option>
                    <option value="Oldest">Oldest</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                className="cursor-pointer rounded-full bg-[#0B1220] px-6 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Search
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Clear filters
              </button>
            </div>
          </div>
        </Reveal>

        {/* Roles count & update timestamp */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
          <p className="text-xs sm:text-sm font-semibold text-slate-900">
            {filteredRoles.length} roles · 4 accepting applications
          </p>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Listings last updated 10 Oct 2026 (demonstration source).
          </p>
        </div>

        {/* Roles List */}
        <div className="mt-4 space-y-3.5">
          {filteredRoles.map((role, idx) => (
            <Reveal key={role.id} delay={idx * 40}>
              <div className="group flex items-center gap-4 sm:gap-5 rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-slate-300 hover:shadow-md">
                {/* Thumbnail */}
                <div className="relative h-16 w-20 sm:h-20 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={role.imageSrc}
                    alt={role.imageAlt}
                    fill
                    sizes="(max-width: 640px) 80px, 112px"
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 underline decoration-slate-300 underline-offset-2 transition-colors group-hover:text-blue-600 group-hover:decoration-blue-600">
                    {role.title}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      {role.location}
                    </span>
                    <span>·</span>
                    <span>{role.arrangement}</span>
                    <span>·</span>
                    <span>{role.type}</span>
                    <span>·</span>
                    <span>{role.team}</span>
                  </div>

                  {/* Status Indicator */}
                  <div className="mt-2 flex items-center gap-2 text-[11px] sm:text-xs">
                    {role.status === "Open" && (
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Open
                      </span>
                    )}

                    {role.status === "Updated" && (
                      <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        Updated
                      </span>
                    )}

                    {role.status === "Paused" && (
                      <span className="inline-flex items-center gap-1 font-semibold text-rose-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                        {role.statusLabel || "Paused"}
                      </span>
                    )}

                    {role.status === "Closed" && (
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-500">
                        <span className="h-1.5 w-1.5 rounded-full border border-slate-400" />
                        Closed
                      </span>
                    )}

                    <span className="text-slate-400">
                      Posted {role.postedDate} · {role.reqCode}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
