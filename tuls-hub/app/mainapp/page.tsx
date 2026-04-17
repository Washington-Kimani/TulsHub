"use client";

import Image from "next/image";
import { HeroImage, HtmlToDocx, LinksToCsv, DownloadAllImages } from "@/app/images";
import Link from "next/link"
import {
  FileText,
  ImageDown,
  Link as LinkIcon,
  ArrowRight,
  Server,
  Database,
  Code,
} from "lucide-react";
import { NavBar } from "@/app/components/navbar";

const features = [
  {
    title: "Link Extractor",
    link: "/get-all-urls",
    description:
      "Scan webpages and export all links into a structured CSV file.",
    icon: LinkIcon,
    image: LinksToCsv,
  },
  {
    title: "HTML to DOCX",
    link: "/html-to-docx",
    description:
      "Convert structured HTML pages into clean, formatted Word documents while preserving layout.",
    icon: FileText,
    image: HtmlToDocx,
  },
  {
    title: "Bulk Image Downloader",
    link: "/images-download",
    description: "Extract and download all images from any webpage instantly.",
    icon: ImageDown,
    image: DownloadAllImages,
  },
];

const steps = [
  {
    title: "Submit URL",
    description: "Paste any webpage link.",
    icon: LinkIcon,
  },
  {
    title: "Process",
    description: "Flask + BeautifulSoup parse and extract data.",
    icon: Server,
  },
  {
    title: "Download",
    description: "Get DOCX, images, or CSV outputs instantly.",
    icon: Database,
  },
];

export default function MainApp() {
  return (
    <main className="min-h-screen">
      {/* NAVBAR */}
      <NavBar />

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-6 py-16 max-w-6xl mx-auto">
        {/* TEXT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Extract, Convert & Organize Web Content
          </h1>

          <p className="mt-4 text-gray-600">
            A powerful toolkit powered by a Flask backend and BeautifulSoup.
            Convert HTML to DOCX, download images, and extract structured data —
            all in seconds.
          </p>

          <div className="mt-6 flex gap-4 flex-wrap">
            <Link href={"/html-to-docx"} className="bg-[#2f27ce] text-white px-6 py-3 rounded-lg hover:bg-[#443dff] transition flex items-center gap-2">
              Start Using Tools <ArrowRight size={18} />
            </Link>

            <Link
              href="#learn-more"
              className="bg-[#dddbff] text-[#2f27ce] px-6 py-3 rounded-lg hover:bg-[#ecebff] transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative w-full h-[300px] md:h-[400px]">
          <Image
            src={HeroImage}
            alt="Web tools illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Core Features
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <div
                key={i}
                className="relative h-[32vh] bg-[#ecebff] rounded-xl overflow-hidden shadow-md hover:shadow-[0_5px_10px_4px_rgba(0,0,0,0.3)] transition ease-in-out duration-300 "
              >
                {/* IMAGE */}
                <div className="relative w-full flex items-center justify-center h-40">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={90}
                    height={120}
                    className="object-cover md:w-[35%] absolute top-2"
                  />
                </div>

                {/* CONTENT */}
                <div className="absolute p-4 bottom-0 left-0 bg-[rgba(0,0,0,0.2)]">
                  <Icon className="text-[#443dff] mb-2" size={24} />
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {feature.description}
                  </p>

                  <div className="w-full mt-2 flex items-center justify-center">
                    <Link
                      href={feature.link}
                      className="bg-[#7e7afb] py-1 px-2 rounded-sm"
                    >
                      Check It Out
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="learn-more"
        className="bg-[#dddbff] px-6 py-12 max-w-7xl mx-auto rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-10">
          How It Works
        </h2>

        <div className="grid gap-8 max-w-5xl mx-auto md:grid-cols-3 text-center">
          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <div key={i}>
                <Icon className="mx-auto text-[#2f27ce] mb-3" size={26} />
                <h4 className="font-semibold">{step.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TECH SECTION */}
      <section className="px-6 py-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold">
          Built for Speed & Reliability
        </h2>

        <p className="mt-4 text-gray-600">
          Powered by Flask and BeautifulSoup, this system ensures accurate HTML
          parsing, fast processing, and structured outputs for real-world use
          cases.
        </p>

        <div className="flex justify-center gap-6 mt-6 flex-wrap text-[#443dff]">
          <div className="flex items-center gap-2">
            <Code size={18} /> Flask API
          </div>
          <div className="flex items-center gap-2">
            <Server size={18} /> Processing Engine
          </div>
          <div className="flex items-center gap-2">
            <Database size={18} /> Structured Output
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-6">
        <h2 className="text-2xl font-semibold">Ready to get started?</h2>

        <p className="text-gray-600 mt-2">
          Start extracting and transforming web data instantly.
        </p>

        <Link
          href={"/html-to-docx"}
          className="mt-6 bg-[#2f27ce] w-fit text-white px-6 py-3 rounded-lg hover:bg-[#443dff] transition flex items-center gap-2 mx-auto"
        >
          Launch Tools <ArrowRight size={18} />
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 py-6 border-t">
        © {new Date().getFullYear()} TulsHub — Flask & BeautifulSoup
        <p>
          Built with ❤️ by{" "}
          <a
            href="https://github.com/Washington-Kimani"
            target="_blank"
            className="text-[#443dff]"
          >
            Washington Kimani
          </a>
        </p>
      </footer>
    </main>
  );
}
