"use client";

import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, X, ShieldCheck, Award, Eye } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

interface Certificate {
  id: string;
  title: string;
  issuer: "Google" | "Meta" | "IBM" | "Anthropic";
  pdfPath: string;
  imagePath: string; // real converted PNG thumbnail path
  badgeLabel: string;
  colors: string[]; // particle colors
  date: string;
}

const CERTIFICATES_DATA: Certificate[] = [
  // Google
  {
    id: "g1",
    title: "Google AI Essentials",
    issuer: "Google",
    pdfPath: "/Certificates/Google AI.pdf",
    imagePath: "/Certificates/thumbnails/Google AI.png",
    badgeLabel: "AI Specialist",
    colors: ["#4285F4", "#34A853", "#FBBC05", "#EA4335"],
    date: "2026"
  },
  {
    id: "g2",
    title: "Google Data Analytics",
    issuer: "Google",
    pdfPath: "/Certificates/Google Data Analytics.pdf",
    imagePath: "/Certificates/thumbnails/Google Data Analytics.png",
    badgeLabel: "Data Analyst",
    colors: ["#4285F4", "#34A853", "#FBBC05", "#ffffff"],
    date: "2026"
  },
  {
    id: "g3",
    title: "Google Project Management",
    issuer: "Google",
    pdfPath: "/Certificates/Google Project Management.pdf",
    imagePath: "/Certificates/thumbnails/Google Project Management.png",
    badgeLabel: "Project Manager",
    colors: ["#EA4335", "#FBBC05", "#4285F4", "#34A853"],
    date: "2026"
  },
  // IBM
  {
    id: "i1",
    title: "Full Stack Developer",
    issuer: "IBM",
    pdfPath: "/Certificates/IBM Full Stack Software Developer.pdf",
    imagePath: "/Certificates/thumbnails/IBM Full Stack Software Developer.png",
    badgeLabel: "Full Stack",
    colors: ["#0f62fe", "#00ffff", "#ffffff", "#8a3ffc"],
    date: "2026"
  },
  // Meta
  {
    id: "m1",
    title: "Meta Backend Developer",
    issuer: "Meta",
    pdfPath: "/Certificates/META Backend Developer.pdf",
    imagePath: "/Certificates/thumbnails/META Backend Developer.png",
    badgeLabel: "Backend Dev",
    colors: ["#0064e0", "#0080ff", "#3fe0c5", "#ffffff"],
    date: "2026"
  },
  {
    id: "m2",
    title: "Meta Frontend Developer",
    issuer: "Meta",
    pdfPath: "/Certificates/META Frontend Developer.pdf",
    imagePath: "/Certificates/thumbnails/META Frontend Developer.png",
    badgeLabel: "Frontend Dev",
    colors: ["#0064e0", "#6e5cff", "#00ffff", "#3fe0c5"],
    date: "2026"
  },
  // Anthropic / Claude
  {
    id: "a1",
    title: "Claude with Amazon Bedrock",
    issuer: "Anthropic",
    pdfPath: "/Certificates/Claude with Amazon Bedrock.pdf",
    imagePath: "/Certificates/thumbnails/Claude with Amazon Bedrock.png",
    badgeLabel: "Bedrock + Claude",
    colors: ["#d97706", "#FFA07A", "#FF7A45", "#ffffff"],
    date: "2026"
  },
  {
    id: "a2",
    title: "MCP Foundations",
    issuer: "Anthropic",
    pdfPath: "/Certificates/MCP.pdf",
    imagePath: "/Certificates/thumbnails/MCP.png",
    badgeLabel: "MCP Standard",
    colors: ["#e05a47", "#f97316", "#FF7A45", "#fbebee"],
    date: "2026"
  },
  {
    id: "a3",
    title: "MCP Advanced",
    issuer: "Anthropic",
    pdfPath: "/Certificates/MCP advanced.pdf",
    imagePath: "/Certificates/thumbnails/MCP advanced.png",
    badgeLabel: "MCP Expert",
    colors: ["#c2410c", "#ea580c", "#f97316", "#ffffff"],
    date: "2026"
  },
  {
    id: "a4",
    title: "Claude Code in Action",
    issuer: "Anthropic",
    pdfPath: "/Certificates/claude code in action.pdf",
    imagePath: "/Certificates/thumbnails/claude code in action.png",
    badgeLabel: "Claude Code",
    colors: ["#854d0e", "#eab308", "#facc15", "#fef08a"],
    date: "2026"
  },
  {
    id: "a5",
    title: "Claude 101 Essentials",
    issuer: "Anthropic",
    pdfPath: "/Certificates/claude 101.pdf",
    imagePath: "/Certificates/thumbnails/claude 101.png",
    badgeLabel: "Claude Intro",
    colors: ["#d97706", "#fbbf24", "#FF7A45", "#ffffff"],
    date: "2026"
  },
  {
    id: "a6",
    title: "Claude CoWork Integration",
    issuer: "Anthropic",
    pdfPath: "/Certificates/claude cowork.pdf",
    imagePath: "/Certificates/thumbnails/claude cowork.png",
    badgeLabel: "Claude CoWork",
    colors: ["#b45309", "#f59e0b", "#FFA07A", "#ffffff"],
    date: "2026"
  },
  {
    id: "a7",
    title: "Claude with the API",
    issuer: "Anthropic",
    pdfPath: "/Certificates/claude with the api.pdf",
    imagePath: "/Certificates/thumbnails/claude with the api.png",
    badgeLabel: "Claude API",
    colors: ["#ea580c", "#f97316", "#FF7A45", "#fbebee"],
    date: "2026"
  },
  {
    id: "a8",
    title: "Subagent Architectures",
    issuer: "Anthropic",
    pdfPath: "/Certificates/subagent.pdf",
    imagePath: "/Certificates/thumbnails/subagent.png",
    badgeLabel: "Subagent Arch",
    colors: ["#e05a47", "#ea580c", "#FFA07A", "#ffffff"],
    date: "2026"
  },
  {
    id: "a9",
    title: "Agent Skills & Actions",
    issuer: "Anthropic",
    pdfPath: "/Certificates/Agent Skills.pdf",
    imagePath: "/Certificates/thumbnails/Agent Skills.png",
    badgeLabel: "Agent Actions",
    colors: ["#c2410c", "#f97316", "#FF7A45", "#fbebee"],
    date: "2026"
  },
  {
    id: "a10",
    title: "AI Fluency Certification",
    issuer: "Anthropic",
    pdfPath: "/Certificates/AI fluency.pdf",
    imagePath: "/Certificates/thumbnails/AI fluency.png",
    badgeLabel: "AI Fluency",
    colors: ["#b45309", "#fbbf24", "#FFA07A", "#ffffff"],
    date: "2026"
  },
  {
    id: "a11",
    title: "AI Fluency (Students)",
    issuer: "Anthropic",
    pdfPath: "/Certificates/AI fluency for student.pdf",
    imagePath: "/Certificates/thumbnails/AI fluency for student.png",
    badgeLabel: "Student AI",
    colors: ["#854d0e", "#fbbf24", "#eab308", "#ffffff"],
    date: "2026"
  },
  {
    id: "a12",
    title: "AI Fluency (Educators)",
    issuer: "Anthropic",
    pdfPath: "/Certificates/AI fluency for educators.pdf",
    imagePath: "/Certificates/thumbnails/AI fluency for educators.png",
    badgeLabel: "Educator AI",
    colors: ["#b45309", "#eab308", "#FFA07A", "#fbebee"],
    date: "2026"
  },
  {
    id: "a13",
    title: "AI Fluency (Nonprofits)",
    issuer: "Anthropic",
    pdfPath: "/Certificates/AI fluency Nonprofit.pdf",
    imagePath: "/Certificates/thumbnails/AI fluency Nonprofit.png",
    badgeLabel: "Nonprofit AI",
    colors: ["#ea580c", "#f97316", "#FF7A45", "#ffffff"],
    date: "2026"
  },
  {
    id: "a14",
    title: "Teaching AI Methods",
    issuer: "Anthropic",
    pdfPath: "/Certificates/Teaching AI.pdf",
    imagePath: "/Certificates/thumbnails/Teaching AI.png",
    badgeLabel: "Teaching AI",
    colors: ["#c2410c", "#fbbf24", "#FFA07A", "#ffffff"],
    date: "2026"
  }
];

