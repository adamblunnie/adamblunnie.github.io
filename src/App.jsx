import React from "react";
import { profile } from "./data/profile";
import { skillGroups } from "./data/skills";
import { projects } from "./data/projects";
import { education } from "./data/education";
import { Icon } from "./components/Icon";
import { LanguageIcon } from "./components/LanguageIcon";
import { ExternalLink } from "./components/ExternalLink";
import { SectionHeading } from "./components/SectionHeading";
import { ProjectCard } from "./components/ProjectCard";
import { NetworkGraphic } from "./components/NetworkGraphic";

const navigation = ["About", "Skills", "Projects", "Education", "Contact"];

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label="Adam Blunnie, home">
            <span className="brand-mark">
              ab<span>.</span>
            </span>
            <span className="brand-name">ADAM BLUNNIE</span>
          </a>
          <nav aria-label="Main navigation">
            <ul>
              {navigation.map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`}>{item}</a>
                </li>
              ))}
            </ul>
          </nav>
          <ExternalLink className="header-github" href={profile.github}>
            GitHub <Icon name="external" />
          </ExternalLink>
        </div>
      </header>
      <main id="main" tabIndex="-1">
        <section
          id="home"
          className="hero container"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="accent-line" /> IT · NETWORKS · CYBERSECURITY
            </p>
            <h1 id="hero-title">
              Adam
              <br />
              <span>
                Blunnie<span className="accent">.</span>
              </span>
            </h1>
            <p className="hero-lead">
              Understanding networks.
              <br />
              Exploring what comes next.
            </p>
            <p className="hero-description">
              Studying Computer Networks and Cyber Security at TUS Moylish, with
              an interest in secure systems, cloud infrastructure and
              automation.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore projects <Icon name="arrow" />
              </a>
              <a className="button button-secondary" href="#about">
                About me <span aria-hidden="true">↗</span>
              </a>
            </div>
            <ExternalLink className="hero-profile" href={profile.github}>
              <Icon name="github" /> github.com/adamblunnie{" "}
              <Icon name="external" />
            </ExternalLink>
          </div>
          <NetworkGraphic />
          <div className="hero-footer">
            <span>
              STUDENT PORTFOLIO <span className="tiny-dot" /> ALWAYS DEVELOPING
            </span>
            <a href="#about">
              Discover more <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section
          id="about"
          className="section section-tinted"
          aria-labelledby="about-title"
        >
          <div className="container">
            <div className="about-layout">
              <div>
                <p className="eyebrow">
                  <span>01</span> ABOUT ME
                </p>
                <h2 id="about-title">
                  A foundation in networks.
                  <br />
                  <span className="muted">
                    A curiosity for what’s possible.
                  </span>
                </h2>
              </div>
              <div className="about-copy">
                <p>
                  I’m Adam, a student at Technological University of the
                  Shannon’s Moylish campus. My academic journey began with
                  Computer Networks and Systems Management, now named Computer
                  Networks and Cyber Security.
                </p>
                <p>
                  I’m developing my technical knowledge and exploring where
                  cybersecurity, cloud infrastructure and automation meet. This
                  is a space to share that learning, document future projects
                  and build towards a career in IT.
                </p>
              </div>
            </div>
            <div className="interest-grid">
              {profile.interests.map((interest, index) => (
                <article className="interest-card" key={interest.title}>
                  <div className="flex justify-between items-center">
                    <Icon name={interest.symbol} />
                    <span className="card-number">0{index + 1}</span>
                  </div>
                  <h3>{interest.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section container" aria-label="Skills">
          <SectionHeading
            number="02"
            label="TECHNICAL DEVELOPMENT"
            title="Learning, one layer at a time."
          >
            A growing record of languages, tools and technical learning.
          </SectionHeading>
          <div className="notice">
            <span className="notice-marker" aria-hidden="true">
              i
            </span>
            <p>
              <strong>Skills in preparation.</strong> The entries below are
              samples awaiting my confirmation. They do not represent verified
              skills or proficiency.
            </p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                {group.skills.length ? (
                  <div className="language-grid">
                    {group.skills.map((skill) => (
                      <div className="language-tile" key={skill.name}>
                        <LanguageIcon name={skill.icon} />
                        <span className="language-name">{skill.name}</span>
                        <span
                          className={`skill-label ${skill.approved ? "confirmed" : ""}`}
                        >
                          {skill.approved
                            ? skill.description
                            : "Sample · unconfirmed"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-skills">
                    <span aria-hidden="true">＋</span>
                    <p>Confirmed tools will be added here.</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="section section-tinted"
          aria-label="Projects"
        >
          <div className="container">
            <div className="section-topline">
              <SectionHeading
                number="03"
                label="PROJECTS"
                title="From learning to building."
              >
                Future work, documented with context, decisions and outcomes.
              </SectionHeading>
              <span className="small-note">NO PUBLISHED PROJECTS YET</span>
            </div>
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        <section
          id="education"
          className="section container"
          aria-label="Education"
        >
          <div className="education-layout">
            <SectionHeading
              number="04"
              label="EDUCATION"
              title="Where the journey begins."
            >
              Building my academic foundation at TUS.
            </SectionHeading>
            <div className="timeline">
              {education.map((item) => (
                <article key={item.course} className="education-entry">
                  <p className="eyebrow accent">Course</p>
                  <h3>{item.course}</h3>
                  <p className="institution">{item.institution}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="section contact-section"
          aria-labelledby="contact-title"
        >
          <div className="container contact-inner">
            <div>
              <p className="eyebrow">
                <span>05</span> GET IN TOUCH
              </p>
              <h2 id="contact-title">
                Let’s connect<span className="accent">.</span>
              </h2>
              <p>
                Interested in my learning or future projects?
                <br />
                You can find me on GitHub.
              </p>
            </div>
            <div className="contact-links">
              <ExternalLink href={profile.github} className="contact-link">
                <span>
                  <Icon name="github" />
                  <span>
                    GitHub<small>@adamblunnie</small>
                  </span>
                </span>
                <Icon name="external" />
              </ExternalLink>
              {profile.linkedin && (
                <ExternalLink href={profile.linkedin} className="contact-link">
                  LinkedIn <Icon name="external" />
                </ExternalLink>
              )}
              {profile.email && (
                <a className="contact-link" href={`mailto:${profile.email}`}>
                  Email Adam <Icon name="arrow" />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="container site-footer">
        <a className="brand-mark" href="#home" aria-label="Back to top">
          ab<span>.</span>
        </a>
        <p>
          Adam Blunnie <span aria-hidden="true">/</span> A portfolio in
          progress.
        </p>
        <a href="#home">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </>
  );
}
