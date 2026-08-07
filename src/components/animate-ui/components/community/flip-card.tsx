"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface FlipCardProps {
  data: {
    name: string;
    username: string;
    image: string;
    bio: string;
    stats: {
      following: string | number;
      followers: string | number;
      posts: string | number;
    };
    socialLinks: {
      linkedin: string;
      github: string;
      twitter: string;
      instagram: string;
    };
  };
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Custom SVG Icons provided by the user
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
        xlinkHref="#instagram_icon__a"
        id="instagram_icon__f"
        cx="158.429"
        cy="578.088"
        r="52.352"
        fx="158.429"
        fy="578.088"
        gradientTransform="matrix(0 -4.03418 4.28018 0 -2332.227 942.236)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#instagram_icon__b"
        id="instagram_icon__g"
        cx="172.615"
        cy="600.692"
        r="65"
        fx="172.615"
        fy="600.692"
        gradientTransform="matrix(.67441 -1.16203 1.51283 .87801 -814.366 -47.835)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#instagram_icon__c"
        id="instagram_icon__h"
        cx="144.012"
        cy="51.337"
        r="67.081"
        fx="144.012"
        fy="51.337"
        gradientTransform="matrix(-2.3989 .67549 -.23008 -.81732 464.996 -26.404)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#instagram_icon__d"
        id="instagram_icon__e"
        cx="199.788"
        cy="628.438"
        r="52.352"
        fx="199.788"
        fy="628.438"
        gradientTransform="matrix(-3.10797 .87652 -.6315 -2.23914 1345.65 1374.198)"
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient id="instagram_icon__d">
        <stop offset="0" stopColor="#ff005f" />
        <stop offset="1" stopColor="#fc01d8" />
      </linearGradient>
      <linearGradient id="instagram_icon__c">
        <stop offset="0" stopColor="#780cff" />
        <stop offset="1" stopColor="#820bff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="instagram_icon__b">
        <stop offset="0" stopColor="#fc0" />
        <stop offset="1" stopColor="#fc0" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="instagram_icon__a">
        <stop offset="0" stopColor="#fc0" />
        <stop offset=".124" stopColor="#fc0" />
        <stop offset=".567" stopColor="#fe4a05" />
        <stop offset=".694" stopColor="#ff0f3f" />
        <stop offset="1" stopColor="#fe0657" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      fill="url(#instagram_icon__e)"
      d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z"
      transform="translate(-71.816 -18.143)"
    />
    <path
      fill="url(#instagram_icon__f)"
      d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z"
      transform="translate(-71.816 -18.143)"
    />
    <path
      fill="url(#instagram_icon__g)"
      d="M204.15 18.143c-55.23 0-71.383.057-74.523.317-11.334.943-18.387 2.728-26.07 6.554-5.922 2.942-10.592 6.351-15.201 11.13-8.394 8.716-13.481 19.439-15.323 32.184-.895 6.188-1.156 7.45-1.209 39.056-.02 10.536 0 24.4 0 42.999 0 55.2.062 71.341.326 74.476.916 11.032 2.645 17.973 6.308 25.565 7 14.533 20.37 25.443 36.12 29.514 5.453 1.404 11.476 2.178 19.208 2.544 3.277.142 36.669.244 70.081.244 33.413 0 66.826-.04 70.02-.203 8.954-.422 14.153-1.12 19.901-2.606 15.852-4.09 28.977-14.838 36.12-29.575 3.591-7.409 5.412-14.614 6.236-25.07.18-2.28.255-38.626.255-74.924 0-36.304-.082-72.583-.26-74.863-.835-10.625-2.656-17.77-6.364-25.32-3.042-6.182-6.42-10.799-11.324-15.519-8.752-8.361-19.455-13.45-32.21-15.29-6.18-.894-7.41-1.158-39.033-1.213z"
      transform="translate(-71.816 -18.143)"
    />
    <path
      fill="url(#instagram_icon__h)"
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

