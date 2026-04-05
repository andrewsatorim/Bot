'use client';

import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Zones from '@/components/sections/Zones';
import MenuPreview from '@/components/sections/MenuPreview';
import Events from '@/components/sections/Events';
import Gallery from '@/components/sections/Gallery';
import Contacts from '@/components/sections/Contacts';
import Booking from '@/components/sections/Booking';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Zones />
      <MenuPreview />
      <Events />
      <Gallery />
      <Booking />
      <Contacts />
    </>
  );
}
