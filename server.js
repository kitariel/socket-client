const { Machine, interpret, send, actions } = require('xstate')

const { Interpret, spawn } = require('./dist/index')

// const MachineService = Interpret({
//     config: {
//         server_endpoints: [
//             {
//                 host: 'http://10.111.2.208:1111'
//             },
//             // {
//             //     host: 'http://10.111.2.208:3000'
//             // },
//             // {
//             //     host: 'http://10.111.2.208:3000'
//             // }
//         ],
//         buffer_enabled: false
//     }
// })

// MachineService.start();

// setInterval(() => {
//     MachineService.send({
//         type: 'SEND',
//         payload: {}
//     })
// }, 3000)

const config = {
    initial: 'start',
    states: {
        start: {
            invoke: {
                id: 'spawn-machine',
                src: 'spawnMachine'
            },
            on: {
                'SEND': {
                    actions: 'sendToSpawnMachine'
                },
                'SAMPLE': {
                    actions: () => console.log('@@@@@@@@@IM HERE')
                },
                'SAMPLE2': {
                    actions: () => console.log('@@@@@@@@@IM HERE2')
                },
                'MESSAGE': {
                    actions: (_, e) => console.log('@@@@@@@@@IM HERE NOW', e)
                },
            }
        }
    }
}

const implementation = {
    actions: {
        sendToSpawnMachine: send((_, event) => event, { to: 'spawn-machine' })
    },
    services: {
        spawnMachine: spawn({
            config: {
                server_endpoints: [
                    {
                        host: 'http://10.111.2.208:1111'
                    },
                    // {
                    //     host: 'http://10.111.2.208:3000'
                    // },
                    // {
                    //     host: 'http://10.111.2.208:3000'
                    // }

                    // {
                    //     host: 'http://localhost:3001'
                    // },
                    // // {
                    //     host: 'http://localhost:3002'
                    // },
                    // {
                    //     host: 'http://localhost:3003'
                    // },
                ],
                verbose: true,
                encryption: {
                    encryption_key: "bf3c199c2470cb477d907b1e0917c17b",
                    encryption_iv: "5183666c72eec9e4",
                },
                event_name: "API_RESPONSE"
            }
        })
    }
}

const clientMachine = Machine(config, implementation)
const clientService = interpret(clientMachine)
clientService.start()

setInterval(() => {
    clientService.send({
        type: "SEND",
        envelope: {
            event_name: "API"
        },
        payload: {
            type: "GET_USER",
            payload: { ID: '121'}
        }
    })
}, 10000)