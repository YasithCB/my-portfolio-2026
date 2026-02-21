"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import ImageView from "@components/ImageView";
import "./ProjectsMasonry.css";
import {GRAPHIC_PROJECTS_LIST, PROJECTS_LIST} from "@data/projects/projects";

const ProjectsMasonry = ({categories, viewAll = false}) => {
    const [selectedCategory, setSelectedCategory] = useState("software-projects");

    const allProjects = selectedCategory === "software-projects"
        ? PROJECTS_LIST
        : GRAPHIC_PROJECTS_LIST;

    const visibleProjects = viewAll
        ? allProjects
        : allProjects.slice(0, 6);

    // fixing over scrolling
    useEffect(() => {
        document.querySelectorAll(".scroll-container").forEach(container => {
            const img = container.querySelector("img");

            img.onload = () => {
                const diff = img.offsetHeight - container.offsetHeight;
                if (diff > 0) {
                    container.style.setProperty("--scroll-diff", `${diff}px`);
                }
            };
        });
    }, []);


    const handleFilterKeyChange = (key, e) => {
        e.preventDefault();
        setSelectedCategory(key);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center p-30-0">
                    <div className="col-lg-12">
                        <div className="art-section-title">
                            <div className="art-title-frame">
                                <h4>Works</h4>
                            </div>
                            <div className="art-right-frame">
                                <div className="art-filter">
                                    {categories.map((item, key) => (
                                        <a
                                            href="#"
                                            key={`projects-filter-item-${key}`}
                                            data-filter={item.slug}
                                            className={`art-link ${selectedCategory === item.slug ? "text-white" : "text-gray-700"}`}
                                            onClick={(e) => handleFilterKeyChange(item.slug, e)}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2-column masonry grid */}
                    <div className="art-grid art-grid-2-col art-gallery">
                        {visibleProjects.map((item, key) => (
                            <div
                                className={`art-grid-item ${item.category_slug}`}
                                key={`projects-item-${key}`}
                            >
                                <a
                                    data-fancybox="gallery"
                                    data-no-swup
                                    href={item.image}
                                    className={`art-a art-portfolio-item-frame art-${item.masonrySize} scroll-hover`}
                                >
                                    <div className="scroll-container">
                                        <img src={item.image} alt={item.title}/>
                                    </div>
                                    <span className="art-item-hover">
                    <i className="fas fa-expand"></i>
                </span>
                                </a>

                                <div className="art-item-description">
                                    <h5 className="mb-15 text-uppercase">{item.title}</h5>

                                    {selectedCategory === 'software-projects' && (
                                        <Link
                                            href={`/projects/${item.id || key}`}
                                            className="art-link art-color-link art-w-chevron"
                                        >
                                            Read more
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {!viewAll &&
                        <div className="art-buttons-frame mb-5">
                            {/* button */}
                            <Link href={'/projects'}
                                  className="art-btn art-btn-md"><span>View All Projects</span></Link>
                        </div>
                    }
                </div>

                <ImageView/>
            </div>
        </>
    );
};

export default ProjectsMasonry;
