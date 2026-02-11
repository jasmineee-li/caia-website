"use client";

import {
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

interface TextTypeProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text?: string | string[];
  texts?: string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  variableSpeedEnabled?: boolean;
  variableSpeedMin?: number;
  variableSpeedMax?: number;
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

export default function TextType({
  text = "",
  texts,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  variableSpeedEnabled = false,
  variableSpeedMin = 60,
  variableSpeedMax = 120,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);

  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const textArray = useMemo(() => {
    if (texts && texts.length > 0) {
      return texts;
    }
    return Array.isArray(text) ? text : [text];
  }, [text, texts]);

  const safeTextArray = useMemo(() => {
    return textArray.length > 0 ? textArray : [""];
  }, [textArray]);

  const resolvedVariableSpeed = useMemo(() => {
    if (variableSpeed) {
      return variableSpeed;
    }
    if (variableSpeedEnabled) {
      return {
        min: variableSpeedMin,
        max: variableSpeedMax,
      };
    }
    return undefined;
  }, [variableSpeed, variableSpeedEnabled, variableSpeedMin, variableSpeedMax]);

  const getRandomSpeed = useCallback(() => {
    if (!resolvedVariableSpeed) {
      return typingSpeed;
    }
    const { min, max } = resolvedVariableSpeed;
    return Math.random() * (max - min) + min;
  }, [resolvedVariableSpeed, typingSpeed]);

  const currentSentence = safeTextArray[currentTextIndex] ?? "";

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!showCursor || !cursorRef.current) {
      return;
    }

    gsap.set(cursorRef.current, { opacity: 1 });

    const tween = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => {
      tween.kill();
    };
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    const processedText = reverseMode ? currentSentence.split("").reverse().join("") : currentSentence;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);

          if (currentTextIndex === safeTextArray.length - 1 && !loop) {
            return;
          }

          if (onSentenceComplete) {
            onSentenceComplete(safeTextArray[currentTextIndex] ?? "", currentTextIndex);
          }

          setCurrentTextIndex((prev) => (prev + 1) % safeTextArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else if (currentCharIndex < processedText.length) {
        timeout = setTimeout(
          () => {
            setDisplayedText((prev) => prev + processedText[currentCharIndex]);
            setCurrentCharIndex((prev) => prev + 1);
          },
          resolvedVariableSpeed ? getRandomSpeed() : typingSpeed,
        );
      } else if (safeTextArray.length >= 1) {
        if (!loop && currentTextIndex === safeTextArray.length - 1) {
          return;
        }
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    safeTextArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    resolvedVariableSpeed,
    getRandomSpeed,
    currentSentence,
    onSentenceComplete,
  ]);

  const currentTextColor =
    textColors.length > 0 ? textColors[currentTextIndex % textColors.length] ?? "inherit" : "inherit";

  const shouldHideCursor = hideCursorWhileTyping && (currentCharIndex < currentSentence.length || isDeleting);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props,
    },
    <span className="inline" style={{ color: currentTextColor }}>
      {displayedText}
    </span>,
    showCursor && (
      <span
        ref={cursorRef}
        className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? "hidden" : ""} ${cursorClassName}`}
      >
        {cursorCharacter}
      </span>
    ),
  );
}
