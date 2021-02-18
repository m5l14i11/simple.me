import { createMachine } from '@xstate/fsm';

export interface Social {
    name: string;
    link: string;
};

export interface Context {
    intro: string;
    greetings: string;
    socials: Social[];
    outro: string;
};

const buildContext = (): Context => ({
    greetings: "Hello EveryOne !",
    intro: "I am Siarhei Melnik, Software Engineer",
    socials: [
        {
            "name": "email",
            "link": "mailto:siarhei.m.a@gmail.com"
        },
        {
            "name": "twitter",
            "link": "https://twitter.com/m_siarhei"
        },
        {
            "name": "github",
            "link": "https://github.com/m5l14i11"
        },
        {
            "name": "telegram",
            "link": "https://t.me/msiarhei"
        },
        {
            "name": "linkedin",
            "link": "https://www.linkedin.com/in/siarheim"
        }
    ].sort((a, b) => a.name.length - b.name.length),
    outro: "Wm05c2JHOTNJSFJvWlNCM2FHbDBaU0J5WVdKaWFYUWc4SitRaHc9PQ=="
});

export const machine = createMachine<Context>({
    initial: 'idle',
    context: buildContext(),
    states: { idle: {} }
});