const Google = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    overflow="hidden"
    viewBox="0 0 268.152 273.883"
  >
    <defs>
      <linearGradient id="google__a">
        <stop offset="0" stopColor="#0fbc5c" />
        <stop offset="1" stopColor="#0cba65" />
      </linearGradient>
      <linearGradient id="google__g">
        <stop offset=".231" stopColor="#0fbc5f" />
        <stop offset=".312" stopColor="#0fbc5f" />
        <stop offset=".366" stopColor="#0fbc5e" />
        <stop offset=".458" stopColor="#0fbc5d" />
        <stop offset=".54" stopColor="#12bc58" />
        <stop offset=".699" stopColor="#28bf3c" />
        <stop offset=".771" stopColor="#38c02b" />
        <stop offset=".861" stopColor="#52c218" />
        <stop offset=".915" stopColor="#67c30f" />
        <stop offset="1" stopColor="#86c504" />
      </linearGradient>
      <linearGradient id="google__h">
        <stop offset=".142" stopColor="#1abd4d" />
        <stop offset=".248" stopColor="#6ec30d" />
        <stop offset=".312" stopColor="#8ac502" />
        <stop offset=".366" stopColor="#a2c600" />
        <stop offset=".446" stopColor="#c8c903" />
        <stop offset=".54" stopColor="#ebcb03" />
        <stop offset=".616" stopColor="#f7cd07" />
        <stop offset=".699" stopColor="#fdcd04" />
        <stop offset=".771" stopColor="#fdce05" />
        <stop offset=".861" stopColor="#ffce0a" />
      </linearGradient>
      <linearGradient id="google__f">
        <stop offset=".316" stopColor="#ff4c3c" />
        <stop offset=".604" stopColor="#ff692c" />
        <stop offset=".727" stopColor="#ff7825" />
        <stop offset=".885" stopColor="#ff8d1b" />
        <stop offset="1" stopColor="#ff9f13" />
      </linearGradient>
      <linearGradient id="google__b">
        <stop offset=".231" stopColor="#ff4541" />
        <stop offset=".312" stopColor="#ff4540" />
        <stop offset=".458" stopColor="#ff4640" />
        <stop offset=".54" stopColor="#ff473f" />
        <stop offset=".699" stopColor="#ff5138" />
        <stop offset=".771" stopColor="#ff5b33" />
        <stop offset=".861" stopColor="#ff6c29" />
        <stop offset="1" stopColor="#ff8c18" />
      </linearGradient>
      <linearGradient id="google__d">
        <stop offset=".408" stopColor="#fb4e5a" />
        <stop offset="1" stopColor="#ff4540" />
      </linearGradient>
      <linearGradient id="google__c">
        <stop offset=".132" stopColor="#0cba65" />
        <stop offset=".21" stopColor="#0bb86d" />
        <stop offset=".297" stopColor="#09b479" />
        <stop offset=".396" stopColor="#08ad93" />
        <stop offset=".477" stopColor="#0aa6a9" />
        <stop offset=".568" stopColor="#0d9cc6" />
        <stop offset=".667" stopColor="#1893dd" />
        <stop offset=".769" stopColor="#258bf1" />
        <stop offset=".859" stopColor="#3086ff" />
      </linearGradient>
      <linearGradient id="google__e">
        <stop offset=".366" stopColor="#ff4e3a" />
        <stop offset=".458" stopColor="#ff8a1b" />
        <stop offset=".54" stopColor="#ffa312" />
        <stop offset=".616" stopColor="#ffb60c" />
        <stop offset=".771" stopColor="#ffcd0a" />
        <stop offset=".861" stopColor="#fecf0a" />
        <stop offset=".915" stopColor="#fecf08" />
        <stop offset="1" stopColor="#fdcd01" />
      </linearGradient>
      <linearGradient
        xlinkHref="#google__a"
        id="google__s"
        x1="219.7"
        x2="254.467"
        y1="329.535"
        y2="329.535"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#google__b"
        id="google__m"
        cx="109.627"
        cy="135.862"
        r="71.46"
        fx="109.627"
        fy="135.862"
        gradientTransform="matrix(-1.93688 1.043 1.45573 2.55542 290.525 -400.634)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#google__c"
        id="google__n"
        cx="45.259"
        cy="279.274"
        r="71.46"
        fx="45.259"
        fy="279.274"
        gradientTransform="matrix(-3.5126 -4.45809 -1.69255 1.26062 870.8 191.554)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#google__d"
        id="google__l"
        cx="304.017"
        cy="118.009"
        r="47.854"
        fx="304.017"
        fy="118.009"
        gradientTransform="matrix(2.06435 0 0 2.59204 -297.679 -151.747)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#google__e"
        id="google__o"
        cx="181.001"
        cy="177.201"
        r="71.46"
        fx="181.001"
        fy="177.201"
        gradientTransform="matrix(-.24858 2.08314 2.96249 .33417 -255.146 -331.164)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#google__f"
        id="google__p"
        cx="207.673"
        cy="108.097"
        r="41.102"
        fx="207.673"
        fy="108.097"
        gradientTransform="matrix(-1.2492 1.34326 -3.89684 -3.4257 880.501 194.905)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#google__g"
        id="google__r"
        cx="109.627"
        cy="135.862"
        r="71.46"
        fx="109.627"
        fy="135.862"
        gradientTransform="matrix(-1.93688 -1.043 1.45573 -2.55542 290.525 838.683)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#google__h"
        id="google__j"
        cx="154.87"
        cy="145.969"
        r="71.46"
        fx="154.87"
        fy="145.969"
        gradientTransform="matrix(-.0814 -1.93722 2.92674 -.11625 -215.135 632.86)"
        gradientUnits="userSpaceOnUse"
      />
      <filter
        id="google__q"
        width="1.097"
        height="1.116"
        x="-.048"
        y="-.058"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur stdDeviation="1.701" />
      </filter>
      <filter
        id="google__k"
        width="1.033"
        height="1.02"
        x="-.017"
        y="-.01"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur stdDeviation=".242" />
      </filter>
      <clipPath id="google__i" clipPathUnits="userSpaceOnUse">
        <path d="M371.378 193.24H237.083v53.438h77.167c-1.241 7.563-4.026 15.003-8.105 21.786-4.674 7.773-10.451 13.69-16.373 18.196-17.74 13.498-38.42 16.258-52.783 16.258-36.283 0-67.283-23.286-79.285-54.928-.484-1.149-.805-2.335-1.197-3.507a81.115 81.115 0 0 1-4.101-25.448c0-9.226 1.569-18.057 4.43-26.398 11.285-32.897 42.985-57.467 80.179-57.467 7.481 0 14.685.884 21.517 2.648a77.668 77.668 0 0 1 33.425 18.25l40.834-39.712c-24.839-22.616-57.219-36.32-95.844-36.32-30.878 0-59.386 9.553-82.748 25.7-18.945 13.093-34.483 30.625-44.97 50.985-9.753 18.879-15.094 39.8-15.094 62.294 0 22.495 5.35 43.633 15.103 62.337v.126c10.302 19.857 25.368 36.954 43.678 49.988 15.997 11.386 44.68 26.551 84.031 26.551 22.63 0 42.687-4.051 60.375-11.644 12.76-5.478 24.065-12.622 34.301-21.804 13.525-12.132 24.117-27.139 31.347-44.404 7.23-17.265 11.097-36.79 11.097-57.957 0-9.858-.998-19.87-2.689-28.968Z" />
      </clipPath>
    </defs>
    <g
      clipPath="url(#google__i)"
      transform="matrix(.95792 0 0 .98525 -90.174 -78.856)"
    >
      <path
        fill="url(#google__j)"
        d="M92.076 219.958c.148 22.14 6.501 44.983 16.117 63.424v.127c6.949 13.392 16.445 23.97 27.26 34.452l65.327-23.67c-12.36-6.235-14.246-10.055-23.105-17.026-9.054-9.066-15.802-19.473-20.004-31.677h-.17l.17-.127c-2.765-8.058-3.037-16.613-3.14-25.503Z"
        filter="url(#google__k)"
      />
      <path
        fill="url(#google__l)"
        d="M237.083 79.025c-6.456 22.526-3.988 44.421 0 57.161 7.457.006 14.64.888 21.45 2.647a77.662 77.662 0 0 1 33.424 18.25l41.88-40.726c-24.81-22.59-54.667-37.297-96.754-37.332Z"
        filter="url(#google__k)"
      />
      <path
        fill="url(#google__m)"
        d="M236.943 78.847c-31.67 0-60.91 9.798-84.871 26.359a145.533 145.533 0 0 0-24.332 21.15c-1.904 17.744 14.257 39.551 46.262 39.37 15.528-17.936 38.495-29.542 64.056-29.542l.07.002-1.044-57.335c-.048 0-.093-.004-.14-.004Z"
        filter="url(#google__k)"
      />
      <path
        fill="url(#google__n)"
        d="m341.475 226.379-28.268 19.285c-1.24 7.562-4.028 15.002-8.107 21.786-4.674 7.772-10.45 13.69-16.373 18.196-17.702 13.47-38.328 16.244-52.687 16.255-14.842 25.102-17.444 37.675 1.043 57.934 22.877-.016 43.157-4.117 61.046-11.796 12.931-5.551 24.388-12.792 34.761-22.097 13.706-12.295 24.442-27.503 31.769-45 7.327-17.497 11.245-37.282 11.245-58.734Z"
        filter="url(#google__k)"
      />
      <path
        fill="#3086ff"
        d="M234.996 191.21v57.498h136.006c1.196-7.874 5.152-18.064 5.152-26.5 0-9.858-.996-21.899-2.687-30.998Z"
        filter="url(#google__k)"
      />
      <path
        fill="url(#google__o)"
        d="M128.39 124.327c-8.394 9.119-15.564 19.326-21.249 30.364-9.753 18.879-15.094 41.83-15.094 64.324 0 .317.026.627.029.944 4.32 8.224 59.666 6.649 62.456 0-.004-.31-.039-.613-.039-.924 0-9.226 1.57-16.026 4.43-24.367 3.53-10.289 9.056-19.763 16.123-27.926 1.602-2.031 5.875-6.397 7.121-9.016.475-.997-.862-1.557-.937-1.908-.083-.393-1.876-.077-2.277-.37-1.275-.929-3.8-1.414-5.334-1.845-3.277-.921-8.708-2.953-11.725-5.06-9.536-6.658-24.417-14.612-33.505-24.216Z"
        filter="url(#google__k)"
      />
      <path
        fill="url(#google__p)"
        d="M162.099 155.857c22.112 13.301 28.471-6.714 43.173-12.977l-25.574-52.664a144.74 144.74 0 0 0-26.543 14.504c-12.316 8.512-23.192 18.9-32.176 30.72Z"
        filter="url(#google__q)"
      />
      <path
        fill="url(#google__r)"
        d="M171.099 290.222c-29.683 10.641-34.33 11.023-37.062 29.29a144.806 144.806 0 0 0 16.792 13.984c15.996 11.386 46.766 26.551 86.118 26.551.046 0 .09-.004.137-.004v-59.157l-.094.002c-14.736 0-26.512-3.843-38.585-10.527-2.977-1.648-8.378 2.777-11.123.799-3.786-2.729-12.9 2.35-16.183-.938Z"
        filter="url(#google__k)"
      />
      <path
        fill="url(#google__s)"
        d="M219.7 299.023v59.996c5.506.64 11.236 1.028 17.247 1.028 6.026 0 11.855-.307 17.52-.872v-59.748a105.119 105.119 0 0 1-17.477 1.461c-5.932 0-11.7-.686-17.29-1.865Z"
        filter="url(#google__k)"
        opacity=".5"
      />
    </g>
  </svg>
);

