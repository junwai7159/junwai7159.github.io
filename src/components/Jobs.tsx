import type { JobType } from "../types";
import { formatDate } from "../utils/date";
import { Slide } from "../animation/Slide";
import RefLink from "./RefLink";
import { Image } from "lucide-react";

export default function Job() {
  const job: JobType[] = [
    {
      _id: "1",
      name: "Wise AI",
      jobTitle: "Artificial Intelligence Engineer",
      logo: "https://leaders.iotone.com/files/vendor/wise-ai_1.jpg",
      url: "https://wiseai.tech/",
      description: "Working on eKYC (Electronic Know-Your-Customer) solutions with Computer Vision & Large Language Models.",
      startDate: "Oct-2024",
      endDate: "Apr-2025",
    },
    {
      _id: "2",
      name: "Institute of Image Communication and Network Engineering, SJTU",
      jobTitle: "Undergraduate Research Assistant",
      logo: "https://upload.wikimedia.org/wikipedia/en/d/da/Sjtu-logo-standard-red.png",
      url: "https://en.sjtu.edu.cn/",
      description: "Conducted research in the field of crowd simulation, accompanied by AI subfields like Reinforcement Learning and Computer Vision.",
      startDate: "Jun-2023",
      endDate: "Sep-2023",
    },
    {
      _id: "3",
      name: "Samsung Malaysia Electronics",
      jobTitle: "Information Technology Infrastructure Intern",
      logo: "https://static.vecteezy.com/system/resources/thumbnails/020/927/449/small_2x/samsung-brand-logo-phone-symbol-name-white-design-south-korean-mobile-illustration-with-black-background-free-vector.jpg",
      url: "https://www.samsung.com/my/",
      description: "Delivered daily internal user support regarding network, security and IT infrastructure concerns, encompassing debugging, troubleshooting, testing and maintenance.",
      startDate: "Jun-2022",
      endDate: "Aug-2022",
    },
  ];

  return (
    <section className="mt-32 mb-12">
      <Slide delay={0.16}>
        <div className="mb-10">
          <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
            Work Experience
          </h2>
        </div>
      </Slide>

      <Slide delay={0.18}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-12 gap-y-10">
          {job.map((data) => (
            <div
              key={data._id}
              className="flex items-start lg:gap-x-6 gap-x-4 max-w-2xl relative before:absolute before:bottom-0 before:top-[5rem] before:left-9 before:w-[1px] before:h-[calc(100%-70px)] dark:before:bg-zinc-800 before:bg-zinc-200"
            >
              <RefLink
                href={data.url}
                className="grid place-items-center dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 min-h-[80px] min-w-[80px] p-2 rounded-md overflow-clip relative"
              >
                <img
                  src={data.logo}
                  className="object-cover duration-300"
                  alt={`${data.name} logo`}
                  width={50}
                  height={50}
                />
              </RefLink>
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-semibold">{data.name}</h3>
                <p>{data.jobTitle}</p>
                <time className="text-sm text-zinc-500 mt-1 tracking-widest uppercase">
                  {formatDate(data.startDate)} -{" "}
                  {data.endDate ? (
                    formatDate(data.endDate)
                  ) : (
                    <span>
                      Present
                    </span>
                  )}
                </time>
                <p className="tracking-tight dark:text-zinc-400 text-zinc-600 my-4">
                  {data.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Slide>
    </section>
  );
}
