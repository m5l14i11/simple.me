import { createMachine } from "@xstate/fsm";

export interface ISocial {
  name: string;
  link: string;
}

export interface IContext {
  intro: string;
  title: string;
  greetings: string;
  socials: ISocial[];
  outro: string;
}

const buildContext = (): IContext => ({
  intro: "I'm Siarhei Melnik",
  title: "Software Engineer",
  greetings: "Hello EveryOne !",
  socials: [
    {
      name: "email",
      link: "mailto:siarhei.m.a@gmail.com"
    },
    {
      name: "twitter",
      link: "https://twitter.com/m_siarhei"
    },
    {
      name: "github",
      link: "https://github.com/m5l14i11"
    },
    {
      name: "telegram",
      link: "https://t.me/msiarhei"
    },
    {
      name: "linkedin",
      link: "https://www.linkedin.com/in/siarheim"
    }
  ].sort((a, b) => b.name.length - a.name.length),
  outro: "Wm05c2JHOTNJSFJvWlNCM2FHbDBaU0J5WVdKaWFYUWc4SitRaHc9PQ=="
});

export const machine = createMachine<IContext>({
  initial: "idle",
  context: buildContext(),
  states: { idle: {} }
});
