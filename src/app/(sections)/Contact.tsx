"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, Check, Send, Sparkles, Cpu, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import SectionHeader from "@/components/ui/SectionHeader";

// Custom SVG Icons
// Custom SVG Icons
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24">
    <path
      fill="white"
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
    <path
      d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
      fill="#0A66C2"
    />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 264.583 264.583"
  >
    <defs>
      <radialGradient
        xlinkHref="#instagram_contact_icon__a"
        id="instagram_contact_icon__f"
        cx="158.429"
        cy="578.088"
        r="52.352"
        fx="158.429"
        fy="578.088"
        gradientTransform="matrix(0 -4.03418 4.28018 0 -2332.227 942.236)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#instagram_contact_icon__b"
        id="instagram_contact_icon__g"
        cx="172.615"
        cy="600.692"
        r="65"
        fx="172.615"
        fy="600.692"
        gradientTransform="matrix(.67441 -1.16203 1.51283 .87801 -814.366 -47.835)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#instagram_contact_icon__c"
        id="instagram_contact_icon__h"
        cx="144.012"
        cy="51.337"
        r="67.081"
        fx="144.012"
        fy="51.337"
        gradientTransform="matrix(-2.3989 .67549 -.23008 -.81732 464.996 -26.404)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#instagram_contact_icon__d"
        id="instagram_contact_icon__e"
        cx="199.788"
        cy="628.438"
        r="52.352"
        fx="199.788"
        fy="628.438"
        gradientTransform="matrix(-3.10797 .87652 -.6315 -2.23914 1345.65 1374.198)"
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient id="instagram_contact_icon__d">
        <stop offset="0" stopColor="#ff005f" />
        <stop offset="1" stopColor="#fc01d8" />
      </linearGradient>
      <linearGradient id="instagram_contact_icon__c">
        <stop offset="0" stopColor="#780cff" />
        <stop offset="1" stopColor="#820bff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="instagram_contact_icon__b">
        <stop offset="0" stopColor="#fc0" />
        <stop offset="1" stopColor="#fc0" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="instagram_contact_icon__a">
        <stop offset="0" stopColor="#fc0" />
        <stop offset=".124" stopColor="#fc0" />
        <stop offset=".567" stopColor="#fe4a05" />
        <stop offset=".694" stopColor="#ff0f3f" />
        <stop offset="1" stopColor="#fe0657" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      fill="url(#instagram_contact_icon__e)"
      d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z"
      transform="translate(-71.816 -18.143)"
    />
    <path
      fill="url(#instagram_contact_icon__f)"
      d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z"
      transform="translate(-71.816 -18.143)"
    />
    <path
      fill="url(#instagram_contact_icon__g)"
      d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z"
      transform="translate(-71.816 -18.143)"
    />
    <path
      fill="url(#instagram_contact_icon__h)"
      d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z"
      transform="translate(-71.816 -18.143)"
    />
    <path
      fill="#fff"
      d="M132.345 33.973c-26.716 0-30.07.117-40.563.594-10.472.48-17.62 2.136-23.876 4.567-6.47 2.51-11.958 5.87-17.426 11.335-5.472 5.464-8.834 10.948-11.354 17.412-2.44 6.252-4.1 13.397-4.57 23.858-.47 10.486-.593 13.838-.593 40.535 0 26.697.119 30.037.594 40.522.482 10.465 2.14 17.609 4.57 23.859 2.515 6.465 5.876 11.95 11.346 17.414 5.466 5.468 10.955 8.834 17.42 11.345 6.26 2.431 13.41 4.088 23.881 4.567 10.493.477 13.844.594 40.559.594 26.719 0 30.061-.117 40.555-.594 10.472-.48 17.63-2.136 23.888-4.567 6.468-2.51 11.948-5.877 17.414-11.345 5.472-5.464 8.834-10.949 11.354-17.412 2.419-6.252 4.079-13.398 4.57-23.858.472-10.486.595-13.828.595-40.525s-.123-30.047-.594-40.533c-.492-10.465-2.152-17.608-4.57-23.858-2.521-6.466-5.883-11.95-11.355-17.414-5.472-5.468-10.944-8.827-17.42-11.335-6.271-2.431-13.424-4.088-23.897-4.567-10.493-.477-13.834-.594-40.558-.594zm-8.825 17.715c2.62-.004 5.542 0 8.825 0 26.266 0 29.38.094 39.752.565 9.591.438 14.797 2.04 18.264 3.385 4.591 1.782 7.864 3.912 11.305 7.352 3.443 3.44 5.575 6.717 7.362 11.305 1.346 3.46 2.951 8.663 3.388 18.247.47 10.363.573 13.475.573 39.71 0 26.233-.102 29.346-.573 39.709-.44 9.584-2.042 14.786-3.388 18.247-1.783 4.587-3.919 7.854-7.362 11.292-3.443 3.441-6.712 5.57-11.305 7.352-3.463 1.352-8.673 2.95-18.264 3.388-10.37.47-13.486.573-39.752.573-26.268 0-29.38-.102-39.751-.573-9.592-.443-14.797-2.044-18.267-3.39-4.59-1.781-7.87-3.911-11.313-7.352-3.443-3.44-5.574-6.709-7.362-11.298-1.346-3.461-2.95-8.663-3.387-18.247-.472-10.363-.566-13.476-.566-39.726s.094-29.347.566-39.71c.438-9.584 2.04-14.786 3.387-18.25 1.783-4.588 3.919-7.865 7.362-11.305 3.443-3.441 6.722-5.57 11.313-7.357 3.468-1.351 8.675-2.949 18.267-3.389 9.075-.41 12.592-.532 30.926-.553zm61.337 16.322c-6.518 0-11.805 5.277-11.805 11.792 0 6.512 5.287 11.796 11.805 11.796 6.517 0 11.804-5.284 11.804-11.796 0-6.513-5.287-11.796-11.805-11.796zm-52.512 13.782c-27.9 0-50.519 22.603-50.519 50.482 0 27.879 22.62 50.471 50.52 50.471s50.51-22.592 50.51-50.471c0-27.879-22.613-50.482-50.513-50.482zm0 17.715c18.11 0 32.792 14.67 32.792 32.767 0 18.096-14.683 32.767-32.792 32.767-18.11 0-32.791-14.671-32.791-32.767 0-18.098 14.68-32.767 32.791-32.767z"
    />
  </svg>
);

const PDFIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 75.32 92.604">
    <path
      fill="#ff2116"
      d="M-29.633 123.947c-3.552 0-6.443 2.894-6.443 6.446v49.498c0 3.551 2.891 6.445 6.443 6.445h37.85c3.552 0 6.443-2.893 6.443-6.445v-40.702s.102-1.191-.416-2.351a6.516 6.516 0 0 0-1.275-1.844 1.058 1.058 0 0 0-.006-.008l-9.39-9.21a1.058 1.058 0 0 0-.016-.016s-.802-.764-1.99-1.274c-1.4-.6-2.842-.537-2.842-.537l.021-.002z"
      color="#000"
      fontFamily="sans-serif"
      overflow="visible"
      paintOrder="markers fill stroke"
      style={{
        lineHeight: "normal",
        fontVariantLigatures: "normal",
        fontVariantPosition: "normal",
        fontVariantCaps: "normal",
        fontVariantNumeric: "normal",
        fontVariantAlternates: "normal",
        fontFeatureSettings: "normal",
        textIndent: "0",
        textAlign: "start",
        textDecorationLine: "none",
        textDecorationStyle: "solid",
        textDecorationColor: "#000",
        textTransform: "none",
        textOrientation: "mixed",
        whiteSpace: "normal",
        isolation: "auto",
        mixBlendMode: "normal",
      }}
      transform="translate(53.548 -183.975) scale(1.4843)"
    />
    <path
      fill="#f5f5f5"
      d="M-29.633 126.064h28.38a1.058 1.058 0 0 0 .02 0s1.135.011 1.965.368a5.385 5.385 0 0 1 1.373.869l9.368 9.19s.564.595.838 1.208c.22.495.234 1.4.234 1.4a1.058 1.058 0 0 0-.002.046v40.746a4.294 4.294 0 0 1-4.326 4.328h-37.85a4.294 4.294 0 0 1-4.326-4.328v-49.498a4.294 4.294 0 0 1 4.326-4.328z"
      color="#000"
      fontFamily="sans-serif"
      overflow="visible"
      paintOrder="markers fill stroke"
      style={{
        lineHeight: "normal",
        fontVariantLigatures: "normal",
        fontVariantPosition: "normal",
        fontVariantCaps: "normal",
        fontVariantNumeric: "normal",
        fontVariantAlternates: "normal",
        fontFeatureSettings: "normal",
        textIndent: "0",
        textAlign: "start",
        textDecorationLine: "none",
        textDecorationStyle: "solid",
        textDecorationColor: "#000",
        textTransform: "none",
        textOrientation: "mixed",
        whiteSpace: "normal",
        isolation: "auto",
        mixBlendMode: "normal",
      }}
      transform="translate(53.548 -183.975) scale(1.4843)"
    />
    <path
      fill="#ff2116"
      d="M18.804 55.135c-2.162-2.162.177-5.133 6.526-8.288l3.994-1.985 1.557-3.405a134.054 134.054 0 0 0 2.838-6.79l1.283-3.386-.884-2.506c-1.087-3.08-1.474-7.71-.785-9.374.934-2.255 3.994-2.024 5.205.393.946 1.888.849 5.307-.272 9.618l-.92 3.534.81 1.375c.445.756 1.746 2.55 2.89 3.989l2.152 2.676 2.677-.35c8.503-1.11 11.416.777 11.416 3.48 0 3.413-6.677 3.695-12.284-.243-1.262-.886-2.128-1.767-2.128-1.767s-3.513.716-5.243 1.182c-1.785.48-2.675.782-5.29 1.665 0 0-.918 1.332-1.516 2.301-2.224 3.604-4.821 6.59-6.676 7.677-2.077 1.217-4.254 1.3-5.35.204zm3.393-1.212c1.216-.751 3.676-3.66 5.378-6.361l.69-1.093-3.14 1.578c-4.848 2.438-7.066 4.735-5.913 6.125.648.78 1.423.716 2.985-.25zm31.494-8.84c1.189-.833 1.016-2.51-.328-3.187-1.045-.527-1.888-.635-4.606-.595-1.67.114-4.354.45-4.81.553 0 0 1.476 1.02 2.13 1.394.872.498 2.99 1.422 4.537 1.895 1.526.467 2.409.418 3.077-.06zm-12.663-5.264c-.72-.756-1.943-2.334-2.719-3.507-1.014-1.33-1.523-2.27-1.523-2.27s-.741 2.386-1.35 3.82l-1.898 4.692-.55 1.065s2.925-.96 4.414-1.348c1.576-.412 4.776-1.041 4.776-1.041zm-4.081-16.365c.184-1.54.261-3.078-.233-3.853-1.373-1.5-3.03-.25-2.749 3.318.095 1.2.393 3.25.791 4.515l.725 2.299.51-1.732c.28-.952.71-2.998.956-4.547z"
    />
    <path
      fill="#2c2c2c"
      d="M-20.93 167.839h2.365q1.133 0 1.84.217.706.21 1.19.944.482.728.482 1.756 0 .945-.392 1.624-.392.678-1.056.98-.658.3-2.03.3h-.818v3.73h-1.581zm1.58 1.224v3.33h.785q1.05 0 1.448-.391.406-.392.406-1.274 0-.657-.266-1.063-.266-.413-.588-.504-.315-.098-1-.098zm5.508-1.224h2.148q1.56 0 2.49.552.938.553 1.414 1.645.483 1.091.483 2.42 0 1.4-.434 2.499-.427 1.091-1.316 1.763-.881.672-2.518.672h-2.267zm1.58 1.266v7.018h.659q1.378 0 2-.952.623-.958.623-2.553 0-3.513-2.623-3.513zm6.473-1.266h5.304v1.266h-3.723v2.855h2.981v1.266h-2.98v4.164H-5.79z"
      fontFamily="Franklin Gothic Medium Cond"
      letterSpacing="0"
      style={{ lineHeight: "125%" }}
      transform="translate(53.548 -183.975) scale(1.4843)"
      wordSpacing="4.26"
    />
  </svg>
);

