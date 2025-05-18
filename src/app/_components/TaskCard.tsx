// apps/web/src/components/TaskCard.tsx
import { type Task } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
// import { api } from "@/utils/api";

type TaskCardProps = {
  task: Task & {
    assignees: {
      id: string;
      name: string | null;
      avatarUrl: string | null;
    }[];
    tags: {
      id: string;
      name: string;
      color: string;
    }[];
    project: {
      name: string;
    };
  };
};

export function TaskCard({ task }: TaskCardProps) {
  const utils = api.useUtils();
  const { mutate: updateTask } = api.task.update.useMutation({
    onSuccess: () => {
      void utils.task.invalidate();
    },
  });
  const { mutate: deleteTask } = api.task.delete.useMutation({
    onSuccess: () => {
      void utils.task.invalidate();
    },
  });

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4">
        <div className="space-y-1">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <p className="text-muted-foreground text-sm">{task.project.name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={task.status === "DONE" ? "default" : "secondary"}>
            {task.status}
          </Badge>
          <Badge
            variant={task.priority === "URGENT" ? "destructive" : "outline"}
          >
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground text-sm">{task.description}</p>

        {task.dueDate && (
          <div className="mt-2 text-sm">
            <span className="text-muted-foreground">Due: </span>
            <span
              className={
                new Date(task.dueDate) < new Date() ? "text-red-500" : ""
              }
            >
              {format(new Date(task.dueDate), "MMM dd, yyyy")}
            </span>
          </div>
        )}

        {task.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <Badge key={tag.id} style={{ backgroundColor: tag.color }}>
                {tag.name}
              </Badge>
            ))}
          </div>
        )}

        {task.assignees.length > 0 && (
          <div className="mt-3 flex items-center">
            <span className="text-muted-foreground mr-2 text-sm">
              Assigned to:
            </span>
            <div className="flex -space-x-2">
              {task.assignees.map((user) => (
                <Avatar key={user.id} className="h-6 w-6 border-2 border-white">
                  <AvatarImage src={user.avatarUrl ?? undefined} />
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              updateTask({
                id: task.id,
                data: { status: task.status === "DONE" ? "TODO" : "DONE" },
              });
            }}
          >
            {task.status === "DONE" ? "Reopen" : "Complete"}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteTask({ id: task.id })}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
