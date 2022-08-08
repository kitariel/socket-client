import { config } from "process";
import { log } from "./../../../util";
import { ServiceConfig, AnyEventObject } from "xstate";
import { IMachineContext, IMachineEvents, IMessage } from "../types";
import { IRecord } from "../types";
import io from "socket.io-client";

const services: IRecord<ServiceConfig<IMachineContext, IMachineEvents>> = {
  initializeClient: ({ endpoint, token }) => (send) => {
    const socket = io(endpoint!.host, {
      query: { access_token: token },
    });

    send({
      type: "SOCKET_CREATED",
      socket,
    });

    const connectHandler = () => send("SOCKET_CONNECTED");
    const reconnectionErrorHandler = (error: Error) =>
      send({
        type: "SOCKET_CONNECTION_ERROR",
        error,
      });

    // A problem with 'error' event in the
    // latest version of socket.io
    // socket.on('error', (e: Error) => {
    //     // send('SOCKET_CONNECTION_ERROR')
    // })

    socket.once("connect", connectHandler);
    socket.on("reconnect_error", reconnectionErrorHandler);

    return () => {
      socket.removeListener("connect", connectHandler);
      socket.removeListener("reconnect_error", reconnectionErrorHandler);
    };
  },
  connectionListener: ({ socket, endpoint }) => (send) => {
    // const connectHandler = () => send("SOCKET_CONNECTED");

    const connectHandler = () => {
      send("SOCKET_CONNECTED");

      setTimeout(() => {
        send({
          type: "PONG",
          endpoint,
        });
      }, 3000);
    };

    const disconnectHandler = (error: Error) =>
      send({
        type: "SOCKET_DISCONNECTED",
        error,
        endpoint,
      });
    const reconnectionErrorHandler = (error: Error) =>
      send({
        type: "SOCKET_RECONNECTION_ERROR",
        error,
        endpoint,
      });

    socket?.on("connect", connectHandler);
    socket?.on("disconnect", disconnectHandler);
    socket?.on("reconnect_error", reconnectionErrorHandler);

    return () => {
      socket?.removeListener("connect", connectHandler);
      socket?.removeListener("disconnect", disconnectHandler);
      socket?.removeListener("reconnect_error", reconnectionErrorHandler);
    };
  },
  socketEventListeners: ({ socket, config: { event_name } }) => (send) => {
    const responseEventHandler = (payload: AnyEventObject | string) => {
      send({
        type: "MESSAGE",
        payload,
      });
    };

    socket?.on(event_name!, responseEventHandler);

    return () => {
      socket?.removeListener(event_name!, responseEventHandler);
    };
  },
  connectionPing: ({ socket, endpoint }) => (send) => {
    const hearbeat = setInterval(() => {
      socket?.emit("SERVER_PING");
    }, 3000);

    const pingHearbeatHandler = () => {
      send({
        type: "PONG",
        endpoint,
      });
    };

    socket?.on("SERVER_PONG", pingHearbeatHandler);

    return () => {
      socket?.removeListener("SERVER_PONG", pingHearbeatHandler);
      clearInterval(hearbeat);
    };
  },
};

export default services;
