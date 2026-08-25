'use client';
import { useState, useEffect, useRef } from 'react';

export default function CountUp({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '' 
}: { 
  end: number, 
  duration?: number, 
  prefix?: string, 
  suffix?: string 
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Hiệu ứng easeOutQuart mượt mà
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return <span ref={domRef}>{prefix}{count}{suffix}</span>;
}
