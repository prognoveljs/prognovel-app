import { ws } from ".";

export function runTask(task: string) {
  ws.send(
    JSON.stringify({
      type: "COMMAND",
      task,
    }),
  );
}
