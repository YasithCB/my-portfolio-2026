import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import AppData from "@data/app.json";

import HeroSection from "@components/sections/Hero";
import CountersSection from "@components/sections/Counters";
import ServicesSection from "@components/sections/Services";
import PricingSection from "@components/sections/Pricing";
import HistorySection from "@components/sections/History";
import ContactInfoSection from "@components/sections/ContactInfo";
import ContactFormSection from "@components/sections/Contact";
import {PROJECTS_LIST} from "@data/projects/projects";

const TestimonialSlider = dynamic( () => import("@components/sliders/Testimonial"), { ssr: false } );
const ProjectsMasonry = dynamic( () => import("@components/ProjectsMasonry"), { ssr: false } );

export const metadata = {
    title: {
        default: "Home",
    },
    description: AppData.settings.siteDescription,
}

async function HomeOnePage() {

    return (
        <>
            <HeroSection />
            <CountersSection />
            <ServicesSection />
            <PricingSection />
            <TestimonialSlider />

            <Suspense fallback={<div>Loading...</div>}>
                <ProjectsMasonry projects={PROJECTS_LIST} categories={AppData.projects.categories} />
            </Suspense>

            <HistorySection />

            {/*<Suspense fallback={<div>Loading...</div>}>*/}
            {/*  <LatestPostsSlider posts={posts} />*/}
            {/*</Suspense>*/}

            <ContactInfoSection />
            <ContactFormSection />
            {/*<PartnersSection />*/}
        </>
    );
};
export default HomeOnePage;