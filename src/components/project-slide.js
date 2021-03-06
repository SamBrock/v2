import React, { useEffect, useState } from 'react'
import { useWindowSize } from '../hooks/useWindowSize';
import { projectSlideAnimateIn, projectSlideAnimateOut, projectSlideAnimateHoverIn, projectSlideAnimateHoverOut, projectSlideLinkAnimate, maskAnimate } from '../animations/animations';
import Image from './image';
import TransitionLink from "gatsby-plugin-transition-link";

import LogoT from '../images/logo-g-t.svg';
import LogoWT from '../images/logo-w-t.svg';

export default function ProjectSlide({ project, isActive, animate, current, indicator, isAnimating, disableSlideAnimation }) {
  const [disableLink, setDisableLink] = useState(true);

  const [width, height] = useWindowSize();
  const isMobile = width < 768;

  useEffect(() => {
    if (!animate) return;

    if (animate.type === 'in' && !isMobile) projectSlideAnimateIn(animate.direction).play();
    if (animate.type === 'out' && !isMobile) projectSlideAnimateOut(animate.direction).play();

  }, [isActive, animate, isMobile])

  useEffect(() => {
    isAnimating ? setDisableLink(true) : setDisableLink(false);
  }, [isAnimating])

  const handleProjectLink = () => {
    disableSlideAnimation(true);
    !isMobile ? projectSlideLinkAnimate(height, width).play() : maskAnimate().play();
  }

  return (
    <TransitionLink to={!disableLink ? `/${project.title.toLowerCase()}` : '#'} exit={{ trigger: ({ exit, node }) => handleProjectLink(), length: 1 }} entry={{ delay: 1 }} aria-label={project.title} >
      <div className={`project-slide ${isActive ? 'active' : ''}`} >
        <div className="project-slide__logo"><img src={LogoT} alt="Background logo" /></div>
        <div className="project-slide__mask" style={{ height: `${height}px`, clipPath: !isMobile ? 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' : '' }} >
          <div className="project-slide__logo"><img src={LogoWT} alt="Slide background logo" /></div>
          <div className="project-slide__bg" style={{ background: `${project.color}` }} onMouseEnter={() => projectSlideAnimateHoverIn().play()} onMouseLeave={() => projectSlideAnimateHoverOut().play()} role="presentation">
            {project.type === 'web' && (
              <Image filename={`project-slide__${project.title}.png`} alt={project.title} classes="project-slide__img web" />
            )}
            {project.type === 'phone' && (
              <div className="project-slide__img phone">
                <Image filename={`project-slide__${project.title}-1.png`} alt={project.title} />
                <Image filename={`project-slide__${project.title}-2.png`} alt={project.title} />
                <Image filename={`project-slide__${project.title}-3.png`} alt={project.title} />
              </div>
            )}
            <div className="project-slide__info">
              <div className="project-slide__short-desc to-animate">{project.shortDescription}</div>
              <div className="project-slide__title to-animate"><h2>{project.title}.</h2></div>
              <div className="project-slide__count"><span className="count">{(current.toString().length < 2) ? `0${current}` : current}.</span></div>
              <div className={`scroll-indicator ${indicator ? '' : 'hide'}`}>
                <span>SCROLL</span>
                <div className="indicator"><span></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TransitionLink>
  )
}