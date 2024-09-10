import { JobRecord } from "../types/jobRecord";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button"; 
import { Label } from "../components/ui/label";
import {
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "../components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../lib/utils";

interface EditJobModalProps {
  isOpen: boolean;
  job: JobRecord | null;
  onClose: () => void;
  onSave: (job: JobRecord) => void;
  onChange: (field: keyof JobRecord, value: string | Date) => void;
}

export const EditJobModal: React.FC<EditJobModalProps> = ({
  isOpen,
  job,
  onClose,
  onSave,
  onChange,
}) => {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="title" className="text-right">Job Title</Label>
            <Input
              id="title"
              value={job.title}
              onChange={(e) => onChange("title", e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="company" className="text-right">Company</Label>
            <Input
              id="company"
              value={job.company}
              onChange={(e) => onChange("company", e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="date" className="text-right">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "min-w-max pl-3 text-left font-normal col-span-3",
                    !job.date && "text-muted-foreground"
                  )}
                >
                  {job.date ? (
                    format(new Date(job.date), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date(job.date)}
                  onSelect={(date) => onChange("date", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <Select
              value={job.status}
              onValueChange={(value) => onChange("status", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="offered">Offered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => onSave(job)}>Save changes</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