const Meta = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 171">
    <defs>
      <linearGradient
        id="meta__a"
        x1="13.878%"
        x2="89.144%"
        y1="55.934%"
        y2="58.694%"
      >
        <stop offset="0%" stopColor="#0064E1" />
        <stop offset="40%" stopColor="#0064E1" />
        <stop offset="83%" stopColor="#0073EE" />
        <stop offset="100%" stopColor="#0082FB" />
      </linearGradient>
      <linearGradient
        id="meta__b"
        x1="54.315%"
        x2="54.315%"
        y1="82.782%"
        y2="39.307%"
      >
        <stop offset="0%" stopColor="#0082FB" />
        <stop offset="100%" stopColor="#0064E0" />
      </linearGradient>
    </defs>
    <path
      fill="#0081FB"
      d="M27.651 112.136c0 9.775 2.146 17.28 4.95 21.82 3.677 5.947 9.16 8.466 14.751 8.466 7.211 0 13.808-1.79 26.52-19.372 10.185-14.092 22.186-33.874 30.26-46.275l13.675-21.01c9.499-14.591 20.493-30.811 33.1-41.806C161.196 4.985 172.298 0 183.47 0c18.758 0 36.625 10.87 50.3 31.257C248.735 53.584 256 81.707 256 110.729c0 17.253-3.4 29.93-9.187 39.946-5.591 9.686-16.488 19.363-34.818 19.363v-27.616c15.695 0 19.612-14.422 19.612-30.927 0-23.52-5.484-49.623-17.564-68.273-8.574-13.23-19.684-21.313-31.907-21.313-13.22 0-23.859 9.97-35.815 27.75-6.356 9.445-12.882 20.956-20.208 33.944l-8.066 14.289c-16.203 28.728-20.307 35.271-28.408 46.07-14.2 18.91-26.324 26.076-42.287 26.076-18.935 0-30.91-8.2-38.325-20.556C2.973 139.413 0 126.202 0 111.148l27.651.988Z"
    />
    <path
      fill="url(#meta__a)"
      d="M21.802 33.206C34.48 13.666 52.774 0 73.757 0 85.91 0 97.99 3.597 110.605 13.897c13.798 11.261 28.505 29.805 46.853 60.368l6.58 10.967c15.881 26.459 24.917 40.07 30.205 46.49 6.802 8.243 11.565 10.7 17.752 10.7 15.695 0 19.612-14.422 19.612-30.927l24.393-.766c0 17.253-3.4 29.93-9.187 39.946-5.591 9.686-16.488 19.363-34.818 19.363-11.395 0-21.49-2.475-32.654-13.007-8.582-8.083-18.615-22.443-26.334-35.352l-22.96-38.352C118.528 64.08 107.96 49.73 101.845 43.23c-6.578-6.988-15.036-15.428-28.532-15.428-10.923 0-20.2 7.666-27.963 19.39L21.802 33.206Z"
    />
    <path
      fill="url(#meta__b)"
      d="M73.312 27.802c-10.923 0-20.2 7.666-27.963 19.39-10.976 16.568-17.698 41.245-17.698 64.944 0 9.775 2.146 17.28 4.95 21.82L9.027 149.482C2.973 139.413 0 126.202 0 111.148 0 83.772 7.514 55.24 21.802 33.206 34.48 13.666 52.774 0 73.757 0l-.445 27.802Z"
    />
  </svg>
);