export const FlipCard: React.FC<FlipCardProps> = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [activeTypingLine, setActiveTypingLine] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<boolean>(false);
  const cancelTypingRef = useRef<boolean>(false);

  const bootSequence = [
    { text: "shawaz:~$ init_developer.sh", type: true, speed: 25 },
    { text: "[OK] Connecting to Creativity_Grid...", type: false },
    { text: "[OK] Loading Design_Core...", type: false },
    { text: "[WARN] Emotion modules: OVERLOADED_WITH_PASSION", type: false },
    { text: "shawaz:~$ ", type: false }
  ];

  // GSAP 3D card flip animation to completely avoid layout shifting and repaints
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: isFlipped ? 180 : 0,
      duration: 0.75,
      ease: "power2.out",
      overwrite: "auto"
    });
  }, [isFlipped]);

  // Local scrolling of terminal container ONLY (does NOT shift viewport scroll position)
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory, activeTypingLine]);

  // Terminal boot animation logic
  useEffect(() => {
    cancelTypingRef.current = false;

    const runBootSequence = async () => {
      if (typingRef.current) return;
      typingRef.current = true;
      setIsTyping(true);
      setTerminalHistory([]);
      setActiveTypingLine("");

      for (const step of bootSequence) {
        if (cancelTypingRef.current) break;

        if (step.type) {
          // Dynamic character typing
          await new Promise<void>((resolve) => {
            let i = 0;
            let currentText = "";
            const interval = setInterval(() => {
              if (cancelTypingRef.current) {
                clearInterval(interval);
                resolve();
                return;
              }
              currentText += step.text.charAt(i);
              setActiveTypingLine(currentText);
              i++;
              if (i >= step.text.length) {
                clearInterval(interval);
                setTerminalHistory(prev => [...prev, step.text]);
                setActiveTypingLine("");
                resolve();
              }
            }, step.speed || 30);
          });
        } else {
          // Output print delay
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              if (cancelTypingRef.current) {
                resolve();
                return;
              }
              setTerminalHistory(prev => [...prev, step.text]);
              resolve();
            }, 180);
          });
        }
      }

      setIsTyping(false);
      typingRef.current = false;
    };

    if (isFlipped) {
      runBootSequence();
    } else {
      cancelTypingRef.current = true;
      typingRef.current = false;
      setIsTyping(false);
      setTerminalHistory([]);
      setActiveTypingLine("");
    }

    return () => {
      cancelTypingRef.current = true;
    };
  }, [isFlipped]);

  const executeCommand = async (cmdKey: 'scrollHero' | 'scrollAbout' | 'scrollTech' | 'scrollProjects' | 'scrollCertificates' | 'scrollCollaborations') => {
    if (isTyping || typingRef.current) return;
    typingRef.current = true;
    setIsTyping(true);

    interface CommandItem {
      cmd: string;
      output: string[];
      action?: () => void;
    }

    const gsapScrollTo = (targetY: number) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      const scrollObj = { progress: 0 };

      gsap.to(scrollObj, {
        progress: 1,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          window.scrollTo(0, startY + distance * scrollObj.progress);
        }
      });
    };

    const getElementY = (id: string) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      return rect.top + scrollTop;
    };

    const commands: Record<'scrollHero' | 'scrollAbout' | 'scrollTech' | 'scrollProjects' | 'scrollCertificates' | 'scrollCollaborations', CommandItem> = {
      scrollHero: {
        cmd: "scroll --hero",
        output: [
          "[SYSTEM_REDIRECT] Locating Hero Intro page...",
          "Initiating viewport scrolling override..."
        ],
        action: () => {
          gsapScrollTo(0);
        }
      },
      scrollAbout: {
        cmd: "scroll --about",
        output: [
          "[SYSTEM_REDIRECT] Locating About Me section...",
          "Initiating viewport scrolling override..."
        ],
        action: () => {
          const targetY = getElementY("about");
          if (targetY !== null) {
            gsapScrollTo(targetY - 20);
          }
        }
      },
      scrollTech: {
        cmd: "scroll --tech",
        output: [
          "[SYSTEM_REDIRECT] Locating Core Tech Stack...",
          "Initiating viewport scrolling override..."
        ],
        action: () => {
          const targetY = getElementY("tech-stack");
          if (targetY !== null) {
            gsapScrollTo(targetY - 20);
          }
        }
      },
      scrollProjects: {
        cmd: "scroll --projects",
        output: [
          "[SYSTEM_REDIRECT] Locating Projects section...",
          "Initiating viewport scrolling override..."
        ],
        action: () => {
          const targetY = getElementY("projects");
          if (targetY !== null) {
            gsapScrollTo(targetY - 20);
          } else {
            console.warn("Section #projects not yet designed/found.");
          }
        }
      },
      scrollCertificates: {
        cmd: "scroll --certificates",
        output: [
          "[SYSTEM_REDIRECT] Locating Certificates section...",
          "Initiating viewport scrolling override..."
        ],
        action: () => {
          const targetY = getElementY("certificates");
          if (targetY !== null) {
            gsapScrollTo(targetY - 20);
          } else {
            console.warn("Section #certificates not yet designed/found.");
          }
        }
      },
      scrollCollaborations: {
        cmd: "scroll --collaboration",
        output: [
          "[SYSTEM_REDIRECT] Locating Collaborations section...",
          "Initiating viewport scrolling override..."
        ],
        action: () => {
          const targetY = getElementY("contact") ?? getElementY("collaborations");
          if (targetY !== null) {
            gsapScrollTo(targetY - 20);
          } else {
            console.warn("Section #contact not yet designed/found.");
          }
        }
      }
    };

    const target = commands[cmdKey];

    // Remove empty prompt placeholder
    setTerminalHistory(prev => {
      const clean = prev.slice();
      if (clean[clean.length - 1] === "shawaz:~$ ") {
        clean.pop();
      }
      return clean;
    });

    // Type the input command dynamically
    await new Promise<void>((resolve) => {
      let i = 0;
      let currentText = "shawaz:~$ ";
      const fullInput = "shawaz:~$ " + target.cmd;
      const interval = setInterval(() => {
        if (cancelTypingRef.current) {
          clearInterval(interval);
          resolve();
          return;
        }
        currentText += target.cmd.charAt(i);
        setActiveTypingLine(currentText);
        i++;
        if (i >= target.cmd.length) {
          clearInterval(interval);
          setTerminalHistory(prev => [...prev, fullInput]);
          setActiveTypingLine("");
          resolve();
        }
      }, 30);
    });

    if (cancelTypingRef.current) {
      setIsTyping(false);
      typingRef.current = false;
      return;
    }

    // Print command execution output after a short delay
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        if (cancelTypingRef.current) {
          resolve();
          return;
        }
        setTerminalHistory(prev => [...prev, ...target.output, "shawaz:~$ "]);
        resolve();
      }, 150);
    });

    // Fire section redirection AFTER execution completes inside the terminal
    setTimeout(() => {
      if (target.action) {
        target.action();
      }
    }, 150);

    setIsTyping(false);
    typingRef.current = false;
  };

  return (
    <div 
      className="w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[480px] h-[540px] sm:h-[600px] cursor-pointer relative overflow-visible mx-auto"
      onClick={() => {
        if (!isTyping) {
          setIsFlipped(!isFlipped);
        }
      }}
      style={{ perspective: 1800 }}
    >
      {/* Specular mirror shine styles for the front card */}
      <style>{`
        .glass-shiny-card {
          position: relative;
          overflow: hidden;
        }
        .glass-shiny-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: -200%;
          width: 80%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.18) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-20deg);
          transition: left 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-shiny-card:hover::after {
          left: 200%;
        }
      `}</style>

      <div
        ref={cardRef}
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-8 flex flex-col items-center justify-between shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/10 glass-shiny-card"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #1c1a2e 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0) 50.5%, #0e0c16 100%)", // Specular split background
            boxShadow: "0 0 1px 1px rgba(255, 255, 255, 0.08) inset, 0 10px 40px 0 rgba(0, 0, 0, 0.65), 0 0 30px rgba(110, 92, 255, 0.1)"
          }}
        >
          {/* Subtle reflection overlay (shine) */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.07] pointer-events-none" />

          {/* Corner Brackets */}
          <div className="absolute inset-3 sm:inset-5 pointer-events-none select-none">
            <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-signal/45" />
            <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-signal/45" />
            <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-signal/45" />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-signal/45" />
          </div>

          {/* Enlarged Avatar Top Area */}
          <div className="w-full flex justify-center mt-3 sm:mt-6">
            <div className="w-44 h-44 xs:w-52 xs:h-52 sm:w-64 sm:h-64 rounded-full border-2 border-signal/50 p-2 sm:p-2.5 bg-void/60 shadow-[0_0_30px_rgba(110,92,255,0.25)] relative overflow-hidden transition-all duration-300">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image 
                  src={data.image} 
                  alt={data.name} 
                  fill 
                  className="object-cover"
                  sizes="256px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Name & Actions pushed to the bottom area */}
          <div className="w-full flex flex-col items-center gap-3 sm:gap-4 mt-auto mb-3 sm:mb-6">
            <div className="text-center flex flex-col items-center gap-1.5 w-full">
              <h3 className="font-frozen font-bold text-2xl sm:text-4xl text-ink uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                {data.name}
              </h3>
            </div>

            {/* Download Resume Button */}
            <div className="w-full px-1 sm:px-2">
              <a
                href="/resume.pdf"
                download="J_Shawaz_Resume.pdf"
                onClick={(e) => e.stopPropagation()} // Prevent card flip
                className="flex items-center justify-center gap-2 sm:gap-3 w-full bg-signal/15 hover:bg-signal/25 border border-signal/30 hover:border-signal/50 text-ink rounded-xl py-2 sm:py-2.5 px-3 sm:px-4 font-mermaid font-bold text-[16px] sm:text-[20px] tracking-wide transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(110,92,255,0.2)]"
              >
                <PDFIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#ff2116]" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Icons row on front card */}
            <div className="flex items-center justify-center gap-6 mt-1 w-full">
              {/* GitHub */}
              <a 
                href={data.socialLinks.github} 
                target="_blank" 
                rel="noreferrer"
                className="text-dim hover:text-ink transition-colors duration-200"
                onClick={(e) => e.stopPropagation()} // Stop flip action when clicking link
                title="GitHub Profile"
              >
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a 
                href={data.socialLinks.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="text-dim hover:text-[#0A66C2] transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
                title="LinkedIn Profile"
              >
                <LinkedInIcon className="w-5.5 h-5.5" />
              </a>
              {/* Instagram */}
              <a 
                href={data.socialLinks.instagram} 
                target="_blank" 
                rel="noreferrer"
                className="text-dim hover:opacity-80 transition-opacity duration-200"
                onClick={(e) => e.stopPropagation()}
                title="Instagram Profile"
              >
                <InstagramIcon className="w-5.5 h-5.5" />
              </a>
            </div>
          </div>

          {/* Front Footers */}
          <div className="w-full flex flex-col items-center gap-4">
            <div className="font-mono text-[10px] text-dim/80 bg-void/50 px-4 py-2 rounded border border-signal/15 w-full text-center">
              CLASS: ACTIVE_DEVELOPER
            </div>
            
            <div className="flex items-center gap-1.5 text-dim/50 font-mono text-[9px] uppercase tracking-wider animate-pulse">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span>Click to Flip Card</span>
            </div>
          </div>
        </div>

        {/* BACK SIDE (Interactive Hacker Terminal) */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl flex flex-col overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/10"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#0A0912", // Solid terminal background
            boxShadow: "0 0 1px 1px rgba(255, 255, 255, 0.08) inset, 0 10px 40px 0 rgba(0, 0, 0, 0.65), 0 0 30px rgba(110, 92, 255, 0.1)"
          }}
        >
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04] pointer-events-none" />

          {/* Terminal Header Bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-[#14121F] border-b border-white/5 select-none w-full">
            {/* Window control dots */}
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>
            {/* Window Title */}
            <span className="font-mono text-[10px] text-dim/60 uppercase tracking-widest pl-6">
              terminal - shawaz@portfolio
            </span>
            <div className="w-10" />
          </div>

          {/* Terminal Body Screen */}
          <div 
            ref={terminalBodyRef}
            className="flex-1 p-5 text-left overflow-y-auto text-[11px] sm:text-[12.5px] leading-relaxed flex flex-col gap-1.5 font-mono scrollbar-thin select-text text-green-400 bg-void/35"
          >
            {terminalHistory.map((line, idx) => {
              const isPrompt = line === "shawaz:~$ ";
              return (
                <div key={idx} className="whitespace-pre-wrap">
                  {line}
                  {isPrompt && !activeTypingLine && (
                    <span className="animate-pulse font-bold text-green-400">_</span>
                  )}
                </div>
              );
            })}
            {activeTypingLine && (
              <div className="whitespace-pre-wrap">
                {activeTypingLine}
                <span className="animate-pulse font-bold text-green-400">_</span>
              </div>
            )}
          </div>

          {/* Interactive Button command tray */}
          <div className="flex flex-wrap gap-2 justify-center p-3 sm:p-4 border-t border-white/5 bg-[#14121F]/80 w-full select-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                executeCommand('scrollHero');
              }}
              className="bg-green-950/20 hover:bg-green-950/40 border border-green-500/30 hover:border-green-500/60 text-green-400 text-[10px] sm:text-xs px-2.5 py-1.5 rounded-md font-mono transition-all duration-200 shadow-sm shadow-green-500/5 cursor-pointer uppercase tracking-wider"
            >
              scroll --hero
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                executeCommand('scrollAbout');
              }}
              className="bg-green-950/20 hover:bg-green-950/40 border border-green-500/30 hover:border-green-500/60 text-green-400 text-[10px] sm:text-xs px-2.5 py-1.5 rounded-md font-mono transition-all duration-200 shadow-sm shadow-green-500/5 cursor-pointer uppercase tracking-wider"
            >
              scroll --about
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                executeCommand('scrollTech');
              }}
              className="bg-green-950/20 hover:bg-green-950/40 border border-green-500/30 hover:border-green-500/60 text-green-400 text-[10px] sm:text-xs px-2.5 py-1.5 rounded-md font-mono transition-all duration-200 shadow-sm shadow-green-500/5 cursor-pointer uppercase tracking-wider"
            >
              scroll --tech
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                executeCommand('scrollProjects');
              }}
              className="bg-green-950/20 hover:bg-green-950/40 border border-green-500/30 hover:border-green-500/60 text-green-400 text-[10px] sm:text-xs px-2.5 py-1.5 rounded-md font-mono transition-all duration-200 shadow-sm shadow-green-500/5 cursor-pointer uppercase tracking-wider"
            >
              scroll --projects
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                executeCommand('scrollCertificates');
              }}
              className="bg-green-950/20 hover:bg-green-950/40 border border-green-500/30 hover:border-green-500/60 text-green-400 text-[10px] sm:text-xs px-2.5 py-1.5 rounded-md font-mono transition-all duration-200 shadow-sm shadow-green-500/5 cursor-pointer uppercase tracking-wider"
            >
              scroll --certificates
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                executeCommand('scrollCollaborations');
              }}
              className="bg-green-950/20 hover:bg-green-950/40 border border-green-500/30 hover:border-green-500/60 text-green-400 text-[10px] sm:text-xs px-2.5 py-1.5 rounded-md font-mono transition-all duration-200 shadow-sm shadow-green-500/5 cursor-pointer uppercase tracking-wider"
            >
              scroll --collaboration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
