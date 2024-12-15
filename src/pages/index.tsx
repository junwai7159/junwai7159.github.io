import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Social from '../components/Social';
import GithubCalendarComponent from '../components/GithubCalendar';
import { Slide } from '../animation/Slide';
import HeroSvg from '@site/static/icon/HeroSvg';
import Job from '../components/Jobs';

import styles from './index.module.css';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout 
      title={`Hello 👋`}
      description="Description will go into a meta tag in <head />">
      <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
        <section className="flex xl:flex-row flex-col xl:items-center items-start justify-between gap-x-12 mb-16">
          <div key={"id"} className="lg:max-w-2xl max-w-2xl">
            <Slide>
              <h1 className="font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
                {"AI/ML Engineer"}
              </h1>
              <p className="text-base dark:text-zinc-400 light:text-zinc-600 leading-relaxed">
                {"Full-time Junior AI Engineer with expertise in Computer Vision, Reinforcement Learning, Natural Language Processing / Large Language Models."}
              </p>
            </Slide>
            <Slide delay={0.1}>
                <Link to="/docs/about" className="inline-block mt-4 px-6 py-2 text-white bg-green-600 rounded hover:bg-green-600 mr-3">
                  About Me
                </Link>
                <Link to="/docs/project" className="inline-block mt-4 px-6 py-2 text-white bg-green-600 rounded hover:bg-green-600">
                  My Portfolio
                </Link>
                {/* <Social type="social" /> */}
            </Slide>
          </div>
          <Slide delay={0.14}>
            <HeroSvg />
          </Slide>
        </section>
        <Job />
        <GithubCalendarComponent />
      </main>
    </Layout>

  );
}
