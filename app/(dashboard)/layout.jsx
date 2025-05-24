import DashboardWrapper from "@/components/layout/dashboardWrapper";

export const metadata = {
  title: {
    default: "Dashboard",
    template: "Dashboard | %s",
  },
  description: "Dashboard Admin UMS Open",
};

export default function Dashboard({ children }) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
