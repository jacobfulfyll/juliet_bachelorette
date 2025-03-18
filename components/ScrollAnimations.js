"use client";
import React, { ReactNode, useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// AnimatedSection component that animates elements when they enter viewport
export function AnimatedSection({
  children,
  variants,
  transition = { duration: 0.5, ease: "easeOut" },
  viewOptions = { margin: "0px 0px -200px 0px", once: false },
  className = "",
  delay = 0,
  animationType = "fade",
  direction = "up",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);
  
  const defaultVariants = {
    fade: {
      hidden: { opacity: 0, filter: "blur(4px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
    slide: {
      up: {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      },
      down: {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0 },
      },
      left: {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
      },
      right: {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    rotate: {
      hidden: { opacity: 0, rotate: 10, scale: 0.95 },
      visible: { opacity: 1, rotate: 0, scale: 1 },
    },
  };
  
  let selectedVariants = variants;
  
  if (!selectedVariants) {
    if (animationType === "slide") {
      selectedVariants = defaultVariants.slide[direction];
    } else {
      selectedVariants = defaultVariants[animationType];
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selectedVariants}
      transition={{ ...transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ParallaxSection component that creates depth effect with different scroll speeds
export function ParallaxSection({
  children,
  speed = 0.5,
  className = "",
  direction = "up",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const factor = direction === "up" ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed * factor]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// ScrollRevealContainer component that manages overflow for scroll reveal effects
export function ScrollRevealContainer({ children, className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

// RotatingCard component that rotates based on scroll position
export function RotatingCard({ children, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        rotateX: rotate,
        scale,
        opacity,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      }}
      className={`bg-white/80 border border-rose-200 rounded-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

// FloatingElement component that creates gentle floating animation
export function FloatingElement({
  children,
  className = "",
  amplitude = 20,
  duration = 5,
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [`${-amplitude/2}px`, `${amplitude/2}px`],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// StaggeredEntry component for creating staggered animations for groups of elements
export function StaggeredEntry({ 
  children, 
  staggerDelay = 0.1,
  containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: staggerDelay 
      }
    }
  },
  itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ScrollAnimationProvider component to manage hydration issues with animations
export function ScrollAnimationProvider({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return <div className="opacity-0">{children}</div>;
  }
  
  return <>{children}</>;
} 