const IBM = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 1000 400">
    <path
      fill="#1f70c1"
      d="M0 0v27.367h194.648V0H0zm222.226 0v27.367h277.383S471.276 0 433.75 0H222.226zm331.797 0v27.367h167.812L711.875 0H554.023zm288.125 0-9.961 27.367h166.289V0H842.148zM0 53.222v27.367h194.648V53.222H0zm222.226.039V80.59h309.57s-3.615-21.063-9.922-27.329H222.226zm331.797 0V80.59h186.211l-9.219-27.329H554.023zm268.203 0-9.219 27.329h185.469V53.261h-176.25zM55.937 106.444v27.406h84.297v-27.406H55.937zm222.227 0v27.406h84.297v-27.406h-84.297zm166.289 0v27.406h84.297s5.352-14.473 5.352-27.406h-89.649zm165.508 0v27.406h149.453l-9.961-27.406H609.961zm193.906 0-10 27.406h150.195v-27.406H803.867zm-747.93 53.262v27.367h84.297v-27.367H55.937zm222.227 0v27.367h215.312s18.012-14.042 23.75-27.367H278.164zm331.797 0v27.367h84.297v-15.234l5.352 15.234h154.414l5.742-15.234v15.234h84.297v-27.367H785.82l-8.398 23.18-8.438-23.18H609.961zM55.937 212.928v27.367h84.297v-27.367H55.937zm222.227 0v27.367h239.062c-5.739-13.281-23.75-27.367-23.75-27.367H278.164zm331.797 0v27.367h84.297v-27.367h-84.297zm99.609 0 10.195 27.367h115.781l9.688-27.367H709.57zm150.195 0v27.367h84.297v-27.367h-84.297zM55.937 266.15v27.366h84.297V266.15H55.937zm222.227 0v27.366h84.297V266.15h-84.297zm166.289 0v27.366h89.648c0-12.915-5.352-27.366-5.352-27.366h-84.296zm165.508 0v27.366h84.297V266.15h-84.297zm118.75 0 9.883 27.366h77.617l9.961-27.366h-97.461zm131.054 0v27.366h84.297V266.15h-84.297zM1.523 319.372v27.406h194.648v-27.406H1.523zm220.703 0v27.406h299.648c6.307-6.275 9.922-27.406 9.922-27.406h-309.57zm333.321 0v27.406h138.711v-27.406H555.547zm192.343 0 10.156 27.406h39.492l9.531-27.406H747.89zm111.875 0v27.406H1000v-27.406H859.765zM1.523 372.633V400h194.648v-27.367H1.523zm220.703 0v27.328H433.75c37.526 0 65.859-27.328 65.859-27.328H222.226zm333.321 0V400h138.711v-27.367H555.547zm211.601 0 9.766 27.29 1.68.038 9.922-27.328h-21.368zm92.617 0V400H1000v-27.367H859.765z"
    />
  </svg>
);

