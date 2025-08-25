import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

export const LogoIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4 7h16l-2 10H6L4 7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="20" r="1.75" fill="currentColor"/>
    <circle cx="17" cy="20" r="1.75" fill="currentColor"/>
  </svg>
);

export const CartIcon: React.FC<IconProps> = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M6 6h15l-2 9H8L6 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6l-2-2H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="20" r="1.75" fill="currentColor"/>
    <circle cx="18" cy="20" r="1.75" fill="currentColor"/>
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" stroke="currentColor" strokeWidth="2"/>
    <path d="M4 22a8 8 0 1116 0" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M20 13l-7 7-9-9V4h7l9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor"/>
  </svg>
);

export const FacebookIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9V12.06h2.54V9.86c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34v7.03C18.34 21.24 22 17.08 22 12.06z"/>
  </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M22.46 6c-.77.35-1.6.59-2.46.7.88-.53 1.56-1.37 1.88-2.37-.82.49-1.73.85-2.7 1.05A4.16 4.16 0 0015.5 4c-2.32 0-4.2 1.89-4.2 4.22 0 .33.03.66.11.97-3.5-.18-6.6-1.86-8.67-4.42-.36.64-.56 1.37-.56 2.15 0 1.47.75 2.77 1.88 3.52-.69-.02-1.33-.21-1.9-.52v.05c0 2.06 1.45 3.78 3.35 4.17-.35.1-.72.15-1.1.15-.27 0-.53-.03-.78-.08.53 1.67 2.08 2.88 3.9 2.92A8.34 8.34 0 012 19.54 11.77 11.77 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68v-.53c.81-.58 1.52-1.3 2.09-2.12z"/>
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
  </svg>
);


