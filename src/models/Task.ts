import mongoose from 'mongoose';

interface ITask extends mongoose.Document {
    title: string;
    description: string;
    completed: boolean;
}

const TaskSchema = new mongoose.Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false }
});

export default mongoose.model<ITask>('Task', TaskSchema);
