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
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />

      <CardHeader className="pb-3 pl-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold leading-tight break-words text-slate-900 dark:text-slate-50">
              {todo.title}
            </CardTitle>

            <div className="flex items-center gap-2 mt-3">
              <Badge variant="secondary" className="text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-0">
                <User className="w-3 h-3 mr-1" />
                User {todo.userId}
              </Badge>
              <Badge variant="outline" className="text-xs font-medium border-slate-300 dark:border-slate-700">
                #{todo.id}
              </Badge>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all cursor-pointer"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pl-6">
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
          {todo.body}
        </p>
      </CardContent>
    </Card>
  );
});

TodoDetails.displayName = "TodoDetails";
