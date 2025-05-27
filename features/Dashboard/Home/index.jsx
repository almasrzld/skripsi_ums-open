import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardHomeFeature = () => {
  return (
    <main className="">
      <ScrollArea className="h-[85vh]">
        <iframe
          style={{
            background: "#FFFFFF",
          }}
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-project-0-ycdseab/embed/charts?id=626e79c7-7c35-4098-9825-fd2f2b2efe73&maxDataAge=3600&theme=light&autoRefresh=true"
        ></iframe>
        <iframe
          style={{ background: "#FFFFFF" }}
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-project-0-ycdseab/embed/charts?id=7d785719-d905-4a6e-b864-7cdb5ea83cc5&maxDataAge=3600&theme=light&autoRefresh=true"
        ></iframe>
      </ScrollArea>
    </main>
  );
};

export default DashboardHomeFeature;
