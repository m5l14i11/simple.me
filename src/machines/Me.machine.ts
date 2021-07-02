import { createMachine } from "@xstate/fsm";

export interface ISocial {
  name: string;
  link: string;
}

export interface ICert {
  school: string;
  platform: string;
  link: string;
}

export interface IContext {
  intro: string;
  titles: string[];
  greetings: string;
  socials: ISocial[];
  certs: ICert[];
  outro: string;
}

const buildContext = (): IContext => ({
  intro: '',
  titles: [],
  greetings: '',
  socials: [],
  certs: [],
  outro: ''
});

export const machine = createMachine<IContext>({
  initial: "fetch",
  context: buildContext(),
  states: { fetch: {} }
});
