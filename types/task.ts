export interface Task {
    id: string;
    title: string;

    listId?: string;

    goalId?: string;

    dueDate?: number;
    scheduledDate?: number;

    estimatedTime?: number;
    actualTime?: number;

    completed?: string;

    createdAt: number;
}