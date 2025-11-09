import React from 'react';
import Hero from '../components/home/Hero';
import Events from '../components/events/Events';
import Features from '../components/home/Features';
import Testimonials from '../components/testimonials/Testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Events />
      <Features />
      <Testimonials />
    </>
  );
}