const Gmail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 49.4 512 399.42">
    <g fill="none" fillRule="evenodd">
      <g fillRule="nonzero">
        <path
          fill="#4285f4"
          d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z"
        />
        <path
          fill="#34a853"
          d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z"
        />
        <path
          fill="#fbbc04"
          d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z"
        />
      </g>
      <path
        fill="#ea4335"
        d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z"
      />
      <path
        fill="#c5221f"
        fillRule="nonzero"
        d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z"
      />
    </g>
  </svg>
);

type ProjectType = "fullstack" | "frontend" | "backend" | "design" | "ai" | "consulting";
type TimelineType = "fast" | "normal" | "flexible";

export default function Contact() {
  // Form states
  const [selectedServices, setSelectedServices] = useState<ProjectType[]>(["fullstack"]);
  const [budget, setBudget] = useState<number>(25); // in $k
  const [timeline, setTimeline] = useState<TimelineType>("normal");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // System states
  const [status, setStatus] = useState<"idle" | "transmitting" | "success">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const emailAddress = "shawazstar@gmail.com";

  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Deterministic transmission code based on name (same name gets same code, case-insensitive)
  const getTransmissionCode = (userName: string) => {
    const clean = userName.trim().toUpperCase();
    if (!clean) return "TX-AA-0000-UPLINK";
    let hash = 0;
    for (let i = 0; i < clean.length; i++) {
      hash = (hash << 5) - hash + clean.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);
    const numPart = (absHash % 9000) + 1000; // 1000 to 9999
    const char1 = String.fromCharCode(65 + (absHash % 26));
    const char2 = String.fromCharCode(65 + ((absHash >> 8) % 26));
    return `TX-${char1}${char2}-${numPart}-UPLINK`;
  };

  // Automatically calculate budget recommendation based on selected services and timeline urgency
  useEffect(() => {
    // Define base budgets for each service vector
    const serviceCosts: Record<ProjectType, number> = {
      fullstack: 25,   // Full-Stack Applications: $25K
      frontend: 15,    // Frontend Applications: $15K
      backend: 15,     // Backend Applications: $15K
      design: 10,      // UI/UX Strategy: $10K
      ai: 20,          // AI Integration: $20K
      consulting: 5,   // Consultation: $5K
    };

    // Calculate sum of base costs
    const baseSum = selectedServices.reduce((sum, s) => sum + (serviceCosts[s] || 0), 0);

    // Apply timeline urgency multiplier
    const timelineMultipliers: Record<TimelineType, number> = {
      fast: 1.3,     // Urgent: +30% speed premium
      normal: 1.0,   // Standard: base rate
      flexible: 0.8, // Flexible: -20% timeline discount
    };
    const multiplier = timelineMultipliers[timeline] || 1.0;

    // Calculate estimated recommendation within range [5K, 100K]
    const recommendedVal = Math.max(5, Math.min(100, Math.round(baseSum * multiplier)));

    setBudget(recommendedVal);
  }, [selectedServices, timeline]);

  // Dynamic budget color allocation with smooth blending
  const getBudgetColor = (val: number) => {
    // Normalise val between 5 and 100 to 0 and 1
    const t = (val - 5) / 95;
    let r, g, b;
    if (t < 0.5) {
      // Blend from #3FE0C5 (rgb(63, 224, 197)) to #6E5CFF (rgb(110, 92, 255))
      const tNorm = t * 2;
      r = Math.round(63 + (110 - 63) * tNorm);
      g = Math.round(224 + (92 - 224) * tNorm);
      b = Math.round(197 + (255 - 197) * tNorm);
    } else {
      // Blend from #6E5CFF (rgb(110, 92, 255)) to #FF7A45 (rgb(255, 122, 69))
      const tNorm = (t - 0.5) * 2;
      r = Math.round(110 + (255 - 110) * tNorm);
      g = Math.round(92 + (122 - 92) * tNorm);
      b = Math.round(255 + (69 - 255) * tNorm);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };
  const activeColor = getBudgetColor(budget);

  // Clock Telemetry
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setCurrentTime(
        date.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " GMT+5:30"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Circuit animation logic: Sequential Holographic Reactor Core Transfer
  const triggerCircuitPulse = () => {
    const leftLines = document.querySelectorAll(".circuit-pulse-line-left");
    const rightLines = document.querySelectorAll(".circuit-pulse-line-right");
    const corePulse = document.querySelector(".reactor-inner-pulse");
    
    if (!leftLines.length || !rightLines.length || !corePulse) return;

    // Create GSAP Timeline for sequential flow
    const tl = gsap.timeline();
    
    // 1. Travel from Left Card to Reactor Core
    tl.fromTo(
      leftLines,
      { strokeDashoffset: 180 },
      { strokeDashoffset: 0, duration: 0.5, ease: "power1.inOut" }
    );
    
    // 2. Reactor Core detonation / flash
    tl.fromTo(
      corePulse,
      { scale: 1, opacity: 1 },
      { 
        scale: 2.2, 
        opacity: 0, 
        duration: 0.35, 
        ease: "power2.out",
        transformOrigin: "center center"
      },
      "-=0.15" // slight overlap
    );
    
    // 3. Travel from Reactor Core to Right Card
    tl.fromTo(
      rightLines,
      { strokeDashoffset: 180 },
      { strokeDashoffset: 0, duration: 0.5, ease: "power1.inOut" },
      "-=0.25" // overlap with core detonation
    );
    
    // Reset lines and core state after animation
    tl.to([...leftLines, ...rightLines], {
      strokeDashoffset: 180,
      duration: 0.1
    });
    tl.to(corePulse, {
      scale: 1,
      opacity: 1,
      duration: 0.1
    });
  };

  // Trigger pulse on input edits to visual feedback connection
  const handleServiceToggle = (service: ProjectType) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
    triggerCircuitPulse();
  };

  const handleTimelineChange = (t: TimelineType) => {
    setTimeline(t);
    triggerCircuitPulse();
  };

  // Submit action logs simulated console
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setStatus("transmitting");
    setLogs([]);

    const logSequence = [
      "SYSTEM: INITIALIZING BROADCAST TRANSCEIVER...",
      "SYSTEM: SECURING ENCRYPTED LINK ON PORT 443...",
      `DATA: PACKING INQUIRY (SNDR: ${name.toUpperCase()} <${email.toUpperCase()}>)`,
      `DATA: METRICS [BUDGET: $${budget}K | TIMELINE: ${timeline.toUpperCase()}]`,
      `DATA: SERVICES [${selectedServices.map(s => s.toUpperCase()).join(", ")}]`,
      "TRANS: UPLOADING PACKET TO CLOUD GATEWAY...",
      "TRANS: PACKET ACKNOWLEDGED BY REMOTE J.SHAWAZ SERVER.",
      "TRANS: DISPATCH COMPLETE. TERMINAL STANDBY."
    ];

    logSequence.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        if (index === logSequence.length - 1) {
          setStatus("success");
        }
      }, (index + 1) * 600);
    });
  };

  const handleCopyPass = () => {
    const serviceLabels: Record<ProjectType, string> = {
      fullstack: "Full-Stack Applications",
      frontend: "Frontend Applications",
      backend: "Backend Applications",
      design: "UI/UX Strategy",
      ai: "AI Integration",
      consulting: "Consultation"
    };

    const details = `
--- UPLINK TRANSMISSION PASS ---
ID: ${getTransmissionCode(name)}
TARGET: ${emailAddress}
SENDER: ${name} <${email}>
VECTORS: ${selectedServices.map(s => serviceLabels[s]).join(", ")}
TIMELINE: ${timeline === "fast" ? "URGENT (< 1 Mo)" : timeline === "normal" ? "STANDARD (1-3 Mo)" : "FLEXIBLE (3+ Mo)"}
EST. BUDGET: $${budget}K - $${budget + 5}K USD
STATUS: UPLINKED SECURELY
--------------------------------
`.trim();

    navigator.clipboard.writeText(details).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyLink = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const params = new URLSearchParams({
      name: name,
      email: email,
      services: selectedServices.join(","),
      budget: budget.toString(),
      timeline: timeline
    });
    const url = `${origin}?${params.toString()}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const handleResetForm = () => {
    setStatus("idle");
    setName("");
    setEmail("");
    setMessage("");
    setSelectedServices(["fullstack"]);
    setTimeline("normal");
  };

  return (
    <section id="contact" ref={containerRef} className="w-full py-24 px-4 md:px-8 lg:px-12 bg-[#05040d] relative overflow-hidden flex flex-col items-center select-none">
      <div id="collaborations" />
      
      {/* Dynamic Background Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-35 pointer-events-none" />

      {/* Decorative gradient glow orbs */}
      <div className="absolute top-1/3 left-1/10 w-[500px] h-[500px] bg-signal/5 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/10 w-[500px] h-[500px] bg-pulse/5 blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="w-full max-w-7xl px-0 flex flex-col gap-10 z-10">
        
        {/* Title Header */}
        <SectionHeader id="05" title="COLLABORATION" />

        {/* Section Telemetry Banner */}
        <div className="w-full border border-white/15 bg-void/60 rounded-xl px-5 py-3.5 flex flex-wrap items-center justify-between font-frozen text-xs md:text-sm text-white tracking-wider gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pulse animate-pulse" />
            <span>PORTAL: SECURE UPLINK STATUS [ONLINE]</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-signal" />
              <span>LOCAL_TIME: {currentTime}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Cpu className="w-4 h-4 text-flare" />
              <span>COORDS: 28.6139° N, 77.2090° E</span>
            </div>
          </div>
        </div>

        {/* Grid split deck container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          
          {/* LEFT SIDE: Dynamic CTA Questionnaire */}
          <div className="lg:col-span-5 flex flex-col justify-between border border-white/20 bg-deck/85 backdrop-blur-md rounded-2xl p-6 md:p-8 relative overflow-hidden group/card">
            
            {/* Ambient card hover light */}
            <div className="absolute -inset-[500px] rounded-full bg-gradient-to-tr from-signal/15 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="flex flex-col gap-8 z-10 text-left">
              <div>
                <span className="font-mono text-[10px] text-ink/85 font-semibold tracking-[0.25em] uppercase">STEP_01 / SPECIFY_PROJECT</span>
                <h3 className="font-hocus font-bold text-[28px] md:text-3xl text-ink uppercase tracking-wide mt-1.5 drop-shadow-[0_0_12px_rgba(110,92,255,0.35)]">
                  CONFIGURING THE SCOPE
                </h3>
              </div>

              {/* Service Selection */}
              <div className="flex flex-col gap-3">
                <label className="font-disney text-base md:text-lg text-pulse font-bold tracking-wider flex items-center gap-2 drop-shadow-[0_0_8px_rgba(63,224,197,0.3)]">
                  <span>1. Select Intent Vector</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {(
                    [
                      { id: "fullstack", label: "Full-Stack Applications" },
                      { id: "frontend", label: "Frontend Applications" },
                      { id: "backend", label: "Backend Applications" },
                      { id: "design", label: "UI/UX Strategy" },
                      { id: "ai", label: "AI Integration" },
                      { id: "consulting", label: "Consultation" },
                    ] as const
                  ).map((s) => {
                    const active = selectedServices.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleServiceToggle(s.id)}
                        className={`glass-shiny-pill px-4 py-2.5 rounded-xl border text-[13px] font-mermaid font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                          active
                            ? "bg-signal/25 border-signal text-ink drop-shadow-[0_0_8px_rgba(110,92,255,0.3)]"
                            : "bg-void/50 border-white/10 text-dim/90 hover:text-white hover:border-white/20"
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sci-Fi Power Level Budget Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="budget-range" className="font-disney text-base md:text-lg text-signal font-bold tracking-wider drop-shadow-[0_0_8px_rgba(110,92,255,0.3)] cursor-pointer">
                    <span>2. Budget Estimation</span>
                  </label>
                  <span 
                    className="font-mono text-sm font-bold tracking-widest transition-all duration-200"
                    style={{ 
                      color: activeColor,
                      textShadow: `0 0 10px ${activeColor}40`
                    }}
                  >
                    ${budget}K - ${budget + 5}K USD <span className="text-[10px] text-white/50 align-middle ml-1">(ESTIMATED)</span>
                  </span>
                </div>
                <div className="relative mt-2 flex items-center">
                  <input
                    id="budget-range"
                    aria-label="Budget Estimation"
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    value={budget}
                    readOnly={true}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none pointer-events-none outline-none transition-all duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${activeColor} ${((budget - 5) / 95) * 100}%, rgba(255,255,255,0.08) ${((budget - 5) / 95) * 100}%)`,
                      // @ts-ignore
                      "--slider-color": activeColor
                    }}
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-[10px] text-dim/70 px-1">
                  <span>MIN_LIMIT ($5K)</span>
                  <span>MEDIAN ($50K)</span>
                  <span>CAPITAL ($100K+)</span>
                </div>
              </div>

              {/* Urgency Selector */}
              <div className="flex flex-col gap-3">
                <label className="font-disney text-base md:text-lg text-flare font-bold tracking-wider drop-shadow-[0_0_8px_rgba(255,122,69,0.3)]">
                  <span>3. Deployment Timeline</span>
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(
                    [
                      { id: "fast", label: "URGENT", desc: "< 1 Mo" },
                      { id: "normal", label: "STANDARD", desc: "1-3 Mo" },
                      { id: "flexible", label: "FLEXIBLE", desc: "3+ Mo" },
                    ] as const
                  ).map((t) => {
                    const active = timeline === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleTimelineChange(t.id)}
                        className={`glass-shiny-pill p-3 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all duration-300 cursor-pointer ${
                          active
                            ? "bg-flare/20 border-flare text-ink drop-shadow-[0_0_8px_rgba(255,122,69,0.3)]"
                            : "bg-void/50 border-white/10 text-dim/90 hover:text-white hover:border-white/20"
                        }`}
                      >
                        <span className="font-mermaid font-bold text-xs tracking-widest">{t.label}</span>
                        <span className="font-mono text-[9px] text-dim/80">{t.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick social connect panel at the bottom */}
            <div className="border-t border-white/5 pt-6 mt-8 flex flex-col gap-4 z-10 text-left">
              <span className="font-mono text-[10px] text-ink/75 font-semibold tracking-widest uppercase">
                DIRECT_NETWORKS
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${emailAddress}`}
                  className="p-2.5 rounded-xl border border-white/5 bg-void/50 hover:border-[#ea4335]/30 hover:bg-[#ea4335]/5 transition-all duration-300 flex items-center justify-center group"
                  title="Direct Email"
                  aria-label="Direct Email"
                >
                  <Gmail className="w-4 h-4 transition-all duration-300 grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100" />
                </a>
                <a
                  href="https://github.com/shawaz03"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border border-white/5 bg-void/50 hover:border-white/20 hover:bg-white/5 transition-all duration-300 flex items-center justify-center group"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4 transition-all duration-300 grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shawaz-j-979114302/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border border-white/5 bg-void/50 hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/5 transition-all duration-300 flex items-center justify-center group"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4 transition-all duration-300 grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100" />
                </a>
                <a
                  href="https://www.instagram.com/__iamsha_?igsh=enpzYnpzYWs3Mzlj"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border border-white/5 bg-void/50 hover:border-[#FF7A45]/30 hover:bg-[#FF7A45]/5 transition-all duration-300 flex items-center justify-center group"
                  title="Instagram Profile"
                  aria-label="Instagram Profile"
                >
                  <InstagramIcon className="w-4 h-4 transition-all duration-300 grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100" />
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="p-2.5 rounded-xl border border-white/5 bg-void/50 hover:border-[#ff2116]/30 hover:bg-[#ff2116]/5 transition-all duration-300 flex items-center justify-center group"
                  title="Download Resume"
                  aria-label="Download Resume"
                >
                  <PDFIcon className="w-4 h-4 transition-all duration-300 grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100" />
                </a>
              </div>
            </div>
          </div>

          {/* MIDDLE: Holographic Reactor Core and Laser Bridges */}
          <div className="hidden lg:block lg:col-span-2 relative h-full pointer-events-none">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 500" fill="none">
              <defs>
                {/* Laser Glow Filters */}
                <filter id="neon-glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="neon-glow-violet" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                <linearGradient id="laser-left" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3FE0C5" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#6E5CFF" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="laser-right" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6E5CFF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FF7A45" stopOpacity="0.1" />
                </linearGradient>
                
                <radialGradient id="core-gradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#6E5CFF" />
                  <stop offset="100%" stopColor="#3FE0C5" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Static Background Circuit path */}
              <path
                d="M 10 130 C 50 130, 60 250, 80 250"
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth="1.5"
              />
              <path
                d="M 10 370 C 50 370, 60 250, 80 250"
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth="1.5"
              />
              <path
                d="M 80 250 C 100 250, 110 130, 150 130"
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth="1.5"
              />
              <path
                d="M 80 250 C 100 250, 110 370, 150 370"
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth="1.5"
              />

              {/* Straight Direct Core Line */}
              <line
                x1="10" y1="250" x2="150" y2="250"
                stroke="rgba(110, 92, 255, 0.15)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />

              {/* Laser bridges gradient fill path */}
              <path
                d="M 10 130 C 50 130, 60 250, 80 250"
                stroke="url(#laser-left)"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              <path
                d="M 10 370 C 50 370, 60 250, 80 250"
                stroke="url(#laser-left)"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              <path
                d="M 80 250 C 100 250, 110 130, 150 130"
                stroke="url(#laser-right)"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              <path
                d="M 80 250 C 100 250, 110 370, 150 370"
                stroke="url(#laser-right)"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />

              {/* Dynamic pulse lines (Left) */}
              <path
                className="circuit-pulse-line-left"
                d="M 10 130 C 50 130, 60 250, 80 250"
                stroke="#3FE0C5"
                strokeWidth="2.5"
                filter="url(#neon-glow-cyan)"
                strokeDasharray="180"
                strokeDashoffset="180"
              />
              <path
                className="circuit-pulse-line-left"
                d="M 10 370 C 50 370, 60 250, 80 250"
                stroke="#3FE0C5"
                strokeWidth="2.5"
                filter="url(#neon-glow-cyan)"
                strokeDasharray="180"
                strokeDashoffset="180"
              />

              {/* Dynamic pulse lines (Right) */}
              <path
                className="circuit-pulse-line-right"
                d="M 80 250 C 100 250, 110 130, 150 130"
                stroke="#FF7A45"
                strokeWidth="2.5"
                filter="url(#neon-glow-cyan)"
                strokeDasharray="180"
                strokeDashoffset="180"
              />
              <path
                className="circuit-pulse-line-right"
                d="M 80 250 C 100 250, 110 370, 150 370"
                stroke="#FF7A45"
                strokeWidth="2.5"
                filter="url(#neon-glow-cyan)"
                strokeDasharray="180"
                strokeDashoffset="180"
              />

              {/* Central Holographic Reactor Core */}
              <g transform="translate(80, 250)" className="reactor-core-group">
                {/* Outer Glow ring - Spinning */}
                <circle
                  r="26"
                  fill="rgba(110, 92, 255, 0.04)"
                  stroke="#6E5CFF"
                  strokeWidth="1.2"
                  strokeDasharray="5 7"
                  className="animate-[spin_16s_linear_infinite]"
                  style={{ transformOrigin: "0px 0px" }}
                />
                
                {/* Middle Tech Ring - Counter Spinning */}
                <circle
                  r="18"
                  fill="none"
                  stroke="#3FE0C5"
                  strokeWidth="1.5"
                  strokeDasharray="12 6"
                  className="animate-[spin_7s_linear_infinite_reverse]"
                  style={{ transformOrigin: "0px 0px" }}
                />
                
                {/* Core pulse center */}
                <circle
                  className="reactor-inner-pulse"
                  r="8"
                  fill="url(#core-gradient)"
                  filter="url(#neon-glow-violet)"
                  style={{ transformOrigin: "0px 0px" }}
                />
                
                {/* Core center dot */}
                <circle
                  r="3.5"
                  fill="#FFFFFF"
                  className="animate-pulse"
                  style={{ transformOrigin: "0px 0px" }}
                />
              </g>
            </svg>
          </div>

          {/* RIGHT SIDE: Contact Detail Form */}
          <div className="lg:col-span-5 flex flex-col justify-between border border-white/20 bg-deck/85 backdrop-blur-md rounded-2xl p-6 md:p-8 relative overflow-hidden group/form">
            
            {/* Ambient card hover light */}
            <div className="absolute -inset-[500px] rounded-full bg-gradient-to-tl from-pulse/15 via-transparent to-transparent opacity-0 group-hover/form:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 z-10 text-left h-full justify-between">
              
              {/* Form header */}
              <div className="mb-2">
                <span className="font-mono text-[10px] text-ink/85 font-semibold tracking-[0.25em] uppercase">STEP_02 / SECURE_UPLINK</span>
                <h3 className="font-hocus font-bold text-[28px] md:text-3xl text-ink uppercase tracking-wide mt-1.5 drop-shadow-[0_0_12px_rgba(110,92,255,0.35)]">
                  ESTABLISH CONNECTION
                </h3>
              </div>

              {/* Form Input fields */}
              <div className="flex flex-col gap-4 w-full">
                
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="user-name" className="font-disney text-sm md:text-base text-pulse font-bold tracking-wider uppercase drop-shadow-[0_0_8px_rgba(63,224,197,0.3)]">
                    Sender Name
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#07060c] border border-white/10 rounded-xl px-4 py-3 font-mermaid text-[15px] text-white placeholder-white/35 focus:border-pulse focus:ring-1 focus:ring-pulse/30 focus:outline-none transition-all duration-300 shadow-inner"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="user-email" className="font-disney text-sm md:text-base text-signal font-bold tracking-wider uppercase drop-shadow-[0_0_8px_rgba(110,92,255,0.3)]">
                    Signal Channel (Email)
                  </label>
                  <input
                    id="user-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-[#07060c] border border-white/10 rounded-xl px-4 py-3 font-mermaid text-[15px] text-white placeholder-white/35 focus:border-signal focus:ring-1 focus:ring-signal/30 focus:outline-none transition-all duration-300 shadow-inner"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="user-message" className="font-disney text-sm md:text-base text-flare font-bold tracking-wider uppercase drop-shadow-[0_0_8px_rgba(255,122,69,0.3)]">
                    Transmission Content (Optional)
                  </label>
                  <textarea
                    id="user-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your project goals, timelines, or just say hello..."
                    className="w-full bg-[#07060c] border border-white/10 rounded-xl px-4 py-3 font-mermaid text-[15px] text-white placeholder-white/35 focus:border-flare focus:ring-1 focus:ring-flare/30 focus:outline-none transition-all duration-300 resize-none shadow-inner"
                  />
                </div>

              </div>

              {/* Submit Transmission Trigger button */}
              <button
                type="submit"
                disabled={status !== "idle"}
                className={`glass-shiny-pill w-full py-4 mt-4 rounded-xl font-mermaid font-bold text-base tracking-widest flex items-center justify-center gap-2 border transition-all duration-350 select-none ${
                  status === "idle"
                    ? "bg-signal text-ink border-signal/40 shadow-lg shadow-signal/20 cursor-pointer active:scale-[0.98]"
                    : "bg-void/50 border-white/10 text-dim/95 cursor-not-allowed"
                }`}
              >
                {status === "idle" ? (
                  <>
                    <Send className="w-4 h-4" />
                    <span>LAUNCH UPLINK TRANSMISSION</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-pulse animate-ping" />
                    <span>TRANSMITTING PACKET...</span>
                  </>
                )}
              </button>

            </form>

            {/* Overlaid simulated command terminal for packet transmission logs */}
            <AnimatePresence>
              {status !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="absolute inset-0 bg-[#07060c] border border-[#00ff66]/30 rounded-2xl p-6 z-30 flex flex-col justify-between font-mono text-xs md:text-sm shadow-[0_0_40px_rgba(0,255,102,0.06)]"
                >
                  {/* CRT Scanline Effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20 rounded-2xl z-10" />

                  {/* Console Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5 z-20">
                    <span className="text-[#00ff66] tracking-widest font-bold font-mono">TRANSMITTER_LOGS</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                      <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    </div>
                  </div>

                  {/* Console body */}
                  {status === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex-1 py-4 flex flex-col justify-center items-center z-20 text-left w-full h-full"
                    >
                      {/* Ticket Card container */}
                      <div className="relative w-full max-w-md md:max-w-xl bg-[#09080e]/95 border border-[#3FE0C5]/40 rounded-xl p-6 md:p-8 shadow-[0_0_30px_rgba(63,224,197,0.15)] overflow-hidden animate-[flicker_0.6s_ease-out_1]">
                        {/* Decorative corners */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#3FE0C5]" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#3FE0C5]" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#3FE0C5]" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#3FE0C5]" />

                        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-4">
                          <span className="text-xs md:text-sm text-white/50 uppercase tracking-widest font-frozen">UPLINK TRANSMISSION PASS</span>
                          <span className="text-sm md:text-base text-[#3FE0C5] font-bold font-frozen">
                            {getTransmissionCode(name)}
                          </span>
                        </div>

                        {/* Scoping details */}
                        <div className="flex flex-col gap-3.5 text-xs text-white/90">
                          <div>
                            <span className="text-white/50 text-[11px] md:text-xs block uppercase font-frozen tracking-wider">Recipient</span>
                            <span className="font-medium text-white font-mermaid text-lg md:text-xl block leading-tight mt-1">{emailAddress}</span>
                          </div>
                          <div>
                            <span className="text-white/50 text-[11px] md:text-xs block uppercase font-frozen tracking-wider">Sender</span>
                            <span className="font-medium text-white font-mermaid text-lg md:text-xl block leading-tight mt-1 truncate">
                              {name} &lt;{email}&gt;
                            </span>
                          </div>
                          <div>
                            <span className="text-white/50 text-[11px] md:text-xs block uppercase font-frozen tracking-wider">Project Vectors</span>
                            <span className="font-medium text-[#3FE0C5] font-mermaid text-base md:text-lg block leading-tight mt-1 break-words">
                              {selectedServices.map(s => {
                                const labels: Record<ProjectType, string> = {
                                  fullstack: "Full-Stack Applications",
                                  frontend: "Frontend Applications",
                                  backend: "Backend Applications",
                                  design: "UI/UX Strategy",
                                  ai: "AI Integration",
                                  consulting: "Consultation"
                                };
                                return labels[s].toUpperCase();
                              }).join(", ")}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-white/50 text-[11px] md:text-xs block uppercase font-frozen tracking-wider">Timeline Priority</span>
                              <span className="font-medium text-[#FF7A45] font-mermaid text-base md:text-lg block leading-tight mt-1">
                                {timeline === "fast" ? "URGENT (< 1 Mo)" : timeline === "normal" ? "STANDARD (1-3 Mo)" : "FLEXIBLE (3+ Mo)"}
                              </span>
                            </div>
                            <div>
                              <span className="text-white/50 text-[11px] md:text-xs block uppercase font-frozen tracking-wider">Est. Budget Range</span>
                              <span className="font-medium text-[#6E5CFF] font-mermaid text-lg md:text-xl block leading-tight mt-1">
                                ${budget}K - ${budget + 5}K USD
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Barcode scan layout */}
                        <div className="mt-5 border-t border-white/5 pt-4">
                          <span className="text-white/30 text-[9px] md:text-[10px] block uppercase text-center mb-2 font-frozen tracking-wider">SECURE PACKET SIGNATURE</span>
                          <div className="relative w-full h-8 bg-void/50 border border-white/5 rounded overflow-hidden flex items-center justify-center">
                            <svg className="w-11/12 h-5 opacity-60" viewBox="0 0 100 20" preserveAspectRatio="none">
                              <rect x="1" width="1" height="20" fill="#3FE0C5" />
                              <rect x="3" width="2" height="20" fill="#3FE0C5" />
                              <rect x="7" width="1" height="20" fill="#3FE0C5" />
                              <rect x="9" width="3" height="20" fill="#3FE0C5" />
                              <rect x="14" width="1" height="20" fill="#3FE0C5" />
                              <rect x="16" width="2" height="20" fill="#3FE0C5" />
                              <rect x="20" width="4" height="20" fill="#3FE0C5" />
                              <rect x="26" width="1" height="20" fill="#3FE0C5" />
                              <rect x="29" width="2" height="20" fill="#3FE0C5" />
                              <rect x="33" width="1" height="20" fill="#3FE0C5" />
                              <rect x="35" width="3" height="20" fill="#3FE0C5" />
                              <rect x="40" width="1" height="20" fill="#3FE0C5" />
                              <rect x="43" width="4" height="20" fill="#3FE0C5" />
                              <rect x="49" width="2" height="20" fill="#3FE0C5" />
                              <rect x="53" width="1" height="20" fill="#3FE0C5" />
                              <rect x="56" width="3" height="20" fill="#3FE0C5" />
                              <rect x="61" width="1" height="20" fill="#3FE0C5" />
                              <rect x="64" width="2" height="20" fill="#3FE0C5" />
                              <rect x="68" width="4" height="20" fill="#3FE0C5" />
                              <rect x="74" width="1" height="20" fill="#3FE0C5" />
                              <rect x="77" width="2" height="20" fill="#3FE0C5" />
                              <rect x="81" width="1" height="20" fill="#3FE0C5" />
                              <rect x="84" width="3" height="20" fill="#3FE0C5" />
                              <rect x="89" width="1" height="20" fill="#3FE0C5" />
                              <rect x="92" width="4" height="20" fill="#3FE0C5" />
                              <rect x="98" width="1" height="20" fill="#3FE0C5" />
                            </svg>
                            {/* Scanning laser animation */}
                            <div className="absolute left-0 right-0 h-0.5 bg-[#FF7A45] shadow-[0_0_6px_#FF7A45] animate-scan" />
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  ) : (
                    <>
                      {/* Console logs */}
                      <div className="flex-1 py-4 flex flex-col gap-2.5 overflow-y-auto z-20 font-mono">
                        {logs.map((log, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center"
                          >
                            <div>
                              {log.startsWith("SYSTEM:") && (
                                <>
                                  <span className="text-red-400 font-semibold">[SYSTEM]</span>
                                  <span className="text-white/95 font-medium"> {log.substring(7)}</span>
                                </>
                              )}
                              {log.startsWith("DATA:") && (
                                <>
                                  <span className="text-yellow-400 font-semibold">[DATA]</span>
                                  <span className="text-white/95 font-medium"> {log.substring(5)}</span>
                                </>
                              )}
                              {log.startsWith("TRANS:") && (
                                <>
                                  <span className="text-emerald-400 font-semibold">[TRANS]</span>
                                  <span className={log.includes("ACKNOWLEDGED") || log.includes("COMPLETE") ? "text-[#3FE0C5] font-semibold drop-shadow-[0_0_6px_rgba(63,224,197,0.4)]" : "text-white/95 font-medium"}>
                                    {" "}{log.substring(6)}
                                  </span>
                                </>
                              )}
                              {!log.startsWith("SYSTEM:") && !log.startsWith("DATA:") && !log.startsWith("TRANS:") && (
                                <span className="text-white/95 font-medium">{log}</span>
                              )}
                              {index === logs.length - 1 && (
                                <span className="inline-block w-1.5 h-3 ml-1 bg-[#3FE0C5] animate-pulse align-middle" />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="border-t border-white/5 pt-4 z-20">
                    {status === "success" ? (
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={handleCopyPass}
                          className="flex-1 py-2.5 rounded-lg bg-[#3FE0C5]/10 border border-[#3FE0C5]/30 text-[#3FE0C5] hover:border-[#3FE0C5]/60 hover:bg-[#3FE0C5]/20 hover:shadow-[0_0_15px_rgba(63,224,197,0.15)] transition-all duration-300 font-mono text-xs cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>COPIED!</span>
                            </>
                          ) : (
                            <>
                              <span>COPY PASS</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleCopyLink}
                          className="flex-1 py-2.5 rounded-lg bg-signal/10 border border-signal/30 text-signal hover:border-signal/60 hover:bg-signal/20 hover:shadow-[0_0_15px_rgba(110,92,255,0.15)] transition-all duration-300 font-mono text-xs cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                        >
                          {copiedLink ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>COPIED!</span>
                            </>
                          ) : (
                            <>
                              <span>COPY LINK</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleResetForm}
                          className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all duration-300 font-mono text-xs cursor-pointer active:scale-[0.98]"
                        >
                          CLOSE PORTAL
                        </button>
                      </div>
                    ) : (
                      <div className="text-[#00ff66]/60 animate-pulse text-center tracking-widest text-xs font-mono">
                        UPLINKING SECURE_PACKET_STREAM_v1.0
                      </div>
                    )}
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
