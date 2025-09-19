import { Icons } from "@/components/icons";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Database } from "@/lib/schema";
type Species = Database["public"]["Tables"]["species"]["Row"];


export default function DetailedViewDialog({ species }: { species: Species }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Icons.add className="mr-3 h-5 w-5" />
          Done
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Species Detailed View</DialogTitle>
        </DialogHeader>
        <p> Scientific Name: ${species.scientific_name} </p>
        <p> Common Name: ${species.common_name} </p>
        <p> Kingdom: ${species.kingdom} </p>
        <p> Total population: ${species.total_population} </p>
        <p> Description: ${species.description} </p>
        <div className="flex">
          <Button type="submit" className="ml-1 mr-1 flex-auto">
            Add Species
          </Button>
          <DialogClose asChild>
            <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
