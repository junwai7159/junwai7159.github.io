export type JobType = {
  _id: string;
  name: string;
  jobTitle: string;
  logo: string;
  url: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type ProfileType = {
  _id: string;
  fullName: string;
  headline: string;
  profileImage: {
    image: string;
    lqip: string;
    alt: string;
  };
  shortBio: string;
  email: string;
  fullBio: string;
  location: string;
  resumeURL: string;
  og: string;
  usage: string;
};