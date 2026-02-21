import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import AppData from "@data/app.json";

const ProjectsMasonry = dynamic( () => import("@components/ProjectsMasonry"), { ssr: true } );

import { getSortedProjectsData } from "@library/projects";
import {PROJECTS_LIST} from "@data/projects/projects";

export const metadata = {
  title: {
		default: "Projects",
	},
  description: AppData.settings.siteDescription,
}

async function Projects() {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectsMasonry projects={PROJECTS_LIST} categories={AppData.projects.categories} viewAll={true} />
      </Suspense>
    </>
  );
};
export default Projects;