const Anthropic = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fill="currentColor"
    fillRule="evenodd"
    style={{ flex: "none", lineHeight: "1" }}
    viewBox="0 0 24 24"
  >
    <title>Anthropic</title>
    <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" />
  </svg>
);


const BACKGROUND_PARTICLES = Array.from({ length: 14 }).map((_, i) => {
  // Use a simple deterministic pseudo-random generator based on sin
  const random = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  return {
    id: i,
    top: `${(10 + random(i + 1) * 80).toFixed(4)}%`,
    left: `${(5 + random(i + 2) * 90).toFixed(4)}%`,
    size: `${(2 + random(i + 3) * 4).toFixed(4)}px`,
    delay: `${(random(i + 4) * -8).toFixed(4)}s`,
    duration: `${(6 + random(i + 5) * 8).toFixed(4)}s`,
  };
});

export default function Certificates() {
  const [selectedIssuer, setSelectedIssuer] = useState<"All" | "Google" | "Meta" | "IBM" | "Anthropic">("All");
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1200);

  const containerRef = useRef<HTMLDivElement>(null);
  const modalCertCardRef = useRef<HTMLDivElement>(null);

  // Specular Border Shine coordinates state
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Marquee auto-scroll tracking
  const scrollX = useRef(0);
  const isHovered = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  // Interactive dragging state
  const isDragging = useRef(false);
  const startDragX = useRef(0);
  const scrollStart = useRef(0);
  const dragDistance = useRef(0);

  // Filter credentials list
  const filteredCerts = CERTIFICATES_DATA.filter(
    (c) => selectedIssuer === "All" || c.issuer === selectedIssuer
  );

  const cardWidth = 320;
  const gap = 28;
  const itemWidth = cardWidth + gap;
  const totalItems = filteredCerts.length;
  const totalWidth = totalItems * itemWidth;

  // Responsive Width measuring
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setViewportWidth(containerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Marquee scroll loop
  useEffect(() => {
    const tick = () => {
      // Auto-scroll ONLY when displaying all credentials
      if (selectedIssuer === "All" && !isHovered.current && !isZoomed && !isDragging.current && totalWidth > 0) {
        // Speed up autoscroll and scroll from Left-to-Right (subtracted offset)
        scrollX.current = (scrollX.current - 1.45 + totalWidth) % totalWidth;
      }
      // Force render update
      if (containerRef.current) {
        const cards = containerRef.current.querySelectorAll(".cert-card-wrapper");
        const centerX = viewportWidth / 2;

        cards.forEach((cardEl, i) => {
          const el = cardEl as HTMLElement;
          
          let distToCenter = 0;
          if (selectedIssuer === "All") {
            // Loop scrolling math for All credentials
            let x = (i * itemWidth - scrollX.current) % totalWidth;
            if (x < 0) x += totalWidth; // Keep positive
              
            // Centering math: if x coordinate exceeds half width, wrap it to the left
            const halfWidth = totalWidth / 2;
            if (x > halfWidth) {
              x -= totalWidth;
            }
            distToCenter = x;
          } else {
            // Static centered layout for individual filters (clamped scrolling allowed if overflow)
            const maxScroll = Math.max(0, totalWidth - viewportWidth);
            const currentScroll = Math.max(0, Math.min(scrollX.current, maxScroll));
            
            let cardX = i * itemWidth - currentScroll;
            // If all items fit within the viewport, center the entire row
            if (totalWidth <= viewportWidth) {
              cardX += (viewportWidth - totalWidth + gap) / 2;
            }
            
            const cardCenterX = cardX + cardWidth / 2;
            distToCenter = cardCenterX - centerX;
          }

          const normDist = distToCenter / (viewportWidth / 2);

          // Hide cards that are far outside the viewport edges
          if (Math.abs(normDist) > 1.35) {
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
            return;
          }

          // Convex Curved Cylinder Math (First carousel design)
          // Center card sits forward and is large, side cards recede back and are smaller
          const translateX = distToCenter;
          const translateZ = -Math.abs(normDist) * 110; // push sides back
          const rotateY = -normDist * 30; // slant side cards inwards
          const scale = 0.96 - Math.abs(normDist) * 0.12; // shrink side cards
          const opacity = 1 - Math.min(Math.abs(normDist) * 0.45, 0.45);

          el.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
          el.style.opacity = opacity.toString();
          el.style.zIndex = Math.round(100 - Math.abs(normDist) * 60).toString();
          el.style.pointerEvents = "auto";
        });
      }

      animationFrameId.current = requestAnimationFrame(tick);
    };

    animationFrameId.current = requestAnimationFrame(tick);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [filteredCerts, selectedIssuer, viewportWidth, isZoomed, totalWidth]);

  // Card Specular Border light tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlowPos({ x, y });
    setHoveredCardId(id);
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
  };

  // Mouse Drag Scrolling Event Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startDragX.current = e.clientX;
    scrollStart.current = scrollX.current;
    dragDistance.current = 0;
  };

  const handleMouseMoveDrag = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startDragX.current;
    dragDistance.current = Math.abs(dx);
    
    if (selectedIssuer === "All") {
      scrollX.current = (scrollStart.current - dx + totalWidth) % totalWidth;
    } else {
      const maxScroll = Math.max(0, totalWidth - viewportWidth);
      scrollX.current = Math.max(0, Math.min(scrollStart.current - dx, maxScroll));
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Zoom Into Fullscreen view
  const handleCardClick = (cert: Certificate) => {
    // Prevent click trigger if the user was dragging/swiping
    if (dragDistance.current > 5) return;
    isHovered.current = true;
    setActiveCert(cert);
    setIsZoomed(true);
    setIsClosing(false);
    setTimeout(() => {
      setModalActive(true);
    }, 15);
  };

  // Crystalline Spring Zoom-Back Close Effect (Option 1)
  const handleClose = () => {
    setModalActive(false);
    setIsClosing(true);
    // Wait for the spring scale transition (350ms) to complete before unmounting modal
    setTimeout(() => {
      setIsZoomed(false);
      setActiveCert(null);
      setIsClosing(false);
      isHovered.current = false;
    }, 350);
  };

  return (
    <section id="certificates" className="w-full py-24 px-4 md:px-8 lg:px-12 bg-[#05040d] relative overflow-hidden flex flex-col items-center select-none">
      
      {/* Glow filters for capsules & ambient particles */}
      <style>{`
        .glass-shiny-pill {
          position: relative;
          overflow: hidden;
        }
        .glass-shiny-pill::after {
          content: "";
          position: absolute;
          top: 0;
          left: -200%;
          width: 80%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.25) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-20deg);
          transition: left 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-shiny-pill:hover::after {
          left: 200%;
        }
        @keyframes drift {
          0% { transform: translateY(0px) scale(1); opacity: 0.12; }
          50% { transform: translateY(-16px) scale(1.15); opacity: 0.38; }
          100% { transform: translateY(0px) scale(1); opacity: 0.12; }
        }
      `}</style>

      {/* Floating Ambient Cosmic Particles */}
      {BACKGROUND_PARTICLES.map((p) => (
        <div 
          key={p.id}
          className="absolute rounded-full pointer-events-none bg-white/20 z-0"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animation: `drift ${p.duration} ease-in-out infinite ${p.delay}`,
            boxShadow: `0 0 6px rgba(255, 255, 255, 0.35)`
          }}
        />
      ))}

      {/* Background Accent gradients */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-signal/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-flare/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-signal/15 to-transparent pointer-events-none z-0" />

      <div className="w-full max-w-none px-0 flex flex-col gap-10 z-10">
        
        {/* Section Title Header */}
        <SectionHeader id="04" title="CERTIFICATES" />

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-2">
          {(["All", "Google", "Meta", "IBM", "Anthropic"] as const).map((issuer) => (
            <button
              key={issuer}
              onClick={() => {
                setSelectedIssuer(issuer);
                scrollX.current = 0; // Reset scroll position to avoid alignment glitches
              }}
              className={`glass-shiny-pill px-5 py-2.5 rounded-full font-mermaid font-bold text-base border transition-all duration-300 cursor-pointer flex items-center gap-2 group ${
                selectedIssuer === issuer
                  ? "border-flare/50 text-[#FFA07A] bg-flare/10 shadow-[0_0_12px_rgba(255,122,69,0.15)]"
                  : "border-white/10 text-dim hover:text-white hover:border-white/20 bg-void/35"
              }`}
              style={{
                background: selectedIssuer === issuer
                  ? "linear-gradient(135deg, rgba(255, 122, 69, 0.12) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 50.5%, rgba(255, 122, 69, 0.06) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(255, 255, 255, 0) 50.5%, rgba(255, 255, 255, 0.01) 100%)"
              }}
            >
              {issuer === "Google" && (
                <Google 
                  className={`w-5 h-5 transition-all duration-300 ${
                    selectedIssuer === issuer ? "" : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
                  }`} 
                />
              )}
              {issuer === "Meta" && (
                <Meta 
                  className={`w-5 h-3.5 transition-all duration-300 ${
                    selectedIssuer === issuer ? "" : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
                  }`} 
                />
              )}
              {issuer === "IBM" && (
                <IBM 
                  className={`w-6 h-2.5 transition-all duration-300 ${
                    selectedIssuer === issuer ? "" : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
                  }`} 
                />
              )}
              {issuer === "Anthropic" && (
                <Anthropic 
                  className={`w-4 h-4 transition-all duration-300 ${
                    selectedIssuer === issuer ? "" : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
                  }`} 
                />
              )}
              <span>{issuer === "Anthropic" ? "Anthropic (Claude)" : issuer}</span>
            </button>
          ))}
        </div>

        {/* Inward-Curved 3D Viewport Marquee Container (Increased container height to 540px, with drag-to-scroll support) */}
        <div 
          ref={containerRef}
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; handleMouseUp(); }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMoveDrag}
          onMouseUp={handleMouseUp}
          className="w-full h-[540px] relative overflow-hidden flex items-center justify-center mt-8 cursor-grab active:cursor-grabbing select-none"
          style={{ perspective: 900, transformStyle: "preserve-3d" }}
        >
          {filteredCerts.map((cert) => {
            const isHoveredCard = hoveredCardId === cert.id;
            return (
              <div
                key={cert.id}
                onClick={() => handleCardClick(cert)}
                onMouseMove={(e) => handleMouseMove(e, cert.id)}
                onMouseLeave={handleMouseLeave}
                className="cert-card-wrapper absolute top-1/2 -translate-y-1/2 w-[320px] h-[430px] cursor-pointer group"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Branded Backlight Aura Glow */}
                <div 
                  className="absolute -inset-2 rounded-2xl blur-2xl transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background: `radial-gradient(circle, ${cert.colors[0]} 0%, transparent 75%)`,
                    opacity: isHoveredCard ? 0.35 : 0.12
                  }}
                />

                {/* Visual Glass Card Body */}
                <div 
                  className="w-full h-full rounded-2xl border border-white/10 flex flex-col justify-between backdrop-blur-md shadow-2xl relative overflow-hidden transition-all duration-350 z-10"
                  style={{
                    background: "linear-gradient(135deg, rgba(14, 12, 22, 0.8) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(255, 255, 255, 0) 50.5%, rgba(14, 12, 22, 0.8) 100%)",
                    boxShadow: isHoveredCard 
                      ? `0 0 1px 1px ${cert.colors[0]}70 inset, 0 20px 45px rgba(0, 0, 0, 0.75)` 
                      : "0 0 1px 1px rgba(255,255,255,0.05) inset, 0 10px 30px rgba(0,0,0,0.5)"
                  }}
                >
                  {/* Crystalline Specular diagonal sheen sweep */}
                  <div 
                    className="absolute inset-0 z-20 pointer-events-none transition-transform duration-1000 ease-out"
                    style={{
                      background: "linear-gradient(110deg, transparent 35%, rgba(255, 255, 255, 0.04) 43%, rgba(255, 255, 255, 0.16) 50%, rgba(255, 255, 255, 0.04) 57%, transparent 65%)",
                      transform: isHoveredCard ? "translateX(160%)" : "translateX(-160%)",
                    }}
                  />

                  {/* Interactive Cursor Glow (Specular Mask) */}
                  {isHoveredCard && (
                    <div 
                      className="absolute inset-0 rounded-2xl border pointer-events-none z-10 transition-opacity duration-300"
                      style={{
                        borderColor: cert.colors[0],
                        opacity: 0.55,
                        maskImage: `radial-gradient(120px circle at ${glowPos.x}px ${glowPos.y}px, black 30%, transparent 100%)`,
                        WebkitMaskImage: `radial-gradient(120px circle at ${glowPos.x}px ${glowPos.y}px, black 30%, transparent 100%)`
                      }}
                    />
                  )}

                  {/* Real Certificate Image Preview (Increased image height to 205px) */}
                  <div className="w-full h-[205px] bg-void/50 overflow-hidden relative border-b border-white/5 shrink-0 select-none">
                    <img 
                      src={cert.imagePath} 
                      alt={cert.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      draggable={false}
                      loading="lazy"
                    />
                    {/* Dark glassmorphic gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Card Header (Issuer & Date) */}
                  <div className="px-5 pt-3.5 flex items-center justify-between border-b border-white/5 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      {/* Logo representations */}
                      {cert.issuer === "Google" && (
                        <Google className="w-4 h-4 text-[#4285F4]" />
                      )}
                      {cert.issuer === "Meta" && (
                        <Meta className="w-4 h-4 text-[#0064e0]" />
                      )}
                      {cert.issuer === "IBM" && (
                        <IBM className="w-8 h-4 text-[#0f62fe]" />
                      )}
                      {cert.issuer === "Anthropic" && (
                        <Anthropic className="w-4 h-4 text-[#d97706]" />
                      )}
                      <span className="text-[10px] text-dim/85 font-mono tracking-wider">{cert.issuer.toUpperCase()}</span>
                    </div>
                    <span className="text-[9px] font-mono text-dim/75">{cert.date}</span>
                  </div>

                  {/* Metadata */}
                  <div className="px-5 py-2 flex-1 flex flex-col justify-center text-left">
                    <h4 className="font-frozen font-bold text-[13px] leading-tight tracking-wider text-ink uppercase line-clamp-2">
                      {cert.title}
                    </h4>
                    <p className="font-mermaid text-sm text-[#FF7A45] mt-1">{cert.badgeLabel}</p>
                  </div>

                  {/* Card Bottom verify link button */}
                  <div className="px-5 pb-5 pt-2 flex items-center justify-center">
                    <span 
                      className="glass-shiny-pill flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-[11px] border font-mermaid font-bold transition-all duration-300 w-full justify-center"
                      style={{
                        borderColor: isHoveredCard ? cert.colors[0] : "rgba(255,255,255,0.06)",
                        color: isHoveredCard ? "#ffffff" : "#8E8D99",
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(255, 255, 255, 0) 50.5%, rgba(255, 255, 255, 0.01) 100%)"
                      }}
                    >
                      <Eye className="w-3 h-3" />
                      <span>View Credential</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative scroll note */}
        <p className="font-mermaid text-sm text-dim/75 text-center tracking-widest uppercase mt-4">
          Hover to pause / Click to open verified credential
        </p>

      </div>

      {/* FULLSCREEN PREVIEW ZOOM MODAL CONTAINER */}
      {isZoomed && activeCert && (
        <div 
          className={`fixed inset-0 w-full h-full bg-[#05040d]/90 backdrop-blur-md z-40 flex items-center justify-center p-4 select-none transition-opacity duration-350 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
          onClick={handleClose}
        >
          {/* Main Modal box container (Spring Open & Zoom-Back Exit Transition) */}
          <div 
            ref={modalCertCardRef}
            className={`w-full max-w-5xl h-[85vh] bg-[#0E0C16] border border-white/10 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col md:flex-row relative z-50 transition-all duration-350 ${modalActive && !isClosing ? 'scale-100 opacity-100 rotate-y-0 translate-z-0' : 'scale-[0.35] opacity-0 rotate-y-[20deg] translate-z-[-200px]'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)', transformStyle: "preserve-3d" }}
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside card
          >
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/10 bg-[#14121F]/80 hover:bg-red-950/20 hover:border-red-500/30 text-dim hover:text-red-200 cursor-pointer flex items-center justify-center transition-all duration-300 z-50"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Split view: Left Profile Card Details (width 35%) | Right Live PDF iframe (width 65%) */}
            <div className="w-full md:w-[35%] border-b md:border-b-0 md:border-r border-white/10 p-8 flex flex-col justify-between bg-void/45 animate-in slide-in-from-left duration-300">
              <div className="flex flex-col gap-6 text-left">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-dim/85 uppercase">VERIFIED CREDENTIAL</span>
                  <h3 className="font-frozen font-bold text-2xl text-flare uppercase tracking-wide leading-tight">
                    {activeCert.title}
                  </h3>
                </div>

                <div className="flex flex-col gap-4 font-mermaid text-base text-white">
                  <div className="flex items-center gap-3 bg-void/50 border border-white/5 p-3 rounded-xl">
                    <Award className="w-5 h-5 text-signal" />
                    <div>
                      <p className="text-[10px] text-dim/80 font-mono uppercase tracking-wider">ISSUER</p>
                      <p className="font-bold text-sm tracking-wide">{activeCert.issuer.toUpperCase()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-void/50 border border-white/5 p-3 rounded-xl">
                    <ShieldCheck className="w-5 h-5 text-signal" />
                    <div>
                      <p className="text-[10px] text-dim/80 font-mono uppercase tracking-wider">STATUS</p>
                      <p className="font-bold text-sm tracking-wide text-[#3FE0C5]">VERIFIED CREDENTIAL</p>
                    </div>
                  </div>
                </div>

                <p className="font-mermaid text-base text-white/85 leading-relaxed text-justify">
                  This official verified credential certifies the completion of professional coursework and practical lab projects validated directly by {activeCert.issuer}.
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-col gap-2 w-full">
                <a 
                  href={activeCert.pdfPath}
                  target="_blank" 
                  rel="noreferrer"
                  className="glass-shiny-pill flex items-center justify-center gap-2 border border-signal/30 text-white py-2.5 rounded-xl font-mermaid font-bold text-sm tracking-wide transition-all duration-300 hover:border-signal/55"
                  style={{
                    background: "linear-gradient(135deg, rgba(110, 92, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 50.5%, rgba(110, 92, 255, 0.08) 100%)"
                  }}
                >
                  <ExternalLink className="w-4 h-4 text-[#B5A9FF]" />
                  <span>Verify Credential Link</span>
                </a>
              </div>
            </div>

            {/* Right side: PDF Document Reader Iframe (Fits single page view cleanly, hiding thumbnail sidebar) */}
            <div className="flex-1 w-full h-full bg-[#1E1E24] relative">
              <iframe 
                src={`${activeCert.pdfPath}#navpanes=0&view=FitH`}
                className="w-full h-full border-none"
                title={`${activeCert.title} PDF Document`}
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
