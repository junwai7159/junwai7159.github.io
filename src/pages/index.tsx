import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import GithubCalendarComponent from '../components/GithubCalendar';
import { Slide } from '../animation/Slide';
import HeroSvg from '@site/static/icon/HeroSvg';

import styles from './index.module.css';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout 
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
        <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 mb-16">
          <div key={"id"} className="lg:max-w-2xl max-w-2xl">
            <Slide>
              <h1 className="font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
                {"AI/ML Engineer"}
              </h1>
              <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
                {"Full-time developer"}
              </p>
            </Slide>
          </div>
          <Slide delay={0.14}>
            <HeroSvg />
          </Slide>
        </section>
        <section className="w-full overflow-x-auto">
          <GithubCalendarComponent />
        </section>
      </main>
    </Layout>

  );
}
