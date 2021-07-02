import { createMachine } from "@xstate/fsm";

export const routerMachine = createMachine({
    initial: 'landing',
    states: {
        landing: {},
        me: {},
        build: {},
        writeup: {}
    }
});