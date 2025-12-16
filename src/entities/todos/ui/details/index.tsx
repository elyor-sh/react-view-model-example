import {Card, CardContent, CardHeader, CardTitle} from "@/shared/ui/card";
import {Button} from "@/shared/ui/button";
import {Trash2, User} from "lucide-react";
import type {Todo} from "@/entities/todos/model";
import {observer} from "mobx-react-lite";
import {Badge} from "@/shared/ui/badge.tsx";

interface TodoProps {
  todo: Todo;
  onDelete: () => void;
}

export const TodoDetails = observer(({ todo, onDelete }: TodoProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 hover:border-l-blue-600">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base leading-tight break-words">
              {todo.title}
            </CardTitle>

            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                <User className="w-3 h-3 mr-1" />
                User {todo.userId}
              </Badge>
              <Badge variant="outline" className="text-xs">
                #{todo.id}
              </Badge>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {todo.body}
        </p>
      </CardContent>
    </Card>
  );
});

TodoDetails.displayName = "TodoDetails";
